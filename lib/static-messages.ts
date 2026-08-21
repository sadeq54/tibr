import { routing, type AppLocale } from "@/i18n/routing";
import ar from "@/messages/ar.json";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import hi from "@/messages/hi.json";
import tr from "@/messages/tr.json";
import ur from "@/messages/ur.json";

/**
 * Synchronous message bundles for server components that cannot await
 * `getMessages()` — `"use cache"` / statically prerendered headers that call
 * `createTranslator` directly. All six files are static imports (traced into
 * the bundle once), and each non-English bundle is deep-merged over English so
 * a partial translation file still renders every key (falls back per key to
 * the English string instead of throwing MISSING_MESSAGE).
 *
 *   const t = createTranslator({ locale, namespace: "Page", messages: staticMessages(locale) });
 */
/**
 * Shape handed to `createTranslator`: namespace → key → message. Deeper
 * nesting exists at runtime (e.g. `Page.country.jordan`); typing it as two
 * levels keeps next-intl's key inference permissive (`t(anyString)`) instead
 * of collapsing every key to `never`, which is what `Record<string, unknown>`
 * does.
 */
export type StaticMessages = Record<string, Record<string, string>>;

const RAW: Record<AppLocale, Record<string, unknown>> = { ar, en, fr, tr, ur, hi };

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Recursive merge: every key in `base` survives unless `over` supplies a value. */
function deepMerge(base: Record<string, unknown>, over: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(over)) {
    const prev = out[key];
    out[key] = isPlainObject(prev) && isPlainObject(value) ? deepMerge(prev, value) : value;
  }
  return out;
}

const MERGED = new Map<string, StaticMessages>();

/** Messages for `locale` with English filling any gap. Unknown locale → English. */
export function staticMessages(locale: string): StaticMessages {
  const key = (routing.locales as readonly string[]).includes(locale) ? (locale as AppLocale) : "en";
  let merged = MERGED.get(key);
  if (!merged) {
    merged = (key === "en" ? RAW.en : deepMerge(RAW.en, RAW[key])) as StaticMessages;
    MERGED.set(key, merged);
  }
  return merged;
}
