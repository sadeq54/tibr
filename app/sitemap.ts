import type { MetadataRoute } from "next";

import { COUNTRIES as COUNTRY_DATA } from "@/lib/countries";
import { CRYPTO_LIST } from "@/lib/crypto";

const KARATS = ["24k", "21k", "18k", "14k"];
const COUNTRIES = COUNTRY_DATA.map((c) => c.slug);
const YEARS = [2024, 2025, 2026];

const STATIC_PAGES = [
  "spot-gold",
  "live-gold-price",
  "gold-price-chart",
  "gold-price-per-ounce",
  "gold-price-per-gram",
  "gold-price-per-kilo",
  "gold-silver-ratio",
  "shanghai-gold-exchange",
  "gold-calculator",
  "widgets",
  "precious-metals",
  "cryptocurrency",
  "best-gold-price",
  "news",
];

const METALS = ["gold", "silver", "platinum", "palladium"];
const BEST_PRICE_COUNTRIES = ["usa", "canada", "singapore", "switzerland", "uk"];
const BUY_COUNTRIES = ["usa", "uk", "canada", "australia"];
const BUY_TYPES = ["coins", "small-coins", "bars"];

function dual(path: string, freq: "hourly" | "daily" = "hourly", priority = 0.7) {
  return [
    { path: `/${path}`, freq, priority },
    { path: `/en/${path}`, freq, priority },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://goldpricesarabia.com";
  const now = new Date();

  const out: Array<{ path: string; freq: "hourly" | "daily"; priority: number }> = [
    { path: "/", freq: "hourly", priority: 1.0 },
    { path: "/en", freq: "hourly", priority: 1.0 },
  ];

  // Karats (locale-prefixed)
  for (const k of KARATS) out.push(...dual(`gold-price/${k}`, "hourly", 0.9));

  // Countries × Karats
  for (const c of COUNTRIES)
    for (const k of KARATS) out.push(...dual(`${c}/gold-price/${k}`, "hourly", 0.85));

  // Static pages
  for (const p of STATIC_PAGES) out.push(...dual(p, "hourly", 0.8));

  // Precious metals × type
  for (const m of METALS) out.push(...dual(`precious-metals/${m}`, "hourly", 0.8));

  // Crypto coins
  for (const c of CRYPTO_LIST) out.push(...dual(`cryptocurrency/${c.slug}`, "hourly", 0.7));

  // Best gold price by country
  for (const c of BEST_PRICE_COUNTRIES) out.push(...dual(`best-gold-price/${c}`, "hourly", 0.75));

  // Buy gold by country (+ types)
  for (const c of BUY_COUNTRIES) {
    out.push(...dual(`buy-gold/${c}`, "hourly", 0.75));
    for (const t of BUY_TYPES) out.push(...dual(`buy-gold/${c}/${t}`, "hourly", 0.7));
  }

  // Historical
  for (const y of YEARS) out.push(...dual(`historical-gold-prices/${y}`, "daily", 0.7));

  return out.map(({ path, freq, priority }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
