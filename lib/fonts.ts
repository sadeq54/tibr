import { Geist, Geist_Mono, IBM_Plex_Sans_Arabic, Noto_Sans_Devanagari } from "next/font/google";

/**
 * Brand typography, self-hosted via next/font (zero layout shift, no
 * external <link> requests, automatic fallback metric adjustment).
 *
 * - Geist        → Latin UI + display (en, fr, tr). Modern grotesk, tight tracking.
 * - Geist Mono   → every price / numeric readout (tabular by design).
 * - IBM Plex Sans Arabic → Arabic + Urdu UI + display. Same industrial DNA as
 *   Geist, excellent rendering at data sizes, covers the Urdu-specific letters
 *   (ٹ ڈ ڑ ں ے ہ). Latin glyphs never used (Geist sits first in the stack),
 *   so the two never clash.
 * - Noto Sans Devanagari → Hindi. Sits after Plex Arabic in `--font-sans`;
 *   only Devanagari code points ever reach it.
 */
export const fontSans = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
  display: "swap",
});

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const fontArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const fontDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-devanagari",
  display: "swap",
});

/** Class string carrying all font CSS variables — apply once on <html>. */
export const fontVariables = `${fontSans.variable} ${fontMono.variable} ${fontArabic.variable} ${fontDevanagari.variable}`;
