// components/sections/auto-convert.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import autoconvertImage from "@/components/images/icons/autoconvert.png";

const BULLETS = [
  "Converted at the market rate the instant funds are received",
  "Settle in USDT or USDC — your choice",
  "No manual swaps, no exposure to price swings",
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

export function AutoConvert() {
  return (
    <section className="overflow-hidden border-y border-border bg-card py-24 text-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-heading text-4xl font-bold sm:text-5xl">
            Every payment lands the way you want it.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            The moment a payment arrives, AsteroidPay converts it automatically into a stablecoin like
            USDT or USDC — or straight to fiat — at the live market rate. You never hold volatile
            crypto you didn&apos;t choose to hold.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-foreground">
            {BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <ArrowIcon />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto w-full max-w-lg md:max-w-none"
        >
          <Image
            src={autoconvertImage}
            alt="Bitcoin, Ethereum, Solana, and XRP flowing into AsteroidPay and settling as USDT or USDC"
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
