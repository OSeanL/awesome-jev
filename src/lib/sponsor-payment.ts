import { sponsorRules } from '../data/sponsors.ts';

interface SponsorSessionMetadata {
  sponsor_name?: string;
  sponsor_url?: string;
  sponsor_amount_usd?: string;
}

export interface CompletedSponsorSession {
  amount_total: number | null;
  currency: string | null;
  metadata: SponsorSessionMetadata | null;
  mode: string;
  payment_status: string;
}

export interface VerifiedSponsorPayment {
  amountUsd: number;
  sponsorName: string;
  sponsorUrl: string;
}

const controlCharacters = /[\u0000-\u001f\u007f]/;

export const normalizeSponsorName = (value: unknown) => {
  if (typeof value !== 'string') return undefined;
  const name = value.trim();
  if (name.length < 2 || name.length > 80 || controlCharacters.test(name)) return undefined;
  return name;
};

export const normalizeSponsorUrl = (value: unknown) => {
  if (typeof value !== 'string') return undefined;
  const candidate = value.trim();
  if (!candidate || candidate.length > 500 || controlCharacters.test(candidate)) return undefined;

  try {
    const url = new URL(candidate);
    if (url.protocol !== 'https:' || url.username || url.password) return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
};

export const isValidSponsorAmount = (amountUsd: number) =>
  Number.isSafeInteger(amountUsd)
  && amountUsd >= sponsorRules.minimumIncrementUsd
  && amountUsd % sponsorRules.minimumIncrementUsd === 0;

export const verifyCompletedSponsorSession = (
  session: CompletedSponsorSession,
): VerifiedSponsorPayment | undefined => {
  const sponsorName = normalizeSponsorName(session.metadata?.sponsor_name);
  const sponsorUrl = normalizeSponsorUrl(session.metadata?.sponsor_url);
  const metadataAmountUsd = Number(session.metadata?.sponsor_amount_usd);
  const amountUsd = session.amount_total === null ? Number.NaN : session.amount_total / 100;

  const valid = session.mode === 'payment'
    && session.payment_status === 'paid'
    && session.currency?.toLowerCase() === 'usd'
    && sponsorName
    && sponsorUrl
    && isValidSponsorAmount(amountUsd)
    && Number.isSafeInteger(metadataAmountUsd)
    && metadataAmountUsd === amountUsd;

  return valid ? { amountUsd, sponsorName, sponsorUrl } : undefined;
};
