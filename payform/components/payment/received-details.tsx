"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import type { PaymentInfo } from "@/lib/payment/types";

function truncate(value: string, head = 10, tail = 8): string {
  return value.length > head + tail + 1 ? `${value.slice(0, head)}…${value.slice(-tail)}` : value;
}

// Amount paid + tx hash (+ explorer link), shown on a terminal success
// screen — /invoice/[uuid] once payer_amount/txid come back paid, and
// /wallet/[uuid] once a transaction lands on the static address.
export function ReceivedDetails({ payment }: { payment: PaymentInfo }) {
  const [copied, setCopied] = useState(false);

  async function copyTxid() {
    if (!payment.txid) return;
    try {
      await navigator.clipboard.writeText(payment.txid);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable — nothing sensible to fall back to.
    }
  }

  return (
    <div className="mt-4 w-full max-w-sm space-y-2 text-sm">
      <div className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
        <span className="text-muted-foreground">Amount</span>
        <span className="font-medium text-foreground">
          {payment.payer_amount} {payment.payer_currency}
        </span>
      </div>
      {payment.txid && (
        <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
          <span className="text-muted-foreground">Tx hash</span>
          <span className="flex items-center gap-1.5">
            <span className="font-mono text-foreground">{truncate(payment.txid)}</span>
            <button
              type="button"
              onClick={copyTxid}
              aria-label="Copy transaction hash"
              className="text-muted-foreground hover:text-foreground"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </span>
        </div>
      )}
      {payment.tx_url && (
        <a
          href={payment.tx_url}
          target="_blank"
          rel="noreferrer"
          className="block pt-2 text-center text-sm text-accent underline"
        >
          View on explorer
        </a>
      )}
    </div>
  );
}
