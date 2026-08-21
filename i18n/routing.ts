import { defineRouting } from "next-intl/routing";

/**
 * Site locales. Arabic is the unprefixed default (`/jordan/...`), every other
 * locale is prefixed (`/en/...`, `/fr/...`). Keep this list in sync with
 * `messages/<locale>.json` — `i18n/request.ts` imports by locale name.
 */
export const routing = defineRouting({
  locales: ["ar", "en", "fr", "tr", "ur", "hi"],
  defaultLocale: "ar",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];

/**
 * Locales prerendered at build time. The rest are rendered on first request
 * and cached (same routes, same data) — keeps the Netlify build well under
 * its time limit while still serving every locale from the same templates.
 */
export const STATIC_LOCALES: readonly AppLocale[] = ["ar", "en"];

export const RTL_LOCALES: readonly string[] = ["ar", "ur"];
export const isRtl = (locale: string) => RTL_LOCALES.includes(locale);

/**
 * Per-locale presentation facts. `intl` is the BCP-47 tag used for
 * Intl.DateTimeFormat / DisplayNames (Latin digits forced where the default
 * would be Arabic-Indic or Devanagari digits — prices must stay machine
 * readable and consistent with the rest of the page). `og` is the Open Graph
 * locale, `hreflang` the value emitted in `<link rel="alternate">`.
 */
export const LOCALE_META = {
  ar: { name: "العربية", english: "Arabic", dir: "rtl", og: "ar_SA", intl: "ar-EG-u-nu-latn-ca-gregory", hreflang: "ar" },
  en: { name: "English", english: "English", dir: "ltr", og: "en_US", intl: "en-GB", hreflang: "en" },
  fr: { name: "Français", english: "French", dir: "ltr", og: "fr_FR", intl: "fr-FR", hreflang: "fr" },
  tr: { name: "Türkçe", english: "Turkish", dir: "ltr", og: "tr_TR", intl: "tr-TR", hreflang: "tr" },
  ur: { name: "اردو", english: "Urdu", dir: "rtl", og: "ur_PK", intl: "ur-PK-u-nu-latn", hreflang: "ur" },
  hi: { name: "हिन्दी", english: "Hindi", dir: "ltr", og: "hi_IN", intl: "hi-IN-u-nu-latn", hreflang: "hi" },
} as const satisfies Record<AppLocale, { name: string; english: string; dir: "rtl" | "ltr"; og: string; intl: string; hreflang: string }>;

export function localeMeta(locale: string) {
  return LOCALE_META[(locale in LOCALE_META ? locale : "en") as AppLocale];
}
