import { ImageResponse } from "next/og";

import { fetchSpot } from "@/lib/goldapi";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Live gold price";

const PURITY: Record<string, { ratio: number; pct: string }> = {
  "24k": { ratio: 0.999, pct: "99.9%" },
  "21k": { ratio: 0.875, pct: "87.5%" },
  "18k": { ratio: 0.75, pct: "75%" },
  "14k": { ratio: 0.583, pct: "58.3%" },
};

export default async function Image({
  params,
}: {
  params: { locale: string; karat: string };
}) {
  const { locale, karat } = params;
  const p = PURITY[karat.toLowerCase()] ?? PURITY["24k"];
  const spot = await fetchSpot("XAU").catch(() => null);
  const grams24k = spot?.price_gram_24k ?? 0;
  const pricePerGram = grams24k > 0 ? (grams24k * (p.ratio / 0.999)).toFixed(2) : "—";
  const pricePerOunce = spot?.price ? (spot.price * (p.ratio / 0.999)).toFixed(0) : "—";

  const titleAr = `سعر الذهب ${karat.toUpperCase()}`;
  const titleEn = `${karat.toUpperCase()} Gold Price`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1209 60%, #2a1d0c 100%)",
          padding: 80,
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              background: "linear-gradient(135deg, #fde68a 0%, #f5c518 60%, #b8860b 100%)",
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#1a1209",
            }}
          >
            G
          </div>
          <div style={{ color: "#f5c518", fontSize: 24, fontWeight: 600 }}>
            Gold Prices Arabia
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 60,
            flex: 1,
          }}
        >
          <div style={{ fontSize: 32, color: "#8a8a8a", letterSpacing: 2 }}>
            {locale === "ar" ? titleAr : titleEn}
          </div>
          <div
            style={{
              fontSize: 132,
              fontWeight: 800,
              color: "#f5c518",
              marginTop: 8,
              letterSpacing: -4,
              lineHeight: 1,
            }}
          >
            ${pricePerGram}
          </div>
          <div style={{ fontSize: 36, color: "#fff", marginTop: 16, opacity: 0.85 }}>
            per gram · {p.pct} purity
          </div>
          <div style={{ fontSize: 28, color: "#8a8a8a", marginTop: 8 }}>
            ${pricePerOunce} / troy ounce
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "#5a5a5a",
            fontSize: 22,
          }}
        >
          <div>Live · Updated every second</div>
          <div style={{ color: "#f5c518" }}>goldpricesarabia.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
