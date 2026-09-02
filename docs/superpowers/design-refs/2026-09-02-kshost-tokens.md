# KShost Design Tokens

Date: 2026-09-02
Status: Approved — 2026-09-02 (Task 1 style tile)
Source spec: `docs/superpowers/specs/2026-09-02-kshost-redesign-design.md`

This file is the **single source of truth** for every color, font and radius value in the
KShost redesign. Task 3 (Tailwind `@theme` tokens) and every restyle task from Task 7
onward must read exact values from here and never invent or approximate one.

Every value below is concrete. Hex is authoritative; the `oklch()` column is the exact
conversion of the same color (sRGB → Oklab, 4 decimals) and is what should be written into
`app/globals.css`, matching the file's existing `oklch()` convention.

---

## 1. Core color tokens

| Token | Hex | `oklch()` | Where it's used |
|---|---|---|---|
| `background` | `#0B0C0A` | `oklch(0.1523 0.0045 128.82)` | Page background (`body`), replaces `--color-cream: #f5f1e8`. Near-black graphite with a barely-perceptible green-neutral cast (hue 128°, chroma 0.0045) so the lime accent reads as native to the surface rather than pasted on. |
| `foreground` | `#F2F5EE` | `oklch(0.9659 0.0098 125.68)` | Default body/heading text on `background` and on `card`. Not pure white — same green-neutral hue family, softens glare on a near-black field. |
| `card` | `#131512` | `oklch(0.1923 0.0067 135.00)` | Elevation 1: section cards, service tiles, testimonial cards, fee-table rows, navbar solid state. |
| `card-foreground` | `#F2F5EE` | `oklch(0.9659 0.0098 125.68)` | Text on `card`. Same value as `foreground` (single dark theme, no divergence needed). |
| `muted` | `#1B1E19` | `oklch(0.2300 0.0104 132.71)` | Elevation 2: inset panels, input fill, badges/chips, table header bands, hover fill on ghost buttons and nav links. |
| `muted-foreground` | `#9BA595` | `oklch(0.7093 0.0255 133.54)` | Secondary/supporting text: subheads, captions, table labels, footer links, form helper text, placeholder text. |
| `border` | `#2A2F27` | `oklch(0.2975 0.0158 133.66)` | Default hairline: card outlines, dividers, table rules, footer separators. Decorative separation only. |
| `border-strong` | `#666E63` | `oklch(0.5279 0.0195 137.08)` | **Interactive** boundaries that must meet WCAG 1.4.11 non-text contrast: input/select/textarea outlines, secondary (outline) button borders, checkbox/radio edges. Use this — not `border` — wherever the outline *is* the control. Chosen to clear 3:1 against **all three** surfaces it can sit on (`background`, `card`, `muted`), not just the page ground — inputs are `muted`-filled, which is the hardest case at 3.19:1. |
| `accent` | `#CDE833` | `oklch(0.8815 0.1922 118.25)` | **Fixed by spec.** Primary buttons, links, focus rings, active nav state, icon accents, glow, gradient highlights, globe wireframe/cube edges. Replaces `--color-accent: #ff5e7e`. |
| `accent-foreground` | `#0B0C0A` | `oklch(0.1523 0.0045 128.82)` | Text/iconography placed **on** lime (primary button label, lime badge text). Same value as `background`. |
| `accent-hover` | `#DCF25C` | `oklch(0.9171 0.1733 117.03)` | Hover/active state of any lime-filled surface (primary button, lime chip). Lifts lightness, keeps hue. |
| `accent-dim` | `#A3BB22` | `oklch(0.7483 0.1665 118.87)` | Lime at reduced presence: pressed state, disabled-but-branded elements, secondary lime strokes, low-emphasis lime text where full `accent` would be too loud. |
| `ring` | `#CDE833` | `oklch(0.8815 0.1922 118.25)` | `:focus-visible` ring, same value as `accent`. Render as a 2px ring with a 2px `background`-colored offset. Never remove the ring. |
| `destructive` | `#FF6B6B` | `oklch(0.7116 0.1812 22.84)` | Form validation errors, error toasts, destructive actions. Lightened from the shadcn default (`oklch(0.577 0.245 27.325)`) so it clears 4.5:1 on the near-black field. |
| `destructive-foreground` | `#0B0C0A` | `oklch(0.1523 0.0045 128.82)` | Text on a filled `destructive` surface. (Error *text* on `background` uses `destructive` directly.) |

