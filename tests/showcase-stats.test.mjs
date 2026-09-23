import assert from 'node:assert/strict';
import test from 'node:test';
import { getShowcaseStats } from '../src/lib/showcase-stats.ts';

test('showcase stats use the catalog day and week boundaries', () => {
  const videos = [
    { publishedAt: '2026-09-20' },
    { publishedAt: '2026-09-21' },
    { publishedAt: '2026-09-22' },
    { publishedAt: '2026-09-23' },
    { publishedAt: '2026-09-24' },
  ];

  assert.deepEqual(
    getShowcaseStats(videos, {
      today: '2026-09-23',
      weekStartsOn: '2026-09-21',
      updatedAt: '2026-09-23T03:49:19.717Z',
    }),
    {
      addedToday: 1,
      addedThisWeek: 3,
      updatedAt: '2026-09-23T03:49:19.717Z',
    },
  );
});
