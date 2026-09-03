# AsteroidPay Content & Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the AsteroidPay (renamed from KShost) homepage's content and per-block layout in a Stripe-inspired style, fold the standalone Fees section into Payment Gateway, and ship five brand-new sections (API, White-label, Wallet, Receive, Send, Convert) introducing a second product line — a centralized hot wallet — while completing a full KShost→AsteroidPay brand rename across the codebase.

**Architecture:** Every new section slots into `app/page.tsx` at its final position the moment it's built — the new order requires zero reshuffling of existing sections relative to each other (only insertions between them), so there is no separate "reorder" task. Order: Hero → TrustBar → Services (Fees merged in) → **API** → AutoConvert → **White-label** → Testimonials → **Wallet** → **Receive** → **Send** → **Convert** → FinalCta → Footer.

**Tech Stack:** Next.js 16 (App Router, TS, React 19), Tailwind CSS v4 (`@theme` tokens in `app/globals.css` — unchanged by this plan), Framer Motion, `react-hook-form` + `zod` (existing pattern for the one new form this plan adds), `lucide-react` (already a dependency, used sparingly for chrome icons — not for the marketing-section glyphs, which stay hand-drawn inline SVG per the existing convention).

**Spec:** `docs/superpowers/specs/2026-09-03-kshost-content-redesign-design.md`
**Copy deck (source of truth for all text — never invent copy, pull it verbatim from here):** `docs/superpowers/specs/2026-09-03-kshost-content-copy-deck.md`

## Global Constraints

- Brand name is **AsteroidPay** everywhere — UI copy, metadata, JSON-LD, alt/aria text, code comments. Every existing "KShost"/"kshost" occurrence becomes "AsteroidPay"/"asteroidpay" (case-preserving: `KShost` → `AsteroidPay`, `kshost` → `asteroidpay`). Domain placeholder becomes `asteroidpay.io` everywhere `kshost.com` appeared.
- Exception: dated historical docs from the *prior* redesign are left untouched — `docs/superpowers/design-refs/2026-09-02-kshost-tokens.md`, `docs/superpowers/plans/2026-09-02-kshost-redesign.md`, `docs/superpowers/specs/2026-09-02-kshost-redesign-design.md`. These are historical records, not live brand surface.
- All copy for reworked and new sections is pulled **verbatim** from the copy deck's numbered sections (§1–§13). If a task needs text the deck doesn't specify, that's a plan defect — stop and flag it, don't invent copy.
- Every reworked/new section stays inside the existing design-token system (dark background, `#CDE833` lime accent, `Space Grotesk`/`Inter`/`JetBrains Mono`, existing radius scale, existing `Reveal` component / `viewport={{ once: false }}` scroll-replay convention). This plan does not touch `app/globals.css` tokens.
- Existing testimonial quotes and client attributions (`lib/data/testimonials.ts`) are kept verbatim **except** brand-name references inside the quotes, which follow the same AsteroidPay rename as everything else.
- No new routes/pages. Every new section is a same-page anchor (`id="..."` on its `<section>`) in `app/page.tsx`.
- Logo mark: Task 1 installs a **plain placeholder** mark (exact geometry given below) — not a finished custom design. The user supplies the real asset later; do not iterate on or polish the placeholder's geometry beyond what's specified.
- One new backend surface is in scope, and only this: `app/api/register/route.ts` + `lib/validation/register.ts`, built in Task 8, mirroring `app/api/contact/route.ts`'s existing pattern exactly (zod validation, a simulated 400ms delay, `console.log`, `{ ok: true }`/`{ ok: false, errors }` responses). No database, no real email delivery, no other new backend work anywhere in this plan.
- Do NOT introduce a test framework. Verification per task is `npm run build`, `npm run lint`, targeted `grep` sweeps, and manual checks via `mcp__playwright__browser_navigate` / `browser_resize` / `browser_take_screenshot` (or `browser_snapshot`) where a task calls for a visual check.
- Local git commits only, one per completed task, on this worktree's branch (`feature-2`) — never push, never commit to `main`.
- `lib/data/networks.ts`, `lib/data/coins.ts`, and `app/api/contact/route.ts` are unchanged by this plan (only read from, never modified) — the one exception is `lib/data/testimonials.ts`'s brand-name-only edits above.
- `components/sections/final-cta.tsx` gets no edits anywhere in this plan — copy deck §12 keeps it exactly as-is, since it already reads correctly for both product lines without naming either. This is a deliberate decision, not an oversight — no task below touches this file.

---

### Task 1: Brand rename sweep — AsteroidPay, placeholder logo, domain

**Files:**
- Modify: `components/logo-mark.tsx`, `components/logo.tsx`
- Modify: `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`
- Modify: `app/opengraph-image.tsx`
- Modify: `components/footer.tsx`, `components/login-modal.tsx`
- Modify: `app/terms/page.tsx`, `app/privacy/page.tsx`, `app/aml/page.tsx`
- Modify: `lib/data/testimonials.ts` (brand-name mentions inside quotes only)
- Modify: `README.md` (if it names KShost)

