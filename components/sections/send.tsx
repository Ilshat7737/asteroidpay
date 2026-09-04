// components/sections/send.tsx
"use client";

import { motion } from "framer-motion";

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 20 20 4M20 4l-6 1M20 4l1 6" />
    </svg>
  );
}

const BULLETS = [
  "Send across any supported network from one balance",
  "Pay for goods and services directly from your wallet",
  "No need to match networks — AsteroidPay handles the routing",
];

export function Send() {
  return (
    <section id="send" className="border-y border-border bg-background py-24 text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mx-auto max-w-2xl px-4 text-center"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-muted">
          <SendIcon className="h-7 w-7" />
        </div>
        <h2 className="mt-6 font-heading text-4xl font-bold sm:text-5xl">
          Send and spend, across any network.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Use your balance to send funds across networks, pay for goods and services, or transfer
          to anyone else — without worrying about which network the recipient needs.
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
