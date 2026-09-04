// Temporary mock backend — see ../README.md. Delete before merge.
import { NextResponse } from "next/server";
import { getInvoice, tick } from "../../../_store";
import type { PaymentInfo, PaymentInfoResult } from "@/lib/payment/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const uuid = typeof body?.uuid === "string" ? body.uuid : null;
  if (!uuid) {
    return NextResponse.json({ state: 1, result: null }, { status: 400 });
  }

  const invoice = tick(uuid) ?? getInvoice(uuid);

  const payment: PaymentInfo = {
    uuid: invoice.uuid,
    amount: invoice.amount,
    payment_amount: null,
    payment_amount_fiat: null,
    payer_amount: invoice.payer_amount,
    payer_amount_equivalent: invoice.payer_amount_equivalent,
    equivalent_currency: invoice.equivalent_currency,
    payer_currency: invoice.payer_currency,
    remains_amount: invoice.payer_amount,
    remains_amount_fiat: invoice.payer_amount_equivalent,
    fee_amount: null,
    currency: invoice.currency,
    desc: null,
    network: invoice.network,
    token_standard: invoice.token_standard,
    contract_address: invoice.contract_address,
    contract_explorer_url: invoice.contract_explorer_url,
    address: invoice.address,
    from: null,
    txid: null,
    tx_url: null,
    project_url: "https://asteroidpay.io",
    payment_status: invoice.status,
    expired_at: invoice.expired_at,
    created_at: invoice.created_at,
    status: invoice.status,
    is_final: invoice.is_final,
    can_change_payment_method: !invoice.is_final,
  };

  const result: PaymentInfoResult = {
    payment,
    branding: {
      is_enabled: true,
      name: "Merchant name",
      icon_dark: null,
      icon_light: null,
      icon_default: null,
    },
  };

  return NextResponse.json({ state: 0, result });
}
