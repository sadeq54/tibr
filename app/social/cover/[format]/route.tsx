import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { isRtl, routing } from "@/i18n/routing";
import { getCachedAllHistory, getCachedSpot } from "@/lib/cached-fetchers";
import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";
import { pick, type LocaleText } from "@/lib/i18n-text";
import { loadFontsFor, OG_FONT_FAMILY, rtlWords } from "@/lib/og-font";
import { resolveMarkets } from "@/lib/social-markets";
import { SOCIAL_PROFILES } from "@/lib/social";
import { dateLabel, fmtNum, spotDate } from "@/lib/seo";

/**
 * Carousel cover: /social/cover/post|story?lang=ar&countries=a,b,c
 *
 * Slide 1 of the daily 20-slide carousel. It has to do three jobs in the two
 * seconds it gets in a feed: state today's date, show the headline ounce price
 * and move, and list every market in the carousel so a follower knows their
 * country is in there and swipes. The market list comes from the same
 * `resolveMarkets` the generator script uses, so cover and cards always agree.
 */
const SIZES = { post: { w: 1080, h: 1080 }, story: { w: 1080, h: 1920 } } as const;
type Format = keyof typeof SIZES;

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

const HEADLINE: LocaleText = {
  en: "Gold price today",
  ar: "أسعار الذهب اليوم",
  fr: "Prix de l'or aujourd'hui",
  tr: "Bugün altın fiyatı",
  ur: "آج سونے کی قیمت",
  hi: "आज सोने का भाव",
};
const OUNCE: LocaleText = {
  en: "Ounce (USD)", ar: "الأونصة بالدولار", fr: "L'once (USD)", tr: "Ons (USD)", ur: "اونس (ڈالر)", hi: "औंस (USD)",
};
const IN_MARKETS: LocaleText = {
  en: "Markets in this post",
  ar: "الدول في هذا المنشور",
  fr: "Marchés dans ce post",
  tr: "Bu gönderideki ülkeler",
  ur: "اس پوسٹ میں شامل ممالک",
  hi: "इस पोस्ट के देश",
};
const SWIPE: LocaleText = {
  en: "Swipe for your country",
  ar: "اسحب للوصول إلى دولتك",
  fr: "Faites glisser vers votre pays",
  tr: "Ülkeniz için kaydırın",
  ur: "اپنے ملک کے لیے سوائپ کریں",
  hi: "अपने देश के लिए स्वाइप करें",
};

