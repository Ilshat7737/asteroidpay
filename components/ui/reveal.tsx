"use client";

// Adapted from 21st.dev's "Reveal" component (asanshay/reveal,
// https://21st.dev/@asanshay/components/reveal): a wrapper that fades its
// children into view on scroll (replaying on every entry, not just the
// first), with an index-based stagger delay. Used by fees.tsx, trust-bar.tsx,
// and testimonials.tsx.
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
// Not framer-motion's own `useReducedMotion` — see lib/use-reduced-motion.ts
// for why (it reads matchMedia synchronously on the client's first render,
// which mismatches the server render and throws a hydration error when the
// device actually prefers reduced motion). Same fix already applied in
// hero-globe.tsx.
import { useReducedMotion } from "@/lib/use-reduced-motion";

// Token table §5 (Motion vocabulary): 350ms, ease [0.25, 0.46, 0.45, 0.94],
// y: 12px -> 0 ("keep y at 8-16px so it reads as a fade, not a slide").
// Animate opacity + transform only — no filter.
const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

// prefers-reduced-motion: a 12px opacity fade is a small enough motion delta
// (per the token table's own framing) to keep even under reduced motion, so
// only the y-offset is dropped — the fade itself still plays.
// `y: 0` is explicit (not omitted) in both states: the SSR render always
// starts from `reducedMotion === false` (see lib/use-reduced-motion.ts), so
// `initial="hidden"` first applies VARIANTS.hidden (y: 12) before hydration
// can flip these variants in — an omitted `y` here would leave that 12px
// offset stuck forever, since framer-motion never animates a key the target
// variant doesn't mention.
const REDUCED_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function Reveal({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      variants={reducedMotion ? REDUCED_VARIANTS : VARIANTS}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
      custom={index}
      className={className}
    >
      {children}
    </motion.div>
  );
}
