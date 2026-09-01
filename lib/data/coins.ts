// Representative list of well-known market coins for the trust-bar marquee —
// illustrative of breadth, not a live-ranked or exhaustive list. Icons are
// sourced from spothq/cryptocurrency-icons (CC0-1.0, public domain):
// https://github.com/spothq/cryptocurrency-icons — stored locally at
// public/icons/coins/*.svg.
export interface Coin {
  ticker: string;
  name: string;
}

export const coins: Coin[] = [
  { ticker: "BTC", name: "Bitcoin" },
  { ticker: "ETH", name: "Ethereum" },
  { ticker: "USDT", name: "Tether" },
  { ticker: "XRP", name: "XRP" },
  { ticker: "BNB", name: "BNB" },
  { ticker: "SOL", name: "Solana" },
  { ticker: "USDC", name: "USD Coin" },
  { ticker: "TRX", name: "TRON" },
  { ticker: "DOGE", name: "Dogecoin" },
  { ticker: "ADA", name: "Cardano" },
  { ticker: "LINK", name: "Chainlink" },
  { ticker: "AVAX", name: "Avalanche" },
  { ticker: "XLM", name: "Stellar" },
  { ticker: "LTC", name: "Litecoin" },
  { ticker: "DOT", name: "Polkadot" },
  { ticker: "BCH", name: "Bitcoin Cash" },
  { ticker: "UNI", name: "Uniswap" },
  { ticker: "ETC", name: "Ethereum Classic" },
  { ticker: "ICP", name: "Internet Computer" },
  { ticker: "XMR", name: "Monero" },
  { ticker: "MATIC", name: "Polygon" },
  { ticker: "VET", name: "VeChain" },
  { ticker: "FIL", name: "Filecoin" },
  { ticker: "ATOM", name: "Cosmos" },
  { ticker: "STX", name: "Stacks" },
  { ticker: "GRT", name: "The Graph" },
  { ticker: "MKR", name: "Maker" },
  { ticker: "AAVE", name: "Aave" },
  { ticker: "ALGO", name: "Algorand" },
  { ticker: "QNT", name: "Quant" },
  { ticker: "SAND", name: "The Sandbox" },
  { ticker: "MANA", name: "Decentraland" },
  { ticker: "THETA", name: "Theta Network" },
  { ticker: "COMP", name: "Compound" },
  { ticker: "SNX", name: "Synthetix" },
  { ticker: "CRV", name: "Curve DAO" },
  { ticker: "ZEC", name: "Zcash" },
  { ticker: "DASH", name: "Dash" },
  { ticker: "XTZ", name: "Tezos" },
  { ticker: "WAVES", name: "Waves" },
  { ticker: "BAT", name: "Basic Attention Token" },
  { ticker: "ZRX", name: "0x Protocol" },
  { ticker: "REN", name: "Ren" },
  { ticker: "YFI", name: "yearn.finance" },
  { ticker: "SUSHI", name: "SushiSwap" },
  { ticker: "EOS", name: "EOS" },
  { ticker: "NEO", name: "NEO" },
  { ticker: "QTUM", name: "Qtum" },
  { ticker: "ONE", name: "Harmony" },
  { ticker: "STORJ", name: "Storj" },
];
