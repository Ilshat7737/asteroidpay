// Icons sourced from spothq/cryptocurrency-icons (CC0-1.0, public domain):
// https://github.com/spothq/cryptocurrency-icons — stored locally at
// public/icons/coins/*.svg.
export function CoinIcon({ ticker, className }: { ticker: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-size static SVG icon, next/image adds no benefit here
    <img
      src={`/icons/coins/${ticker.toLowerCase()}.svg`}
      alt=""
      aria-hidden="true"
      className={`inline-block shrink-0 rounded-full ${className ?? ""}`}
    />
  );
}
