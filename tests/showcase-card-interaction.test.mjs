import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const showcase = JSON.parse(readFileSync(new URL('../src/data/showcase.json', import.meta.url), 'utf8'));
const showcaseStyles = readFileSync(new URL('../src/styles/showcase.css', import.meta.url), 'utf8');

test('the rendered showcase card uses a native dialog-trigger button without a source icon', () => {
  const outputCandidates = [
    new URL('../dist/showcase/index.html', import.meta.url),
    new URL('../dist/client/showcase/index.html', import.meta.url),
  ];
  const outputPath = outputCandidates.find((candidate) => existsSync(candidate));

  assert.ok(outputPath, 'showcase build output should exist');

  const html = readFileSync(outputPath, 'utf8');
  const firstCard = html.match(/<article[^>]*data-showcase-card[\s\S]*?<\/article>/)?.[0] ?? '';

  assert.match(firstCard, /<button class="showcase-card-trigger" type="button"/);
  assert.match(firstCard, /aria-haspopup="dialog"/);
  assert.match(firstCard, /aria-controls="showcase-dialog"/);
  assert.match(firstCard, /<div class="showcase-card-body">[\s\S]*?<h3>[^<]+<\/h3>/);
  assert.doesNotMatch(firstCard, /showcase-card-title/);
  assert.doesNotMatch(firstCard.match(/^<article[^>]*>/)?.[0] ?? '', /role="button"|tabindex=/);
  assert.doesNotMatch(firstCard, /class="showcase-source"/);
});

test('showcase HTML server-renders the initial 24 cards', () => {
  const outputCandidates = [
    new URL('../dist/showcase/index.html', import.meta.url),
    new URL('../dist/client/showcase/index.html', import.meta.url),
  ];
  const outputPath = outputCandidates.find((candidate) => existsSync(candidate));

  assert.ok(outputPath, 'showcase build output should exist');

  const html = readFileSync(outputPath, 'utf8');
  const renderedIds = [...html.matchAll(/data-video-id="([^"]+)"/g)].map((match) => match[1]);

  assert.equal(renderedIds.length, 24);
  assert.equal(new Set(renderedIds).size, 24);
});

test('showcase HTML exposes the next API page after the server-rendered cards', () => {
  const outputCandidates = [
    new URL('../dist/showcase/index.html', import.meta.url),
    new URL('../dist/client/showcase/index.html', import.meta.url),
  ];
  const outputPath = outputCandidates.find((candidate) => existsSync(candidate));

  assert.ok(outputPath, 'showcase build output should exist');

  const html = readFileSync(outputPath, 'utf8');
  const loader = html.match(/<div[^>]*id="showcase-load-sentinel"[^>]*>/)?.[0] ?? '';

  assert.match(loader, /data-api="\/api\/showcase\/en\.json"/);
  assert.match(loader, /data-offset="24"/);
  assert.match(loader, new RegExp(`data-total="${showcase.count}"`));
});

test('showcase HTML reserves one sponsor skeleton for every complete ten-card group', () => {
  const outputCandidates = [
    new URL('../dist/showcase/index.html', import.meta.url),
    new URL('../dist/client/showcase/index.html', import.meta.url),
  ];
  const outputPath = outputCandidates.find((candidate) => existsSync(candidate));

  assert.ok(outputPath, 'showcase build output should exist');

  const html = readFileSync(outputPath, 'utf8');
  const skeletons = html.match(/class="[^"]*sponsor-placement-skeleton[^"]*"/g) ?? [];

  assert.equal(skeletons.length, 2);
});

test('showcase renders the current filter as an h2 heading', () => {
  const mainPath = new URL('../dist/client/showcase/index.html', import.meta.url);
  const categoryPath = new URL('../dist/client/showcase/games/index.html', import.meta.url);

  assert.ok(existsSync(mainPath), 'main showcase build output should exist');
  assert.ok(existsSync(categoryPath), 'category showcase build output should exist');
  assert.match(readFileSync(mainPath, 'utf8'), /<h2 class="showcase-filter-heading">All categories<\/h2>/);
  assert.match(readFileSync(categoryPath, 'utf8'), /<h2 class="showcase-filter-heading">Games<\/h2>/);
});

test('showcase initializes its dialog from a template only after interaction', () => {
  const outputPath = new URL('../dist/client/showcase/index.html', import.meta.url);

  assert.ok(existsSync(outputPath), 'showcase build output should exist');
  const html = readFileSync(outputPath, 'utf8');
  const source = readFileSync(new URL('../src/pages/showcase.astro', import.meta.url), 'utf8');
  const htmlWithoutTemplate = html.replace(/<template id="showcase-dialog-template">[\s\S]*?<\/template>/, '');

  assert.match(html, /<template id="showcase-dialog-template">\s*<dialog class="showcase-dialog"/);
  assert.doesNotMatch(htmlWithoutTemplate, /<dialog class="showcase-dialog"/);
  assert.match(source, /dialogTemplate\?\.content\.firstElementChild\?\.cloneNode\(true\)/);
  assert.match(source, /document\.body\.appendChild\(dialog\)/);
  assert.doesNotMatch(source, /const showcaseDialog = document\.querySelector/);
});

test('showcase dialog constrains portrait videos to the available media height', () => {
  const videoRule = showcaseStyles.match(/\.showcase-dialog-media video\s*\{[\s\S]*?\}/)?.[0] ?? '';

  assert.match(videoRule, /width:\s*auto/);
  assert.match(videoRule, /height:\s*auto/);
  assert.match(videoRule, /max-width:\s*100%/);
  assert.match(videoRule, /max-height:\s*100%/);
  assert.match(videoRule, /object-fit:\s*contain/);
});
