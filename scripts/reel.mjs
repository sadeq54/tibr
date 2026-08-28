#!/usr/bin/env node
/**
 * Build a ready-to-post reel from a Google Flow backdrop and live price cards.
 *
 *   node scripts/reel.mjs --clip "C:/path/Gold_bar.mp4"
 *   node scripts/reel.mjs --clip clip.mp4 --countries saudi-arabia,uae,egypt
 *   node scripts/reel.mjs --clip clip.mp4 --country saudi-arabia   # single card
 *
 *   --clip        backdrop from Flow (any aspect; it gets cropped to 9:16)
 *   --countries   comma list, default the nine markets in the daily carousel
 *                 (WIDER_MARKETS below adds the next eleven by GSC clicks)
 *   --country     shorthand for a one-country reel
 *   --per         seconds each country holds on screen, default 1.5
 *   --opener      hook | cover | none — what frame one is, default hook
 *   --cover       seconds the opening frame holds, default 2
 *   --lang        default ar
 *   --out         default social-out/reels/YYYY-MM-DD/<name>.mp4
 *   --base        site to render cards from, default production
 *   --scrim       opacity of the dark layer between video and cards, default 0.62
 *   --blur        backdrop blur sigma, default 10
 *
 * Cards come from `/social/{country}/story?overlay=1` — the same route that
 * renders the carousel, minus its background — so a reel can never quote a
 * price the carousel contradicts.
 *
 * Flow's audio is discarded on purpose. The reel's sound has to be a trending
 * track chosen in the Instagram app: sound-on views and audio reuse are both
 * documented ranking signals, and a generated soundtrack wastes them.
 */
import { execFile } from "node:child_process";
import { mkdir, writeFile, stat, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : fallback;
};

/** The nine markets in the web-sized carousel (lib/social-markets.ts). */
const DEFAULT_MARKETS =
  "saudi-arabia,uae,egypt,jordan,kuwait,qatar,bahrain,lebanon,morocco";

/**
 * The eleven markets that follow the nine in Search Console clicks over 28 days,
 * for a wider reel: --countries "$DEFAULT_MARKETS,$WIDER".
 *
 * Sweden and Denmark are not a mistake — that is where people searching in
 * Arabic actually are. Syria is the site's number one country by clicks (33
 * clicks, 2,983 impressions) and is absent only because there is no /syria page;
 * same for Yemen, Iraq, Algeria, Tunisia and Palestine. Add those routes and
 * they belong at the front of this list.
 */
export const WIDER_MARKETS =
  "usa,uk,europe,turkey,sweden,denmark,canada,libya,pakistan,india,malaysia";

const CLIP = flag("clip", "");
const COUNTRIES = flag("country", flag("countries", DEFAULT_MARKETS))
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const PER = Math.max(0.6, Number(flag("per", "1.5")));
/**
 * What the reel opens on. Instagram decides distribution on the opening
 * seconds, so this is the highest-leverage flag in the file.
 *
 *   hook  (default) — the move and a gram price, no logo. Nothing to skip past.
 *   cover           — the carousel's branded cover card. Two seconds of brand
 *                     before the first number, which is two seconds of nothing
 *                     to a thumb already moving.
 *   none            — straight into the first country.
 */
const OPENER = ["hook", "cover", "none"].includes(flag("opener", "hook"))
  ? flag("opener", "hook")
  : "hook";
const COVER = Math.max(0, Number(flag("cover", "2")));
const LANG = flag("lang", "ar");
const BASE = flag("base", "https://goldpricesarabia.com").replace(/\/+$/, "");
const SCRIM = Math.min(1, Math.max(0, Number(flag("scrim", "0.62"))));
const BLUR = Math.max(0, Number(flag("blur", "10")));

const W = 1080;
const H = 1920;

if (!CLIP) {
  console.error("--clip is required: the .mp4 you downloaded from Flow");
  process.exit(1);
}

async function ffprobe(file) {
  const { stdout } = await run("ffprobe", [
    "-v", "error",
    "-select_streams", "v:0",
    "-show_entries", "stream=width,height,duration",
    "-of", "json",
    file,
  ]);
  const s = JSON.parse(stdout).streams?.[0] ?? {};
  return { width: Number(s.width), height: Number(s.height), duration: Number(s.duration) };
}

