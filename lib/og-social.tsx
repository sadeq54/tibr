import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared pieces for the social cards (`/social/...`).
 *
 * The important one is `Words`. Satori has no bidi support — `direction: rtl`
 * is ignored (verified), so Arabic renders in logical order, which is wrong.
 * The first version worked around that by reversing the words inside a string,
 * but then spacing came from Satori's own inconsistent word advance.
 *
 * `Words` instead renders each word as its own flex child in a `row-reverse`
 * container: reading order becomes real layout, and spacing is an explicit
 * margin we control. Arabic shaping is per-word, so splitting on whitespace
 * never breaks a ligature.
 *
 * What margins cannot fix: Arabic finals carry long left-sweeping tails (ي, ر)
 * that overhang the next word. Phrases like "في هذا" therefore read as one word
 * at any spacing — the fix there is wording, not layout.
 */
export const CARD_BG = "#0b0a08";
export const CARD_GOLD = "#e2b54e";
export const CARD_TEXT = "#f4efe4";
export const CARD_MUTED = "#b9b2a1";
export const CARD_DIM = "#8f8875";
export const CARD_UP = "#22c55e";
export const CARD_DOWN = "#ef4444";

/** Accent per day-of-year: the profile grid becomes a colour mosaic. */
export const CARD_ACCENTS = [
  { glow: "#7c4a12", chip: "#f0b754" },
  { glow: "#0f4c4a", chip: "#4fd1c5" },
  { glow: "#4a4a12", chip: "#d9d264" },
  { glow: "#5c1030", chip: "#f472b6" },
  { glow: "#2d1b5e", chip: "#a78bfa" },
  { glow: "#0f3d20", chip: "#4ade80" },
  { glow: "#12324f", chip: "#60a5fa" },
];

export function pickAccent(when: Date, themeParam: number) {
  const day = Math.floor(when.getTime() / 86_400_000);
  const i = Number.isFinite(themeParam) && themeParam >= 0 ? themeParam : day;
  return CARD_ACCENTS[i % CARD_ACCENTS.length];
}

/**
 * Optical word spacing for Arabic.
 *
 * In a `row-reverse` line, a word's *left* edge is its final letter, and that
 * is what faces the next word. Arabic finals differ enormously there:
 *
 *   - **ب ن ي س ش ل ط** carry a wide left side bearing inside their own glyph
 *     advance, so an equal margin reads as a hole after them.
 *   - **ا د ذ ر ز و ة ه** stop dead at the baseline with no tail, so an equal
 *     margin reads as a collision — this is why "أسعار الذهب" looked glued.
 *
 * Scaling each word's left margin by its final letter is what a typesetter does
 * by eye. It is not kerning (Satori cannot kern), and it has a floor: the space
 * baked into a glyph's own advance survives a margin of zero. Verified — after
 * final ب the gap is identical at margin 0 and at margin 0.38em, which is why
 * the cover headline drops "اليوم" onto the date line instead of fighting it.
 */
const WIDE_FINALS = new Set([..."بنيسشلطظصضتثكکقفعغمحجخئ"]);
const TIGHT_FINALS = new Set([..."ادذرزوةهىأإآؤ"]);

const ARABIC = /[؀-ۿ]/;

function opticalFactor(word: string, next: string | undefined, rtl: boolean): number {
  if (!rtl || !word) return 1;
  // Only compensate against another Arabic word. A number or a Latin token has
  // even bearings, and shrinking the margin before one glued "أغسطس" to "2026".
  if (!next || !ARABIC.test(next)) return 1;
  const last = word[word.length - 1];
  if (WIDE_FINALS.has(last)) return 0.5;
  if (TIGHT_FINALS.has(last)) return 1.45;
  return 1;
}

/** One text line laid out word by word, in true reading order. */
export function Words({
  text,
  rtl,
  size,
  gap,
  color,
  weight,
  wrap = false,
  justify = "center",
}: {
  text: string;
  rtl: boolean;
  size: number;
  /** Total space between words. Defaults to 22% of the font size. */
  gap?: number;
  color?: string;
  weight?: number;
  wrap?: boolean;
  justify?: "center" | "flex-start" | "flex-end" | "space-between";
}) {
  const words = text.split(/\s+/).filter(Boolean);
  // Spacing goes on the words as margins, never `gap`: Satori silently drops
  // `gap`/`columnGap` here, which is what left "في هذا" colliding while wide
  // words looked far apart — the only separation was glyph side-bearing.
  //
  // The ratio tightens as the type grows. Word space is optical, not linear:
  // 0.22em is right for a 24px chip label but gapes at a 68px headline, where
  // the same proportion put ~30px between "الذهب" and "اليوم" and made the
  // headline read as three separate words rather than one phrase.
  const ratio = size <= 28 ? 0.22 : size <= 48 ? 0.16 : 0.12;
  const half = Math.round((gap ?? size * ratio) / 2);
  // An explicit `undefined` style value makes Satori throw
  // ("Cannot read properties of undefined (reading 'trim')").
  return (
    <div
      style={{
        display: "flex",
        flexDirection: rtl ? "row-reverse" : "row",
        flexWrap: wrap ? "wrap" : "nowrap",
        justifyContent: justify,
        alignItems: "baseline",
        fontSize: size,
        lineHeight: 1.15,
        ...(color ? { color } : {}),
        ...(weight ? { fontWeight: weight } : {}),
      }}
    >
      {words.map((word, i) => (
        <div
          key={`${word}-${i}`}
          style={{
            display: "flex",
            // Left margin carries the optical adjustment: in row-reverse it is
            // the gap that faces the next word.
            marginLeft: Math.round(half * opticalFactor(word, words[i + 1], rtl)),
            marginRight: half,
          }}
        >
          {word}
        </div>
      ))}
    </div>
  );
}

let logoCache: string | null = null;

/**
 * Brand mark as a data URI. `public/brand/logo-social.png` is the artwork
 * extracted from `public/logosvg.svg` (a 1.2 MB raster-in-SVG) cropped to the
 * mark and given an alpha channel, so it composites on the card gradient and
 * costs ~33 KB instead of 1.2 MB. Read via `process.cwd()` — `import.meta.url`
 * does not survive the webpack build (see lib/og-font.ts).
 */
export async function loadLogo(): Promise<string | null> {
  if (logoCache) return logoCache;
  try {
    const buf = await readFile(join(process.cwd(), "public", "brand", "logo-social.png"));
    logoCache = `data:image/png;base64,${buf.toString("base64")}`;
    return logoCache;
  } catch {
    return null; // never fail a card over the logo
  }
}
