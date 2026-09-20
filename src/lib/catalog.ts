import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defaultLocale, localeConfig, locales, type Locale } from '../i18n/config';

export type Category = { id: string; name: string; count: number };
export type Project = {
  name: string; url: string; stars: number; starsLabel: string; language: string;
  description: string; categoryId: string; category: string; searchText: string;
};

type ParsedProject = Omit<Project, 'categoryId' | 'category' | 'searchText'>;
type ParsedCategory = { name: string; count: number; rows: ParsedProject[] };
type LocalizedCatalog = { categories: Category[]; projects: Project[] };

const currentRoot = process.cwd();
const repositoryRoot = existsSync(resolve(currentRoot, 'README.md')) ? currentRoot : resolve(currentRoot, '..');
const slugify = (value: string) => value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const plainText = (value: string) => value.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/`([^`]+)`/g, '$1').replace(/\*\*/g, '').trim();

function parse(markdown: string): ParsedCategory[] {
  const headings = [...markdown.matchAll(/^### (.+?)(?: \((\d+)\)|（(\d+)）)$/gm)];
  return headings.map((heading) => {
    const start = heading.index ?? 0;
    const headingEnd = start + heading[0].length;
    const nextHeadingOffset = markdown.slice(headingEnd).search(/^### /m);
    const end = nextHeadingOffset === -1 ? markdown.length : headingEnd + nextHeadingOffset;
    const rows = markdown.slice(start, end).split('\n')
      .filter((line) => line.startsWith('| [') && line.includes('https://github.com/'))
      .map((line) => {
        const cells = line.slice(1, -1).split('|').map((cell) => cell.trim());
        const link = cells[0]?.match(/^\[([^\]]+)\]\((https:\/\/github\.com\/[^)]+)\)$/);
        if (!link || cells.length !== 4) throw new Error(`Unable to parse catalog row: ${line}`);
        const starsLabel = cells[1].replace(/^★\s*/, '');
        return { name: link[1], url: link[2], starsLabel, stars: Number(starsLabel.replace(/,/g, '')) || 0, language: cells[2], description: plainText(cells[3]) };
      });
    return { name: heading[1], count: Number(heading[2] ?? heading[3]), rows };
  });
}

const parsedByLocale = Object.fromEntries(locales.map((locale) => {
  const path = resolve(repositoryRoot, localeConfig[locale].readme);
  if (!existsSync(path)) throw new Error(`Missing catalog translation for ${locale}: ${path}`);
  return [locale, parse(readFileSync(path, 'utf8'))];
})) as Record<Locale, ParsedCategory[]>;

const sourceCategories = parsedByLocale[defaultLocale];
if (sourceCategories.length === 0) throw new Error('The default catalog contains no categories.');

for (const locale of locales) {
  const localized = parsedByLocale[locale];
  if (localized.length !== sourceCategories.length) throw new Error(`Catalog category count mismatch for locale ${locale}.`);
  sourceCategories.forEach((sourceCategory, categoryIndex) => {
    const localizedCategory = localized[categoryIndex];
    if (localizedCategory.rows.length !== sourceCategory.rows.length) throw new Error(`Catalog row count mismatch for locale ${locale}, category ${sourceCategory.name}.`);
    sourceCategory.rows.forEach((sourceProject, projectIndex) => {
      if (localizedCategory.rows[projectIndex]?.url !== sourceProject.url) throw new Error(`Catalog project mismatch for locale ${locale}: ${sourceProject.name}.`);
    });
  });
}

const catalogs = Object.fromEntries(locales.map((locale) => {
  const localizedCategories = parsedByLocale[locale];
  const categories = sourceCategories.map((sourceCategory, index) => ({ id: slugify(sourceCategory.name), name: localizedCategories[index].name, count: sourceCategory.count }));
  const projects = sourceCategories.flatMap((sourceCategory, categoryIndex) => {
    const localizedCategory = localizedCategories[categoryIndex];
    return sourceCategory.rows.map((sourceProject, projectIndex) => {
      const localizedProject = localizedCategory.rows[projectIndex];
      const descriptions = locales.map((candidate) => parsedByLocale[candidate][categoryIndex].rows[projectIndex].description);
      return { ...sourceProject, description: localizedProject.description, categoryId: slugify(sourceCategory.name), category: localizedCategory.name, searchText: [sourceProject.name, sourceProject.url, sourceProject.language, ...descriptions].join(' ').toLowerCase() };
    });
  });
  return [locale, { categories, projects }];
})) as Record<Locale, LocalizedCatalog>;

export const getCatalog = (locale: Locale): LocalizedCatalog => catalogs[locale];
const sourceProjects = getCatalog(defaultLocale).projects;
export const catalogStats = {
  projects: sourceProjects.length,
  categories: sourceCategories.length,
  languages: new Set(sourceProjects.map((project) => project.language).filter((language) => language !== '—')).size,
  stars: sourceProjects.reduce((total, project) => total + project.stars, 0),
};
