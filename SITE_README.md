# Awesome Jev site

Astro static site for the Awesome Jev catalog. The interface and project catalog support English, Simplified Chinese, Japanese, Korean, Spanish, and Brazilian Portuguese. Project data is read from the locale-specific README configured in `src/i18n/config.ts`.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The Astro base path is inferred from `GITHUB_REPOSITORY` during GitHub Actions builds. For a custom domain, set `SITE_URL` and `ASTRO_BASE=/`.

## GitHub Pages

The workflow at `.github/workflows/deploy.yml` builds the site and deploys `dist` to GitHub Pages. The production site is served at [jevbest.com](https://jevbest.com).
