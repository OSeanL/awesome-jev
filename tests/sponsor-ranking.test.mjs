import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getDefaultSponsorAmount,
  getProjectedSponsorRank,
  rankSponsors,
} from '../src/lib/sponsor-ranking.ts';

const sponsor = (name, amountUsd, sponsoredAt, url = `https://${name.toLowerCase()}.example/`) => ({
  name,
  url,
  amountUsd,
  sponsoredAt,
});

test('sponsors rank by amount descending and then latest payment descending', () => {
  const ranked = rankSponsors([
    sponsor('Older', 25, '2026-09-23T10:00:00Z'),
    sponsor('Higher', 30, '2026-09-23T09:00:00Z'),
    sponsor('Newer', 25, '2026-09-23T11:00:00Z'),
  ]);

  assert.deepEqual(ranked.map(({ name }) => name), ['Higher', 'Newer', 'Older']);
});

test('a new payment takes the first rank after sponsors with a higher total', () => {
  const sponsors = [
    sponsor('First', 30, '2026-09-23T09:00:00Z'),
    sponsor('Second', 25, '2026-09-23T10:00:00Z'),
    sponsor('Third', 20, '2026-09-23T11:00:00Z'),
  ];

  assert.equal(getProjectedSponsorRank(sponsors, 25), 2);
  assert.equal(getProjectedSponsorRank(sponsors, 5), 4);
});

test('a repeat payment ranks the accumulated total and refreshes the tie-break time', () => {
  const returningUrl = 'https://returning.example/';
  const sponsors = [
    sponsor('First', 30, '2026-09-23T09:00:00Z'),
    sponsor('Returning', 20, '2026-09-23T10:00:00Z', returningUrl),
    sponsor('Peer', 25, '2026-09-23T11:00:00Z'),
  ];

  assert.equal(getProjectedSponsorRank(sponsors, 5, returningUrl), 2);
});

test('the default sponsor amount claims first place with one five-dollar step', () => {
  assert.equal(getDefaultSponsorAmount([
    sponsor('First', 15, '2026-09-23T09:00:00Z'),
    sponsor('Second', 10, '2026-09-23T10:00:00Z'),
  ]), 20);
  assert.equal(getDefaultSponsorAmount([]), 5);
});
