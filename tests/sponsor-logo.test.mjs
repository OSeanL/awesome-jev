import assert from 'node:assert/strict';
import test from 'node:test';
import {
  ensureSponsorLogo,
  fetchSponsorLogoAsset,
} from '../src/lib/sponsor-logo.ts';

const pngBytes = Uint8Array.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
  0x00, 0x00, 0x00, 0x0d,
]);

test('sponsor logo discovery resolves a page icon and validates its image bytes', async () => {
  const requested = [];
  const fetcher = async (input) => {
    const url = String(input);
    requested.push(url);
    if (url === 'https://example.com/') {
      return new Response('<link rel="icon" href="/brand/icon.png">', {
        headers: { 'content-type': 'text/html; charset=utf-8' },
      });
    }
    if (url === 'https://example.com/brand/icon.png') {
      return new Response(pngBytes, { headers: { 'content-type': 'image/png' } });
    }
    return new Response(null, { status: 404 });
  };

  const asset = await fetchSponsorLogoAsset('https://example.com/product', fetcher);

  assert.deepEqual(requested, [
    'https://example.com/',
    'https://example.com/brand/icon.png',
  ]);
  assert.equal(asset?.contentType, 'image/png');
  assert.equal(asset?.extension, 'png');
  assert.equal(asset?.sourceUrl, 'https://example.com/brand/icon.png');
  assert.deepEqual(asset?.bytes, pngBytes);
});

test('sponsor logo discovery falls back to favicon.ico when page metadata is unusable', async () => {
  const fetcher = async (input) => {
    const url = String(input);
    if (url === 'https://example.com/') {
      return new Response('<link rel="icon" href="http://insecure.example/icon.png">', {
        headers: { 'content-type': 'text/html' },
      });
    }
    if (url === 'https://example.com/favicon.ico') {
      return new Response(Uint8Array.from([0, 0, 1, 0, 1, 0]), {
        headers: { 'content-type': 'application/octet-stream' },
      });
    }
    return new Response(null, { status: 404 });
  };

  const asset = await fetchSponsorLogoAsset('https://example.com/', fetcher);

  assert.equal(asset?.contentType, 'image/x-icon');
  assert.equal(asset?.extension, 'ico');
  assert.equal(asset?.sourceUrl, 'https://example.com/favicon.ico');
});

test('automatic sponsor logos upload once and persist the public CDN URL', async () => {
  let stored;
  let updated;
  const database = {
    prepare(sql) {
      return {
        bind(...values) {
          return {
            async first() {
              assert.match(sql, /SELECT logo_url/);
              return null;
            },
            async run() {
              assert.match(sql, /UPDATE sponsors/);
              updated = values;
              return { success: true };
            },
          };
        },
      };
    },
  };
  const bucket = {
    async put(key, value, options) {
      stored = { key, value: new Uint8Array(value), options };
    },
  };
  const fetcher = async (input) => String(input).endsWith('/favicon.ico')
    ? new Response(pngBytes, { headers: { 'content-type': 'image/png' } })
    : new Response('<html></html>', { headers: { 'content-type': 'text/html' } });

  const logoUrl = await ensureSponsorLogo(
    database,
    bucket,
    'https://example.com/',
    fetcher,
  );

  assert.match(logoUrl ?? '', /^https:\/\/media\.jevbest\.com\/sponsors\/auto\/[a-f0-9]{64}\.png$/);
  assert.equal(stored?.key, new URL(logoUrl).pathname.slice(1));
  assert.deepEqual(stored?.value, pngBytes);
  assert.equal(stored?.options.httpMetadata.contentType, 'image/png');
  assert.deepEqual(updated, [logoUrl, 'https://example.com/']);
});
