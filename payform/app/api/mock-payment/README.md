# Temporary mock backend — DELETE before merging

This whole `app/api/mock-payment/` directory stands in for
`api-payment.asteroidpay.io` during local development, since there's no
real test invoice to point the payment page at yet. It's wired in only via
`NEXT_PUBLIC_PAYMENT_API_BASE=/api/mock-payment` in `.env.local` (not
committed).

Once the `/invoice/[uuid]` screens have been checked against this mock,
**delete this directory** and drop the env override so
`lib/payment/api.ts` falls back to the real `api-payment.asteroidpay.io`.

## Behavior

State is kept in-memory per `uuid` (resets on server restart) in `_store.ts`.

- Any uuid: starts in the "select currency/network" state.
- After a network is confirmed, confirmations tick up automatically on
  every `/confirms` or `/info` poll until `need_confirms` is reached, then
  the invoice flips to `paid`/final — exercises the success screen without
  waiting on a real chain.
- A uuid containing `err` (case-insensitive) fails instead of completing,
  once at least one confirmation has ticked — exercises the error screen.
