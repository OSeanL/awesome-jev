import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';
import { incrementSponsorClickSql } from '../src/lib/sponsor-click.ts';

test('a sponsor click increments only the latest active payment for that product', () => {
  const database = new DatabaseSync(':memory:');
  database.exec(`
    CREATE TABLE sponsors (
      checkout_session_id TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      paid_at TEXT NOT NULL,
      clicks INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1
    );
    INSERT INTO sponsors (checkout_session_id, url, paid_at, clicks, active) VALUES
      ('older', 'https://example.com/', '2026-09-20T00:00:00Z', 3, 1),
      ('latest', 'https://example.com/', '2026-09-23T00:00:00Z', 0, 1),
      ('inactive', 'https://example.com/', '2026-09-24T00:00:00Z', 7, 0);
  `);

  const result = database.prepare(incrementSponsorClickSql).run('https://example.com/');
  assert.equal(result.changes, 1);
  assert.deepEqual(
    database.prepare('SELECT checkout_session_id, clicks FROM sponsors ORDER BY checkout_session_id').all()
      .map((row) => ({ ...row })),
    [
      { checkout_session_id: 'inactive', clicks: 7 },
      { checkout_session_id: 'latest', clicks: 1 },
      { checkout_session_id: 'older', clicks: 3 },
    ],
  );
});

test('a click for an unknown sponsor does not update any row', () => {
  const database = new DatabaseSync(':memory:');
  database.exec(`
    CREATE TABLE sponsors (
      checkout_session_id TEXT PRIMARY KEY,
      url TEXT NOT NULL,
      paid_at TEXT NOT NULL,
      clicks INTEGER NOT NULL DEFAULT 0,
      active INTEGER NOT NULL DEFAULT 1
    );
  `);

  const result = database.prepare(incrementSponsorClickSql).run('https://unknown.example/');
  assert.equal(result.changes, 0);
});
