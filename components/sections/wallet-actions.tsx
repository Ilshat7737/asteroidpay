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

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";
import convertImage from "@/components/images/icons/convert.png";

// Receive/Send have no final art yet (the user's own asset is pending) —
// this placeholder is built directly off the reference coin (the actual
// Bitcoin coin cropped from wallet.png): dark disc face, a thick lime
// edge ring with a subtle directional sheen (not a dramatic gradient —
// the reference reads as mostly-solid lime with just a touch of shine,
// not a rainbow sweep), and an embossed chrome glyph with a drop shadow
// standing in for the coin's raised "B". Same coin for both actions —
// Send is the base build with a withdrawal-arrow glyph; Receive reuses
// it mirrored (scaleX(-1)) plus its own distinct rotation, rather than a
// second icon designed from scratch, per the reference's own request.
// Swap this for <Image> once real art exists.
function GlossyGlyph({
  path,
  rotate = 0,
  flip = false,
}: {
  path: string;
  rotate?: number;
  flip?: boolean;
}) {
  // Every instance needs its own unique def IDs — this renders more than
  // once at a time (once inline per mobile row, once in the desktop swap
  // panel), and duplicate SVG element IDs on the same page make
  // `url(#id)` paint-server/filter references resolve unpredictably
  // (often to nothing), which silently drops the fill/filter entirely —
  // the sphere and glyph both rendered blank, leaving only the plain rim
  // stroke visible.
  const uid = useId();
  const faceId = `${uid}-face`;
  const edgeId = `${uid}-edge`;
  const iconId = `${uid}-icon`;
  const liftId = `${uid}-lift`;
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 240 240"
      aria-hidden="true"
      style={{ transform: `${flip ? "scaleX(-1) " : ""}rotate(${rotate}deg)` }}
    >
      <defs>
        <radialGradient id={faceId} cx="40%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#2c2f26" />
          <stop offset="55%" stopColor="#17190f" />
          <stop offset="100%" stopColor="#0a0b06" />
        </radialGradient>
        {/* Straight-line gradient laid across the ring's bounding box (not
            a true conic gradient — SVG has none) — kept close to solid
            lime with only a gentle sheen toward the upper-left, matching
            the reference's mostly-flat-color edge rather than a strong
            light-to-dark sweep. */}
        <linearGradient id={edgeId} x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#e4ee8a" />
          <stop offset="35%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-accent)" />
        </linearGradient>
        <linearGradient id={iconId} x1="20%" y1="8%" x2="80%" y2="96%">
          <stop offset="0%" stopColor="#f6f7f3" />
          <stop offset="45%" stopColor="#c7cbc1" />
          <stop offset="100%" stopColor="#666b62" />
        </linearGradient>
        <filter id={liftId} x="-60%" y="-60%" width="220%" height="220%">
          <feDropShadow dx="1.5" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.6" />
        </filter>
      </defs>
      {/* Coin edge: thin dark outer line, thick lime bezel, thin dark
          inner shade — reads as a raised metal rim. */}
      <circle cx="120" cy="120" r="94" fill="none" stroke="#050604" strokeOpacity="0.7" strokeWidth="2" />
      <circle cx="120" cy="120" r="86" fill="none" stroke={`url(#${edgeId})`} strokeWidth="16" />
      <circle cx="120" cy="120" r="77" fill="none" stroke="#050604" strokeOpacity="0.5" strokeWidth="2" />
      <circle cx="120" cy="120" r="75" fill={`url(#${faceId})`} />
      <g filter={`url(#${liftId})`}>
        <path
          d={path}
          fill="none"
          stroke={`url(#${iconId})`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

// The one glyph both coins share: a withdrawal arrow (funds exiting,
// up and out) — Receive is this same coin mirrored, not a second design.
const WITHDRAWAL_ARROW = "M88 152 152 88M152 88 124 94M152 88 146 116";

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
    visual: <GlossyGlyph path={WITHDRAWAL_ARROW} flip rotate={16} />,
  },
  {
    id: "send",
    title: "Send",
    subtitle: "Send and spend, across any network.",
    description:
      "Send funds across networks, pay for goods and services, or transfer to anyone — without worrying about which network they need.",
    visual: <GlossyGlyph path={WITHDRAWAL_ARROW} rotate={8} />,
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
