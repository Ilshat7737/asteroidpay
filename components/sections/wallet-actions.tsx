// components/sections/wallet-actions.tsx
//
// Merges the three previous standalone sections (Receive, Send, Convert)
// into one hover-driven accordion: a list on the left where hovering a row
// expands it, and a preview image on the right that swaps to match.
// Replaces receive.tsx, send.tsx, and convert.tsx (deleted).
//
// Fixed-height requirement: each row's expandable content sits in a
// container with an explicit pixel height that's IDENTICAL for all three
// items (h-24, toggled between 0 and 96px) rather than an "auto" height —
// since exactly one row is ever expanded at a time, the accordion's total
// height is always "3 fixed header rows + one fixed 96px panel," a
// constant regardless of which row is active. That's what keeps the
// column from resizing/jumping when the hovered row changes, per the
// explicit requirement — an "auto" height (measuring each panel's own
// content) would vary with description length and defeat this.
"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import convertImage from "@/components/images/icons/convert.png";
import receiveImage from "@/components/images/icons/receive.png";
import sendImage from "@/components/images/icons/send.png";

interface ActionItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  visual: ReactNode;
}

const ITEMS: ActionItem[] = [
  {
    id: "receive",
    title: "Receive",
    subtitle: "Top up your wallet, in any coin, on any network.",
    description:
      "Fund your wallet from any supported coin, on any network — everything consolidates into one balance, ready the moment it lands.",
    visual: (
      <Image
        src={receiveImage}
        alt="Receiving Bitcoin into an AsteroidPay wallet"
        className="h-auto w-full max-w-[336px]"
      />
    ),
  },
  {
    id: "send",
    title: "Send",
    subtitle: "Send and spend, across any network.",
    description:
      "Send funds across networks, pay for goods and services, or transfer to anyone — without worrying about which network they need.",
    visual: (
      <Image
        src={sendImage}
        alt="Sending Bitcoin from an AsteroidPay wallet"
        className="h-auto w-full max-w-[336px]"
      />
    ),
  },
  {
    id: "convert",
    title: "Convert",
    subtitle: "Convert your funds, no matter which network they came in on.",
    description:
      "Convert between assets inside your wallet at a live market rate — the network a coin arrived on doesn't matter, only the balance does.",
    visual: (
      <Image
        src={convertImage}
        alt="Converting between Bitcoin and Ethereum"
        className="h-auto w-full max-w-[336px]"
      />
    ),
  },
];

export function WalletActions() {
  const [active, setActive] = useState(0);

  return (
    <section id="wallet-actions" className="border-t border-border bg-background py-24 text-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-4xl font-bold sm:text-5xl">
            Everything you can do with your balance.
          </h2>
          <div className="mt-8 divide-y divide-border">
            {ITEMS.map((item, i) => {
              const isActive = active === i;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="py-5"
                >
                  <div className="flex cursor-default items-center justify-between">
                    <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                    {isActive ? (
                      <Minus className="h-4 w-4 shrink-0 text-accent" />
                    ) : (
                      <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={`overflow-hidden transition-[height] duration-300 ease-out ${
                      isActive ? "h-[188px] md:h-24" : "h-0"
                    }`}
                  >
                    {/* Mobile only: each row carries its own small preview
                        image right inside its own cell, instead of one
                        shared image panel far below the whole list (which
                        read as disconnected from whichever row was open). */}
                    <div className="flex items-start gap-4 pt-2">
                      <div className="h-16 w-16 shrink-0 md:hidden">{item.visual}</div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.subtitle}</p>
                        <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="hidden h-[22rem] items-center justify-center md:flex">
          <AnimatePresence mode="wait">
            <motion.div
              key={ITEMS[active].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-[336px] w-[336px]"
            >
              {ITEMS[active].visual}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
