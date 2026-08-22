#!/usr/bin/env node
/**
 * Generate the day's Instagram assets.
 *
 *   node scripts/social-daily.mjs                 # posts + stories, Arabic
 *   node scripts/social-daily.mjs --only posts    # carousel only
 *   node scripts/social-daily.mjs --only stories  # stories only
 *   node scripts/social-daily.mjs --lang en
 *   node scripts/social-daily.mjs --countries saudi-arabia,uae
 *   node scripts/social-daily.mjs --base http://localhost:3000
 *
 * Layout (Instagram allows 20 slides, so it is 1 cover + 19 markets):
 *
 *   social-out/
 *     posts/2026-08-22/01-cover.png … 20-australia.png  + captions.txt
 *     stories/2026-08-22/01-cover.png … 20-australia.png
 *
 * Files are zero-padded so the folder sorts in swipe order — select all in the
 * Instagram uploader and the carousel comes out right. Images and caption both
 * come from the live site (`/social/...` and `/social/data`), so the numbers in
 * the text always match the numbers in the pictures.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : fallback;
};

const BASE = flag("base", "https://goldpricesarabia.com").replace(/\/+$/, "");
const LANG = flag("lang", "ar");
const ONLY = flag("only", "all"); // posts | stories | all

/** Mirror of lib/social-markets.ts — 19 markets, cover makes 20 slides. */
const MARKETS = flag(
  "countries",
  "saudi-arabia,uae,egypt,jordan,kuwait,qatar,bahrain,lebanon,morocco,libya,turkey,india,pakistan,malaysia,usa,uk,europe,canada,australia",
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean)
  .slice(0, 19);

const today = new Date().toISOString().slice(0, 10);
const root = join(process.cwd(), "social-out");

const pad = (n) => String(n).padStart(2, "0");

async function fetchImage(url) {
  const res = await fetch(url, { headers: { "user-agent": "goldarabia-social-daily/1.0" } });
  if (!res.ok) throw new Error(`${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

/**
 * Caption, alt text and the day's tag block, built server-side from the same
 * cached prices the cards render from (`lib/social-caption.ts`).
 */
async function fetchCaption() {
  const url = `${BASE}/social/data?lang=${LANG}&countries=${MARKETS.join(",")}`;
  const res = await fetch(url, { headers: { "user-agent": "goldarabia-social-daily/1.0" } });
  if (!res.ok) throw new Error(`${res.status} from /social/data`);
  return await res.json();
}

/**
 * captions.txt is what gets pasted into Instagram: the caption first, then the
 * per-slide alt text in swipe order (Instagram sets alt text one image at a
 * time, under Advanced settings).
 */
function captionFile(data, files) {
  const lines = [data.caption, "", "", "— — — — — — — — — —", "ALT TEXT (per slide, optional but worth it)", ""];
  data.alts.forEach((alt, i) => {
    lines.push(`${files[i] ?? pad(i + 1)}`);
    lines.push(alt);
    lines.push("");
  });
  return lines.join("\n");
}

/** One folder per kind per day: social-out/{posts|stories}/YYYY-MM-DD/ */
async function build(kind) {
  const format = kind === "stories" ? "story" : "post";
  const dir = join(root, kind, today);
  await mkdir(dir, { recursive: true });
  console.log(`\n${kind}/${today}`);

  const slides = [
    { file: `${pad(1)}-cover.png`, url: `${BASE}/social/cover/${format}?lang=${LANG}&countries=${MARKETS.join(",")}` },
    ...MARKETS.map((slug, i) => ({
      file: `${pad(i + 2)}-${slug}.png`,
      url: `${BASE}/social/${slug}/${format}?lang=${LANG}`,
    })),
  ];

  let ok = 0;
  for (const s of slides) {
    try {
      const buf = await fetchImage(s.url);
      await writeFile(join(dir, s.file), buf);
      console.log(`  ok    ${s.file}  ${(buf.length / 1024).toFixed(0)} KB`);
      ok++;
    } catch (e) {
      console.error(`  fail  ${s.file}: ${e.message}`);
    }
    await new Promise((r) => setTimeout(r, 250)); // one host, stay polite
  }

  if (kind === "posts") {
    try {
      const data = await fetchCaption();
      await writeFile(
        join(dir, "captions.txt"),
        captionFile(data, slides.map((s) => s.file)),
        "utf8",
      );
      console.log(`  ok    captions.txt  (${data.caption.split("\n").pop().split(" ").length} tags)`);
    } catch (e) {
      // Never lose a day's images over the caption — the pictures are the work.
      console.error(`  fail  captions.txt: ${e.message}`);
    }
  }

  console.log(`  → ${ok}/${slides.length} slides in social-out/${kind}/${today}/`);
  return ok;
}

async function main() {
  const kinds = ONLY === "all" ? ["posts", "stories"] : [ONLY];
  for (const k of kinds) {
    if (k !== "posts" && k !== "stories") {
      console.error(`unknown --only "${k}" (use posts | stories | all)`);
      process.exit(1);
    }
  }
  let total = 0;
  for (const k of kinds) total += await build(k);
  console.log(`\n${total} image(s) written under social-out/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
