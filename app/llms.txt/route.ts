/**
 * /llms.txt — content map for LLM crawlers (GPTBot, ClaudeBot, PerplexityBot,
 * Google-Extended, etc.). Follows the llms.txt proposal:
 * https://llmstxt.org/
 *
 * Served as plain text with a long cache TTL.
 */
import { SITE_URL } from "@/lib/metadata";

const BODY = `# Gold Prices Arabia

> Live gold prices in real time across 46 countries and 40+ currencies. Tracks 24K, 21K, 18K and 14K gold per gram, ounce and kilogram. Free, accurate, updated every second from Binance, Coinbase and Kraken WebSockets.

## About

- Brand: Gold Prices Arabia (also: GoldPricesArabia, GPA, أسعار الذهب العربية)
- Domain: ${SITE_URL}
- Languages: Arabic (default, unprefixed URLs), English (/en/), French (/fr/), Turkish (/tr/), Urdu (/ur/), Hindi (/hi/) — every page exists at the same path under each prefix, e.g. ${SITE_URL}/jordan/gold-price/21k, ${SITE_URL}/en/jordan/gold-price/21k, ${SITE_URL}/fr/jordan/gold-price/21k
- Focus: Live spot gold (XAU/USD), silver (XAG), platinum (XPT), palladium (XPD); FX-converted retail karat prices; gold history; gold-silver ratio; precious-metal calculator
- Data sources: PAXG/USD WebSocket aggregation (Binance, Coinbase, Kraken) for gold; STOOQ + Yahoo Finance for silver/platinum/palladium; fawazahmed0/currency-api for FX
- Update cadence: Sub-second for gold spot; per-minute for other metals; daily for historical data
- Pricing: Free, ad-supported, no signup
- Audience: Investors, jewellers, traders across MENA + global markets

## Key pages (English)

- [Home / Live gold price](${SITE_URL}/en): Hero with live XAU/USD spot, all-metal strip, calculator
- [24K gold price](${SITE_URL}/en/gold-price/24k): 99.9% purity, per gram + per oz, 4 fiat currencies
- [22K gold price](${SITE_URL}/en/gold-price/22k): 91.7% purity, Gulf + South Asia jewellery standard
- [21K gold price](${SITE_URL}/en/gold-price/21k): 87.5% purity, dominant MENA karat
- [18K gold price](${SITE_URL}/en/gold-price/18k): 75% purity
- [14K gold price](${SITE_URL}/en/gold-price/14k): 58.3% purity
- [Live gold price](${SITE_URL}/en/live-gold-price): WebSocket streaming view
- [Spot gold](${SITE_URL}/en/spot-gold): XAU/USD spot, chart, bid/ask
- [Gold price chart](${SITE_URL}/en/gold-price-chart): Historical chart with multi-currency overlay
- [Gold price per gram](${SITE_URL}/en/gold-price-per-gram)
- [Gold price per ounce](${SITE_URL}/en/gold-price-per-ounce)
- [Gold price per kilo](${SITE_URL}/en/gold-price-per-kilo)
- [Gold price history 2000–2026](${SITE_URL}/en/historical-gold-prices): yearly open/close/high/low table + per-year pages since 2000
- [Historical gold prices 2026](${SITE_URL}/en/historical-gold-prices/2026)
- [Gold–silver ratio](${SITE_URL}/en/gold-silver-ratio)
- [Shanghai Gold Exchange](${SITE_URL}/en/shanghai-gold-exchange)
- [Gold calculator](${SITE_URL}/en/gold-calculator)
- [Best gold price](${SITE_URL}/en/best-gold-price): Country-by-country price comparison
- [Buy gold (USA, UK, Canada, Australia)](${SITE_URL}/en/buy-gold/usa): Coin + bar pricing
- [Precious metals](${SITE_URL}/en/precious-metals): Gold, silver, platinum, palladium
- [Cryptocurrency prices](${SITE_URL}/en/cryptocurrency): BTC, ETH, USDT, BNB, XRP, USDC, SOL, TRX, DOGE
- [News](${SITE_URL}/en/news): Gold-market news feed
- [Research](${SITE_URL}/en/research): Daily digest of the most-cited peer-reviewed studies on gold (inflation hedge, safe haven, price drivers, portfolio allocation) aggregated from arXiv, OpenAlex, Crossref and Semantic Scholar
- [Widgets](${SITE_URL}/en/widgets): Embeddable price widgets, chart-image embeds and the free JSON endpoint- [Methodology](${SITE_URL}/en/methodology): Exactly how every price is computed (sources, formulas, update cadence, limitations)
- [Founder / author](${SITE_URL}/en/about/sadeq): Sadeq Sayed Ahmad, who builds and reviews the site
- [Editorial standards](${SITE_URL}/en/editorial-standards): Corrections, sourcing and independence policy

## Country pages (all six languages)

Gold prices localised by country and karat at \`${SITE_URL}/{country-slug}/gold-price/{karat}\` (Arabic) and \`${SITE_URL}/{en|fr|tr|ur|hi}/{country-slug}/gold-price/{karat}\`. Coverage: Saudi Arabia, Jordan, UAE, Egypt, Qatar, Kuwait, Bahrain, USA, UK, Canada, Australia, Singapore, Switzerland, Japan, China, India, Pakistan, Turkey, Indonesia, Malaysia, Thailand, Vietnam, Philippines, Russia, Brazil, Mexico, Argentina, Colombia, Nigeria, South Korea, Hong Kong, Macau, Sweden, Norway, Denmark, Hungary, Myanmar, New Zealand, North Macedonia, Lebanon, Libya, Serbia, South Africa, and others — 46 countries total.

## Free data & media

- JSON spot + daily history: \`${SITE_URL}/api/spot?symbol=XAU&year=2026\` (CORS-open, no key)
- Chart images (PNG, 1200x630, branded, embeddable with attribution): \`${SITE_URL}/charts/gold/{currency}/{range}?lang={ar|en|fr|tr|ur|hi}&unit={oz|g}\` — range in 1m, 3m, 1y, 5y, 10y, max; currency any ISO code we cover (e.g. ${SITE_URL}/charts/gold/sar/1y?lang=ar)

## Sitemap

- ${SITE_URL}/sitemap.xml

## License & citation

Public, free-to-cite data. Attribution: "Gold Prices Arabia (${SITE_URL})". Prices are aggregated from third-party feeds and provided for informational use only — not financial advice. Always confirm with a licensed dealer before buying or selling.

## Contact

- General: support@goldpricesarabia.com
- Advertising: ads@goldpricesarabia.com
`;

export function GET() {
  return new Response(BODY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
