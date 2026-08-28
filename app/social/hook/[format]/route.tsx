import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { isRtl, routing } from "@/i18n/routing";
import { getCachedAllHistory, getCachedFxRates, getCachedSpot } from "@/lib/cached-fetchers";
import { COUNTRY_BY_SLUG } from "@/lib/countries";
import { pick, type LocaleText } from "@/lib/i18n-text";
import { loadFontsFor, OG_FONT_FAMILY } from "@/lib/og-font";
import {
  CARD_BG, CARD_DIM, CARD_DOWN, CARD_GOLD, CARD_MUTED, CARD_TEXT, CARD_UP,
  pickAccent, Words,
} from "@/lib/og-social";
import { resolveMarkets } from "@/lib/social-markets";
import { currencyName, dateLabel, fmtNum, gramUsd, spotDate } from "@/lib/seo";

/**
 * Reel hook frame: /social/hook/story?lang=ar&countries=a,b,c
 *
 * The first frame of a reel, and the only one that decides whether the rest is
 * ever seen. Instagram stops distributing a reel that gets skipped in the
 * opening seconds, so this frame has one job: give a reason to stay, in the
 * time it takes a thumb to move.
 *
 * What it deliberately does NOT do is what the carousel cover does. No logo, no
 * brand name, no "أسعار الذهب" title — a viewer scrolling at speed does not
 * care who is speaking, and two seconds of identity is two seconds of nothing.
 * The old reels opened on the cover card and the first real number appeared at
 * second three; by then the skip has already happened.
 *
 * So: the move, in the largest type on the frame and colour-coded, then the
 * headline price, then a promise of what comes next. Every word is legible with
 * the sound off, which is how most of this audience watches.
 */
const SIZES = { post: { w: 1080, h: 1080 }, story: { w: 1080, h: 1920 } } as const;
type Format = keyof typeof SIZES;

