"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Copy, HelpCircle, X } from "lucide-react";
import { fetchConfirms, fetchPaymentInfo, PaymentApiError } from "@/lib/payment/api";
import type { ConfirmsResult, PaymentInfo, PaymentInfoResult } from "@/lib/payment/types";
import { MerchantHeader } from "./merchant-header";
import { PaymentCard } from "./payment-card";
import { StatusScreen } from "./status-screen";
import { Confirmations } from "./confirmations";
import { CopyField } from "./copy-field";
import { PaymentQrCode } from "./qr-code";
import { MobileQrButton } from "./mobile-qr-button";

const POLL_INTERVAL_MS = 15000;
const SUCCESS_STATUSES = ["paid", "paid_over"];

function sameJson(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function networkBadge(payment: PaymentInfo): string {
  return payment.token_standard ?? (payment.network ? payment.network.toUpperCase() : "");
}

function truncate(value: string, head = 10, tail = 8): string {
  return value.length > head + tail + 1 ? `${value.slice(0, head)}…${value.slice(-tail)}` : value;
}

// A static wallet: network, currency, and address are fixed from creation
// (no selection step) and the amount is open — whatever the payer sends.
// Unlike /invoice/[uuid], there's no expiration countdown and no
// currency/network picker; the page just watches for a transaction to land
// on the address and reports it once it does.
export function WalletFlow({ uuid }: { uuid: string }) {
  const [data, setData] = useState<PaymentInfoResult | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [confirms, setConfirms] = useState<ConfirmsResult | null>(null);

  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const loadInfo = useCallback(async (silent: boolean) => {
    try {
      const result = await fetchPaymentInfo(uuid);
      if (!silent) setLoadError(null);
      setData((prev) => (sameJson(prev, result) ? prev : result));
    } catch (err) {
      if (!silent) {
        setLoadError(err instanceof PaymentApiError ? err.message : "Failed to load wallet");
      }
    }
  }, [uuid]);

  useEffect(() => {
    void (async () => {
      await loadInfo(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  // Poll /info always; poll /confirms too once a transaction has landed
  // (there's nothing to confirm before that). Both apply an update only
  // when the response actually differs.
  useEffect(() => {
    const id = setInterval(async () => {
      loadInfo(true);
      const payment = dataRef.current?.payment;
      if (payment?.txid && !payment.is_final) {
        try {
          const result = await fetchConfirms(uuid);
          setConfirms((prev) => (sameJson(prev, result) ? prev : result));
        } catch {
          // Falls back to the next tick.
        }
      }
    }, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [uuid, loadInfo]);

  useEffect(() => {
    const payment = data?.payment;
    if (!payment?.txid || payment.is_final) return;
    void (async () => {
      try {
        const result = await fetchConfirms(uuid);
        setConfirms((prev) => (sameJson(prev, result) ? prev : result));
      } catch {
        // Falls back to the next 15s poll.
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid, data?.payment.txid, data?.payment.is_final]);

  if (loadError && !data) {
    return (
      <PaymentCard>
        <StatusScreen
          icon={<X className="h-6 w-6 text-destructive" />}
          iconClassName="bg-destructive/10"
          title="Couldn't load this wallet"
          message={loadError}
          action={{ label: "Try again", onClick: () => loadInfo(false) }}
        />
      </PaymentCard>
    );
  }

  if (!data) {
    return (
      <PaymentCard>
        <div className="animate-pulse space-y-4">
          <div className="h-10 w-2/3 rounded-lg bg-muted" />
          <div className="h-11 w-full rounded-xl bg-muted" />
          <div className="h-11 w-full rounded-xl bg-muted" />
        </div>
      </PaymentCard>
    );
  }

  const { payment, branding } = data;

  if (payment.is_final) {
    if (SUCCESS_STATUSES.includes(payment.status)) {
      return (
        <>
          <MerchantHeader branding={branding} uuid={uuid} />
          <PaymentCard>
            <StatusScreen
              icon={<Check className="h-6 w-6 text-accent" />}
              iconClassName="bg-accent/15"
              title="Payment received"
              message="This wallet has received a payment."
              action={payment.url_return ? { label: "Go back", href: payment.url_return } : undefined}
            >
              <ReceivedDetails payment={payment} />
            </StatusScreen>
          </PaymentCard>
        </>
      );
    }
    return (
      <>
        <MerchantHeader branding={branding} uuid={uuid} />
        <PaymentCard>
          <StatusScreen
            icon={<X className="h-6 w-6 text-destructive" />}
            iconClassName="bg-destructive/10"
            title="Payment was not completed"
            message="If you believe you sent funds, please contact support"
            action={{ label: "Contact support", href: "/#contact" }}
          />
        </PaymentCard>
      </>
    );
  }

  return (
    <>
      <MerchantHeader branding={branding} uuid={uuid} />

      <div className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            {payment.payer_currency}
          </span>
          {payment.network && (
            <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground">
              {networkBadge(payment)}
            </span>
          )}
          {!payment.txid && (
            <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-accent">
              No fixed amount — send any sum
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          This is a static wallet address — it has no set payment amount. Send any amount of{" "}
          {payment.payer_currency} on this network to the address below.
        </p>
      </div>

      {payment.txid && (
        <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/10 p-4">
          <p className="text-sm font-medium text-foreground">Payment detected — confirming</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {payment.payer_amount} {payment.payer_currency} received, waiting for network confirmations.
          </p>
          <div className="mt-2">
            <Confirmations confirms={confirms} />
          </div>
        </div>
      )}

      <PaymentCard>
        <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
          <div className="space-y-4">
            <CopyField label="Recipient's wallet address" value={payment.address ?? ""} />
            <MobileQrButton value={payment.address ?? ""} />
            {payment.contract_address && (
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                Contract address {payment.contract_address.slice(0, 6)}…{payment.contract_address.slice(-4)}
                <HelpCircle className="h-3.5 w-3.5" />
              </p>
            )}
          </div>
          <div className="hidden sm:block">
            <PaymentQrCode value={payment.address ?? ""} />
          </div>
        </div>
      </PaymentCard>
    </>
  );
}

function ReceivedDetails({ payment }: { payment: PaymentInfo }) {
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
      <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2">
        <span className="text-muted-foreground">Tx hash</span>
        <span className="flex items-center gap-1.5">
          <span className="font-mono text-foreground">{payment.txid ? truncate(payment.txid) : "—"}</span>
          {payment.txid && (
            <button
              type="button"
              onClick={copyTxid}
              aria-label="Copy transaction hash"
              className="text-muted-foreground hover:text-foreground"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          )}
        </span>
      </div>
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
