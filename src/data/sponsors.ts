import { rankSponsors } from '../lib/sponsor-ranking.ts';

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

export const rankedSponsors = rankSponsors(sponsors);

export const sidebarSponsors = rankedSponsors.slice(0, sponsorRules.sidebarSlots);
