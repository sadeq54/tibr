/**
 * Route validation for the middleware.
 *
 * Why this exists: with `cacheComponents` (PPR) Next serves a prerendered
 * shell — status 200 — before the page body can call `notFound()`, and Next 16
 * forbids `dynamicParams = false` alongside `cacheComponents`. So
 * `/en/lebanon/gold-price/21k-1` used to return **200** with a real-looking
 * title ("Gold Price Today in Lebanon (21K-1)") and a self-canonical: an
 * unbounded soft-404 factory (47 of them in Search Console, plus 72
 * "crawled – currently not indexed"). The only layer that can still choose the
 * status is the middleware, so unknown segments are rejected there.
 *
 * Keep the lists below in sync with each route's `generateStaticParams`.
 * Deliberately dependency-free: this is bundled into the edge middleware.
 */
import { COUNTRIES } from "@/lib/countries";

const COUNTRY_SLUGS = new Set(COUNTRIES.map((c) => c.slug));
const KARATS = new Set(["24k", "22k", "21k", "18k", "14k"]);
const METALS = new Set(["gold", "silver", "platinum", "palladium"]);
const CRYPTO = new Set([
  "bitcoin", "ethereum", "tether", "binancecoin", "ripple", "usd-coin", "solana", "tron", "dogecoin",
]);
/**
 * Every `/news/{slug}`. Hand-maintained rather than imported from
 * `content/news/*` on purpose: this module is bundled into the edge
 * middleware, and importing the articles would pull every article body
 * (~100 KB of markdown) into that bundle.
 *
 * ADD A SLUG HERE WHENEVER YOU ADD AN ARTICLE. Forgetting is silent and
 * ugly: the article still renders in the /news index and still goes into
 * the sitemap, but the middleware rejects the URL, so every link to it —
 * internal, Google's, a reader's — returns 404. That is exactly what
 * happened to the six guides below before this line was updated.
 */
const NEWS = new Set([
  "saudi-gold-21k-may-2026-overview",
  "spot-gold-vs-retail-jeweller-spread",
  "ramadan-eid-2026-gold-demand-cycle",
  "egypt-18k-vs-21k-gold-shift",
  "5-home-tests-to-spot-fake-gold",
  "silver-platinum-palladium-investment-comparison",
  "making-charges-explained",
  "two-exchange-rates-gold-price",
  "reading-a-gold-hallmark",
  "selling-gold-back-what-you-actually-get",
  "why-neighbouring-countries-differ",
  "18k-or-21k-for-daily-wear",
]);
const BUY_GOLD_COUNTRIES = new Set(["usa", "uk", "canada", "australia", "saudi-arabia", "uae", "egypt", "morocco"]);
const BUY_GOLD_TYPES = new Set(["coins", "small-coins", "bars"]);
const BEST_PRICE_COUNTRIES = new Set(["usa", "canada", "singapore", "switzerland", "uk"]);
const FIRST_YEAR = 2000;
const LAST_YEAR = 2026;

const isYear = (s: string) => /^\d{4}$/.test(s) && +s >= FIRST_YEAR && +s <= LAST_YEAR;

/**
 * `false` only when the path matches one of our dynamic route shapes with an
 * unknown value. Anything else (static pages, assets, unknown top-level paths)
 * returns `true` and is left to Next's own routing.
 *
 * `segments` must already have the locale prefix stripped.
 */
export function isKnownDynamicRoute(segments: readonly string[]): boolean {
  const [a, b, c] = segments;
  if (!a) return true;

  // /{country}/gold-price/{karat}
  if (segments.length === 3 && b === "gold-price") {
    return COUNTRY_SLUGS.has(a) && KARATS.has(c);
  }
  // /gold-price/{karat}
  if (a === "gold-price" && segments.length === 2) return KARATS.has(b);
  // /historical-gold-prices/{year}
  if (a === "historical-gold-prices" && segments.length === 2) return isYear(b);
  // /precious-metals/{metal}
  if (a === "precious-metals" && segments.length === 2) return METALS.has(b);
  // /cryptocurrency/{coin}
  if (a === "cryptocurrency" && segments.length === 2) return CRYPTO.has(b);
  // /news/{slug}
  if (a === "news" && segments.length === 2) return NEWS.has(b);
  // /buy-gold/{country}[/{type}]
  if (a === "buy-gold" && segments.length === 2) return BUY_GOLD_COUNTRIES.has(b);
  if (a === "buy-gold" && segments.length === 3) {
    return BUY_GOLD_COUNTRIES.has(b) && BUY_GOLD_TYPES.has(c);
  }
  // /best-gold-price/{country}
  if (a === "best-gold-price" && segments.length === 2) return BEST_PRICE_COUNTRIES.has(b);

  return true;
}
