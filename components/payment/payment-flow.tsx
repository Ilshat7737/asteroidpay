"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Check, HelpCircle, X } from "lucide-react";
import {
  confirmMethod,
  fetchConfirms,
  fetchCurrencies,
  fetchMethods,
  fetchPaymentInfo,
  PaymentApiError,
} from "@/lib/payment/api";
import type { ConfirmsResult, CurrencyOption, MethodOption, PaymentInfo, PaymentInfoResult } from "@/lib/payment/types";
import { AssetSelect, type AssetOption } from "./asset-select";
import { CountdownTimer } from "./countdown-timer";
import { CopyField } from "./copy-field";
import { PaymentQrCode } from "./qr-code";

const POLL_INTERVAL_MS = 15000;
const SEARCH_DEBOUNCE_MS = 300;
const SUCCESS_STATUSES = ["paid", "paid_over"];

function sameJson(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

function currencyToOption(c: CurrencyOption): AssetOption {
  return { id: c.currency, label: c.currency, iconUrl: c.currency_icon };
}

function methodToOption(m: MethodOption): AssetOption {
  const label = m.token_standard ? `${m.network.toUpperCase()} (${m.token_standard})` : m.network.toUpperCase();
  return { id: m.network, label, iconUrl: m.currency_icon, badge: m.is_popular_choise ? "Popular" : undefined };
}

function networkBadge(payment: PaymentInfo): string {
  return payment.token_standard ?? (payment.network ? payment.network.toUpperCase() : "");
}

function errorCopy(status: string): { title: string; message: string } {
  if (status === "expired") {
    return { title: "Payment expired", message: "This invoice's payment window has closed." };
  }
  if (status === "cancel") {
    return { title: "Payment was cancelled", message: "If you believe you were charged, please contact support" };
  }
  return { title: "Payment was not completed", message: "If you believe you were charged, please contact support" };
}

export function PaymentFlow({ uuid }: { uuid: string }) {
  const [data, setData] = useState<PaymentInfoResult | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [confirms, setConfirms] = useState<ConfirmsResult | null>(null);
  const [expiredLocally, setExpiredLocally] = useState(false);

  const dataRef = useRef(data);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  // Local, pre-submit selection state — only exists between "picked a
  // currency" and "clicked Proceed"; the backend doesn't know about it
  // until confirmMethod() succeeds, at which point it's folded into `data`.
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<MethodOption | null>(null);
  const [methodsPayload, setMethodsPayload] = useState<string | null>(null);

  const [currencyOptions, setCurrencyOptions] = useState<CurrencyOption[]>([]);
  const [currencySearch, setCurrencySearch] = useState("");
  const [currencyLoading, setCurrencyLoading] = useState(false);

  const [networkOptions, setNetworkOptions] = useState<MethodOption[]>([]);
  const [networkSearch, setNetworkSearch] = useState("");
  const [networkLoading, setNetworkLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const loadInfo = useCallback(async (silent: boolean) => {
    try {
      const result = await fetchPaymentInfo(uuid);
      if (!silent) setLoadError(null);
      setData((prev) => (sameJson(prev, result) ? prev : result));
    } catch (err) {
      if (!silent) {
        setLoadError(err instanceof PaymentApiError ? err.message : "Failed to load payment");
      }
      // Silent (background poll) failures are swallowed on purpose — the
      // last known-good screen stays up rather than flashing an error for
      // one dropped request.
    }
  }, [uuid]);

  // Initial load.
  useEffect(() => {
    void (async () => {
      await loadInfo(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uuid]);

  // Background polling: /info always, /confirms too once a network is set
  // and the invoice isn't final yet. State only updates when the response
  // actually differs — no loading flicker on a poll tick.
  useEffect(() => {
    const id = setInterval(async () => {
      loadInfo(true);
      const payment = dataRef.current?.payment;
      if (payment && payment.network && !payment.is_final) {
        try {
          const result = await fetchConfirms(uuid);
          setConfirms((prev) => (sameJson(prev, result) ? prev : result));
        } catch {
          // Same silent-failure policy as the /info poll above.
        }
      }
    }, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, [uuid, loadInfo]);

  // Currency search (debounced, server-side).
  useEffect(() => {
    const id = setTimeout(async () => {
      setCurrencyLoading(true);
      try {
        const result = await fetchCurrencies(uuid, currencySearch);
        setCurrencyOptions(result.currencies);
      } catch {
        setCurrencyOptions([]);
      } finally {
        setCurrencyLoading(false);
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [uuid, currencySearch]);

  // Network search (debounced, server-side) — only once a currency is picked.
  useEffect(() => {
    if (!selectedCurrency) return;
    const id = setTimeout(async () => {
      setNetworkLoading(true);
      try {
        const result = await fetchMethods(uuid, selectedCurrency.currency, networkSearch);
        setNetworkOptions(result.methods);
        setMethodsPayload(result.payload);
      } catch {
        setNetworkOptions([]);
      } finally {
        setNetworkLoading(false);
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [uuid, selectedCurrency, networkSearch]);

  async function handleProceed() {
    if (!selectedCurrency || !selectedMethod || !methodsPayload) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await confirmMethod(uuid, selectedCurrency.currency, selectedMethod.network, methodsPayload);
      setData((prev) => (prev ? { ...prev, payment: result.payment } : prev));
    } catch (err) {
      setSubmitError(err instanceof PaymentApiError ? err.message : "Couldn't submit your selection");
    } finally {
      setSubmitting(false);
    }
  }

  if (loadError && !data) {
    return (
      <PaymentCard>
        <StatusScreen
          icon={<X className="h-6 w-6 text-destructive" />}
          iconClassName="bg-destructive/10"
          title="Couldn't load this invoice"
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
  const isFinal = payment.is_final || expiredLocally;

  if (isFinal) {
    const status = payment.is_final ? payment.status : "expired";
    if (SUCCESS_STATUSES.includes(status)) {
      return (
        <>
          <MerchantHeader branding={branding} uuid={uuid} />
          <AmountHeading payment={payment} selectedCurrency={null} />
          <PaymentCard>
            <StatusScreen
              icon={<Check className="h-6 w-6 text-accent" />}
              iconClassName="bg-accent/15"
              title="Payment is paid"
              message="You have successfully paid the invoice"
              action={payment.project_url ? { label: "Go back", href: payment.project_url } : undefined}
            />
          </PaymentCard>
        </>
      );
    }
    const copy = errorCopy(status);
    return (
      <>
        <MerchantHeader branding={branding} uuid={uuid} />
        <AmountHeading payment={payment} selectedCurrency={null} />
        <PaymentCard>
          <StatusScreen
            icon={<X className="h-6 w-6 text-destructive" />}
            iconClassName="bg-destructive/10"
            title={copy.title}
            message={copy.message}
            action={{ label: "Contact support", href: "/#contact" }}
          />
        </PaymentCard>
      </>
    );
  }

  const isPayScreen = Boolean(payment.payer_currency && payment.network);

  return (
    <>
      <MerchantHeader branding={branding} uuid={uuid} />
      <div className="flex flex-wrap items-start justify-between gap-6">
        <AmountHeading payment={payment} selectedCurrency={selectedCurrency} />
        <div className="space-y-3">
          {isPayScreen && <Confirmations confirms={confirms} />}
          <CountdownTimer
            createdAt={payment.created_at}
            expiredAt={payment.expired_at}
            onExpire={() => setExpiredLocally(true)}
          />
        </div>
      </div>

      <PaymentCard>
        {isPayScreen ? (
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
            <div className="space-y-4">
              <CopyField label="Recipient's wallet address" value={payment.address ?? ""} />
              <CopyField label="Amount" value={`${payment.payer_amount} ${payment.payer_currency}`} />
              {payment.contract_address && (
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  Contract address {payment.contract_address.slice(0, 6)}…{payment.contract_address.slice(-4)}
                  <HelpCircle className="h-3.5 w-3.5" />
                </p>
              )}
            </div>
            <PaymentQrCode value={payment.address ?? ""} />
          </div>
        ) : (
          <div className="space-y-5">
            <AssetSelect
              label="Currency"
              placeholder="Select currency"
              value={selectedCurrency ? currencyToOption(selectedCurrency) : null}
              options={currencyOptions.map(currencyToOption)}
              search={currencySearch}
              onSearchChange={setCurrencySearch}
              loading={currencyLoading}
              onOpenChange={(open) => {
                if (open && currencyOptions.length === 0) setCurrencySearch("");
              }}
              onSelect={(option) => {
                const currency = currencyOptions.find((c) => c.currency === option.id) ?? null;
                setSelectedCurrency(currency);
                setSelectedMethod(null);
                setNetworkOptions([]);
                setMethodsPayload(null);
                setNetworkSearch("");
              }}
            />
            <AssetSelect
              label="Network"
              placeholder="Select network"
              disabled={!selectedCurrency}
              value={selectedMethod ? methodToOption(selectedMethod) : null}
              options={networkOptions.map(methodToOption)}
              search={networkSearch}
              onSearchChange={setNetworkSearch}
              loading={networkLoading}
              onOpenChange={() => {}}
              onSelect={(option) => {
                const method = networkOptions.find((m) => m.network === option.id) ?? null;
                setSelectedMethod(method);
              }}
            />
            {submitError && <p className="text-sm text-destructive">{submitError}</p>}
            <button
              type="button"
              disabled={!selectedCurrency || !selectedMethod || submitting}
              onClick={handleProceed}
              className="flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Processing…" : "Proceed to the payment"}
            </button>
          </div>
        )}
      </PaymentCard>
    </>
  );
}

function MerchantHeader({ branding, uuid }: { branding: PaymentInfoResult["branding"]; uuid: string }) {
  return (
    <div className="flex items-center gap-3">
      {branding.icon_default ? (
        // eslint-disable-next-line @next/next/no-img-element -- remote, merchant-provided icon URL
        <img src={branding.icon_default} alt="" className="h-10 w-10 rounded-full bg-muted object-cover" />
      ) : (
        <div className="h-10 w-10 rounded-full bg-muted" />
      )}
      <div>
        <p className="font-heading text-base font-semibold text-foreground">{branding.name}</p>
        <p className="text-sm text-muted-foreground">Invoice #{uuid.slice(0, 8).toUpperCase()}</p>
      </div>
    </div>
  );
}

function AmountHeading({
  payment,
  selectedCurrency,
}: {
  payment: PaymentInfo;
  selectedCurrency: CurrencyOption | null;
}) {
  const hasPayerAmount = Boolean(payment.payer_amount && payment.payer_currency);
  const amount = hasPayerAmount ? payment.payer_amount! : (selectedCurrency?.amount ?? payment.amount);
  const ticker = hasPayerAmount ? payment.payer_currency! : (selectedCurrency?.currency ?? payment.currency);
  const equivalent = hasPayerAmount ? payment.payer_amount_equivalent : selectedCurrency ? payment.amount : null;
  const equivalentCurrency = hasPayerAmount ? payment.equivalent_currency : payment.currency;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-baseline gap-3">
        <span className="font-heading text-4xl font-bold text-foreground sm:text-5xl">{amount}</span>
        <span className="text-3xl text-muted-foreground sm:text-4xl">{ticker}</span>
        {equivalent && (
          <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-medium text-accent">
            ≈{equivalent} {equivalentCurrency}
          </span>
        )}
        {payment.network && (
          <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-foreground">
            {networkBadge(payment)}
          </span>
        )}
      </div>
      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
        Network fee not included <HelpCircle className="h-3.5 w-3.5" />
      </p>
    </div>
  );
}

function Confirmations({ confirms }: { confirms: ConfirmsResult | null }) {
  return (
    <p className="text-sm text-muted-foreground">
      Confirmations{" "}
      <span className="font-medium text-foreground">
        {confirms ? `${confirms.confirms} from ${confirms.need_confirms}` : "—"}
      </span>
    </p>
  );
}

function PaymentCard({ children }: { children: React.ReactNode }) {
  return <div className="mt-6 rounded-2xl border border-border bg-card p-6 sm:p-8">{children}</div>;
}

function StatusScreen({
  icon,
  iconClassName,
  title,
  message,
  action,
}: {
  icon: React.ReactNode;
  iconClassName: string;
  title: string;
  message: string;
  action?: { label: string; href?: string; onClick?: () => void };
}) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className={`flex h-14 w-14 items-center justify-center rounded-full ${iconClassName}`}>{icon}</div>
      <h1 className="mt-5 font-heading text-2xl font-bold text-foreground">{title}</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{message}</p>
      {action && (
        <a
          href={action.href ?? "#"}
          onClick={action.onClick}
          className="mt-6 flex h-11 items-center justify-center rounded-full bg-accent px-8 text-sm font-semibold text-accent-foreground"
        >
          {action.label}
        </a>
      )}
    </div>
  );
}