**Interfaces:**
- Produces: every later task's copy and every existing file reads "AsteroidPay", not "KShost" — later tasks never need their own rename pass.
- Produces: `LogoMark`'s new placeholder geometry, consumed unchanged by `logo.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx` (none of those three route files need edits — they only call `<LogoMark ... />`, which is edited once here).

- [ ] **Step 1: Replace the logo mark with a plain placeholder**

In `components/logo-mark.tsx`, replace the K-flow paths with a simple "A" placeholder built from the same primitives (solid rect badge + stroked paths only — no gradients/filters, so it still renders identically via Tailwind and via `next/og`'s satori renderer). Keep the same badge rect, `ACCENT`/`INK` constants, and component signature (`size`, `variant`, `strokeWidth`, `className`) — only the inner glyph paths change:

```tsx
<path d="M22 10 12 34" stroke={INK} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
<path d="M22 10 32 34" stroke={INK} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
<path d="M16.2 24H27.8" stroke={INK} strokeWidth={strokeWidth} strokeLinecap="round" />
```

Update the file's top comment to say this is a temporary placeholder for the AsteroidPay "A" mark, pending the final asset from the user, and that `logo.tsx`/`app/icon.tsx`/`app/apple-icon.tsx`/`app/opengraph-image.tsx` all consume this one file so replacing the asset later only requires editing here (or swapping this component's internals for an `<img>`/`next/image` if the final asset is a raster/vector file rather than inline paths).

- [ ] **Step 2: Rebrand `logo.tsx`**

In `components/logo.tsx`, change `aria-label="KShost home"` → `aria-label="AsteroidPay home"` and the visible wordmark text `KShost` → `AsteroidPay`.

- [ ] **Step 3: Rebrand `app/layout.tsx` metadata and JSON-LD**

Replace every `"KShost"` string and `"https://kshost.com"` URL in the `metadata` object, `ORGANIZATION_JSON_LD`, matching the existing structure exactly (same keys, same relative-URL pattern) — e.g. `metadataBase: new URL("https://asteroidpay.io")`, `name: "AsteroidPay"`, `title.default: "AsteroidPay — Fast, Low-Fee Crypto Payments"`, `title.template: "%s · AsteroidPay"`, `url: "https://asteroidpay.io"`, `logo: "https://asteroidpay.io/icon.png"`. Descriptions ("AsteroidPay is a crypto payment gateway built for speed...") get the same brand-name swap, wording otherwise unchanged.

- [ ] **Step 4: Rebrand `app/robots.ts` and `app/sitemap.ts`**

`app/robots.ts`: `sitemap: "https://asteroidpay.io/sitemap.xml"`.
`app/sitemap.ts`: `const BASE_URL = "https://asteroidpay.io";` — everything else in the file (the two last-modified dates, the route list) is unchanged.

- [ ] **Step 5: Rebrand `app/opengraph-image.tsx`**

Change the wordmark text `KShost` → `AsteroidPay` in the JSX (the tagline/description text below it is unrelated to the brand name and stays as-is unless Task 2/3's copy changes affect it — check against the copy deck once those are approved text; if unsure, leave the tagline text unchanged in this task and let a later task touch it only if its own copy deck section says to).

- [ ] **Step 6: Rebrand the footer, login modal, and legal pages**

`components/footer.tsx`: the large decorative wordmark (`KShost` string in the `<span>`) and the copyright line's `© {year} KShost.` both become `AsteroidPay`. (Nav links themselves are rewritten in Task 10 — don't touch them here.)
`components/login-modal.tsx`: the `GlassModal` `title="Log in to KShost"` → `"Log in to AsteroidPay"`.
`app/terms/page.tsx`, `app/privacy/page.tsx`, `app/aml/page.tsx`: every `KShost` occurrence (page metadata description, body copy) → `AsteroidPay`. Wording otherwise unchanged — this is a name swap, not a content rewrite of the legal pages.

- [ ] **Step 7: Rebrand testimonial quotes' brand mentions**

In `lib/data/testimonials.ts`, the two quotes that name-check the brand ("KShost just works...", "KShost is the first crypto payment tool...") get `KShost` → `AsteroidPay`. Every other word in every quote, and every `name`/`role`/`company`/`location` field, is unchanged.

- [ ] **Step 8: Sweep for anything missed**

```bash
grep -rniE "kshost" --include="*.ts" --include="*.tsx" --include="*.md" --include="*.json" . \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
  --exclude-dir=".superpowers" \
  --exclude="docs/superpowers/design-refs/2026-09-02-kshost-tokens.md" \
  --exclude="docs/superpowers/plans/2026-09-02-kshost-redesign.md" \
  --exclude="docs/superpowers/specs/2026-09-02-kshost-redesign-design.md" \
  --exclude="docs/superpowers/specs/2026-09-03-kshost-content-redesign-design.md" \
  --exclude="docs/superpowers/specs/2026-09-03-kshost-content-copy-deck.md" \
  --exclude="docs/superpowers/plans/2026-09-03-asteroidpay-content-redesign.md"
```