async function main() {
  await stat(CLIP); // fail early and clearly if the path is wrong

  const src = await ffprobe(CLIP);
  const openerHold = OPENER === "none" ? 0 : COVER;
  const total = +(openerHold + COUNTRIES.length * PER).toFixed(2);
  console.log(`clip     ${src.width}×${src.height}  ${src.duration.toFixed(1)}s`);
  if (src.width / src.height > 1) {
    console.log("         landscape source — cropping to 9:16 loses the sides.");
  }
  if (total > src.duration) {
    console.log(`         backdrop loops to cover ${total}s`);
  }

  const today = new Date().toISOString().slice(0, 10);
  const name = COUNTRIES.length === 1 ? COUNTRIES[0] : `${COUNTRIES.length}-countries`;
  const out = flag("out", join(process.cwd(), "social-out", "reels", today, `${name}.mp4`));
  const work = join(dirname(out), ".cards");
  await mkdir(work, { recursive: true });

  const cards = [];
  const first = OPENER === "none" ? [] : [OPENER];
  const slugs = [...first, ...COUNTRIES];
  for (const slug of slugs) {
    const url =
      slug === "hook"
        ? `${BASE}/social/hook/story?lang=${LANG}&overlay=1&countries=${COUNTRIES.join(",")}`
        : slug === "cover"
        ? `${BASE}/social/cover/story?lang=${LANG}&overlay=1&countries=${COUNTRIES.join(",")}`
        : `${BASE}/social/${slug}/story?lang=${LANG}&overlay=1`;
    const res = await fetch(url, { headers: { "user-agent": "goldarabia-reel/1.0" } });
    if (!res.ok) throw new Error(`${res.status} fetching ${url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const p = join(work, `${slug}.png`);
    await writeFile(p, buf);
    cards.push(p);
    process.stdout.write(`card     ${slug.padEnd(14)} ${(buf.length / 1024).toFixed(0)} KB\n`);
  }

  // The blur and the scrim are not decoration. A gold backdrop is mostly bright
  // specular highlight, and white text over a blown-out highlight is unreadable
  // — lowering overall brightness does not fix it, because the highlight stays
  // the brightest thing in frame. Blurring spreads it out, and a flat dark layer
  // at fixed opacity guarantees the same contrast under every card whatever the
  // clip is doing. Blur also hides the upscale a landscape source needs.
  const chain = [
    `[0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},` +
      (BLUR > 0 ? `gblur=sigma=${BLUR},` : "") +
      `eq=saturation=0.85,` +
      `drawbox=x=0:y=0:w=iw:h=ih:color=0x0b0a08@${SCRIM}:t=fill,setsar=1[bg]`,
  ];

  // One overlay per country, each gated to its own slice of the timeline.
  // Hard cuts, not crossfades: a viewer is scanning for their own country, and
  // a dissolve makes two country names legible at once, which reads as a smear.
  let prev = "bg";
  let cursor = 0;
  cards.forEach((_, i) => {
    const hold = openerHold > 0 && i === 0 ? openerHold : PER;
    const from = +cursor.toFixed(3);
    const to = +(cursor + hold).toFixed(3);
    cursor += hold;
    const label = i === cards.length - 1 ? "v" : `v${i}`;
    chain.push(`[${i + 1}:v]scale=${W}:${H}[c${i}]`);
    chain.push(`[${prev}][c${i}]overlay=0:0:format=auto:enable='between(t,${from},${to})'[${label}]`);
    prev = label;
  });

  const inputs = ["-stream_loop", "-1", "-i", CLIP];
  for (const c of cards) inputs.push("-i", c);

  console.log(`ffmpeg   ${openerHold > 0 ? `${OPENER} ${openerHold}s + ` : ""}${COUNTRIES.length} × ${PER}s = ${total}s`);
  await run("ffmpeg", [
    "-y",
    ...inputs,
    "-filter_complex", chain.join(";"),
    "-map", "[v]",
    "-t", String(total),
    "-an",                       // Flow's audio is discarded, see header
    "-c:v", "libx264",
    "-profile:v", "high",
    "-pix_fmt", "yuv420p",
    "-r", "30",
    "-b:v", "6M",
    "-movflags", "+faststart",
    out,
  ]);

  const thumb = out.replace(/\.mp4$/, "-cover.jpg");
  await run("ffmpeg", [
    "-y", "-v", "error",
    "-ss", openerHold > 0 ? "0.4" : "0.2",
    "-i", out,
    "-frames:v", "1",
    "-q:v", "2",
    thumb,
  ]);

  await rm(work, { recursive: true, force: true });

  const final = await ffprobe(out);
  const size = (await stat(out)).size;
  console.log(`\nready    ${out}`);
  console.log(`         ${final.width}×${final.height}  ${final.duration.toFixed(1)}s  ${(size / 1024 / 1024).toFixed(1)} MB  no audio`);
  console.log(`\nPost it: Instagram app → + → Reel → pick this file → choose a trending audio → Share.`);
}

main().catch((e) => {
  console.error(`\n${e.message}`);
  process.exit(1);
});