### Legacy and shadcn tokens — successor values

These variables are **live in the codebase today** and reachable from component classes, so
Task 3 must give each one a new value or the old light-theme color survives the redesign.
None of them get a new color family — each reuses a token from the table above.

| Existing variable | Current value | New value | Reasoning + live call sites |
|---|---|---|---|
| `--color-accent-ink` | `#c2185b` | **`#CDE833`** — same as `accent`<br>`oklch(0.8815 0.1922 118.25)` | This token only ever existed because the old pink `accent` (`#ff5e7e`) was too light to use as *text* on the cream ground, so it needed a darkened twin. On the dark theme that problem inverts and disappears: `accent` is already 14.18:1 as text on `background`. So `accent-ink` collapses into `accent`. **Call sites (5):** `components/sections/fees.tsx:114` ("Pricing" eyebrow), `:127` (feature icon), `app/aml/page.tsx:20`, `app/privacy/page.tsx:20`, `app/terms/page.tsx:20` (all "Legal" eyebrows). Task 3 may either repoint the variable or delete it and rewrite the 5 sites to `text-accent`; deleting is preferred. |
| `--primary` | `oklch(0.205 0 0)` | **`#CDE833`** / `oklch(0.8815 0.1922 118.25)` | The shadcn Button `default` variant is `bg-primary text-primary-foreground` (`components/ui/button.tsx:12`) — that is our lime primary CTA. |
| `--primary-foreground` | `oklch(0.985 0 0)` | **`#0B0C0A`** / `oklch(0.1523 0.0045 128.82)` | Label on the lime button. 14.18:1. |
| `--secondary` | `oklch(0.97 0 0)` | **`#1B1E19`** — same as `muted`<br>`oklch(0.2300 0.0104 132.71)` | Button `secondary` variant fill (`components/ui/button.tsx:16`). Matches the ghost-hover fill in the style tile, so the two read as one system. |
| `--secondary-foreground` | `oklch(0.205 0 0)` | **`#F2F5EE`** / `oklch(0.9659 0.0098 125.68)` | Text on that fill. 15.30:1. |
| `--popover` | `oklch(1 0 0)` | **`#131512`** — same as `card`<br>`oklch(0.1923 0.0067 135.00)` | Select dropdown surface (`components/ui/select.tsx:72,151,170`). A popover is a floating card; same elevation, same value. |
| `--popover-foreground` | `oklch(0.145 0 0)` | **`#F2F5EE`** / `oklch(0.9659 0.0098 125.68)` | Text in the dropdown. 16.67:1. |
| `--input` | `oklch(0.922 0 0)` | **`#666E63`** — same as `border-strong`<br>`oklch(0.5279 0.0195 137.08)` | Not in the original brief list but load-bearing: `border-input` is the outline on `input.tsx:11`, `textarea.tsx:10` and `select.tsx:47`. This is exactly the case `border-strong` exists for — see the note below. |
| `--ring` | `oklch(0.708 0 0)` | **`#CDE833`** / `oklch(0.8815 0.1922 118.25)` | Same as `ring` above. Used via `focus-visible:border-ring` / `focus-visible:ring-ring/50` throughout `components/ui/*`. |
| `--border` | `oklch(0.922 0 0)` | **`#2A2F27`** / `oklch(0.2975 0.0158 133.66)` | Same as `border` above; `globals.css` applies it globally via `@apply border-border`. |

