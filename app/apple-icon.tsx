import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f5c518 0%, #d4a82a 60%, #8a6a18 100%)",
            color: "#0a0a0a",
            fontSize: 96,
            fontWeight: 800,
            fontFamily: "system-ui",
            letterSpacing: -4,
            boxShadow: "0 8px 24px rgba(245,197,24,0.3)",
          }}
        >
          T
        </div>
      </div>
    ),
    { ...size }
  );
}
