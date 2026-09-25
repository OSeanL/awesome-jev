const sponsorLogoCdnBase = 'https://media.jevbest.com/';
const maximumPageBytes = 256 * 1024;
const maximumLogoBytes = 1024 * 1024;
const requestTimeoutMs = 4_000;

type Fetcher = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export interface SponsorLogoAsset {
  bytes: Uint8Array;
  contentType: string;
  extension: string;
  sourceUrl: string;
}

const isPrivateIpv4 = (hostname: string) => {
  const parts = hostname.split('.').map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) {
    return false;
  }

  return parts[0] === 0
    || parts[0] === 10
    || parts[0] === 127
    || (parts[0] === 169 && parts[1] === 254)
    || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31)
    || (parts[0] === 192 && parts[1] === 168)
    || parts[0] >= 224;
};

const isSafeRemoteUrl = (url: URL) => {
  const hostname = url.hostname.toLowerCase();
  if (url.protocol !== 'https:' || url.username || url.password) return false;
  if (hostname === 'localhost' || hostname.endsWith('.localhost') || isPrivateIpv4(hostname)) return false;

  if (hostname.startsWith('[') && hostname.endsWith(']')) {
    const ipv6 = hostname.slice(1, -1);
    if (ipv6 === '::1' || ipv6 === '::' || /^f[cd]/i.test(ipv6) || /^fe[89ab]/i.test(ipv6)) {
      return false;
    }
  }

  return true;
};

const safeUrl = (value: string, base?: string) => {
  try {
    const url = new URL(value, base);
    return isSafeRemoteUrl(url) ? url : undefined;
  } catch {
    return undefined;
  }
};

const readLimitedBody = async (response: Response, maximumBytes: number) => {
  const declaredLength = Number(response.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > maximumBytes) return undefined;
  if (!response.body) return undefined;

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;
  const reader = response.body.getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value.byteLength;
      if (totalBytes > maximumBytes) {
        await reader.cancel();
        return undefined;
      }
      chunks.push(value);
    }
  } catch {
    return undefined;
  }

  if (totalBytes === 0) return undefined;
  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
};

