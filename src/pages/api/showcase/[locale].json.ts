import type { APIRoute } from 'astro';
import showcaseManifest from '../../../data/showcase.json' with { type: 'json' };
import { isLocale } from '../../../i18n/config.ts';
import {
  getShowcaseFeedPage,
  type ShowcaseSourceVideo,
} from '../../../lib/showcase-feed.ts';

export const prerender = false;

const parseInteger = (value: string | null) => {
  if (value === null || value.trim() === '') return undefined;
  const parsed = Number(value);
  return Number.isSafeInteger(parsed) ? parsed : undefined;
};

const getDateWindow = () => {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const today = formatter.format(new Date());
  const start = new Date(`${today}T12:00:00+08:00`);
  const day = start.getUTCDay();
  start.setUTCDate(start.getUTCDate() - (day === 0 ? 6 : day - 1));
  return { today, weekStartsOn: formatter.format(start) };
};

export const GET: APIRoute = ({ params, request }) => {
  if (!isLocale(params.locale)) {
    return Response.json({ error: 'Locale not found' }, { status: 404 });
  }

  const url = new URL(request.url);
  const dateWindow = getDateWindow();
  const page = getShowcaseFeedPage(showcaseManifest.videos as ShowcaseSourceVideo[], {
    locale: params.locale,
    filterSlug: url.searchParams.get('filter') ?? undefined,
    query: url.searchParams.get('q') ?? undefined,
    offset: parseInteger(url.searchParams.get('offset')),
    limit: parseInteger(url.searchParams.get('limit')),
    today: dateWindow.today,
    weekStartsOn: dateWindow.weekStartsOn,
  });

  return Response.json(page, {
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=3600',
    },
  });
};