Fix any remaining hit (expect `README.md` if it names the project, and possibly `package.json`'s `"name"` field — update both to `asteroidpay`/`AsteroidPay` as appropriate for their context). The two 2026-09-03 spec docs and this plan file are excluded because they intentionally still narrate "KShost → AsteroidPay" as history/rationale — that's correct, not a miss.

- [ ] **Step 9: Verify and commit**

Run `npm run build` and `npm run lint` — both must pass clean. Re-run the Step 8 grep to confirm zero unexpected hits.

```bash
git add -A
git commit -m "rebrand: KShost -> AsteroidPay across the codebase, placeholder logo mark"
```

---

### Task 2: Hero & Supported-coins copy polish

**Files:**
- Modify: `components/sections/hero.tsx`

**Interfaces:**
- Consumes: copy deck §1.
- No interface changes — `Hero`'s props and exports are unchanged.

- [ ] **Step 1: Apply copy deck §1**

In `components/sections/hero.tsx`, the H1 and sub-copy are unchanged (deck §1 keeps them as-is). The only change: the secondary link's label and target.

```tsx
<Link
  href="/#services"
  className="inline-flex h-12 items-center justify-center rounded-full border border-input px-8 text-sm font-medium text-foreground hover:bg-muted"
>
  See pricing
</Link>
```

(was `href="/#fees"` / label `"See fees"` — the standalone Fees section is being removed in Task 3, and its content now lives inside `#services`.)

- [ ] **Step 2: Confirm Supported-coins needs no change**

Per copy deck §2, `components/sections/trust-bar.tsx` gets no copy or layout change. Do not edit this file in this task — it's listed here only so the "no change" decision is recorded, not missed as an oversight.

- [ ] **Step 3: Verify and commit**

`npm run build && npm run lint`. Manually confirm (dev server or `mcp__playwright__browser_navigate` to `/`) that clicking "See pricing" scrolls to the Payment Gateway/network-grid section.

```bash
git add components/sections/hero.tsx
git commit -m "content: update hero secondary CTA to point at #services"
```

---

### Task 3: Payment gateway rework — merge Fees in, remove the standalone Fees section

**Files:**
- Modify: `components/sections/services.tsx`
- Delete: `components/sections/fees.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: copy deck §3.
- Produces: `Services` now renders the pricing content previously owned by `Fees` — no other file imports `Fees` after this task (confirmed by the Task 1-style grep in Step 4 below).

- [ ] **Step 1: Move Fees's icons and data into `services.tsx`**

Before deleting `fees.tsx`, copy its five icon components (`BoltIcon`, `CalendarIcon`, `ShieldCheckIcon`, `ChartUpIcon`, `PercentIcon`) and the `FEE_POINTS` array verbatim into `services.tsx` as additional module-level declarations (same JSX/paths, unchanged — these are generic monoline icons, not KShost-specific, so no rename needed inside them).

- [ ] **Step 2: Add the embedded pricing callout to `Services`' JSX**

Per copy deck §3, insert a new block between the existing intro `motion.div` and the network-grid `motion.div` (both already in the file), inside the same `<div className="mx-auto max-w-6xl px-4">` wrapper:

```tsx
<motion.div
  initial="hidden"
  whileInView="show"
  viewport={{ once: false, amount: 0.3 }}
  variants={gridVariants}
  className="mt-16 rounded-3xl border border-border bg-card p-8 sm:p-10"
>
  <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-baseline sm:gap-4">
    <span className="font-heading text-5xl font-bold text-accent sm:text-6xl">From 0.3%</span>
    <span className="text-muted-foreground">per transaction — and it drops further as your volume grows.</span>
  </div>
  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {FEE_POINTS.map(({ Icon, title, description }) => (
      <motion.div key={title} variants={cardVariants}>
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-6 rounded-xl bg-accent/15" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-muted">
            <Icon className="h-6 w-6 text-accent" />
          </div>
        </div>
        <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </motion.div>
    ))}
  </div>
</motion.div>
```

This reuses `Services`' own `gridVariants`/`cardVariants` (already defined in the file, providing `staggerChildren`) for the outer wrapper — not `introVariants`, which has no stagger — so the five cards stagger in the same way the network-grid cards already do, instead of fading in all at once. This keeps the whole file on one reveal-animation pattern rather than importing `Reveal`. The stat text ("From 0.3%" / the sub-line) is copy deck §3's stat callout verbatim.

- [ ] **Step 3: Delete `fees.tsx` and remove it from `page.tsx`**

```bash
git rm components/sections/fees.tsx
```

In `app/page.tsx`, remove the `import { Fees } from "@/components/sections/fees";` line and the `<Fees />` element. (Full final ordering of `page.tsx` isn't settled until Task 10 — for now just removing the now-deleted component's usage so the build doesn't break.)

- [ ] **Step 4: Verify no dangling references**

```bash
grep -rn "sections/fees\|<Fees" --include="*.tsx" . --exclude-dir=node_modules --exclude-dir=.next
```

Must return nothing.

- [ ] **Step 5: Verify and commit**

`npm run build && npm run lint`. Manually check `/` (dev server or Playwright): the Payment Gateway section shows the network grid AND the new pricing card, and there's no broken gap where Fees used to render.

```bash
git add -A
git commit -m "content: merge Fees into Payment Gateway, remove standalone Fees section"
```

---

### Task 4: API section (new)

**Files:**
- Create: `components/sections/api.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: copy deck §4.
- Produces: `Api` component, exported from `components/sections/api.tsx`, imported by `app/page.tsx` and rendered between `Services` and `AutoConvert`.

- [ ] **Step 1: Build `components/sections/api.tsx`**

Two-column layout matching `components/sections/auto-convert.tsx`'s structure (`"use client"`, an outer `<section id="api" className="border-t border-border bg-background py-24 text-foreground">`, `<div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">` with two `motion.div` columns using the same `initial`/`whileInView`/`viewport={{ once: false, amount: 0.4 }}`/`transition` pattern already in that file). This section deliberately does NOT copy `auto-convert.tsx`'s `bg-card`/`border-y` — `Services` (right before it) is `bg-background` with no border, so `Api` needs its own `border-t` to separate from it; `AutoConvert` (right after it) already has `border-y` on both its own edges, so no border is needed on `Api`'s trailing edge. Left column: eyebrow (`font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase`, text "Built for developers" per copy deck §4), H2 ("One API for every network you accept."), body paragraph (copy deck §4's body, verbatim), then a bullet list reusing an `ArrowIcon` (copy the exact `ArrowIcon` function from `auto-convert.tsx` into this file — it's small and generic, not worth sharing across files for one icon) over the four bullets from copy deck §4, then a `Button` (import from `@/components/ui/button`, `useModal` from `@/components/modal-provider`) labeled "Contact us" calling `openContact()`.

Right column: the code-mockup card —

```tsx
function ApiCodeMockup({ className }: { className?: string }) {
  return (
    <div className={`rounded-3xl border border-border bg-background p-6 font-mono text-xs leading-relaxed sm:text-sm ${className ?? ""}`}>
      <p className="text-muted-foreground">Request</p>
      <pre className="mt-2 overflow-x-auto text-foreground">{`POST /v1/payments
{
  "amount": "129.00",
  "currency": "USD",
  "settle_to": "USDT",
  "webhook_url": "https://yoursite.com/hooks/asteroidpay"
}`}</pre>
      <p className="mt-6 text-muted-foreground">Response</p>
      <pre className="mt-2 overflow-x-auto text-accent">{`200 OK
{
  "id": "pay_8fq2k1",
  "status": "pending",
  "pay_address": "TXn2...ac9F",
  "network": "TRON"
}`}</pre>
    </div>
  );
}
```

Wrap `<ApiCodeMockup />` in the second `motion.div` column, same as `AutoConvertIllustration` is wrapped in `auto-convert.tsx`.

- [ ] **Step 2: Wire into `page.tsx`**

```tsx
import { Api } from "@/components/sections/api";
// ...
<Services />
<Api />
<AutoConvert />
```

- [ ] **Step 3: Verify and commit**

`npm run build && npm run lint`. Manually check the section renders between Payment Gateway and Auto-convert, the code block doesn't overflow on mobile widths (375px), and the reveal animation replays on repeated scroll past it.

```bash
git add components/sections/api.tsx app/page.tsx
git commit -m "feat: add API section"
```

---

### Task 5: Auto-convert copy refresh

**Files:**
- Modify: `components/sections/auto-convert.tsx`

**Interfaces:**
- Consumes: copy deck §5. No structural/props changes.

- [ ] **Step 1: Add the eyebrow line**

Per copy deck §5, this section had no eyebrow before. Add one above the existing H2, inside the same first `motion.div`:

```tsx
<p className="font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase">Auto-convert</p>
```

placed immediately before the existing `<h2 className="font-heading text-4xl font-bold sm:text-5xl">`.

- [ ] **Step 2: Confirm the rest is unchanged**

Copy deck §5's H2 and body paragraph and all three bullets are identical to the current text — no other edits in this file.

- [ ] **Step 3: Verify and commit**

`npm run build && npm run lint`.

```bash
git add components/sections/auto-convert.tsx
git commit -m "content: add eyebrow label to Auto-convert section"
```

---

### Task 6: White-label section (new)

**Files:**
- Create: `components/sections/white-label.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: copy deck §6.
- Produces: `WhiteLabel` component, rendered between `AutoConvert` and `Testimonials`.

- [ ] **Step 1: Build `components/sections/white-label.tsx`**

Follow `components/sections/fees.tsx`'s pre-Task-3 structure as the template (a centered intro + a card grid of icon-chip feature cards) since that pattern already exists and reads well for a bullet-driven feature block — but this section is NOT deleted like Fees was; it's a new file modeled on that same shape.

The section keeps `bg-background` (not `bg-card`) so its own feature cards — which are `bg-card` — still pop against the section, matching the same contrast convention `Services`' pricing cards and the original `Fees` cards used. `AutoConvert` (before this section) already has its own `border-y`, so no border is needed on this section's leading edge — but `Testimonials` (after this section) is `bg-background` with no border, so this section needs `border-b` on its own trailing edge to avoid two flat `bg-background` sections butting together with zero separation.

```tsx
"use client";

import { Reveal } from "@/components/ui/reveal";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 4 6 4 9s-1.5 6.5-4 9c-2.5-2.5-4-6-4-9s1.5-6.5 4-9Z" />
    </svg>
  );
}

function PaletteIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 0 18c1 0 1.8-.8 1.8-1.8 0-.5-.2-.9-.5-1.3-.3-.3-.5-.7-.5-1.2 0-1 .8-1.7 1.7-1.7H16a4.5 4.5 0 0 0 4.5-4.5C20.5 6.6 16.7 3 12 3Z" />
      <circle cx="7.5" cy="11" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A10.6 10.6 0 0 1 12 5c5 0 9 4 10.5 7-.6 1.2-1.5 2.5-2.6 3.6M6.1 6.1C4.2 7.4 2.7 9.1 1.5 12 3 15 7 19 12 19c1.1 0 2.1-.2 3.1-.5" />
      <path d="M9.5 10a2.5 2.5 0 0 0 3.5 3.5" />
    </svg>
  );
}

function HeadsetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 13a8 8 0 1 1 16 0" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19v1a2 2 0 0 1-2 2h-3" />
    </svg>
  );
}

const WHITE_LABEL_POINTS = [
  { Icon: GlobeIcon, title: "Custom domain", description: "Checkout and dashboard run on your own domain, not ours." },
  { Icon: PaletteIcon, title: "Your logo and colors", description: "Every screen your customers see carries your brand, throughout." },
  { Icon: EyeOffIcon, title: "No third-party branding", description: "Your customers never see the word AsteroidPay." },
  { Icon: HeadsetIcon, title: "Dedicated support", description: "White-label accounts get their own support line." },
];

