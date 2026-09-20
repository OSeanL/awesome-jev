import type { APIRoute } from 'astro';
import { catalogStats, categories, projects } from '../lib/catalog';

export const prerender = true;

export const GET: APIRoute = () => new Response(JSON.stringify({
  name: 'Awesome Jev',
  description: "A verified, community-maintained catalog of open-source projects built around Jev, TypeSafe AI's System One model.",
  url: 'https://jevbest.com/',
  repository: 'https://github.com/heyjunpenn/awesome-jev',
  updated: '2026-09-20',
  stats: catalogStats,
  categories,
  projects: projects.map(({ starsLabel, ...project }) => project),
}, null, 2), {
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=3600',
  },
});
