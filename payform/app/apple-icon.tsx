import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/logo-mark";

// Matches landing/app/apple-icon.tsx — same 180x180 icon, duplicated component.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <LogoMark size={180} />
      </div>
    ),
    { ...size }
  );
}
