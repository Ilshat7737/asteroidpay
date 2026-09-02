// components/sections/hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";
import heroIllustration from "@/components/images/hero-illustration.png";

export function Hero() {
  const { openContact } = useModal();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-cream pt-24 pb-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-5xl font-bold leading-[1.05] text-black sm:text-6xl"
          >
            Crypto payments that move at the speed of your business.
          </motion.h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-black/70 lg:mx-0">
            Accept Bitcoin, Ethereum, and stablecoins across six networks. Fees from 0.3%, automatic
            conversion, and settlement you can count on.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Button
              size="lg"
              className="h-11 rounded-full bg-accent px-8 text-black hover:bg-accent/90"
              onClick={openContact}
            >
              Contact us
            </Button>
            <Link
              href="/#fees"
              className="inline-flex h-11 items-center justify-center rounded-full border border-black/15 px-8 text-sm font-medium text-black hover:bg-black/5"
            >
              See fees
            </Link>
          </div>
        </div>

        <motion.img
          src={heroIllustration.src}
          alt="A KShost wallet accepting a contactless crypto card payment, with a rising Bitcoin balance"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto w-full max-w-lg lg:max-w-none"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[140%] -translate-x-1/2 rounded-[50%] bg-accent/30 blur-3xl"
      />
    </section>
  );
}
