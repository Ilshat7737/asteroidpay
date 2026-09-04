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

// Receive/Send have no final art yet (the user's own asset is pending) —
// these are a placeholder in the same chrome-badge-with-lime-glow visual
// family as the supplied PNGs (convert.png, invoice.png, wallet.png:
// glossy metallic gradient + a lime rim/glow), sized to match convert.png's
// footprint so switching tabs doesn't jump in apparent image size. Swap
// GlossyGlyph's callers below for <Image> once real art exists.
//
// Volume/depth comes from three layered tricks rather than a flat fill:
// (1) an off-center radial gradient on the sphere (light upper-left, dark
// lower-right — the standard "lit ball" shading trick), (2) a small
// elliptical specular-highlight blob for a glossy reflection, and (3) a
// real drop-shadow filter under the glyph so it visually lifts off the
// sphere's surface instead of sitting flush on it.
function GlossyGlyph({ path }: { path: string }) {
  return (
    <svg className="h-full w-full" viewBox="0 0 240 240" aria-hidden="true">
      <defs>
        <radialGradient id="sphereBody" cx="36%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="16%" stopColor="#e9ecec" />
          <stop offset="45%" stopColor="#a3adad" />
          <stop offset="78%" stopColor="#5b6363" />
          <stop offset="100%" stopColor="#262b2b" />
        </radialGradient>
        <radialGradient id="specular" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id="glyphLift" x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="2" dy="4" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>
      <circle cx="120" cy="120" r="102" fill="var(--color-accent)" opacity="0.24" filter="url(#softGlow)" />
      <circle cx="120" cy="120" r="82" fill="url(#sphereBody)" />
      <circle cx="120" cy="120" r="82" fill="none" stroke="var(--color-accent)" strokeWidth="3" strokeOpacity="0.9" />
      <ellipse cx="92" cy="82" rx="34" ry="22" fill="url(#specular)" />
      <g filter="url(#glyphLift)">
        <path d={path} fill="none" stroke="#16181a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

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
    visual: <GlossyGlyph path="M120 78v56M96 112l24 24 24-24M84 150h72" />,
  },
  {
    id: "send",
    title: "Send",
    subtitle: "Send and spend, across any network.",
    description:
      "Send funds across networks, pay for goods and services, or transfer to anyone — without worrying about which network they need.",
    visual: <GlossyGlyph path="M84 156 156 84M156 84 130 90M156 84 150 110" />,
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
