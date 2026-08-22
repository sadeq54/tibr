import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { isRtl, routing } from "@/i18n/routing";
import { getCachedAllHistory, getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";
import { pick, type LocaleText } from "@/lib/i18n-text";
import { loadFontsFor, OG_FONT_FAMILY, rtlWords } from "@/lib/og-font";
import { SOCIAL_PROFILES } from "@/lib/social";
import { KARAT_DEFS, currencyName, dateLabel, fmtNum, gramUsd, spotDate } from "@/lib/seo";

/**
 * Daily social price card:
 *   /social/{country}/post   → 1080×1080 (feed)
 *   /social/{country}/story  → 1080×1920 (story / reel cover)
 *   ?lang=ar|en|fr|tr|ur|hi  ?theme=0-6  ?date=YYYY-MM-DD (label only)
 *
 * Modelled on what works for the category leader in this niche (a dated card,
 * per-gram karat prices in local currency, a USD ounce line, handle + domain
 * footer, one post a day, accent hue rotating so the profile grid reads as a
 * mosaic) — plus the two things their cards do not show: **daily change per
 * karat** and a **30-day sparkline**, both of which we already have data for.
 *
 * Rendered live from the same cached spot/FX/history feeds as the site, so a
 * post can never disagree with the page it links to.
 */
const SIZES = {
  post: { w: 1080, h: 1080 },
  story: { w: 1080, h: 1920 },
} as const;
type Format = keyof typeof SIZES;

/** Accent per day-of-year: the grid becomes a colour mosaic over a month. */
const ACCENTS = [
  { glow: "#7c4a12", chip: "#f0b754" },
  { glow: "#0f4c4a", chip: "#4fd1c5" },
  { glow: "#4a4a12", chip: "#d9d264" },
  { glow: "#5c1030", chip: "#f472b6" },
  { glow: "#2d1b5e", chip: "#a78bfa" },
  { glow: "#0f3d20", chip: "#4ade80" },
  { glow: "#12324f", chip: "#60a5fa" },
];

const BG = "#0b0a08";
const GOLD = "#e2b54e";
const TEXT = "#f4efe4";
const MUTED = "#b9b2a1";
const DIM = "#8f8875";
const UP = "#22c55e";
const DOWN = "#ef4444";

/** Eyebrow above the country name — no trailing connector, it dangles. */
const TITLE: LocaleText = {
  en: "Gold price today",
  ar: "أسعار الذهب اليوم",
  fr: "Prix de l'or aujourd'hui",
  tr: "Bugün altın fiyatı",
  ur: "آج سونے کی قیمت",
  hi: "आज सोने का भाव",
};
const PER_GRAM: LocaleText = {
  en: "per gram", ar: "للجرام", fr: "le gramme", tr: "gram", ur: "فی گرام", hi: "प्रति ग्राम",
};
const OUNCE: LocaleText = {
  en: "Ounce (USD)", ar: "الأونصة بالدولار", fr: "L'once (USD)", tr: "Ons (USD)", ur: "اونس (ڈالر)", hi: "औंस (USD)",
};
const LAST_30: LocaleText = {
  en: "Last 30 days", ar: "آخر 30 يوماً", fr: "30 derniers jours", tr: "Son 30 gün", ur: "پچھلے 30 دن", hi: "पिछले 30 दिन",
};

/** Karats shown on the card, in the order the audience asks for them. */
const CARD_KARATS = ["24k", "22k", "21k", "18k"] as const;

function sparkPath(values: number[], w: number, h: number): string {
  if (values.length < 2) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  return values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / span) * h;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ country: string; format: string }> },
) {
  const { country: slug, format: formatRaw } = await ctx.params;
  const country = COUNTRY_BY_SLUG[slug];
  const format = (formatRaw in SIZES ? formatRaw : "") as Format | "";
  if (!country || !format) return new Response("Not found", { status: 404 });

  const langParam = req.nextUrl.searchParams.get("lang") ?? "ar";
  const lang = (routing.locales as readonly string[]).includes(langParam) ? langParam : "ar";
  const rtl = isRtl(lang);

  const [spot, fx, hist] = await Promise.all([
    getCachedSpot("XAU"),
    getCachedFxRates(),
    getCachedAllHistory("1mo"),
  ]);
  if (!spot) return new Response("No data", { status: 503 });

  const rawRate = country.currency === "USD" ? 1 : (fx[country.currency] as number | undefined);
  const rate = typeof rawRate === "number" && Number.isFinite(rawRate) && rawRate > 0 ? rawRate : 1;
  const cur = rate === 1 && country.currency !== "USD" ? "USD" : country.currency;

  // Yesterday's close drives the change chips; the same series draws the spark.
  const series = (hist.XAU ?? []).map((p) => p.close).filter((n) => Number.isFinite(n) && n > 0);
  const prevClose = series.length > 1 ? series[series.length - 2] : null;
  const ozUsd = spot.price;
  const changePct = prevClose ? ((ozUsd - prevClose) / prevClose) * 100 : null;
  const up = (changePct ?? 0) >= 0;

  const when = spotDate(spot) ?? new Date();
  const dateStr = dateLabel(lang, when, true);
  const name = countryName(country, lang);
  const { w, h } = SIZES[format];
  const themeParam = Number(req.nextUrl.searchParams.get("theme"));
  const dayIndex = Math.floor(when.getTime() / 86_400_000);
  const accent = ACCENTS[Number.isFinite(themeParam) && themeParam >= 0 ? themeParam % ACCENTS.length : dayIndex % ACCENTS.length];

  const rows = CARD_KARATS.map((key) => {
    const def = KARAT_DEFS.find((k) => k.key === key)!;
    return { label: def.label.replace("K", ""), price: fmtNum(gramUsd(spot, key) * rate, cur === "USD" ? 2 : 2) };
  });

  const isStory = format === "story";
  const scale = isStory ? 1.08 : 1;
  const handle = SOCIAL_PROFILES[0]?.handle ?? "goldpricearabia";
  const fonts = await loadFontsFor(lang);
  const sparkW = w - 160;
  const sparkH = isStory ? 150 : 110;
  const spark = sparkPath(series.slice(-30), sparkW, sparkH);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          backgroundImage: `radial-gradient(circle at 50% 0%, ${accent.glow} 0%, ${BG} 62%)`,
          color: TEXT,
          fontFamily: OG_FONT_FAMILY,
          // Story safe area: Instagram overlays the top ~14% (profile bar) and
          // the bottom ~20% (reply bar), so the header and footer are inset
          // past those bands instead of being clipped by the app chrome.
          padding: isStory ? "230px 72px 330px" : "72px 64px",
        }}
      >
        {/* Header: the country is the hero — short lines keep the reversed-word
            spacing tight, and the market is what a follower scans for. */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <div style={{ fontSize: 30 * scale, color: GOLD, fontWeight: 600, letterSpacing: 1 }}>
            {rtlWords(pick(lang, TITLE), rtl)}
          </div>
          <div style={{ fontSize: 78 * scale, marginTop: 10, color: TEXT, fontWeight: 700, lineHeight: 1.1 }}>
            {rtlWords(name, rtl)}
          </div>
          <div style={{ fontSize: 26 * scale, marginTop: 14, color: DIM }}>{rtlWords(dateStr, rtl)}</div>
        </div>

        {/* Middle block: centred in the story's taller canvas instead of being
            stretched apart by space-between. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: isStory ? 40 : 20,
            justifyContent: "center",
            flexGrow: isStory ? 1 : 0,
          }}
        >
        {/* Karat cards, 2 x 2 */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: 18 }}>
          {[rows.slice(0, 2), rows.slice(2, 4)].map((pair, i) => (
            <div key={i} style={{ display: "flex", flexDirection: rtl ? "row-reverse" : "row", gap: 18, width: "100%" }}>
              {pair.map((r) => (
                <div
                  key={r.label}
                  style={{
                    display: "flex",
                    flexDirection: rtl ? "row-reverse" : "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flex: 1,
                    padding: isStory ? "34px 30px" : "26px 26px",
                    borderRadius: 26,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(226,181,78,0.22)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 74 * scale,
                      height: 74 * scale,
                      borderRadius: 999,
                      background: GOLD,
                      color: "#1a1209",
                      fontSize: 30 * scale,
                      fontWeight: 700,
                    }}
                  >
                    {r.label}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: rtl ? "flex-start" : "flex-end" }}>
                    <div style={{ fontSize: 54 * scale, fontWeight: 700, color: TEXT, lineHeight: 1 }}>{r.price}</div>
                    <div style={{ fontSize: 22 * scale, color: DIM, marginTop: 8 }}>
                      {rtlWords(`${currencyName(cur, lang)} · ${pick(lang, PER_GRAM)}`, rtl)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Ounce + daily change */}
        <div
          style={{
            display: "flex",
            flexDirection: rtl ? "row-reverse" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            padding: isStory ? "30px 34px" : "24px 30px",
            borderRadius: 26,
            background: "rgba(226,181,78,0.10)",
            border: `1px solid ${accent.chip}55`,
          }}
        >
          <div style={{ fontSize: 26 * scale, color: MUTED }}>{rtlWords(pick(lang, OUNCE), rtl)}</div>
          <div style={{ display: "flex", flexDirection: rtl ? "row-reverse" : "row", alignItems: "center", gap: 18 }}>
            <div style={{ fontSize: 46 * scale, fontWeight: 700, color: GOLD }}>
              {`$${fmtNum(ozUsd, 2)}`}
            </div>
            {changePct !== null && (
              // Plain +/- rather than ▲▼: the arrows are not in the bundled
              // fonts and Satori then tries (and fails) to fetch a dynamic one.
              <div style={{ fontSize: 30 * scale, color: up ? UP : DOWN }}>
                {`${up ? "+" : "-"}${Math.abs(changePct).toFixed(2)}%`}
              </div>
            )}
          </div>
        </div>

        {/* 30-day sparkline */}
        {spark && (
          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <div style={{ fontSize: 22 * scale, color: DIM, marginBottom: 10 }}>
              {rtlWords(pick(lang, LAST_30), rtl)}
            </div>
            <svg width={sparkW} height={sparkH} viewBox={`0 0 ${sparkW} ${sparkH}`}>
              <path d={spark} fill="none" stroke={GOLD} strokeWidth={5} />
            </svg>
          </div>
        )}
        </div>

        {/* Footer: handle + domain */}
        <div
          style={{
            display: "flex",
            flexDirection: rtl ? "row-reverse" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            fontSize: 26 * scale,
          }}
        >
          <div style={{ color: accent.chip }}>{`@${handle}`}</div>
          <div style={{ color: GOLD }}>goldpricesarabia.com</div>
        </div>
      </div>
    ),
    {
      width: w,
      height: h,
      fonts,
      headers: {
        "Cache-Control": "public, max-age=900, s-maxage=1800, stale-while-revalidate=86400",
      },
    },
  );
}
