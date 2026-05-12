@AGENTS.md

## SEO Infrastructure

See [docs/SEO-CHANGELOG.md](./docs/SEO-CHANGELOG.md) for full history of SEO additions (founder author page, schema updates, sitemap entries, indexing setup).

Priority URLs for manual indexing submission: [seo-priority-urls.md](./seo-priority-urls.md).

### Quick reference

- Sitemap source: `app/sitemap.ts` — uses `dual()` helper to emit both `ar` + `en` URLs per route
- JSON-LD: `components/JsonLd.tsx` — emits `Organization`, `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`, conditional `Product`/`FinancialProduct`. Founder `Person` schema embedded in Organization
- Author page: `app/[locale]/about/sadeq/page.tsx` — Person schema, photo at `public/author/sadeq.jpeg`, LinkedIn `rel="me"`
- IndexNow route: `app/api/indexnow/route.ts` — POST `{ urls: [...] }` pushes to Bing + Yandex
- Verification env vars: `NEXT_PUBLIC_GOOGLE_VERIFICATION`, `NEXT_PUBLIC_BING_VERIFICATION`, `NEXT_PUBLIC_YANDEX_VERIFICATION`, `INDEXNOW_KEY`

When adding new public-facing pages: update `sitemap.ts` (`dual()`), add to `seo-priority-urls.md`, optionally push via IndexNow after deploy.
