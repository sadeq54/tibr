import { ImageResponse } from "next/og";

import { fetchSpot } from "@/lib/goldapi";
import { loadArabicFont, rtlWords } from "@/lib/og-font";
import { dateLabel, fmtNum, gramUsd, karatDef, spotDate } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Live gold price";

// Arabic-capable font for Satori — without it, Arabic glyphs crash the render
// ("lookupType 5 … not supported" from the auto-fetched fallback font).
// Font bytes come from lib/og-font.ts (fs read, traced into the bundle).

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; karat: string }>;
}) {
  // Next 16 passes `params` as a Promise — the previous sync destructure left
  // `karat` undefined and 500'd every karat social card.
  const { locale, karat } = await params;
  const ar = locale === "ar";
  const def = karatDef(karat) ?? karatDef("24k")!;
  const spot = await fetchSpot("XAU").catch(() => null);
  const gram = spot ? gramUsd(spot, def.key) : 0;
  const ounce = spot ? (spot.price * def.purity) : 0;
  const when = spotDate(spot);
  const kAr = def.label.replace("K", "");

  const title = ar ? `سعر الذهب اليوم عيار ${kAr}` : `${def.label} Gold Price Today`;
  const unitLine = ar
    ? `دولار أمريكي للجرام · نقاء ${def.pct}`
    : `USD per gram · ${def.pct} purity`;
  const ozLine = ar
    ? `${fmtNum(ounce, 0)} دولار للأونصة`
    : `$${fmtNum(ounce, 0)} per troy ounce`;
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
          fontFamily: "ArabicSans, system-ui, sans-serif",
          color: "#f4efe4",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: ar ? "row-reverse" : "row",
          }}
        >
          <div style={{ color: "#e2b54e", fontSize: 26, fontWeight: 600 }}>
            {ar ? rtlWords("أسعار الذهب العربية") : "Gold Prices Arabia"}
          </div>
          <div style={{ color: "#8f8875", fontSize: 22 }}>{rtlWords(dateLine, ar)}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: ar ? "flex-end" : "flex-start" }}>
          <div style={{ fontSize: 40, color: "#b9b2a1", lineHeight: 1.2 }}>{rtlWords(title, ar)}</div>
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
            {rtlWords(unitLine, ar)}
          </div>
          <div style={{ fontSize: 26, color: "#8f8875", marginTop: 8 }}>{rtlWords(ozLine, ar)}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#8f8875",
            flexDirection: ar ? "row-reverse" : "row",
          }}
        >
          <div>{ar ? rtlWords("تحديث لحظي · Binance · Coinbase · Kraken") : "Live · Binance · Coinbase · Kraken"}</div>
          <div style={{ color: "#e2b54e" }}>goldpricesarabia.com</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "ArabicSans", data: await loadArabicFont(), weight: 600, style: "normal" }],
    },
  );
}
