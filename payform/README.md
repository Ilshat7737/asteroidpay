# AsteroidPay Payform

The payment pages for **AsteroidPay** — where a payer actually sends crypto. Two routes:

- **`/invoice/[uuid]`** — a fixed-amount invoice. The payer picks a currency and network (both
  searchable, server-filtered), gets an address + QR + amount to send, and the page polls until the
  payment is confirmed or the invoice expires.
- **`/wallet/[uuid]`** — a static wallet: currency, network, and address are fixed at creation (no
  picker), the amount is open — whatever the payer sends — and the page just watches the address
  until a transaction lands.

This is one of two independent apps in this repository — see the [root README](../README.md) for
how this relates to `landing/` (the marketing site, deployed separately under `asteroidpay.io`).
**Nothing in this folder depends on `landing/` or vice versa** — separate `package.json`, separate
`node_modules`, separate Docker image, deployable to a completely different server if wanted.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 (dark theme, same design tokens as
`landing/`, duplicated rather than shared — see `app/globals.css`), Radix UI's Popover for the
searchable currency/network pickers, and the `qrcode` package for the payment QR.

## Backend contract

Every screen state is driven by four endpoints, called **directly from the browser** (not proxied
through this app's own server) — matching how the real backend expects it: same-site CORS between
`payment.asteroidpay.io` (this app) and `api-payment.asteroidpay.io` (the backend).

| Endpoint | Called | Purpose |
|---|---|---|
| `POST /v1/payment/info` | Every 15s while a screen is open | Current invoice/wallet state — this is what actually drives which screen renders (select / pay / paid / expired / error) |
| `POST /v1/payment/currencies` | On the invoice select screen, debounced as the payer searches | List of currencies this invoice can be paid in |
| `POST /v1/payment/methods` | (a) listing networks once a currency is picked, (b) confirming the picked network on "Proceed to the payment" | (a) available networks for that currency, (b) the state-changing call that fixes the invoice's `address`/`network`/`contract_address` |
| `POST /v1/payment/confirms` | Every 15s once a network/transaction is known, until final | `{confirms, need_confirms, block}` for the confirmations counter |

The base URL is `https://api-payment.asteroidpay.io` by default (`NEXT_PUBLIC_PAYMENT_API_BASE` in
`lib/payment/api.ts` overrides it, e.g. to point at a local mock during development — there is no
mock checked in, this app talks to the real backend by default).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000/invoice/&lt;uuid&gt;](http://localhost:3000/invoice/demo) or
[http://localhost:3000/wallet/&lt;uuid&gt;](http://localhost:3000/wallet/demo) for a real invoice/wallet
uuid from the backend. Other scripts: `npm run lint`, `npm run build`.

## Deployment

Same shape as `landing/`: a self-hosted Docker container running the Next.js `standalone` output as
a non-root user, meant to be reverse-proxied on its own subdomain.

### Prerequisites

- A VPS/server with Docker and the Docker Compose plugin installed — can be the same server as
  `landing/` or a completely different one, since the two apps share nothing at build or run time.
- The `payment.` subdomain (or whichever domain this is deployed under) pointed at the server.
- The real backend (`api-payment.asteroidpay.io` or wherever it actually lives) reachable from the
  browser, with CORS configured to allow this app's origin.

### 1. Get the code onto the server

```bash
git clone <repo-url> asteroidpay
cd asteroidpay/payform
```

### 2. Update the hardcoded domain (only if not deploying under `payment.asteroidpay.io`)

`metadataBase` in `app/layout.tsx` is hardcoded to `https://payment.asteroidpay.io` (there's no env
var for it, matching how `landing/` does this too). Update it if the real domain differs.

### 3. Build and run

```bash
docker compose up -d --build
```

Builds from the multi-stage `Dockerfile` and starts the container on `localhost:3001` (mapped from
the container's internal `3000` — deliberately different from `landing/`'s `3000:3000` so both can
run on one host without a port clash; change the host-side port in `docker-compose.yml` if that
doesn't suit your setup), with `restart: unless-stopped`.

### 4. Put it behind a reverse proxy

Terminate TLS in front of it, same as `landing/`. Caddy:

```
payment.asteroidpay.io {
    reverse_proxy localhost:3001
}
```

Or nginx:

```nginx
server {
    listen 80;
    server_name payment.asteroidpay.io;
    location / {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### Updating a running deployment

```bash
git pull
docker compose up -d --build
```

### Useful commands

```bash
docker compose logs -f web   # tail app logs
docker compose ps            # container status
docker compose down          # stop and remove the container
```

## SEO

Every route is `noindex, nofollow, nocache` (both per-page metadata and a blanket
`Disallow: /` in `robots.ts`) — these are private, single-use transaction pages, never meant to
surface in search results. Meta description/OG/Twitter tags are set per-invoice (title "Pay
Invoice", description about paying, no marketing copy), and the favicon/OG image reuse the same
AsteroidPay mark as `landing/` (`components/logo-mark.tsx`, duplicated — see that file's comment).
