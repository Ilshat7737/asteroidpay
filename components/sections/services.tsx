"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { networks } from "@/lib/data/networks";

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

// Simplified line-art glyphs matching the approved Services artboard's
// network cards — deliberately full lime (var(--color-accent)) on a
// bg-muted disc, unlike TrustBar's monochrome coin marquee (a different,
// disjoint component/treatment; see trust-bar.tsx). Drawn inline rather
// than routed through network-icon.tsx's next/image-based brand SVGs,
// which can't be recolored with currentColor and don't match the
// artboard's simplified geometry.
const NETWORK_GLYPHS: Record<string, ReactNode> = {
  bitcoin: (
    <path
      d="M9.4 6.6v10.8M11.6 5.4v1.4M11.6 17.4v1.4M14 5.4v1.4M14 17.4v1.4M9.4 12h4.3a2.7 2.7 0 1 0 0-5.4H7.6M9.4 12h4.7a2.7 2.7 0 1 1 0 5.4H7.6"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  ),
  ethereum: (
    <>
      <path
        d="M12 4.2 6.6 12.4 12 15.6l5.4-3.2L12 4.2Z"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M6.6 13.7 12 19.8l5.4-6.1L12 16.9 6.6 13.7Z"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </>
  ),
  tron: (
    <path
      d="M5.8 6.9 18 8.6l-5.3 9.5L5.8 6.9Zm0 0 6.9 5.1 5.3-3.4M12.7 12v6.1"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  ),
  "bnb-smart-chain": (
    <path
      d="M12 5.6 8.4 9.2 12 12.8l3.6-3.6L12 5.6Zm0 5.6L8.4 14.8 12 18.4l3.6-3.6L12 11.2ZM6.6 9.2 4.9 10.9l1.7 1.7 1.7-1.7-1.7-1.7Zm10.8 0-1.7 1.7 1.7 1.7 1.7-1.7-1.7-1.7Z"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
  ),
  polygon: (
    <path
      d="M9.6 7.6 12.9 5.7l3.3 1.9v3.8l-3.3 1.9-3.3-1.9M7.8 10.7 4.5 12.6v3.8l3.3 1.9 3.3-1.9v-3.8"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.3"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
  solana: (
    <path
      d="M7.2 8.4h9l-2 2h-9l2-2Zm0 3.6h9l-2 2h-9l2-2Zm0 3.6h9l-2 2h-9l2-2Z"
      fill="var(--color-accent)"
      fillOpacity="0.9"
    />
  ),
};

function NetworkGlyph({ networkId, className }: { networkId: string; className?: string }) {
  const glyph = NETWORK_GLYPHS[networkId];
  if (!glyph) return null;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="11" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="1" />
      {glyph}
    </svg>
  );
}

