import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 13,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #f5c518 0%, #d4a82a 60%, #8a6a18 100%)",
            color: "#0a0a0a",
            fontSize: 18,
            fontWeight: 800,
            fontFamily: "system-ui",
            letterSpacing: -1,
          }}
        >
          T
        </div>
      </div>
    ),
    { ...size }
  );
}
