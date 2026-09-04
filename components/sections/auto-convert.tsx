// components/sections/auto-convert.tsx
"use client";

import { motion } from "framer-motion";

const BULLETS = [
  "Converted at the market rate the instant funds are received",
  "Settle in USDT or USDC — your choice",
  "No manual swaps, no exposure to price swings",
];

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0"
    >
      <path d="M4 12h15M13.5 6.5 20 12l-6.5 5.5" />
    </svg>
  );
}

// Inline SVG extracted from the approved AutoConvert artboard, replacing the
// old autoConvertIllustration PNG (a saturated pink 3D render). Reproduces
// the same information architecture beat for beat — four inbound coins with
// a descending opacity ramp, one gateway carrying the AsteroidPay placeholder
// mark, three labelled settlement outputs (USDT / USDC / FIAT) — token-driven
// via var(--color-*) instead of hardcoded hex.
function AutoConvertIllustration({ className }: { className?: string }) {
  return (
    <svg width="552" height="368" viewBox="0 0 552 368" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="acbloom" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.20" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <ellipse cx="290" cy="184" rx="180" ry="150" fill="url(#acbloom)" />

      {/* inbound ribbons */}
      <path d="M62 66 C 150 78, 190 120, 236 152" fill="none" stroke="url(#ribbon)" strokeWidth="9" strokeLinecap="round" />
      <path d="M92 140 C 150 148, 190 158, 236 168" fill="none" stroke="url(#ribbon)" strokeWidth="9" strokeLinecap="round" />
      <path d="M60 212 C 140 210, 190 200, 236 186" fill="none" stroke="url(#ribbon)" strokeWidth="9" strokeLinecap="round" />
      <path d="M104 288 C 160 264, 200 226, 236 200" fill="none" stroke="url(#ribbon)" strokeWidth="9" strokeLinecap="round" />

      {/* inbound coins — descending opacity ramp so the eye reads left-to-right */}
      <g>
        <circle cx="62" cy="66" r="27" fill="var(--color-muted)" stroke="var(--color-accent)" strokeOpacity="0.55" strokeWidth="1.2" />
        <g transform="translate(62,66) scale(1.5) translate(-12,-12)">
          <path
            d="M9.4 6.6v10.8M11.6 5.4v1.4M11.6 17.4v1.4M14 5.4v1.4M14 17.4v1.4M9.4 12h4.3a2.7 2.7 0 1 0 0-5.4H7.6M9.4 12h4.7a2.7 2.7 0 1 1 0 5.4H7.6"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </g>
      </g>
      <g>
        <circle cx="92" cy="140" r="24" fill="var(--color-muted)" stroke="var(--color-accent)" strokeOpacity="0.45" strokeWidth="1.2" />
        <g transform="translate(92,140) scale(1.35) translate(-12,-12)">
          <path d="M12 4.2 6.6 12.4 12 15.6l5.4-3.2L12 4.2Z" fill="none" stroke="var(--color-accent)" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M6.6 13.7 12 19.8l5.4-6.1L12 16.9 6.6 13.7Z" fill="none" stroke="var(--color-accent)" strokeWidth="1.3" strokeLinejoin="round" />
        </g>
      </g>
      <g>
        <circle cx="60" cy="212" r="22" fill="var(--color-muted)" stroke="var(--color-accent)" strokeOpacity="0.40" strokeWidth="1.2" />
        <g transform="translate(60,212) scale(1.25) translate(-12,-12)">
          <path
            d="M7.2 8.4h9l-2 2h-9l2-2Zm0 3.6h9l-2 2h-9l2-2Zm0 3.6h9l-2 2h-9l2-2Z"
            fill="var(--color-accent)"
            fillOpacity="0.9"
          />
        </g>
      </g>
      <g>
        <circle cx="104" cy="288" r="20" fill="var(--color-muted)" stroke="var(--color-accent)" strokeOpacity="0.35" strokeWidth="1.2" />
        <g transform="translate(104,288) scale(1.15) translate(-12,-12)">
          <path
            d="M6.6 7.4 12 12.4l5.4-5M6.6 16.6 12 11.6l5.4 5"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
      <circle cx="150" cy="92" r="4" fill="var(--color-accent)" fillOpacity="0.4" />
      <circle cx="132" cy="240" r="5" fill="var(--color-accent)" fillOpacity="0.3" />
      <circle cx="176" cy="186" r="3" fill="var(--color-accent)" fillOpacity="0.5" />

      {/* the gateway, carrying the AsteroidPay placeholder mark */}
      <rect x="236" y="112" width="128" height="144" rx="30" fill="var(--color-background)" stroke="var(--color-accent)" strokeOpacity="0.55" strokeWidth="1.4" />
      <rect x="236" y="112" width="128" height="144" rx="30" fill="none" stroke="var(--color-accent)" strokeOpacity="0.14" strokeWidth="9" />
      <circle cx="300" cy="184" r="34" fill="none" stroke="var(--color-accent)" strokeOpacity="0.65" strokeWidth="1.3" />
      <circle cx="300" cy="184" r="22" fill="none" stroke="var(--color-accent)" strokeOpacity="0.30" strokeWidth="1" />
      <g transform="translate(300,184) scale(0.62) translate(-22,-22)">
        <path d="M22 12 12 33" stroke="var(--color-accent)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 12 33 33" stroke="var(--color-accent)" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.5 24.5H28.5" stroke="var(--color-accent)" strokeWidth="3.4" strokeLinecap="round" />
      </g>
      <rect x="278" y="236" width="44" height="4" rx="2" fill="var(--color-accent)" fillOpacity="0.5" />
      <text x="300" y="98" textAnchor="middle" fill="var(--color-muted-foreground)" fontFamily="'JetBrains Mono', monospace" fontSize="10" letterSpacing="0.14em">
        LIVE RATE
      </text>

      {/* outbound */}
      <path d="M366 146 L400 146" stroke="var(--color-accent)" strokeOpacity="0.6" strokeWidth="1.4" />
      <path d="M393 140 L401 146 L393 152" fill="none" stroke="var(--color-accent)" strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M366 184 L400 184" stroke="var(--color-accent)" strokeOpacity="0.6" strokeWidth="1.4" />
      <path d="M393 178 L401 184 L393 190" fill="none" stroke="var(--color-accent)" strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M366 222 L400 222" stroke="var(--color-accent)" strokeOpacity="0.6" strokeWidth="1.4" />
      <path d="M393 216 L401 222 L393 228" fill="none" stroke="var(--color-accent)" strokeOpacity="0.6" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="408" y="128" width="132" height="36" rx="12" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="1" />
      <circle cx="430" cy="146" r="9" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" />
      <path d="M425.5 142.3h9M430 142.3v8" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" />
      <text x="452" y="151" fill="var(--color-foreground)" fontFamily="'JetBrains Mono', monospace" fontSize="13" letterSpacing="0.08em">
        USDT
      </text>

      <rect x="408" y="166" width="132" height="36" rx="12" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="1" />
      <circle cx="430" cy="184" r="9" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" />
      <path
        d="M430 179v10M432.4 181a3 3 0 0 0-5 1.6c0 2.6 5 1.1 5 3.7a3 3 0 0 1-5.1 1.4"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <text x="452" y="189" fill="var(--color-foreground)" fontFamily="'JetBrains Mono', monospace" fontSize="13" letterSpacing="0.08em">
        USDC
      </text>

      <rect x="408" y="204" width="132" height="36" rx="12" fill="var(--color-muted)" stroke="var(--color-border)" strokeWidth="1" />
      <rect x="421" y="216" width="18" height="13" rx="2.5" fill="none" stroke="var(--color-accent)" strokeWidth="1.2" />
      <circle cx="430" cy="222.5" r="2.6" fill="none" stroke="var(--color-accent)" strokeWidth="1.1" />
      <text x="452" y="227" fill="var(--color-foreground)" fontFamily="'JetBrains Mono', monospace" fontSize="13" letterSpacing="0.08em">
        FIAT
      </text>
    </svg>
  );
}

export function AutoConvert() {
  return (
    <section className="overflow-hidden border-y border-border bg-card py-24 text-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-heading text-4xl font-bold sm:text-5xl">
            Every payment lands the way you want it.
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            The moment a payment arrives, AsteroidPay converts it automatically into a stablecoin like
            USDT or USDC — or straight to fiat — at the live market rate. You never hold volatile
            crypto you didn&apos;t choose to hold.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-foreground">
            {BULLETS.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3">
                <ArrowIcon />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto w-full max-w-lg md:max-w-none"
        >
          <AutoConvertIllustration className="h-auto w-full" />
        </motion.div>
      </div>
    </section>
  );
}
