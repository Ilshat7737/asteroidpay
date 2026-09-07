// Duplicated from landing/components/logo-mark.tsx — kept identical so the
// two independently-deployed apps still show the same brand mark. If the
// mark ever changes, update both copies.
//
// The AsteroidPay emblem. Renders as a bare glyph with no background
// badge/frame. Uses only a single <path> with a solid fill (no gradients/
// filters), so it renders identically via Tailwind in the browser and via
// next/og's ImageResponse (satori) in app/icon.tsx, app/apple-icon.tsx, and
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