const attributeValue = (tag: string, name: string) => {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>]+))`, 'i'));
  return match?.[1] ?? match?.[2] ?? match?.[3];
};

const decodeHtmlAttribute = (value: string) => value
  .replaceAll('&amp;', '&')
  .replaceAll('&quot;', '"')
  .replaceAll('&#39;', "'")
  .replaceAll('&lt;', '<')
  .replaceAll('&gt;', '>');

const discoverIconUrls = (html: string, pageUrl: string) => {
  const candidates: string[] = [];
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    const rel = attributeValue(tag, 'rel')?.toLowerCase().split(/\s+/) ?? [];
    const href = attributeValue(tag, 'href');
    if (!rel.includes('icon') || !href) continue;

    const iconUrl = safeUrl(decodeHtmlAttribute(href), pageUrl);
    if (iconUrl) candidates.push(iconUrl.toString());
  }
  return [...new Set(candidates)].slice(0, 5);
};

const startsWith = (bytes: Uint8Array, signature: readonly number[]) =>
  signature.every((byte, index) => bytes[index] === byte);

const safeSvg = (bytes: Uint8Array) => {
  const svg = new TextDecoder().decode(bytes);
  if (!/^\s*(?:<\?xml[^>]*>\s*)?<svg[\s>]/i.test(svg)) return false;
  return !/<(?:script|foreignObject|iframe|object|embed|image|use)\b/i.test(svg)
    && !/<!DOCTYPE|<!ENTITY/i.test(svg)
    && !/\bon[a-z]+\s*=/i.test(svg)
    && !/(?:href|src)\s*=\s*["']?\s*(?:javascript:|data:|https?:|\/\/)/i.test(svg)
    && !/@import|url\s*\(/i.test(svg);
};

const identifyImage = (bytes: Uint8Array) => {
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return { contentType: 'image/png', extension: 'png' };
  }
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) {
    return { contentType: 'image/jpeg', extension: 'jpg' };
  }
  if (startsWith(bytes, [0x47, 0x49, 0x46, 0x38, 0x37, 0x61])
    || startsWith(bytes, [0x47, 0x49, 0x46, 0x38, 0x39, 0x61])) {
    return { contentType: 'image/gif', extension: 'gif' };
  }
  if (startsWith(bytes, [0x00, 0x00, 0x01, 0x00])) {
    return { contentType: 'image/x-icon', extension: 'ico' };
  }
  if (startsWith(bytes, [0x52, 0x49, 0x46, 0x46])
    && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP') {
    return { contentType: 'image/webp', extension: 'webp' };
  }
  if (String.fromCharCode(...bytes.slice(4, 12)).includes('ftypavif')) {
    return { contentType: 'image/avif', extension: 'avif' };
  }
  if (safeSvg(bytes)) {
    return { contentType: 'image/svg+xml', extension: 'svg' };
  }
  return undefined;
};

const fetchResponse = async (fetcher: Fetcher, url: string, accept: string) => {
  try {
    return await fetcher(url, {
      headers: {
        Accept: accept,
        'User-Agent': 'bestjev-sponsor-logo/1.0',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(requestTimeoutMs),
    });
  } catch {
    return undefined;
  }
};

export const fetchSponsorLogoAsset = async (
  sponsorUrl: string,
  fetcher: Fetcher = fetch,
): Promise<SponsorLogoAsset | undefined> => {
  const sponsor = safeUrl(sponsorUrl);
  if (!sponsor) return undefined;

  const homepage = new URL('/', sponsor).toString();
  const pageResponse = await fetchResponse(fetcher, homepage, 'text/html');
  const candidates: string[] = [];

  if (pageResponse?.ok && pageResponse.headers.get('content-type')?.toLowerCase().includes('text/html')) {
    const pageBytes = await readLimitedBody(pageResponse, maximumPageBytes);
    if (pageBytes) {
      const resolvedPageUrl = safeUrl(pageResponse.url || homepage)?.toString() ?? homepage;
      candidates.push(...discoverIconUrls(new TextDecoder().decode(pageBytes), resolvedPageUrl));
    }
  }

  candidates.push(new URL('/favicon.ico', sponsor).toString());
  for (const sourceUrl of [...new Set(candidates)]) {
    const response = await fetchResponse(fetcher, sourceUrl, 'image/*');
    if (!response?.ok) continue;
    const bytes = await readLimitedBody(response, maximumLogoBytes);
    if (!bytes) continue;
    const image = identifyImage(bytes);
    if (image) return { bytes, sourceUrl, ...image };
  }

  return undefined;
};

const sha256 = async (bytes: Uint8Array) => {
  const data = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', data));
  return [...digest].map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

export const ensureSponsorLogo = async (
  database: D1Database,
  bucket: R2Bucket,
  sponsorUrl: string,
  fetcher: Fetcher = fetch,
) => {
  const existing = await database.prepare(`
    SELECT logo_url
    FROM sponsors
    WHERE active = 1 AND url = ?1 AND logo_url IS NOT NULL
    ORDER BY paid_at DESC
    LIMIT 1
  `).bind(sponsorUrl).first<{ logo_url: string }>();
  if (existing?.logo_url) return existing.logo_url;

  const asset = await fetchSponsorLogoAsset(sponsorUrl, fetcher);
  if (!asset) return undefined;

  const hash = await sha256(asset.bytes);
  const key = `sponsors/auto/${hash}.${asset.extension}`;
  await bucket.put(key, asset.bytes, {
    httpMetadata: {
      contentType: asset.contentType,
      cacheControl: 'public, max-age=31536000, immutable',
    },
    customMetadata: {
      sponsorUrl,
      sourceUrl: asset.sourceUrl,
    },
  });

  const logoUrl = new URL(key, sponsorLogoCdnBase).toString();
  await database.prepare(`
    UPDATE sponsors
    SET logo_url = ?1
    WHERE url = ?2 AND active = 1
  `).bind(logoUrl, sponsorUrl).run();
  return logoUrl;
};
