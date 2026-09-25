import assert from 'node:assert/strict';
import test from 'node:test';
import { getAdjacentShowcaseId, getShowcaseDialogData } from '../src/lib/showcase-dialog.ts';

test('showcase dialog data exposes the video and formatted details', () => {
  const video = {
    id: '2101297208091939101',
    title: 'Pong agent',
    postText: 'My first pass at making Jev play Pong.',
    creator: { handle: 'HypnInfoSec', name: 'HypnInfoSec' },
    publishedAt: '2026-09-19',
    sourceUrl: 'https://x.com/HypnInfoSec/status/2101297208091939101',
    videoUrl: 'https://media.jevbest.com/videos/2101297208091939101.mp4',
    posterUrl: 'https://media.jevbest.com/posters/2101297208091939101.jpg',
    duration: 32.1,
    width: 434,
    height: 346,
    tags: ['Pong', '实时决策'],
  };

  assert.deepEqual(
    getShowcaseDialogData(video, {
      description: 'Jev chooses the next move.',
      categoryLabel: 'Games',
      languageLabel: 'EN',
      dateLabel: 'Sep 19, 2026',
    }),
    {
      id: '2101297208091939101',
      title: 'Pong agent',
      description: 'Jev chooses the next move.',
      postText: 'My first pass at making Jev play Pong.',
      categoryLabel: 'Games',
      languageLabel: 'EN',
      creatorHandle: 'HypnInfoSec',
      creatorName: 'HypnInfoSec',
      publishedAt: '2026-09-19',
      dateLabel: 'Sep 19, 2026',
      sourceUrl: 'https://x.com/HypnInfoSec/status/2101297208091939101',
      videoUrl: 'https://media.jevbest.com/videos/2101297208091939101.mp4',
      posterUrl: 'https://media.jevbest.com/posters/2101297208091939101.jpg',
      durationLabel: '0:32',
      resolutionLabel: '434 × 346',
      tags: ['Pong', '实时决策'],
    },
  );
});

test('showcase dialog navigation cycles through the visible videos', () => {
  const visibleIds = ['pong', 'vibe-check', 'robotics'];

  assert.equal(getAdjacentShowcaseId(visibleIds, 'pong', 'previous'), 'robotics');
  assert.equal(getAdjacentShowcaseId(visibleIds, 'pong', 'next'), 'vibe-check');
  assert.equal(getAdjacentShowcaseId(visibleIds, 'robotics', 'next'), 'pong');
});
