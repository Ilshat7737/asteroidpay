// The KShost "K-flow" mark: the lower leg of the K is drawn as an outgoing
// arrow (a payment leaving the gateway). Geometry extracted verbatim from the
// approved Task 1 style tile (Claude Design canvas, "The K-flow mark" section,
// "Primary lockup" / "App icon / favicon" swatches) — do not redraw or
// approximate; edit the source tile first if the mark needs to change.
//
// Uses only <svg>/<rect>/<path> with solid fills and strokes (no gradients or
// filters), so it renders identically via Tailwind in the browser and via
// next/og's ImageResponse (satori) in app/icon.tsx, app/apple-icon.tsx and
// app/opengraph-image.tsx.

const ACCENT = "#CDE833";
const INK = "#0B0C0A";

export function LogoMark({
  size = 28,
  variant = "inset",
  strokeWidth = 3.4,
  className,
}: {
  size?: number;
  /** "inset" = primary lockup, paired with the wordmark on a dark ground. */
  /** "full" = edge-to-edge square, used for the app icon / favicon routes. */
  variant?: "inset" | "full";
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      {variant === "inset" ? (
        <rect x="0.5" y="0.5" width="43" height="43" rx="13" fill={ACCENT} />
      ) : (
        <rect width="44" height="44" rx="13" fill={ACCENT} />
      )}
      <path d="M15 12V32" stroke={INK} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path
        d="M29.5 12L17.5 22L29.5 32"
        stroke={INK}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M22.5 22H33" stroke={INK} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}
