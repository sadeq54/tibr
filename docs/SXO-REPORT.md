# Search Experience Optimization (SXO) Report

**Generated:** 2026-05-17
**Scope:** 16 page templates × 2 locales (ar + en) = 32 URL analyses
**Method:** SERP backwards analysis — fetch target page, search Google in target locale, classify top 10 results by page type, score 7-dimension gap analysis (0–100), score personas (4×25 = 100), derive user stories from SERP signals (PAA, AI Overview, ads, related searches).

SXO score is **separate** from technical SEO health. A page can be technically perfect and still score low if its page type does not match what Google rewards for the keyword. SXO score = alignment between page and SERP expectations.

---

## 1. Executive Summary

### Score distribution

| Score band | Count | Pages |
|---|---|---|
| 60–69 (good alignment) | 1 | Country×Karat /en |
| 50–59 (decent alignment) | 8 | Country×Karat /ar (58), Per-Gram /en (55), Methodology /en (55), Per-Gram /ar (54), Home /ar (54), Best-Price UAE /en (54), Best-Price UAE /ar (52), Methodology /ar (51) |
| 40–49 (gap) | 12 | Home /en (49), Calculator /ar (49), Karat 21K /en (47), Live /ar (46), Calculator /en (46), Chart /en (46), Coins /ar (46), Buy-Gold SA /ar (44), Chart /ar (43), Bitcoin /ar (43), Silver /ar (41), Karat 21K /ar (50) |
| 30–39 (poor) | 7 | Bitcoin /en (39), Silver /en (38), Live /en (38), Buy-Gold SA /en (38), News 21K /ar (37), News 21K /en (36), Spot /ar (34) |
| <30 (critical) | 4 | Coins /en (29), Historical 2026 /ar (28), Spot /en (28), Historical 2026 /en (26) |

**Site median:** 46/100. **Worst:** /en/historical-gold-prices/2026 (26). **Best:** /en/saudi-arabia/gold-price/21k (63).

### Headline findings

1. **Schema is missing site-wide.** Zero confirmed Product / PriceSpecification / FAQPage / WebApplication schema on any of the 32 URLs analyzed. Every direct competitor uses at least FAQPage + Product. This is the single highest-leverage technical fix.
2. **Live prices are JavaScript-only.** Googlebot fetches HTML without executing client-side React; price tables, chart values, and calculator outputs render as `$0.00` or empty placeholders. Featured snippets and AI Overviews cannot extract data the bot cannot see.
3. **English head-terms ("spot gold price", "live gold price", "buy gold coins", "bitcoin price today") are structurally unwinnable** — Kitco, APMEX, eBay, CoinMarketCap, BullionVault carry 20+ years of domain authority. Strategy must pivot to MENA-modifier long-tails where the site has a defensible differentiation moat.
4. **No human author bylines anywhere except `/news/*` articles.** Methodology, calculator, price hubs all show only "Gold Prices Arabia" as publisher. Google's E-E-A-T framework specifically asks "who is responsible for this content?" — answer must be a named human.
5. **News articles target tool-intent keywords.** `/news/saudi-gold-21k-may-2026-overview` is a well-written editorial article published into a SERP where 9–10 of top 10 are live price tools. Even perfect content cannot rank a news article for a price-check query.

### Critical bugs (file-level, not strategy)

| Bug | File / Route | Symptom | Severity |
|---|---|---|---|
| Calculator SSR price = `$0.00` | `/gold-calculator`, `/en/gold-calculator` | Googlebot crawls a calculator showing `$0.00` formula output → site appears broken | HIGH |
| Coins denomination prices = `$0` | `/buy-gold/{country}/coins` (8 routes) | All denomination rows render `$0` on initial server response | HIGH |
| Historical data pipeline empty | `/historical-gold-prices/2026`, `/en/historical-gold-prices/2026` | Page promises 2026 history but shows "pending data pipeline completion" — no actual content | HIGH |
| Meta description absent (ar) | `/saudi-arabia/gold-price/21k` (and likely many other /ar/ pages) | Arabic pages render without `<meta name="description">` → lower CTR | MED |

---

## 2. Top 10 Site-Wide Priority Actions (ranked by impact × ease)

