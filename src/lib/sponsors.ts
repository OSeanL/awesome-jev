import {
  rankedSponsors as fallbackSponsors,
  type Sponsor,
} from '../data/sponsors';
import { rankSponsors } from './sponsor-ranking.ts';

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
          MAX(paid_at) AS paid_at,
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
          ORDER BY payment.paid_at DESC, payment.checkout_session_id DESC
          LIMIT 1
        ) AS name,
        totals.url,
        totals.amount_usd,
        totals.paid_at,
        totals.clicks
      FROM sponsor_totals AS totals
      ORDER BY amount_usd DESC, paid_at DESC, name ASC
      ${limit ? 'LIMIT ?1' : ''}
    `;
    const statement = database.prepare(query);
    const result = limit
      ? await statement.bind(limit).all<SponsorRow>()
      : await statement.all<SponsorRow>();

    return rankSponsors(result.results.map(rowToSponsor));
  } catch {
    return limit ? fallbackSponsors.slice(0, limit) : fallbackSponsors;
  }
}
