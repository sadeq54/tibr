#!/usr/bin/env node
/**
 * One-off Instagram profile assets — run again only when the brand changes.
 *
 *   node scripts/brand-assets.mjs
 *
 * Writes:
 *   public/brand/instagram-avatar.png   1080×1080  profile picture
 *   public/brand/highlight-*.png        1080×1920  highlight covers (crop to a circle)
 *
 * The mark is `public/brand/mark-gold.png`: the circular G-with-rising-chart
 * lifted out of `public/logosvg.svg`. The wordmark cannot be the profile
 * picture — Instagram renders it at 32 px in the feed, where the words vanish
 * and only a shape survives. The logo already contained the right shape.
 *
 * Highlight covers are icon-only on purpose: Instagram prints the highlight
 * name underneath, so putting Arabic in the circle only duplicates it smaller.
 * Icons are rectangles, an SVG polyline and Latin glyphs — nothing that depends
 * on a glyph the bundled font might not carry.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(join(process.cwd(), "package.json"));
const { ImageResponse } = require("next/dist/compiled/@vercel/og/index.node.js");

const BG = "#0b0a08";
const GOLD = "#e2b54e";
const GLOW = "#7c4a12";

const toArrayBuffer = (b) => b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
const h = (type, props, ...children) => ({
  type,
  props: { ...props, children: children.length === 1 ? children[0] : children },
});

const font = toArrayBuffer(await readFile(join(process.cwd(), "public/fonts/ArabicSemiBold.ttf")));
const markData = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/brand/mark-gold.png"))).toString("base64")}`;

async function render(el, width, height, file) {
  const res = new ImageResponse(el, {
    width,
    height,
    fonts: [{ name: "ArabicSans", data: font, weight: 700, style: "normal" }],
  });
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(process.cwd(), "public/brand", file), buf);
  console.log(`  ok  ${file}  ${width}×${height}  ${(buf.length / 1024).toFixed(0)} KB`);
}

/** Everything Instagram shows is circular, so nothing important goes near a corner. */
const frame = (children, extra = {}) =>
  h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: BG,
        backgroundImage: `radial-gradient(circle at 50% 50%, ${GLOW} 0%, ${BG} 65%)`,
        fontFamily: "ArabicSans",
        color: GOLD,
        ...extra,
      },
    },
    children,
  );

/* ── Profile picture ────────────────────────────────────────────────────── */
await render(
  frame(
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 940,
          height: 940,
          borderRadius: 999,
          // Inset so the ring survives Instagram's circular crop instead of
          // being shaved off at the edge.
          border: `10px solid ${GOLD}`,
          background: "rgba(0,0,0,0.35)",
        },
      },
      h("img", { src: markData, width: 560, height: 560, alt: "" }),
    ),
  ),
  1080,
  1080,
  "instagram-avatar.png",
);

/* ── Highlight covers ───────────────────────────────────────────────────── */
const bars = h(
  "div",
  { style: { display: "flex", alignItems: "flex-end", height: 300 } },
  ...[110, 175, 240, 300].map((tall, i) =>
    h("div", {
      key: i,
      style: { display: "flex", width: 58, height: tall, marginLeft: 14, marginRight: 14, borderRadius: 12, background: GOLD },
    }),
  ),
);

const spark = h(
  "svg",
  { width: 380, height: 260, viewBox: "0 0 380 260" },
  h("path", {
    d: "M10 220 L70 180 L130 196 L190 120 L250 140 L310 60 L370 24",
    fill: "none",
    stroke: GOLD,
    strokeWidth: 20,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  }),
);

const glyph = (text, size = 260) =>
  h("div", { style: { display: "flex", fontSize: size, fontWeight: 700, color: GOLD } }, text);

const HIGHLIGHTS = [
  ["highlight-prices.png", bars, "أسعار اليوم"],
  ["highlight-countries.png", glyph("46"), "الدول"],
  ["highlight-karats.png", glyph("21K", 200), "العيارات"],
  ["highlight-chart.png", spark, "الرسم البياني"],
  ["highlight-change.png", glyph("%"), "التغير اليومي"],
];

for (const [file, icon, label] of HIGHLIGHTS) {
  await render(frame(icon), 1080, 1920, file);
  console.log(`      ↳ highlight name to type in Instagram: ${label}`);
}

console.log("\nUpload instagram-avatar.png as the profile picture; the rest are highlight covers.");
