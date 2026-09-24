import type { APIRoute } from 'astro';
import { env, waitUntil } from 'cloudflare:workers';
import Stripe from 'stripe';
import { ensureSponsorLogo } from '../../../lib/sponsor-logo';
import { verifyCompletedSponsorSession } from '../../../lib/sponsor-payment';

export const prerender = false;

const workerEnv = env as unknown as {
  SPONSORS_DB?: D1Database;
  SPONSOR_ASSETS?: R2Bucket;
  STRIPE_SECRET_KEY?: string;
  STRIPE_WEBHOOK_SECRET?: string;
};

export const POST: APIRoute = async ({ request }) => {
  if (!workerEnv.STRIPE_SECRET_KEY || !workerEnv.STRIPE_WEBHOOK_SECRET || !workerEnv.SPONSORS_DB) {
    return new Response('Sponsor payment service is not configured.', { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) return new Response('Missing Stripe signature.', { status: 400 });

  const stripeClient = new Stripe(workerEnv.STRIPE_SECRET_KEY, {
    apiVersion: '2026-08-26.dahlia',
    httpClient: Stripe.createFetchHttpClient(),
  });

  let event: Stripe.Event;
  try {
    const rawBody = await request.text();
    event = await stripeClient.webhooks.constructEventAsync(
      rawBody,
      signature,
      workerEnv.STRIPE_WEBHOOK_SECRET,
      undefined,
      Stripe.createSubtleCryptoProvider(),
    );
  } catch {
    return new Response('Invalid Stripe signature.', { status: 400 });
  }

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object;
    const payment = verifyCompletedSponsorSession(session);

    if (payment) {
      await workerEnv.SPONSORS_DB.prepare(`
        INSERT INTO sponsors (
          checkout_session_id,
          name,
          url,
          amount_usd,
          paid_at,
          stripe_payment_intent_id,
          active
        ) VALUES (?1, ?2, ?3, ?4, ?5, ?6, 1)
        ON CONFLICT(checkout_session_id) DO UPDATE SET
          name = excluded.name,
          url = excluded.url,
          amount_usd = excluded.amount_usd,
          stripe_payment_intent_id = excluded.stripe_payment_intent_id,
          active = 1
      `).bind(
        session.id,
        payment.sponsorName,
        payment.sponsorUrl,
        payment.amountUsd,
        new Date(event.created * 1000).toISOString(),
        typeof session.payment_intent === 'string' ? session.payment_intent : null,
      ).run();

      if (workerEnv.SPONSOR_ASSETS) {
        waitUntil(
          ensureSponsorLogo(
            workerEnv.SPONSORS_DB,
            workerEnv.SPONSOR_ASSETS,
            payment.sponsorUrl,
          ).then(() => undefined).catch(() => undefined),
        );
      }
    }
  }

  return Response.json({ received: true });
};
