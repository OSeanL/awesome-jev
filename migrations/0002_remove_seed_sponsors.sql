DELETE FROM sponsors
WHERE checkout_session_id IN (
  'seed_openjev',
  'seed_blink_review',
  'seed_spacebrain'
);
