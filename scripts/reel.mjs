#!/usr/bin/env node
/**
 * Build a ready-to-post reel from a Google Flow backdrop and a live price card.
 *
 *   node scripts/reel.mjs --clip "C:/path/Gold_bar.mp4" --country saudi-arabia
 *
 *   --clip      backdrop from Flow (any aspect; it gets cropped to 9:16)
 *   --country   market slug, default saudi-arabia
 *   --lang      default ar
 *   --out       output path, default social-out/reels/YYYY-MM-DD/<country>.mp4
 *   --base      site to render the card from, default production
 *   --scrim     opacity of the dark layer between video and card, default 0.62
 *   --blur      backdrop blur sigma, default 10
 *
 * The card is fetched from `/social/{country}/story?overlay=1` — the same route
 * that renders the carousel, minus its background — so a reel can never quote a
 * price the carousel contradicts.
 *
 * Flow's audio is discarded on purpose. The reel's sound has to be a trending
 * track chosen in the Instagram app: sound-on views and audio reuse are both
 * documented ranking signals, and a generated soundtrack wastes them.
 */
import { execFile } from "node:child_process";
import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { promisify } from "node:util";

const run = promisify(execFile);

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : fallback;
};

const CLIP = flag("clip", "");
const COUNTRY = flag("country", "saudi-arabia");
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
  console.log(`clip     ${src.width}×${src.height}  ${src.duration.toFixed(1)}s`);
  if (src.width / src.height > 1) {
    console.log("         landscape source — cropping to 9:16 loses the sides.");
    console.log("         Render at 9:16 in Flow next time for a sharper result.");
  }

  const cardUrl = `${BASE}/social/${COUNTRY}/story?lang=${LANG}&overlay=1`;
  const res = await fetch(cardUrl, { headers: { "user-agent": "goldarabia-reel/1.0" } });
  if (!res.ok) throw new Error(`${res.status} fetching ${cardUrl}`);
  const card = Buffer.from(await res.arrayBuffer());
  console.log(`card     ${(card.length / 1024).toFixed(0)} KB  ${COUNTRY}`);

  const today = new Date().toISOString().slice(0, 10);
  const out = flag("out", join(process.cwd(), "social-out", "reels", today, `${COUNTRY}.mp4`));
  await mkdir(dirname(out), { recursive: true });

  const cardPath = join(dirname(out), `${COUNTRY}-overlay.png`);
  await writeFile(cardPath, card);

  // scale=…:increase then crop fills 9:16 from any source aspect without
  // letterboxing.
  //
  // The blur and the scrim are not decoration. A gold backdrop is mostly bright
  // specular highlight, and white text over a blown-out highlight is unreadable
  // — simply lowering overall brightness does not fix it, because the highlight
  // stays the brightest thing in frame. Blurring spreads it out, and a flat dark
  // layer at a fixed opacity guarantees the same contrast under the card no
  // matter how bright the clip is. Blur also hides the upscale a landscape
  // source needs.
  const filter = [
    `[0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},` +
      (BLUR > 0 ? `gblur=sigma=${BLUR},` : "") +
      `eq=saturation=0.85,` +
      `drawbox=x=0:y=0:w=iw:h=ih:color=0x0b0a08@${SCRIM}:t=fill,setsar=1[bg]`,
    `[1:v]scale=${W}:${H}[fg]`,
    `[bg][fg]overlay=0:0:format=auto[v]`,
  ].join(";");

  console.log("ffmpeg   compositing…");
  await run("ffmpeg", [
    "-y",
    "-i", CLIP,
    "-i", cardPath,
    "-filter_complex", filter,
    "-map", "[v]",
    "-an",                       // Flow's audio is discarded, see header
    "-c:v", "libx264",
    "-profile:v", "high",
    "-pix_fmt", "yuv420p",
    "-r", "30",
    "-b:v", "6M",
    "-movflags", "+faststart",
    out,
  ]);

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
