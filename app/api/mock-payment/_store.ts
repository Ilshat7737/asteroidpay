// Temporary mock backend — see README.md in this directory. Delete before merge.
//
// In-memory per-uuid invoice state, mimicking what api-payment.asteroidpay.io
// tracks server-side across the info/currencies/methods/confirms calls.

export interface MockInvoice {
  uuid: string;
  kind: "invoice" | "wallet";
  amount: string;
  currency: string;
  equivalent_currency: string;
  payer_currency: string | null;
  network: string | null;
  token_standard: string | null;
  address: string | null;
  contract_address: string | null;
  contract_explorer_url: string | null;
  payer_amount: string | null;
  payer_amount_equivalent: string | null;
  txid: string | null;
  tx_url: string | null;
  from: string | null;
  status: string;
  is_final: boolean;
  created_at: string;
  expired_at: string;
  confirms: number;
  need_confirms: number;
  block: number;
}

const store = new Map<string, MockInvoice>();

const NETWORK_ADDRESSES: Record<string, { address: string; contract: string | null; explorer: string | null }> = {
  bsc: {
    address: "0x9f3a7c2d8b1e4f6a0c5d9e2b7a1f3c8d6e4b2a9c",
    contract: "0x55d398326f99059ff775485246999027b3197955",
    explorer: "https://bscscan.com/address/0x55d398326f99059ff775485246999027b3197955",
  },
  eth: {
    address: "0x5a8f556892db7950130ad9cd09ca33141961ab57",
    contract: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    explorer: "https://etherscan.io/address/0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  tron: {
    address: "TXo4VDm8Qq8xJp3kZ2c9f6h1s7d5b4n3m2l1k9j8i7",
    contract: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
    explorer: "https://tronscan.org/#/contract/TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
  },
  polygon: {
    address: "0x2c1a9d3b8e7f6c4a0b5d9e2b7a1f3c8d6e4b2a9c",
    contract: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    explorer: "https://polygonscan.com/address/0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  },
  bitcoin: {
    address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    contract: null,
    explorer: null,
  },
  solana: {
    address: "5FHwkrdxntdK24hgQU8qgBjn35Y1zwhz1GZwCkP2h87N",
    contract: null,
    explorer: null,
  },
};

const NEED_CONFIRMS: Record<string, number> = {
  bitcoin: 2,
  eth: 12,
  tron: 19,
  bsc: 15,
  polygon: 20,
  solana: 32,
};

const TX_EXPLORER: Record<string, (tx: string) => string> = {
  bitcoin: (tx) => `https://mempool.space/tx/${tx}`,
  eth: (tx) => `https://etherscan.io/tx/${tx}`,
  tron: (tx) => `https://tronscan.org/#/transaction/${tx}`,
  bsc: (tx) => `https://bscscan.com/tx/${tx}`,
  polygon: (tx) => `https://polygonscan.com/tx/${tx}`,
  solana: (tx) => `https://solscan.io/tx/${tx}`,
};

function fakeTxid(network: string): string {
  const hex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
  return network === "eth" || network === "bsc" || network === "polygon" ? `0x${hex}` : hex;
}

function fakeFromAddress(network: string): string {
  const target = NETWORK_ADDRESSES[network] ?? NETWORK_ADDRESSES.eth;
  // Not a real sender — just a plausible-looking different address, for display.
  return target.address.slice(0, -6) + "9f2c1a";
}

// /wallet/[uuid] pages point at a "static wallet" invoice: network+address
// are fixed at creation (no currency/network selection step), amount is
// open — whatever the payer sends. There's no real backend to create one
// against yet, so the mock recognizes a "wallet-" uuid prefix as a
// convenience and seeds it pre-filled instead of blank. See ../README.md.
const STATIC_WALLET_NETWORK = "tron";
const STATIC_WALLET_CURRENCY = "USDT";

export function getInvoice(uuid: string): MockInvoice {
  let invoice = store.get(uuid);
  if (!invoice) {
    const now = new Date();
    const isWallet = uuid.toLowerCase().startsWith("wallet-");
    const farExpiry = new Date(now.getTime() + 100 * 365 * 24 * 60 * 60 * 1000);
    const soonExpiry = new Date(now.getTime() + 30 * 60 * 1000);
    const target = isWallet ? (NETWORK_ADDRESSES[STATIC_WALLET_NETWORK] ?? NETWORK_ADDRESSES.eth) : null;

    invoice = {
      uuid,
      kind: isWallet ? "wallet" : "invoice",
      amount: isWallet ? "0" : "560",
      currency: "USD",
      equivalent_currency: "USD",
      payer_currency: isWallet ? STATIC_WALLET_CURRENCY : null,
      network: isWallet ? STATIC_WALLET_NETWORK : null,
      token_standard: isWallet ? "TRC-20" : null,
      address: isWallet ? target!.address : null,
      contract_address: isWallet ? target!.contract : null,
      contract_explorer_url: isWallet ? target!.explorer : null,
      payer_amount: null,
      payer_amount_equivalent: null,
      txid: null,
      tx_url: null,
      from: null,
      status: "check",
      is_final: false,
      created_at: now.toISOString(),
      expired_at: (isWallet ? farExpiry : soonExpiry).toISOString(),
      confirms: 0,
      need_confirms: isWallet ? (NEED_CONFIRMS[STATIC_WALLET_NETWORK] ?? 12) : 12,
      block: 48213000,
    };
    store.set(uuid, invoice);
  }
  return invoice;
}

export function confirmSelection(
  uuid: string,
  currency: string,
  network: string,
  tokenStandard: string | null,
  payerAmount: string
): MockInvoice {
  const invoice = getInvoice(uuid);
  const target = NETWORK_ADDRESSES[network] ?? NETWORK_ADDRESSES.eth;
  invoice.payer_currency = currency;
  invoice.network = network;
  invoice.token_standard = tokenStandard;
  invoice.address = target.address;
  invoice.contract_address = target.contract;
  invoice.contract_explorer_url = target.explorer;
  invoice.payer_amount = payerAmount;
  invoice.payer_amount_equivalent = invoice.amount;
  invoice.need_confirms = NEED_CONFIRMS[network] ?? 12;
  invoice.confirms = 0;
  invoice.status = "check";
  invoice.is_final = false;
  return invoice;
}

// Advances confirmations toward completion (or toward failure, for uuids
// that opt into exercising the error screen) — called on every /info and
// /confirms poll so either polling path keeps the simulated invoice moving.
export function tick(uuid: string): MockInvoice {
  const invoice = getInvoice(uuid);

  if (invoice.is_final || !invoice.network) return invoice;

  const now = new Date();
  if (now > new Date(invoice.expired_at)) {
    invoice.status = "expired";
    invoice.is_final = true;
    return invoice;
  }

  // Static wallet: no selection step ever happens, so once the address has
  // been sitting around for a bit, simulate a payment landing on it instead
  // of progressing confirmations on nothing. The delay keeps the initial
  // "just an address, waiting" state visible for a beat rather than
  // skipping straight past it on the very first poll.
  const walletPaymentDelayMs = 20000;
  if (invoice.kind === "wallet" && !invoice.txid) {
    if (now.getTime() - new Date(invoice.created_at).getTime() < walletPaymentDelayMs) {
      return invoice;
    }
    invoice.txid = fakeTxid(invoice.network);
    invoice.from = fakeFromAddress(invoice.network);
    invoice.tx_url = TX_EXPLORER[invoice.network]?.(invoice.txid) ?? null;
    invoice.payer_amount = (Math.random() * 200 + 20).toFixed(2);
    invoice.payer_amount_equivalent = invoice.payer_amount;
    invoice.confirms = 0;
    return invoice;
  }
  if (invoice.kind === "wallet" && !invoice.payer_amount) return invoice;

  const forceError = uuid.toLowerCase().includes("err");

  if (forceError) {
    if (invoice.confirms >= 1) {
      invoice.status = "cancel";
      invoice.is_final = true;
    } else {
      invoice.confirms += 1;
      invoice.block += 1;
    }
    return invoice;
  }

  const step = Math.max(1, Math.ceil(invoice.need_confirms / 4));
  invoice.confirms = Math.min(invoice.need_confirms, invoice.confirms + step);
  invoice.block += step;
  if (invoice.confirms >= invoice.need_confirms) {
    invoice.status = "paid";
    invoice.is_final = true;
  }
  return invoice;
}