/** What we offer that a single-country account cannot. */
const FEATURES: LocaleText[] = [
  { en: "46 countries", ar: "46 دولة", fr: "46 pays", tr: "46 ülke", ur: "46 ممالک", hi: "46 देश" },
  // Dots, not "و24 و22": the word-reversal used for RTL text in Satori would
  // scatter the connectors.
  { en: "24 · 22 · 21 · 18K", ar: "عيار 24 · 22 · 21 · 18", fr: "24 · 22 · 21 · 18 ct", tr: "24 · 22 · 21 · 18 ayar", ur: "24 · 22 · 21 · 18 قیراط", hi: "24 · 22 · 21 · 18K" },
  { en: "30-day chart", ar: "رسم بياني 30 يوم", fr: "graphique 30 jours", tr: "30 günlük grafik", ur: "30 دن کا چارٹ", hi: "30-दिन चार्ट" },
  { en: "Updated live", ar: "تحديث لحظي", fr: "mise à jour en direct", tr: "canlı güncelleme", ur: "لائیو اپ ڈیٹ", hi: "लाइव अपडेट" },
];

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ format: string }> },
) {
  const { format: formatRaw } = await ctx.params;
  const format = (formatRaw in SIZES ? formatRaw : "") as Format | "";
  if (!format) return new Response("Not found", { status: 404 });

  const langParam = req.nextUrl.searchParams.get("lang") ?? "ar";
  const lang = (routing.locales as readonly string[]).includes(langParam) ? langParam : "ar";
  const rtl = isRtl(lang);

  const [spot, hist] = await Promise.all([getCachedSpot("XAU"), getCachedAllHistory("1mo")]);
  if (!spot) return new Response("No data", { status: 503 });

  const series = (hist.XAU ?? []).map((p) => p.close).filter((n) => Number.isFinite(n) && n > 0);
  const prevClose = series.length > 1 ? series[series.length - 2] : null;
  const changePct = prevClose ? ((spot.price - prevClose) / prevClose) * 100 : null;
  const up = (changePct ?? 0) >= 0;

  const when = spotDate(spot) ?? new Date();
  const markets = resolveMarkets(req.nextUrl.searchParams.get("countries"));
  const names = markets
    .map((slug) => COUNTRY_BY_SLUG[slug])
    .filter(Boolean)
    .map((c) => countryName(c, lang));

  const { w, h } = SIZES[format];
  const isStory = format === "story";
  const scale = isStory ? 1.06 : 1;
  const themeParam = Number(req.nextUrl.searchParams.get("theme"));
  const dayIndex = Math.floor(when.getTime() / 86_400_000);
  const accent = ACCENTS[Number.isFinite(themeParam) && themeParam >= 0 ? themeParam % ACCENTS.length : dayIndex % ACCENTS.length];
  const handle = SOCIAL_PROFILES[0]?.handle ?? "goldpricearabia";
  const fonts = await loadFontsFor(lang);

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
          padding: isStory ? "230px 72px 330px" : "72px 64px",
        }}
      >
        {/* Headline + date */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <div style={{ fontSize: 30 * scale, color: GOLD, fontWeight: 600, letterSpacing: 1 }}>
            {rtlWords(pick(lang, { en: "Gold Prices Arabia", ar: "أسعار الذهب العربية" }), rtl)}
          </div>
          <div style={{ fontSize: 76 * scale, marginTop: 12, fontWeight: 700, lineHeight: 1.1 }}>
            {rtlWords(pick(lang, HEADLINE), rtl)}
          </div>
          <div style={{ fontSize: 30 * scale, marginTop: 14, color: DIM }}>
            {rtlWords(dateLabel(lang, when, true), rtl)}
          </div>
        </div>

        {/* Headline ounce price + daily move */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            padding: isStory ? "34px 30px" : "26px 30px",
            borderRadius: 30,
            background: "rgba(226,181,78,0.10)",
            border: `1px solid ${accent.chip}55`,
          }}
        >
          <div style={{ fontSize: 26 * scale, color: MUTED }}>{rtlWords(pick(lang, OUNCE), rtl)}</div>
          <div style={{ display: "flex", flexDirection: rtl ? "row-reverse" : "row", alignItems: "center", gap: 20, marginTop: 8 }}>
            <div style={{ fontSize: 68 * scale, fontWeight: 700, color: GOLD, lineHeight: 1 }}>
              {`$${fmtNum(spot.price, 2)}`}
            </div>
            {changePct !== null && (
              <div style={{ fontSize: 34 * scale, color: up ? UP : DOWN }}>
                {`${up ? "+" : "-"}${Math.abs(changePct).toFixed(2)}%`}
              </div>
            )}
          </div>
        </div>

        {/* Every market in the carousel, so a follower sees their country */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center" }}>
          <div style={{ fontSize: 24 * scale, color: DIM, marginBottom: 14 }}>
            {rtlWords(pick(lang, IN_MARKETS), rtl)}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: rtl ? "row-reverse" : "row",
              justifyContent: "center",
              gap: 10,
              width: "100%",
            }}
          >
            {names.map((n) => (
              <div
                key={n}
                style={{
                  display: "flex",
                  padding: "8px 16px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(226,181,78,0.25)",
                  fontSize: 24 * scale,
                  color: TEXT,
                }}
              >
                {rtlWords(n, rtl)}
              </div>
            ))}
          </div>
        </div>

        {/* What we offer that a one-country account cannot */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: rtl ? "row-reverse" : "row",
            justifyContent: "center",
            gap: 12,
            width: "100%",
          }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.en}
              style={{
                display: "flex",
                padding: "10px 18px",
                borderRadius: 14,
                background: `${accent.chip}1f`,
                fontSize: 24 * scale,
                color: accent.chip,
              }}
            >
              {rtlWords(pick(lang, f), rtl)}
            </div>
          ))}
        </div>

        {/* Swipe hint + footer */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", gap: 18 }}>
          <div style={{ fontSize: 30 * scale, color: TEXT }}>
            {/* Arrow written at the end of the sentence, then reversed with it,
                so it lands on the side the reader swipes toward. */}
            {rtlWords(`${pick(lang, SWIPE)} ${rtl ? "←" : "→"}`, rtl)}
          </div>
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
