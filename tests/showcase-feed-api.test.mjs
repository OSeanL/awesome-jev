import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { formatShowcaseDuration } from '../src/lib/showcase-dialog.ts';
import { GET } from '../src/pages/api/showcase/[locale].json.ts';

const showcase = JSON.parse(readFileSync(new URL('../src/data/showcase.json', import.meta.url), 'utf8'));

test('showcase API returns one localized 24-item page for a route filter', async () => {
  const url = new URL('https://jevbest.com/api/showcase/zh.json?filter=games&offset=0&limit=24');
  const response = await GET({
    params: { locale: 'zh' },
    request: new Request(url),
    url,
  });
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.locale, 'zh');
  assert.equal(body.filter, 'games');
  assert.equal(body.offset, 0);
  assert.equal(body.limit, 24);
  const games = showcase.videos.filter((video) => video.category === 'Games & real time');
  assert.equal(body.total, games.length);
  assert.equal(body.nextOffset, 24);
  assert.equal(body.hasMore, true);
  assert.equal(body.items.length, 24);
  assert.equal(body.items[0].id, games[0].id);
  assert.equal(body.items[0].description, games[0].descriptions.zh);
  assert.equal(body.items[0].categoryLabel, '游戏与实时交互');
  assert.equal(body.items[0].dialogData.description, body.items[0].description);
  assert.equal(body.items[0].dialogData.durationLabel, formatShowcaseDuration(games[0].duration));
  assert.equal('descriptions' in body.items[0], false);
});

test('showcase API searches the full localized collection before pagination', async () => {
  const url = new URL('https://jevbest.com/api/showcase/zh.json?q=MLX-Serve&offset=0&limit=24');
  const response = await GET({
    params: { locale: 'zh' },
    request: new Request(url),
    url,
  });
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.query, 'MLX-Serve');
  assert.equal(body.total, 1);
  assert.equal(body.items.length, 1);
  assert.equal(body.items[0].id, '2102379667919425536');
  assert.equal(body.hasMore, false);
});
