import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/logo-mark";

// Matches the existing app/apple-icon.png dimensions (180x180).
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
