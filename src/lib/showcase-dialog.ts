type ShowcaseDialogVideo = {
  id: string;
  title: string;
  postText: string;
  creator: { handle: string; name: string };
  publishedAt: string;
  sourceUrl: string;
  videoUrl: string;
  posterUrl: string;
  duration: number;
  width: number;
  height: number;
  tags: string[];
};

type ShowcaseDialogLabels = {
  description: string;
  categoryLabel: string;
  languageLabel: string;
  dateLabel: string;
};

type ShowcaseDirection = 'previous' | 'next';

export const getAdjacentShowcaseId = (
  visibleIds: string[],
  currentId: string,
  direction: ShowcaseDirection,
) => {
  if (visibleIds.length === 0) return undefined;
  const currentIndex = visibleIds.indexOf(currentId);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const offset = direction === 'next' ? 1 : -1;
  return visibleIds[(safeIndex + offset + visibleIds.length) % visibleIds.length];
};

export const formatShowcaseDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.round(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
};

export const getShowcaseDialogData = (
  video: ShowcaseDialogVideo,
  labels: ShowcaseDialogLabels,
) => ({
  id: video.id,
  title: video.title,
  description: labels.description,
  postText: video.postText,
  categoryLabel: labels.categoryLabel,
  languageLabel: labels.languageLabel,
  creatorHandle: video.creator.handle,
  creatorName: video.creator.name,
  publishedAt: video.publishedAt,
  dateLabel: labels.dateLabel,
  sourceUrl: video.sourceUrl,
  videoUrl: video.videoUrl,
  posterUrl: video.posterUrl,
  durationLabel: formatShowcaseDuration(video.duration),
  resolutionLabel: `${video.width} × ${video.height}`,
  tags: video.tags,
});
