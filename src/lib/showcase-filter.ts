export type ShowcaseRouteFilter<CategoryId extends string = string> =
  | { type: 'all'; slug: '' }
  | { type: 'recency'; slug: 'today' | 'this-week' }
  | { type: 'category'; slug: string; categoryId: CategoryId; sourceCategory: string };

type ShowcaseCategory<CategoryId extends string> = {
  id: CategoryId;
  slug: string;
  sourceCategory: string;
};

type ShowcaseVideo = {
  category: string;
  publishedAt: string;
};

type ShowcaseDateWindow = {
  today: string;
  weekStartsOn: string;
};

export const resolveShowcaseFilter = <CategoryId extends string>(
  requestedFilter: string | undefined,
  categories: readonly ShowcaseCategory<CategoryId>[],
): ShowcaseRouteFilter<CategoryId> => {
  if (requestedFilter === 'today' || requestedFilter === 'this-week') {
    return { type: 'recency', slug: requestedFilter };
  }

  const category = categories.find(({ slug }) => slug === requestedFilter);
  if (category) {
    return {
      type: 'category',
      slug: category.slug,
      categoryId: category.id,
      sourceCategory: category.sourceCategory,
    };
  }

  return { type: 'all', slug: '' };
};

export const filterShowcaseVideos = <Video extends ShowcaseVideo>(
  videos: readonly Video[],
  filter: ShowcaseRouteFilter,
  dates: ShowcaseDateWindow,
): Video[] => {
  if (filter.type === 'category') {
    return videos.filter(({ category }) => category === filter.sourceCategory);
  }

  if (filter.type === 'recency' && filter.slug === 'today') {
    return videos.filter(({ publishedAt }) => publishedAt === dates.today);
  }

  if (filter.type === 'recency') {
    return videos.filter(({ publishedAt }) => (
      publishedAt >= dates.weekStartsOn && publishedAt <= dates.today
    ));
  }

  return [...videos];
};
