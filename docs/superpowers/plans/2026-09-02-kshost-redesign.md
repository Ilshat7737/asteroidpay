# KShost Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign every visual component of the HQclouds landing site into a dark, lime-accented, continuously-animated KShost brand, with a CSS/SVG hero globe, without changing the underlying business content, routes, or form logic.

**Architecture:** Two design tasks in a Claude Design canvas (style tile, then full section artboards) produce an approved visual reference and a concrete token table; every following task ports one file or file-group from the current light/cream/pink codebase to the approved dark/lime tokens, in dependency order (tokens → shared primitives/logo → animation infra → hero → remaining sections → modals → legal pages → full-site QA).

**Tech Stack:** Next.js 16 (App Router, TS, React 19), Tailwind CSS v4 (`@theme` tokens in `app/globals.css`), Framer Motion (existing dependency — no new animation library), shadcn/ui primitives, `mcp__21st__*` for reference search, `ui-ux-pro-max` skill for palette/motion-preset guidance, `design` skill (Claude Design canvas) for the visual reference.

**Spec:** `docs/superpowers/specs/2026-09-02-kshost-redesign-design.md`

## Global Constraints

- Brand name is **KShost** (capital K, capital S, lowercase "host", one word, no space) everywhere — UI copy, metadata, JSON-LD, file content, code comments. Every existing "HQclouds" occurrence must become "KShost".
- Business, routes, copy, pricing, network list, testimonials content, and form/validation logic are **unchanged** — this plan only changes visual styling, the hero background, animation replay behavior, and the brand name.
- Single dark theme only — no light/dark toggle, no `.dark` class variant needed once `:root` itself is dark.
- Accent color is exactly `#CDE833` (lime) wherever the current design uses the pink accent (`#ff5e7e` / `--color-accent`).
- No WebGL/Three.js/react-three-fiber or any new 3D-rendering dependency — the hero globe is CSS/SVG driven by Framer Motion only.
- Every scroll-triggered reveal/motion animation replays on each viewport entry (`viewport={{ once: false }}`), not just the first.
- Do NOT introduce a test framework (no Vitest/Jest/Playwright-test runner). Verification per task is one or more of: `npm run build`, `npm run lint`, `grep` sweeps, or a manual visual check via the `mcp__playwright__browser_navigate`, `mcp__playwright__browser_resize`, and `mcp__playwright__browser_take_screenshot` tools. These are one-off manual QA actions, not an automated suite.
- Visual restyle tasks (Task 7 onward) must use the exact colors, spacing, and typography from the approved canvas and the token table produced in Tasks 1–2 — never invent new values. Where the canvas doesn't specify something explicitly, fall back to the semantic tokens defined in Task 3.
- Local git commits are allowed, one per completed task, on this worktree's branch (`feature-2`) only — never push, never commit directly to `main`.
- `lib/data/*`, `lib/validation/*`, `app/api/contact/route.ts`, and all `zod` schemas are out of scope — no task in this plan touches them.

---

### Task 1: Design research + Style Tile

**Files:**
- Create: `docs/superpowers/design-refs/2026-09-02-kshost-tokens.md` (token table — the concrete deliverable every later CSS task reads from)
- No app code changes in this task.

**Interfaces:**
- Produces: a published Claude Design canvas Artifact URL (style-tile artboard), and `docs/superpowers/design-refs/2026-09-02-kshost-tokens.md` containing a token table with exact values for: `background`, `foreground`, `card`/`card-foreground`, `border`, `muted`/`muted-foreground`, `accent` (`#CDE833`, fixed — not chosen by research), `accent-foreground` (text color placed on top of lime, e.g. near-black for contrast), `destructive`/error color tuned for the dark background, heading font, body font, and the base radius scale. Consumed by Task 3 (Tailwind theme tokens) and every restyle task from Task 7 onward.

- [ ] **Step 1: Search 21st.dev for dark crypto/tech landing page references**

