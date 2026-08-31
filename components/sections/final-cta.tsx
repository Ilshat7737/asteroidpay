"use client";

import { useModal } from "@/components/modal-provider";
import { Button } from "@/components/ui/button";

export function FinalCta() {
  const { openContact } = useModal();

  return (
    <section className="bg-accent py-24 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="font-heading text-4xl font-bold text-black sm:text-5xl">
          Fast payments. Low fees. Reliable, every time.
        </h2>
        <Button
          size="lg"
          className="mt-8 rounded-full bg-black px-8 text-white hover:bg-black/80"
          onClick={openContact}
        >
          Contact us
        </Button>
      </div>
    </section>
  );
}