export function WhiteLabel() {
  const { openContact } = useModal();

  return (
    <section id="white-label" className="border-b border-border bg-background py-28">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase">White-label</p>
          <h2 className="mt-3 font-heading text-4xl font-bold text-foreground sm:text-5xl">
            Your brand at checkout, not ours.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Merchants on our white-label plan run AsteroidPay entirely under their own identity —
            checkout, dashboard, and customer emails all carry your logo, your colors, your domain.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {WHITE_LABEL_POINTS.map(({ Icon, title, description }, i) => (
            <Reveal key={title} index={i}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 transition-[translate,scale,border-color,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-accent hover:shadow-[0_0_48px_rgba(205,232,51,0.28)]">
                <div className="relative h-14 w-14">
                  <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-6 rounded-xl bg-accent/15" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-muted">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex justify-center">
          <Button size="lg" className="h-12 rounded-full px-8" onClick={openContact}>
            Talk to sales
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Wire into `page.tsx`**

```tsx
import { WhiteLabel } from "@/components/sections/white-label";
// ...
<AutoConvert />
<WhiteLabel />
<Testimonials />
```

- [ ] **Step 3: Verify and commit**

`npm run build && npm run lint`. Manually confirm all four icons render distinctly (not blank/broken paths) and the "Talk to sales" button opens the contact modal.

```bash
git add components/sections/white-label.tsx app/page.tsx
git commit -m "feat: add White-label section"
```

---

### Task 7: Testimonials layout restyle

**Files:**
- Modify: `components/sections/testimonials.tsx`

**Interfaces:**
- Consumes: copy deck §7. No change to `lib/data/testimonials.ts` beyond Task 1's brand-name edits — quotes/attributions stay exactly as they are.

- [ ] **Step 1: Restyle from a plain marquee to a spotlight-plus-strip layout**

Per copy deck §7, keep eyebrow "Reviews" and H2 "Built for businesses that move fast." unchanged. Restructure the section so the first testimonial (`testimonials[0]`) renders as a large spotlight quote above the existing marquee, giving the section a Stripe-style "one big proof point, then a scrolling strip of the rest" shape instead of a flat marquee of everything:

```tsx
export function Testimonials() {
  const [spotlight, ...rest] = testimonials;
  const items = [...rest, ...rest];

  return (
    <section id="reviews" className="bg-background py-24 text-foreground">
      <Reveal className="mx-auto max-w-6xl px-4">
        <p className="font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase">Reviews</p>
        <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
          Built for businesses that move fast.
        </h2>
      </Reveal>

      <Reveal className="mx-auto mt-10 max-w-3xl px-4 text-center">
        <blockquote className="font-heading text-2xl leading-snug text-foreground sm:text-3xl">
          &ldquo;{spotlight.quote}&rdquo;
        </blockquote>
        <p className="mt-5 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{spotlight.name}</span> · {spotlight.role}, {spotlight.company} · {spotlight.location}
        </p>
      </Reveal>

      <div className="group relative mt-14 overflow-hidden motion-reduce:overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:[mask-image:none]">
        <div className="flex w-max animate-[marquee_70s_linear_infinite] gap-6 px-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {items.map((t, i) => (
            <figure
              key={`${t.id}-${i}`}
              aria-hidden={i >= rest.length ? "true" : undefined}
              className="w-[360px] shrink-0 rounded-3xl border border-border bg-card p-6 transition-colors duration-150 hover:border-border-strong"
            >
              <blockquote className="text-sm leading-relaxed text-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-semibold text-foreground">{t.name}</div>
                <div className="text-muted-foreground">
                  {t.role}, {t.company} · {t.location}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
```

The marquee mechanism, pause-on-hover, reduced-motion handling, and mask-fade are otherwise unchanged from the existing implementation — only the spotlight block is new, and the marquee now excludes whichever testimonial became the spotlight (so it isn't shown twice back-to-back).

- [ ] **Step 2: Verify and commit**

`npm run build && npm run lint`. Manually confirm the spotlight quote shows the first testimonial, the marquee below still loops seamlessly and excludes that same testimonial, and hover-pause still works.

```bash
git add components/sections/testimonials.tsx
git commit -m "redesign: add spotlight quote above the Testimonials marquee"
```

---

### Task 8: Wallet section + registration modal (new)

**Files:**
- Create: `components/sections/wallet.tsx`
- Create: `components/register-modal.tsx`
- Create: `lib/validation/register.ts`
- Create: `app/api/register/route.ts`
- Modify: `components/modal-provider.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: copy deck §8, the existing `contact-modal.tsx`/`login-modal.tsx`/`app/api/contact/route.ts` pattern as a structural template.
- Produces: `ModalContextValue` gains `openRegister: () => void` and `ModalType` gains `"register"`, consumed by `wallet.tsx`'s CTA and by `RegisterModal` itself. Produces `registerSchema`/`RegisterInput` from `lib/validation/register.ts`, consumed only by `register-modal.tsx` and `app/api/register/route.ts`.

- [ ] **Step 1: Add the register schema**

```ts
// lib/validation/register.ts
import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.email("Enter a valid email").max(200),
});

export type RegisterInput = z.infer<typeof registerSchema>;
```

- [ ] **Step 2: Add the register API route**

```ts
// app/api/register/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { registerSchema } from "@/lib/validation/register";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, errors: { _form: ["Invalid request body"] } },
      { status: 400 }
    );
  }

  const parsed = registerSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 }
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log("New wallet early-access signup:", parsed.data);

  return NextResponse.json({ ok: true });
}
```

This mirrors `app/api/contact/route.ts` exactly (same error shape, same simulated delay, same log-and-acknowledge behavior) — no `app/api/contact/route.ts` edits.

- [ ] **Step 3: Extend `modal-provider.tsx`**

```tsx
type ModalType = "login" | "contact" | "register" | null;

interface ModalContextValue {
  activeModal: ModalType;
  openLogin: () => void;
  openContact: () => void;
  openRegister: () => void;
  close: () => void;
}
```

Add `openRegister: () => setActiveModal("register")` alongside the existing two setters in the provider value.

- [ ] **Step 4: Build `components/register-modal.tsx`**

Model directly on `components/contact-modal.tsx`'s structure (form state, submit handler, success state, `GlassModal` wrapper) but with only two fields:

```tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlassModal } from "@/components/ui/glass-modal";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerSchema, type RegisterInput } from "@/lib/validation/register";

