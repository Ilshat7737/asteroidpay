// components/sections/auto-convert.tsx
"use client";

import { motion } from "framer-motion";

export function AutoConvert() {
  return (
    <section className="overflow-hidden bg-black py-24 text-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-4xl font-bold sm:text-5xl">
            Every payment lands the way you want it.
          </h2>
          <p className="mt-6 text-lg text-white/70">
            The moment a payment arrives, HQclouds converts it automatically into a stablecoin like
            USDT or USDC — or straight to fiat — at the live market rate. You never hold volatile
            crypto you didn&apos;t choose to hold.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-white/80">
            <li>→ Converted at the market rate the instant funds are received</li>
            <li>→ Settle in USDT, USDC, or fiat — your choice</li>
            <li>→ No manual swaps, no exposure to price swings</li>
          </ul>
        </motion.div>
        <motion.img
          src="/auto-convert-illustration.png"
          alt="Bitcoin, Ethereum, Solana, and other crypto flowing into a device and converting to USDT, USDC, and fiat"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-lg md:max-w-none"
        />
      </div>
    </section>
  );
}
