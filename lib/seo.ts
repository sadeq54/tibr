/**
 * SEO helpers shared by price pages: query-leading titles that carry the live
 * price + today's date (the pattern every #1 result in the Arabic gold SERPs
 * uses), locale-aware currency names, and the canonical karat table.
 */
import { localeMeta } from "@/i18n/routing";
import type { GoldApiResponse } from "@/lib/goldapi";
import { localizedPriceDescription, localizedPriceTitle } from "@/lib/seo-titles";

export const OZ_G = 31.1034768;
export const KG_G = 1000;
export const TOLA_G = 11.6638038;
/** Egyptian gold pound (الجنيه الذهب): 8 g of 21K. */
export const GOLD_POUND_G = 8;

export type KaratKey = "24k" | "22k" | "21k" | "18k" | "14k";
export type GramField =
  | "price_gram_24k"
  | "price_gram_22k"
  | "price_gram_21k"
  | "price_gram_18k"
  | "price_gram_14k";

export const KARAT_DEFS: ReadonlyArray<{
  key: KaratKey;
  label: string;
  purity: number;
  pct: string;
  field: GramField;
}> = [
  { key: "24k", label: "24K", purity: 0.999, pct: "99.9%", field: "price_gram_24k" },
  { key: "22k", label: "22K", purity: 0.9167, pct: "91.7%", field: "price_gram_22k" },
  { key: "21k", label: "21K", purity: 0.875, pct: "87.5%", field: "price_gram_21k" },
  { key: "18k", label: "18K", purity: 0.75, pct: "75%", field: "price_gram_18k" },
  { key: "14k", label: "14K", purity: 0.583, pct: "58.3%", field: "price_gram_14k" },
];

export const VALID_KARAT_KEYS: readonly KaratKey[] = KARAT_DEFS.map((k) => k.key);

export function karatDef(karat: string) {
  return KARAT_DEFS.find((k) => k.key === karat.toLowerCase()) ?? null;
}

/** Per-gram price for a karat, from the spot snapshot (USD). */
export function gramUsd(spot: GoldApiResponse, karat: string): number {
  const def = karatDef(karat);
  if (!def) return 0;
  const direct = spot[def.field];
  if (typeof direct === "number" && direct > 0) return direct;
  return (spot.price / OZ_G) * def.purity;
}

/** Markets where the tola (11.66 g) is a customary retail unit. */
export const TOLA_MARKETS = new Set([
  "uae",
  "saudi-arabia",
  "qatar",
  "kuwait",
  "bahrain",
  "india",
  "pakistan",
  "singapore",
  "malaysia",
]);

/** Markets where the 8 g / 21K gold pound (الجنيه الذهب) is quoted daily. */
export const GOLD_POUND_MARKETS = new Set(["egypt"]);

// Formatters are memoised per BCP-47 tag — `Intl.DateTimeFormat` construction
// is expensive and these run on every price page render + OG image.
const DATE_FMT = new Map<string, Intl.DateTimeFormat>();
function dateFormatter(locale: string, withWeekday: boolean): Intl.DateTimeFormat {
  const tag = localeMeta(locale).intl;
  const key = `${tag}|${withWeekday ? "wd" : "d"}`;
  let fmt = DATE_FMT.get(key);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat(tag, {
      ...(withWeekday ? { weekday: "long" as const } : {}),
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    DATE_FMT.set(key, fmt);
  }
  return fmt;
}

const TIME_UTC = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "UTC",
  hour12: false,
});

/** "21 أغسطس 2026" / "21 August 2026" / "21 août 2026" — Latin digits everywhere. */
export function dateLabel(locale: string, d: Date, withWeekday = false): string {
  return dateFormatter(locale, withWeekday).format(d);
}

/** "14:05 UTC" — explicit zone so the stamp is honest for every market. */
export function timeLabelUtc(d: Date): string {
  return `${TIME_UTC.format(d)} UTC`;
}

const NAMES = new Map<string, Intl.DisplayNames>();
/**
 * "دينار أردني" / "Jordanian Dinar" / "dinar jordanien"; falls back to the ISO
 * code. English keeps the bare `en` tag on purpose: `en-GB` spells RUB
 * "Rouble", which would silently change live English titles.
 */
