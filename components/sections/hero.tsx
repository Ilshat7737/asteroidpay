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
            className="h-11 rounded-full bg-accent px-8 text-black hover:bg-accent/90"
            onClick={openContact}
          >
            Contact us
          </Button>
          <a
            href="#fees"
            className="inline-flex h-11 items-center justify-center rounded-full border border-black/15 px-8 text-sm font-medium text-black hover:bg-black/5"
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
