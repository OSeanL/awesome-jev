export interface RankableSponsor {
  amountUsd: number;
  name: string;
  sponsoredAt: string;
  url: string;
}

export const rankSponsors = <Sponsor extends RankableSponsor>(sponsors: readonly Sponsor[]) =>
  [...sponsors].sort((first, second) =>
    second.amountUsd - first.amountUsd
    || first.sponsoredAt.localeCompare(second.sponsoredAt)
    || first.name.localeCompare(second.name, 'en'),
  );

export const getDefaultSponsorAmount = (
  sponsors: readonly RankableSponsor[],
  incrementUsd = 5,
) => Math.max(0, ...sponsors.map((sponsor) => sponsor.amountUsd)) + incrementUsd;

export const getProjectedSponsorRank = (
  sponsors: readonly RankableSponsor[],
  amountUsd: number,
  productUrl?: string,
) => {
  let canonicalUrl: string | undefined;
  if (productUrl) {
    try {
      canonicalUrl = new URL(productUrl).toString();
    } catch {
      canonicalUrl = undefined;
    }
  }

  const currentSponsor = canonicalUrl
    ? sponsors.find((sponsor) => sponsor.url === canonicalUrl)
    : undefined;
  const projectedTotalUsd = amountUsd + (currentSponsor?.amountUsd ?? 0);

  return 1 + sponsors.filter((sponsor) =>
    sponsor.url !== currentSponsor?.url
    && sponsor.amountUsd >= projectedTotalUsd,
  ).length;
};
