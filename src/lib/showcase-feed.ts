import { localeConfig, type Locale } from '../i18n/config.ts';
import {
  getShowcaseCategoryLabel,
  getShowcaseDescription,
  getShowcaseMessages,
  showcaseCategoryDefinitions,
} from '../i18n/showcase.ts';
import { formatShowcaseDuration, getShowcaseDialogData } from './showcase-dialog.ts';
import { filterShowcaseVideos, resolveShowcaseFilter } from './showcase-filter.ts';

export const SHOWCASE_PAGE_SIZE = 24;

export type ShowcaseSourceVideo = {
  id: string;
  title: string;
  description: string;
  descriptions: Partial<Record<Locale, string>>;
  postText: string;
  category: string;
  language: string;
  creator: { handle: string; name: string };
  publishedAt: string;
  sourceUrl: string;
  videoUrl: string;
  posterUrl: string;
  duration: number;
  width: number;
  height: number;
  aspectRatio: number;
  tags: string[];
};

type ShowcaseFeedOptions = {
  locale: Locale;
  filterSlug?: string;
  query?: string;
  offset?: number;
  limit?: number;
  today: string;
  weekStartsOn: string;
};

const safeInteger = (value: number | undefined, fallback: number) => (
  Number.isSafeInteger(value) && (value ?? -1) >= 0 ? value as number : fallback
);

export const getShowcaseFeedPage = (
  videos: readonly ShowcaseSourceVideo[],
  options: ShowcaseFeedOptions,
) => {
  const offset = safeInteger(options.offset, 0);
  const requestedLimit = safeInteger(options.limit, SHOWCASE_PAGE_SIZE);
  const limit = Math.min(Math.max(requestedLimit, 1), SHOWCASE_PAGE_SIZE);
  const filter = resolveShowcaseFilter(options.filterSlug, showcaseCategoryDefinitions);
  const filteredVideos = filterShowcaseVideos(videos, filter, {
    today: options.today,
    weekStartsOn: options.weekStartsOn,
  });
  const query = options.query?.trim() ?? '';
  const normalizedQuery = query.toLocaleLowerCase(options.locale);
  const localizedDescription = (video: ShowcaseSourceVideo) => (
    video.descriptions[options.locale]
      ?? getShowcaseDescription(options.locale, video.id, video.description)
  );
  const matchingVideos = normalizedQuery
    ? filteredVideos.filter((video) => [
      video.title,
      localizedDescription(video),
      video.creator.name,
      video.creator.handle,
      video.category,
      ...video.tags,
    ].join(' ').toLocaleLowerCase(options.locale).includes(normalizedQuery))
    : filteredVideos;
  const dateFormatter = new Intl.DateTimeFormat(localeConfig[options.locale].languageTag, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
  const messages = getShowcaseMessages(options.locale);
  const languageLabel = (language: string) => (
    { en: 'EN', ja: 'JA', zh: 'ZH' }[language] ?? language.toUpperCase()
  );
  const items = matchingVideos.slice(offset, offset + limit).map(({ descriptions, ...video }) => {
    const description = descriptions[options.locale]
      ?? getShowcaseDescription(options.locale, video.id, video.description);
    const categoryLabel = getShowcaseCategoryLabel(options.locale, video.category);
    const localizedLanguageLabel = languageLabel(video.language);
    const dateLabel = dateFormatter.format(new Date(`${video.publishedAt}T00:00:00Z`));

    return {
      ...video,
      description,
      categoryLabel,
      languageLabel: localizedLanguageLabel,
      dateLabel,
      durationLabel: formatShowcaseDuration(video.duration),
      resolutionLabel: `${video.width} × ${video.height}`,
      playLabel: messages.play(video.title),
      dialogData: getShowcaseDialogData(video, {
        description,
        categoryLabel,
        languageLabel: localizedLanguageLabel,
        dateLabel,
      }),
    };
  });
  const nextOffset = offset + items.length;

  return {
    locale: options.locale,
    filter: filter.slug,
    query,
    offset,
    limit,
    total: matchingVideos.length,
    nextOffset,
    hasMore: nextOffset < matchingVideos.length,
    items,
  };
};