export function currencyName(code: string, locale: string): string {
  try {
    const tag = locale === "en" ? "en" : localeMeta(locale).intl;
    let dn = NAMES.get(tag);
    if (!dn) {
      dn = new Intl.DisplayNames(tag, { type: "currency" });
      NAMES.set(tag, dn);
    }
    return dn.of(code) ?? code;
  } catch {
    return code;
  }
}

export function fmtNum(n: number, frac = 2): string {
  if (!Number.isFinite(n) || n <= 0) return "—";
  return n.toLocaleString("en-US", { minimumFractionDigits: frac, maximumFractionDigits: frac });
}

/** Snapshot time from the spot payload — data-derived, so render stays pure. */
export function spotDate(spot: GoldApiResponse | null | undefined): Date | null {
  if (!spot?.timestamp) return null;
  const ms = spot.timestamp > 1e12 ? spot.timestamp : spot.timestamp * 1000;
  const d = new Date(ms);
  return Number.isFinite(d.getTime()) ? d : null;
}

type TitleInput = {
  locale: string;
  karat: string; // "21K"
  country?: string; // localized country name; omit for the global karat page
  currency: string; // ISO code
  gram: number | null; // per-gram price in `currency`
  date: Date | null;
};

/**
 * Query-leading title: "سعر الذهب اليوم في الأردن عيار 21: 83.92 دينار أردني للجرام | 21 أغسطس 2026".
 * Falls back gracefully when the live snapshot is unavailable.
 */
export function priceTitle(i: TitleInput): string {
  const k = i.karat.replace(/k$/i, "");
  const cur = currencyName(i.currency, i.locale);
  const date = i.date ? dateLabel(i.locale, i.date) : null;
  const native = localizedPriceTitle(i.locale, {
    k,
    country: i.country,
    cur,
    price: i.gram ? fmtNum(i.gram) : null,
    date,
  });
  if (native) return native;
  if (i.locale === "ar") {
    const head = i.country
      ? `سعر الذهب اليوم في ${i.country} عيار ${k}`
      : `سعر الذهب اليوم عيار ${k}`;
    const price = i.gram ? `: ${fmtNum(i.gram)} ${cur} للجرام` : "";
    const tail = date ? ` | ${date}` : " | تحديث لحظي";
    return `${head}${price}${tail}`;
  }
  const head = i.country
    ? `Gold Price Today in ${i.country} (${i.karat})`
    : `${i.karat} Gold Price Today`;
  const price = i.gram ? `: ${i.currency} ${fmtNum(i.gram)}/g` : "";
  const tail = date ? ` | ${date}` : " | Live";
  return `${head}${price}${tail}`;
}

export function priceDescription(i: TitleInput): string {
  const k = i.karat.replace(/k$/i, "");
  const cur = currencyName(i.currency, i.locale);
  const date = i.date ? dateLabel(i.locale, i.date, true) : null;
  const native = localizedPriceDescription(i.locale, {
    k,
    country: i.country,
    cur,
    price: i.gram ? fmtNum(i.gram) : null,
    date,
  });
  if (native) return native;
  if (i.locale === "ar") {
    const where = i.country ? ` في ${i.country}` : "";
    const price = i.gram ? `الجرام الآن ${fmtNum(i.gram)} ${cur}. ` : "";
    return (
      `سعر الذهب اليوم${where} عيار ${k}: ${price}` +
      `أسعار عيار 24 و22 و21 و18 و14 للجرام والأونصة والكيلو، شراء وبيع، ` +
      `تحديث لحظي من Binance وCoinbase وKraken` +
      (date ? ` (${date}).` : ".")
    );
  }
  const where = i.country ? ` in ${i.country}` : "";
  const price = i.gram ? `${i.currency} ${fmtNum(i.gram)} per gram right now. ` : "";
  return (
    `${i.karat} gold price today${where} in ${cur}: ${price}` +
    `24K, 22K, 21K, 18K and 14K per gram, ounce and kilo with bid/ask, ` +
    `streamed live from Binance, Coinbase and Kraken` +
    (date ? ` (${date}).` : ".")
  );
}
