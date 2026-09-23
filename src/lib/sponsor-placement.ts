export type SponsorPlacementChoice = {
  sponsorIndex: number;
  position: number;
};

export type SponsorPlacementPlan = SponsorPlacementChoice & {
  pageIndex: number;
  pageStart: number;
  pageLength: number;
};

export type SponsorSlotChoice = {
  position: number;
};

export type SponsorSlotPlan = SponsorSlotChoice & {
  key: string;
  pageIndex: number;
  pageStart: number;
  pageLength: number;
};

export const sponsorPlacementPageSize = 10;

export function planSponsorSlots(
  itemKeys: string[],
  pageSize: number,
  choices: Map<string, SponsorSlotChoice>,
): SponsorSlotPlan[] {
  if (itemKeys.length === 0 || pageSize < 1) return [];

  const slots: SponsorSlotPlan[] = [];
  for (let pageStart = 0; pageStart + pageSize <= itemKeys.length; pageStart += pageSize) {
    const pageIndex = pageStart / pageSize;
    const pageLength = pageSize;
    const key = `${pageIndex}:${JSON.stringify(itemKeys.slice(pageStart, pageStart + pageLength))}`;
    let choice = choices.get(key);
    if (!choice) {
      choice = { position: pageLength };
      choices.set(key, choice);
    }
    slots.push({ key, pageIndex, pageStart, pageLength, ...choice });
  }

  return slots;
}

export function planSponsorPlacements(
  itemKeys: string[],
  pageSize: number,
  sponsorCount: number,
  choices: Map<string, SponsorPlacementChoice>,
  random: () => number = Math.random,
): SponsorPlacementPlan[] {
  if (itemKeys.length === 0 || pageSize < 1 || sponsorCount < 1) return [];

  const placements: SponsorPlacementPlan[] = [];

  for (let pageStart = 0; pageStart + pageSize <= itemKeys.length; pageStart += pageSize) {
    const pageIndex = pageStart / pageSize;
    const pageLength = pageSize;
    const pageKey = `${pageIndex}:${JSON.stringify(itemKeys.slice(pageStart, pageStart + pageLength))}`;
    let choice = choices.get(pageKey);
    if (!choice) {
      choice = {
        sponsorIndex: Math.floor(random() * sponsorCount),
        position: pageLength,
      };
      choices.set(pageKey, choice);
    }
    placements.push({ pageIndex, pageStart, pageLength, ...choice });
  }

  return placements;
}
