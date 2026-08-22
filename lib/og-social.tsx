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
  // 0.22em reads evenly: Arabic finals carry their own left bearing (the ب
  // bowl, the ر/ي tails), so a larger margin looks like a hole after them.
  const half = Math.round((gap ?? size * 0.22) / 2);
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
        <div key={`${word}-${i}`} style={{ display: "flex", marginLeft: half, marginRight: half }}>
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
