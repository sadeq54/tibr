#!/usr/bin/env node
/**
 * Download today's Instagram assets and write the captions next to them.
 *
 *   node scripts/social-daily.mjs                 # default markets, ar
 *   node scripts/social-daily.mjs --lang en       # English cards
 *   node scripts/social-daily.mjs --countries saudi-arabia,uae --story
 *   node scripts/social-daily.mjs --base http://localhost:3000   # local preview
 *
 * Output: social-out/YYYY-MM-DD/{country}-post.png (+ -story.png) and
 * captions.txt with a ready-to-paste caption per market. The images come from
 * /social/[country]/[format], so they always match the live site.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : fallback;
};
const has = (name) => args.includes(`--${name}`);

const BASE = (flag("base", "https://goldpricesarabia.com")).replace(/\/+$/, "");
const LANG = flag("lang", "ar");
const COUNTRIES = flag("countries", "saudi-arabia,uae,egypt,jordan,kuwait,qatar,bahrain").split(",").map((s) => s.trim()).filter(Boolean);
const FORMATS = has("story") ? ["post", "story"] : ["post"];

/** Arabic country names for captions; falls back to the slug. */
const NAME_AR = {
  "saudi-arabia": "السعودية", uae: "الإمارات", egypt: "مصر", jordan: "الأردن",
  kuwait: "الكويت", qatar: "قطر", bahrain: "البحرين", oman: "عُمان",
  morocco: "المغرب", turkey: "تركيا", india: "الهند", pakistan: "باكستان",
};
const TAGS = {
  "saudi-arabia": "#سعر_الذهب_اليوم #الذهب_في_السعودية #الرياض #جدة #ذهب #عيار21",
  uae: "#سعر_الذهب_اليوم #الذهب_في_الامارات #دبي #ابوظبي #ذهب #عيار22",
  egypt: "#سعر_الذهب_اليوم #الذهب_في_مصر #القاهرة #ذهب #عيار21 #جنيه_ذهب",
  jordan: "#سعر_الذهب_اليوم #الذهب_في_الاردن #عمان #ذهب #عيار21",
  kuwait: "#سعر_الذهب_اليوم #الذهب_في_الكويت #ذهب #عيار22",
  qatar: "#سعر_الذهب_اليوم #الذهب_في_قطر #الدوحة #ذهب",
  bahrain: "#سعر_الذهب_اليوم #الذهب_في_البحرين #المنامة #ذهب",
};

const today = new Date().toISOString().slice(0, 10);
const outDir = join(process.cwd(), "social-out", today);

const caption = (slug) => {
  const ar = NAME_AR[slug] ?? slug;
  return [
    `أسعار الذهب اليوم في ${ar} — ${today}`,
    "",
    "الأسعار في الصورة لكل عيار بالجرام، محدثة من السوق العالمي.",
    `التفاصيل الكاملة وكل العيارات والعملات: ${BASE}/${slug}/gold-price/21k`,
    "",
    "الرابط في البايو 🔗",
    "",
    TAGS[slug] ?? "#سعر_الذهب_اليوم #ذهب #اسعار_الذهب",
  ].join("\n");
};

async function main() {
  await mkdir(outDir, { recursive: true });
  const captions = [];
  let ok = 0;

  for (const slug of COUNTRIES) {
    for (const format of FORMATS) {
      const url = `${BASE}/social/${slug}/${format}?lang=${LANG}`;
      try {
        const res = await fetch(url, { headers: { "user-agent": "goldarabia-social-daily/1.0" } });
        if (!res.ok) {
          console.error(`  ${res.status}  ${slug}/${format}`);
          continue;
        }
        const buf = Buffer.from(await res.arrayBuffer());
        const file = join(outDir, `${slug}-${format}.png`);
        await writeFile(file, buf);
        console.log(`  ok    ${slug}/${format}  ${(buf.length / 1024).toFixed(0)} KB`);
        ok++;
      } catch (e) {
        console.error(`  fail  ${slug}/${format}: ${e.message}`);
      }
      await new Promise((r) => setTimeout(r, 300)); // one host, stay polite
    }
    captions.push(caption(slug), "", "─".repeat(40), "");
  }

  await writeFile(join(outDir, "captions.txt"), captions.join("\n"), "utf8");
  console.log(`\n${ok} image(s) + captions.txt → social-out/${today}/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