export function RegisterModal() {
  const { activeModal, close } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (values: RegisterInput) => {
    setServerError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      close();
      setSubmitted(false);
      setServerError(null);
      reset();
    }
  };

  return (
    <GlassModal open={activeModal === "register"} onOpenChange={handleOpenChange} title="Get the AsteroidPay Wallet">
      {submitted ? (
        <div className="flex flex-col items-center gap-5 py-4 text-center">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9.2" />
            <path d="m8.2 12.2 2.6 2.6 5-5.4" />
          </svg>
          <p className="text-foreground">Thanks — we&apos;ll email you as soon as early access opens.</p>
          <Button className="h-11 w-full rounded-full" onClick={() => handleOpenChange(false)}>
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="register-name" className="mb-1.5">Name</Label>
            <Input id="register-name" autoComplete="name" {...register("name")} />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="register-email" className="mb-1.5">Email</Label>
            <Input id="register-email" type="email" autoComplete="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          {serverError && (
            <p className="rounded-xl border border-destructive/28 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {serverError}
            </p>
          )}
          <Button type="submit" disabled={isSubmitting} className="h-11 w-full rounded-full">
            {isSubmitting ? "Submitting…" : "Get early access"}
          </Button>
        </form>
      )}
    </GlassModal>
  );
}
```

- [ ] **Step 5: Mount `RegisterModal` in `app/layout.tsx`**

```tsx
import { RegisterModal } from "@/components/register-modal";
// ...
<LoginModal />
<ContactModal />
<RegisterModal />
```

- [ ] **Step 6: Build `components/sections/wallet.tsx`**

Two-column layout, same structural template as `auto-convert.tsx`/`api.tsx` (outer `<section id="wallet" className="border-t border-border bg-background py-24 text-foreground">`, two `motion.div` columns, same `viewport={{ once: false, amount: 0.4 }}` pattern). The `border-t` matters here: `Testimonials` (right before this section) is `bg-background` with no border of its own, so without it this section would butt against Testimonials with zero visual separation. `Receive` (right after) has its own `border-y` (Task 9), so no trailing border is needed on this section. Left column: eyebrow "AsteroidPay Wallet", H2 "One wallet. Always on. Always ready.", body paragraph (copy deck §8, verbatim), three bullets (copy deck §8's three bullets) using a copy of the exact `ArrowIcon` function from `auto-convert.tsx` (same as Task 4 does for `api.tsx` — copy it into this file too, don't import across section files), then a `Button` labeled "Get the wallet" calling `openRegister()` (from `useModal()`).

Right column — a simple balance-card mockup (reuses the existing rect/text SVG vocabulary from `AutoConvertIllustration`, not a new illustration style):

```tsx
function WalletCardMockup({ className }: { className?: string }) {
  return (
    <svg width="420" height="320" viewBox="0 0 420 320" aria-hidden="true" className={className}>
      <rect x="20" y="20" width="380" height="280" rx="28" fill="var(--color-card)" stroke="var(--color-border)" strokeWidth="1.2" />
      <text x="48" y="72" fill="var(--color-muted-foreground)" fontFamily="'JetBrains Mono', monospace" fontSize="12" letterSpacing="0.1em">BALANCE</text>
      <text x="48" y="120" fill="var(--color-foreground)" fontFamily="'Space Grotesk', sans-serif" fontSize="40" fontWeight="700">$4,285.60</text>
      <g>
        <rect x="48" y="220" width="96" height="44" rx="22" fill="var(--color-muted)" stroke="var(--color-accent)" strokeOpacity="0.5" strokeWidth="1" />
        <text x="96" y="247" textAnchor="middle" fill="var(--color-accent)" fontFamily="'JetBrains Mono', monospace" fontSize="12">Receive</text>
        <rect x="162" y="220" width="80" height="44" rx="22" fill="var(--color-muted)" stroke="var(--color-accent)" strokeOpacity="0.5" strokeWidth="1" />
        <text x="202" y="247" textAnchor="middle" fill="var(--color-accent)" fontFamily="'JetBrains Mono', monospace" fontSize="12">Send</text>
        <rect x="260" y="220" width="96" height="44" rx="22" fill="var(--color-muted)" stroke="var(--color-accent)" strokeOpacity="0.5" strokeWidth="1" />
        <text x="308" y="247" textAnchor="middle" fill="var(--color-accent)" fontFamily="'JetBrains Mono', monospace" fontSize="12">Convert</text>
      </g>
    </svg>
  );
}
```

This mockup's three pill labels double as a visual preview of the three sections that follow (Receive/Send/Convert) — deliberate, not incidental.

- [ ] **Step 7: Wire into `page.tsx`**

```tsx
import { Wallet } from "@/components/sections/wallet";
// ...
<Testimonials />
<Wallet />
```

- [ ] **Step 8: Verify and commit**

`npm run build && npm run lint`. Manually: click "Get the wallet", fill the form, submit, confirm the success state shows and the POST to `/api/register` returns 200 (check via `mcp__playwright__browser_network_requests` or the terminal running `next dev`, which should log "New wallet early-access signup: ...").

```bash
git add components/sections/wallet.tsx components/register-modal.tsx lib/validation/register.ts app/api/register/route.ts components/modal-provider.tsx app/layout.tsx app/page.tsx
git commit -m "feat: add Wallet section and early-access registration flow"
```

---

### Task 9: Receive / Send / Convert feature blocks (new)

**Files:**
- Create: `components/sections/receive.tsx`, `components/sections/send.tsx`, `components/sections/convert.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: copy deck §9, §10, §11.
- Produces: `Receive`, `Send`, `Convert` components, rendered in that order right after `Wallet`.

