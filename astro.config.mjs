import { defineConfig } from 'astro/config';

const [owner = '', repository = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const isRootPage = repository.endsWith('.github.io');
const base = process.env.ASTRO_BASE ?? (isGitHubActions && repository && !isRootPage ? `/${repository}` : '/');
const site = process.env.SITE_URL ?? (isGitHubActions ? 'https://jevbest.com' : 'http://localhost:4321');

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
});
