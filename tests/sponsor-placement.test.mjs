import assert from 'node:assert/strict';
import test from 'node:test';
import {
  planSponsorSlots,
  planSponsorPlacements,
  sponsorPlacementPageSize,
} from '../src/lib/sponsor-placement.ts';

test('sponsor slots are reserved before sponsor products have loaded', () => {
  const items = Array.from({ length: 10 }, (_, index) => String(index));
  const slots = planSponsorSlots(
    items,
    sponsorPlacementPageSize,
    new Map(),
  );

  assert.equal(slots.length, 1);
  assert.deepEqual(
    { pageIndex: slots[0].pageIndex, pageStart: slots[0].pageStart, pageLength: slots[0].pageLength, position: slots[0].position },
    { pageIndex: 0, pageStart: 0, pageLength: 10, position: 10 },
  );
});

test('sponsor placements choose a random product after every complete group of ten', () => {
  const values = [0.1, 0.75];
  const random = () => values.shift();

  const placements = planSponsorPlacements(
    Array.from({ length: 25 }, (_, index) => String(index)),
    sponsorPlacementPageSize,
    2,
    new Map(),
    random,
  );

  assert.deepEqual(placements, [
    { pageIndex: 0, pageStart: 0, pageLength: 10, sponsorIndex: 0, position: 10 },
    { pageIndex: 1, pageStart: 10, pageLength: 10, sponsorIndex: 1, position: 10 },
  ]);
});

test('an incomplete group does not receive a sponsor placement', () => {
  const items = Array.from({ length: 9 }, (_, index) => String(index));
  assert.deepEqual(planSponsorPlacements(items, sponsorPlacementPageSize, 3, new Map()), []);
});

test('an existing page keeps its sponsor when another page is loaded', () => {
  const values = [0.6, 0.1];
  const random = () => values.shift();
  const choices = new Map();

  const firstTen = Array.from({ length: 10 }, (_, index) => String(index));
  const firstTwenty = Array.from({ length: 20 }, (_, index) => String(index));
  const firstPage = planSponsorPlacements(firstTen, sponsorPlacementPageSize, 3, choices, random);
  const withNextPage = planSponsorPlacements(firstTwenty, sponsorPlacementPageSize, 3, choices, random);

  assert.deepEqual(withNextPage, [
    firstPage[0],
    { pageIndex: 1, pageStart: 10, pageLength: 10, sponsorIndex: 0, position: 10 },
  ]);
  assert.equal(values.length, 0);
});

test('no placement is planned when there are no sponsor products', () => {
  assert.deepEqual(planSponsorPlacements(['a', 'b'], sponsorPlacementPageSize, 0, new Map()), []);
});
