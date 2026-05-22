# SEO Roadmap Audit — YMYL / Live Financial Data

Rigorous code-level audit of the 6-point ranking roadmap.
Date: 2026-05-22 · Verdict: **~92% on-site implemented.** Remaining work is off-site (backlinks) plus field verification.

Legend: ✅ done · ⚠️ partial · ❌ missing

Files audited: `app/[locale]/[country]/gold-price/[karat]/page.tsx`, `lib/metadata.ts`, `components/JsonLd.tsx`, `lib/countries.ts`, `lib/schemas.ts`, `app/sitemap.ts`.

---

## 1. Programmatic SEO (pSEO)

| Item | Status | Evidence / Code Proof |
|------|--------|-----------------------|
| Unique `<title>` / `<meta description>` per route | ✅ | `generateMetadata` in `[country]/gold-price/[karat]/page.tsx` reads `CountryPage` translations and interpolates `{karat, country, currency}` — unique per country×karat. `buildPageMetadata` / `buildAlternates` in `lib/metadata.ts`. |
| Clean hierarchical URL slugs | ✅ | `/saudi-arabia/gold-price/21k` — readable slug, locale via next-intl `as-needed` prefix (`canonicalPath`). |
| Contextual per-country content (no thin cloning) | ✅ | **Fixed.** `COUNTRY_NOTES` (9 hand-written, ~80-word notes) + `COUNTRY_FACTS` (38 entries) + `composeCountryNote()` give **47/47 countries** a unique market note. `countryNote()` falls back to the composed note; rendered under H1 in the page's "gold market" `<section>`. |
| Depth of composed notes | ⚠️ | Composed notes are ~3 sentences and share a templated karat+peg skeleton — lighter than the hand-written `COUNTRY_NOTES`. Adequate for indexation; promote high-traffic long-tail countries to full `COUNTRY_NOTES` over time. `COUNTRY_FACTS` data is LLM-sourced — **spot-check karat/market facts (YMYL).** |
| Page-body uniqueness | ⚠️ | Live price tables, chart, calculator and FAQ share one template across all countries. Defensible for a live-data site (the price *data* differs per currency), and the FAQ interpolates `country/karat/currency`. Not a blocker. |

## 2. JSON-LD Structured Data

| Item | Status | Evidence / Code Proof |
|------|--------|-----------------------|
| Financial schema (Product / FinancialProduct / Offer / PriceSpecification) | ✅ | `components/JsonLd.tsx` emits 4× `Product` (per karat) each with `offers → Offer → UnitPriceSpecification`, plus `FinancialProduct` and `Quotation`. |
| Live price embedded server-side | ✅ | **Fixed.** Country page now renders `<CountrySchema>` (async server component) which `await`s the server `fetchSpot` snapshot and passes it to `<JsonLd spot pageOnly pageType="ItemPage" pageUrl breadcrumb>`. Real prices land in the `<script type="application/ld+json">`. Previously this page emitted **only** `FAQPage`. |
| BreadcrumbList / WebPage on country pages | ✅ | **Fixed.** `<CountrySchema>` now emits `BreadcrumbList` (canonical URLs) and `WebPage`/`ItemPage`. `pageOnly` flag skips Org/WebSite/Service/FAQ — the layout already emits those. |
| Org / WebSite / Service / FAQ / Person | ✅ | Emitted site-wide via the layout's `<JsonLd>`; `Person` (founder Sadeq) carries `@id`, `jobTitle`, `sameAs`. |
| Schema price currency | ⚠️ | `Product.offers.price` is **USD per gram**, but the country page visually displays the **local-currency** price. Schema price ≠ on-page displayed price. Low risk (Google renders its own gold widget), but consider emitting `priceCurrency` matching the country, or document the USD reference explicitly. |

## 3. SSR & Edge Delivery

| Item | Status | Evidence / Code Proof |
|------|--------|-----------------------|
| Server-rendered data snapshots (no blank zeros) | ✅ | `fetchSpot`, `fetchFxRates`, `fetchAllHistory` run server-side; section components (`HeroSpotSection`, `PriceChartSection`, etc.) `await` them. Real numbers in the streamed HTML. |
| Streaming / Suspense | ✅ | Price/chart/calculator sections wrapped in `<Suspense>` with skeleton fallbacks. `<CountrySchema>` is also Suspense-wrapped so the schema carries live prices without blocking first paint. |
| Crawler sees real values | ✅ | WebSocket only *updates* the already-rendered price client-side. Verify periodically via GSC URL Inspection → "View crawled page". |

## 4. Hreflang & Canonical Tags

