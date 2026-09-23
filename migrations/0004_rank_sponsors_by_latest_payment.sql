DROP INDEX IF EXISTS sponsors_rank_idx;

CREATE INDEX sponsors_rank_idx
  ON sponsors (active, amount_usd DESC, paid_at DESC);
