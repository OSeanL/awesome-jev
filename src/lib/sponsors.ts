import {
  rankedSponsors as fallbackSponsors,
  sponsorRules,
  type Sponsor,
} from '../data/sponsors';

interface SponsorRow {
  checkout_session_id: string;
  name: string;
  url: string;
  amount_usd: number;
  paid_at: string;
  clicks: number;
}

const logoToneFor = (name: string): Sponsor['logoTone'] =>
  name === 'OpenJEV' ? 'dark' : 'light';

const descriptionFor = (name: string, url: string) =>
  fallbackSponsors.find((sponsor) => sponsor.name === name)?.description
  ?? `Featured sponsor from ${new URL(url).hostname.replace(/^www\./, '')}.`;

const rowToSponsor = (row: SponsorRow): Sponsor => ({
  id: row.checkout_session_id,
  name: row.name,
  url: row.url,
  amountUsd: row.amount_usd,
  sponsoredAt: row.paid_at,
  logoTone: logoToneFor(row.name),
  description: descriptionFor(row.name, row.url),
  clicks: row.clicks,
});

export async function getRankedSponsors(
  database: D1Database | undefined,
  limit?: number,
): Promise<Sponsor[]> {
  if (!database) return limit ? fallbackSponsors.slice(0, limit) : fallbackSponsors;

  try {
    const query = `
      WITH sponsor_totals AS (
        SELECT
          url,
          SUM(amount_usd) AS amount_usd,
          MIN(paid_at) AS paid_at,
          SUM(clicks) AS clicks
        FROM sponsors
        WHERE active = 1
        GROUP BY url
      )
      SELECT
        'sponsor_' || hex(totals.url) AS checkout_session_id,
        (
          SELECT payment.name
          FROM sponsors AS payment
          WHERE payment.active = 1 AND payment.url = totals.url
          ORDER BY payment.paid_at ASC, payment.checkout_session_id ASC
          LIMIT 1
        ) AS name,
        totals.url,
        totals.amount_usd,
        totals.paid_at,
        totals.clicks
      FROM sponsor_totals AS totals
      ORDER BY amount_usd DESC, paid_at ASC, name ASC
      ${limit ? 'LIMIT ?1' : ''}
    `;
    const statement = database.prepare(query);
    const result = limit
      ? await statement.bind(limit).all<SponsorRow>()
      : await statement.all<SponsorRow>();

    return result.results.map(rowToSponsor);
  } catch {
    return limit ? fallbackSponsors.slice(0, limit) : fallbackSponsors;
  }
}

export async function getNextTopRankAmountUsd(database: D1Database | undefined) {
  const [topSponsor] = await getRankedSponsors(database, 1);
  return (topSponsor?.amountUsd ?? 0) + sponsorRules.minimumIncrementUsd;
}

export async function getRequiredNextTopRankAmountUsd(database: D1Database) {
  const result = await database.prepare(`
    SELECT COALESCE(MAX(total_amount), 0) AS top_amount
    FROM (
      SELECT SUM(amount_usd) AS total_amount
      FROM sponsors
      WHERE active = 1
      GROUP BY url
    )
  `).first<{ top_amount: number | null }>();
  const topAmountUsd = result?.top_amount ?? 0;

  if (
    !Number.isSafeInteger(topAmountUsd)
    || topAmountUsd < 0
    || topAmountUsd % sponsorRules.minimumIncrementUsd !== 0
  ) {
    throw new Error('Sponsor totals failed validation.');
  }

  const nextAmountUsd = topAmountUsd + sponsorRules.minimumIncrementUsd;
  if (!Number.isSafeInteger(nextAmountUsd)) throw new Error('Sponsor total exceeds the safe integer range.');
  return nextAmountUsd;
}