const UP_WORD: LocaleText = {
  en: "Gold is up", ar: "الذهب صاعد", fr: "L'or monte", tr: "Altın yükseldi", ur: "سونا اوپر", hi: "सोना ऊपर",
};
const DOWN_WORD: LocaleText = {
  en: "Gold is down", ar: "الذهب نازل", fr: "L'or baisse", tr: "Altın düştü", ur: "سونا نیچے", hi: "सोना नीचे",
};
const FLAT_WORD: LocaleText = {
  en: "Gold today", ar: "الذهب اليوم", fr: "L'or aujourd'hui", tr: "Bugün altın", ur: "آج سونا", hi: "आज सोना",
};
const OUNCE: LocaleText = {
  en: "the ounce", ar: "الأونصة", fr: "l'once", tr: "ons", ur: "اونس", hi: "औंस",
};
/** The reason to keep watching: their own country is seconds away. */
const PROMISE: LocaleText = {
  en: "your country's gram price next",
  ar: "سعر الجرام في بلدك بعد ثوانٍ",
  fr: "le prix au gramme chez vous",
  tr: "ülkenizdeki gram fiyatı birazdan",
  ur: "آپ کے ملک میں گرام کی قیمت ابھی",
  hi: "आपके देश का ग्राम भाव अभी",
};
const KARAT_LINE: LocaleText = {
  en: "21K · per gram", ar: "عيار 21 · للجرام", fr: "18K · par gramme", tr: "21 ayar · gram", ur: "21 قیراط · فی گرام", hi: "21K · प्रति ग्राम",
};

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

  const [spot, hist, fx] = await Promise.all([
    getCachedSpot("XAU"),
    getCachedAllHistory("1mo"),
    getCachedFxRates(),
  ]);
  if (!spot) return new Response("No data", { status: 503 });

  const series = (hist.XAU ?? []).map((p) => p.close).filter((n) => Number.isFinite(n) && n > 0);
  const prevClose = series.length > 1 ? series[series.length - 2] : null;
  const changePct = prevClose ? ((spot.price - prevClose) / prevClose) * 100 : null;
  const up = (changePct ?? 0) >= 0;
  const moved = changePct !== null && Math.abs(changePct) >= 0.05;

  const when = spotDate(spot) ?? new Date();

  // The first market of the carousel doubles as the teaser price: it is the
  // one the largest share of this audience is actually looking for.
  const markets = resolveMarkets(req.nextUrl.searchParams.get("countries"));
  const lead = COUNTRY_BY_SLUG[markets[0] ?? "saudi-arabia"];
  const rawRate = lead && lead.currency !== "USD" ? (fx[lead.currency] as number | undefined) : 1;
  const rate = typeof rawRate === "number" && Number.isFinite(rawRate) && rawRate > 0 ? rawRate : 1;
  const leadGram = lead ? gramUsd(spot, "21k") * rate : null;
  const leadCurrency = lead && rate === 1 && lead.currency !== "USD" ? "USD" : lead?.currency;

  const { w, h } = SIZES[format];
  const isStory = format === "story";
  const scale = isStory ? 1.06 : 1;
  const accent = pickAccent(when, Number(req.nextUrl.searchParams.get("theme")));
  const overlay = req.nextUrl.searchParams.get("overlay") === "1";
  const moveColor = up ? CARD_UP : CARD_DOWN;
  const fonts = await loadFontsFor(lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          ...(overlay
            ? {}
            : {
                background: CARD_BG,
                backgroundImage: `radial-gradient(circle at 50% 40%, ${accent.glow} 0%, ${CARD_BG} 68%)`,
              }),
          color: CARD_TEXT,
          fontFamily: OG_FONT_FAMILY,
          padding: isStory ? "0 72px" : "0 64px",
        }}
      >
        {/* The verdict, in the biggest type on the frame. Two words. */}
        <div style={{ display: "flex", marginBottom: 8 }}>
          <Words
            text={pick(lang, moved ? (up ? UP_WORD : DOWN_WORD) : FLAT_WORD)}
            rtl={rtl}
            size={92 * scale}
            weight={700}
          />
        </div>

        {/* The number that justifies the verdict.
            The arrow is an SVG polygon, and it took two tries to get there.
            Typing ▲/▼ (U+25B2/U+25BC) fails: they are absent from the Arabic
            font subset and Satori draws a missing glyph as a tofu box instead
            of falling back. The CSS zero-width/transparent-border triangle
            fails too — Satori does not resolve `border: transparent` into a
            shape and rendered a solid square. An inline <svg> polygon is the
            one approach with no font dependency and no layout-engine
            assumption; verify any change to it by looking at the PNG. */}
        {changePct !== null && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <svg
              width={68 * scale}
              height={50 * scale}
              viewBox="0 0 68 50"
              style={{ marginRight: 26 }}
            >
              <polygon points={up ? "34,0 68,50 0,50" : "0,0 68,0 34,50"} fill={moveColor} />
            </svg>
            <div
              style={{
                display: "flex",
                fontSize: 150 * scale,
                fontWeight: 700,
                color: moveColor,
                lineHeight: 1.05,
              }}
            >
              {`${up ? "+" : "−"}${Math.abs(changePct).toFixed(2)}%`}
            </div>
          </div>
        )}

        {/* Headline ounce, small — context, not the hook. */}
        <div
          style={{
            display: "flex",
            flexDirection: rtl ? "row-reverse" : "row",
            alignItems: "center",
            marginTop: 26,
          }}
        >
          <div style={{ display: "flex", fontSize: 54 * scale, fontWeight: 700, color: CARD_GOLD }}>
            {`$${fmtNum(spot.price, 2)}`}
          </div>
          <div style={{ display: "flex", marginLeft: 16, marginRight: 16 }}>
            <Words text={pick(lang, OUNCE)} rtl={rtl} size={32 * scale} color={CARD_MUTED} />
          </div>
        </div>

        {/* The lead market's gram price: proof the reel pays off, not a claim. */}
        {leadGram !== null && Number.isFinite(leadGram) && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: isStory ? 64 : 40,
              padding: "26px 44px",
              borderRadius: 28,
              background: "rgba(226,181,78,0.10)",
              border: `1px solid ${accent.chip}55`,
            }}
          >
            <Words text={pick(lang, KARAT_LINE)} rtl={rtl} size={28 * scale} color={CARD_DIM} />
            <div
              style={{
                display: "flex",
                flexDirection: rtl ? "row-reverse" : "row",
                alignItems: "baseline",
                marginTop: 10,
              }}
            >
              <div style={{ display: "flex", fontSize: 66 * scale, fontWeight: 700, color: CARD_TEXT }}>
                {fmtNum(leadGram, leadGram >= 1000 ? 1 : 2)}
              </div>
              {/* The reader's own currency, spelled the way the country cards
                  spell it — "ر.س.", not the ISO code. */}
              <div style={{ display: "flex", marginLeft: 14, marginRight: 14 }}>
                <Words
                  text={leadCurrency ? currencyName(leadCurrency, lang) : ""}
                  rtl={rtl}
                  size={30 * scale}
                  color={CARD_MUTED}
                />
              </div>
            </div>
          </div>
        )}

        {/* Why to keep watching. */}
        <div style={{ display: "flex", marginTop: isStory ? 56 : 34 }}>
          <Words text={pick(lang, PROMISE)} rtl={rtl} size={34 * scale} color={CARD_GOLD} />
        </div>

        <div style={{ display: "flex", marginTop: 18 }}>
          <Words text={dateLabel(lang, when, true)} rtl={rtl} size={24 * scale} color={CARD_DIM} />
        </div>
      </div>
    ),
    { width: w, height: h, fonts },
  );
}
