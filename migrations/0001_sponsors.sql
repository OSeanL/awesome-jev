CREATE TABLE IF NOT EXISTS sponsors (
  checkout_session_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  amount_usd INTEGER NOT NULL CHECK (amount_usd >= 5),
  paid_at TEXT NOT NULL,
  stripe_payment_intent_id TEXT,
  clicks INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1))
);

CREATE INDEX IF NOT EXISTS sponsors_rank_idx
  ON sponsors (active, amount_usd DESC, paid_at ASC);

INSERT OR IGNORE INTO sponsors (
  checkout_session_id,
  name,
  url,
  amount_usd,
  paid_at,
  stripe_payment_intent_id,
  clicks,
  active
) VALUES
  ('seed_openjev', 'OpenJEV', 'https://openjev.sh/', 35, '2026-09-23T00:00:00Z', NULL, 0, 1),
  ('seed_blink_review', 'blink.review', 'https://blink.review/', 30, '2026-09-23T00:01:00Z', NULL, 0, 1),
  ('seed_spacebrain', 'Spacebrain', 'https://spacebrain.ai/', 25, '2026-09-23T00:02:00Z', NULL, 0, 1);
