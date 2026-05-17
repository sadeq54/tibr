// Server-only cached wrappers around upstream data fetchers.
//
// Kept in a dedicated file so client components that value-import constants
// from lib/goldapi.ts (e.g. MetalsStrip → METAL_META) don't get poisoned by
// the `next/cache` import. Pages import from here; client components keep
// importing types/values from the original libs.
import "server-only";
import { cacheLife } from "next/cache";

import { fetchFxRates, type FxRates } from "./fx";
import {
  fetchMetals,
  fetchSpot,
  type GoldApiResponse,
  type MetalsBundle,
} from "./goldapi";
import { fetchAllHistory, type HistoryRange, type MetalHistory } from "./history";

// Spot/metals — revalidate >= 300s qualifies for static prerender shell on
// serverless platforms (Netlify lambdas) where in-memory cache doesn't
// persist across instances. Live values are overlaid client-side via WebSocket.
export async function getCachedMetals(): Promise<MetalsBundle> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 300, expire: 1800 });
  return fetchMetals();
}

export async function getCachedSpot(
  metal: "XAU" | "XAG" | "XPT" | "XPD" = "XAU"
): Promise<GoldApiResponse | null> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 300, expire: 1800 });
  return fetchSpot(metal);
}

// FX rates change once per day from upstream — long cache safe.
export async function getCachedFxRates(): Promise<FxRates> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 21600 });
  return fetchFxRates();
}

// Daily OHLC history — long cache safe.
export async function getCachedAllHistory(
  range: HistoryRange = "1y"
): Promise<MetalHistory> {
  "use cache";
  cacheLife({ stale: 600, revalidate: 3600, expire: 21600 });
  return fetchAllHistory(range);
}
