# Awesome Jev site

Astro static site for the Awesome Jev catalog. Project data is read from the repository-root `README.md` and `README.zh-Hans.md` during the build, so the website stays aligned with the GitHub lists.

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
