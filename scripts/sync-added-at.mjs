import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readmePath = resolve(root, 'README.md');
const outputPath = resolve(root, 'src/data/catalog-added-at.json');
const normalizeUrl = (url) => url.toLowerCase().replace(/\.git\/?$/, '').replace(/\/$/, '');

function catalogUrls(markdown) {
  const headings = [...markdown.matchAll(/^### (.+?)(?: \((\d+)\)|（(\d+)）)$/gm)].slice(0, 10);
  return headings.flatMap((heading) => {
    const start = heading.index ?? 0;
    const headingEnd = start + heading[0].length;
    const nextHeadingOffset = markdown.slice(headingEnd).search(/^### /m);
    const end = nextHeadingOffset === -1 ? markdown.length : headingEnd + nextHeadingOffset;
    return [...markdown.slice(start, end).matchAll(/^\| \[[^\]]+\]\((https:\/\/github\.com\/[^)]+)\) \|/gm)]
      .map((match) => match[1]);
  });
}

const currentUrls = catalogUrls(readFileSync(readmePath, 'utf8'));
const currentKeys = new Set(currentUrls.map(normalizeUrl));
const existing = existsSync(outputPath)
  ? JSON.parse(readFileSync(outputPath, 'utf8'))
  : {};
const addedAt = Object.fromEntries(Object.entries(existing).map(([url, timestamp]) => [normalizeUrl(url), timestamp]));

const revisions = execFileSync('git', ['rev-list', '--reverse', 'HEAD', '--', 'README.md'], { cwd: root, encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);
for (const revision of revisions) {
  const timestamp = execFileSync('git', ['show', '-s', '--format=%aI', revision], { cwd: root, encoding: 'utf8' }).trim();
  const markdown = execFileSync('git', ['show', `${revision}:README.md`], { cwd: root, encoding: 'utf8' });
  for (const url of catalogUrls(markdown)) {
    const key = normalizeUrl(url);
    if (currentKeys.has(key) && !addedAt[key]) addedAt[key] = timestamp;
  }
}

const now = new Date().toISOString();
for (const key of currentKeys) addedAt[key] ??= now;

const sorted = Object.fromEntries([...currentKeys].sort().map((key) => [key, addedAt[key]]));
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`Recorded inclusion timestamps for ${Object.keys(sorted).length} projects.`);
