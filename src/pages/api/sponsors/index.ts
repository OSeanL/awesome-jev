import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { getNextTopRankAmountUsd, getRankedSponsors } from '../../../lib/sponsors';

export const prerender = false;

const workerEnv = env as unknown as { SPONSORS_DB?: D1Database };

export const GET: APIRoute = async () => {
  const sponsors = await getRankedSponsors(workerEnv.SPONSORS_DB);
  const nextTopRankAmountUsd = await getNextTopRankAmountUsd(workerEnv.SPONSORS_DB);

  return Response.json(
    { sponsors, nextTopRankAmountUsd },
    {
      headers: {
        'Cache-Control': 'public, max-age=30, stale-while-revalidate=300',
      },
    },
  );
};
