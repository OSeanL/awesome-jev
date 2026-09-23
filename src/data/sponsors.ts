export interface Sponsor {
  id: string;
  name: string;
  url: string;
  amountUsd: number;
  sponsoredAt: string;
  logoTone: 'light' | 'dark';
  description: string;
  clicks: number;
}

export const sponsorRules = {
  sidebarSlots: 3,
  minimumIncrementUsd: 5,
} as const;

const sponsors: Sponsor[] = [];

export const rankedSponsors = [...sponsors].sort((first, second) =>
  second.amountUsd - first.amountUsd
  || first.sponsoredAt.localeCompare(second.sponsoredAt)
  || first.name.localeCompare(second.name, 'en'),
);

export const sidebarSponsors = rankedSponsors.slice(0, sponsorRules.sidebarSlots);

export const nextTopRankAmountUsd =
  (rankedSponsors[0]?.amountUsd ?? 0) + sponsorRules.minimumIncrementUsd;
