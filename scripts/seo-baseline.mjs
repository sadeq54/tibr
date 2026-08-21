#!/usr/bin/env node
/**
 * On-page SEO snapshot + diff for the live site.
 *
 *   node scripts/seo-baseline.mjs            # snapshot key URLs, diff vs previous snapshot
 *   node scripts/seo-baseline.mjs --no-diff  # snapshot only
 *
 * Writes docs/seo-baselines/<YYYY-MM-DD>.json and prints what changed since the
 * last snapshot (title, description, canonical, hreflang set, H1, schema types,
 * word count, internal links, status, TTFB). Pair with Search Console for the
 * ranking side: this tells you *what Google sees*, GSC tells you *what it did*.
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const SITE = "https://goldpricesarabia.com";
const URLS = [
  "/",
  "/en",
  "/jordan/gold-price/21k",
  "/saudi-arabia/gold-price/21k",
  "/egypt/gold-price/21k",
  "/uae/gold-price/22k",
  "/en/uae/gold-price/22k",
  "/gold-price/24k",
  "/tr/turkey/gold-price/22k",
  "/hi/india/gold-price/22k",
  "/ur/pakistan/gold-price/24k",
  "/fr/jordan/gold-price/21k",
  "/historical-gold-prices",
  "/research",
];
const OUT_DIR = join(process.cwd(), "docs", "seo-baselines");
const UA = "GoldPricesArabia-seo-baseline/1.0 (+https://goldpricesarabia.com)";

const strip = (s) => s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const decode = (s) =>
  s.replace(/&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return m ? m[1] : "";
};

function analyze(html, path) {
  const title = decode(strip(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? ""));
  const descTag = html.match(/<meta[^>]+name="description"[^>]*>/i)?.[0] ?? "";
  const description = decode(attr(descTag, "content"));
  const canonical = attr(html.match(/<link[^>]+rel="canonical"[^>]*>/i)?.[0] ?? "", "href");
  const hreflang = [...html.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]*>/gi)].map((m) => m[1]).sort();
  const h1 = decode(strip(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? ""));
  const h2Count = (html.match(/<h2[\s>]/gi) ?? []).length;
  const schemaTypes = [...html.matchAll(/"@type":"([A-Za-z]+)"/g)].map((m) => m[1]);
  const schemaCounts = schemaTypes.reduce((a, t) => ((a[t] = (a[t] ?? 0) + 1), a), {});
  const body = html.match(/<body[\s\S]*<\/body>/i)?.[0] ?? html;
  const text = strip(body.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, ""));
  const words = text.split(" ").filter(Boolean).length;
  const links = [...html.matchAll(/<a[^>]+href="([^"]+)"/gi)].map((m) => m[1]);
  const internal = links.filter((h) => h.startsWith("/") || h.startsWith(SITE)).length;
  const robots = attr(html.match(/<meta[^>]+name="robots"[^>]*>/i)?.[0] ?? "", "content");
  const lang = attr(html.match(/<html[^>]*>/i)?.[0] ?? "", "lang");
  const tables = (html.match(/<table[\s>]/gi) ?? []).length;
  return { path, lang, title, titleLen: title.length, description, descLen: description.length, canonical, hreflang, h1, h2Count, tables, words, internalLinks: internal, schemaCounts, robots };
}

async function snapshot(path) {
  const t0 = performance.now();
  const res = await fetch(SITE + path, { headers: { "user-agent": UA, accept: "text/html" }, redirect: "manual" });
  const ttfbMs = Math.round(performance.now() - t0);
  const html = res.status === 200 ? await res.text() : "";
  return { status: res.status, ttfbMs, cacheControl: res.headers.get("cache-control") ?? "", ...analyze(html, path) };
}

function diff(prev, cur) {
  const out = [];
  const keys = ["status", "title", "description", "canonical", "h1", "robots", "lang"];
  for (const k of keys) if (prev[k] !== cur[k]) out.push(`  ${k}: ${JSON.stringify(prev[k])} → ${JSON.stringify(cur[k])}`);
  for (const k of ["hreflang"]) {
    const a = JSON.stringify(prev[k]), b = JSON.stringify(cur[k]);
    if (a !== b) out.push(`  ${k}: ${a} → ${b}`);
  }
  for (const k of ["words", "internalLinks", "h2Count", "tables"]) {
    const d = (cur[k] ?? 0) - (prev[k] ?? 0);
    if (Math.abs(d) >= Math.max(3, (prev[k] ?? 0) * 0.15)) out.push(`  ${k}: ${prev[k]} → ${cur[k]} (${d > 0 ? "+" : ""}${d})`);
  }
  const a = JSON.stringify(prev.schemaCounts), b = JSON.stringify(cur.schemaCounts);
  if (a !== b) out.push(`  schema: ${a} → ${b}`);
  return out;
}

async function main() {
  const noDiff = process.argv.includes("--no-diff");
  await mkdir(OUT_DIR, { recursive: true });
  const today = new Date().toISOString().slice(0, 10);
  const pages = [];
  for (const path of URLS) {
    try {
      const s = await snapshot(path);
      pages.push(s);
      console.log(`${String(s.status).padEnd(4)} ${String(s.ttfbMs + "ms").padEnd(7)} ${path.padEnd(32)} ${s.title.slice(0, 90)}`);
    } catch (e) {
      pages.push({ path, status: 0, error: String(e) });
      console.log(`ERR  ${path} ${e}`);
    }
    await new Promise((r) => setTimeout(r, 400)); // one host — be polite
  }
  const file = join(OUT_DIR, `${today}.json`);
  await writeFile(file, JSON.stringify({ capturedAt: new Date().toISOString(), site: SITE, pages }, null, 2) + "\n");
  console.log(`\nsaved ${file}`);

  if (noDiff) return;
  const files = (await readdir(OUT_DIR)).filter((f) => f.endsWith(".json") && f !== `${today}.json`).sort();
  if (!files.length) return console.log("no previous snapshot — this is the baseline.");
  const prevFile = files[files.length - 1];
  const prev = JSON.parse(await readFile(join(OUT_DIR, prevFile), "utf8"));
  console.log(`\n== changes since ${prevFile}`);
  let any = false;
  for (const cur of pages) {
    const p = prev.pages.find((x) => x.path === cur.path);
    if (!p) { console.log(`+ ${cur.path} (new)`); any = true; continue; }
    const d = diff(p, cur);
    if (d.length) { any = true; console.log(`~ ${cur.path}`); d.forEach((l) => console.log(l)); }
  }
  if (!any) console.log("no on-page changes.");
}

main().catch((e) => { console.error(e); process.exit(1); });
