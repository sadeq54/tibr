import { pick } from "@/lib/i18n-text";

/** "21k" | "21K" | "21" → "21". */
export function karatNumber(karat: string): string {
  return karat.replace(/k$/i, "");
}

/**
 * Locale-native karat wording with a Latin numeral:
 * en "21K" · ar "عيار 21" · fr "21 carats" · tr "21 ayar" · ur "21 قیراط" · hi "21 कैरेट".
 *
 * Use this everywhere a karat is spelled out in running text, headings or
 * titles so every locale reads the way its own gold market writes it.
 */
export function karatLabel(locale: string, karat: string): string {
  const n = karatNumber(karat);
  return pick(locale, {
    en: `${n}K`,
    ar: `عيار ${n}`,
    fr: `${n} carats`,
    tr: `${n} ayar`,
    ur: `${n} قیراط`,
    hi: `${n} कैरेट`,
  });
}

const PURITY: Record<string, string> = {
  "24": "99.9%",
  "23": "96.5%",
  "22": "91.7%",
  "21": "87.5%",
  "18": "75%",
  "14": "58.3%",
};

/** "21k" → "87.5%". Unknown karats return an empty string. */
export function karatPurity(karat: string): string {
  return PURITY[karatNumber(karat)] ?? "";
}