| Item | Status | Evidence / Code Proof |
|------|--------|-----------------------|
| Self-referencing canonical | ✅ | `buildAlternates` → `canonical: canonicalPath(locale, path)`; country page passes `buildAlternates(locale, /${slug}/gold-price/${karat})`. |
| Hreflang | ✅ | `languages: { ar, en, x-default }` emitted on every page via `buildAlternates`. |
| Language-level vs region-level | ✅ | Language-level (`ar` / `en` / `x-default`) is correct here — each country has one distinct URL with distinct content, so there is no same-content-per-region cannibalization. Region-level (`ar-SA`…) **not needed**. |

## 5. Core Web Vitals & CLS

| Item | Status | Evidence / Code Proof |
|------|--------|-----------------------|
| Reserved space — no layout shift | ✅ | Every dynamic block (`HeroSpot`, `PriceChart`, `BidAskGauge`, `KaratGrid`, `Calculator`) sits behind `<Suspense>` with a dedicated skeleton from `components/skeletons.tsx` — height reserved before data arrives. |
| Async / deferred third-party scripts | ⚠️ | Not verifiable from the 5 audited files (GTM/GA, `AdSlot`, `LazyMount`, `TradingViewChart` internals live elsewhere). Prior audit noted GTM/GA `afterInteractive` + `LazyMount minHeight` — re-confirm those files. |
| Measured CWV | ⚠️ | Not measured. Run PageSpeed Insights / CrUX (LCP, **INP**, CLS) on mobile for `/`, `/gold-price/21k`, `/saudi-arabia/gold-price/21k`. INP is the risk — confirm WebSocket price ticks don't jank low-end mobile. |

## 6. E-E-A-T & Trust

| Item | Status | Evidence / Code Proof |
|------|--------|-----------------------|
| Transparency pages | ✅ | `app/sitemap.ts` registers `/methodology`, `/editorial-standards`, `/about/disclaimer`. |
| Author persona + Person schema | ✅ | `/about/sadeq` author page; `JsonLd.tsx` Organization embeds `founder` → `Person` (`@id`, `jobTitle: "Founder & Lead Developer"`, `sameAs` LinkedIn, `image`). |
| Embeddable widget for backlinks | ✅ | `/widgets` route registered in sitemap (embeddable price widgets). |
| Last-updated / refresh signal | ✅ | Price components show a live update timestamp; sitemap `lastModified` is git-derived via `data/lastmod.json`. |
| Authoritative backlinks / Digital PR | ❌ | Off-site. New domain, near-zero external links / brand mentions. Not a code task. |

---

## Open Items — ranked by impact on indexation & ranking

1. **Validate the ~298 not-indexed URLs now resolve (highest impact).** The two root causes — thin country content and missing `Product`/`BreadcrumbList` JSON-LD on the country pages — are fixed in code. Deploy, then in GSC: request re-indexing / "Validate Fix" on the affected URLs and watch the Pages report.
2. **Verify `COUNTRY_FACTS` accuracy (YMYL).** 38 countries' dominant-karat and market facts are LLM-sourced. Wrong financial facts on a YMYL site damage trust. Spot-check before relying on them as authoritative.
3. **Schema price currency mismatch (⚠️).** `Product.offers.price` is USD/gram while the page displays local currency. Align `priceCurrency` to the country or document the USD reference.
4. **Measure CWV (⚠️).** Run PageSpeed Insights on mobile for key routes; focus on INP given the live WebSocket updates.
5. **Backlinks / brand mentions (❌, off-site).** Promote the `/widgets` embeddable widget to Arab finance blogs / news / jewellery e-commerce. Build Reddit / YouTube / LinkedIn presence.
6. **Deepen composed notes over time (⚠️).** Promote high-traffic long-tail countries from `COUNTRY_FACTS` to full hand-written `COUNTRY_NOTES` entries.

**Not needed:** region-level hreflang (`ar-SA`) — language-level hreflang is correct for this URL structure.

---

## Changelog (2026-05-22)

- Fixed Egypt VAT contradiction — `COUNTRY_VAT.egypt` 0% → 14% (making-charges only), aligned with `COUNTRY_NOTES.egypt`.
- Added `<CountrySchema>` to the country×karat page — now emits `Product`/`FinancialProduct`/`Quotation`/`BreadcrumbList`/`WebPage` with live server-rendered prices (previously `FAQPage` only).
- Added `CountryFacts` + `COUNTRY_FACTS` (38 countries) + `composeCountryNote()`; `countryNote()` now returns a unique note for all 47 countries.
