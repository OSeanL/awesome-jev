import type { APIRoute } from 'astro';
import { getCatalog } from '../../lib/catalog';
import { isLocale, locales } from '../../i18n/config';

export const prerender = true;

export const getStaticPaths = () => locales.map((locale) => ({ params: { locale } }));

const repositorySlug = (url: string) => {
  try {
    const [owner, repository] = new URL(url).pathname.split('/').filter(Boolean);
    return owner && repository ? `${owner}/${repository.replace(/\.git$/, '')}` : url;
  } catch {
    return url;
  }
};

export const GET: APIRoute = ({ params }) => {
  if (!isLocale(params.locale)) return new Response('Not found', { status: 404 });

  const projects = [...getCatalog(params.locale).projects]
    .sort((a, b) => (b.stars - a.stars) || a.url.localeCompare(b.url, 'en'))
    .map((project) => ({
      name: repositorySlug(project.url),
      url: project.url,
      stars: project.stars,
      starsLabel: project.starsLabel,
      language: project.language,
      description: project.description,
      categoryId: project.categoryId,
      category: project.category,
      addedAt: project.addedAt,
      addedDate: project.addedDate,
      searchText: [project.name, project.url, project.language, project.description].join(' ').toLowerCase(),
    }));

  return new Response(JSON.stringify({ projects }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
};
