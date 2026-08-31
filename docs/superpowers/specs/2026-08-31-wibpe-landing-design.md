# HQclouds Landing Page — Design Spec

Date: 2026-08-31
Status: Approved

## Summary

A single-page marketing landing site for **HQclouds**, a crypto payment gateway, built with Next.js. Visual language is heavily inspired by klarna.com (bold rounded typography, big pill buttons, alternating black/cream/accent full-bleed sections, generous whitespace, smooth motion). Entirely in English. No real backend, no real auth — this is a demo/marketing site.

## Tech Stack

- Next.js (App Router, `create-next-app@latest` resolved 16.3.3 at scaffold time), TypeScript, React 19
- Tailwind CSS v4
- shadcn/ui (Radix-based Dialog, Button, Input, Select, Textarea, Form primitives), restyled to match the brand
- Framer Motion (`motion`) for scroll reveals, hover states, marquee/trust-bar animation
- react-hook-form + zod + @hookform/resolvers for both forms
- lucide-react for icons
- next/font/google: **Space Grotesk** (headings), **Inter** (body)
- No database, no external services, no analytics

2–3 flagship components (networks trust-bar marquee, testimonials layout) are sourced/adapted from 21st.dev via the `mcp__21st__search` / `get_component` MCP tools during implementation, then restyled to match HQclouds's tokens (colors, radii, fonts) rather than used as-is.

## Routes

- `/` — the main scrolling landing page.
- `app/api/contact/route.ts` — POST endpoint. Validates payload with zod, logs it server-side, returns `{ ok: true }` after a short artificial delay. No email/CRM integration — explicitly a stub for now.
- No `/login` route. Login is modal-only, triggered from the header.
- `/terms`, `/privacy`, `/aml` — dedicated legal pages (Terms of Use, Privacy Policy, AML Policy), in the pattern real crypto payment gateways (Cryptomus, NowPayments, CoinGate) publish: real routes, not anchors or a modal, each reusing the site's `Navbar`/`Footer` around a centered prose article. Original writing, not copied from any real company; AML content is genuinely crypto-gateway-specific (source-of-funds checks, on-chain wallet screening, PEP/sanctions screening, risk scoring), and Terms covers blockchain-transaction irreversibility, wallet-address accuracy, network-fee variability, and HQclouds' role as a non-custodial payment facilitator. The Footer's Terms/Privacy links point here instead of `#`, plus a new AML Policy link.

## Page Sections (top to bottom)

1. **Navbar** — sticky. Logo left, nav links (Solutions, Networks, Fees, Reviews) center/right, "Log in" (glass ghost pill) + "Contact us" (solid accent pill) right. Transparent over hero, becomes a blurred glass bar on scroll. Mobile: hamburger opens a full-screen glass sheet with stacked links + both CTAs.
2. **Hero** — large bold headline centered on speed / low fees / reliability, subhead, primary CTA ("Contact us"), secondary CTA ("Log in" or "See fees"). Big rounded visual/graphic element (abstract payment-flow motif in brand accent color).
3. **TrustBar** — logos/marquee row of supported network badges (Bitcoin, Ethereum, Tron, BNB Smart Chain, Polygon, Solana), animated infinite scroll.
4. **Services** — "Accept crypto payments across the networks your customers already use." Grid of the 6 networks, each with name, ticker, and a one-line description of its speed/fee/use-case profile:
   - **Bitcoin (BTC)** — the most trusted and liquid network; best for larger, less time-sensitive settlements.
   - **Ethereum (ETH / ERC-20)** — the widest token support (USDT, USDC, DAI); a few minutes to confirm.
   - **Tron (TRC-20)** — the cheapest and most widely used network for USDT transfers globally.
   - **BNB Smart Chain (BEP-20)** — low fees, fast confirmations, broad DeFi ecosystem.
   - **Polygon** — near-instant, sub-cent fees; ideal for small/frequent payments.
   - **Solana (SOL / SPL)** — sub-second finality and very high throughput.
