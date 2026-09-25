import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { incrementSponsorClick } from '../../../lib/sponsor-click';
import { normalizeSponsorUrl } from '../../../lib/sponsor-payment';

export const prerender = false;

const workerEnv = env as unknown as { SPONSORS_DB?: D1Database };

export const POST: APIRoute = async ({ request }) => {
  if (!workerEnv.SPONSORS_DB) {
    return new Response(null, { status: 503 });
  }

  let submittedUrl: unknown;
  try {
    const payload = await request.json() as { url?: unknown };
    submittedUrl = payload.url;
  } catch {
    return new Response(null, { status: 400 });
  }

  const sponsorUrl = normalizeSponsorUrl(submittedUrl);
  if (!sponsorUrl) {
    return new Response(null, { status: 400 });
  }

  try {
    if (!await incrementSponsorClick(workerEnv.SPONSORS_DB, sponsorUrl)) {
      return new Response(null, { status: 404 });
    }

    return new Response(null, {
      status: 204,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch {
    return new Response(null, { status: 500 });
  }
};
