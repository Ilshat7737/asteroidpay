// Temporary placeholder for the AsteroidPay "A" mark, pending the final
// asset from the user. logo.tsx, app/icon.tsx, app/apple-icon.tsx, and
// app/opengraph-image.tsx all consume this one file, so replacing the asset
// later only requires editing here (or swapping this component's internals
// for an <img>/next/image if the final asset is a raster/vector file rather
// than inline paths).
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
      <path d="M22 10 12 34" stroke={INK} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 10 32 34" stroke={INK} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.2 24H27.8" stroke={INK} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}
