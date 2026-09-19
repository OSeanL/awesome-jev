import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export type Category = {
  id: string;
  nameEn: string;
  nameZh: string;
  count: number;
};

export type Project = {
  name: string;
  url: string;
  stars: number;
  starsLabel: string;
  language: string;
  descriptionEn: string;
  descriptionZh: string;
  categoryId: string;
  categoryEn: string;
  categoryZh: string;
};

const currentRoot = process.cwd();
const repositoryRoot = existsSync(resolve(currentRoot, 'README.md'))
  ? currentRoot
  : resolve(currentRoot, '..');
const english = readFileSync(resolve(repositoryRoot, 'README.md'), 'utf8');
const chinese = readFileSync(resolve(repositoryRoot, 'README.zh-Hans.md'), 'utf8');

const slugify = (value: string) => value
  .toLowerCase()
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const plainText = (value: string) => value
  .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
  .replace(/`([^`]+)`/g, '$1')
  .replace(/\*\*/g, '')
  .trim();

type ParsedCategory = {
  name: string;
  count: number;
  rows: Array<{ name: string; url: string; starsLabel: string; stars: number; language: string; description: string }>;
};

function parse(markdown: string, locale: 'en' | 'zh'): ParsedCategory[] {
  const headingPattern = locale === 'en'
    ? /^### (.+?) \((\d+)\)$/gm
    : /^### (.+?)（(\d+)）$/gm;
  const headings = [...markdown.matchAll(headingPattern)];

  return headings.map((heading) => {
    const start = heading.index ?? 0;
    const headingEnd = start + heading[0].length;
    const nextHeadingOffset = markdown.slice(headingEnd).search(/^### /m);
    const end = nextHeadingOffset === -1 ? markdown.length : headingEnd + nextHeadingOffset;
    const section = markdown.slice(start, end);
    const rows = section
      .split('\n')
      .filter((line) => line.startsWith('| [') && line.includes('https://github.com/'))
      .map((line) => {
        const cells = line.slice(1, -1).split('|').map((cell) => cell.trim());
        const link = cells[0].match(/^\[([^\]]+)\]\((https:\/\/github\.com\/[^)]+)\)$/);
        if (!link || cells.length !== 4) throw new Error(`Unable to parse catalog row: ${line}`);
        const starsLabel = cells[1].replace(/^★\s*/, '');
        return {
          name: link[1],
          url: link[2],
          starsLabel,
          stars: Number(starsLabel.replace(/,/g, '')) || 0,
          language: cells[2],
          description: plainText(cells[3]),
        };
      });

    return { name: heading[1], count: Number(heading[2]), rows };
  });
}

const categoriesEn = parse(english, 'en');
const categoriesZh = parse(chinese, 'zh');

if (categoriesEn.length !== 10 || categoriesZh.length !== 10) {
  throw new Error('Expected ten catalog categories in each README.');
}

export const categories: Category[] = categoriesEn.map((category, index) => ({
  id: slugify(category.name),
  nameEn: category.name,
  nameZh: categoriesZh[index].name,
  count: category.count,
}));

export const projects: Project[] = categoriesEn.flatMap((category, categoryIndex) => {
  const categoryZh = categoriesZh[categoryIndex];
  if (category.rows.length !== categoryZh.rows.length) {
    throw new Error(`Bilingual row mismatch in ${category.name}`);
  }

  return category.rows.map((project, projectIndex) => {
    const localized = categoryZh.rows[projectIndex];
    if (project.url !== localized.url) throw new Error(`Bilingual project mismatch: ${project.name}`);
    return {
      ...project,
      descriptionEn: project.description,
      descriptionZh: localized.description,
      categoryId: slugify(category.name),
      categoryEn: category.name,
      categoryZh: categoryZh.name,
    };
  });
});

export const catalogStats = {
  projects: projects.length,
  categories: categories.length,
  languages: new Set(projects.map((project) => project.language).filter((language) => language !== '—')).size,
  stars: projects.reduce((total, project) => total + project.stars, 0),
};
