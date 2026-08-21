---
name: seo-verify
description: Verify a goldarabia deploy and measure whether SEO is improving — live production check, on-page baseline/diff, Search Console checklist, what to expect and when. Use after every deploy, for weekly SEO reviews, or when the user asks "is SEO getting better?".
---

# seo-verify — goldpricesarabia.com

Two questions, two tools. **"Is the deploy serving what we built?"** → scripts in this repo (minutes).
**"Is Google rewarding it?"** → Search Console + GA4 (days to months). Never answer the second with the first.

## 1. Right after a deploy (5 min)

```bash
bash scripts/prod-check.sh            # production; pass a URL for a Netlify preview
node scripts/seo-baseline.mjs         # snapshot 14 key URLs → docs/seo-baselines/<date>.json + diff vs last
```

Expected from `prod-check.sh`:
- Every route `200` (`/sw.js` → `application/javascript`, `/charts/...` → `image/png`, `/sitemap.xml` → `application/xml`).
- Titles are query-leading with live price + today's date, per locale:
  - ar `سعر الذهب اليوم في الأردن عيار 21: 90.35 دينار أردني للجرام | 21 أغسطس 2026`
  - en `Gold Price Today in United Arab Emirates (22K): AED 490.48/g | 21 August 2026`
  - tr `Bugün Türkiye altın fiyatı (22 ayar): …`, hi `आज भारत में सोने का भाव (22 कैरेट): …`, ur `آج پاکستان میں سونے کی قیمت 24 قیراط: …`
- Jordan page: `hreflang-links=7` (ar, en, fr, tr, ur, hi, x-default), `price-table=1 recent=1 currency=1 FinancialProduct=6 InStock=0`, `<html lang="ar" dir="rtl">`.
- Sitemap ≈ 2,076 URLs (346 routes × 6 locales). A big drop = a locale or section fell out of `app/sitemap.ts`.

`seo-baseline.mjs` prints changes vs the previous snapshot (title, description, canonical, hreflang set, H1, schema types, word/link counts, status, TTFB). Any unintended change there is a regression — fix before telling Search Console anything. Commit the new `docs/seo-baselines/*.json`.

If a title is stale on production but correct locally: the page is cached at the edge — titles carry the live price and rebuild on request; wait 5 min (spot/FX revalidate) and re-run.

## 2. Tell Google (owner, Search Console — same day)

1. Sitemaps → remove and re-add `sitemap.xml`.
2. URL Inspection → *Test live URL* on `/jordan/gold-price/21k` → confirm the new title is seen → **Request indexing**. Work down `seo-priority-urls.md` (≈10 requests/day quota): tier-1 21K/22K country pages first, then the `/tr` `/hi` `/ur` `/fr` homes and their flagship country pages.
3. Record the baseline numbers from Performance → last 28 days: clicks, impressions, CTR, average position — overall and for the target queries
   `سعر الذهب اليوم في الأردن` · `سعر الذهب اليوم في السعودية` · `سعر الذهب اليوم في مصر` · `سعر الذهب اليوم في الإمارات` · `gold price today uae 22k`.
   Reference point (2026-08-21): ~12 clicks/day, ~430 clicks/quarter, GA ~278 users/week.
4. Bing Webmaster Tools → submit the same sitemap. If `INDEXNOW_KEY` is set, `POST /api/indexnow` with the priority URLs.

## 3. What "getting better" looks like, in order

| When | Where | Signal | Healthy |
|---|---|---|---|
| Days 1–7 | GSC → Pages, Crawl stats | Indexed count climbing toward ~2,000; "Discovered – currently not indexed" shrinking; crawl requests/day up | `site:goldpricesarabia.com/tr` (hi/ur/fr) returns results |
| Days 5–14 | GSC → Performance, compare 28d vs previous | **CTR** on existing impressions rises (titles changed) | 1–2% → 3–5% on country queries |
| Weeks 2–4 | Performance, filter by Country / Page | **Impressions** up from 22K pages, history hub, research, 4 new languages (Turkey, India, Pakistan, France appear) | new countries > 0; 22K pages get impressions |
| Weeks 4–12 | Performance → Queries | **Average position** on target queries | +1–3 places/month is good at this domain age; #1 needs months + backlinks |
| Ongoing | GA4 → Users by country, landing page, engagement time | Real humans on the new-language pages; engagement up on country pages (tables/charts) | engagement time ↑, bounce ↓ |
| Months | GSC → Links → Top linking sites | Chart-embed gallery (`/widgets`) earning dofollow links | new referring domains |

Interpretation rules:
- CTR flat 3 weeks after recrawl on Jordan/Saudi queries → revisit `priceTitle()` in `lib/seo.ts` (not the content).
- Impressions up, clicks flat → snippet problem: check `priceDescription()` and the H1.
- Indexed count stalls far below 2,000 → crawl budget: check `app/sitemap.ts` tiers/`lastmod` and that long-tail countries are `daily`, not `hourly`.
- Sudden drops on one locale only → run `seo-baseline.mjs`; hreflang/canonical regressions show there.
- New-language pages indexed but zero clicks for 6+ weeks → the English-fallback prose (COUNTRY_NOTES, buy-gold editorial) is the likely thin-content cause; translating it is the next content task.

## 4. Weekly routine (15 min)

1. `node scripts/seo-baseline.mjs` → no unintended changes.
2. GSC Performance: 28d vs previous — clicks, CTR, position for the 5 target queries; Pages report for winners/losers; Countries for the new languages.
3. GSC Pages: indexed count trend; any new "Excluded" reasons.
4. Note findings in `docs/SEO-CHANGELOG.md` only when something was changed in response.

If the Google APIs are connected (the global `/seo google` skill — `python scripts/google_auth.py --check` in that skill's folder), pull the Performance numbers with it instead of reading the UI.

## Files

- `scripts/prod-check.sh` — production smoke (status, titles, hreflang, tables, schema, sitemap, headers).
- `scripts/seo-baseline.mjs` — on-page snapshot + diff; history in `docs/seo-baselines/`.
- `scripts/smoke-seo.sh` — same checks against a local `next build && next start` before deploying.
- `seo-priority-urls.md` — indexing queue; `docs/SEO-CHANGELOG.md` — what changed and why; `sadeqblocker.md` — owner-only steps.

## Known caveats

- Netlify serves HTML with `Cache-Control: private, no-store` despite `netlify.toml` — TTFB is 450–1,000 ms from cold; not an SEO error, but a performance follow-up.
- Every sitemap `lastmod` was today on 2026-08-21 because that deploy touched every page; it spreads out afterwards. All-today forever would be a bug in `routeLastmod()`.
- The third-party `/seo drift baseline` script fails on Windows (`/dev/stdout`); use `scripts/seo-baseline.mjs` instead.
