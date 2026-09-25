export type StableMasonryItem = {
  column: number;
  y: number;
};

export type StableMasonryPlan = {
  items: StableMasonryItem[];
  height: number;
};

export function planStableMasonry(
  itemHeights: number[],
  columnCount: number,
  gap: number,
): StableMasonryPlan {
  const columns = Math.max(1, Math.floor(columnCount));
  const safeGap = Math.max(0, gap);
  const columnHeights = Array.from({ length: columns }, () => 0);
  const items = itemHeights.map((height) => {
    const shortestHeight = Math.min(...columnHeights);
    const column = columnHeights.indexOf(shortestHeight);
    const y = columnHeights[column];
    columnHeights[column] += Math.max(0, height) + safeGap;
    return { column, y };
  });
  const height = items.length > 0 ? Math.max(...columnHeights) - safeGap : 0;

  return { items, height };
}
