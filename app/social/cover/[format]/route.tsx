import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { isRtl, routing } from "@/i18n/routing";
import { getCachedAllHistory, getCachedSpot } from "@/lib/cached-fetchers";
import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";
import { pick, type LocaleText } from "@/lib/i18n-text";
import { loadFontsFor, OG_FONT_FAMILY } from "@/lib/og-font";
import {
  CARD_BG, CARD_DIM, CARD_DOWN, CARD_GOLD, CARD_MUTED, CARD_TEXT, CARD_UP,
  loadLogo, pickAccent, Words,
} from "@/lib/og-social";
import { resolveMarkets } from "@/lib/social-markets";
import { SOCIAL_PROFILES } from "@/lib/social";
import { dateLabel, fmtNum, spotDate } from "@/lib/seo";

/**
 * Carousel cover: /social/cover/post|story?lang=ar&countries=a,b,c
 *
 * Slide 1 of the daily 20-slide carousel. Three jobs in the two seconds it gets
 * in a feed: today's date, the headline ounce price and move, and every market
 * in the carousel so a follower sees their country and swipes. The market list
 * comes from the same `resolveMarkets` the generator script uses, so the cover
 * can never advertise a country the carousel does not contain.
 */
const SIZES = { post: { w: 1080, h: 1080 }, story: { w: 1080, h: 1920 } } as const;
type Format = keyof typeof SIZES;

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
  ar: "الدول المتوفرة",
  fr: "Marchés dans ce post",
  tr: "Bu gönderideki ülkeler",
  ur: "شامل ممالک",
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

/** What we offer that a single-country account cannot. Dots, not connectors:
 *  word-level layout keeps them evenly spaced at any size. */
const FEATURES: LocaleText[] = [
  { en: "46 countries", ar: "46 دولة", fr: "46 pays", tr: "46 ülke", ur: "46 ممالک", hi: "46 देश" },
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

  const [spot, hist, logo] = await Promise.all([
    getCachedSpot("XAU"),
    getCachedAllHistory("1mo"),
    loadLogo(),
  ]);
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
  const accent = pickAccent(when, Number(req.nextUrl.searchParams.get("theme")));
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
          alignItems: "center",
          background: CARD_BG,
          backgroundImage: `radial-gradient(circle at 50% 0%, ${accent.glow} 0%, ${CARD_BG} 62%)`,
          color: CARD_TEXT,
          fontFamily: OG_FONT_FAMILY,
          padding: isStory ? "230px 72px 330px" : "72px 64px",
        }}
      >
        {/* Brand mark, headline, date */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          {logo && <img src={logo} width={380 * scale} height={119 * scale} alt="" />}
          <div style={{ display: "flex", marginTop: 26 }}>
            <Words text={pick(lang, HEADLINE)} rtl={rtl} size={68 * scale} weight={700} />
          </div>
          <div style={{ display: "flex", marginTop: 14 }}>
            <Words text={dateLabel(lang, when, true)} rtl={rtl} size={30 * scale} color={CARD_DIM} />
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
          <Words text={pick(lang, OUNCE)} rtl={rtl} size={26 * scale} color={CARD_MUTED} />
          <div style={{ display: "flex", flexDirection: rtl ? "row-reverse" : "row", alignItems: "center", gap: 20, marginTop: 10 }}>
            <div style={{ display: "flex", fontSize: 68 * scale, fontWeight: 700, color: CARD_GOLD, lineHeight: 1 }}>
              {`$${fmtNum(spot.price, 2)}`}
            </div>
            {changePct !== null && (
              <div style={{ display: "flex", fontSize: 34 * scale, color: up ? CARD_UP : CARD_DOWN }}>
                {`${up ? "+" : "-"}${Math.abs(changePct).toFixed(2)}%`}
              </div>
            )}
          </div>
        </div>

        {/* Every market in the carousel */}
        <div style={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center" }}>
          <div style={{ display: "flex", marginBottom: 16 }}>
            <Words text={pick(lang, IN_MARKETS)} rtl={rtl} size={24 * scale} color={CARD_DIM} />
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: rtl ? "row-reverse" : "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {names.map((n) => (
              <div
                key={n}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 18px",
                  margin: 6,
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(226,181,78,0.25)",
                }}
              >
                <Words text={n} rtl={rtl} size={24 * scale} color={CARD_TEXT} />
              </div>
            ))}
          </div>
        </div>

        {/* Feature chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: rtl ? "row-reverse" : "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.en}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 20px",
                margin: 6,
                borderRadius: 14,
                background: `${accent.chip}1f`,
              }}
            >
              <Words text={pick(lang, f)} rtl={rtl} size={24 * scale} color={accent.chip} />
            </div>
          ))}
        </div>

        {/* Swipe hint — underlined rather than an arrow glyph, and the footer */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", gap: 22 }}>
          <div
            style={{
              display: "flex",
              paddingBottom: 12,
              borderBottom: `4px solid ${accent.chip}`,
            }}
          >
            <Words text={pick(lang, SWIPE)} rtl={rtl} size={30 * scale} color={CARD_TEXT} />
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
            <div style={{ display: "flex", color: accent.chip }}>{`@${handle}`}</div>
            <div style={{ display: "flex", color: CARD_GOLD }}>goldpricesarabia.com</div>
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