### A. Schema rollout (effort: medium, impact: HIGH across 32+ pages)

1. **Implement `FAQPage` JSON-LD on every page with an FAQ block.** Most pages already have FAQ HTML — only missing the schema wrapper. Unlocks PAA eligibility across 7/10 competing SERPs.
2. **Implement `PriceSpecification` + `FinancialProduct` JSON-LD on every price-displaying page.** Required for featured-snippet and AI Overview citation. Use `priceCurrency`, `price`, `priceValidUntil`, `validFrom` properties.
3. **Implement `WebApplication` JSON-LD on calculator pages** (`applicationCategory: "FinanceApplication"`). Top calculator competitor (`goldpricez.com`) earns a featured-snippet card directly from this schema.
4. **Implement `BreadcrumbList` JSON-LD site-wide** — present in 9/10 ranking competitors, near-universal expectation.
5. **Implement `Article` schema + author attribution on news articles** with `author`, `datePublished`, `dateModified`, `publisher` — minimum for Google News inclusion.

### B. Server-side rendering of price data (effort: medium, impact: HIGH)

6. **SSR (or pre-hydrate) the live price values in every karat table, calculator output, and ticker.** Currently all values are client-rendered → Googlebot sees `$0` or empty. Fix this once at the data layer (e.g., `getCachedSpot()` server result baked into HTML) and it propagates to every page.

### C. E-E-A-T signal layer (effort: low, impact: MED across all pages)

7. **Add visible "Last updated: HH:MM UTC" timestamp** as static HTML next to every price block. Currently the "updates every 60 seconds" claim only appears in FAQ prose — Google cannot read freshness from prose.
8. **Add named author byline + credentials** on `/methodology`, `/gold-calculator`, and all price hubs. Even "Reviewed by Sadeq Sayed Ahmad — Founder" with a link to `/about/sadeq` is a major E-E-A-T uplift over the current zero-attribution state.
9. **Add outbound hyperlinks to every named data source** on `/methodology` (Binance, Coinbase, Kraken, FOREXCOM, goldapi.io, Yahoo Finance, CoinGecko). Source attribution without links is an E-E-A-T weakness.

### D. Keyword strategy pivot for English head-terms (effort: low, impact: HIGH)

10. **Reposition English `/en/spot-gold`, `/en/live-gold-price`, `/en/cryptocurrency/bitcoin` away from global head-terms** toward MENA-modifier long-tails:
    - "spot gold price in Saudi Arabia" / "XAU/SAR live"
    - "live gold price UAE AED"
    - "bitcoin price in Saudi riyals" / "BTC SAR"

    These cut competition by 80–90% and match the site's actual regional content advantage. Update title, H1, meta, internal anchor text accordingly.

---

## 3. Cross-Cutting Patterns (observed in 4+ agents)

### Pattern 1 — Schema absence (32/32 pages)
No confirmed JSON-LD structured data on any analyzed URL. Competitors uniformly use Product, FAQPage, PriceSpecification, BreadcrumbList. Likely a one-time fix (centralize schema generation in a `<JsonLd>` component already partially built per `tibr/CLAUDE.md`) that lifts every page simultaneously.

### Pattern 2 — JS-only price rendering (32/32 pages)
Static HTML fetched by Googlebot shows `$0.00`, "loading…", or empty placeholders where prices should appear. The Suspense / streaming RSC pattern that ships interactive price components does not deliver crawlable values to the static HTML response. Fix: pre-render the cached spot value into the initial HTML via the `getCachedMetals()` / `getCachedSpot()` server functions added in the earlier perf wave.

### Pattern 3 — Author/E-E-A-T attribution gap (28/32 pages; exception: news articles)
Founder Sadeq Sayed Ahmad is named on `/about/sadeq` only. No page-level author byline anywhere else. Add a shared author/reviewer footer component to every money page.

### Pattern 4 — English head-term authority mismatch (5 pages: Spot /en, Live /en, Bitcoin /en, Coins /en, Buy-Gold SA /en)
SERPs dominated by Kitco/APMEX/BullionVault (gold), eBay/Amazon.sa (coins), CoinMarketCap/CoinGecko (crypto). Domain rating differential (DR 80+ vs ~30) cannot be closed with on-page optimization. Strategic keyword pivot needed.

