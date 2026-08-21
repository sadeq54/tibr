import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { isRtl } from "@/i18n/routing";
import { SITE_URL } from "@/lib/metadata";

/**
 * Font bytes for `next/og` (Satori). Without an explicit font Satori
 * auto-fetches a fallback whose GSUB tables it cannot parse and the whole
 * image render 500s on any Arabic glyph.
 *
 * Read from disk first (the literal `process.cwd()` join is picked up by
 * Next's output file tracing, so the TTFs ship inside the serverless bundle);
 * fall back to fetching the same file from our own origin.
 *
 * - `ArabicSemiBold.ttf`     — IBM Plex Sans Arabic 600: Arabic, Urdu, Latin, digits.
 * - `DevanagariSemiBold.ttf` — Noto Sans Devanagari 600 (static instance): Hindi.
 */
const cache = new Map<string, Promise<ArrayBuffer>>();

function loadFontFile(file: string): Promise<ArrayBuffer> {
  let p = cache.get(file);
  if (!p) {
    p = readFile(join(process.cwd(), "public", "fonts", file))
      .then((b) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer)
      .catch(async () => {
        const r = await fetch(`${SITE_URL}/fonts/${file}`);
        if (!r.ok) throw new Error(`font fetch failed: ${r.status}`);
        return r.arrayBuffer();
      });
    cache.set(file, p);
  }
  return p;
}

export function loadArabicFont(): Promise<ArrayBuffer> {
  return loadFontFile("ArabicSemiBold.ttf");
}

export function loadDevanagariFont(): Promise<ArrayBuffer> {
  return loadFontFile("DevanagariSemiBold.ttf");
}

export type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 600;
  style: "normal";
};

/** `fontFamily` value to pair with `loadFontsFor()` — lists every loaded face. */
export const OG_FONT_FAMILY = "ArabicSans, Devanagari, system-ui, sans-serif";

/**
 * Satori `fonts` array for a locale. ArabicSans is always first: it carries
 * Latin + digits, so en/fr/tr render from it alone and ar/ur get shaped Arabic
 * script. Hindi adds Noto Sans Devanagari; Satori falls through the family
 * list per glyph, so mixed Devanagari + Latin lines render correctly.
 */
export async function loadFontsFor(locale: string): Promise<OgFont[]> {
  const fonts: OgFont[] = [
    { name: "ArabicSans", data: await loadArabicFont(), weight: 600, style: "normal" },
  ];
  if (locale === "hi") {
    fonts.push({ name: "Devanagari", data: await loadDevanagariFont(), weight: 600, style: "normal" });
  }
  return fonts;
}

/**
 * Satori shapes Arabic-script glyphs correctly inside a word but places words
 * in logical (left-to-right) order and ignores `direction`. Reversing the
 * token order makes the LTR placement read correctly right-to-left;
 * Latin/number tokens stay intact because they are reversed as whole tokens.
 * Pass the locale (or a boolean) — enabled for every RTL locale (ar, ur).
 */
const RTL_CHARS = /[֐-ࣿיִ-﷿ﹰ-﻿]/;

export function rtlWords(text: string, enabled: boolean | string = true): string {
  const on = typeof enabled === "string" ? isRtl(enabled) : enabled;
  // Pure-Latin strings (brand, URLs, source names) keep their order even on
  // RTL cards — Satori already lays them out correctly.
  if (!on || !RTL_CHARS.test(text)) return text;
  return text.split(/\s+/).filter(Boolean).reverse().join(" ");
}
