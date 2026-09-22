import type { APIRoute } from 'astro';
import { catalogStats, getCatalog } from '../lib/catalog';
import { defaultLocale, locales } from '../i18n';

export const prerender = true;

export const GET: APIRoute = () => {
  const source = getCatalog(defaultLocale);
  return new Response(JSON.stringify({
    name: 'bestjev',
    alternateName: 'bestjev Jev Project Catalog',
    description: "A verified, community-maintained catalog of open-source projects built around Jev, TypeSafe AI's System One model.",
    url: 'https://jevbest.com/',
    repository: 'https://github.com/heyjunpenn/awesome-jev',
    license: 'https://opensource.org/license/mit',
    updated: '2026-09-20',
    stats: catalogStats,
    categories: source.categories,
    projects: source.projects.map(({ starsLabel, searchText, ...project }) => {
      const localizedProjects = Object.fromEntries(locales.map((locale) => {
        const localized = getCatalog(locale);
        const match = localized.projects.find((candidate) => candidate.url === project.url);
        return [locale, match];
      }));
      return {
        ...project,
        descriptionEn: localizedProjects.en?.description,
        descriptionZh: localizedProjects.zh?.description,
        categoryEn: localizedProjects.en?.category,
        categoryZh: localizedProjects.zh?.category,
        translations: Object.fromEntries(locales.map((locale) => [locale, {
          description: localizedProjects[locale]?.description,
          category: localizedProjects[locale]?.category,
        }])),
      };
    }),
  }, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
