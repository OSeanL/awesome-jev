import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const readme = readFileSync(new URL('../README.md', import.meta.url), 'utf8');
const navigationSource = readFileSync(new URL('../src/data/catalog-navigation.ts', import.meta.url), 'utf8');
const catalogHeadings = [...readme.matchAll(/^### (.+?) \((\d+)\)$/gm)]
  .map(([, name, count]) => ({ name, count: Number(count) }));

test('sidebar catalog counts stay in sync with the canonical catalog', () => {
  const categoryCounts = navigationSource.match(/const categoryCounts = \[([^\]]+)\]/)?.[1]
    .split(',')
    .map((count) => Number(count.trim()));

  assert.deepEqual(categoryCounts, catalogHeadings.map(({ count }) => count));
  assert.equal(
    categoryCounts.reduce((total, count) => total + count, 0),
    catalogHeadings.reduce((total, category) => total + category.count, 0),
  );
});
