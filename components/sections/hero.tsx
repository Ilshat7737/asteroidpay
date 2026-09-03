// components/sections/hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";
import { HeroGlobe, HERO_GLOBE_CENTER } from "@/components/hero-globe";

export function Hero() {
  const { openContact } = useModal();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-background pt-24 pb-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
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

        {/* Right column: hero globe (Task 6), replacing the retired hero-illustration.png
            per the approved canvas ("Illustration decision" note) — the globe is the
            hero's visual now.

            HeroGlobe's own internal stage box (760x940) is much taller than its
            actual visual footprint (it pads for the ambient bloom/cube spawn band),
            so mounting it in normal grid flow makes that oversized box drive the
            grid row's height, inflating the whole section past min-h-screen. This
            wrapper has no intrinsic height (only an absolutely-positioned child), so
            it collapses to 0 height and the row height is driven by the text column
            instead — the section goes back to being exactly min-h-screen tall.

            The inner div is positioned so HERO_GLOBE_CENTER (the sphere's real
            visual center in the stage box's own coordinates) lands at this wrapper's
            origin, which — thanks to 0 height + the grid's items-center — is exactly
            the vertical center of the (taller) text column. `+56px` biases the
            sphere right of the column's horizontal center so it bleeds past the
            column's right edge (clipped by the section's own overflow-hidden)
            rather than crowding the text column on the left.

            Hidden below `lg` since hero-globe.tsx's geometry is fixed-pixel and not
            responsive — no sensible smaller rendering to fall back to. */}
        <div className="relative hidden lg:block">
          <div
            className="absolute left-1/2 top-0"
            style={{ transform: `translate(calc(-50% + 56px), -${HERO_GLOBE_CENTER.y}px)` }}
          >
            <HeroGlobe />
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/2 h-64 w-[140%] -translate-x-1/2 rounded-[50%] bg-accent/[0.14] blur-3xl"
      />
    </section>
  );
}
