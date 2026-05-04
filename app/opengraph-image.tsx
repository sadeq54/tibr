import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Tibr — Live gold prices for the Arab world";

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
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            width: 220,
            height: 220,
            borderRadius: 110,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f5c518 0%, #d4a82a 60%, #8a6a18 100%)",
            color: "#0a0a0a",
            fontSize: 156,
            fontWeight: 800,
            letterSpacing: -8,
            boxShadow: "0 12px 48px rgba(245,197,24,0.4)",
          }}
        >
          T
        </div>
        <div
          style={{
            color: "#f5c518",
            fontSize: 84,
            fontWeight: 800,
            marginTop: 32,
            letterSpacing: -2,
          }}
        >
          Tibr
        </div>
        <div
          style={{
            color: "#8a8a8a",
            fontSize: 28,
            marginTop: 12,
            fontWeight: 400,
          }}
        >
          Live gold prices · USD · JOD · SAR · AED · EGP
        </div>
      </div>
    ),
    { ...size }
  );
}
