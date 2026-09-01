// Icons sourced from spothq/cryptocurrency-icons (CC0-1.0, public domain):
// https://github.com/spothq/cryptocurrency-icons — stored locally at
// components/images/coins/*.svg (shared with CoinIcon; a network's icon is
// just its native/primary coin's icon, so there's no separate networks/ set).
import Image from "next/image";
import btc from "@/components/images/coins/btc.svg";
import eth from "@/components/images/coins/eth.svg";
import trx from "@/components/images/coins/trx.svg";
import bnb from "@/components/images/coins/bnb.svg";
import matic from "@/components/images/coins/matic.svg";
import sol from "@/components/images/coins/sol.svg";

const NETWORK_ICONS: Record<string, typeof btc> = {
  bitcoin: btc,
  ethereum: eth,
  tron: trx,
  "bnb-smart-chain": bnb,
  polygon: matic,
  solana: sol,
};

export function NetworkIcon({ networkId, className }: { networkId: string; className?: string }) {
  const src = NETWORK_ICONS[networkId];
  if (!src) return null;

  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={24}
      height={24}
      className={`inline-block shrink-0 rounded-full ${className ?? ""}`}
    />
  );
}
