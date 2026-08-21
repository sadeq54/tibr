import { localeMeta } from "@/i18n/routing";

/**
 * Localized country names for locales that have no hand-written column in
 * `COUNTRIES` (everything except `ar` / `en`). Backed by `Intl.DisplayNames`
 * (CLDR region names, shipped with Node's full ICU) with a small override
 * table for the codes CLDR renders in a form that is wrong for a price page:
 * "European Union" for our euro-area aggregate, the long official forms of
 * the US / UK / UAE, and the "Chinese SAR" suffixes on Hong Kong and Macau.
 */
const OVERRIDES: Record<string, Partial<Record<string, string>>> = {
  EU: { fr: "Europe", tr: "Avrupa", ur: "یورپ", hi: "यूरोप" },
  US: { fr: "États-Unis", tr: "ABD", ur: "امریکہ", hi: "अमेरिका" },
  GB: { fr: "Royaume-Uni", tr: "Birleşik Krallık", ur: "برطانیہ", hi: "यूनाइटेड किंगडम" },
  AE: { fr: "Émirats arabes unis", tr: "BAE", ur: "متحدہ عرب امارات", hi: "संयुक्त अरब अमीरात" },
  HK: { fr: "Hong Kong", tr: "Hong Kong", ur: "ہانگ کانگ", hi: "हाँग काँग" },
  MO: { fr: "Macao", tr: "Makao", ur: "مکاؤ", hi: "मकाऊ" },
};

const DISPLAY_NAMES = new Map<string, Intl.DisplayNames | null>();

function regionNames(locale: string): Intl.DisplayNames | null {
  const tag = localeMeta(locale).intl;
  let dn = DISPLAY_NAMES.get(tag);
  if (dn === undefined) {
    try {
      dn = new Intl.DisplayNames([tag], { type: "region", fallback: "none" });
    } catch {
      dn = null;
    }
    DISPLAY_NAMES.set(tag, dn);
  }
  return dn;
}

/**
 * CLDR / override name for an ISO-3166 alpha-2 code in `locale`, or `null`
 * when neither source knows it (caller falls back to `name_en`).
 */
export function localizedRegionName(cc: string, locale: string): string | null {
  const override = OVERRIDES[cc]?.[locale];
  if (override) return override;
  try {
    return regionNames(locale)?.of(cc) ?? null;
  } catch {
    return null;
  }
}