These three are batched into one task — same shape, same template, independent content — per copy deck §9–§11.

- [ ] **Step 1: Build a shared layout shape (each in its own file, not a shared component)**

Each of the three files follows this exact shape (centered, single-column, with one large hero icon — not the two-column pattern used elsewhere, since these are short single-idea blocks):

```tsx
"use client";

import { motion } from "framer-motion";

function ReceiveIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="14" width="18" height="7" rx="2" />
      <path d="M12 3v9M8 8l4 4 4-4" />
    </svg>
  );
}

const BULLETS = [
  "Top up in any supported coin, on any network",
  "Funds consolidate into one balance, network-agnostic",
  "Held safely and ready the moment they land",
];

export function Receive() {
  return (
    <section id="receive" className="border-y border-border bg-card py-24 text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mx-auto max-w-2xl px-4 text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted">
          <ReceiveIcon className="h-7 w-7" />
        </div>
        <p className="mt-6 font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase">Receive</p>
        <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
          Top up your wallet, in any coin, on any network.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Fund your AsteroidPay Wallet from any supported coin, on any network — everything
          consolidates into one centralized balance, held safely and ready whenever you need it.
          You don&apos;t need to track which network your funds came in on; the wallet handles
          that for you.
        </p>
        <ul className="mt-8 space-y-3 text-left text-sm text-foreground">
          {BULLETS.map((bullet) => (
            <li key={bullet} className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
```

