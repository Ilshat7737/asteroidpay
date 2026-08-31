# HQclouds Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the single-page Next.js marketing landing site for HQclouds, a crypto payment gateway, matching the approved design spec.

**Architecture:** A single App Router route (`/`) composed of stacked section components, a shared `GlassModal` primitive (Radix Dialog + Framer Motion) driving two modals (Login, Contact) via a small React context, static data modules for networks/testimonials, one API route stub for the contact form, and a Docker-based self-host deployment path.

**Tech Stack:** Next.js 15 (App Router, TS, React 19), Tailwind CSS v4, shadcn/ui primitives (Button, Input, Select, Textarea, Label) + raw `@radix-ui/react-dialog` for the glass modal, Framer Motion, react-hook-form + zod + @hookform/resolvers, lucide-react, next/font/google (Space Grotesk, Inter).

**Spec:** `docs/superpowers/specs/2026-08-31-wibpe-landing-design.md` (filename retains the old slug; its content has been updated in place to say "HQclouds" throughout — the plan below always uses the current brand name).

## Global Constraints

- Brand name is **HQclouds** (capital H, capital Q, lowercase "clouds", one word) — use exactly this casing in all UI copy, metadata, code comments, and file content. Do not write "Wibpe" or "wibpe" anywhere.
- All site copy is in English.
- No real authentication, no database, no real contact-form delivery, no real crypto/blockchain integration, no analytics — this is a static marketing demo.
- Single route (`/`) plus `app/api/contact/route.ts` only. No `/login` route.
- Login always fails after a fake delay with "Invalid email or password." — never implement or test a success path for login.
- Do NOT introduce a test framework (no Vitest/Jest/Playwright-test runner). Verification per task is one or more of: `npm run build`, `npm run lint`, a manual `curl` against the running dev server, or a manual visual check via the `mcp__playwright__browser_navigate`, `mcp__playwright__browser_resize`, and `mcp__playwright__browser_take_screenshot` tools. These are one-off manual QA actions, not an automated suite.
- Local git commits are allowed, one per completed task, on the isolated worktree branch only — never push, never commit directly to `main`. The user has explicitly opted out only of pushing/publishing anywhere; local history for review purposes is fine.
- Tailwind v4 theme tokens (`--color-cream`, `--color-accent`, `--font-heading`, `--font-sans`) are defined once in Task 1 and referenced via generated utilities (`bg-cream`, `text-accent`, `font-heading`, etc.) everywhere else — never redefine them ad hoc in a component.
- The 6 networks and 8 testimonials use the exact names/roles/companies/locations from the spec; task 3 is their single source of truth — later tasks only import from `lib/data/*`, never redeclare the copy.

---

### Task 1: Scaffold project, dependencies, base styles

