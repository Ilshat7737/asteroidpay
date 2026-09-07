// Temporary mock backend — see ../README.md. Delete before merge.
import { NextResponse } from "next/server";
import { getInvoice } from "../../../_store";
import type { CurrenciesResult, CurrencyOption } from "@/lib/payment/types";

const CURRENCIES: Omit<CurrencyOption, "amount">[] = [
  { currency: "USDT", currency_icon: "https://storage.cryptomus.com/currencies/USDT.svg", status: true },
  { currency: "BTC", currency_icon: "https://storage.cryptomus.com/currencies/BTC.svg", status: true },
  { currency: "ETH", currency_icon: "https://storage.cryptomus.com/currencies/ETH.svg", status: true },
  { currency: "USDC", currency_icon: "https://storage.cryptomus.com/currencies/USDC.svg", status: true },
  { currency: "LTC", currency_icon: "https://storage.cryptomus.com/currencies/LTC.svg", status: true },
  { currency: "SOL", currency_icon: "https://storage.cryptomus.com/currencies/SOL.svg", status: true },
  { currency: "DOGE", currency_icon: "https://storage.cryptomus.com/currencies/DOGE.svg", status: true },
];

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const uuid = typeof body?.uuid === "string" ? body.uuid : null;
  const search = typeof body?.search === "string" ? body.search.trim().toLowerCase() : "";
  if (!uuid) {
    return NextResponse.json({ state: 1, result: null }, { status: 400 });
  }

  const invoice = getInvoice(uuid);
  const filtered = CURRENCIES.filter((c) => !search || c.currency.toLowerCase().includes(search));

  const result: CurrenciesResult = {
    currencies: filtered.map((c) => ({ ...c, amount: invoice.amount })),
    payload: Buffer.from(JSON.stringify({ uuid })).toString("base64"),
  };

  return NextResponse.json({ state: 0, result });
}
