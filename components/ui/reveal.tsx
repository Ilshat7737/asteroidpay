"use client";

// Adapted from 21st.dev's "Reveal" component (asanshay/reveal,
// https://21st.dev/@asanshay/components/reveal): a wrapper that fades and
// un-blurs its children into view on scroll, with an index-based stagger
// delay. Used only in components/sections/fees.tsx — kept local rather than
// reused across sections so each section's scroll effect stays distinct.
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
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
  return (
    <motion.div
      variants={VARIANTS}
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