**Files:**
- Create (via `create-next-app`): `package.json`, `tsconfig.json`, `next.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `eslint.config.mjs`, `components.json` (shadcn), `components/ui/button.tsx`, `components/ui/input.tsx`, `components/ui/select.tsx`, `components/ui/textarea.tsx`, `components/ui/label.tsx`
- Modify: `app/layout.tsx` (fonts), `app/globals.css` (theme tokens)

**Interfaces:**
- Produces: Tailwind utilities `bg-cream`, `text-cream`, `bg-accent`, `text-accent`, `border-accent`, `font-heading`, `font-sans`; CSS `@keyframes marquee`; shadcn components `Button`, `Input`, `Select`/`SelectTrigger`/`SelectValue`/`SelectContent`/`SelectItem`, `Textarea`, `Label` importable from `@/components/ui/*`.

- [ ] **Step 1: Scaffold the Next.js app in the current directory**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --yes
```

`docs/` and `.git` already exist and are on create-next-app's allowed-non-empty-directory list, so this is safe to run here.

- [ ] **Step 2: Install runtime dependencies**

```bash
npm install framer-motion react-hook-form zod @hookform/resolvers lucide-react @radix-ui/react-dialog
```

- [ ] **Step 3: Init shadcn/ui and add the primitives actually used by later tasks**

```bash
npx shadcn@latest init -y
npx shadcn@latest add button input select textarea label
```

- [ ] **Step 4: Configure fonts in `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

(The `Metadata` export is added in Task 2 — leave the import in place.)

- [ ] **Step 5: Write brand theme tokens into `app/globals.css`**

Replace the generated Tailwind boilerplate with:

```css
@import "tailwindcss";

@theme {
  --color-cream: #f5f1e8;
  --color-accent: #ff5e7e;
  --font-heading: var(--font-space-grotesk);
  --font-sans: var(--font-inter);
}

@layer base {
  body {
    @apply bg-cream font-sans text-black;
  }
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
```

- [ ] **Step 6: Verify the scaffold builds**

Run: `npm run build`
Expected: build completes successfully (the default starter `app/page.tsx` is still in place and will be replaced in Task 16).

---

### Task 2: Brand assets & metadata

**Files:**
- Create: `components/logo.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`, `app/opengraph-image.tsx`
- Modify: `app/layout.tsx` (add `metadata` export)

**Interfaces:**
- Consumes: `@/components/ui/*` not needed here; uses raw SVG + `next/og`'s `ImageResponse`.
- Produces: `Logo` component (`components/logo.tsx`, default export `Logo({ className }: { className?: string })`) used by Task 5 (Navbar) and Task 12 (Footer).

- [ ] **Step 1: Write the Logo component**

```tsx
// components/logo.tsx
export function Logo({ className }: { className?: string }) {
  return (
    <a href="#" className={`flex items-center gap-2 ${className ?? ""}`} aria-label="HQclouds home">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="28" height="28" rx="9" fill="#FF5E7E" />
        <path
          d="M8 9L13 19L15 13L20 19L20 9"
          stroke="black"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-heading text-lg font-bold tracking-tight text-black">HQclouds</span>
    </a>
  );
}
```

- [ ] **Step 2: Write the favicon and apple touch icon**

```tsx
// app/icon.tsx
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 9,
          background: "#FF5E7E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 28 28" fill="none">
          <path
            d="M8 9L13 19L15 13L20 19L20 9"
            stroke="black"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
```

```tsx
// app/apple-icon.tsx
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 40,
          background: "#FF5E7E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="100" height="100" viewBox="0 0 28 28" fill="none">
          <path
            d="M8 9L13 19L15 13L20 19L20 9"
            stroke="black"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 3: Write the Open Graph image**

```tsx
// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0A0A0A",
          color: "#F5F1E8",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: "#FF5E7E" }} />
          <div style={{ fontSize: 40, fontWeight: 700 }}>HQclouds</div>
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          Fast, low-fee crypto payments.
        </div>
        <div style={{ fontSize: 28, marginTop: 24, color: "#B8B2A6" }}>
          Fees from 0.3% · Settled in minutes · Built for reliability
        </div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 4: Add the metadata export to `app/layout.tsx`**

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://hqclouds.com"),
  title: {
    default: "HQclouds — Fast, Low-Fee Crypto Payments",
    template: "%s · HQclouds",
  },
  description:
    "HQclouds is a crypto payment gateway built for speed, low fees from 0.3%, and reliable settlement across Bitcoin, Ethereum, Tron, BNB Smart Chain, Polygon, and Solana.",
  openGraph: {
    title: "HQclouds — Fast, Low-Fee Crypto Payments",
    description:
      "Accept crypto payments across major networks with fees from 0.3%, automatic stablecoin conversion, and fast, reliable settlement.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HQclouds — Fast, Low-Fee Crypto Payments",
    description:
      "Accept crypto payments across major networks with fees from 0.3%, automatic stablecoin conversion, and fast, reliable settlement.",
  },
  themeColor: "#0A0A0A",
  robots: { index: true, follow: true },
};
```

- [ ] **Step 5: Verify**

Run: `npm run build`
Expected: build succeeds; `/icon`, `/apple-icon`, `/opengraph-image` routes appear in the build output.

---

### Task 3: Data layer & validation schemas

**Files:**
- Create: `lib/data/networks.ts`, `lib/data/testimonials.ts`, `lib/validation/contact.ts`, `lib/validation/login.ts`

**Interfaces:**
- Produces: `Network` interface + `networks: Network[]` from `@/lib/data/networks` (consumed by Task 7, Task 8); `Testimonial` interface + `testimonials: Testimonial[]` from `@/lib/data/testimonials` (consumed by Task 11); `contactSchema`/`ContactInput` from `@/lib/validation/contact` (consumed by Task 14, Task 15); `loginSchema`/`LoginInput` from `@/lib/validation/login` (consumed by Task 13).

- [ ] **Step 1: Write the networks data module**

```ts
// lib/data/networks.ts
export interface Network {
  id: string;
  name: string;
  ticker: string;
  standard: string;
  description: string;
}

export const networks: Network[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    ticker: "BTC",
    standard: "Native",
    description: "The most trusted and liquid network — best for larger, less time-sensitive settlements.",
  },
  {
    id: "ethereum",
    name: "Ethereum",
    ticker: "ETH",
    standard: "ERC-20",
    description: "The widest token support, including USDT, USDC, and DAI — confirms in a few minutes.",
  },
  {
    id: "tron",
    name: "Tron",
    ticker: "USDT",
    standard: "TRC-20",
    description: "The cheapest and most widely used network for USDT transfers globally.",
  },
  {
    id: "bnb-smart-chain",
    name: "BNB Smart Chain",
    ticker: "BNB",
    standard: "BEP-20",
    description: "Low fees and fast confirmations, backed by a broad DeFi ecosystem.",
  },
  {
    id: "polygon",
    name: "Polygon",
    ticker: "MATIC",
    standard: "ERC-20 compatible",
    description: "Near-instant confirmations with sub-cent fees — ideal for small, frequent payments.",
  },
  {
    id: "solana",
    name: "Solana",
    ticker: "SOL",
    standard: "SPL",
    description: "Sub-second finality and very high throughput for high-volume merchants.",
  },
];
```

- [ ] **Step 2: Write the testimonials data module**

```ts
// lib/data/testimonials.ts
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "marco-conti",
    name: "Marco Conti",
    role: "Founder",
    company: "CloudNest Hosting",
    location: "Milan, Italy",
    quote:
      "Paying our upstream server providers used to mean two days of waiting on bank transfers and FX fees. Now clients pay us in USDT and it lands the same hour. 0.4% is nothing next to what we lost before.",
  },
  {
    id: "farah-haddad",
    name: "Farah Haddad",
    role: "Operations Lead",
    company: "VeilPoint VPN",
    location: "Beirut, Lebanon",
    quote:
      "Card processors kept flagging our subscriptions as high-risk. HQclouds just works, no explanations needed, and settlement is fast enough that we stopped worrying about cash flow week to week.",
  },
  {
    id: "tobias-lindqvist",
    name: "Tobias Lindqvist",
    role: "Founder",
    company: "Dropcase",
    location: "Gothenburg, Sweden",
    quote:
      "Our buyers are impatient — if checkout takes more than a minute we lose the sale. The auto-convert to USDC also means I never have to sit on a volatile balance between trades.",
  },
  {
    id: "ana-beatriz-souza",
    name: "Ana Beatriz Souza",
    role: "Account Manager",
    company: "AdaptAds",
    location: "São Paulo, Brazil",
    quote:
      "We move money across a dozen countries every week. Tron network fees are basically zero, and support actually answers when a transfer looks stuck instead of leaving us guessing.",
  },
  {
    id: "youssef-el-amrani",
    name: "Youssef El-Amrani",
    role: "Founder",
    company: "RankForge SEO",
    location: "Casablanca, Morocco",
    quote:
      "Clients abroad used to pay through three different services before the money reached me. Now it's one wallet address and a five-minute wait, at a fraction of the cost.",
  },
  {
    id: "mei-ling-tan",
    name: "Mei Ling Tan",
    role: "Founder",
    company: "StreamBox",
    location: "Kuala Lumpur, Malaysia",
    quote:
      "Switching from our old gateway cut processing costs by more than half. 0.3% on our volume is a real number on the P&L, not a marketing line.",
  },
  {
    id: "connor-byrne",
    name: "Connor Byrne",
    role: "Founder",
    company: "ProxyHaven",
    location: "Dublin, Ireland",
    quote:
      "I run this alone, so I needed something I could set up in an afternoon. HQclouds is the first crypto payment tool that didn't make me read documentation for a day first.",
  },
  {
    id: "isabela-rocha",
    name: "Isabela Rocha",
    role: "Founder",
    company: "LicenseKey Hub",
    location: "Lisbon, Portugal",
    quote:
      "Chargebacks on a low-ticket product were killing our margins. Crypto payments settle final, and auto-conversion means I still get paid in a stable currency at the end of the day.",
  },
];
```

- [ ] **Step 3: Write the validation schemas**

```ts
// lib/validation/contact.ts
import { z } from "zod";

export const contactSchema = z.object({
  country: z.string().min(1, "Country is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  comment: z.string().min(1, "Please add a comment"),
});

export type ContactInput = z.infer<typeof contactSchema>;
```

```ts
// lib/validation/login.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit`
Expected: no type errors.

---

### Task 4: GlassModal primitive + ModalProvider context

**Files:**
- Create: `components/ui/glass-modal.tsx`, `components/modal-provider.tsx`
- Modify: `app/layout.tsx` (wrap `{children}` with `ModalProvider`)

**Interfaces:**
- Consumes: `@radix-ui/react-dialog`, `framer-motion`, `lucide-react` (`X`).
- Produces: `GlassModal({ open, onOpenChange, title, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; children: React.ReactNode })` from `@/components/ui/glass-modal` (consumed by Task 13, Task 14). `ModalProvider` (wraps app) and `useModal(): { activeModal: "login" | "contact" | null; openLogin: () => void; openContact: () => void; close: () => void }` from `@/components/modal-provider` (consumed by Task 5, 6, 12, 13, 14).

- [ ] **Step 1: Write the modal context**

```tsx
// components/modal-provider.tsx
"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type ModalType = "login" | "contact" | null;

interface ModalContextValue {
  activeModal: ModalType;
  openLogin: () => void;
  openContact: () => void;
  close: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  return (
    <ModalContext.Provider
      value={{
        activeModal,
        openLogin: () => setActiveModal("login"),
        openContact: () => setActiveModal("contact"),
        close: () => setActiveModal(null),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
```

- [ ] **Step 2: Write the GlassModal primitive**

```tsx
// components/ui/glass-modal.tsx
"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface GlassModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}

export function GlassModal({ open, onOpenChange, title, children }: GlassModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            <DialogPrimitive.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </DialogPrimitive.Overlay>
            <DialogPrimitive.Content asChild forceMount>
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-white/30 bg-white/20 p-6 shadow-2xl backdrop-blur-2xl"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 100%)",
                }}
                initial={{ opacity: 0, scale: 0.92, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 12 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <DialogPrimitive.Title className="font-heading text-xl font-semibold text-black">
                    {title}
                  </DialogPrimitive.Title>
                  <DialogPrimitive.Close className="rounded-full p-1.5 text-black/60 hover:bg-black/10">
                    <X className="h-4 w-4" />
                  </DialogPrimitive.Close>
                </div>
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
```

- [ ] **Step 3: Wire `ModalProvider` into the root layout**

In `app/layout.tsx`, import `ModalProvider` from `@/components/modal-provider` and wrap the body's children:

```tsx
<body>
  <ModalProvider>{children}</ModalProvider>
</body>
```

- [ ] **Step 4: Verify**

Run: `npm run build`
Expected: build succeeds with no unused-import or type errors.

---

### Task 5: Navbar

**Files:**
- Create: `components/navbar.tsx`

**Interfaces:**
- Consumes: `Logo` from `@/components/logo`, `useModal` from `@/components/modal-provider`, `Button` from `@/components/ui/button`.
- Produces: `Navbar` default export, rendered by Task 16's `app/page.tsx`.

- [ ] **Step 1: Write the Navbar with scroll-aware glass background and mobile sheet**

```tsx
// components/navbar.tsx
"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#services", label: "Solutions" },
  { href: "#networks", label: "Networks" },
  { href: "#fees", label: "Fees" },
  { href: "#reviews", label: "Reviews" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openLogin, openContact } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled ? "bg-white/60 shadow-sm backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-black/80 hover:text-black">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" className="rounded-full" onClick={openLogin}>
            Log in
          </Button>
          <Button className="rounded-full bg-accent text-black hover:bg-accent/90" onClick={openContact}>
            Contact us
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white/70 p-6 backdrop-blur-2xl md:hidden">
          <div className="mb-8 flex items-center justify-between">
            <Logo />
            <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-6 text-lg font-medium">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <Button
              variant="ghost"
              className="rounded-full"
              onClick={() => {
                setMobileOpen(false);
                openLogin();
              }}
            >
              Log in
            </Button>
            <Button
              className="rounded-full bg-accent text-black"
              onClick={() => {
                setMobileOpen(false);
                openContact();
              }}
            >
              Contact us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds. (Full visual check happens in Task 16 once the Navbar is mounted on the page.)

---

### Task 6: Hero section

**Files:**
- Create: `components/sections/hero.tsx`

**Interfaces:**
- Consumes: `useModal` from `@/components/modal-provider`, `Button` from `@/components/ui/button`, `motion` from `framer-motion`.
- Produces: `Hero` default export, consumed by Task 16.

- [ ] **Step 1: Write the Hero section**

```tsx
// components/sections/hero.tsx
"use client";

import { motion } from "framer-motion";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { openContact } = useModal();

  return (
    <section className="relative overflow-hidden bg-cream pb-24 pt-40">
      <div className="mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-5xl font-bold leading-[1.05] text-black sm:text-6xl md:text-7xl"
        >
          Crypto payments that move at the speed of your business.
        </motion.h1>
        <p className="mt-6 max-w-2xl text-lg text-black/70">
          Accept Bitcoin, Ethereum, and stablecoins across six networks. Fees from 0.3%, automatic
          conversion, and settlement you can count on.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            className="rounded-full bg-accent px-8 text-black hover:bg-accent/90"
            onClick={openContact}
          >
            Contact us
          </Button>
          <a
            href="#fees"
            className="rounded-full border border-black/15 px-8 py-3 text-sm font-medium text-black hover:bg-black/5"
          >
            See fees
          </a>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[140%] -translate-x-1/2 rounded-[50%] bg-accent/30 blur-3xl"
      />
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds.

---

### Task 7: TrustBar network marquee (21st.dev-sourced)

**Files:**
- Create: `components/sections/trust-bar.tsx`

**Interfaces:**
- Consumes: `networks` from `@/lib/data/networks`.
- Produces: `TrustBar` default export, consumed by Task 16.

- [ ] **Step 1: Source a marquee/logo-scroll component from 21st.dev**

Call `mcp__21st__search` with a query such as `"infinite logo marquee"` or `"scrolling logo carousel"`. If a suitable result appears, call `mcp__21st__get_component` on it to fetch the implementation, then adapt it: replace its content items with `networks` entries, and restyle its colors/spacing to the HQclouds tokens (`bg-black`, `text-white/70`, no rounded cards — a plain scrolling text/badge row). Keep only the animation/marquee mechanism from the sourced component; drop unrelated markup (logos-as-images, unrelated copy).

If no result from `mcp__21st__search` fits (e.g., only paid/gated components, or nothing marquee-like), use this equivalent hand-built implementation instead — it relies only on the `marquee` keyframes already defined in `app/globals.css` (Task 1):

```tsx
// components/sections/trust-bar.tsx
import { networks } from "@/lib/data/networks";

export function TrustBar() {
  const items = [...networks, ...networks];

  return (
    <div className="overflow-hidden border-y border-black/10 bg-black py-6">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-12">
        {items.map((network, i) => (
          <span key={`${network.id}-${i}`} className="whitespace-nowrap text-lg font-semibold text-white/70">
            {network.name} · {network.ticker}
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds, no unused imports left over from adapting a sourced component.

---

### Task 8: Services section (networks grid)

**Files:**
- Create: `components/sections/services.tsx`

**Interfaces:**
- Consumes: `networks` from `@/lib/data/networks`.
- Produces: `Services` default export (renders `id="services"` and `id="networks"` anchors used by the Navbar's `#services`/`#networks` links), consumed by Task 16.

- [ ] **Step 1: Write the Services section**

```tsx
// components/sections/services.tsx
import { networks } from "@/lib/data/networks";

export function Services() {
  return (
    <section id="services" className="bg-cream py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-heading text-4xl font-bold text-black sm:text-5xl">
          Accept crypto payments across the networks your customers already use.
        </h2>
        <div
          id="networks"
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
        >
          {networks.map((network) => (
            <div
              key={network.id}
              className="min-w-[80%] shrink-0 snap-start rounded-[28px] border border-black/10 bg-white p-6 sm:min-w-0 sm:shrink"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="font-heading text-xl font-semibold text-black">{network.name}</h3>
                <span className="text-sm font-medium text-black/50">{network.ticker}</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wide text-black/40">{network.standard}</p>
              <p className="mt-4 text-sm text-black/70">{network.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds.

---

### Task 9: Auto-Convert section

**Files:**
- Create: `components/sections/auto-convert.tsx`

**Interfaces:**
- Produces: `AutoConvert` default export, consumed by Task 16.

- [ ] **Step 1: Write the Auto-Convert section**

```tsx
// components/sections/auto-convert.tsx
export function AutoConvert() {
  return (
    <section className="bg-black py-24 text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="font-heading text-4xl font-bold sm:text-5xl">
            Every payment lands the way you want it.
          </h2>
          <p className="mt-6 text-lg text-white/70">
            The moment a payment arrives, HQclouds converts it automatically into a stablecoin like
            USDT or USDC — or straight to fiat — at the live market rate. You never hold volatile
            crypto you didn&apos;t choose to hold.
          </p>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-8">
          <ul className="space-y-4 text-sm text-white/80">
            <li>→ Converted at the market rate the instant funds are received</li>
            <li>→ Settle in USDT, USDC, or fiat — your choice</li>
            <li>→ No manual swaps, no exposure to price swings</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds.

---

### Task 10: Fees section

**Files:**
- Create: `components/sections/fees.tsx`

**Interfaces:**
- Produces: `Fees` default export (renders `id="fees"` anchor used by the Navbar's `#fees` link and Hero's "See fees" link), consumed by Task 16.

- [ ] **Step 1: Write the Fees section**

```tsx
// components/sections/fees.tsx
const FEE_POINTS = [
  "No setup fee",
  "No monthly fee",
  "No hidden costs",
  "Volume-based discounts for high-volume and enterprise merchants",
  "Transparent, per-transaction pricing",
];

export function Fees() {
  return (
    <section id="fees" className="bg-cream py-24">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Pricing</p>
        <h2 className="mt-3 font-heading text-5xl font-bold text-black sm:text-6xl">From 0.3%</h2>
        <p className="mt-4 text-black/60">
          per successful transaction — the rate drops further as your volume grows.
        </p>
        <ul className="mx-auto mt-10 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
          {FEE_POINTS.map((point) => (
            <li key={point} className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm text-black/80">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds.

---

### Task 11: Testimonials section (21st.dev-sourced)

**Files:**
- Create: `components/sections/testimonials.tsx`

**Interfaces:**
- Consumes: `testimonials` from `@/lib/data/testimonials`.
- Produces: `Testimonials` default export (renders `id="reviews"` anchor used by the Navbar's `#reviews` link), consumed by Task 16.

- [ ] **Step 1: Source a testimonial layout from 21st.dev**

Call `mcp__21st__search` with a query such as `"testimonial cards"` or `"customer quote carousel"`. If a result fits, call `mcp__21st__get_component` to fetch it and adapt it: swap its content for `testimonials` entries (`name`, `role`, `company`, `location`, `quote`), and restyle to HQclouds tokens (dark section, `bg-white/5` cards, `rounded-[28px]`). Preserve the CSS scroll-snap/horizontal-scroll-on-mobile behavior required by the spec — if the sourced component uses a JS carousel library instead, drop the library and keep only its layout/visual structure, reimplementing the scroll behavior with CSS `snap-x snap-mandatory` as below.

If no result from `mcp__21st__search` fits, use this equivalent hand-built implementation instead (desktop grid, mobile CSS scroll-snap, no extra dependency):

```tsx
// components/sections/testimonials.tsx
import { testimonials } from "@/lib/data/testimonials";

export function Testimonials() {
  return (
    <section id="reviews" className="bg-black py-24 text-cream">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-heading text-4xl font-bold sm:text-5xl">
          Built for businesses that move fast.
        </h2>
        <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="min-w-[85%] shrink-0 snap-start rounded-[28px] border border-white/10 bg-white/5 p-6 md:min-w-0"
            >
              <blockquote className="text-sm text-white/80">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 text-sm">
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-white/50">
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

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds, all 8 testimonials render (spot-check the rendered output or count `<figure>` occurrences if adapting a sourced component).

---

### Task 12: Final CTA + Footer

**Files:**
- Create: `components/sections/final-cta.tsx`, `components/footer.tsx`

**Interfaces:**
- Consumes: `useModal` from `@/components/modal-provider`, `Button` from `@/components/ui/button` (final-cta); `Logo` from `@/components/logo` (footer).
- Produces: `FinalCta` and `Footer` default exports, consumed by Task 16.

- [ ] **Step 1: Write the Final CTA section**

```tsx
// components/sections/final-cta.tsx
"use client";

import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  const { openContact } = useModal();

  return (
    <section className="bg-accent py-24 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="font-heading text-4xl font-bold text-black sm:text-5xl">
          Fast payments. Low fees. Reliable, every time.
        </h2>
        <Button
          size="lg"
          className="mt-8 rounded-full bg-black px-8 text-white hover:bg-black/80"
          onClick={openContact}
        >
          Contact us
        </Button>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write the Footer**

```tsx
// components/footer.tsx
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="bg-black py-12 text-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between">
        <Logo className="[&_span]:text-white" />
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="#services">Solutions</a>
          <a href="#networks">Networks</a>
          <a href="#fees">Fees</a>
          <a href="#reviews">Reviews</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
        </nav>
        <p className="text-xs">© {new Date().getFullYear()} HQclouds. All rights reserved.</p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds.

---

### Task 13: Login modal

**Files:**
- Create: `components/login-modal.tsx`

**Interfaces:**
- Consumes: `GlassModal` from `@/components/ui/glass-modal`, `useModal` from `@/components/modal-provider`, `loginSchema`/`LoginInput` from `@/lib/validation/login`, `Button`/`Input`/`Label` from `@/components/ui/*`.
- Produces: `LoginModal` default export, consumed by Task 16.

- [ ] **Step 1: Write the Login modal**

```tsx
// components/login-modal.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlassModal } from "@/components/ui/glass-modal";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginInput } from "@/lib/validation/login";

export function LoginModal() {
  const { activeModal, close, openContact } = useModal();
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async () => {
    setServerError(null);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setServerError("Invalid email or password.");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      close();
      setServerError(null);
      reset();
    }
  };

  return (
    <GlassModal open={activeModal === "login"} onOpenChange={handleOpenChange} title="Log in to HQclouds">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" type="email" {...register("email")} />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <Label htmlFor="login-password">Password</Label>
          <Input id="login-password" type="password" {...register("password")} />
          {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
        </div>
        {serverError && (
          <p className="rounded-xl bg-red-500/10 px-3 py-2 text-sm text-red-700">{serverError}</p>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-black text-white hover:bg-black/80"
        >
          {isSubmitting ? "Logging in…" : "Log in"}
        </Button>
        <p className="text-center text-xs text-black/60">
          Don&apos;t have an account?{" "}
          <button type="button" onClick={openContact} className="font-medium underline">
            Contact us
          </button>
        </p>
      </form>
    </GlassModal>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds. (End-to-end interaction is checked visually in Task 16.)

---

### Task 14: Contact modal

**Files:**
- Create: `components/contact-modal.tsx`

**Interfaces:**
- Consumes: `GlassModal` from `@/components/ui/glass-modal`, `useModal` from `@/components/modal-provider`, `contactSchema`/`ContactInput` from `@/lib/validation/contact`, `Button`/`Input`/`Label`/`Textarea`/`Select*` from `@/components/ui/*`. Calls `POST /api/contact` (produced by Task 15).
- Produces: `ContactModal` default export, consumed by Task 16.

- [ ] **Step 1: Write the Contact modal**

```tsx
// components/contact-modal.tsx
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GlassModal } from "@/components/ui/glass-modal";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contactSchema, type ContactInput } from "@/lib/validation/contact";

const COUNTRIES = [
  "United States", "United Kingdom", "Germany", "France", "Italy", "Spain", "Portugal",
  "Ireland", "Sweden", "Netherlands", "Brazil", "Mexico", "Nigeria", "Morocco",
  "United Arab Emirates", "India", "Malaysia", "Singapore", "Japan", "South Korea", "Australia",
];

export function ContactModal() {
  const { activeModal, close } = useModal();
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactInput) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) setSubmitted(true);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      close();
      setSubmitted(false);
      reset();
    }
  };

  return (
    <GlassModal open={activeModal === "contact"} onOpenChange={handleOpenChange} title="Contact us">
      {submitted ? (
        <div className="py-4 text-center">
          <p className="text-black">Thanks — our team will reach out within 1 business day.</p>
          <Button
            className="mt-6 rounded-full bg-black text-white hover:bg-black/80"
            onClick={() => handleOpenChange(false)}
          >
            Close
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="contact-country">Country</Label>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="contact-country">
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.country && <p className="mt-1 text-xs text-red-600">{errors.country.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact-company">Company</Label>
            <Input id="contact-company" {...register("company")} />
            {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" type="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="contact-phone">Phone (optional)</Label>
            <Input id="contact-phone" type="tel" {...register("phone")} />
          </div>
          <div>
            <Label htmlFor="contact-comment">Comment</Label>
            <Textarea id="contact-comment" rows={4} {...register("comment")} />
            {errors.comment && <p className="mt-1 text-xs text-red-600">{errors.comment.message}</p>}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-black text-white hover:bg-black/80"
          >
            {isSubmitting ? "Sending…" : "Send"}
          </Button>
        </form>
      )}
    </GlassModal>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds. (Full submit round-trip is checked once Task 15's API route exists — see Task 16.)

---

### Task 15: `/api/contact` route handler

**Files:**
- Create: `app/api/contact/route.ts`

**Interfaces:**
- Consumes: `contactSchema` from `@/lib/validation/contact`.
- Produces: `POST /api/contact` — `200 { ok: true }` on valid payload, `400 { ok: false, errors: Record<string, string[] | undefined> }` on invalid payload. Consumed by Task 14 (`ContactModal`) and verified directly in this task.

- [ ] **Step 1: Write the route handler**

```ts
// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 400));
  console.log("New contact request:", parsed.data);

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 2: Verify with the dev server**

```bash
npm run dev &
sleep 3
curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"country":"Germany","company":"Test GmbH","email":"test@example.com","comment":"Interested"}'
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"company":"Test GmbH"}'
kill %1
```

Expected: first `curl` prints `200`; second `curl` (missing `country`, `email`, `comment`) prints a JSON body with `"ok":false` and a `400` status (check with `-w "%{http_code}"` if you want the code explicitly).

---

### Task 16: Assemble `app/page.tsx` and full responsive QA

**Files:**
- Modify: `app/page.tsx` (replace the create-next-app starter content entirely)

**Interfaces:**
- Consumes: `Navbar` (Task 5), `Hero` (Task 6), `TrustBar` (Task 7), `Services` (Task 8), `AutoConvert` (Task 9), `Fees` (Task 10), `Testimonials` (Task 11), `FinalCta`/`Footer` (Task 12), `LoginModal` (Task 13), `ContactModal` (Task 14). `ModalProvider` is already wrapping the tree from Task 4's layout change.

- [ ] **Step 1: Replace `app/page.tsx`**

```tsx
// app/page.tsx
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { Services } from "@/components/sections/services";
import { AutoConvert } from "@/components/sections/auto-convert";
import { Fees } from "@/components/sections/fees";
import { Testimonials } from "@/components/sections/testimonials";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/footer";
import { LoginModal } from "@/components/login-modal";
import { ContactModal } from "@/components/contact-modal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <AutoConvert />
        <Fees />
        <Testimonials />
        <FinalCta />
      </main>
      <Footer />
      <LoginModal />
      <ContactModal />
    </>
  );
}
```

- [ ] **Step 2: Build and start the dev server**

```bash
npm run build
npm run dev &
sleep 3
```

Expected: build succeeds; dev server comes up on `http://localhost:3000`.

- [ ] **Step 3: Desktop visual QA**

Use `mcp__playwright__browser_navigate` to open `http://localhost:3000`, `mcp__playwright__browser_resize` to `1440x900`, then `mcp__playwright__browser_take_screenshot` of the full page. Confirm: hero headline renders, network trust-bar scrolls, all 6 network cards and all 8 testimonials are present, fees headline reads "From 0.3%".

Then click "Log in" (via `mcp__playwright__browser_click`), take a screenshot to confirm the `GlassModal` shows the blurred/translucent panel, submit the empty form to see validation messages, fill in an email/password and submit to confirm the "Invalid email or password." message appears after the delay. Close it, click "Contact us", repeat for the contact form, and submit a valid payload to confirm the confirmation state replaces the form.

- [ ] **Step 4: Mobile visual QA**

`mcp__playwright__browser_resize` to `390x844`. Screenshot the page: confirm the hamburger menu appears instead of the desktop nav, the network grid/testimonials switch to horizontal scroll, and sections stack vertically without horizontal overflow. Open the hamburger menu and screenshot the full-screen glass sheet.

- [ ] **Step 5: Stop the dev server**

```bash
kill %1
```

---

### Task 17: Docker deployment

**Files:**
- Create: `Dockerfile`, `docker-compose.yml`, `.dockerignore`
- Modify: `next.config.ts` (add `output: "standalone"`)

**Interfaces:**
- Produces: a `web` service reachable on `http://localhost:3000` via `docker compose up -d --build`.

- [ ] **Step 1: Enable standalone output**

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

- [ ] **Step 2: Write the Dockerfile**

```dockerfile
# Dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

- [ ] **Step 3: Write docker-compose.yml and .dockerignore**

```yaml
# docker-compose.yml
services:
  web:
    build: .
    ports:
      - "3000:3000"
    restart: unless-stopped
```

```
# .dockerignore
node_modules
.next
.git
docs
Dockerfile
docker-compose.yml
.dockerignore
npm-debug.log
```

- [ ] **Step 4: Verify the container builds and serves**

```bash
docker compose up -d --build
sleep 5
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000
docker compose down
```

Expected: `curl` prints `200`.

---

### Task 18: Final polish

**Files:**
- Modify: any file flagged by lint/build (fix in place, no new files expected)

**Interfaces:** None (verification-only task).

- [ ] **Step 1: Run lint and build**

```bash
npm run lint
npm run build
```

- [ ] **Step 2: Fix any reported issues**

Address every lint error/warning and build error directly in the affected file(s) (unused imports, missing `alt`/`aria-label` attributes, etc.).

- [ ] **Step 3: Re-verify**

Run: `npm run lint && npm run build`
Expected: both complete with no errors.

---

### Task 19: Terms of Use page

**Files:**
- Create: `app/terms/page.tsx`

**Interfaces:**
- Consumes: `Navbar` from `@/components/navbar`, `Footer` from `@/components/footer`.
- Produces: the `/terms` route, linked to by Task 21's footer update.

- [ ] **Step 1: Write the Terms of Use page**

```tsx
// app/terms/page.tsx
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms and conditions governing use of HQclouds' crypto payment gateway services.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream pb-24 pt-32">
        <article className="mx-auto max-w-3xl px-4">
          <p className="text-sm font-medium text-accent">Legal</p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-black sm:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-4 text-sm text-black/50">Last updated: August 31, 2026</p>

          <div className="mt-12 space-y-10 text-black/80">
            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                1. Acceptance of Terms
              </h2>
              <p className="mt-3 leading-relaxed">
                By accessing or using the HQclouds website, dashboard, or payment infrastructure
                (collectively, the &ldquo;Service&rdquo;), you agree to be bound by these Terms of
                Use. If you are entering into these Terms on behalf of a company or other legal
                entity, you represent that you have the authority to bind that entity, in which
                case &ldquo;you&rdquo; refers to that entity. If you do not agree to these Terms,
                you must not use the Service.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                2. Description of Service
              </h2>
              <p className="mt-3 leading-relaxed">
                HQclouds provides merchants with infrastructure to accept cryptocurrency payments
                across multiple blockchain networks, including automatic conversion of received
                funds into stablecoins or fiat currency at prevailing market rates. The Service is
                made available to businesses onboarded through our sales process; it is not
                currently offered as a self-service, instant-signup product.
              </p>
              <p className="mt-3 leading-relaxed">
                HQclouds acts solely as a payment facilitator and technology gateway between you
                and your customers. We are not a custodian: received funds are held only for the
                brief period required to detect, convert, and settle each transaction through our
                auto-convert process, and are not retained as a standing balance on your behalf.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">3. Eligibility</h2>
              <p className="mt-3 leading-relaxed">
                You must be at least 18 years old and have the legal capacity to enter into
                binding contracts to use the Service. Businesses must be validly formed and in
                good standing under the laws of their jurisdiction of incorporation. We may
                decline to onboard, or may suspend, any applicant or merchant that does not meet
                our eligibility or risk criteria.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                4. Account and User Obligations
              </h2>
              <p className="mt-3 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account
                credentials and for all activity that occurs under your account. You agree to
                provide accurate, current, and complete information during onboarding and to
                promptly update that information if it changes, and to notify us immediately of
                any unauthorized use of your account.
              </p>
              <p className="mt-3 leading-relaxed">
                You are solely responsible for the accuracy of any wallet address you provide or
                configure for receiving settlement. Blockchain transactions are irreversible once
                broadcast to the network: HQclouds cannot recover, reverse, or refund a transaction
                sent to an incorrect or unsupported address, and has no obligation to do so.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">5. Fees</h2>
              <p className="mt-3 leading-relaxed">
                Use of the Service is subject to transaction fees starting from 0.3% per
                successfully settled payment, as described on our website and confirmed in your
                merchant agreement. Fees may vary based on transaction volume, network, and
                settlement currency. We do not charge setup or monthly fees, and applicable fees
                are always disclosed before they are applied.
              </p>
              <p className="mt-3 leading-relaxed">
                Separately from our service fees, each blockchain network charges its own network
                (miner or validator) fee to process a transaction. Network fees are set by the
                network itself, fluctuate with real-time network conditions, and are outside
                HQclouds&apos; control.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                6. Prohibited Uses
              </h2>
              <p className="mt-3 leading-relaxed">
                You may not use the Service to process payments related to illegal goods or
                services, fraud, money laundering, terrorist financing, sanctions evasion, or any
                activity that violates applicable law. We reserve the right to refuse, delay, or
                reverse any transaction we reasonably believe violates this section, and to
                terminate accounts engaged in prohibited activity.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                7. Intellectual Property
              </h2>
              <p className="mt-3 leading-relaxed">
                The Service, including its software, design, branding, and documentation, is
                owned by HQclouds and protected by intellectual property laws. We grant you a
                limited, non-exclusive, non-transferable license to use the Service in accordance
                with these Terms. You may not copy, modify, reverse-engineer, or create derivative
                works from the Service.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                8. Limitation of Liability
              </h2>
              <p className="mt-3 leading-relaxed">
                To the fullest extent permitted by law, HQclouds shall not be liable for any
                indirect, incidental, special, or consequential damages arising out of or in
                connection with your use of the Service, including losses resulting from
                blockchain network congestion, third-party wallet errors, or market volatility
                between the time a payment is received and converted.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                9. Indemnification
              </h2>
              <p className="mt-3 leading-relaxed">
                You agree to indemnify and hold HQclouds harmless from any claims, damages, or
                expenses, including reasonable legal fees, arising from your use of the Service,
                your violation of these Terms, or your violation of any rights of a third party.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">10. Termination</h2>
              <p className="mt-3 leading-relaxed">
                We may suspend or terminate your access to the Service at any time, with or
                without cause, including where we reasonably suspect a violation of these Terms or
                applicable law. You may terminate your use of the Service at any time by
                contacting our team. Provisions that by their nature should survive termination
                will survive.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">11. Governing Law</h2>
              <p className="mt-3 leading-relaxed">
                These Terms are governed by the laws of the applicable jurisdiction specified in
                your merchant agreement, without regard to conflict-of-law principles. Any
                disputes arising under these Terms will be resolved in the courts or arbitration
                forum specified in that agreement.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                12. Changes to These Terms
              </h2>
              <p className="mt-3 leading-relaxed">
                We may update these Terms from time to time to reflect changes in our Service or
                legal requirements. We will post the updated Terms on this page with a revised
                &ldquo;Last updated&rdquo; date. Continued use of the Service after changes take
                effect constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">13. Contact</h2>
              <p className="mt-3 leading-relaxed">
                Questions about these Terms can be directed to our team through the contact form
                on this website.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds; `/terms` appears as a route in the build output.

---

### Task 20: Privacy Policy page

**Files:**
- Create: `app/privacy/page.tsx`

**Interfaces:**
- Consumes: `Navbar` from `@/components/navbar`, `Footer` from `@/components/footer`.
- Produces: the `/privacy` route, linked to by Task 21's footer update.

- [ ] **Step 1: Write the Privacy Policy page**

```tsx
// app/privacy/page.tsx
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How HQclouds collects, uses, and protects your personal data across our website and payment services.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream pb-24 pt-32">
        <article className="mx-auto max-w-3xl px-4">
          <p className="text-sm font-medium text-accent">Legal</p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-black sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-black/50">Last updated: August 31, 2026</p>

          <div className="mt-12 space-y-10 text-black/80">
            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                1. Information We Collect
              </h2>
              <p className="mt-3 leading-relaxed">
                We collect information you provide directly, such as your name, company details,
                email address, and phone number when you contact us or engage our services. We
                also collect technical information automatically, including IP address, browser
                type, and usage data when you interact with our website and dashboard.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                2. How We Use Your Information
              </h2>
              <p className="mt-3 leading-relaxed">
                We use the information we collect to provide and improve the Service, respond to
                inquiries, process merchant onboarding, communicate important updates, detect and
                prevent fraud, and comply with our legal and regulatory obligations, including
                those described in our AML Policy.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                3. Cookies and Tracking
              </h2>
              <p className="mt-3 leading-relaxed">
                Our website uses cookies and similar technologies to keep you signed in, remember
                your preferences, and understand how our site is used. You can control cookies
                through your browser settings; disabling certain cookies may affect the
                functionality of the website.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                4. Data Sharing and Third Parties
              </h2>
              <p className="mt-3 leading-relaxed">
                We do not sell your personal data. We may share information with service providers
                who help us operate the Service, such as hosting and communications providers,
                under confidentiality obligations, and with regulators, law enforcement, or
                professional advisors where required by law.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                5. Data Retention
              </h2>
              <p className="mt-3 leading-relaxed">
                We retain personal data for as long as necessary to provide the Service, meet our
                legal and regulatory obligations, including recordkeeping requirements described
                in our AML Policy, resolve disputes, and enforce our agreements.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">6. Data Security</h2>
              <p className="mt-3 leading-relaxed">
                We use administrative, technical, and organizational safeguards designed to
                protect personal data against unauthorized access, alteration, disclosure, or
                destruction. No method of transmission or storage is completely secure, and we
                cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">7. Your Rights</h2>
              <p className="mt-3 leading-relaxed">
                Subject to applicable law, you may have the right to access, correct, delete, or
                port your personal data, and to object to or restrict certain processing. To
                exercise these rights, contact us through the form on this website; we will
                respond within the timeframe required by applicable law.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                8. International Data Transfers
              </h2>
              <p className="mt-3 leading-relaxed">
                As we operate across multiple jurisdictions, your data may be transferred to and
                processed in countries other than your own. Where required, we use appropriate
                safeguards to ensure such transfers comply with applicable data protection law.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                9. Children&apos;s Privacy
              </h2>
              <p className="mt-3 leading-relaxed">
                The Service is intended for business use by adults and is not directed at
                individuals under the age of 18. We do not knowingly collect personal data from
                children.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                10. Changes to This Policy
              </h2>
              <p className="mt-3 leading-relaxed">
                We may update this Privacy Policy from time to time. We will post the revised
                policy on this page with an updated &ldquo;Last updated&rdquo; date. Material
                changes will be communicated through the website or directly to merchants where
                appropriate.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">11. Contact</h2>
              <p className="mt-3 leading-relaxed">
                Questions about this Privacy Policy or requests concerning your personal data can
                be directed to our team through the contact form on this website.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: build succeeds; `/privacy` appears as a route in the build output.

---

### Task 21: AML Policy page + wire footer legal links

**Files:**
- Create: `app/aml/page.tsx`
- Modify: `components/footer.tsx`

**Interfaces:**
- Consumes: `Navbar` from `@/components/navbar`, `Footer` from `@/components/footer` (in the new page); modifies `Footer`'s own nav markup.
- Produces: the `/aml` route; updates `Footer`'s Terms/Privacy links to point at Task 19/20's real routes instead of `#`, and adds an AML Policy link pointing at this task's own route.

- [ ] **Step 1: Write the AML Policy page**

```tsx
// app/aml/page.tsx
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "AML Policy",
  description:
    "HQclouds' approach to anti-money laundering compliance, customer due diligence, and transaction monitoring.",
};

export default function AmlPage() {
  return (
    <>
      <Navbar />
      <main className="bg-cream pb-24 pt-32">
        <article className="mx-auto max-w-3xl px-4">
          <p className="text-sm font-medium text-accent">Legal</p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-black sm:text-5xl">
            AML Policy
          </h1>
          <p className="mt-4 text-sm text-black/50">Last updated: August 31, 2026</p>

          <div className="mt-12 space-y-10 text-black/80">
            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                1. Our Commitment
              </h2>
              <p className="mt-3 leading-relaxed">
                HQclouds is committed to preventing the use of our platform for money laundering,
                terrorist financing, or other financial crime. This Anti-Money Laundering (AML)
                Policy outlines the principles and controls we apply to our merchants and
                transactions.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                2. Regulatory Framework
              </h2>
              <p className="mt-3 leading-relaxed">
                Our AML program is designed to align with internationally recognized standards for
                combating money laundering and the financing of terrorism, and is adapted to the
                specific regulatory requirements applicable in each jurisdiction in which we
                operate.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                3. Customer Due Diligence (CDD) and KYC
              </h2>
              <p className="mt-3 leading-relaxed">
                Before onboarding, merchants undergo identity verification and Know Your Customer
                (KYC) checks, including confirmation of business registration, beneficial
                ownership, and the nature of the business. Enhanced due diligence is applied to
                merchants or transactions presenting a higher risk profile.
              </p>
              <p className="mt-3 leading-relaxed">
                Where a transaction or pattern of transactions warrants it, we may request
                supporting evidence of the source of funds or source of wealth behind incoming
                crypto deposits — for example, information tracing a deposit back to a known
                exchange withdrawal, mining or staking reward, or other legitimate origin — before
                releasing settlement.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                4. Risk-Based Approach
              </h2>
              <p className="mt-3 leading-relaxed">
                We apply a risk-based approach to AML compliance, calibrating the level of due
                diligence and ongoing monitoring to factors such as merchant industry,
                transaction volume, geography, and payment network used. Merchants operating in,
                or receiving a material share of transactions from, jurisdictions identified as
                high-risk by international standard-setting bodies are subject to enhanced due
                diligence, which may include more frequent reviews, lower transaction thresholds
                for manual approval, and additional source-of-funds evidence.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                5. Transaction Monitoring
              </h2>
              <p className="mt-3 leading-relaxed">
                Transactions processed through HQclouds are subject to ongoing automated and
                manual monitoring designed to detect patterns consistent with money laundering,
                fraud, or other illicit activity, including unusually large, rapid, or structured
                transactions. This includes blockchain transaction monitoring and on-chain
                analytics: incoming deposits are screened at the wallet-address level for exposure
                to illicit sources such as sanctioned addresses, darknet markets, ransomware,
                mixers and tumblers, and other high-risk services, and each transaction receives a
                risk score based on transaction pattern and counterparty wallet risk before funds
                are released.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                6. Reporting Suspicious Activity
              </h2>
              <p className="mt-3 leading-relaxed">
                Where we identify activity that reasonably appears suspicious, we investigate and,
                where required by applicable law, report it to the relevant financial intelligence
                unit or competent authority. We may also suspend or restrict an account, decline to
                release settlement, or flag the associated wallet address pending investigation. We
                cooperate with law enforcement and regulators investigating suspicious blockchain
                activity, including by providing transaction and wallet-screening records available
                to us upon lawful request.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                7. Sanctions and Watchlist Screening
              </h2>
              <p className="mt-3 leading-relaxed">
                Merchants and, where applicable, their beneficial owners and controlling parties
                are screened against relevant sanctions lists, watchlists, and lists of politically
                exposed persons (PEPs) prior to onboarding and on an ongoing basis. Incoming and
                outgoing wallet addresses are likewise screened against known sanctioned-address
                lists using blockchain analytics tooling. We do not knowingly provide services to
                individuals or entities subject to applicable sanctions, and additional scrutiny is
                applied to PEPs and their close associates.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                8. Record Keeping
              </h2>
              <p className="mt-3 leading-relaxed">
                We retain records related to customer due diligence, transaction monitoring, and
                any related investigations for the period required by applicable law, to support
                regulatory examinations and law enforcement requests.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                9. Employee Training
              </h2>
              <p className="mt-3 leading-relaxed">
                Employees involved in onboarding, compliance, and transaction operations receive
                periodic training on AML obligations, red flags for suspicious activity, and
                internal escalation procedures.
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-semibold text-black">
                10. Compliance Contact
              </h2>
              <p className="mt-3 leading-relaxed">
                Questions about this AML Policy, or reports of suspected misuse of the Service,
                can be directed to our compliance team through the contact form on this website.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Wire the footer's legal links to the new routes**

In `components/footer.tsx`, replace the two placeholder links and add a third:

```tsx
<a href="/terms">Terms of Use</a>
<a href="/privacy">Privacy Policy</a>
<a href="/aml">AML Policy</a>
```

replacing the existing:

```tsx
<a href="#">Terms</a>
<a href="#">Privacy</a>
```

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: build succeeds; `/aml` appears as a route in the build output; `components/footer.tsx`'s nav now links to `/terms`, `/privacy`, and `/aml` instead of `#`.
