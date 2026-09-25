import type { APIRoute } from 'astro';

export const prerender = false;

const CACHE_SECONDS = 10 * 60;
const UPSTREAM_IMAGE_URL =
  'https://api.star-history.com/chart?repos=heyjunpenn/awesome-jev&type=timeline&theme=dark&legend=bottom-right';

const cacheHeaders = (contentType: string) => ({
  'Cache-Control': `public, max-age=${CACHE_SECONDS}`,
  'Content-Disposition': 'inline',
  'Content-Type': contentType,
  'X-Content-Type-Options': 'nosniff',
});

export const GET: APIRoute = async ({ request }) => {
  const requestUrl = new URL(request.url);
  requestUrl.search = '';
  const cacheKey = new Request(requestUrl, { method: 'GET' });
  const cache = await caches.open('star-history-images');

  const cachedResponse = await cache.match(cacheKey);
  if (cachedResponse) {
    const headers = new Headers(cachedResponse.headers);
    headers.set('X-Cache', 'HIT');
    return new Response(cachedResponse.body, {
      status: cachedResponse.status,
      statusText: cachedResponse.statusText,
      headers,
    });
  }

  let upstreamResponse: Response;
  try {
    upstreamResponse = await fetch(UPSTREAM_IMAGE_URL, {
      headers: { Accept: 'image/*' },
    });
  } catch {
    return new Response('Unable to load the star history image.', {
      status: 502,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  const contentType = upstreamResponse.headers.get('Content-Type') ?? '';
  if (!upstreamResponse.ok || !contentType.toLowerCase().startsWith('image/')) {
    upstreamResponse.body?.cancel();
    return new Response('The star history service returned an invalid image.', {
      status: 502,
      headers: { 'Cache-Control': 'no-store' },
    });
  }

  const response = new Response(upstreamResponse.body, {
    status: 200,
    headers: cacheHeaders(contentType),
  });

  await cache.put(cacheKey, response.clone());

  const headers = new Headers(response.headers);
  headers.set('X-Cache', 'MISS');
  return new Response(response.body, { status: response.status, headers });
};
