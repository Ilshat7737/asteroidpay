"use client";

import { motion } from "framer-motion";
import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  const { openContact } = useModal();

  return (
    <section className="bg-accent py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mx-auto max-w-2xl px-4"
      >
        <h2 className="font-heading text-4xl font-bold text-accent-foreground sm:text-5xl">
          Fast payments. Low fees. Reliable, every time.
        </h2>
        {/* Inverted primary button (lime label on near-black) rather than the
            standard lime pill — a lime button on this lime band would vanish.
            Focus ring inverts too, per the approved FinalCta artboard: the
            usual lime ring is invisible here, so this instance overrides to a
            dark ring with a lime offset. */}
        <Button
          size="lg"
          className="mt-8 rounded-full bg-background px-8 text-accent hover:bg-card focus-visible:border-background focus-visible:ring-background/50 focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
          onClick={openContact}
        >
          Contact us
        </Button>
      </motion.div>
    </section>
  );
}
