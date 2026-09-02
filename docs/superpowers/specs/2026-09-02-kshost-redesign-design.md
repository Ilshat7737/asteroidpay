# KShost Redesign — Design Spec

Date: 2026-09-02
Status: Approved
Supersedes visual identity from: `2026-08-31-wibpe-landing-design.md` (business scope, routes, copy, and forms from that spec remain unchanged — this is a visual redesign + rebrand, not a new product).

## Summary

Full visual redesign of the existing HQclouds crypto payment gateway landing site, rebranded to **KShost**. Same business (crypto payment gateway for merchants), same page structure, same routes, same copy/content and form logic — everything about *what* the site says and does stays as-is. What changes is *how it looks*: every component gets a new dark, animated, lime-accented visual language, and the brand name changes throughout.

This is **not** a repositioning — KShost is not becoming a hosting company. The name sounding hosting-adjacent is a known tradeoff the user accepted.

## Rebrand Scope

Replace every occurrence of "HQclouds" / "HQclouds home" / brand references with "KShost":
- `components/logo.tsx` (wordmark + aria-label)
- `app/layout.tsx` metadata (title, description, OG/Twitter card text)
- `app/opengraph-image.tsx`, `app/icon.png`, `app/apple-icon.png` (regenerate with new mark/wordmark if the visual identity changes the logo shape)
- `app/robots.ts`, `app/sitemap.ts` if they reference the brand name
- Legal pages (`/terms`, `/privacy`, `/aml`) — replace brand name in body copy, keep legal content otherwise unchanged
- `README.md`, `package.json` `name` field (cosmetic, optional)

No changes to: pricing figures, network list, testimonials content, contact/login form fields or validation, API route logic.

## Visual Identity

- **Base**: dark theme (near-black/graphite background, e.g. `oklch` low-lightness neutral) replacing the current cream (`#f5f1e8`) light theme. Site no longer needs a light-mode toggle — dark is the only mode, same as today's site only has one mode (light).
- **Accent**: `#CDE833` (lime) replaces the current pink/rose accent (`--color-accent: #ff5e7e`) everywhere — buttons, links, focus rings, active states, glows, gradient highlights, icon accents.
- **Shape language**: keep the large-radius, pill-button language from the current design (it works with the new palette); glass panels get a dark-glass treatment instead of white-glass.
- **Typography**: keep Space Grotesk (headings) / Inter (body) unless the 21st.dev research surfaces a stronger pairing during the style-tile step — if changed, it must still support the same weight range currently used (bold display headlines).
- **Logo**: new KShost wordmark/mark, designed as part of the style tile. Icon can be evolved from or replace the current mark; must work `invert`-free against the new dark background (the current `invert` prop on `Logo` existed to flip the mark for dark contexts — with an all-dark site this prop may become unnecessary and should be removed if so).

## Component Scope (full redesign, same structure)

All of the following are restyled to the new dark/lime language; none change their business logic, copy, props contracts with parent pages, or data (`lib/data/*`):

- `components/navbar.tsx`
- `components/sections/hero.tsx` — plus new animated background (see below)
- `components/sections/trust-bar.tsx`
- `components/sections/services.tsx`
- `components/sections/auto-convert.tsx`
- `components/sections/fees.tsx`
- `components/sections/testimonials.tsx`
- `components/sections/final-cta.tsx`
- `components/footer.tsx`
- `components/ui/glass-modal.tsx` (and consequently `login-modal.tsx`, `contact-modal.tsx`) — from white iOS glass to dark glass with lime accents
- `components/ui/button.tsx`, `input.tsx`, `label.tsx`, `select.tsx`, `textarea.tsx` — shadcn primitives re-themed via the Tailwind tokens, not rewritten
- `components/coin-icon.tsx`, `network-icon.tsx` — recolored/restyled to match, icons themselves unchanged
- `components/logo.tsx` — new wordmark

## Hero Background: Animated Globe

A CSS/SVG pseudo-3D scene behind the Hero section (and no other section — this is a hero-only visual, not a persistent site-wide background, to keep it performant and non-distracting on scroll-heavy pages):

- A rotating sphere/globe built from CSS transforms, radial gradients, and/or layered SVG (latitude/longitude line rings, or a dot-matrix sphere) — no WebGL/Three.js/react-three-fiber, no new 3D-rendering dependency.
- Small cube shapes ("blockchain cubes") animate falling toward the globe and appear to land/orbit around it, looping continuously — built with `framer-motion` (already a dependency) driving CSS transforms, not a physics engine.
- Lime (`#CDE833`) used for glow, wireframe lines, and cube edges/faces to tie it to the accent color.
- Must degrade gracefully: `prefers-reduced-motion` should freeze or simplify the animation (existing accessibility bar to meet, not a new requirement, but worth confirming during implementation since this is new motion-heavy code).
- Lives in its own component (e.g. `components/hero-globe.tsx`) so `hero.tsx` stays focused on copy/CTAs.

## Animation System

- Every scroll-triggered reveal replays on each viewport entry, not just the first. In `components/ui/reveal.tsx`, change `viewport={{ once: true, amount: 0.2 }}` to `viewport={{ once: false, amount: 0.2 }}`. Audit `hero.tsx` and any other `motion.*` usages for the same `once: true` pattern (or plain mount-only animation that should become viewport-triggered) and align them.
- Expand animation coverage beyond the current single `Reveal` usage (currently only in `fees.tsx`) to the other sections listed above, plus hover/micro-interactions on cards, buttons, and nav links — drawing on `ui-ux-pro-max`'s GSAP/motion presets for consistent timing/easing, implemented with `framer-motion` (no new animation library) to keep the same tech stack.
- `prefers-reduced-motion` still governs whether decorative motion (globe, background loops) is reduced — reveal-on-scroll opacity/position transitions can remain since they're the same class of motion already present in the current site.

## Design Process (this iteration)

1. **Research** — `mcp__21st__search` / `get_inspiration` for dark crypto/tech landing page references; `ui-ux-pro-max` for a lime-on-dark palette variant, type pairing, and GSAP motion presets.
2. **Style tile** — one Claude Design canvas artboard: color tokens, type scale, button/card/glass-modal samples, KShost logo. User approves before proceeding.
3. **Section artboards** — remaining canvas artboards for every section in "Component Scope" above, in the approved style-tile language, inside the same canvas. User approves the canvas before code.
4. **Implementation** — port the approved canvas into the Next.js codebase: Tailwind `@theme` tokens in `globals.css`, component-by-component restyle, `Reveal` replay fix, hero globe component, rebrand text/metadata sweep.

## Out of Scope

- No change to routes, forms, API logic, validation, legal copy content, pricing, or network list.
- No light/dark mode toggle — single dark theme only.
- No WebGL/Three.js dependency for the globe.
- No new pages or sections beyond what exists today.

## Testing

- `npm run build` and `npm run lint` must pass after implementation.
- Manual verification in a running dev server: hero globe renders and animates, scroll reveals replay on repeated scroll up/down through every section, modals open in the new dark glass style, all brand text reads "KShost", `prefers-reduced-motion` visibly reduces/freezes the globe animation.
