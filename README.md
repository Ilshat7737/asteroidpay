# AsteroidPay Landing Site

Marketing site for **AsteroidPay**, a crypto payment gateway for merchants accepting Bitcoin,
Ethereum, and stablecoins across six networks. Single-page landing site with a hero, services,
supported networks, auto-convert explainer, fees, testimonials, and a final CTA, plus three legal
routes (`/terms`, `/privacy`, `/aml`) and two glass modals (log in, contact) that any page can open
from the header.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui on Radix, framer-motion for
motion, and react-hook-form + zod for form validation. Typography is Space Grotesk (headings) and
Inter (body), loaded via `next/font`. The contact form posts to the `/api/contact` route handler,
which validates with the shared zod schema and currently logs the submission server-side.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Other scripts: `npm run lint`, `npm run build`.

## Deployment

The site is deployed as a self-hosted Docker container (Next.js `standalone` output, running as a
non-root user). From the project root on the target VPS:

```bash
docker compose up -d --build
```

That builds the image from the multi-stage `Dockerfile` and serves the app on port 3000, with
`restart: unless-stopped`. Put it behind a reverse proxy (nginx, Caddy, Traefik) to terminate TLS.
