// Temporary mock backend — see ../README.md. Delete before merge.
import { NextResponse } from "next/server";
import { tick } from "../../../_store";
import type { ConfirmsResult } from "@/lib/payment/types";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const uuid = typeof body?.uuid === "string" ? body.uuid : null;
  if (!uuid) {
    return NextResponse.json({ state: 1, result: null }, { status: 400 });
  }

  const invoice = tick(uuid);
  const result: ConfirmsResult = {
    confirms: invoice.confirms,
    need_confirms: invoice.need_confirms,
    block: invoice.block,
  };

  return NextResponse.json({ state: 0, result });
}
