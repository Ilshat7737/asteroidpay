// The final AsteroidPay emblem, supplied by the user as two flat SVGs, kept
// as source references at components/images/originals/:
// AsteroidPay-Emblem-W-V1.svg (white — used here, since every context this
// renders in on this site has a dark background: navbar, footer, modals,
// and the opengraph/icon routes' own dark canvases) and
// AsteroidPay-Emblem-B-V1.svg (black — kept for any future light-background
// context; nothing currently consumes it). Geometry copied verbatim from
// the white variant's single <path>.
//
// Renders as a bare glyph with no background badge/frame — the previous
// accent-colored rounded-square backdrop has been removed per explicit
// instruction. logo.tsx, app/icon.tsx, app/apple-icon.tsx, and
// app/opengraph-image.tsx all consume this one file.
//
// Uses only a single <path> with a solid fill (no gradients/filters), so it
// renders identically via Tailwind in the browser and via next/og's
// ImageResponse (satori) in app/icon.tsx, app/apple-icon.tsx, and
// app/opengraph-image.tsx.

const WHITE = "#fff";

export function LogoMark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 364.5 364.5"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        fill={WHITE}
        d="M311.12,53.38C278.14,20.4,232.58,0,182.25,0,81.6,0,0,81.6,0,182.25v182.25l53.38-53.38c32.98,32.98,78.54,53.38,128.87,53.38,100.65,0,182.25-81.6,182.25-182.25V0l-53.38,53.38ZM182.25,296.62c-63.17,0-114.38-51.21-114.38-114.38s51.21-114.38,114.38-114.38,114.38,51.21,114.38,114.38-51.21,114.38-114.38,114.38Z"
      />
    </svg>
  );
}
