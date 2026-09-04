// Temporary mock backend — see ../README.md. Delete before merge.
import { NextResponse } from "next/server";
import { confirmSelection, getInvoice } from "../../../_store";
import type { MethodOption, MethodsListResult } from "@/lib/payment/types";

const NETWORKS_BY_CURRENCY: Record<string, Array<Pick<MethodOption, "network" | "token_standard" | "is_popular_choise">>> = {
  USDT: [
    { network: "bsc", token_standard: "BEP-20", is_popular_choise: true },
    { network: "tron", token_standard: "TRC-20", is_popular_choise: false },
    { network: "eth", token_standard: "ERC-20", is_popular_choise: false },
    { network: "polygon", token_standard: "ERC-20", is_popular_choise: false },
  ],
  USDC: [
    { network: "eth", token_standard: "ERC-20", is_popular_choise: true },
    { network: "polygon", token_standard: "ERC-20", is_popular_choise: false },
    { network: "bsc", token_standard: "BEP-20", is_popular_choise: false },
  ],
  BTC: [{ network: "bitcoin", token_standard: null, is_popular_choise: true }],
  ETH: [{ network: "eth", token_standard: null, is_popular_choise: true }],
  SOL: [{ network: "solana", token_standard: null, is_popular_choise: true }],
  LTC: [{ network: "bitcoin", token_standard: null, is_popular_choise: true }],
  DOGE: [{ network: "bitcoin", token_standard: null, is_popular_choise: true }],
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const uuid = typeof body?.uuid === "string" ? body.uuid : null;
  const currency = typeof body?.currency === "string" ? body.currency : null;
  const network = typeof body?.network === "string" ? body.network : null;

  if (!uuid || !currency) {
    return NextResponse.json({ state: 1, result: null }, { status: 400 });
  }

  const invoice = getInvoice(uuid);
  const options = NETWORKS_BY_CURRENCY[currency.toUpperCase()] ?? NETWORKS_BY_CURRENCY.USDT;

  // Confirm mode: a network was picked and "Proceed to the payment" was
  // clicked — this is the state-changing call, mirrors real
  // /v1/payment/methods with {currency, network, payload, uuid}.
  if (network) {
    const chosen = options.find((o) => o.network === network) ?? options[0];
    const updated = confirmSelection(uuid, currency.toUpperCase(), network, chosen.token_standard, invoice.amount);
    return NextResponse.json({
      state: 0,
      result: {
        success: true,
        payment: {
          uuid: updated.uuid,
          amount: updated.amount,
          payment_amount: null,
          payment_amount_fiat: null,
          payer_amount: updated.payer_amount,
          payer_amount_equivalent: updated.payer_amount_equivalent,
          equivalent_currency: updated.equivalent_currency,
          payer_currency: updated.payer_currency,
          remains_amount: updated.payer_amount,
          remains_amount_fiat: updated.payer_amount_equivalent,
          fee_amount: null,
          currency: updated.currency,
          desc: null,
          network: updated.network,
          token_standard: updated.token_standard,
          contract_address: updated.contract_address,
          contract_explorer_url: updated.contract_explorer_url,
          address: updated.address,
          from: null,
          txid: null,
          tx_url: null,
          project_url: "https://asteroidpay.io",
          payment_status: updated.status,
          expired_at: updated.expired_at,
          created_at: updated.created_at,
          status: updated.status,
          is_final: updated.is_final,
          can_change_payment_method: !updated.is_final,
        },
        wallet_connect: null,
      },
    });
  }

  // List mode: currency chosen, listing its available networks.
  const result: MethodsListResult = {
    methods: options.map((o) => ({
      amount: invoice.amount,
      real_amount: invoice.amount,
      exchange_rate: "1",
      currency: currency.toUpperCase(),
      currency_icon: `https://storage.cryptomus.com/currencies/${currency.toUpperCase()}.svg`,
      network: o.network,
      token_standard: o.token_standard,
      is_popular_choise: o.is_popular_choise,
      min_amount: "0.5",
      status: true,
    })),
    payload: Buffer.from(JSON.stringify({ uuid, currency })).toString("base64"),
  };

  return NextResponse.json({ state: 0, result });
}
