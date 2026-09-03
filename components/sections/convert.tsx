// components/sections/convert.tsx
"use client";

import { motion } from "framer-motion";

function ConvertIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 8h13M13 4l4 4-4 4" />
      <path d="M20 16H7M11 12l-4 4 4 4" />
    </svg>
  );
}

const BULLETS = [
  "Convert between any two supported coins",
  "Network of origin doesn't matter — everything converts from one balance",
  "Live market rates, no external exchange needed",
];

export function Convert() {
  return (
    <section id="convert" className="border-y border-border bg-card py-24 text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mx-auto max-w-2xl px-4 text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted">
          <ConvertIcon className="h-7 w-7" />
        </div>
        <p className="mt-6 font-mono text-xs font-medium tracking-[0.12em] text-accent uppercase">Convert</p>
        <h2 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
          Convert your funds, no matter which network they came in on.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Received a coin on a network you don&apos;t need? Convert it inside your wallet at a
          live market rate — the network the original coin arrived on doesn&apos;t matter, only
          the balance does.
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