Use `mcp__21st__search` (and `mcp__21st__get_inspiration` if useful) with queries like "dark crypto landing hero", "lime accent dashboard", "glassmorphism dark modal", "animated globe hero". Note 2–4 components/screens worth referencing for tone (not literal component copy — HQclouds's original spec already establishes the precedent of adapting rather than copying 21st.dev components).

- [ ] **Step 2: Pull palette/type/motion guidance from `ui-ux-pro-max`**

Invoke the `ui-ux-pro-max:ui-ux-pro-max` skill to search its palette database for a lime-on-dark palette variant, a type pairing that supports bold display headlines (compatible with or replacing Space Grotesk/Inter), and 2–3 relevant GSAP/motion presets from its 16 motion presets to inform the animation vocabulary used in Tasks 5–16 (hover states, stagger timing, easing).

- [ ] **Step 3: Write the token table**

Create `docs/superpowers/design-refs/2026-09-02-kshost-tokens.md` with a markdown table: token name → exact hex or `oklch()` value → where it's used (background/foreground/card/border/muted/accent/accent-foreground/destructive), plus the chosen heading/body font names and the radius base value. `accent` is fixed at `#CDE833`; every other value comes from Steps 1–2's research, decided now so later tasks never guess.

- [ ] **Step 4: Build the style tile in Claude Design**

Invoke the `design` skill. Create one `.dc.html` artboard: color swatches for every token in the table, a headline + body type sample, KShost wordmark/mark concept, primary/secondary/ghost button samples, a card sample, and a dark glass modal sample — all using the token table's exact values. Publish via `Artifact`.

- [ ] **Step 5: Present to user and get approval**

Share the Artifact URL and the token table with the user. Do not proceed to Task 2 until they explicitly approve or request changes (loop Steps 3–5 on requested changes).

- [ ] **Step 6: Commit the token table**

```bash
git add docs/superpowers/design-refs/2026-09-02-kshost-tokens.md
git commit -m "docs: add KShost design token table from approved style tile"
```

---

### Task 2: Section Artboards

**Files:**
- No app code changes — canvas-only task.

**Interfaces:**
- Consumes: token table and style-tile Artifact from Task 1.
- Produces: the same canvas Artifact, updated with one artboard per section, approved by the user. Every restyle task from Task 7 onward references specific artboards from this canvas by name.

- [ ] **Step 1: Add one artboard per landing-page section**

In the same canvas Artifact from Task 1, add artboards named exactly: `Navbar`, `Hero`, `TrustBar`, `Services`, `AutoConvert`, `Fees`, `Testimonials`, `FinalCta`, `Footer`, `LoginModal`, `ContactModal`. Each artboard keeps the current section's copy and layout structure (per the spec's "same business, same structure" constraint) but restyled with Task 1's tokens.

- [ ] **Step 2: Sketch the Hero globe concept**

On the `Hero` artboard, sketch the globe concept concretely enough to build from: sphere size/position relative to the headline, ring/latitude-line treatment, where cubes spawn and where they "land," and the lime glow treatment. This sketch is what Task 6 implements in CSS/SVG.

- [ ] **Step 3: Decide illustration treatment**

For the three existing illustrations (`components/images/hero-illustration.png`, `services-illustration.png`, `auto-convert-illustration.png`), decide per-illustration on the `Hero`/`Services`/`AutoConvert` artboards whether to reuse the existing PNG (if it reads acceptably on a dark card) or replace it with a new image generated via the `ui-ux-pro-max` or `design` skill's image tooling, matching the dark/lime palette. Record the decision directly on each artboard (either "reuse existing" or the new generated asset placed on the artboard).

- [ ] **Step 4: Publish and get approval**

Republish the canvas Artifact. Present it to the user. Do not proceed to Task 3 until they explicitly approve the full canvas or request changes (loop Steps 1–4 on requested changes).

---

### Task 3: Rebrand sweep + dark/lime Tailwind theme tokens

**Files:**
- Modify: `app/globals.css:1-138`
- Modify: `app/layout.tsx:19-64`
- Modify: `app/robots.ts`, `app/sitemap.ts` (only if they reference "HQclouds" or the old domain)
- Modify: `README.md`, `package.json:2` (`name` field)

**Interfaces:**
- Consumes: token table at `docs/superpowers/design-refs/2026-09-02-kshost-tokens.md` (Task 1).
- Produces: Tailwind utilities `bg-background`, `text-foreground`, `bg-card`, `text-card-foreground`, `border-border`, `bg-muted`, `text-muted-foreground`, `bg-accent`/`text-accent` (lime, unchanged utility names, new value `#CDE833`), `text-accent-foreground`, `bg-destructive`/`text-destructive` all resolving to Task 1's dark values — consumed by every task from Task 7 onward. `--color-cream` is removed; anywhere it was used as a background is a signal to replace with `bg-background` or `bg-card` in later tasks (grep in Step 5 below finds every call site so nothing is missed).

- [ ] **Step 1: Rewrite `:root` and remove the unused `.dark` block**

In `app/globals.css`, replace the `:root { ... }` block (lines 73–105) with the dark values from the token table (background, foreground, card, popover, primary, secondary, muted, accent-foreground, destructive, border, input, ring, chart-1..5, sidebar-*). Delete the `.dark { ... }` block (lines 107–138) entirely — the site has one theme now, so a class-gated override is dead code.

- [ ] **Step 2: Replace the custom `@theme` tokens**

Replace:

```css
@theme {
  --color-cream: #f5f1e8;
  --color-accent: #ff5e7e;
  --color-accent-ink: #c2185b;
  --font-heading: var(--font-space-grotesk);
  --font-sans: var(--font-inter);
}
```

with the token table's values, keeping the same variable *names* (`--color-accent`, `--color-accent-ink`) so downstream `bg-accent`/`text-accent-ink` utilities keep working without a rename, but with the new hex values (`--color-accent: #CDE833;` plus the dark-appropriate `--color-accent-ink`). Drop `--color-cream` (superseded by `--color-background`/`--color-card` from Step 1). If Task 1 chose new font names, swap the `next/font/google` import in `app/layout.tsx` accordingly (Step 4 below) and update `--font-heading`/`--font-sans` here to match.

