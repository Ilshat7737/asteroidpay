# KShost Content & Layout Redesign — Design Spec

**Status:** Approved (design). Copy deck pending separate approval before implementation.

## Context

The KShost homepage (rebranded from HQclouds in the prior redesign, see
`2026-09-02-kshost-redesign-design.md`) currently ships 7 sections: Hero,
TrustBar (coins), Services (payment gateway), Auto-convert, Fees,
Testimonials, Final CTA. Visual identity (dark + lime, tokens, motion) is
already in place and is NOT being redone here.

This task is a **content and information-architecture** redesign:
rewritten copy, reworked internal layout per block (Stripe-style visual
patterns — asymmetric splits, code-mockup cards, embedded stat callouts),
and four brand-new sections introducing a second product line: a
consumer-facing crypto wallet.

## Business Scope

KShost's product surface expands from "payment gateway only" to two
product lines, marketed on the same homepage:

1. **Payment gateway** (existing) — merchants accept crypto payments,
   auto-convert to stablecoin/fiat, white-label the checkout, integrate
   via API.
2. **Wallet** (new) — a standalone, self-custody, multi-chain crypto
   wallet for end users, with Receive / Send / Convert as its three core
   actions. This is explicitly a different audience and different mental
   model than the gateway's Auto-convert (which is a merchant settlement
   mechanism, not a user-facing swap) — copy must keep these distinct.

No other business-scope changes. No new routes/pages: every new block is
an anchor section on the existing homepage (`app/page.tsx`), following the
existing convention (`#fees`, `#networks`).

## Competitive Reference

Tone, structure, and value-prop framing draw from: **NOWPayments,
CoinGate, Plisio, BitPay, Coinbase Commerce** (gateway-side blocks:
Payment gateway, API, White-label, Auto-convert) and, for the
wallet-specific blocks (Wallet, Receive, Send, Convert), the
self-custody-wallet framing used by products like Coinbase Wallet —
multi-chain support, non-custodial security messaging, plain-language
send/receive/swap copy. Not a visual reference — visual identity is
already locked to the existing dark+lime token system; only copy
structure and value-prop angles are borrowed.

## Final Section Order

```
1.  Hero                  (#hero)          — existing, copy polish only
2.  Supported coins       (#networks-bar)  — existing, copy polish only
3.  Payment gateway       (#services)      — existing, major rework + Fees folded in
4.  API                   (#api)           — NEW
5.  Auto-convert          (#auto-convert)  — existing, copy + layout refresh
6.  White-label           (#white-label)   — NEW
7.  Testimonials          (#testimonials)  — existing, layout restyle only (quotes kept)
8.  Wallet                (#wallet)        — NEW
9.  Receive               (#receive)       — NEW
10. Send                  (#send)          — NEW
11. Convert               (#convert)       — NEW
12. Final CTA              —               — existing, copy tighten
13. Footer                 —               — existing, + nav column for new sections
```

The standalone `Fees` section is removed as a distinct component; its
content (from 0.3%, no setup/monthly fee, volume discounts) is merged
into the Payment Gateway section as a visible embedded pricing
callout/card — not hidden, not a footnote.

## Per-Block Content Direction

### Hero
Keep the existing globe visual and structure. Tighten headline/subhead to
be punchier (short bold claim + concise supporting line + dual CTA),
matching the terser register the rest of the page will move to. No
layout change.

### Supported coins (TrustBar)
Copy polish on the eyebrow line only. Marquee mechanism and layout
unchanged — this pattern already matches the Stripe/21st.dev logo-cloud
convention.

