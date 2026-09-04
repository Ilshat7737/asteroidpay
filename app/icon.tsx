import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/logo-mark";

// Matches the existing app/icon.png dimensions (32x32).
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LogoMark size={32} />
      </div>
    ),
    { ...size }
  );
}