- [ ] **Step 3: Update `body` base layer**

```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background font-sans text-foreground;
  }
}
```

- [ ] **Step 4: Rebrand `app/layout.tsx` metadata**

Replace every `"HQclouds"` string and the `"https://hqclouds.com"` URLs in the `metadata` object, `ORGANIZATION_JSON_LD`, and `viewport.themeColor` (set to the new dark background hex from the token table) with `"KShost"` / the equivalent new domain placeholder (keep the same relative-URL pattern already used, e.g. `metadataBase: new URL("https://kshost.com")` — this is a placeholder domain consistent with the existing demo-site convention, not a real deployment target). If Task 1 changed fonts, update the `Space_Grotesk`/`Inter` imports and `variable` names here and in the two other files that import fonts today (there are none besides `layout.tsx` — fonts are wired once at the root).

- [ ] **Step 5: Sweep every remaining brand reference**

```bash
grep -rn "HQclouds\|hqclouds" --include="*.ts" --include="*.tsx" --include="*.md" --include="*.json" . \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
  --exclude="docs/superpowers/specs/2026-08-31-wibpe-landing-design.md" \
  --exclude="docs/superpowers/plans/2026-08-31-hqclouds-landing.md"
```

Fix every hit outside the two excluded historical documents (which intentionally keep the old name as a record of what was built then) — this will include `app/robots.ts`/`app/sitemap.ts` if they reference the domain, `README.md`, and `package.json`'s `"name"` field. Update `package.json`'s `name` to `"kshost-landing"`.

- [ ] **Step 6: Verify**

Run: `npm run build`
Expected: build succeeds with no errors (visual output will look broken until later tasks restyle each component — that's expected at this point, since components still reference the now-removed `bg-cream`/old accent literal values in some places; Tailwind will simply emit no utility for a token that no longer resolves, which is a lint-safe no-op, not a build error).

Run the Step 5 grep again — expected: zero matches outside the two excluded files.

- [ ] **Step 7: Commit**

```bash
git add app/globals.css app/layout.tsx app/robots.ts app/sitemap.ts README.md package.json
git commit -m "rebrand: HQclouds -> KShost, dark/lime Tailwind theme tokens"
```

---

### Task 4: KShost logo + favicon/OG assets

**Files:**
- Modify: `components/logo.tsx`
- Modify: `app/icon.png`, `app/apple-icon.png` (regenerated binary assets)
- Modify: `app/opengraph-image.tsx`
- Modify: `components/footer.tsx:8` (drop the `invert` prop — see Step 2)
- Modify: `components/navbar.tsx` (no `invert` usage today, no change needed there, confirmed by Step 3's grep)

**Interfaces:**
- Consumes: KShost wordmark/mark from the Task 1 style tile.
- Produces: `Logo({ className }: { className?: string })` — the `invert` prop is removed from its signature since the whole site is dark now (Task 7's Hero, Task 8's Navbar, Task 15's Footer all render on dark backgrounds, so the mark never needs flipping). Consumed by `navbar.tsx` and `footer.tsx`.

- [ ] **Step 1: Regenerate the logo mark image assets**

Using the `ui-ux-pro-max` or `design` skill's logo/icon generation tooling, produce the KShost mark matching the Task 1 style tile (lime mark, works on dark background) and export it to replace `app/icon.png` (32×32 or the existing dimensions), `app/apple-icon.png` (180×180), and `app/favicon.ico` if regenerated from the same source — otherwise leave `favicon.ico` as-is if it's a generic fallback.

- [ ] **Step 2: Rewrite `components/logo.tsx`**

```tsx
import Link from "next/link";
import Image from "next/image";
import logo from "@/components/images/logo.png";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 ${className ?? ""}`}
      aria-label="KShost home"
    >
      <Image
        src={logo}
        alt=""
        aria-hidden="true"
        width={28}
        height={28}
        className="h-7 w-7 shrink-0"
      />
      <span className="font-heading text-lg font-bold tracking-tight text-foreground">KShost</span>
    </Link>
  );
}
```

`components/images/logo.png` itself is replaced with the new KShost mark generated in Step 1 (same file path, new content) so this import keeps working.

- [ ] **Step 3: Remove the now-dead `invert` call site**

In `components/footer.tsx:8`, change `<Logo className="[&_span]:text-white" invert />` to `<Logo className="[&_span]:text-foreground" />` (Task 15 will further adjust footer classes; this step only removes the now-nonexistent prop so the build doesn't break after Step 2's signature change).

```bash
grep -rn "invert" --include="*.tsx" components/
```

Expected after this step: no remaining call sites pass `invert=`.

- [ ] **Step 4: Update `app/opengraph-image.tsx`**

Update its rendered text/background/colors to say "KShost" and use the dark background + lime accent from the token table, keeping its existing `ImageResponse` size/export contract unchanged.

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: build succeeds, no TypeScript error about the removed `invert` prop, `/opengraph-image` is listed in the build output route list.

- [ ] **Step 6: Commit**

```bash
git add components/logo.tsx components/footer.tsx components/images/logo.png app/icon.png app/apple-icon.png app/opengraph-image.tsx
git commit -m "brand: new KShost logo mark, favicon, and OG image"
```

---

### Task 5: Reveal + animation replay audit

**Files:**
- Modify: `components/ui/reveal.tsx:35`
- Modify: `components/sections/services.tsx:31,52`
- Modify: `components/sections/auto-convert.tsx:14,36`
- Modify: `components/sections/final-cta.tsx:15`

**Interfaces:**
- Consumes: nothing new.
- Produces: no signature change — `Reveal` keeps the same props; only its scroll-trigger behavior changes. Every later restyle task inherits replay-on-every-entry for free.

- [ ] **Step 1: Flip `Reveal`'s viewport option**

In `components/ui/reveal.tsx:35`, change:

```tsx
viewport={{ once: true, amount: 0.2 }}
```

to:

```tsx
viewport={{ once: false, amount: 0.2 }}
```

- [ ] **Step 2: Find every other `once: true` in scroll-triggered motion**

```bash
grep -rn "once: true" --include="*.tsx" components/
```

Expected hits: `components/sections/services.tsx` (2), `components/sections/auto-convert.tsx` (2), `components/sections/final-cta.tsx` (1). Change each `viewport={{ once: true, ... }}` to `once: false` in place, keeping the rest of each viewport object (e.g. `amount: 0.3`) unchanged.

- [ ] **Step 3: Verify no `once: true` remains**

```bash
grep -rn "once: true" --include="*.tsx" components/
```

Expected: no output.

- [ ] **Step 4: Manual replay check**

Run: `npm run dev`, open the site with `mcp__playwright__browser_navigate`, scroll down past the Fees section, scroll back up above it, then scroll down again. Confirm (via `mcp__playwright__browser_take_screenshot` at each stage, or `browser_snapshot`) that the fade/blur-in effect visibly re-triggers on the second downward scroll rather than the section just being statically visible.

- [ ] **Step 5: Commit**

```bash
git add components/ui/reveal.tsx components/sections/services.tsx components/sections/auto-convert.tsx components/sections/final-cta.tsx
git commit -m "fix: replay scroll animations on every viewport entry, not just the first"
```

---

### Task 6: Hero globe component

**Files:**
- Create: `components/hero-globe.tsx`

**Interfaces:**
- Consumes: `--color-accent` (lime) Tailwind token from Task 3.
- Produces: `HeroGlobe({ className }: { className?: string })`, a self-contained, absolutely-positioned decorative layer with no business logic. Consumed by Task 7 (`hero.tsx`).

- [ ] **Step 1: Write the component**

```tsx
// components/hero-globe.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";