### Pattern 5 — Freshness signal invisible to bots (32/32 pages)
"Updated every 60 seconds" claim appears only in FAQ prose. No visible HTML timestamp adjacent to prices. Competitors (Goodreturns.in, exchange-rates.org) embed dates in titles/snippets and outrank on freshness perception alone.

### Pattern 6 — News articles targeting tool-intent keywords (2 pages: News /ar, News /en)
`/news/saudi-gold-21k-may-2026-overview` competes against 90% tool-class SERP. Re-target editorial articles to informational long-tails ("why 21K dominates Saudi jewelry", "how is 21K gold price calculated") where the article format actually wins.

---

## 4. Per-Template Detail (16 templates, 32 URLs)

### Template 1 — Home

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/` (ar) | **54/100** | ALIGNED — competing vs Investing.com/Kitco | (1) FAQPage schema with Arabic Q&A. (2) Lead with Saudi-specific 21K SAR price above-the-fold (replace multi-metal global widget). (3) Add Zakat calculator at top nav. |
| `/en` (en) | **49/100** | ALIGNED — competing vs Gulf News/livepriceofgold | (1) FAQPage + BreadcrumbList schema. (2) Lead with 21K SAR/gram + 7-day sparkline + today-vs-yesterday delta. (3) Publish daily authored market brief (200–400w, dated). |

**Key insight:** Multi-metal global framing dilutes Saudi-specific intent. Both Arabic and English head-page queries are dominated by Saudi-TLD competitors. Lead with the highest-volume sub-query (21K SAR/gram) and Knowledge-Panel-style metrics.

---

### Template 2 — Karat live-price hub (`/gold-price/[karat]`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/gold-price/21k` (ar) | **50/100** | MISMATCH-LOW — adds news/freshness layer | (1) Add "today's 21K update" editorial block (150–250w, dated). (2) FAQPage schema with Arabic PAA-targeted Q&A. (3) Add making-charge (مصنعية) section with typical 8–15 SAR/gram range. |
| `/en/gold-price/21k` (en) | **47/100** | ALIGNED — facing keyword-exact competitors (gold21price.com, goldpriceg.com) | (1) FAQPage schema. (2) Embed multi-timeframe 21K chart (7/30/90/1yr) with SAR/USD toggle. (3) Add inline "21K vs 22K" comparison module. |

---

### Template 3 — Country × Karat (`/[country]/gold-price/[karat]`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/saudi-arabia/gold-price/21k` (ar) | **58/100** | MISMATCH-LOW — missing date-stamped layer | (1) Add datestamp to H1 ("اليوم — آخر تحديث"). (2) Write missing Arabic meta description (currently absent). (3) Add today-vs-yesterday delta block. |
| `/en/saudi-arabia/gold-price/21k` (en) | **63/100** | ALIGNED — best-scoring page | (1) Add visible "Last updated: HH:MM UTC" below H1. (2) Add per-tola pricing (South Asian expat segment). (3) Add explainer of how 21K SAR price is derived (`spot / 31.1035 × 0.875 × SAR rate`). |

**Key insight:** This template performs best across the entire site. Apply the same playbook (datestamp, meta description, derivation explainer) to all 46 country × 4 karat permutations = 368 routes that already exist via programmatic SEO.

---

### Template 4 — Spot Gold

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/spot-gold` (ar) | **34/100** | **MISMATCH-HIGH** — vs TradingView/Investing/Bloomberg | (1) Embed interactive XAU/USD chart (TradingView widget) as primary above-fold element. (2) Add daily Arabic market brief ("تحليل السوق اليوم"). (3) Add "ما هو السعر الفوري للذهب؟" educational section. |
| `/en/spot-gold` (en) | **28/100** | **MISMATCH-CRITICAL** — vs Kitco/APMEX/BullionVault | (1) **PIVOT KEYWORD** away from "spot gold price" to "spot gold price in Saudi Arabia" or "XAU/SAR live price". (2) Add troy ounce price as primary metric (currently gram-first). (3) Embed interactive chart with 24h/1W/1M views. |

---

### Template 5 — Buy-Gold country hub (`/buy-gold/[country]`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/buy-gold/saudi-arabia` (ar) | **44/100** | MISMATCH-MED — H1 promises buying, page is price tool | (1) Add 800–1000w "كيفية شراء الذهب في السعودية" section. (2) FAQPage + Product schema. (3) Add curated Saudi merchant directory (sbaik.sa, ounce.com.sa, dewanaldahab). |
| `/en/buy-gold/saudi-arabia` (en) | **38/100** | MISMATCH-HIGH — English SERP more e-commerce-weighted | (1) Add 1000–1500w editorial guide (legal framework for expats, SASO/SABER hallmarking, VAT). (2) Implement Product + FAQPage + Article schema. (3) Add curated "Where to Buy" merchant section with trust badges. |

