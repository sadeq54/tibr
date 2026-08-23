import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { isRtl, routing } from "@/i18n/routing";
import { getCachedAllHistory, getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";
import { pick, type LocaleText } from "@/lib/i18n-text";
import { loadFontsFor, OG_FONT_FAMILY } from "@/lib/og-font";
import {
  CARD_BG, CARD_DIM, CARD_DOWN, CARD_GOLD, CARD_MUTED, CARD_TEXT, CARD_UP,
  loadLogo, pickAccent, Words,
} from "@/lib/og-social";
import { SOCIAL_PROFILES } from "@/lib/social";
import { KARAT_DEFS, currencyName, dateLabel, fmtNum, gramUsd, spotDate } from "@/lib/seo";

/**
 * Daily social price card:
 *   /social/{country}/post   → 1080×1080 (feed)
 *   /social/{country}/story  → 1080×1920 (story / reel cover)
 *   ?lang=ar|en|fr|tr|ur|hi  ?theme=0-6
 *
 * Modelled on what works for the category leader in this niche (a dated card,
 * per-gram karat prices in local currency, a USD ounce line, handle + domain
 * footer, one post a day, accent hue rotating so the profile grid reads as a
 * mosaic) — plus the two things their cards do not show: daily change and a
 * 30-day sparkline. Rendered from the same cached feeds as the site, so a post
 * can never disagree with the page it links to.
 */
const SIZES = { post: { w: 1080, h: 1080 }, story: { w: 1080, h: 1920 } } as const;
type Format = keyof typeof SIZES;

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

const CARD_KARATS = ["24k", "22k", "21k", "18k"] as const;

/**
 * Weak currencies price a gram in the millions (LBP is ~89,000 to the dollar),
 * where two decimal places are noise — nobody quotes gold to the piastre at
 * 11.8 million. Dropping them is what a Lebanese jeweller's board does too.
 */
function priceText(value: number): string {
  if (!Number.isFinite(value) || value <= 0) return "—";
  if (value >= 10_000) return fmtNum(value, 0);
  if (value >= 1_000) return fmtNum(value, 1);
  return fmtNum(value, 2);
}

/**
 * Shrink the price to fit its tile. Satori does not clip overflow, so a long
 * number simply runs under the karat badge next to it — which is exactly what
 * "11,823,482.97" did on the Lebanon card.
 */
function priceSize(text: string, scale: number): number {
  const n = text.length;
  const base = n <= 8 ? 54 : n <= 10 ? 46 : n <= 12 ? 40 : 34;
  return base * scale;
}

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

  const [spot, fx, hist, logo] = await Promise.all([
    getCachedSpot("XAU"),
    getCachedFxRates(),
    getCachedAllHistory("1mo"),
    loadLogo(),
  ]);
  if (!spot) return new Response("No data", { status: 503 });

  const rawRate = country.currency === "USD" ? 1 : (fx[country.currency] as number | undefined);
  const rate = typeof rawRate === "number" && Number.isFinite(rawRate) && rawRate > 0 ? rawRate : 1;
  const cur = rate === 1 && country.currency !== "USD" ? "USD" : country.currency;

  const series = (hist.XAU ?? []).map((p) => p.close).filter((n) => Number.isFinite(n) && n > 0);
  const prevClose = series.length > 1 ? series[series.length - 2] : null;
  const ozUsd = spot.price;
  const changePct = prevClose ? ((ozUsd - prevClose) / prevClose) * 100 : null;
  const up = (changePct ?? 0) >= 0;

  const when = spotDate(spot) ?? new Date();
  const name = countryName(country, lang);
  const { w, h } = SIZES[format];
  const accent = pickAccent(when, Number(req.nextUrl.searchParams.get("theme")));

  const rows = CARD_KARATS.map((key) => {
    const def = KARAT_DEFS.find((k) => k.key === key)!;
    return { label: def.label.replace("K", ""), price: priceText(gramUsd(spot, key) * rate) };
  });

  const isStory = format === "story";
  const scale = isStory ? 1.08 : 1;
  const handle = SOCIAL_PROFILES[0]?.handle ?? "goldpricearabia";
  const fonts = await loadFontsFor(lang);
  const sparkW = w - 160;
  const sparkH = isStory ? 150 : 88;
  const spark = sparkPath(series.slice(-30), sparkW, sparkH);
  const unitLine = `${currencyName(cur, lang)} · ${pick(lang, PER_GRAM)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          background: CARD_BG,
          backgroundImage: `radial-gradient(circle at 50% 0%, ${accent.glow} 0%, ${CARD_BG} 62%)`,
          color: CARD_TEXT,
          fontFamily: OG_FONT_FAMILY,
          // Story safe area: Instagram overlays the top ~14% and bottom ~20%.
          padding: isStory ? "230px 72px 330px" : "72px 64px",
        }}
      >
        {/* Brand mark, eyebrow, country, date */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          {logo && <img src={logo} width={260 * scale} height={82 * scale} alt="" />}
          <div style={{ display: "flex", marginTop: 26 }}>
            <Words text={pick(lang, TITLE)} rtl={rtl} size={30 * scale} color={CARD_GOLD} weight={600} />
          </div>
          <div style={{ display: "flex", marginTop: 8 }}>
            <Words text={name} rtl={rtl} size={78 * scale} weight={700} />
          </div>
          <div style={{ display: "flex", marginTop: 14 }}>
            <Words text={dateLabel(lang, when, true)} rtl={rtl} size={26 * scale} color={CARD_DIM} />
          </div>
        </div>

        {/* Middle block, centred in the story's taller canvas */}
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
          {/* Karat cards, 2 × 2 */}
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
                        background: CARD_GOLD,
                        color: "#1a1209",
                        fontSize: 30 * scale,
                        fontWeight: 700,
                        // Satori drops `gap` here, so the clearance between the
                        // badge and the number has to be a margin.
                        ...(rtl ? { marginLeft: 18 } : { marginRight: 18 }),
                      }}
                    >
                      {r.label}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: rtl ? "flex-start" : "flex-end" }}>
                      <div style={{ display: "flex", fontSize: priceSize(r.price, scale), fontWeight: 700, lineHeight: 1 }}>
                        {r.price}
                      </div>
                      <div style={{ display: "flex", marginTop: 8 }}>
                        <Words text={unitLine} rtl={rtl} size={22 * scale} color={CARD_DIM} />
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
            <Words text={pick(lang, OUNCE)} rtl={rtl} size={26 * scale} color={CARD_MUTED} />
            <div style={{ display: "flex", flexDirection: rtl ? "row-reverse" : "row", alignItems: "center", gap: 18 }}>
              <div style={{ display: "flex", fontSize: 46 * scale, fontWeight: 700, color: CARD_GOLD }}>
                {`$${fmtNum(ozUsd, 2)}`}
              </div>
              {changePct !== null && (
                <div style={{ display: "flex", fontSize: 30 * scale, color: up ? CARD_UP : CARD_DOWN }}>
                  {`${up ? "+" : "-"}${Math.abs(changePct).toFixed(2)}%`}
                </div>
              )}
            </div>
          </div>

          {/* 30-day sparkline */}
          {spark && (
            <div style={{ display: "flex", flexDirection: "column", width: "100%", marginBottom: 12 }}>
              <div style={{ display: "flex", marginBottom: 8, justifyContent: rtl ? "flex-end" : "flex-start" }}>
                <Words text={pick(lang, LAST_30)} rtl={rtl} size={22 * scale} color={CARD_DIM} />
              </div>
              <svg width={sparkW} height={sparkH} viewBox={`0 0 ${sparkW} ${sparkH}`}>
                <path d={spark} fill="none" stroke={CARD_GOLD} strokeWidth={5} />
              </svg>
            </div>
          )}
        </div>

        {/* Footer */}
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
          <div style={{ display: "flex", color: accent.chip }}>{`@${handle}`}</div>
          <div style={{ display: "flex", color: CARD_GOLD }}>goldpricesarabia.com</div>
        </div>
      </div>
    ),
    {
      width: w,
      height: h,
      fonts,
      headers: { "Cache-Control": "public, max-age=900, s-maxage=1800, stale-while-revalidate=86400" },
    },
  );
}
