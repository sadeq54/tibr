import { COUNTRY_BY_SLUG } from "@/lib/countries";

/**
 * The 19 markets in the daily Instagram carousel.
 *
 * Instagram allows 20 slides, so the carousel is 1 cover + 19 country cards.
 * Order matters — it is the swipe order: Gulf first (the core audience), then
 * Levant/North Africa, then the big diaspora markets, then the West.
 * Malaysia is in because Search Console shows it already ranking for us
 * ("سعر الذهب اليوم في ماليزيا", ~190 impressions/28d at position 9.1).
 *
 * Shared by the cover route and `scripts/social-daily.mjs` so the names printed
 * on the cover can never drift from the cards that follow it.
 */
export const CAROUSEL_MARKETS: readonly string[] = [
  "saudi-arabia",
  "uae",
  "egypt",
  "jordan",
  "kuwait",
  "qatar",
  "bahrain",
  "lebanon",
  "morocco",
  "libya",
  "turkey",
  "india",
  "pakistan",
  "malaysia",
  "usa",
  "uk",
  "europe",
  "canada",
  "australia",
];

/** Max slides Instagram accepts in one carousel (cover + 19 markets). */
export const MAX_CAROUSEL_SLIDES = 20;

/** Validate a comma-separated slug list, falling back to the default set. */
export function resolveMarkets(raw: string | null | undefined): string[] {
  const list = (raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s && COUNTRY_BY_SLUG[s]);
  const markets = list.length ? list : [...CAROUSEL_MARKETS];
  return markets.slice(0, MAX_CAROUSEL_SLIDES - 1);
}