Two traps in the shadcn primitives that Task 3 or Task 7 must handle — flagged here because
they are invisible until something renders wrong:

1. **`--input` is used as both a border and a fill.** `input.tsx`/`textarea.tsx`/`select.tsx`
   carry `border-input` *and* `dark:bg-input/30`, `dark:disabled:bg-input/80`. Those `dark:`
   variants are gated on a `.dark` ancestor (`@custom-variant dark (&:is(.dark *))` in
   `globals.css:5`). This site has no light mode, so if the dark values are written straight
   into `:root` and no `.dark` class is applied, those fills never activate and the inputs
   stay `bg-transparent` — which is the intended look anyway (the field reads against
   `card`/`muted`). Decide deliberately; don't let it happen by accident.
2. **`bg-primary/80` is the wrong hover.** `button.tsx:12` hovers with `hover:bg-primary/80`,
   which renders lime at 80% opacity — a *duller* lime. This design specifies the opposite: a
   *brighter* `accent-hover` (`#DCF25C`). Task 7 must change that class, not just the token.

`--chart-1..5`, `--sidebar*` and the `.dark` block have **no call sites** outside
`globals.css` (verified by grep across `components/` and `app/`). They can be deleted rather
than re-themed; if kept, they must not be treated as part of this design system.

### Glass surfaces (dark glass, replaces the current white iOS glass)

`components/ui/glass-modal.tsx` and any glass panel use composed values, not flat tokens:

| Token | Value | Where it's used |
|---|---|---|
| `glass-surface` | `rgba(19, 21, 18, 0.72)` | Modal/panel fill (`card` at 72% alpha) over `backdrop-filter: blur(24px) saturate(140%)`. |
| `glass-border` | `rgba(242, 245, 238, 0.10)` | 1px inner hairline on glass panels (`foreground` at 10%). |
| `glass-highlight` | `rgba(205, 232, 51, 0.14)` | Top-edge lime sheen / inner glow on glass panels (`accent` at 14%). |
| `glass-overlay` | `rgba(11, 12, 10, 0.55)` | Full-screen scrim behind an open modal (`background` at 55%). Deliberately lighter than a typical scrim: the page underneath is already near-black, so anything heavier flattens the blurred backdrop and the panel stops reading as glass. 55% still separates the modal clearly. |
| `accent-glow` | `0 0 48px rgba(205, 232, 51, 0.28)` | Lime bloom behind the hero globe, primary-button hover halo, active-card glow. |

---

## 2. Contrast verification

All ratios computed against the exact hex values above (WCAG 2.1 relative luminance).

| Pair | Ratio | Requirement | Result |
|---|---|---|---|
| `foreground` on `background` | 17.80:1 | 4.5:1 body | Pass (AAA) |
| `foreground` on `card` | 16.67:1 | 4.5:1 | Pass (AAA) |
| `foreground` on `muted` | 15.30:1 | 4.5:1 | Pass (AAA) |
| `muted-foreground` on `background` | 7.66:1 | 4.5:1 | Pass (AAA) |
| `muted-foreground` on `card` | 7.18:1 | 4.5:1 | Pass (AAA) |
| `accent` on `background` | 14.18:1 | 4.5:1 (link text) | Pass (AAA) |
| `accent` on `card` | 13.28:1 | 4.5:1 | Pass (AAA) |
| `accent-foreground` on `accent` | 14.18:1 | 4.5:1 (button label) | Pass (AAA) |
| `accent-foreground` on `accent-hover` | 15.78:1 | 4.5:1 | Pass (AAA) |
| `accent-dim` on `background` | 9.04:1 | 4.5:1 | Pass (AAA) |
| `destructive` on `background` | 7.06:1 | 4.5:1 (error text) | Pass (AAA) |
| `destructive` on `card` | 6.62:1 | 4.5:1 | Pass (AAA) |
| `border-strong` on `background` | 3.71:1 | 3:1 (WCAG 1.4.11) | Pass |
| `border-strong` on `card` | 3.48:1 | 3:1 (WCAG 1.4.11) | Pass |
| `border-strong` on `muted` | 3.19:1 | 3:1 (WCAG 1.4.11) | Pass — worst case; `muted` is the input fill |
| `border` on `background` | 1.43:1 | n/a — decorative divider only | Not for interactive outlines; use `border-strong` |

