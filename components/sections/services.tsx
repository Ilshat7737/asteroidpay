"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { networks } from "@/lib/data/networks";
import { NetworkIcon } from "@/components/network-icon";
import servicesIllustration from "@/components/images/services-illustration.png";

const introVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Services() {
  return (
    <section id="services" className="bg-cream py-32">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={introVariants}
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div>
            <h2 className="font-heading text-4xl font-bold text-black sm:text-5xl">
              Accept crypto payments across the networks your customers already use.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-black/60">
              One integration routes every payment to the right network and back to you — no
              juggling separate wallets, dashboards, or providers.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm rounded-[32px] border border-black/10 bg-white p-6 lg:max-w-none">
            <Image src={servicesIllustration} alt="" aria-hidden="true" className="h-auto w-full" />
          </div>
        </motion.div>
        <motion.div
          id="networks"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={gridVariants}
          className="mt-16 flex snap-x snap-mandatory gap-7 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
        >
          {networks.map((network) => (
            <motion.div
              key={network.id}
              variants={cardVariants}
              className="min-w-[80%] shrink-0 snap-start rounded-[28px] border border-black/10 bg-white p-7 sm:min-w-0 sm:shrink"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <NetworkIcon networkId={network.id} className="h-9 w-9" />
                  <h3 className="font-heading text-xl font-semibold text-black">{network.name}</h3>
                </div>
                <span className="text-sm font-medium text-black/50">{network.ticker}</span>
              </div>
              <p className="mt-1 text-xs uppercase tracking-wide text-black/40">{network.standard}</p>
              <p className="mt-4 text-sm text-black/70">{network.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
