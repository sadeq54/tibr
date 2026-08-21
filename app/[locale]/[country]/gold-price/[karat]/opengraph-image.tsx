import { ImageResponse } from "next/og";

import { COUNTRY_BY_SLUG, countryName } from "@/lib/countries";
import { fetchFxRates } from "@/lib/fx";
import { fetchSpot } from "@/lib/goldapi";
import { loadArabicFont, rtlWords } from "@/lib/og-font";
import { currencyName, dateLabel, fmtNum, gramUsd, karatDef, spotDate } from "@/lib/seo";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Gold price today by country";

// Font bytes come from lib/og-font.ts (fs read, traced into the bundle).

/**
 * Country × karat social card: the live per-gram price in the local currency
 * with today's date — what people actually share ("سعر الذهب اليوم في الأردن").
 * Next picks this up automatically for og:image on the route segment.
 */
export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; country: string; karat: string }>;
}) {
  const { locale, country: slug, karat } = await params;
  const country = COUNTRY_BY_SLUG[slug];
  const def = karatDef(karat) ?? karatDef("24k")!;
  const ar = locale === "ar";
  const [spot, fx] = await Promise.all([
    fetchSpot("XAU").catch(() => null),
    fetchFxRates().catch(() => null),
  ]);
  const currency = country?.currency ?? "USD";
  const rawRate = currency === "USD" ? 1 : (fx?.[currency] as number | undefined);
  const rate = typeof rawRate === "number" && Number.isFinite(rawRate) && rawRate > 0 ? rawRate : null;
  const gram = spot && rate ? gramUsd(spot, karat) * rate : 0;
  const name = country ? countryName(country, locale) : "";
  const when = spotDate(spot);
  const cur = currencyName(rate ? currency : "USD", locale);
  const kAr = def.label.replace("K", "");

  const title = ar
    ? `سعر الذهب اليوم في ${name} عيار ${kAr}`
    : `Gold Price Today in ${name} (${def.label})`;
  const priceLine = gram > 0 ? fmtNum(gram, gram > 500 ? 0 : 2) : "—";
  const unitLine = ar ? `${cur} للجرام · نقاء ${def.pct}` : `${cur} per gram · ${def.pct} purity`;
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
            {priceLine}
          </div>
          <div style={{ fontSize: 32, color: "#f4efe4", marginTop: 14, opacity: 0.9 }}>
            {rtlWords(unitLine, ar)}
          </div>
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
