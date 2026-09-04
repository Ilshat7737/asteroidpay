// lib/payment/types.ts
//
// Shapes mirror the real api-payment.asteroidpay.io responses exactly
// (field names, nullability) as supplied for /v1/payment/info,
// /v1/payment/currencies, /v1/payment/methods, and /v1/payment/confirms —
// not our own design. Keep this file in sync with that contract, not with
// whatever's convenient for the UI.

export interface PaymentInfo {
  uuid: string;
  amount: string;
  payment_amount: string | null;
  payment_amount_fiat: string | null;
  payer_amount: string | null;
  payer_amount_equivalent: string | null;
  equivalent_currency: string;
  payer_currency: string | null;
  remains_amount: string | null;
  remains_amount_fiat: string | null;
  fee_amount: string | null;
  currency: string;
  desc: string | null;
  network: string | null;
  token_standard: string | null;
  contract_address: string | null;
  contract_explorer_url: string | null;
  address: string | null;
  from: string | null;
  txid: string | null;
  tx_url: string | null;
  project_url: string | null;
  payment_status: string;
  expired_at: string;
  created_at: string;
  status: string;
  is_final: boolean;
  can_change_payment_method: boolean;
}

export interface Branding {
  is_enabled: boolean;
  name: string;
  icon_dark: string | null;
  icon_light: string | null;
  icon_default: string | null;
}

export interface PaymentInfoResult {
  payment: PaymentInfo;
  branding: Branding;
}

export interface CurrencyOption {
  currency: string;
  currency_icon: string;
  status: boolean;
  amount: string;
}

export interface CurrenciesResult {
  currencies: CurrencyOption[];
  payload?: string;
}

export interface MethodOption {
  amount: string;
  real_amount: string;
  exchange_rate: string;
  currency: string;
  currency_icon: string;
  network: string;
  token_standard: string | null;
  is_popular_choise: boolean;
  min_amount: string;
  status: boolean;
}

export interface MethodsListResult {
  methods: MethodOption[];
  payload: string;
}

export interface WalletConnectPayload {
  to: string;
  data: string;
  chain_id: number;
  value: string;
}

export interface MethodsConfirmResult {
  success: boolean;
  payment: PaymentInfo;
  wallet_connect?: WalletConnectPayload | null;
}

export interface ConfirmsResult {
  confirms: number;
  need_confirms: number;
  block: number;
}

// Every endpoint answers in this envelope; state 0 == success.
export interface ApiEnvelope<T> {
  state: number;
  result: T;
}
