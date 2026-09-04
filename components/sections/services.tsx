"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";
import { networks } from "@/lib/data/networks";
import invoiceImage from "@/components/images/icons/invoice.png";

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="4" y="5" width="16" height="15" rx="2.5" />
      <line x1="4" y1="10" x2="20" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </svg>
  );
}

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 3 5 6v5c0 5 3 8.5 7 10 4-1.5 7-5 7-10V6l-7-3Z" />
      <path d="M9 12.5 11 14.5 15 10" />
    </svg>
  );
}

function ChartUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <rect x="4" y="14" width="3.2" height="6" rx="1" />
      <rect x="10.4" y="9" width="3.2" height="11" rx="1" />
      <rect x="16.8" y="4" width="3.2" height="16" rx="1" />
    </svg>
  );
}

function PercentIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

const FEE_POINTS = [
  {
    Icon: BoltIcon,
    title: "No setup fee",
    description: "Start accepting payments the same day you sign up — nothing to configure or pay upfront.",
  },
  {
    Icon: CalendarIcon,
    title: "No monthly fee",
    description: "Pay only when you get paid. There's no recurring charge sitting on your books.",
  },
  {
    Icon: ShieldCheckIcon,
    title: "No hidden costs",
    description: "The rate you see is the rate you pay — no surprise deductions at settlement.",
  },
  {
    Icon: ChartUpIcon,
    title: "Volume-based discounts",
    description: "Your rate drops automatically as monthly volume grows — built for high-volume and enterprise merchants.",
  },
  {
    Icon: PercentIcon,
    title: "Transparent pricing",
    description: "Every transaction shows its fee up front, itemized on every statement.",
  },
];

// Token table §5: 350ms, ease [0.25, 0.46, 0.45, 0.94], y: 12px -> 0 — same
// spec already used by auto-convert.tsx and final-cta.tsx.
const introVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] } },
};

// Simplified line-art glyphs matching the approved Services artboard's
// network cards — deliberately full lime (var(--color-accent)) on a
// bg-muted disc, unlike TrustBar's monochrome coin marquee (a different,
// disjoint component/treatment; see trust-bar.tsx). Drawn inline rather
// than as next/image-based brand SVGs, which can't be recolored with
// currentColor and don't match the artboard's simplified geometry.
const NETWORK_GLYPHS: Record<string, ReactNode> = {
  bitcoin: (
    <path
      d="M9.4 6.6v10.8M11.6 5.4v1.4M11.6 17.4v1.4M14 5.4v1.4M14 17.4v1.4M9.4 12h4.3a2.7 2.7 0 1 0 0-5.4H7.6M9.4 12h4.7a2.7 2.7 0 1 1 0 5.4H7.6"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  ),
  ethereum: (
    <>
      <path
        d="M12 4.2 6.6 12.4 12 15.6l5.4-3.2L12 4.2Z"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M6.6 13.7 12 19.8l5.4-6.1L12 16.9 6.6 13.7Z"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </>
  ),
  tron: (
    <path
      d="M5.8 6.9 18 8.6l-5.3 9.5L5.8 6.9Zm0 0 6.9 5.1 5.3-3.4M12.7 12v6.1"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  ),
  "bnb-smart-chain": (
    <path
      d="M12 5.6 8.4 9.2 12 12.8l3.6-3.6L12 5.6Zm0 5.6L8.4 14.8 12 18.4l3.6-3.6L12 11.2ZM6.6 9.2 4.9 10.9l1.7 1.7 1.7-1.7-1.7-1.7Zm10.8 0-1.7 1.7 1.7 1.7 1.7-1.7-1.7-1.7Z"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  ),
  polygon: (
    <path
      d="M9.6 7.6 12.9 5.7l3.3 1.9v3.8l-3.3 1.9-3.3-1.9M7.8 10.7 4.5 12.6v3.8l3.3 1.9 3.3-1.9v-3.8"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.3"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
  solana: (
    <path
      d="M7.2 8.4h9l-2 2h-9l2-2Zm0 3.6h9l-2 2h-9l2-2Zm0 3.6h9l-2 2h-9l2-2Z"
      fill="var(--color-accent)"
      fillOpacity="0.9"
    />
  ),
};

function NetworkGlyph({ networkId, className }: { networkId: string; className?: string }) {
  const glyph = NETWORK_GLYPHS[networkId];
  if (!glyph) return null;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="11" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="1" />
      {glyph}
    </svg>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-background py-32">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={introVariants}
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div>
            <h2 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Accept crypto payments across the networks your customers already use.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              One integration routes every payment to the right network and back to you — no
              juggling separate wallets, dashboards, or providers.
            </p>
          </div>
          <div className="mx-auto flex w-full max-w-sm items-center justify-center lg:max-w-none">
            <Image
              src={invoiceImage}
              alt="An AsteroidPay invoice, confirmed and ready to settle"
              className="h-auto w-full max-w-[320px]"
              priority={false}
            />
          </div>
        </motion.div>
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
        <motion.div
          id="networks"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
          variants={gridVariants}
          className="mt-16 flex snap-x snap-mandatory gap-7 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
        >
          {networks.map((network) => (
            <motion.div
              key={network.id}
              variants={cardVariants}
              className="min-w-[80%] shrink-0 snap-start rounded-2xl border border-border bg-card p-7 transition-[translate,scale,border-color,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-accent hover:shadow-[0_0_48px_rgba(205,232,51,0.28)] sm:min-w-0 sm:shrink"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <NetworkGlyph networkId={network.id} className="h-9 w-9" />
                  <h3 className="font-heading text-xl font-semibold text-foreground">{network.name}</h3>
                </div>
                <span className="font-mono text-sm font-medium text-muted-foreground">{network.ticker}</span>
              </div>
              <p className="mt-1 font-mono text-xs tracking-wide text-border-strong uppercase">{network.standard}</p>
              <p className="mt-4 text-sm text-muted-foreground">{network.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
