# Maps Intelligence — L'azurde Riyadh (Competitor Benchmark)

**Target:** L'azurde (لازوردي) — Saudi/UAE/Egypt jewellery chain
**City scope:** Riyadh, Saudi Arabia
**Capability tier:** **Tier 0 (Free)** — DataForSEO not detected. Geo-grid rank tracking, live GBP profile audit, review intelligence (rating/count/velocity), photo analysis, and AI place summaries are NOT available at this tier. Install the DataForSEO extension to unlock Tier 1.
**Audit purpose:** Benchmark for `goldpricesarabia.com` to understand how the dominant MENA jewellery brand structures its multi-location map presence.
**Date:** 2026-05-17

---

## 1. Maps Health Score (Tier 0 estimate): **62 / 100**

| Dimension | Score | Note |
|---|---|---|
| Brand entity strength | 14/15 | Major listed company (Lazurde Company For Jewelry jsc, Argaam), strong recognised brand across MENA. |
| Multi-location coverage | 12/15 | Confirmed locations across Riyadh (The View Mall flagship, Riyadh Gallery, Al Nakheel Mall) + Jeddah + Dammam + UAE + Egypt. Network breadth is high. |
| Web→Maps NAP signal | 8/15 | HQ NAP listed publicly (198 Al Masaref Street, Banks District, Riyadh 11521 / +966 920 009 709). Per-store NAP buried inside JS-rendered store locator → crawler-invisible. |
| Schema markup | 4/15 | No LocalBusiness / Organization JSON-LD detected on homepage. Major gap. |
| Cross-platform listing presence | 10/15 | Strong on Google, third-party directories (Eye of Riyadh, Cenomi, Yandex, KSA Directory). Bing Maps + Apple Business Connect verification not directly confirmed at Tier 0. |
| Social proof / linked profiles | 8/10 | All major social profiles linked: @lazurdeksa (Instagram), /lazurde (Facebook, Pinterest, Twitter), LazurdeJewelry (YouTube). |
| Review intelligence | 0/15 | **Tier 0 cannot pull** live rating, review count, response rate, velocity, or distribution. Requires DataForSEO. |
| Freshness signals | 6/5 | Recent news (Time Out Riyadh, "new branches in Riyadh"). Active social. |

**TOTAL: 62/100** — Strong brand + multi-location reach offset by JS-rendered store-locator and missing schema. Tier 1 audit would refine the score by ±10 points depending on actual review profile.

---

## 2. Business Identity & NAP (confirmed)

| Field | Value |
|---|---|
| Primary name | L'azurde |
| Arabic name | لازوردي |
| Legal entity | Lazurde Company For Jewelry jsc (لازوردي للمجوهرات) |
| Sub-brands | Instyle, Miss L', Waves |
| HQ address | 198 Al Masaref Street, Banks District, Riyadh 11521, Saudi Arabia |
| HQ phone | +966 920 009 709 |
| Website | https://www.lazurde.com (en-sa / ar-sa / en-ae / ar-ae / en-eg / ar-eg) |
| Listed (stock) | Yes — Tadawul (Argaam profile) |
| Instagram | @lazurdeksa |
| Facebook | /lazurde |
| Pinterest | /lazurde |
| Twitter / X | @lazurde |
| YouTube | LazurdeJewelry |

---

## 3. Confirmed Riyadh Retail Locations (3 of N)

| Location | Address | Phone | Notes |
|---|---|---|---|
| **The View Mall** (flagship) | King Abdulaziz Road, Riyadh | (mall directory) | Described as "main branch" in trade press. |
| **Riyadh Gallery Mall** | Al Olaya, Riyadh | (mall directory) | Houses the new Miss L' sub-brand. |
| **Al Nakheel Mall** | Gate 5, Ground floor, Shop 47, Al Imam Saud Ibn Abdul Aziz Branch Rd, Riyadh | +966 11 203 1866 | Direct-line phone available. |

