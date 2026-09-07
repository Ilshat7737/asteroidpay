// components/sections/hero.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";
import { HeroGlobe } from "@/components/hero-globe";
import walletImage from "@/components/images/icons/wallet.png";

export function Hero() {
  const { openContact } = useModal();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background pt-24 pb-12">
      {/* The globe now always renders as a background wash, at every
          breakpoint — centered, dimmed, and faded out toward the edges so
          it reads as ambient texture behind the content rather than a
          distinct foreground graphic (it read better this way than the
          previous bleeds-past-the-edge foreground treatment). */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 lg:opacity-20" aria-hidden="true">
        {/* On large screens the globe goes huge and gets pushed down so only
            its upper cap (down to roughly the equator) is on screen — reads
            as "standing on a planet" rather than a small floating sphere. */}
        <div className="scale-125 lg:translate-y-[42%] lg:scale-[4]">
          <HeroGlobe />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, transparent 15%, var(--color-background) 72%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-5xl font-bold leading-[1.05] text-foreground sm:text-6xl"
          >
            Crypto payments that move at the speed of your business.
          </motion.h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground lg:mx-0">
            Accept Bitcoin, Ethereum, and stablecoins across six networks. Fees from 0.3%, automatic
            conversion, and settlement you can count on.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Button
              size="lg"
              className="h-12 rounded-full px-8"
              onClick={openContact}
            >
              Contact us
            </Button>
            <Link
              href="/#services"
              className="inline-flex h-12 items-center justify-center rounded-full border border-input px-8 text-sm font-medium text-foreground hover:bg-muted"
            >
              See pricing
            </Link>
          </div>
        </div>

        {/* Right column: with the globe now a full-bleed background wash
            (above) rather than a foreground graphic, this column carries
            its own image instead — frameless, same treatment as the
            invoice/convert art elsewhere on the page. Hidden below `lg`,
            same as the illustration it replaces was, to keep the mobile
            layout to a single centered column. */}
        <div className="hidden items-center justify-center lg:flex">
          <Image
            src={walletImage}
            alt="An AsteroidPay wallet, ready to receive, send, and convert crypto"
            className="h-auto w-full max-w-[520px]"
            priority
          />
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[140%] -translate-x-1/2 rounded-[50%] bg-accent/[0.14] blur-3xl"
      />
    </section>
  );
}
