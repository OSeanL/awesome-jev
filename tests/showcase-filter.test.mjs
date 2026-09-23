import assert from 'node:assert/strict';
import test from 'node:test';
import {
  filterShowcaseVideos,
  resolveShowcaseFilter,
} from '../src/lib/showcase-filter.ts';

const categories = [
  { id: '效率工具', slug: 'productivity', sourceCategory: 'Tools & apps' },
  { id: '自动化', slug: 'automation', sourceCategory: 'Agents & browsers' },
];

const videos = [
  { id: 'today-productivity', category: 'Tools & apps', publishedAt: '2026-09-23' },
  { id: 'week-automation', category: 'Agents & browsers', publishedAt: '2026-09-21' },
  { id: 'older-productivity', category: 'Tools & apps', publishedAt: '2026-09-14' },
];

test('showcase route resolves to exactly one filter dimension', () => {
  assert.deepEqual(resolveShowcaseFilter(undefined, categories), { type: 'all', slug: '' });
  assert.deepEqual(resolveShowcaseFilter('today', categories), { type: 'recency', slug: 'today' });
  assert.deepEqual(resolveShowcaseFilter('this-week', categories), { type: 'recency', slug: 'this-week' });
  assert.deepEqual(resolveShowcaseFilter('productivity', categories), {
    type: 'category',
    slug: 'productivity',
    categoryId: '效率工具',
    sourceCategory: 'Tools & apps',
  });
});

test('showcase filtering never combines recency and category filters', () => {
  const dates = { today: '2026-09-23', weekStartsOn: '2026-09-21' };

  assert.deepEqual(
    filterShowcaseVideos(videos, resolveShowcaseFilter('today', categories), dates).map(({ id }) => id),
    ['today-productivity'],
  );
  assert.deepEqual(
    filterShowcaseVideos(videos, resolveShowcaseFilter('this-week', categories), dates).map(({ id }) => id),
    ['today-productivity', 'week-automation'],
  );
  assert.deepEqual(
    filterShowcaseVideos(videos, resolveShowcaseFilter('productivity', categories), dates).map(({ id }) => id),
    ['today-productivity', 'older-productivity'],
  );
});