5. **Auto-Convert** — explains that incoming payments in any supported crypto are automatically converted to a stablecoin (USDT/USDC) or fiat equivalent at the market rate at the moment of receipt, so merchants never carry volatility risk.
6. **Fees** — headline "From 0.3%". Bullet points: no setup fee, no monthly fee, no hidden costs, volume-based discounts for high-volume/enterprise merchants, transparent per-transaction pricing.
7. **Testimonials** — 8 fabricated reviews from small internet-service businesses (hosting, VPN, gaming-skins marketplace, ad-account resale, SEO agency, digital subscriptions, proxy service, software-license resale). All English, diverse nationalities, explicitly none from Russia/CIS. Grid on desktop, CSS scroll-snap horizontal carousel on mobile (no extra carousel dependency).

   1. Marco Conti — Founder, CloudNest Hosting (Milan, Italy)
   2. Farah Haddad — Operations Lead, VeilPoint VPN (Beirut, Lebanon)
   3. Tobias Lindqvist — Founder, Dropcase (Gothenburg, Sweden)
   4. Ana Beatriz Souza — Account Manager, AdaptAds (São Paulo, Brazil)
   5. Youssef El-Amrani — Founder, RankForge SEO (Casablanca, Morocco)
   6. Mei Ling Tan — Founder, StreamBox (Kuala Lumpur, Malaysia)
   7. Connor Byrne — Founder, ProxyHaven (Dublin, Ireland)
   8. Isabela Rocha — Founder, LicenseKey Hub (Lisbon, Portugal)

8. **Final CTA** — repeat "Contact us" pill, short reassurance line about speed/fees/reliability.
9. **Footer** — logo, nav links, legal links (Terms of Use → `/terms`, Privacy Policy → `/privacy`, AML Policy → `/aml`, see Routes above), copyright.

## Modals

Both built on shadcn/ui `Dialog` (Radix), restyled as a shared `GlassModal` primitive: `backdrop-blur-2xl`, layered semi-transparent white/black gradient panel, 1px inset border with a soft top highlight (iOS control-center look), spring-in/out via Framer Motion, blurred dark overlay behind.

- **Login modal**: email + password fields (react-hook-form + zod). On submit, after a ~700ms fake delay, always shows the error "Invalid email or password." as an inline red-tinted alert inside the modal — no successful login path exists. A link "Don't have an account? Contact us" switches to the Contact modal.
- **Contact modal**: fields — country* (searchable select), company*, email*, phone (optional), comment* (textarea). On submit, POSTs to `/api/contact`; on success, replaces the form with a confirmation state ("Thanks — our team will reach out within 1 business day.") and a close button.

## Brand & Visual Identity

- Name: **HQclouds**, lowercase wordmark in the nav/logo, in the style of Klarna's lowercase logotype, paired with an abstract arrow/chevron mark suggesting speed and continuity.
- Palette: black + cream/off-white + one bold accent (coral-pink, Klarna-inspired but a distinct hex, not a literal copy) across alternating full-bleed sections.
- Shape language: large border-radius (24–32px) on cards/panels, pill-shaped buttons, big bold display type for headlines.
- Fonts: Space Grotesk (headings), Inter (body), both via `next/font/google`.
- Icons/OG image: generated in code, no external image-gen tool.
  - `app/icon.tsx` — 32×32 favicon via `ImageResponse`
  - `app/apple-icon.tsx` — 180×180
  - `app/opengraph-image.tsx` — branded OG/Twitter card image

## Metadata / SEO

`app/layout.tsx` exports metadata: title ("HQclouds — Fast, Low-Fee Crypto Payments"), description emphasizing speed / fees from 0.3% / reliability, Open Graph + Twitter card (using the generated OG image), `theme-color`, `robots`. All copy in English.

## Responsive Strategy

Mobile-first Tailwind breakpoints. Header collapses to hamburger + full-screen glass sheet. Hero stacks vertically. Network grid becomes horizontal scroll on small screens. Fee cards stack. Testimonials switch from grid to CSS scroll-snap carousel below `md`.

## Deployment

- `next.config.ts`: `output: 'standalone'`
- Multi-stage `Dockerfile` (deps → build → minimal runtime image running the standalone server)
- `docker-compose.yml`: single `web` service, port 3000, `restart: unless-stopped`
- `.dockerignore`
- Target: self-hosted VPS via `docker compose up -d --build`; the standalone output keeps the image small and startup fast. Not tied to Vercel, though the code stays fully Vercel-compatible (no Docker-only hacks).

## Testing / Verification

`npm run lint` and `npm run build` must pass before the work is considered done. No unit/e2e test suite — this is a static marketing page with no server-side business logic beyond a validation stub (YAGNI). A Playwright smoke test can be added later if requested.

## Explicitly Out of Scope

- Real authentication / user accounts / database
- Real contact-form delivery (email, CRM, webhook)
- Real crypto payment processing, wallets, or blockchain integration
- No pages/routes beyond `/`, `/terms`, `/privacy`, and `/aml`
- Analytics/tracking