An interactive outline must clear 3:1 against **whatever surface it actually sits on**, not
just the page ground. Inputs are `muted`-filled and outline-buttons sit inside `card`, so all
three rows above are required. The originally-specified `#5C6359` passed only against
`background` (3.16:1) and failed the two that matter more — 2.96:1 on `card`, 2.72:1 on
`muted` — which is why `border-strong` is `#666E63`.

Mapped-token pairs from §1's successor table, verified on the same run:

| Pair | Ratio | Result |
|---|---|---|
| `primary-foreground` on `primary` (lime button) | 14.18:1 | Pass (AAA) |
| `secondary-foreground` on `secondary` | 15.30:1 | Pass (AAA) |
| `popover-foreground` on `popover` | 16.67:1 | Pass (AAA) |
| `muted-foreground` on `popover` (dropdown placeholder) | 7.18:1 | Pass (AAA) |
| `accent-ink` successor (`accent`) on `background` | 14.18:1 | Pass (AAA) |
| `accent-ink` successor (`accent`) on `card` | 13.28:1 | Pass (AAA) |

---

## 3. Typography

Pairing adopted: **Web3 Bitcoin DeFi (Space Grotesk + Inter + JetBrains Mono)** from the
`ui-ux-pro-max` typography database — the closest database match to this product type
(DeFi / crypto / fintech, dark, technical). It confirms the spec's existing Space Grotesk +
Inter pairing rather than replacing it, so **no font swap is needed** and no existing weight
range breaks.

| Token | Value | Where it's used |
|---|---|---|
| `--font-heading` | `Space Grotesk` (weights 500, 600, 700) | All `h1`–`h4`, section titles, stat figures, logo wordmark. Already loaded via `next/font/google` as `--font-space-grotesk`. |
| `--font-sans` | `Inter` (weights 400, 500, 600, 700) | All body copy, UI text, buttons, nav links, form labels, legal pages. Already loaded as `--font-inter`. |
| `--font-mono` | `JetBrains Mono` (weights 400, 500) | **Addition from the database pairing.** Numeric/technical micro-text only: fee percentages, network tickers, price figures, uppercase section eyebrow labels. Adds `next/font/google` `JetBrains_Mono` with `variable: "--font-jetbrains-mono"`. |

Fallback stacks (write these literally in `globals.css`):

- heading: `var(--font-space-grotesk), "Space Grotesk", ui-sans-serif, system-ui, sans-serif`
- body: `var(--font-inter), "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif`
- mono: `var(--font-jetbrains-mono), "JetBrains Mono", ui-monospace, SFMono-Regular, monospace`

### Type scale

| Role | Size (desktop) | Size (mobile) | Weight | Line-height | Tracking | Font |
|---|---|---|---|---|---|---|
| Display / hero H1 | `clamp(2.75rem, 6vw, 4.5rem)` — 44→72px | 44px | 700 | 1.05 | `-0.03em` | heading |
| Section H2 | `clamp(2rem, 3.5vw, 3rem)` — 32→48px | 32px | 700 | 1.1 | `-0.02em` | heading |
| Card / sub H3 | `1.5rem` (24px) | 20px | 600 | 1.2 | `-0.01em` | heading |
| Body large (hero sub, lede) | `1.125rem` (18px) | 17px | 400 | 1.6 | `0` | body |
| Body | `1rem` (16px) | 16px | 400 | 1.6 | `0` | body |
| Small / caption | `0.875rem` (14px) | 14px | 400 | 1.5 | `0` | body |
| Eyebrow / data label | `0.75rem` (12px) | 12px | 500 | 1.4 | `0.12em`, uppercase | mono |
| Button label | `0.9375rem` (15px) | 15px | 600 | 1 | `0.01em` | body |

