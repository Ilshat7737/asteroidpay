// components/sections/wallet.tsx
"use client";

import { motion } from "framer-motion";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";

const BULLETS = [
  "Always online — no hardware, no unlocking devices, ready instantly",
  "One centralized balance, regardless of which network funds arrived on",
  "Built for everyday use, not long-term cold storage",
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0"
    >
      <path d="M4 12h15M13.5 6.5 20 12l-6.5 5.5" />
    </svg>
  );
}

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

export function Wallet() {
  const { openRegister } = useModal();

  return (
    <section id="wallet" className="border-t border-border bg-background py-24 text-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-heading text-4xl font-bold sm:text-5xl">
            One wallet. Always on. Always ready.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Asteroid Pay Wallet is a hot wallet — always online, always accessible, built to hold
            your funds centrally in one safe place until you&apos;re ready to use them. No cold
            storage, no seed phrases to guard, no hardware to plug in. Top up in any coin, on any
            network, and it&apos;s ready to spend, send, or convert the moment it lands.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-foreground">
            {BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <ArrowIcon />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Button size="lg" className="mt-10 h-12 rounded-full px-8" onClick={openRegister}>
            Get the wallet
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto w-full max-w-lg md:max-w-none"
        >
          <WalletCardMockup className="h-auto w-full" />
        </motion.div>
      </div>
    </section>
  );
}
