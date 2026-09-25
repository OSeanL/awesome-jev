ALTER TABLE sponsors ADD COLUMN logo_url TEXT;

UPDATE sponsors
SET logo_url = 'https://media.jevbest.com/sponsors/xcodexs-8153f8e6.svg'
WHERE url = 'https://xcodexs.com/';

DROP INDEX IF EXISTS sponsors_rank_idx;

CREATE INDEX sponsors_rank_idx
  ON sponsors (active, amount_usd DESC, paid_at ASC);
