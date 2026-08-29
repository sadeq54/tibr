#!/usr/bin/env node
/**
 * Build one reel per country, each one led by that country.
 *
 *   node scripts/reels-batch.mjs                  # every group below
 *   node scripts/reels-batch.mjs --only syria     # just one
 *   node scripts/reels-batch.mjs --list           # show the plan, build nothing
 *
 * Why per-country rather than one nine-country reel: searching Instagram for
 * "اسعار الذهب في السعودية" returns reels in every top slot, and the reel that
 * surfaces for a country query is the one that leads with that country. A
 * nine-country reel leads with Saudi Arabia and buries Syria at position six,
 * so it competes for nothing.
 *
 * Each group leads with its target country and follows with neighbours that
 * share a currency story or a border, which is both a reason to keep watching
 * and a cross-sell to the next market. The hook frame reads markets[0], so the
 * lead country's gram price is what a viewer sees in the first second.
 *
 * The backdrop is the same clip every time — it carries no country, no date and
 * no text, so nothing about it needs to change per market.
 */
import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : fallback;
};
const has = (name) => args.includes(`--${name}`);

const BASE = flag("base", "https://goldpricesarabia.com").replace(/\/+$/, "");
const LANG = flag("lang", "ar");
const ONLY = flag("only", "");

/**
 * Lead country first, then its neighbours. The lead is what the reel is "for" —
 * its name goes in the caption, its hashtags, its filename.
 *
 * Syria, Iraq, Yemen, Palestine, Algeria and Tunisia come first deliberately:
 * they are the markets with existing Search Console demand and, until this
 * week, no page at all. They are also the ones no competitor covers.
 */
const GROUPS = [
  { lead: "syria", with: ["jordan", "lebanon", "iraq", "turkey", "egypt"] },
  { lead: "iraq", with: ["syria", "jordan", "kuwait", "turkey", "saudi-arabia"] },
  { lead: "yemen", with: ["saudi-arabia", "uae", "oman-placeholder", "egypt", "jordan"] },
  { lead: "palestine", with: ["jordan", "egypt", "lebanon", "syria", "saudi-arabia"] },
  { lead: "algeria", with: ["morocco", "tunisia", "libya", "egypt", "france-placeholder"] },
  { lead: "tunisia", with: ["algeria", "morocco", "libya", "egypt", "turkey"] },
  { lead: "saudi-arabia", with: ["uae", "kuwait", "qatar", "bahrain", "egypt"] },
  { lead: "egypt", with: ["saudi-arabia", "uae", "jordan", "libya", "morocco"] },
  { lead: "jordan", with: ["saudi-arabia", "syria", "palestine", "egypt", "uae"] },
  { lead: "morocco", with: ["algeria", "tunisia", "egypt", "libya", "france-placeholder"] },
];

/** Placeholders above are markets we do not cover; drop them rather than 404. */
const KNOWN = new Set();

async function loadKnown() {
  const res = await fetch(`${BASE}/sitemap.xml`, {
    headers: { "user-agent": "goldarabia-reels-batch/1.0" },
  });
  const xml = await res.text();
  for (const m of xml.matchAll(/<loc>[^<]*?\/([a-z-]+)\/gold-price\/21k<\/loc>/g)) {
    KNOWN.add(m[1]);
  }
  // 18K markets (Algeria, Tunisia and the European set) never appear with 21k.
  for (const m of xml.matchAll(/<loc>[^<]*?\/([a-z-]+)\/gold-price\/18k<\/loc>/g)) {
    KNOWN.add(m[1]);
  }
}

function clean(group) {
  const all = [group.lead, ...group.with].filter((s) => KNOWN.has(s));
  return { ...group, countries: all };
}

async function captionFor(countries, lead) {
  const url = `${BASE}/social/data?lang=${LANG}&countries=${countries.join(",")}&lead=${lead}`;
  const res = await fetch(url, { headers: { "user-agent": "goldarabia-reels-batch/1.0" } });
  if (!res.ok) throw new Error(`${res.status} from /social/data`);
  return await res.json();
}

async function main() {
  await loadKnown();
  const groups = GROUPS.map(clean)
    .filter((g) => g.countries.length >= 2)
    .filter((g) => !ONLY || g.lead === ONLY);

  if (has("list")) {
    for (const g of groups) {
      console.log(`${g.lead.padEnd(14)} ${g.countries.join(", ")}`);
    }
    console.log(`\n${groups.length} reel(s) planned`);
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const dir = join(process.cwd(), "social-out", "reels", today, "by-country");
  await mkdir(dir, { recursive: true });

  let built = 0;
  for (const g of groups) {
    const out = join(dir, `${g.lead}.mp4`);
    console.log(`\n── ${g.lead} ── ${g.countries.join(" · ")}`);
    try {
      await run(
        process.execPath,
        [
          join(process.cwd(), "scripts", "reel.mjs"),
          "--countries", g.countries.join(","),
          "--lang", LANG,
          "--base", BASE,
          "--out", out,
        ],
        { cwd: process.cwd(), maxBuffer: 1024 * 1024 * 8 },
      );
      // The caption is fetched from the same feed the cards render from, so it
      // can never quote a price the reel contradicts.
      const data = await captionFor(g.countries, g.lead);
      await writeFile(out.replace(/\.mp4$/, ".txt"), data.caption, "utf8");
      console.log(`   ready  ${out}`);
      built++;
    } catch (e) {
      console.error(`   fail   ${g.lead}: ${String(e.message).split("\n")[0]}`);
    }
  }

  console.log(`\n${built}/${groups.length} reels in social-out/reels/${today}/by-country/`);
  console.log("Each .mp4 has a matching .txt with its caption.");
}

main().catch((e) => {
  console.error(`\n${e.message}`);
  process.exit(1);
});
