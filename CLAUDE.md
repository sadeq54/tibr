@AGENTS.md

## SEO Infrastructure

See [docs/SEO-CHANGELOG.md](./docs/SEO-CHANGELOG.md) for full history of SEO additions (founder author page, schema updates, sitemap entries, indexing setup, six-language rollout).

Priority URLs for manual indexing submission: [seo-priority-urls.md](./seo-priority-urls.md). Owner-only steps (env vars, DNS, Search Console): [sadeqblocker.md](./sadeqblocker.md).

### Quick reference

- Locales: `ar` (default, unprefixed), `en`, `fr`, `tr`, `ur`, `hi` — single source `i18n/routing.ts` (`routing.locales`, `LOCALE_META`, `isRtl`, `STATIC_LOCALES` = ar+en prerendered, others on demand). Message files `messages/<locale>.json` must keep identical keys.
- Inline UI text: `pick(locale, { en, ar, fr, tr, ur, hi })` from `lib/i18n-text.ts` (English is the required fallback). Never add a new `locale === "ar" ? … : …` ternary.
- Shared helpers (reuse, don't re-invent): `karatLabel()` (`lib/karat-label.ts`), `countryName()` / `sortedCountries()` (`lib/countries.ts`), `canonicalPath()` / `buildPageMetadata()` (`lib/metadata.ts`), `priceTitle()` / `priceDescription()` (`lib/seo.ts`), `localeMeta(locale).intl` for every `Intl` / `toLocaleString` call.
- Sitemap source: `app/sitemap.ts` — `dual()` emits one URL per locale for each route.
- JSON-LD: `components/JsonLd.tsx` — `Organization`, `WebSite`, `Service`, `BreadcrumbList`, `FAQPage`, conditional `FinancialProduct` (never `Product`/`InStock` — nothing is for sale). Founder `Person` schema embedded in Organization.
- Author page: `app/[locale]/about/sadeq/page.tsx` — Person schema, photo at `public/author/sadeq.jpeg`, LinkedIn `rel="me"`.
- OG images / chart PNGs: Satori with `lib/og-font.ts` (`loadFontsFor`, `rtlWords` for ar/ur); `await params` in every image route.
- IndexNow route: `app/api/indexnow/route.ts` — POST `{ urls: [...] }` pushes to Bing + Yandex.
- Verification env vars: `NEXT_PUBLIC_GOOGLE_VERIFICATION`, `NEXT_PUBLIC_BING_VERIFICATION`, `NEXT_PUBLIC_YANDEX_VERIFICATION`, `INDEXNOW_KEY`.

When adding new public-facing pages: update `sitemap.ts` (`dual()`), add to `seo-priority-urls.md`, add the 6-locale title/description via `buildPageMetadata`, optionally push via IndexNow after deploy.

## Verify before and after every deploy

- Before: `bash scripts/smoke-seo.sh` (builds, starts locally, checks titles/tables/schema/images/locales).
- After: `bash scripts/prod-check.sh` then `node scripts/seo-baseline.mjs` (snapshot + diff in `docs/seo-baselines/`, commit the JSON).
- Then Search Console: resubmit sitemap, request indexing for `seo-priority-urls.md`, record 28-day baseline.
- Measuring whether SEO is actually improving (what to look at, when, and how to read it): use the project skill **`/seo-verify`** (`.claude/skills/seo-verify/SKILL.md`). Short version: indexed count (week 1) → CTR (weeks 1–2) → impressions by country (weeks 2–4) → position (months).

## Product decisions to respect

- Email capture (newsletter / price alerts) was built and removed at the owner's request on 2026-08-21 — do not re-add without being asked.
- Brand assets (`public/logosvg.svg`) and CSS token names in `app/globals.css` are not to be changed.
- AdSense is integrated but dormant: everything keys off `NEXT_PUBLIC_ADSENSE_CLIENT` (+ optional slot ids) via `lib/ads.ts`; add ad placements only through `AdSensePlacement`, never raw `<ins>` tags, and keep `/embed/*` ad-free. XM affiliate is the other monetization: `AdSlot`, `AffiliateBanner`, `TradeGoldCta`. Every XM link must go through `xmClickUrl(id, lang, tag)` (sub-ID `t=` for attribution), creatives follow the reader's locale, and nothing XM renders where `xmAllowed(countrySlug)` is false (`lib/xm-banners.ts`). Keep the risk warning next to every CTA.
