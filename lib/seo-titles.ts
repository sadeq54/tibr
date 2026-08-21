/**
 * Query-leading <title> / description templates for the non-Arabic, non-English
 * locales. Arabic and English live in `lib/seo.ts` and are SEO-tuned — they
 * must not change; these mirror their structure in each language's native
 * search phrasing ("cours de l'or aujourd'hui", "bugün altın fiyatı",
 * "آج سونے کی قیمت", "सोने का भाव आज"). Exchange names stay untranslated.
 */

export type TitleParts = {
  /** Karat number, e.g. "21". */
  k: string;
  /** Localized country name; undefined on the global karat page. */
  country?: string;
  /** Localized currency name (Intl.DisplayNames). */
  cur: string;
  /** Formatted per-gram price, or null when the live snapshot is unavailable. */
  price: string | null;
  /** Localized date (weekday variant for descriptions), or null. */
  date: string | null;
};

type Template = {
  title: (p: TitleParts) => string;
  description: (p: TitleParts) => string;
};

const TEMPLATES: Record<string, Template> = {
  fr: {
    title: ({ k, country, cur, price, date }) => {
      const head = country
        ? `Prix de l'or aujourd'hui en ${country} (${k} carats)`
        : `Prix de l'or ${k} carats aujourd'hui`;
      const p = price ? ` : ${price} ${cur}/g` : "";
      return `${head}${p}${date ? ` | ${date}` : " | En direct"}`;
    },
    description: ({ k, country, cur, price, date }) => {
      const where = country ? ` en ${country}` : "";
      const p = price ? `${price} ${cur} le gramme actuellement. ` : "";
      return (
        `Prix de l'or ${k} carats aujourd'hui${where} en ${cur} : ${p}` +
        `24, 22, 21, 18 et 14 carats au gramme, à l'once et au kilo avec cours acheteur/vendeur, ` +
        `diffusés en direct depuis Binance, Coinbase et Kraken` +
        (date ? ` (${date}).` : ".")
      );
    },
  },
  tr: {
    title: ({ k, country, cur, price, date }) => {
      const head = country
        ? `Bugün ${country} altın fiyatı (${k} ayar)`
        : `Bugün ${k} ayar altın fiyatı`;
      const p = price ? `: ${price} ${cur}/gram` : "";
      return `${head}${p}${date ? ` | ${date}` : " | Canlı"}`;
    },
    description: ({ k, country, cur, price, date }) => {
      const where = country ? ` ${country}` : "";
      const p = price ? `şu an gram başına ${price} ${cur}. ` : "";
      return (
        `Bugün${where} ${k} ayar altın fiyatı (${cur}): ${p}` +
        `24, 22, 21, 18 ve 14 ayar gram, ons ve kilo fiyatları, alış/satış ile birlikte, ` +
        `Binance, Coinbase ve Kraken'den canlı` +
        (date ? ` (${date}).` : ".")
      );
    },
  },
  ur: {
    title: ({ k, country, cur, price, date }) => {
      const head = country
        ? `آج ${country} میں سونے کی قیمت ${k} قیراط`
        : `آج سونے کی قیمت ${k} قیراط`;
      const p = price ? `: ${price} ${cur} فی گرام` : "";
      return `${head}${p}${date ? ` | ${date}` : " | براہ راست"}`;
    },
    description: ({ k, country, cur, price, date }) => {
      const where = country ? ` ${country} میں` : "";
      const p = price ? `اس وقت ${price} ${cur} فی گرام۔ ` : "";
      return (
        `آج${where} سونے کی قیمت ${k} قیراط (${cur}): ${p}` +
        `24، 22، 21، 18 اور 14 قیراط فی گرام، فی اونس اور فی کلو، خرید/فروخت کے ساتھ، ` +
        `Binance، Coinbase اور Kraken سے براہ راست` +
        (date ? ` (${date})۔` : "۔")
      );
    },
  },
  hi: {
    title: ({ k, country, cur, price, date }) => {
      const head = country
        ? `आज ${country} में सोने का भाव (${k} कैरेट)`
        : `आज ${k} कैरेट सोने का भाव`;
      const p = price ? `: ${price} ${cur}/ग्राम` : "";
      return `${head}${p}${date ? ` | ${date}` : " | लाइव"}`;
    },
    description: ({ k, country, cur, price, date }) => {
      const where = country ? ` ${country} में` : "";
      const p = price ? `अभी ${price} ${cur} प्रति ग्राम। ` : "";
      return (
        `आज${where} ${k} कैरेट सोने का भाव (${cur}): ${p}` +
        `24, 22, 21, 18 और 14 कैरेट प्रति ग्राम, औंस और किलो, खरीद/बिक्री भाव सहित, ` +
        `Binance, Coinbase और Kraken से लाइव` +
        (date ? ` (${date})।` : "।")
      );
    },
  },
};

/** Native title for fr/tr/ur/hi; `null` for locales handled in `lib/seo.ts`. */
export function localizedPriceTitle(locale: string, p: TitleParts): string | null {
  return TEMPLATES[locale]?.title(p) ?? null;
}

export function localizedPriceDescription(locale: string, p: TitleParts): string | null {
  return TEMPLATES[locale]?.description(p) ?? null;
}