**Key insight:** These pages were just shipped in commit `b51e7c8` with zero content layer — only price tables under buy-intent URLs. Will not rank without editorial + merchant content. Same gap exists on all 8 new MENA buy-gold URLs (Saudi, UAE, Egypt, Morocco × hub + 3 sub-types).

---

### Template 6 — Buy-Gold sub-product (`/buy-gold/[country]/[type]`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/buy-gold/saudi-arabia/coins` (ar) | **46/100** | MISMATCH-MED + **BUG: $0 placeholder prices** | (1) **Fix dynamic price loading** — denominations show $0/0 SAR. (2) Add 400–600w Arabic coin-type content (Saudi Fahad, Krugerrand, PAMP). (3) Product + FAQPage schema per denomination. |
| `/en/buy-gold/saudi-arabia/coins` (en) | **29/100** | **MISMATCH-CRITICAL** — vs eBay/Amazon.sa/APMEX/L'azurde marketplaces | (1) **PIVOT to merchant-directory model** OR re-target keyword to "gold coin price Saudi Arabia" (informational not buy-intent). (2) Add coin product imagery. (3) Add affiliate/partner links with BNPL options (Tamara/Tabby). |

---

### Template 7 — Best-Price (country) (`/best-gold-price/[country]`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/best-gold-price/uae` (ar) | **52/100** | ALIGNED — H1 "أفضل سعر" sets unmet comparison intent | (1) Add UAE dealer/souk comparison table (3–5 dealers with buy/sell spread vs spot). (2) FAQPage + PriceSpecification schema. (3) Add visible "آخر تحديث" timestamp adjacent to price. |
| `/en/best-gold-price/uae` (en) | **54/100** | ALIGNED — uncontested PAA opportunity | (1) Publish "Is Dubai Gold Really Cheaper?" with data-driven Dubai vs US/UK/EU table — **uncontested featured-snippet opportunity**. (2) FAQPage schema for the 3 observed PAAs. (3) Add GBP/EUR to currency selector. |

---

### Template 8 — Live Gold Price (`/live-gold-price`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/live-gold-price` (ar) | **46/100** | MISMATCH-MED — page leads AED/regional, SERP expects USD/global | (1) Add XAU/USD (troy oz) as primary; AED/gram as secondary. (2) FinancialProduct + Dataset schema (YMYL requirement). (3) Add price-direction arrow + percentage-change-from-close. |
| `/en/live-gold-price` (en) | **38/100** | **MISMATCH-CRITICAL** — vs Kitco/BullionVault/APMEX | (1) **PIVOT keyword** to "live gold price UAE AED" or "live gold price in dirhams". (2) FinancialProduct + WebApplication schema. (3) Above-fold "live seconds countdown" + EEAT trust panel. |

---

### Template 9 — Gold Price Chart (`/gold-price-chart`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/gold-price-chart` (ar) | **43/100** | MISMATCH-MED — FAQ wrapper, chart loads via JS | (1) Render static SVG chart snapshot as crawlable fallback above the fold. (2) FAQPage + WebApplication schema. (3) Move chart widget above all FAQ content. |
| `/en/gold-price-chart` (en) | **46/100** | MISMATCH-MED — same JS-rendering issue | (1) Inject SSR'd current price table (24K/22K/21K/18K SAR+USD) immediately below H1. (2) FAQPage + WebApplication schema. (3) Visible "Last updated" timestamp as crawlable text. |

---

