/**
 * Inline multilingual text for strings that live next to the code that uses
 * them (page intros, FAQ answers, table captions) instead of in
 * `messages/*.json`. English is the required fallback; any locale without its
 * own string renders English rather than breaking.
 *
 *   const title = pick(locale, { en: "Gold price", ar: "سعر الذهب", fr: "Prix de l'or" });
 */
export type LocaleText = {
  en: string;
  ar?: string;
  fr?: string;
  tr?: string;
  ur?: string;
  hi?: string;
};

export type LocaleKey = keyof LocaleText;

export function pick(locale: string, text: LocaleText): string {
  const key = locale as LocaleKey;
  return text[key] ?? text.en;
}

/** Same as `pick` for arrays (FAQ lists, bullet lists). */
export function pickList<T>(locale: string, lists: { en: T[] } & Partial<Record<LocaleKey, T[]>>): T[] {
  return lists[locale as LocaleKey] ?? lists.en;
}
