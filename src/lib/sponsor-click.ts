export const incrementSponsorClickSql = `
  UPDATE sponsors
  SET clicks = clicks + 1
  WHERE checkout_session_id = (
    SELECT checkout_session_id
    FROM sponsors
    WHERE active = 1 AND url = ?1
    ORDER BY paid_at DESC, checkout_session_id DESC
    LIMIT 1
  )
`;

export async function incrementSponsorClick(database: D1Database, sponsorUrl: string) {
  const result = await database.prepare(incrementSponsorClickSql).bind(sponsorUrl).run();
  return result.meta.changes > 0;
}
