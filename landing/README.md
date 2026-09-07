# Asteroid Pay Landing Site

Marketing site for **Asteroid Pay**, a crypto payment gateway for merchants accepting Bitcoin,
Ethereum, and stablecoins across six networks. Single-page landing site with a hero, trust bar,
services (payment gateway + supported networks), API, auto-convert explainer, white-label,
testimonials, wallet, receive, send, convert, and a final CTA, plus three legal routes (`/terms`,
`/privacy`, `/aml`) and three glass modals (log in, contact, register) that any page can open from
the header.

This is one of two independent apps in this repository — see the [root README](../README.md) for
how this relates to the `payform/` app (the invoice/wallet payment pages, deployed separately under
`payment.asteroidpay.io`). Nothing in this folder depends on `payform/` or vice versa.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui on Radix, framer-motion for
motion, and react-hook-form + zod for form validation. Typography is Space Grotesk (headings) and
Inter (body), loaded via `next/font`. The contact and register forms post to the `/api/contact` and
`/api/register` route handlers, which validate with the shared zod schemas and currently log the
submission server-side.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Other scripts: `npm run lint`, `npm run build`.

## Deployment

The site is deployed as a self-hosted Docker container (Next.js `standalone` output, running as a
non-root user).

### Prerequisites

- A VPS/server with Docker and the Docker Compose plugin installed.
- A domain pointed at the server (for the reverse proxy in the next step).

### 1. Get the code onto the server

```bash
git clone <repo-url> asteroidpay
cd asteroidpay/landing
```

### 2. Update the hardcoded domain (only if not deploying under `asteroidpay.io`)

The canonical URL, sitemap, robots.txt, and OpenGraph/JSON-LD tags all reference
`https://asteroidpay.io` directly (there's no env var for it). If the real domain differs, update
`BASE_URL` / `metadataBase` in these three files before building:

- `app/layout.tsx`
- `app/sitemap.ts`
- `app/robots.ts`

### 3. Build and run

```bash
docker compose up -d --build
```

This builds the image from the multi-stage `Dockerfile` (deps → build → slim `node:20-alpine`
runner) and starts the container serving the app on `localhost:3000`, with `restart: unless-stopped`
so it survives reboots/crashes.

### 4. Put it behind a reverse proxy

The container only serves plain HTTP on port 3000 — terminate TLS in front of it. Minimal example
with Caddy (`Caddyfile`), which handles HTTPS certs automatically:

```
asteroidpay.io {
    reverse_proxy localhost:3000
}
```

Or nginx:

```nginx
server {
    listen 80;
    server_name asteroidpay.io;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

(then add TLS with certbot, or swap in Traefik with its own labels).

### Updating a running deployment

```bash
git pull
docker compose up -d --build
```

Docker Compose recreates only the `web` service since nothing else changed.

### Useful commands

```bash
docker compose logs -f web   # tail app logs
docker compose ps            # container status
docker compose down          # stop and remove the container
```
