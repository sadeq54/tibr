import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Gold Prices Arabia — Live gold for MENA";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #161616 100%)",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            width: 220,
            height: 220,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, #fde68a 0%, #f5c518 40%, #b8860b 80%, #5a3a08 100%)",
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            color: "#1a1209",
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: -6,
          }}
        >
          G
        </div>
        <div
          style={{
            color: "#f5c518",
            fontSize: 72,
            fontWeight: 700,
            marginTop: 36,
            letterSpacing: -1,
            textAlign: "center",
          }}
        >
          Gold Prices Arabia
        </div>
        <div
          style={{
            color: "#8a8a8a",
            fontSize: 26,
            marginTop: 12,
            fontWeight: 400,
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Live gold prices · USD · JOD · SAR · AED · EGP · 46 countries
        </div>
        <div
          style={{
            color: "#5a5a5a",
            fontSize: 22,
            marginTop: 24,
            fontWeight: 500,
            letterSpacing: 1,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          goldpricesarabia.com
        </div>
      </div>
    ),
    { ...size },
  );
}