Body base is 16px with line-height 1.5+ and nothing below 12px, per the `ui-ux-pro-max`
typography/accessibility rules.

---

## 4. Radius scale

Base bumped from the current `0.625rem` to **`1rem`**, keeping the existing multiplier chain
in `globals.css` untouched. This makes `--radius-2xl` land at ~28.8px, which absorbs the
hand-written `rounded-[28px]` panels already in the codebase, and preserves the large-radius
shape language the spec asks to keep.

| Token | Formula | Computed | Where it's used |
|---|---|---|---|
| `--radius` (base) | — | `1rem` / 16px | Base variable; do not use directly. |
| `--radius-sm` | `calc(var(--radius) * 0.6)` | `0.6rem` / 9.6px | Chips, badges, small inline tags, checkbox. |
| `--radius-md` | `calc(var(--radius) * 0.8)` | `0.8rem` / 12.8px | Inputs, selects, textareas, small icon buttons. |
| `--radius-lg` | `var(--radius)` | `1rem` / 16px | Default card radius, dropdown/popover, table container. |
| `--radius-xl` | `calc(var(--radius) * 1.4)` | `1.4rem` / 22.4px | Feature cards, testimonial cards, service tiles. |
| `--radius-2xl` | `calc(var(--radius) * 1.8)` | `1.8rem` / 28.8px | Large section panels, glass modal (replaces `rounded-[28px]`). |
| `--radius-3xl` | `calc(var(--radius) * 2.2)` | `2.2rem` / 35.2px | Hero container panel, full-bleed CTA block (replaces `rounded-[32px]`). |
| `--radius-4xl` | `calc(var(--radius) * 2.6)` | `2.6rem` / 41.6px | Reserved for oversized decorative panels. |
| pill | `9999px` | — | **All buttons** (primary/secondary/ghost), nav pill, network chips. `rounded-full` — the dominant CTA shape, unchanged from the current design. |

---

## 5. Motion vocabulary

Presets pulled from the `ui-ux-pro-max` GSAP/motion database, translated to `framer-motion`
(the spec forbids adding an animation library — GSAP is the *source of the timing values*,
not a dependency to install).

| Preset | Source tier | Duration | Easing | Applied to |
|---|---|---|---|---|
| Scroll reveal | Scroll Reveal / Subtle | 350ms | `power1.out` → framer `ease: [0.25, 0.46, 0.45, 0.94]` | `components/ui/reveal.tsx`. `opacity: 0 → 1`, `y: 12px → 0`. Trigger at `amount: 0.2`, **`once: false`** so it replays on every viewport entry (spec requirement). Keep `y` at 8–16px so it reads as a fade, not a slide. |
| Stagger | Scroll Reveal + list | — | same as above | Children of a revealed group (service tiles, fee rows, testimonials): `staggerChildren: 0.06`, `delayChildren: 0.04`. Cap total group delay at ~400ms. |
| Hover (cards) | Hover Micro-interaction / Standard | 250ms | `power2.out` → framer `ease: [0.16, 1, 0.3, 1]` | Cards: `y: -4`, `scale: 1.02`, plus a lime border/`accent-glow` fade-in. Always define the matching leave transition. |
| Hover (buttons, nav links) | Hover Micro-interaction / Subtle | 150ms | `power1.out` | `y: -1` and a color/fill shift (`accent` → `accent-hover`). Displacement stays under 2px so it reads as feedback. |
| Hero globe + cubes | decorative loop | continuous | `linear` rotation, `easeInOut` on cube drop | `components/hero-globe.tsx`. **Frozen or simplified under `prefers-reduced-motion: reduce`.** |