Build `send.tsx` and `convert.tsx` on this exact same shape, changing only: the icon, the eyebrow/H2/body/bullets (copy deck §10 and §11 verbatim), and the `id`. Keep the `border-y border-border` on all three (`receive.tsx`, `send.tsx`, `convert.tsx`) exactly as shown in the Step 1 template — that border is what separates each of the three from its neighbors, so background color doesn't have to alternate perfectly for the seams to read cleanly. For variety (not for separation, which the border already handles), alternate `bg-card`/`bg-background`: `receive.tsx` → `bg-card`, `send.tsx` → `bg-background`, `convert.tsx` → `bg-card`.

Icons (same monoline convention, `viewBox="0 0 24 24"`, `stroke="var(--color-accent)"`, `strokeWidth="1.6"`):

```tsx
// send.tsx's icon
function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 20 20 4M20 4l-6 1M20 4l1 6" />
    </svg>
  );
}

// convert.tsx's icon
function ConvertIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 8h13M13 4l4 4-4 4" />
      <path d="M20 16H7M11 12l-4 4 4 4" />
    </svg>
  );
}
```

- [ ] **Step 2: Wire all three into `page.tsx` in order**

```tsx
import { Receive } from "@/components/sections/receive";
import { Send } from "@/components/sections/send";
import { Convert } from "@/components/sections/convert";
// ...
<Wallet />
<Receive />
<Send />
<Convert />
<FinalCta />
```

- [ ] **Step 3: Verify and commit**

`npm run build && npm run lint`. Manually scroll through all three — confirm each section's `border-y` reads as a clean seam against its neighbors, icons render, and each reveal animation replays on re-entry.

```bash
git add components/sections/receive.tsx components/sections/send.tsx components/sections/convert.tsx app/page.tsx
git commit -m "feat: add Receive, Send, and Convert sections"
```

---

### Task 10: Footer navigation update + full-site integration QA

**Files:**
- Modify: `components/footer.tsx`

**Interfaces:**
- Consumes: copy deck §13, and the final `app/page.tsx` order produced by Tasks 3–9 (already final — this task does not reorder anything).

- [ ] **Step 1: Rewrite the footer nav links**

Per copy deck §13:

```tsx
<nav className="flex flex-wrap justify-center gap-6 text-sm">
  <Link href="/#services" className={FOOTER_LINK_CLASS}>Solutions</Link>
  <Link href="/#api" className={FOOTER_LINK_CLASS}>API</Link>
  <Link href="/#white-label" className={FOOTER_LINK_CLASS}>White-label</Link>
  <Link href="/#wallet" className={FOOTER_LINK_CLASS}>Wallet</Link>
  <Link href="/#reviews" className={FOOTER_LINK_CLASS}>Reviews</Link>
  <a href="/terms" className={FOOTER_LINK_CLASS}>Terms of Use</a>
  <a href="/privacy" className={FOOTER_LINK_CLASS}>Privacy Policy</a>
  <a href="/aml" className={FOOTER_LINK_CLASS}>AML Policy</a>
</nav>
```

(Removes the old "Fees" and "Networks" links per copy deck §13's explicit trim.)

- [ ] **Step 2: Full-page order check**

Read `app/page.tsx` top to bottom and confirm it now matches exactly: `Navbar`, `Hero`, `TrustBar`, `Services`, `Api`, `AutoConvert`, `WhiteLabel`, `Testimonials`, `Wallet`, `Receive`, `Send`, `Convert`, `FinalCta`, `Footer`. If Tasks 3–9 left it in any other order, fix the import/JSX order now — this is the only task allowed to touch ordering, so this is the last chance to catch a slip.

- [ ] **Step 3: Full-site manual QA**

Using `mcp__playwright__browser_navigate` to `/` and `mcp__playwright__browser_resize` across at least 375px, 768px, and 1440px widths:
- Every footer link scrolls to the correct section.
- No two adjacent sections butt together with an identical flat background and no border seam between them — check every new/moved boundary (`Services`/`Api`, `Api`/`AutoConvert`, `AutoConvert`/`WhiteLabel`, `WhiteLabel`/`Testimonials`, `Testimonials`/`Wallet`, `Wallet`/`Receive`, and between `Receive`/`Send`/`Convert`) now that the whole page is assembled, not just each task's own two neighbors in isolation.
- Every new section's scroll-reveal animation replays on scrolling past it a second time (scroll down past a section, back up, back down — motion should re-fire, not stay static).
- `npm run build` and `npm run lint` both pass clean.

- [ ] **Step 4: Commit**

```bash
git add components/footer.tsx
git commit -m "content: update footer navigation for the new section set"
```
