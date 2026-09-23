type ShowcaseDatedItem = {
  publishedAt: string;
};

type ShowcaseStatsInput = {
  today: string;
  weekStartsOn: string;
  updatedAt: string;
};

export const getShowcaseStats = (
  videos: ShowcaseDatedItem[],
  { today, weekStartsOn, updatedAt }: ShowcaseStatsInput,
) => ({
  addedToday: videos.filter((video) => video.publishedAt === today).length,
  addedThisWeek: videos.filter(
    (video) => video.publishedAt >= weekStartsOn && video.publishedAt <= today,
  ).length,
  updatedAt,
});
