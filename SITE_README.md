# Awesome Jev site

Astro site for the Awesome Jev catalog, deployed as one Cloudflare Worker. Static pages, sponsor API routes, Stripe webhooks, and D1-backed sponsor data all share the `jevbest.com` origin. The interface and project catalog support English, Simplified Chinese, Japanese, Korean, Spanish, and Brazilian Portuguese. Project data is read from the locale-specific README configured in `src/i18n/config.ts`.

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

Astro prerenders the catalog pages and bundles the on-demand sponsor routes into the same Cloudflare Worker deployment. Browser requests use same-origin `/api/sponsors/*` URLs.

## Cloudflare deployment

`wrangler.jsonc` routes `jevbest.com/*` through the Worker and configures the `SPONSORS_DB` D1 database. The scoped route preserves the existing DNS record, which makes reverting to the previous GitHub Pages origin straightforward. Apply the database migration before the first deployment:

```bash
npm run db:migrate:remote
npm run deploy
```

The manually triggered workflow at `.github/workflows/deploy.yml` runs checks, applies D1 migrations, and deploys the site and API together. Add these repository secrets before running it:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

GitHub Pages is not part of the production hosting path. GitHub remains the source repository only.

## Stripe sponsorship checkout

Copy `.dev.vars.example` to `.dev.vars` for local development. For production, store both values as encrypted Worker secrets:

```bash
npx wrangler secret put STRIPE_SECRET_KEY
npx wrangler secret put STRIPE_WEBHOOK_SECRET
```

After the Worker is deployed, configure the Stripe webhook endpoint as:

```text
https://jevbest.com/api/sponsors/webhook/
```

Subscribe it to `checkout.session.completed` and `checkout.session.async_payment_succeeded`, then save its signing secret as `STRIPE_WEBHOOK_SECRET`. The production site is served at [jevbest.com](https://jevbest.com).