// Inline SVG extracted from the approved Services artboard, replacing the
// old servicesIllustration PNG (a saturated pink isometric phone with no
// relation to routing/networks/settlement). This one depicts the actual
// mechanism: four inbound network cubes converge on a gateway slab, one
// outbound arrow settles back to "YOU" — inherits the token palette
// exactly and shares the hero globe's isometric-cube vocabulary.
function ServicesIllustration({ className }: { className?: string }) {
  return (
    <svg width="460" height="320" viewBox="0 0 460 320" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="svcbloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
        <g id="svccube">
          <polygon
            points="0,-13 13,-6.5 0,0 -13,-6.5"
            fill="var(--color-accent)"
            fillOpacity="0.22"
            stroke="var(--color-accent)"
            strokeOpacity="0.7"
            strokeWidth="1"
          />
          <polygon
            points="-13,-6.5 0,0 0,13 -13,6.5"
            fill="var(--color-accent)"
            fillOpacity="0.10"
            stroke="var(--color-accent)"
            strokeOpacity="0.7"
            strokeWidth="1"
          />
          <polygon
            points="13,-6.5 0,0 0,13 13,6.5"
            fill="var(--color-accent)"
            fillOpacity="0.045"
            stroke="var(--color-accent)"
            strokeOpacity="0.7"
            strokeWidth="1"
          />
        </g>
      </defs>

      <ellipse cx="230" cy="168" rx="180" ry="120" fill="url(#svcbloom)" />

      {/* iso ground plates */}
      <polygon
        points="230,95 420,190 230,285 40,190"
        fill="none"
        stroke="var(--color-accent)"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
      <polygon
        points="230,125 360,190 230,255 100,190"
        fill="none"
        stroke="var(--color-accent)"
        strokeOpacity="0.10"
        strokeWidth="1"
      />

      {/* inbound paths */}
      <path d="M96 84 L186 137" stroke="var(--color-accent)" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 4" />
      <path d="M168 54 L216 122" stroke="var(--color-accent)" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 4" />
      <path d="M264 60 L252 122" stroke="var(--color-accent)" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 4" />
      <path d="M348 92 L282 138" stroke="var(--color-accent)" strokeOpacity="0.28" strokeWidth="1" strokeDasharray="3 4" />

      {/* the gateway slab */}
      <polygon
        points="144,150 230,193 230,219 144,176"
        fill="var(--color-accent)"
        fillOpacity="0.05"
        stroke="var(--color-accent)"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <polygon
        points="316,150 230,193 230,219 316,176"
        fill="var(--color-accent)"
        fillOpacity="0.03"
        stroke="var(--color-accent)"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      <polygon
        points="230,107 316,150 230,193 144,150"
        fill="var(--color-accent)"
        fillOpacity="0.10"
        stroke="var(--color-accent)"
        strokeOpacity="0.6"
        strokeWidth="1"
      />
      <ellipse cx="230" cy="150" rx="48" ry="24" fill="none" stroke="var(--color-accent)" strokeOpacity="0.55" strokeWidth="1" />
      <ellipse cx="230" cy="150" rx="26" ry="13" fill="none" stroke="var(--color-accent)" strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="230" cy="150" r="3" fill="var(--color-accent)" />

      {/* inbound network cubes */}
      <g transform="translate(96,84)">
        <use href="#svccube" />
      </g>
      <g transform="translate(168,54)">
        <use href="#svccube" />
      </g>
      <g transform="translate(264,60)">
        <use href="#svccube" />
      </g>
      <g transform="translate(348,92)">
        <use href="#svccube" />
      </g>

      {/* outbound: settlement back to the merchant */}
      <path d="M300 205 L364 240" stroke="var(--color-accent)" strokeOpacity="0.55" strokeWidth="1.3" />
      <path
        d="M356 231 L366 241 L353 245"
        fill="none"
        stroke="var(--color-accent)"
        strokeOpacity="0.55"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="372" y="228" width="58" height="26" rx="9" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="1" />
      <text
        x="401"
        y="245"
        textAnchor="middle"
        fill="var(--color-accent)"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="10"
        letterSpacing="0.06em"
      >
        YOU
      </text>
    </svg>
  );
}

export function Services() {
  return (
    <section id="services" className="bg-background py-32">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={introVariants}
          className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
        >
          <div>
            <h2 className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
              Accept crypto payments across the networks your customers already use.
            </h2>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
              One integration routes every payment to the right network and back to you — no
              juggling separate wallets, dashboards, or providers.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm rounded-3xl border border-border bg-card p-6 lg:max-w-none">
            <ServicesIllustration className="h-auto w-full" />
          </div>
        </motion.div>
        <motion.div
          id="networks"
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.15 }}
          variants={gridVariants}
          className="mt-16 flex snap-x snap-mandatory gap-7 overflow-x-auto pb-4 sm:grid sm:snap-none sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
        >
          {networks.map((network) => (
            <motion.div
              key={network.id}
              variants={cardVariants}
              className="min-w-[80%] shrink-0 snap-start rounded-2xl border border-border bg-card p-7 transition-[transform,border-color,box-shadow] duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:border-accent hover:shadow-[0_0_48px_rgba(205,232,51,0.28)] sm:min-w-0 sm:shrink"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <NetworkGlyph networkId={network.id} className="h-9 w-9" />
                  <h3 className="font-heading text-xl font-semibold text-foreground">{network.name}</h3>
                </div>
                <span className="font-mono text-sm font-medium text-muted-foreground">{network.ticker}</span>
              </div>
              <p className="mt-1 font-mono text-xs tracking-wide text-border-strong uppercase">{network.standard}</p>
              <p className="mt-4 text-sm text-muted-foreground">{network.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
