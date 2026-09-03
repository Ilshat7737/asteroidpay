import { ImageResponse } from "next/og";
import { LogoMark } from "@/components/logo-mark";

// Matches the existing app/apple-icon.png dimensions (180x180).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {/* Full-bleed "App icon / favicon" swatch, matching the style tile's 48px preview. */}
        <LogoMark size={180} variant="full" strokeWidth={3.4} />
      </div>
    ),
    { ...size }
  );
}
