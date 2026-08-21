import { ImageResponse } from "next/og";

import { isRtl } from "@/i18n/routing";
import { fetchSpot } from "@/lib/goldapi";
import { pick } from "@/lib/i18n-text";
import { loadFontsFor, OG_FONT_FAMILY, rtlWords } from "@/lib/og-font";
import { dateLabel, fmtNum, gramUsd, karatDef, spotDate } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Live gold price";

// Script-capable fonts for Satori — without them, Arabic glyphs crash the
// render ("lookupType 5 … not supported" from the auto-fetched fallback font).
// Font bytes come from lib/og-font.ts (fs read, traced into the bundle).

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; karat: string }>;
}) {
  // Next 16 passes `params` as a Promise — the previous sync destructure left
  // `karat` undefined and 500'd every karat social card.
  const { locale, karat } = await params;
  const rtl = isRtl(locale);
  const def = karatDef(karat) ?? karatDef("24k")!;
  const spot = await fetchSpot("XAU").catch(() => null);
  const gram = spot ? gramUsd(spot, def.key) : 0;
  const ounce = spot ? (spot.price * def.purity) : 0;
  const when = spotDate(spot);
  const k = def.label.replace("K", "");
  const oz = fmtNum(ounce, 0);

  const brand = pick(locale, { en: "Gold Prices Arabia", ar: "أسعار الذهب العربية" });
  const title = pick(locale, {
    en: `${def.label} Gold Price Today`,
    ar: `سعر الذهب اليوم عيار ${k}`,
    fr: `Prix de l'or ${k} carats aujourd'hui`,
    tr: `Bugün ${k} ayar altın fiyatı`,
    ur: `آج سونے کی قیمت ${k} قیراط`,
    hi: `आज ${k} कैरेट सोने का भाव`,
  });
  const unitLine = pick(locale, {
    en: `USD per gram · ${def.pct} purity`,
    ar: `دولار أمريكي للجرام · نقاء ${def.pct}`,
    fr: `USD le gramme · pureté ${def.pct}`,
    tr: `Gram başına USD · saflık ${def.pct}`,
    ur: `امریکی ڈالر فی گرام · خالصیت ${def.pct}`,
    hi: `USD प्रति ग्राम · शुद्धता ${def.pct}`,
  });
  const ozLine = pick(locale, {
    en: `$${oz} per troy ounce`,
    ar: `${oz} دولار للأونصة`,
    fr: `${oz} $ l'once troy`,
    tr: `Troy ons başına ${oz} $`,
    ur: `${oz} ڈالر فی ٹرائے اونس`,
    hi: `${oz} $ प्रति ट्रॉय औंस`,
  });
  const liveLine = pick(locale, {
    en: "Live · Binance · Coinbase · Kraken",
    ar: "تحديث لحظي · Binance · Coinbase · Kraken",
    fr: "En direct · Binance · Coinbase · Kraken",
    tr: "Canlı · Binance · Coinbase · Kraken",
    ur: "براہ راست · Binance · Coinbase · Kraken",
    hi: "लाइव · Binance · Coinbase · Kraken",
  });
  const dateLine = when ? dateLabel(locale, when, true) : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0b0a08 0%, #1a1209 60%, #2a1d0c 100%)",
          padding: 72,
          fontFamily: OG_FONT_FAMILY,
          color: "#f4efe4",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: rtl ? "row-reverse" : "row",
          }}
        >
          <div style={{ color: "#e2b54e", fontSize: 26, fontWeight: 600 }}>{rtlWords(brand, rtl)}</div>
          <div style={{ color: "#8f8875", fontSize: 22 }}>{rtlWords(dateLine, rtl)}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: rtl ? "flex-end" : "flex-start" }}>
          <div style={{ fontSize: 40, color: "#b9b2a1", lineHeight: 1.2 }}>{rtlWords(title, rtl)}</div>
          <div
            style={{
              fontSize: 148,
              fontWeight: 600,
              color: "#e2b54e",
              lineHeight: 1,
              marginTop: 12,
              letterSpacing: -4,
            }}
          >
            {gram > 0 ? `$${fmtNum(gram)}` : "—"}
          </div>
          <div style={{ fontSize: 32, color: "#f4efe4", marginTop: 14, opacity: 0.9 }}>
            {rtlWords(unitLine, rtl)}
          </div>
          <div style={{ fontSize: 26, color: "#8f8875", marginTop: 8 }}>{rtlWords(ozLine, rtl)}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#8f8875",
            flexDirection: rtl ? "row-reverse" : "row",
          }}
        >
          <div>{rtlWords(liveLine, rtl)}</div>
          <div style={{ color: "#e2b54e" }}>goldpricesarabia.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: await loadFontsFor(locale),
    },
  );
}
