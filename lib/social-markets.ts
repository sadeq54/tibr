import { COUNTRY_BY_SLUG } from "@/lib/countries";

/**
 * The 19 markets in the daily Instagram carousel.
 *
 * The mobile app allows 20 slides, so the carousel is 1 cover + 19 country
 * cards. Instagram *web* only takes 10 — see SLIDE_LIMITS below.
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

/**
 * Slides a carousel holds — and the number differs by where you upload from:
 *
 *   - **Instagram mobile app: 20.** Cover + all 19 markets.
 *   - **Instagram web: 10.** Verified 2026-08-23 — hand the web uploader 20
 *     files and it keeps the first 10 and discards the rest with no error, and
 *     at 10 the composer stops exposing any add-more control or file input.
 *
 * So a 20-slide carousel has to be posted from the phone. Generate all 20
 * anyway: the files are the same either way, and the app is the target.
 */
export const SLIDE_LIMITS = { web: 10, app: 20 } as const;
export type UploadTarget = keyof typeof SLIDE_LIMITS;

/** Kept as the generator's default — the app limit, which is the full set. */
export const MAX_CAROUSEL_SLIDES = SLIDE_LIMITS.app;

/** Validate a comma-separated slug list, falling back to the default set. */
export function resolveMarkets(raw: string | null | undefined): string[] {
  const list = (raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s && COUNTRY_BY_SLUG[s]);
  const markets = list.length ? list : [...CAROUSEL_MARKETS];
  return markets.slice(0, MAX_CAROUSEL_SLIDES - 1);
}