### Payment gateway (Services + Fees merged)
Largest rework of an existing block:
- Stripe-style asymmetric layout (text block + illustration, as now, but
  copy reframed around "accept payments across the networks your
  customers use" with the network grid retained).
- Pricing becomes a prominent embedded element within this section: a
  stat callout ("From 0.3%") plus the existing Fees bullet points
  (no setup fee, no monthly fee, no hidden costs, volume discounts,
  transparent pricing), styled as a card or strip inside the section,
  not buried.
- File impact: `services.tsx` absorbs `fees.tsx`'s content;
  `fees.tsx` and its standalone section are removed from `page.tsx`.

### API (new)
Developer-facing block:
- Eyebrow: "Built for developers."
- Headline centered on integration speed / one API for every network.
- A code-mockup card (terminal/editor-styled, dark+lime, monospace —
  consistent with existing `JetBrains Mono` token) showing a sample
  request/response for creating a payment.
- Bullet list: webhooks, sandbox environment, official SDKs, idempotent
  requests (or similar developer-relevant points).
- CTA: link to docs (can point to `#` or an existing docs route if one
  exists — verify at implementation time; do not invent a fake working
  link if none exists).

### Auto-convert
Copy refresh (same underlying mechanism: instant conversion to
USDT/USDC/fiat at market rate) with a layout rework consistent with the
Stripe-style pass applied elsewhere — the existing SVG illustration can
be reused or adapted, not necessarily rebuilt from scratch.

### White-label (new)
B2B branding block:
- Headline: the merchant's checkout and dashboard carry their own brand,
  not KShost's.
- Bullets: custom domain, custom logo/colors, no third-party branding
  shown to the merchant's own customers, dedicated support tier.
- Visual: can reuse the existing card/mockup visual vocabulary (e.g. a
  simplified browser/checkout-frame mockup) — concrete visual spec is
  decided at implementation/plan time, not fixed here.

### Testimonials
Layout restyle only (Stripe-style spotlight or scroll layout instead of
the current treatment) — **existing quotes and client attributions are
kept verbatim**, not rewritten, since fabricating new customer quotes is
out of scope unless explicitly requested later.

### Wallet (new)
Introduces the second product line:
- Headline: a personal, multi-chain, self-custody wallet.
- Bullets: multi-chain support, self-custody (user holds the keys),
  security framing (no custodial risk).
- Visual: app-mockup style, consistent with the existing isometric-cube
  illustration vocabulary already used in Services/Auto-convert/Hero.

### Receive (new)
Feature block: generate a receive address / QR code, supported networks
list, balance updates instantly on confirmation.

### Send (new)
Feature block: send to any address or exchange, network fee transparency,
optional saved-recipients framing.

### Convert (new)
Feature block: swap between assets inside the wallet at a live rate, no
separate exchange needed. Copy must explicitly read as a *user-initiated
swap inside their own wallet*, distinct from the gateway's Auto-convert
(a merchant's inbound-payment settlement mechanism) — these are two
different features for two different audiences and must not blur
together in either section's copy.

### Final CTA
Copy tighten only, no structural change.

### Footer
Existing structure kept; add a navigation column linking to the new
anchor sections (Wallet, Receive, Send, Convert, API, White-label) so
they're discoverable from anywhere on the page.

## Visual/Layout Principles (applies to every reworked or new block)

- All blocks stay within the existing design-token system (dark base +
  `#CDE833` lime accent, `Space Grotesk`/`Inter`/`JetBrains Mono`,
  existing radius/motion scale) — this task changes copy and
  layout/composition, not the visual identity.
- Stripe-style patterns to draw from: short mono-uppercase eyebrow labels
  (already used), bold oversized headline + concise supporting copy,
  alternating asymmetric two-column composition (text/visual swapping
  sides section to section), embedded stat callouts for numbers that
  matter (fee %, network count), code/terminal-styled mockup cards for
  developer-facing content, icon-chip bullet lists (already established
  in Fees/Services).
- Scroll-reveal animations continue to replay on every viewport re-entry
  (existing `Reveal` component / `viewport: { once: false }` convention)
  — every new block must use it.
- Reuse existing shared primitives (`Reveal`, `Button`, card patterns,
  icon glyph conventions) rather than inventing new ones, unless a block's
  content genuinely doesn't fit any existing primitive (e.g. the API
  code-mockup card is new because nothing like it exists yet).

## Process

1. **This spec** — written and committed (this document).
2. **Copy deck** — a single document with final copy for all 13 blocks
   (headlines, subheads, body copy, bullet points, CTA labels) written
   next, independent of layout/component work. Sent to the user for
   approval before any layout/component work starts.
3. **Implementation plan** — written via `superpowers:writing-plans`
   using this spec + the approved copy deck, covering: new section
   components, `services.tsx`/`fees.tsx` merge, `page.tsx` reordering,
   footer nav update. **Presented to the user for explicit approval
   before execution begins** — no implementation starts until the plan
   itself is approved, separately from the copy-deck approval.
4. **Execution** — `superpowers:subagent-driven-development`, matching
   the pattern used for the prior visual redesign.

## Out of Scope

- Any change to the already-completed visual identity (colors, fonts,
  radii, motion tokens, hero globe).
- New routes/pages — everything is a same-page anchor section.
- Rewriting testimonial quotes/attributions.
- Backend/API implementation — the API section is marketing copy about
  an API, not a new working endpoint beyond what already exists
  (`app/api/contact/route.ts` stays out of scope, per the prior redesign's
  Global Constraints).
- Pricing changes — the "From 0.3%" figure and fee structure are
  unchanged, only their placement/presentation.
