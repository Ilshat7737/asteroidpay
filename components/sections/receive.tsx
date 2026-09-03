// components/sections/receive.tsx
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