const RING_COUNT = 5;
const CUBE_COUNT = 8;

function GlobeRings() {
  return (
    <>
      {Array.from({ length: RING_COUNT }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-accent/25"
          style={{
            transform: `rotateX(${(i + 1) * (180 / (RING_COUNT + 1))}deg)`,
          }}
        />
      ))}
    </>
  );
}

function FallingCube({ index }: { index: number }) {
  const angle = (index / CUBE_COUNT) * 360;
  const delay = (index / CUBE_COUNT) * 6;

  return (
    <motion.div
      className="absolute left-1/2 top-0 h-3 w-3 rounded-[3px] bg-accent shadow-[0_0_12px_2px_var(--color-accent)]"
      style={{ originX: 0.5, originY: 0.5 }}
      initial={{ x: 0, y: -40, opacity: 0, rotate: 0 }}
      animate={{
        x: [0, Math.cos((angle * Math.PI) / 180) * 90],
        y: [-40, 170],
        opacity: [0, 1, 1, 0],
        rotate: [0, 220],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeIn",
      }}
    />
  );
}

export function HeroGlobe({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`pointer-events-none absolute ${className ?? ""}`} aria-hidden="true">
      <motion.div
        className="relative h-[360px] w-[360px] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, color-mix(in oklch, var(--color-accent) 35%, transparent), var(--color-card) 70%)",
          boxShadow: "0 0 80px 10px color-mix(in oklch, var(--color-accent) 25%, transparent)",
          transformStyle: "preserve-3d",
        }}
        animate={reducedMotion ? undefined : { rotateY: 360 }}
        transition={reducedMotion ? undefined : { duration: 24, repeat: Infinity, ease: "linear" }}
      >
        <GlobeRings />
      </motion.div>

      {!reducedMotion &&
        Array.from({ length: CUBE_COUNT }).map((_, i) => <FallingCube key={i} index={i} />)}
    </div>
  );
}
```

- [ ] **Step 2: Verify it builds and renders without a consumer error**

Run: `npm run build`
Expected: succeeds (the component isn't imported anywhere yet, so this only checks it's syntactically/type valid on its own).

- [ ] **Step 3: Commit**

```bash
git add components/hero-globe.tsx
git commit -m "feat: add CSS/SVG hero globe with falling-cube animation"
```

---

### Task 7: Hero section restyle

**Files:**
- Modify: `components/sections/hero.tsx`

**Interfaces:**
- Consumes: `HeroGlobe` (Task 6), dark/lime tokens (Task 3), the `Hero` artboard (Task 2).
- Produces: no change to `Hero`'s export signature (`Hero()`, no props) — `app/page.tsx` keeps importing it the same way.

- [ ] **Step 1: Restyle the section and mount the globe**

Replace `bg-cream`/`text-black`/hardcoded `bg-accent/30` glow classes with the Task 3 tokens (`bg-background`, `text-foreground`, `text-foreground/70` for the subhead), and mount `<HeroGlobe className="..." />` positioned per the `Hero` artboard from Task 2 (typically behind/beside the headline, sized and positioned with Tailwind utility classes matching the artboard's proportions — e.g. `right-0 top-1/2 -translate-y-1/2 hidden lg:block` if the artboard places it as a right-side decorative element, or full-bleed behind the text if the artboard places it as a background wash). Keep the existing headline/subhead copy, both CTAs, and the `useModal` wiring exactly as they are — only classNames and the new `HeroGlobe` mount change.

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`
Expected: both pass with no errors/warnings.

