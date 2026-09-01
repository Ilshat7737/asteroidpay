// Icons sourced from spothq/cryptocurrency-icons (CC0-1.0, public domain):
// https://github.com/spothq/cryptocurrency-icons — stored locally at
// public/icons/networks/*.svg.
const NETWORK_ICON_FILES: Record<string, string> = {
  bitcoin: "btc",
  ethereum: "eth",
  tron: "trx",
  "bnb-smart-chain": "bnb",
  polygon: "matic",
  solana: "sol",
};

export function NetworkIcon({ networkId, className }: { networkId: string; className?: string }) {
  const file = NETWORK_ICON_FILES[networkId];
  if (!file) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element -- fixed-size static SVG icon, next/image adds no benefit here
    <img
      src={`/icons/networks/${file}.svg`}
      alt=""
      aria-hidden="true"
      className={`inline-block shrink-0 rounded-full ${className ?? ""}`}
    />
  );
}
