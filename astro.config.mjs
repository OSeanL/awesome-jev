import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

const base = process.env.ASTRO_BASE ?? '/';
const site = process.env.SITE_URL ?? 'http://localhost:4321';

export default defineConfig({
  adapter: cloudflare({
    imageService: 'passthrough',
    prerenderEnvironment: 'node',
  }),
  session: false,
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  vite: {
    ssr: {
      optimizeDeps: {
        exclude: ['@lucide/astro'],
      },
    },
  },
  i18n: {
    locales: ['en', 'zh', 'ja', 'ko', 'es', 'pt-br'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
