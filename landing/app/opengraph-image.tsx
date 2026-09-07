import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/logo-mark";

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
          justifyContent: "center",
          padding: 80,
          background: "#0B0C0A",
          color: "#F2F5EE",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <LogoMark size={56} />
          <div style={{ fontSize: 40, fontWeight: 700 }}>Asteroid Pay</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          Fast, low-fee crypto payments.
        </div>
        <div style={{ fontSize: 28, marginTop: 24, color: "#9BA595" }}>
          Fees from 0.3% · Settled in minutes · Built for reliability
        </div>
      </div>
    ),
    { ...size }
  );
}