Run: `npm run dev`, then use `mcp__playwright__browser_navigate` + `mcp__playwright__browser_take_screenshot` on `/` to capture the hero. Compare visually against the `Hero` artboard from Task 2's canvas.

- [ ] **Step 3: Commit**

```bash
git add components/sections/hero.tsx
git commit -m "redesign: hero section dark theme + globe background"
```

---

### Task 8: Navbar restyle

**Files:**
- Modify: `components/navbar.tsx`

**Interfaces:**
- Consumes: dark/lime tokens (Task 3), new `Logo` (Task 4), `Navbar` artboard (Task 2).
- Produces: no change to `Navbar`'s export signature.

- [ ] **Step 1: Restyle scrolled/unscrolled states and mobile sheet**

Replace `bg-white/60` (scrolled state, line 31) and `bg-white/70` (mobile sheet, line 57) and their `text-black/80`/`text-black` link colors with dark-glass equivalents from the token table (e.g. `bg-background/70 backdrop-blur-xl` for scrolled, `bg-background/90` for the mobile sheet), matching the `Navbar` artboard. Keep the `Menu`/`X` icons, `NAV_LINKS` array, `openLogin`/`openContact` wiring, and scroll-listener logic unchanged.

- [ ] **Step 2: Add nav-link hover micro-interaction**