Rules that apply to all of the above:

- Animate `transform` and `opacity` only — never `width`, `height`, or `margin` — so motion
  stays on the compositor thread.
- Exit transitions run faster than enter (roughly 0.7×).
- `prefers-reduced-motion: reduce` disables decorative loops (globe, cube fall, glow pulses).
  Reveal fades may remain, per spec §Animation System.

---

## 6. Research references

**21st.dev** (tone references only — adapted, never copied verbatim; this follows the
precedent already set by the original HQclouds spec):

| Reference | URL | What was taken |
|---|---|---|
| Crypto Hero — `@dhileepkumargm` | https://21st.dev/@dhileepkumargm/components/crypto-hero | Full-bleed dark hero with a glow behind centered copy and a two-CTA row; validates the glass-refraction treatment over a dark field. Its blue gradient blobs become a single lime bloom. |
| Globe Hero — `@chowlol202` | https://21st.dev/@chowlol202/components/globe-hero | Dot-matrix globe composition and its placement/scale relative to hero copy. Reference for *look only* — it uses React Three Fiber, which the spec forbids; ours is CSS/SVG. |
| Ethereal Beams Hero — `@muhammad-binsalman` | https://21st.dev/@muhammad-binsalman/components/ethereal-beams-hero | Glassmorphic **pill-shaped** navigation and the three-variant button system (default / outline / ghost) — confirms the pill nav + pill button language on a near-black ground. |
| Glass Shine Card — `@dhileepkumargm` | https://21st.dev/@dhileepkumargm/components/glass-shine-card | Dark-glass card with a gradient orb behind it and a top-edge sheen — the model for `glass-highlight` and `accent-glow`. |

**ui-ux-pro-max database:**

- **Color** — the palette database returned no lime-on-dark entry. The closest structural
  match, *Music Streaming* (`background #0F0F23`, `card #1B1B30`, `muted #27273B`,
  `muted-foreground #94A3B8`, green accent `#22C55E` with a near-black `on-accent`), supplied
  the **structure** — a three-step dark surface ramp, a saturated green accent, and dark text
  on the accent. Its hues were rebuilt around the mandated `#CDE833` (green-neutral hue ~128°
  for the neutrals, accent hue 118°), and every resulting pair was contrast-verified in §2.
  This is a derived palette, not a database row copied wholesale.
- **Typography** — *Web3 Bitcoin DeFi (Space Grotesk + Inter + JetBrains Mono)*, matched on
  keywords `web3 / defi / fintech / crypto / dark`. Confirms the spec's existing pairing.
- **Motion** — *Scroll Reveal (Subtle)*, *Hover Micro-interaction (Subtle)*, *Hover
  Micro-interaction (Standard)*; see §5.
- **UX rules applied** — 4.5:1 minimum text contrast (§2), 16px body / 1.5 line-height /
  nothing under 12px (§3), never remove focus rings (`ring` token), 44×44px minimum touch
  target on all pill buttons and nav items, `prefers-reduced-motion` honored (§5).

---

## 7. Deviations from the design spec

1. **`JetBrains Mono` added as a third font.** The spec names only Space Grotesk + Inter. The
   database pairing that matches this product type is a tri-stack, and the site has genuinely
   numeric surfaces (fee percentages, network tickers). Scope is deliberately narrow —
   figures and uppercase eyebrow labels only. If declined, drop `--font-mono` and set those
   roles to Inter 500 with `font-variant-numeric: tabular-nums`; nothing else in this file
   changes.
2. **Two tokens added beyond the brief's list** — `border-strong` (needed so interactive
   outlines meet WCAG 1.4.11; the decorative `border` is only 1.43:1) and `accent-hover` /
   `accent-dim` (needed so hover and pressed states are defined once here rather than
   improvised per component).
