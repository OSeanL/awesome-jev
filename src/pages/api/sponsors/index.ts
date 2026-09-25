import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { sponsorRules } from '../../../data/sponsors';
import { getDefaultSponsorAmount } from '../../../lib/sponsor-ranking';
import { getRankedSponsors } from '../../../lib/sponsors';

export const prerender = false;

const workerEnv = env as unknown as { SPONSORS_DB?: D1Database };

export const GET: APIRoute = async () => {
  const sponsors = await getRankedSponsors(workerEnv.SPONSORS_DB);
  const defaultSponsorAmountUsd = getDefaultSponsorAmount(
    sponsors,
    sponsorRules.minimumIncrementUsd,
  );

  return Response.json(
    {
      sponsors,
      minimumAmountUsd: sponsorRules.minimumIncrementUsd,
      defaultSponsorAmountUsd,
    },
    {
      headers: {
        'Cache-Control': 'public, max-age=30, stale-while-revalidate=300',
      },
    },
  );
};
