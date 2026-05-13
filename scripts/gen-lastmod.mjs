#!/usr/bin/env node
/**
 * Generate `data/lastmod.json` — map of route → last git commit date.
 *
 * Sitemap.ts reads this so each <lastmod> reflects the real edit time of the
 * underlying page file, not `new Date()`. Prevents Google from re-crawling
 * unchanged pages and wasting crawl budget.
 *
 * Runs in `prebuild` script. Falls back to current date on git failure (e.g.
 * on Netlify when shallow clone hides history).
 */
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "data", "lastmod.json");

function safeExec(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: "utf-8", stdio: ["ignore", "pipe", "ignore"] });
  } catch {
    return "";
  }
}

function fileRouteFor(file) {
  // app/[locale]/gold-price/[karat]/page.tsx → /gold-price/[karat]
  // app/[locale]/about/sadeq/page.tsx → /about/sadeq
  // app/[locale]/page.tsx → /
  const m = file.match(/^app\/\[locale\]\/(.+\/)?page\.tsx$/);
  if (!m) return null;
  const route = "/" + (m[1] ?? "").replace(/\/$/, "");
  return route;
}

const files = safeExec("git ls-files app/").trim().split("\n").filter(Boolean);
const map = {};

for (const f of files) {
  const route = fileRouteFor(f);
  if (!route) continue;
  const date = safeExec(`git log -1 --format=%cI -- "${f}"`).trim();
  if (date) map[route] = date;
}

// Netlify uses shallow git clone — `git log` may return empty for older files.
// If we got fewer than 3 entries, treat git as unavailable and leave the
// committed `data/lastmod.json` (if any) untouched. Sitemap will use it as-is.
if (Object.keys(map).length < 3) {
  console.warn("⚠ gen-lastmod: git unavailable or shallow — keeping committed data/lastmod.json");
  process.exit(0);
}

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(map, null, 2) + "\n");

console.log(`✓ data/lastmod.json — ${Object.keys(map).length} routes mapped`);
