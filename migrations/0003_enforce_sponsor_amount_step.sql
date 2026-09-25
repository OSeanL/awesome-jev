CREATE TRIGGER IF NOT EXISTS sponsors_amount_step_insert
BEFORE INSERT ON sponsors
WHEN NEW.amount_usd < 5 OR NEW.amount_usd % 5 != 0
BEGIN
  SELECT RAISE(ABORT, 'Sponsor amount must be a positive multiple of 5 USD');
END;

CREATE TRIGGER IF NOT EXISTS sponsors_amount_step_update
BEFORE UPDATE OF amount_usd ON sponsors
WHEN NEW.amount_usd < 5 OR NEW.amount_usd % 5 != 0
BEGIN
  SELECT RAISE(ABORT, 'Sponsor amount must be a positive multiple of 5 USD');
END;
