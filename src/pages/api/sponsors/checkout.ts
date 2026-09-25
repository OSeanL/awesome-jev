import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import Stripe from 'stripe';
import {
  isValidSponsorAmount,
  normalizeSponsorName,
  normalizeSponsorUrl,
} from '../../../lib/sponsor-payment';

export const prerender = false;

const workerEnv = env as unknown as {
  SPONSORS_DB?: D1Database;
  STRIPE_SECRET_KEY?: string;
};

const allowedReturnPath = /^\/(?:zh\/|ja\/|ko\/|es\/|pt-br\/)?sponsors\/$/;

const safeReturnPath = (value: FormDataEntryValue | null) => {
  const path = typeof value === 'string' ? value : '/sponsors/';
  return allowedReturnPath.test(path) ? path : '/sponsors/';
};

const redirectWithStatus = (origin: string, path: string, key: 'error' | 'payment', value: string) => {
  const target = new URL(path, origin);
  target.searchParams.set(key, value);
  return Response.redirect(target, 303);
};

export const POST: APIRoute = async ({ request }) => {
  const requestUrl = new URL(request.url);
  const returnOrigin = requestUrl.origin;

  const formData = await request.formData();
  const returnPath = safeReturnPath(formData.get('returnPath'));

  if (formData.get('company')) {
    return redirectWithStatus(returnOrigin, returnPath, 'error', 'invalid-request');
  }

  const sponsorName = normalizeSponsorName(formData.get('sponsorName'));
  const productUrl = normalizeSponsorUrl(formData.get('productUrl'));
  const amountUsd = Number(formData.get('amount'));

  if (!workerEnv.STRIPE_SECRET_KEY || !workerEnv.SPONSORS_DB) {
    return redirectWithStatus(returnOrigin, returnPath, 'error', 'checkout-unavailable');
  }

  if (!sponsorName || !productUrl || !isValidSponsorAmount(amountUsd)) {
    return redirectWithStatus(returnOrigin, returnPath, 'error', 'invalid-details');
  }

  const stripeClient = new Stripe(workerEnv.STRIPE_SECRET_KEY, {
    apiVersion: '2026-08-26.dahlia',
    httpClient: Stripe.createFetchHttpClient(),
  });
  const metadata = {
    sponsor_name: sponsorName,
    sponsor_url: productUrl,
    sponsor_amount_usd: String(amountUsd),
  };

  try {
    const session = await stripeClient.checkout.sessions.create({
      mode: 'payment',
      managed_payments: { enabled: false },
      customer_creation: 'always',
      billing_address_collection: 'auto',
      submit_type: 'pay',
      integration_identifier: 'bestjev_sponsors_mxqjvpta',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: amountUsd * 100,
            product_data: {
              name: `bestjev sponsor rank — ${sponsorName}`,
              description: productUrl,
              metadata,
            },
          },
        },
      ],
      metadata,
      payment_intent_data: { metadata },
      success_url: `${returnOrigin}${returnPath}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${returnOrigin}${returnPath}?payment=cancelled`,
    });

    if (!session.url) throw new Error('Stripe did not return a Checkout URL.');
    return Response.redirect(session.url, 303);
  } catch {
    return redirectWithStatus(returnOrigin, returnPath, 'error', 'checkout-failed');
  }
};