Per the spec's animation-coverage requirement, the desktop `NAV_LINKS` (line 37-41) currently only have a static `hover:text-black` color swap. Add a lime underline/accent transition on hover (e.g. a `relative` link with an `after:` pseudo-element that scales in from 0 width to full width on `hover:after:scale-x-100`, using `bg-accent`, transition timing informed by Task 1's motion-preset research). Apply the same treatment to both the desktop and mobile nav link lists.

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint`
Expected: both pass.

Manual check: `mcp__playwright__browser_navigate` to `/`, scroll down, screenshot to confirm the glass bar reads correctly on the dark background; resize to a mobile viewport (`mcp__playwright__browser_resize`) and open the hamburger menu to confirm the mobile sheet is legible.

- [ ] **Step 4: Commit**

```bash
git add components/navbar.tsx
git commit -m "redesign: navbar dark glass restyle + hover nav-link animation"
```

---

### Task 9: TrustBar restyle

**Files:**
- Modify: `components/sections/trust-bar.tsx`

**Interfaces:**
- Consumes: dark/lime tokens (Task 3), `TrustBar` artboard (Task 2).
- Produces: no export signature change.

- [ ] **Step 1: Restyle text/border colors**

This section is already `bg-black` — only its `border-white/10` (already dark-appropriate, verify it still matches the artboard's border token) and `text-white/40`/`text-white/70`/`hover:text-white` need checking against the token table (they may already be correct, or the artboard may call for `text-muted-foreground`/`text-foreground` instead of raw `white/N` opacity values — replace with token-based classes if the artboard specifies them). Keep `CoinIcon`, the `coins` data import, and the `marquee` animation classes unchanged.

- [ ] **Step 2: Add a scroll-triggered entrance for the section**

This section currently has no entrance animation (only the always-running marquee). Wrap the `<p>` label (line 18) and the marquee container (line 21) in `Reveal` (`@/components/ui/reveal`, from Task 5 — already replay-on-every-entry), so the section fades in each time it enters the viewport, consistent with the rest of the redesigned page.

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint`
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add components/sections/trust-bar.tsx
git commit -m "redesign: trust bar token alignment + scroll-entrance animation"
```

---

### Task 10: Services restyle

**Files:**
- Modify: `components/sections/services.tsx`

**Interfaces:**
- Consumes: dark/lime tokens (Task 3), `Services` artboard + illustration decision (Task 2).
- Produces: no export signature change.

- [ ] **Step 1: Restyle background, cards, and text**

Replace `bg-cream` (section), `text-black`/`text-black/60`/`text-black/50`/`text-black/40`/`text-black/70` (headline/body/meta text), and the white illustration card (`border-black/10 bg-white`, line 44) and network cards (`border-black/10 bg-white`, line 60) with the token table's `bg-background`, `text-foreground`, `text-muted-foreground`, and `border-border bg-card` equivalents, matching the `Services` artboard. Apply Task 2 Step 3's illustration decision (swap `servicesIllustration` import for a new asset if that was the decision; otherwise keep it as-is inside the restyled card).

- [ ] **Step 2: Add hover micro-interaction to network cards**

The network cards (line 56-72) currently have no hover state. Add `transition-transform duration-200 hover:-translate-y-1 hover:border-accent/40` (same pattern as the `Fees` cards) to the card `motion.div` className, matching the `Services` artboard's card treatment.

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint`
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add components/sections/services.tsx
git commit -m "redesign: services section dark restyle + card hover animation"
```

---

### Task 11: Auto-convert restyle

**Files:**
- Modify: `components/sections/auto-convert.tsx`

**Interfaces:**
- Consumes: dark/lime tokens (Task 3), `AutoConvert` artboard + illustration decision (Task 2).
- Produces: no export signature change.

- [ ] **Step 1: Restyle**

This section is already `bg-black text-cream`. Replace `text-cream` (no longer a valid token after Task 3 removes `--color-cream`) with `text-foreground`, and `text-white/70`/`text-white/80` with the token table's muted-foreground equivalent, matching the `AutoConvert` artboard. Apply Task 2 Step 3's illustration decision for `autoConvertIllustration`. Update the body copy's "HQclouds" mention (line ~21) to "KShost" if Task 3's grep sweep didn't already catch it (it should have — this is a safety check, not new work).

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add components/sections/auto-convert.tsx
git commit -m "redesign: auto-convert section dark restyle"
```

---

### Task 12: Fees restyle

**Files:**
- Modify: `components/sections/fees.tsx`

**Interfaces:**
- Consumes: dark/lime tokens (Task 3), replayable `Reveal` (Task 5), `Fees` artboard (Task 2).
- Produces: no export signature change.

- [ ] **Step 1: Restyle background, cards, and icon chips**

Replace `bg-cream` (section, line 111), `text-accent-ink` (line 114), `text-black`/`text-black/60` (headline/body), the card (`border-black/10 bg-white`, line 123), and the icon chip (`bg-accent/15`, `bg-white`, `ring-black/5`, `text-accent-ink`, lines 125–127) with the token table's dark/lime equivalents, matching the `Fees` artboard. Keep the five `FEE_POINTS` entries, their inline SVG icon components, and the `Reveal` wrapper usage unchanged.

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`
Expected: both pass.

Manual check: confirm via `mcp__playwright__browser_take_screenshot` that the reveal-on-scroll effect (Task 5) still fires correctly now that the section is dark (blur/opacity transition should be visible against the new background).

- [ ] **Step 3: Commit**

```bash
git add components/sections/fees.tsx
git commit -m "redesign: fees section dark restyle"
```

---

### Task 13: Testimonials restyle

**Files:**
- Modify: `components/sections/testimonials.tsx`

**Interfaces:**
- Consumes: dark/lime tokens (Task 3), `Testimonials` artboard (Task 2).
- Produces: no export signature change.

- [ ] **Step 1: Restyle**

This section is already `bg-black text-cream`. Replace `text-cream` (line 13, no longer valid after Task 3) with `text-foreground`, keep `text-accent` (line 15, already lime after Task 3), and check the card (`border-white/10 bg-white/5`, line 27) and text opacities (`text-white/80`, `text-white`, `text-white/50`) against the `Testimonials` artboard — adjust only if the artboard specifies different values (they may already read correctly since this section was already dark). Keep the `testimonials` data import and marquee mechanism unchanged.

- [ ] **Step 2: Add heading entrance animation and card hover lift**

Wrap the label/heading block (lines 15-18) in `Reveal` (from Task 5) so it fades in on every scroll entry, matching the pattern used elsewhere. Add a hover micro-interaction to each testimonial `<figure>` (line 24-38) — e.g. `transition-transform duration-200 hover:-translate-y-1 hover:border-accent/40` — so cards lift slightly and their border picks up the accent color on hover, matching the `Testimonials` artboard's card treatment.

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint`
Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add components/sections/testimonials.tsx
git commit -m "redesign: testimonials token alignment + entrance/hover animation"
```

---

### Task 14: FinalCta restyle

**Files:**
- Modify: `components/sections/final-cta.tsx`

**Interfaces:**
- Consumes: dark/lime tokens (Task 3), replayable motion (Task 5), `FinalCta` artboard (Task 2).
- Produces: no export signature change.

- [ ] **Step 1: Restyle**

This section is `bg-accent` (now lime `#CDE833` after Task 3) with `text-black` headline and a `bg-black text-white` button — check against the `FinalCta` artboard: black text on the lime background should still have strong contrast, so this section may need the least change of any section. Update only what the artboard specifies (e.g. button hover state, spacing) — do not change the `bg-accent`/`text-black` pairing unless the artboard explicitly calls for something different, since that pairing is what gives the accent block visual weight against the rest of the now-dark page.

