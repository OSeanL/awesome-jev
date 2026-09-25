import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(new URL('../src/components/NewFeatureTour.astro', import.meta.url), 'utf8');
const homeSource = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const globalStyles = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');

test('feature tour autoplays only the active muted video', () => {
  assert.match(source, /const playActiveVideo = \(\) =>/);
  assert.match(source, /video\.muted = true/);
  assert.match(source, /void video\.play\(\)\.catch/);
  assert.match(source, /if \(!active && video instanceof HTMLVideoElement\) video\.pause\(\)/);
  assert.match(source, /prefers-reduced-motion: reduce/);
});

test('feature tour makes early advancement an explicit skip action', () => {
  assert.match(source, /data-skip-video-label/);
  assert.match(source, /data-skip-done-label/);
  assert.match(source, /video\.addEventListener\('ended', syncNextButton\)/);
  assert.match(source, /data-video-finished/);
});

test('feature tour can be dismissed without stepping through every video', () => {
  assert.match(source, /data-tour-skip/);
  assert.match(source, /skip\?\.addEventListener\('click', closeTour\)/);
  assert.doesNotMatch(source, /closedby="none"/);
  assert.doesNotMatch(source, /addEventListener\('cancel',[\s\S]*preventDefault/);
});

test('the homepage exposes a localized inline tour link that reopens the tour', () => {
  assert.match(homeSource, /<\/SiteHero>\s*\{activeFilter === 'all'/);
  assert.match(homeSource, /<a href="\?tour=1" data-open-feature-tour>/);
  assert.match(homeSource, /messages\.hero\.featureAnnouncement/);
  assert.match(homeSource, /messages\.hero\.viewTour/);
  assert.match(homeSource, /<ArrowRight size=\{13\}/);
  assert.match(source, /document\.querySelectorAll\('\[data-open-feature-tour\]'\)/);
  assert.match(source, /event\.preventDefault\(\)/);
  assert.match(source, /video\.currentTime = 0/);
  assert.match(source, /openers\.forEach/);

  const linkRule = globalStyles.match(/\.feature-tour-callout a\s*\{[\s\S]*?\}/)?.[0] ?? '';
  assert.match(linkRule, /color:\s*var\(--blue\)/);
  assert.match(linkRule, /border-bottom:\s*1px solid currentColor/);
  assert.match(linkRule, /display:\s*inline-flex/);
});
