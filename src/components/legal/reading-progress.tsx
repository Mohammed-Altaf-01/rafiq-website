"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * These are long documents. The bar answers "how much of this is left", which
 * is the one question a reader of a privacy policy actually has.
 */
export function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-primary"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
