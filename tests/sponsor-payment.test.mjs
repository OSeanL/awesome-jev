import assert from 'node:assert/strict';
import test from 'node:test';
import {
  isValidSponsorAmount,
  normalizeSponsorName,
  normalizeSponsorUrl,
  verifyCompletedSponsorSession,
} from '../src/lib/sponsor-payment.ts';

test('sponsor amounts use a five-dollar step and enforce the current minimum', () => {
  assert.equal(isValidSponsorAmount(5, 5), true);
  assert.equal(isValidSponsorAmount(15, 10), true);
  assert.equal(isValidSponsorAmount(1, 5), false);
  assert.equal(isValidSponsorAmount(6, 5), false);
  assert.equal(isValidSponsorAmount(10, 15), false);
  assert.equal(isValidSponsorAmount(Number.POSITIVE_INFINITY, 5), false);
});

test('sponsor identity fields reject unsafe or oversized values', () => {
  assert.equal(normalizeSponsorName('  Product  '), 'Product');
  assert.equal(normalizeSponsorName('x'), undefined);
  assert.equal(normalizeSponsorName('Bad\u0000Name'), undefined);
  assert.equal(normalizeSponsorUrl('https://example.com/path'), 'https://example.com/path');
  assert.equal(normalizeSponsorUrl('http://example.com'), undefined);
  assert.equal(normalizeSponsorUrl('https://user:pass@example.com'), undefined);
});

test('webhook payment must match the signed Stripe session and server metadata', () => {
  const session = {
    amount_total: 2500,
    currency: 'usd',
    metadata: {
      sponsor_name: 'Example',
      sponsor_url: 'https://example.com/',
      sponsor_amount_usd: '25',
    },
    mode: 'payment',
    payment_status: 'paid',
  };

  assert.deepEqual(verifyCompletedSponsorSession(session), {
    amountUsd: 25,
    sponsorName: 'Example',
    sponsorUrl: 'https://example.com/',
  });
  assert.equal(verifyCompletedSponsorSession({ ...session, currency: 'eur' }), undefined);
  assert.equal(verifyCompletedSponsorSession({ ...session, amount_total: 2000 }), undefined);
  assert.equal(verifyCompletedSponsorSession({ ...session, payment_status: 'unpaid' }), undefined);
  assert.equal(verifyCompletedSponsorSession({ ...session, mode: 'subscription' }), undefined);
});
