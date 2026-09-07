export interface Network {
  id: string;
  name: string;
  ticker: string;
  standard: string;
  description: string;
}

export const networks: Network[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    ticker: "BTC",
    standard: "Native",
    description: "The most trusted and liquid network — best for larger, less time-sensitive settlements.",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    ticker: "ETH",
    standard: "ERC-20",
    description: "The widest token support, including USDT, USDC, and DAI — confirms in a few minutes.",
  },
  {
    id: "tron",
    name: "Tron",
    ticker: "USDT",
    standard: "TRC-20",
    description: "The cheapest and most widely used network for USDT transfers globally.",
  },
  {
    id: "bnb-smart-chain",
    name: "BNB Smart Chain",
    ticker: "BNB",
    standard: "BEP-20",
    description: "Low fees and fast confirmations, backed by a broad DeFi ecosystem.",
  },
  {
    id: "polygon",
    name: "Polygon",
    ticker: "MATIC",
    standard: "ERC-20 compatible",
    description: "Near-instant confirmations with sub-cent fees — ideal for small, frequent payments.",
  },
  {
    id: "solana",
    name: "Solana",
    ticker: "SOL",
    standard: "SPL",
    description: "Sub-second finality and very high throughput for high-volume merchants.",
  },
];
