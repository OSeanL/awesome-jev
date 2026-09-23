import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

test('the rendered showcase card is the dialog trigger without a source icon', () => {
  const outputCandidates = [
    new URL('../dist/showcase/index.html', import.meta.url),
    new URL('../dist/client/showcase/index.html', import.meta.url),
  ];
  const outputPath = outputCandidates.find((candidate) => existsSync(candidate));

  assert.ok(outputPath, 'showcase build output should exist');

  const html = readFileSync(outputPath, 'utf8');
  const firstCard = html.match(/<article[^>]*data-showcase-card[\s\S]*?<\/article>/)?.[0] ?? '';

  assert.match(firstCard, /role="button"/);
  assert.match(firstCard, /tabindex="0"/);
  assert.match(firstCard, /aria-haspopup="dialog"/);
  assert.match(firstCard, /aria-controls="showcase-dialog"/);
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
  assert.match(loader, /data-total="1592"/);
});
