"use client";

// Adapted from 21st.dev's "Reveal" component (asanshay/reveal,
// https://21st.dev/@asanshay/components/reveal): a wrapper that fades and
// un-blurs its children into view on scroll, with an index-based stagger
// delay. Used only in components/sections/fees.tsx — kept local rather than
// reused across sections so each section's scroll effect stays distinct.
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
const REDUCED_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
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
