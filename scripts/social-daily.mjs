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
 * Instagram uploader and the carousel comes out right. Images are rendered by
 * the live site, so they always match the pages they link to.
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

const NAME_AR = {
  "saudi-arabia": "السعودية", uae: "الإمارات", egypt: "مصر", jordan: "الأردن",
  kuwait: "الكويت", qatar: "قطر", bahrain: "البحرين", lebanon: "لبنان",
  morocco: "المغرب", libya: "ليبيا", turkey: "تركيا", india: "الهند",
  pakistan: "باكستان", malaysia: "ماليزيا", usa: "أمريكا", uk: "بريطانيا",
  europe: "أوروبا", canada: "كندا", australia: "أستراليا", oman: "عُمان",
  qatar_: "قطر",
};

const TAGS = {
  "saudi-arabia": "#الذهب_في_السعودية #الرياض #جدة",
  uae: "#الذهب_في_الامارات #دبي #ابوظبي",
  egypt: "#الذهب_في_مصر #القاهرة #جنيه_ذهب",
  jordan: "#الذهب_في_الاردن #عمان",
  kuwait: "#الذهب_في_الكويت",
  qatar: "#الذهب_في_قطر #الدوحة",
  bahrain: "#الذهب_في_البحرين #المنامة",
  lebanon: "#الذهب_في_لبنان #بيروت",
  morocco: "#الذهب_في_المغرب",
  libya: "#الذهب_في_ليبيا",
  turkey: "#الذهب_في_تركيا",
  india: "#gold_india", pakistan: "#gold_pakistan", malaysia: "#gold_malaysia",
};

const today = new Date().toISOString().slice(0, 10);
const root = join(process.cwd(), "social-out");

const pad = (n) => String(n).padStart(2, "0");

async function fetchImage(url) {
  const res = await fetch(url, { headers: { "user-agent": "goldarabia-social-daily/1.0" } });
  if (!res.ok) throw new Error(`${res.status}`);
  return Buffer.from(await res.arrayBuffer());
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

  if (kind === "posts") await writeFile(join(dir, "captions.txt"), caption(), "utf8");
  console.log(`  → ${ok}/${slides.length} slides in social-out/${kind}/${today}/`);
  return ok;
}

/** One caption for the whole carousel, plus a per-market line for stories. */
function caption() {
  const list = MARKETS.map((s) => NAME_AR[s] ?? s).join(" · ");
  const tags = MARKETS.map((s) => TAGS[s]).filter(Boolean).join(" ");
  return [
    `أسعار الذهب اليوم — ${today}`,
    "",
    `الأسعار لكل عيار بالجرام في: ${list}`,
    "اسحب ← للوصول إلى دولتك.",
    "",
    `كل الدول والعملات والعيارات على الموقع: ${BASE}`,
    "الرابط في البايو 🔗",
    "",
    `#سعر_الذهب_اليوم #اسعار_الذهب #ذهب #عيار21 #عيار22 ${tags}`,
  ].join("\n");
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
