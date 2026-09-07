// lib/payment/api.ts
//
// Client for api-payment.asteroidpay.io. Called directly from the browser
// (matches the reference curl: origin/referer are payment.asteroidpay.io,
// sec-fetch-site same-site) — this page is meant to be served from that
// subdomain, at which point the backend's CORS allows it directly, no
// proxy needed.
//
// NEXT_PUBLIC_PAYMENT_API_BASE overrides the base URL — used locally to
// point at the throwaway mock in app/api/mock-payment/ (see its README)
// instead of the real backend while there's no test invoice to hit.
"use client";

import type {
  ApiEnvelope,
  ConfirmsResult,
  CurrenciesResult,
  MethodsConfirmResult,
  MethodsListResult,
  PaymentInfoResult,
} from "./types";

const API_BASE = process.env.NEXT_PUBLIC_PAYMENT_API_BASE ?? "https://api-payment.asteroidpay.io";

const VISITOR_ID_KEY = "ap_visitor_id";

function getVisitorId(): string {
  try {
    let id = window.localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    // Storage unavailable (private mode, disabled) — a fresh id per call
    // still lets the request go through, just without cross-request identity.
    return crypto.randomUUID();
  }
}

export class PaymentApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PaymentApiError";
  }
}

async function post<T>(path: string, body: Record<string, unknown>): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: {
        accept: "*/*",
        "content-type": "application/json",
        language: "en",
        "x-visitor-id": getVisitorId(),
      },
      body: JSON.stringify(body),
    });
  } catch {
    throw new PaymentApiError("Network request failed");
  }

  if (!response.ok) {
    throw new PaymentApiError(`Request failed with status ${response.status}`);
  }

  let json: ApiEnvelope<T>;
  try {
    json = await response.json();
  } catch {
    throw new PaymentApiError("Invalid response from server");
  }

  if (json.state !== 0) {
    throw new PaymentApiError("Payment service returned an error");
  }

  return json.result;
}

export function fetchPaymentInfo(uuid: string): Promise<PaymentInfoResult> {
  return post<PaymentInfoResult>("/v1/payment/info", { uuid });
}

export function fetchCurrencies(uuid: string, search: string): Promise<CurrenciesResult> {
  return post<CurrenciesResult>("/v1/payment/currencies", { uuid, search });
}

export function fetchMethods(uuid: string, currency: string, search: string): Promise<MethodsListResult> {
  return post<MethodsListResult>("/v1/payment/methods", { uuid, currency, search });
}

export function confirmMethod(
  uuid: string,
  currency: string,
  network: string,
  payload: string
): Promise<MethodsConfirmResult> {
  return post<MethodsConfirmResult>("/v1/payment/methods", { uuid, currency, network, payload });
}

export function fetchConfirms(uuid: string): Promise<ConfirmsResult> {
  return post<ConfirmsResult>("/v1/payment/confirms", { uuid });
}
