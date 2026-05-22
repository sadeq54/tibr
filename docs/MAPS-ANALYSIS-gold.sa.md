# Maps Intelligence — gold.sa (Direct Competitor Benchmark)

**Target:** gold.sa — Saudi gold price aggregator
**Type:** Information / price-tracker site (NOT a retailer or local business)
**Capability tier:** **Tier 0 (Free)** — DataForSEO not detected. Plus gold.sa is hosted on Vercel with anti-bot protection (Vercel Security Checkpoint JS challenge), so direct WebFetch returns the bot wall instead of page content.
**Audit purpose:** Head-to-head benchmark for `goldpricesarabia.com` — gold.sa is the closest direct competitor (same business model, not a retailer like L'azurde).
**Date:** 2026-05-17

---

## 1. Maps SEO not applicable (both sites)

Neither gold.sa nor goldpricesarabia.com is a local business. There's no Google Business Profile, no storefront, no service area. **The Maps Intelligence skill therefore yields no map-specific findings for either site.** What this audit produces instead is a **direct head-to-head competitive benchmark on the dimensions that actually matter** for two price-aggregator sites competing in the same SERP.

---

## 2. Observed Structure (via search + site: enumeration)

URL patterns confirmed on gold.sa:

| Section | URL pattern | Notes |
|---|---|---|
| Home | `/`, `/en` | Bilingual (AR primary, EN secondary) |
| Karat-specific (new gold) | `/en/new/24k`, `/en/new/21k`, `/en/new/ounce` | Karat coverage includes 24K, 22K, 21K, 18K |
| Karat-specific (used gold) | `/en/used/all`, `/en/used/21k` | **Unique feature — used-gold pricing** |
| History | `/en/history` | Historical prices |
| Charts | `/en/charts` | Visual analytics |
| Articles | `/en/wiki/*` | Editorial content (e.g. `/en/wiki/global-gold-prices-rise`) |
| Embeddable widget | `/en/gold-sa-new-widget` | **Unique feature — widget for embedding on third-party sites** |

**Tech stack:** Astro framework (detected via `data-astro-cid-*` attributes) on Vercel.
**Currencies:** SAR + USD (vs your 40+).
**Cities covered explicitly:** Riyadh, Jeddah, Dammam (vs your generic "Saudi Arabia").
**Languages:** Arabic + English.

---

## 3. Head-to-Head Scoreboard

### Where gold.sa is ahead

| Dimension | gold.sa | goldpricesarabia.com | Gap |
|---|---|---|---|
| **`.sa` country-code TLD** | yes | no (`.com`) | **STRUCTURAL** — `.sa` is a strong local-relevance signal in Saudi Google. You can't easily flip this without a domain change or country sub-domain. |
| **22K karat coverage** | yes (22K is Gulf default for jewellery) | no (only 24/21/18/14) | Easy to add — 22K = 91.7% purity. Single template change. |
| **Used-gold pricing pages** | yes (`/en/used/*`) | no | Unique intent capture — "I'm selling my old gold" is a different keyword cluster you don't serve. |
| **City-level pricing** | Riyadh / Jeddah / Dammam separately addressed | no city granularity | Programmatic opportunity. |
| **Embeddable widget** | yes (`/en/gold-sa-new-widget`) | no public widget (you have `/widgets` but only documented internally) | Embed widget = backlink moat (sites embedding link back). |
| **Article cadence (`/wiki/*`)** | regular publishing | 1–2 articles, low cadence | Authored Arabic content cadence is your stated gap. |
| **Domain age** | likely older | newer | Time-only fix. |

### Where you are ahead

| Dimension | gold.sa | goldpricesarabia.com | Notes |
|---|---|---|---|
| **Country coverage** | Saudi only | **46 countries** | Massive MENA + global breadth. |
| **Multi-metal** | gold only | **silver, platinum, palladium** | More keyword universes covered. |
| **Cryptocurrency** | none | **12+ coins** with SAR/AED conversion | Adjacent intent capture. |
| **WebSocket median from 3 exchanges** | source unclear (likely single feed) | **Binance + Coinbase + Kraken median via PAXG** | Better data quality story. |
| **Schema graph** | unknown (anti-bot blocks audit) | **Organization + WebSite + Service + per-page FAQPage + WebApplication + NewsArticle ItemList** | You've shipped a richer entity graph in the last few days. |
| **Public methodology page** | unclear | `/methodology` with named sources + Withum audit reference + LBMA reference | Concrete E-E-A-T artifact. |
| **Named founder identity** | not visible in public search | Sadeq Sayed Ahmad + LinkedIn `rel="me"` + Person schema | E-E-A-T author signal. |
| **Programmatic SEO scale** | ~10 templates per city | **720 prerendered pages** (46 countries × 4 karats × 2 locales + per-metal + per-coin + buy-gold etc) | Huge URL surface. |
| **Bilingual parity** | AR-primary, EN secondary | EN + AR equally weighted | Better international reach. |
| **News aggregation** | none visible | RSS aggregator from 5 sources + ItemList schema | Freshness signal. |
| **Modern stack (PPR, Suspense, cached fetchers, Next 16)** | Astro on Vercel | Next 16 on Netlify with cacheComponents | Both modern; both have JS-rendering risks. |
| **Buy-gold editorial content** | unclear | 4 MENA country guides shipped | Decision-stage content. |
| **Calculator + WebApplication schema** | calculator yes, schema unknown | calculator with WebApplication FinanceApplication JSON-LD | Calculator rich result eligibility. |

---

## 4. Verdict (Tier 0)

**Gold.sa wins for narrow Saudi-specific queries:**
- `.sa` TLD ranks better in google.com.sa for any "سعر الذهب في الرياض" / "أسعار الذهب اليوم السعودية"-type query.
- 22K + used-gold + city-level give them sub-segments you simply don't serve.

**You win for everything outside narrow Saudi gold:**
- 46-country coverage means you compete in 46 separate Google country indices.
- Multi-metal + crypto = orders of magnitude more keyword surface.
- E-E-A-T graph (methodology + named author + Withum + LBMA refs + schema) is more defensible.
- Bilingual parity means /en pages can rank in non-Saudi English SERPs (UAE, Egypt, US-based expats).

**Neither is a Maps SEO target.** Neither has GBP. Maps Health Score is N/A for both.

---

## 5. Top 5 Actions for You (derived from this benchmark)

### Quick wins (low effort)

1. **[HIGH]** **Add 22K karat** to the karat list. Single change in `KARATS` constant + template parameterisation. 22K is the Gulf default for jewellery — you currently force users to compare 21K vs 24K when 22K is what they actually buy. Expands `VALID_KARATS` to 5, adds 92 new URLs (46 countries × 1 karat × 2 locales).
2. **[MED]** **Add city-level Saudi pages** under a new route pattern e.g. `/[locale]/saudi-arabia/[city]/gold-price/[karat]` for Riyadh, Jeddah, Dammam, Mecca, Medina, Dammam. Programmatic = 5 cities × 4 karats × 2 locales = 40 URLs. Pulls "سعر الذهب في الرياض" / "Riyadh gold price" intent. Use the same data feed; only `<h1>`/intro vary.
3. **[MED]** **Add used-gold pricing pages** mirroring gold.sa's `/used/*` pattern. Typically priced at spot × purity × dealer-buyback-discount (80–95%). Easy formula, unique keyword cluster (`سعر الذهب المستعمل`, `selling gold Saudi Arabia`).

### Bigger plays

4. **[HIGH]** **Public embeddable widget** under `/widgets/embed/[widget]` (route already exists per build output). Promote it. Sites embedding your widget link back = durable backlink stream. Gold.sa already has this; you're behind.
5. **[HIGH]** **Authored article cadence** — minimum 2 Arabic articles + 1 English per month. Use the `AuthorByline` component (already shipped on news articles). gold.sa's `/wiki/*` section is constantly updated; their freshness signal stays strong. Yours is a fortnightly afterthought.

### Structural / longer-term

6. **[LOW]** **Consider acquiring a `.sa` domain** (e.g. `goldpricesarabia.sa`) and 301-redirecting Saudi-targeted pages there. Country-code TLD is the single biggest geo-relevance signal Google uses. Or set up a `sa.goldpricesarabia.com` country sub-domain with hreflang `ar-SA` / `en-SA`. The locale folder strategy (`/en-sa/`, `/ar-sa/`) flagged in the L'azurde report achieves a similar signal at lower cost.

---

## 6. Competitive Landscape Snapshot (Saudi gold price segment)

From Similarweb data referenced in search results:

| Site | Monthly visits | Position |
|---|---|---|
| goldprice.org | 12.3M | Global authority (different market) |
| saudiexchange.sa | 2.7M | Financial exchange portal, broad |
| sarf-today.com | 914.4K | Currency + gold tracker |
| alahlitadawul.com | 732.4K | Bank-affiliated trading platform |
| alrajhitadawul.com.sa | 661.7K | Bank-affiliated trading platform |
| dewanaldahab.com | 384.5K | Direct gold dealer |
| saudigoldprice.com | (top-10 leader) | Direct competitor — pure price aggregator |
| sbaik.sa | 175.9K | Bullion marketplace |
| goldbullioneg.com | 148.3K | Egypt-focused |
| ounce.com.sa | 49.8K | Saudi dealer |

**Notable absence:** gold.sa and goldpricesarabia.com both not in the Similarweb top-10 returned. Both are smaller / newer entrants. The category is dominated by sites with bank affiliations (alahli, alrajhi), financial exchange brands (saudiexchange.sa), and currency-tracker hybrids (sarf-today). To win you need EITHER bank-tier authority (hard) OR a defensible niche the others don't serve (multi-metal + crypto + MENA-wide + bilingual = exactly your moat). Don't try to be a better gold.sa; be the only multi-asset MENA aggregator.

---

## 7. Limitations Disclaimer

- **Tier 0 only** — no DataForSEO, no live SERP / review / geo-grid data.
- **gold.sa anti-bot blocked direct WebFetch** — analysis based on search snippets, `site:gold.sa` enumeration, and public knowledge of their patterns. Cannot confirm schema, exact word counts, or real per-page rendering quality.
- **Vercel Security Checkpoint** is a JS challenge — Googlebot bypasses it via Vercel's renderer integration, but third-party crawlers (including ours, and probably some SEO audit tools) hit the wall. This is a deployment-config choice; not a Google penalty.
- **Similarweb traffic numbers are estimates** with known ±30% error margins. Useful for relative ranking, not absolute traffic claims.
- **Neither site has a Google Business Profile** so this is not a true Maps audit. It's a competitive-positioning report against the closest direct competitor.

---

## 8. Cross-Skill Suggestions

| Finding | Next skill |
|---|---|
| Add 22K karat support | code change (no skill needed) |
| Embeddable widget promotion strategy | `/seo programmatic` for scale-out plan |
| City-level Saudi pages | `/seo programmatic` |
| Bank/financial entity comparison | install DataForSEO, run `/seo dataforseo google_keyword_difficulty "سعر الذهب"` |
| Real backlink benchmark of gold.sa | install Moz API or Ahrefs |

---

**Report generated 2026-05-17 at Tier 0. gold.sa direct fetch blocked by Vercel anti-bot; findings based on search enumeration + public patterns.**
