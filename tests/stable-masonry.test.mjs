import assert from 'node:assert/strict';
import test from 'node:test';
import { planStableMasonry } from '../src/lib/stable-masonry.ts';

test('appending cards preserves every existing masonry position', () => {
  const initial = planStableMasonry([100, 200, 150, 80], 2, 10);
  const appended = planStableMasonry([100, 200, 150, 80, 50], 2, 10);

  assert.deepEqual(initial.items, [
    { column: 0, y: 0 },
    { column: 1, y: 0 },
    { column: 0, y: 110 },
    { column: 1, y: 210 },
  ]);
  assert.deepEqual(appended.items.slice(0, initial.items.length), initial.items);
  assert.deepEqual(appended.items[4], { column: 0, y: 270 });
  assert.equal(appended.height, 320);
});