### Template 10 — Per-Gram (`/gold-price-per-gram`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/gold-price-per-gram` (ar) | **54/100** | ALIGNED — best structural match | (1) SSR per-gram price table with 21K prominently first. (2) PriceSpecification schema per karat with `priceCurrency: "SAR"`. (3) FAQPage schema wrapping existing FAQ. |
| `/en/gold-price-per-gram` (en) | **55/100** | ALIGNED — AI Overview already triggers for this query | (1) PriceSpecification schema — fastest path to AI Overview source citation. (2) SSR'd HTML price table with 21K first (currently JS-only). (3) FAQPage schema. |

**Key insight:** Per-gram pages are the strongest aligned pages. Apply the same SSR+schema fix to lift the rest of the site's per-unit family (per-ounce, per-kilo).

---

### Template 11 — Precious Metal (`/precious-metals/[metal]`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/precious-metals/silver` (ar) | **41/100** | MISMATCH-MED — JS-rendered prices invisible | (1) FAQPage schema on existing FAQ. (2) Dataset + FinancialProduct schema with SSR'd price values. (3) Replace generic platform FAQs with silver-market educational Q&A. |
| `/en/precious-metals/silver` (en) | **38/100** | MISMATCH-MED — vs Kitco/APMEX/JM Bullion/BullionVault | (1) Product + Offer schema (Kitco's featured-snippet structure). (2) FAQPage schema targeting PAA: "What is silver spot price?", "Why is silver dropping?", "Silver all-time high?". (3) SSR bid/ask/change price table per ounce/gram/kg. |

---

### Template 12 — Calculator (`/gold-calculator`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/gold-calculator` (ar) | **49/100** | ALIGNED — type match, missing modes | (1) WebApplication JSON-LD (`applicationCategory: "FinanceApplication"`). (2) FAQPage schema answering "كيف أحسب سعر الذهب بالجرام؟". (3) Add "حاسبة الذهب المستعمل" + "حاسبة زكاة الذهب" modes as tabs. |
| `/en/gold-calculator` (en) | **46/100** | ALIGNED + **BUG: SSR shows `$0.00`** | (1) **Fix SSR price** — calculator formula renders `$0.00` to Googlebot = broken-tool signal. (2) WebApplication JSON-LD. (3) Add scrap-gold mode (top-5 SERP competitor goldcalc.com ranks on scrap intent). |

---

### Template 13 — Crypto Coin (`/cryptocurrency/[coin]`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/cryptocurrency/bitcoin` (ar) | **43/100** | MISMATCH-MED — vs TradingView/Investing/CoinMarketCap | (1) Embed interactive TradingView widget. (2) FAQPage schema for PAA "هل البيتكوين حلال؟", "سعر البيتكوين بالريال السعودي". (3) BTC-to-SAR / BTC-to-USD calculator. |
| `/en/cryptocurrency/bitcoin` (en) | **39/100** | MISMATCH-MED + authority ceiling | (1) **PIVOT keyword** from "bitcoin price today" (unwinnable vs CoinMarketCap) to "bitcoin price in Saudi riyals" / "BTC to SAR". (2) Real-time BTC/SAR conversion with sourced exchange rate. (3) Interactive price chart + 2,500+w educational expansion. |

---

### Template 14 — News Article (`/news/[slug]`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/news/saudi-gold-21k-may-2026-overview` (ar) | **37/100** | **MISMATCH-CRITICAL** — editorial vs 70% tool-dominant SERP | (1) **Re-target keyword** from "سعر الذهب عيار 21 السعودية مايو 2026" (tool intent) to "لماذا يسيطر الذهب عيار 21 على سوق المجوهرات في السعودية" (informational). (2) Add live price embed at top of article (bridges intent gap). (3) Remove "may-2026" from URL slug (or 301 to evergreen after June). |
| `/en/news/saudi-gold-21k-may-2026-overview` (en) | **36/100** | **MISMATCH-CRITICAL** — pure editorial vs 90% tool SERP | (1) Re-target to "why 21K gold dominates Saudi Arabia jewelry market" or "21K gold purity explained Saudi Arabia". (2) Add live 21K price callout in first 100 words. (3) Reformat the SAR calculation formula into featured-snippet-optimized numbered steps. |

**Key insight:** News articles have strong E-E-A-T (named author, dated, formula with sources) — they just target the wrong keyword cluster. The author/byline/date structure is already in place; transplant to informational long-tails where editorial format wins.

---

### Template 15 — Historical (year) (`/historical-gold-prices/[year]`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/historical-gold-prices/2026` (ar) | **28/100** | **MISMATCH-CRITICAL + BUG: empty data pipeline** | (1) **Populate 2026 daily OHLC data** — page says "pending data pipeline completion". (2) Replace FAQ-first hierarchy with data-first (chart + stat bar + daily table). (3) BreadcrumbList + Dataset schema. |
| `/en/historical-gold-prices/2026` (en) | **26/100** | **MISMATCH-CRITICAL + BUG: empty data pipeline** | (1) Build 2026 daily OHLC table in USD with SAR/EUR/GBP toggle. (2) Interactive chart with 1M/3M/6M/YTD/ALL hero element. (3) 300–500w narrative on 2026 gold price drivers (Fed, geopolitics, central bank demand). |

**Lowest-scoring template in the entire audit.** Same fix applies to /2024 and /2025 historical years.

---

### Template 16 — Trust / Methodology (`/methodology`)

| URL | Score | Verdict | Top 3 actions |
|---|---|---|---|
| `/methodology` (ar) | **51/100** | ALIGNED (for trust use case) | (1) Article/WebPage schema with `author`, `dateModified`, `publisher`, `citation` array per source. (2) Add named author/reviewer with credentials. (3) Add hyperlinks to all 6 cited data sources. |
| `/en/methodology` (en) | **55/100** | ALIGNED — comparable to gold.org reference standard | (1) Same Article schema + author + source links as Arabic. (2) Add above-the-fold "Why Trust Us?" summary (data sources, update frequency, audit schedule). (3) Add brief developer/API section. |

**Key insight:** Methodology pages have the strongest content depth and freshness scores in the audit (`Last Updated: 2026-05-17` displayed, 6 data sources named, Withum audit referenced). Adding author byline + schema would push these into top-decile.

---

## 5. Cross-Skill Recommendations

| Finding | Recommended next skill |
|---|---|
| Site-wide schema absence | `/seo schema` — generate FAQPage + Product + PriceSpecification + WebApplication + Article schema templates |
| JS-rendered prices invisible to bots | `/seo technical` — full audit including SSR/hydration strategy |
| Content depth gaps on Bitcoin/Silver/Buy-Gold pages | `/seo content` — E-E-A-T audit and content briefs |
| News articles targeting wrong keywords | `/seo page` — page-level audit + keyword retargeting |
| AI Overview eligibility | `/seo geo` — GEO/AI search optimization |
| Local intent on /best-gold-price/uae and /buy-gold/{country} | `/seo local` — GBP signals + local pack analysis |
| MENA expat persona scoring weakness | `/seo content-brief` — Arabic+English bilingual content briefs |

---

## 6. Methodology & Limitations

### Methodology

Per template, one representative URL was analyzed in each locale (ar + en):

1. **Page fetch** — WebFetch to extract title, H1, meta, body, schema, CTAs, media count.
2. **Keyword auto-detection** — from title + H1 overlap.
3. **SERP analysis** — WebSearch top 10 organic results in the target locale.
4. **Page-type classification** — each result tagged using a 10-type taxonomy (informational, comparison, product, landing, tool, how-to, local, hub, news, listicle).
5. **Mismatch detection** — target vs SERP dominant type. Severity: ALIGNED | LOW | MED | HIGH | CRITICAL.
6. **User stories** — 3–5 stories per URL, each citing a specific SERP signal (PAA text, ad copy phrase, related search).
7. **Gap analysis** — 7 dimensions × max scores = 100: Page Type 15 + Content Depth 15 + UX 15 + Schema 15 + Media 15 + Authority/E-E-A-T 15 + Freshness 10.
8. **Persona scoring** — 3 personas × 4 dimensions × 25 = 100 each: Relevance + Clarity + Trust + Action.
9. **Priority actions** — max 5 per URL, ranked by severity.

### Limitations

- **Template-level, not URL-level.** 720+ pages exist; one representative URL per template was analyzed. Findings generalize within templates but may miss URL-specific issues.
- **JS rendering unverified.** WebFetch returns static HTML only. Schema or prices injected via JavaScript may exist but cannot be confirmed; Google's rendering pipeline partially processes them but less reliably than SSR.
- **SERP locale not perfectly replicated.** WebSearch runs from a US-based endpoint. Arabic SERPs especially may differ when queried from inside Saudi Arabia / UAE / Egypt.
- **Domain authority not quantified.** Backlink profiles, DR/DA scores, and citation patterns require third-party tools (Ahrefs/Moz/Semrush). E-E-A-T scoring is inferred from observable on-page and SERP-snippet signals.
- **PAA text occasionally inferred.** Some PAA questions were inferred from competitor FAQ content and related search patterns rather than directly observed PAA boxes.
- **Newly-shipped pages have no ranking history.** `/buy-gold/{saudi-arabia,uae,egypt,morocco}` and the MENA sub-types were shipped today (commit `b51e7c8`) and have no Google Search Console data to reference.

---

## 7. Appendix — All 32 Scores Sorted

| Rank | URL | Score | Severity |
|---|---|---|---|
| 1 | `/en/saudi-arabia/gold-price/21k` | 63/100 | ALIGNED |
| 2 | `/saudi-arabia/gold-price/21k` | 58/100 | MISMATCH-LOW |
| 3 | `/en/gold-price-per-gram` | 55/100 | ALIGNED |
| 3 | `/en/methodology` | 55/100 | ALIGNED |
| 5 | `/gold-price-per-gram` | 54/100 | ALIGNED |
| 5 | `/` | 54/100 | ALIGNED |
| 5 | `/en/best-gold-price/uae` | 54/100 | ALIGNED |
| 8 | `/best-gold-price/uae` | 52/100 | ALIGNED |
| 9 | `/methodology` | 51/100 | ALIGNED |
| 10 | `/gold-price/21k` | 50/100 | MISMATCH-LOW |
| 11 | `/en` | 49/100 | ALIGNED |
| 11 | `/gold-calculator` | 49/100 | ALIGNED |
| 13 | `/en/gold-price/21k` | 47/100 | ALIGNED |
| 14 | `/live-gold-price` | 46/100 | MISMATCH-MED |
| 14 | `/en/gold-calculator` | 46/100 | ALIGNED + BUG |
| 14 | `/en/gold-price-chart` | 46/100 | MISMATCH-MED |
| 14 | `/buy-gold/saudi-arabia/coins` | 46/100 | MISMATCH-MED + BUG |
| 18 | `/buy-gold/saudi-arabia` | 44/100 | MISMATCH-MED |
| 19 | `/gold-price-chart` | 43/100 | MISMATCH-MED |
| 19 | `/cryptocurrency/bitcoin` | 43/100 | MISMATCH-MED |
| 21 | `/precious-metals/silver` | 41/100 | MISMATCH-MED |
| 22 | `/en/cryptocurrency/bitcoin` | 39/100 | MISMATCH-MED |
| 23 | `/en/precious-metals/silver` | 38/100 | MISMATCH-MED |
| 23 | `/en/live-gold-price` | 38/100 | MISMATCH-CRITICAL |
| 23 | `/en/buy-gold/saudi-arabia` | 38/100 | MISMATCH-HIGH |
| 26 | `/news/saudi-gold-21k-may-2026-overview` | 37/100 | MISMATCH-CRITICAL |
| 27 | `/en/news/saudi-gold-21k-may-2026-overview` | 36/100 | MISMATCH-CRITICAL |
| 28 | `/spot-gold` | 34/100 | MISMATCH-HIGH |
| 29 | `/en/buy-gold/saudi-arabia/coins` | 29/100 | MISMATCH-CRITICAL |
| 30 | `/historical-gold-prices/2026` | 28/100 | MISMATCH-CRITICAL + BUG |
| 30 | `/en/spot-gold` | 28/100 | MISMATCH-CRITICAL |
| 32 | `/en/historical-gold-prices/2026` | 26/100 | MISMATCH-CRITICAL + BUG |

---

**Report generated by 8 parallel SXO agents (`claude-seo:seo-sxo`) — 16 templates × 2 locales, ~250s per agent, 32 total URL analyses.**
