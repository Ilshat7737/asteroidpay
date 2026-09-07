import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/logo-mark";

// Minimal, brand-only card — unlike landing's, this carries no marketing
// copy, since a shared invoice/wallet link has no fixed headline to show.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          gap: 24,
          background: "#0B0C0A",
          color: "#F2F5EE",
        }}
      >
        <LogoMark size={96} />
        <div style={{ fontSize: 48, fontWeight: 700 }}>Asteroid Pay</div>
        <div style={{ fontSize: 28, color: "#9BA595" }}>Secure crypto payment</div>
      </div>
    ),
    { ...size }
  );
}
