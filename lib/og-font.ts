import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { SITE_URL } from "@/lib/metadata";

/**
 * Arabic-capable font bytes for `next/og` (Satori). Without an explicit font
 * Satori auto-fetches a fallback whose GSUB tables it cannot parse and the
 * whole image render 500s on any Arabic glyph.
 *
 * Read from disk first (the literal `process.cwd()` join is picked up by
 * Next's output file tracing, so the TTF ships inside the serverless bundle);
 * fall back to fetching the same file from our own origin.
 */
let cached: Promise<ArrayBuffer> | null = null;

export function loadArabicFont(): Promise<ArrayBuffer> {
  cached ??= readFile(join(process.cwd(), "public", "fonts", "ArabicSemiBold.ttf"))
    .then((b) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer)
    .catch(async () => {
      const r = await fetch(`${SITE_URL}/fonts/ArabicSemiBold.ttf`);
      if (!r.ok) throw new Error(`font fetch failed: ${r.status}`);
      return r.arrayBuffer();
    });
  return cached;
}

/**
 * Satori shapes Arabic glyphs correctly inside a word but places words in
 * logical (left-to-right) order and ignores `direction`. Reversing the token
 * order makes the LTR placement read correctly right-to-left; Latin/number
 * tokens stay intact because they are reversed as whole tokens.
 */
export function rtlWords(text: string, enabled = true): string {
  if (!enabled) return text;
  return text.split(" ").filter(Boolean).reverse().join(" ");
}