- [ ] **Step 2: Verify**

Run: `npm run build && npm run lint`
Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add components/sections/final-cta.tsx
git commit -m "redesign: final CTA token alignment"
```

---

### Task 15: Footer restyle

**Files:**
- Modify: `components/footer.tsx`

**Interfaces:**
- Consumes: dark/lime tokens (Task 3), new `Logo` (Task 4), `Footer` artboard (Task 2).
- Produces: no export signature change.

- [ ] **Step 1: Restyle and rebrand the giant wordmark**

The footer is already `bg-black text-white/60`. Update the `Logo` call (already fixed to drop `invert` in Task 4 Step 3 — confirm it now reads `<Logo className="[&_span]:text-foreground" />` or whatever final class the `Footer` artboard specifies), replace the `text-white/90` giant background wordmark (line 21–23) text from "HQclouds" to "KShost" (Task 3's grep sweep should have already caught this string — verify it did), and align any remaining `text-white/*` opacity values with the token table if the artboard specifies different ones.

- [ ] **Step 2: Add nav-link hover and wordmark entrance animation**

Give the footer's nav links (lines 10-16) the same hover micro-interaction added to the navbar in Task 8 (accent underline/color transition), and wrap the giant background wordmark block (lines 20-24) in `Reveal` (from Task 5) with a larger `y` offset so it drifts up into place each time the footer enters the viewport.

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint`
Expected: both pass.

```bash
grep -n "HQclouds" components/footer.tsx
```

Expected: no output.

- [ ] **Step 4: Commit**

```bash
git add components/footer.tsx
git commit -m "redesign: footer dark restyle + KShost wordmark + hover/entrance animation"
```

---

### Task 16: Glass modals dark restyle

**Files:**
- Modify: `components/ui/glass-modal.tsx`
- Modify: `components/login-modal.tsx`
- Modify: `components/contact-modal.tsx`

**Interfaces:**
- Consumes: dark/lime tokens (Task 3), `LoginModal`/`ContactModal` artboards (Task 2). `Input`, `Label`, `Select`, `Textarea`, `Button` (`components/ui/*`) already resolve their colors from the semantic CSS variables rewritten in Task 3, so they need no direct edits in this task — only verify them in Step 3.
- Produces: no export signature change to `GlassModal`, `LoginModal`, or `ContactModal`.

- [ ] **Step 1: Restyle `GlassModal`'s panel and overlay**

Replace the white-glass panel (`border-white/30 bg-white/20`, plus the `linear-gradient(180deg, rgba(255,255,255,0.35)..., rgba(255,255,255,0.05)...)` background-image, line 32–36) with a dark-glass equivalent from the token table (e.g. `border-white/10 bg-card/40` with a `rgba(255,255,255,0.06)`→transparent gradient instead of the current light-to-lighter one), matching the `LoginModal`/`ContactModal` artboards. Update `DialogPrimitive.Title`'s `text-black` (line 43) to `text-foreground` and the close button's `text-black/60 hover:bg-black/10` (line 46) to token equivalents. Keep the `AnimatePresence`/spring transition timing unchanged (motion behavior isn't part of this visual pass).

- [ ] **Step 2: Rebrand and restyle `LoginModal`/`ContactModal` body text**

In `login-modal.tsx`: update `title="Log in to HQclouds"` (line 50) to `title="Log in to KShost"`, and restyle the hardcoded `text-red-600` (error text, line 55/65), `bg-black text-white hover:bg-black/80` (submit button, line 73), and `text-black/60` (line 77) to dark-theme-appropriate variants — for the error red specifically, use a lighter/more saturated red (e.g. `text-red-400`) since a `-600` red reads poorly on a dark background; for the submit button, switch to the lime accent (`bg-accent text-accent-foreground hover:bg-accent/90`) matching the artboard's primary-action treatment.

In `contact-modal.tsx`: apply the same error-red and submit-button treatment (lines 98, 103, 108, 117, 120, 125), and restyle the success-state text (`text-black`, line 68).

- [ ] **Step 3: Verify shared primitives inherit correctly**

Run: `npm run dev`, open both modals via `mcp__playwright__browser_navigate` + clicking the nav's "Log in"/"Contact us" buttons, and `mcp__playwright__browser_take_screenshot` each. Confirm `Input`/`Select`/`Textarea`/`Label` (which take their colors from Task 3's `--input`/`--foreground`/`--muted-foreground` tokens with no code changes in this task) render legibly against the new dark glass panel. If any primitive looks wrong, that's a signal Task 3's token values need adjusting, not that this task should hardcode a fix in `glass-modal.tsx`.

- [ ] **Step 4: Verify build/lint**

Run: `npm run build && npm run lint`
Expected: both pass.

- [ ] **Step 5: Commit**

```bash
git add components/ui/glass-modal.tsx components/login-modal.tsx components/contact-modal.tsx
git commit -m "redesign: dark glass modals + KShost rebrand in modal copy"
```

---

### Task 17: Legal pages restyle

**Files:**
- Modify: `app/terms/page.tsx`
- Modify: `app/privacy/page.tsx`
- Modify: `app/aml/page.tsx`

**Interfaces:**
- Consumes: dark/lime tokens (Task 3), restyled `Navbar`/`Footer` (Tasks 8, 15).
- Produces: no route or export signature change.

- [ ] **Step 1: Restyle each page's prose wrapper**

In each of the three files, replace the `<main className="bg-cream pb-24 pt-32">` wrapper with `bg-background`, the `text-accent-ink` eyebrow with the token table's accent-ink equivalent, `text-black`/`text-black/50`/`text-black/80` (heading/date/body) with `text-foreground`/`text-muted-foreground`, and each `<h2 className="... text-black">` with `text-foreground`. The three files share this exact structural pattern (confirmed in `app/terms/page.tsx:14-40`), so apply the same class substitutions to all three.

- [ ] **Step 2: Confirm no remaining "HQclouds" in body copy**

```bash
grep -rln "HQclouds" app/terms/page.tsx app/privacy/page.tsx app/aml/page.tsx
```

Expected: no output (Task 3's sweep should have already caught these — this step is a targeted re-check since legal-page prose is dense and easy to miss a mention in).

- [ ] **Step 3: Verify**

Run: `npm run build && npm run lint`
Expected: both pass.

Manual check: `mcp__playwright__browser_navigate` to `/terms`, `/privacy`, `/aml` and screenshot each to confirm the restyled Navbar/Footer (Tasks 8, 15) and the new dark prose body read as one consistent page.

- [ ] **Step 4: Commit**

```bash
git add app/terms/page.tsx app/privacy/page.tsx app/aml/page.tsx
git commit -m "redesign: legal pages dark restyle + brand sweep"
```

---

### Task 18: Full-site QA pass

**Files:**
- No new file changes expected; this task only fixes regressions found during QA (touching whatever files Steps 1–5 flag).

**Interfaces:**
- Consumes: every task above.
- Produces: a verified, coherent KShost site ready for review.

- [ ] **Step 1: Full build + lint**

Run: `npm run build && npm run lint`
Expected: both pass cleanly.

- [ ] **Step 2: Brand and animation-flag sweep**

```bash
grep -rn "HQclouds\|hqclouds" --include="*.ts" --include="*.tsx" . \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git
grep -rn "once: true" --include="*.tsx" components/
```

Expected: zero matches for both (outside the two intentionally-preserved historical docs already excluded in Task 3, which this grep doesn't even scan since it's `.ts`/`.tsx`-only).

- [ ] **Step 3: Full-page visual walkthrough**

Run `npm run dev`. Using `mcp__playwright__browser_navigate` to `/`, `mcp__playwright__browser_resize` to both a desktop (1440×900) and mobile (390×844) viewport, and `mcp__playwright__browser_take_screenshot`, capture every section top to bottom at both sizes. Confirm: consistent dark background across all sections (no leftover light/cream patches), lime accent used consistently for primary actions/highlights, hero globe visible and animating, and both modals open correctly in dark glass at both viewport sizes.

- [ ] **Step 4: Reduced-motion check**

Using the browser devtools rendering panel (or `mcp__playwright__browser_evaluate` to set `matchMedia('(prefers-reduced-motion: reduce)')` emulation if the environment supports it — otherwise toggle the OS-level "reduce motion" setting manually before this step), reload `/` and confirm the hero globe's rotation and falling cubes freeze/stop per `HeroGlobe`'s `useReducedMotion()` check (Task 6), while scroll reveals still function (per the spec, only decorative motion is gated by reduced-motion, not reveal transitions).

- [ ] **Step 5: Replay check**

Scroll down through the full page, then back to the top, then down again. Confirm every section's reveal animation re-triggers on the second pass (Task 5's fix), not just the first.

- [ ] **Step 6: Fix any regressions found**

If Steps 1–5 surface issues, fix them in the relevant component file(s) from the tasks above — do not introduce new components or restructure beyond what's needed to resolve the specific regression.

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "qa: fix full-site KShost redesign regressions found in final walkthrough"
```

(Skip this commit if Step 6 found nothing to fix.)