**Tier 0 limitation:** lazurde.com's store locator page is JavaScript-rendered. Crawler fetch returns "No stores found" — invisible to Googlebot static crawl. **This is a major SEO gap for L'azurde** that you can exploit.

---

## 4. Cross-Platform Presence (Tier 0 partial)

| Platform | Status | Notes |
|---|---|---|
| Google Maps | Present (multiple locations) | Top-Rated.Online aggregates show place_id 8255450 for at least one Riyadh location. Live rating/review count requires Tier 1. |
| Bing Places | Likely present (couldn't verify direct — Bing Maps page is JS-rendered) | Recommend manual check at bing.com/maps. |
| Apple Maps (Business Connect) | Cannot verify via API (no public Apple Maps search). Recommend claiming at businessconnect.apple.com if not already done. |
| OpenStreetMap (Overpass) | Query returned no clean results (encoding/regex issues at Tier 0). Manual check at openstreetmap.org/search recommended. |
| Cenomi Centers directory | Listed (via Al Nakheel Mall page). |
| Eye of Riyadh directory | Listed (entry 2390). |
| Yandex Maps | Listed (Al Nakheel Mall organization 212320142200). |
| KSA Directory | Listed (entry 28 for Al Nakheel Mall). |
| Time Out Riyadh | Featured article about new Riyadh branches — strong press citation signal. |

---

## 5. Competitor Insights → Action Items for `goldpricesarabia.com`

This is **not a Maps SEO target for your site directly** (you're a global price tracker, not a retailer). But the audit reveals patterns to copy and gaps to exploit.

### Patterns to copy (what L'azurde does right)

1. **Multi-language URL structure** — `/en-sa`, `/ar-sa`, `/en-ae`, `/ar-ae`, `/en-eg`, `/ar-eg`. Six locale variants from the same domain. **Your site has 2 (`/`, `/en`).** Consider adding country sub-folders for the MENA markets you cover most (`/en-sa`, `/en-ae`, `/en-eg`) so each country's content can rank in country-specific Google indices. Hreflang would need updating.
2. **Sub-brand entity strategy** — they break out "Miss L'" / "Instyle" / "Waves" with separate store-locator pages. Your equivalent: separate landing pages per market segment (e.g., investors vs jewellery buyers vs traders) under distinct paths with unique entity schemas.
3. **Heavy press relationship cultivation** — Time Out Riyadh, Eye of Riyadh, Cenomi, Argaam, Yandex directories all carry L'azurde entries. **Your news section currently shows aggregated headlines only — you author 0-1 articles per month.** Cadence of named editorial + press outreach is the missing piece.
4. **Single corporate phone (920 prefix)** for all customer contact across stores — simplifies brand recall. You don't need this (no support model), but the principle of one canonical phone/contact applies to your Organization schema.

### Gaps L'azurde has (that you can avoid / surpass)

1. **JS-only store locator** — `lazurde.com/en-sa/store-locations` renders zero content to Googlebot. **You have an analogous risk:** your live price tables are partly JS-rendered (the SXO audit flagged this). Make sure server-rendered fallback HTML is genuinely in your prod responses — easy to verify via `curl https://goldpricesarabia.com/gold-price/21k | grep "SAR"` and confirming numbers appear.
2. **No LocalBusiness / Organization JSON-LD on homepage** — your site already emits Organization + WebSite + Service via `components/JsonLd.tsx`. **You're ahead of L'azurde here.** Push this lead by adding `FinancialService` + `Dataset` to your schema graph.
3. **Per-store NAP not in HTML** — every L'azurde Riyadh location relies on mall-directory listings rather than first-party HTML. You don't need stores, but you should ensure your `/methodology` and `/about` pages emit `Organization` with full HQ entity data in static HTML (already done via JsonLd component).
4. **Inconsistent country/locale framing** — L'azurde brand text varies between sites (en-sa says "Saudi Arabia", en-ae implicitly assumes UAE). Yours can do better by emitting `inLanguage` + `areaServed` consistently on every page.

---

## 6. Why a true Tier 1 audit would tell us much more

Tier 0 cannot answer these (which are the high-value local-SEO levers):

| Question | Requires |
|---|---|
| What is L'azurde Al Nakheel Mall's current Google rating + review count? | DataForSEO My Business Info |
| Are review velocity dips creating ranking risk (Sterling Sky 18-day rule)? | DataForSEO Reviews API + time-series |
| What is L'azurde's Share of Local Voice in Riyadh for "shop gold jewellery Riyadh"? | DataForSEO Maps SERP + geo-grid |
| Which competitors (jewellery retailers) dominate the Riyadh map for gold-related queries? | DataForSEO Maps SERP |
| How does L'azurde's review response rate compare to Damas / Joyalukkas / Tiffany Riyadh? | DataForSEO Reviews API |

If you install the DataForSEO extension and re-run `/seo maps grid "محلات ذهب الرياض" "Riyadh, Saudi Arabia"`, you get a 7×7 geo-grid heatmap of who actually owns the Riyadh gold-jewellery map — useful intel even though you don't compete in retail directly (the map results tell you which brands your audience already trusts).

---

## 7. Top 5 Prioritised Actions (for *your* site, derived from this benchmark)

1. **[HIGH]** Add proper `inLanguage` per page + `areaServed` countries to your existing `<JsonLd>` Organization block so MENA-country Google indices pick up the local relevance. (Already partially done — verify with Google Rich Results Test.)
2. **[HIGH]** Surface a static HTML "Coverage" footer block listing your 46 countries × currencies as a server-rendered list (some of this already in the Footer country grid). Google uses this as a local-presence signal.
3. **[MED]** Consider adding `/en-sa`, `/en-ae`, `/en-eg` locale variants for the highest-traffic country×karat permutations — mirrors L'azurde's pattern and unlocks country-specific Google indexing. Updates `i18n/routing.ts` + hreflang.
4. **[MED]** Publish one authored Arabic editorial article per month (the news article scaffold + AuthorByline component is already in place). Trade press (Argaam, Time Out, Asharq Business) is exactly how L'azurde maintains entity authority.
5. **[LOW]** Submit `goldpricesarabia.com` as an entity to: Argaam (financial data), Yandex Webmaster, Bing Places (even as a non-local "internet brand" listing). Adds entity-graph nodes Google's Knowledge Panel pulls from.

---

## 8. Limitations Disclaimer

- **Tier 0 only** — DataForSEO not installed, so no live rating/review/photo/geo-grid data was retrieved. All ratings/counts in this report would need Tier 1 to be verified.
- **JS-rendered targets blocked** — `top-rated.online`, `eyeofriyadh.com`, `bing.com/maps`, and `lazurde.com/en-sa/store-locations` returned 403/empty/JS-only payloads. Tier 1 (DataForSEO + Google Places API) bypasses these via direct API access.
- **Overpass OSM query** had a shell escape issue at Tier 0 — couldn't enumerate OSM Lazurde nodes. Recommend manual verification at openstreetmap.org for completeness.
- **`goldpricesarabia.com` is not itself a Maps SEO target** — this audit is a benchmark only. The site does not have a Google Business Profile (no physical storefront), so the Maps Health Score concept does not transfer 1:1.

---

## 9. Cross-Skill Suggestions

| Finding | Next skill to run |
|---|---|
| Schema enrichment (areaServed, FinancialService) | `/seo schema https://goldpricesarabia.com/` |
| On-page MENA targeting signals | `/seo local https://goldpricesarabia.com/saudi-arabia/gold-price/21k` |
| AI search visibility (LLM citation) | `/seo geo https://goldpricesarabia.com/` |
| Live SERP data for "محلات ذهب الرياض" | `/seo dataforseo google_maps_advanced "محلات ذهب الرياض" "Riyadh, Saudi Arabia"` (after DataForSEO install) |

---

**Report generated 2026-05-17 at Tier 0 (free). Re-run after DataForSEO install for Tier 1 metrics.**
