"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * One place decides what reduced motion means for every Motion component on the
 * site: transforms stop moving, fades stay.
 *
 * The alternative, reading `useReducedMotion()` inside each component and
 * swapping the `initial` prop, cannot work here. The site is statically
 * exported, so that hook is always false when the HTML is written and true on a
 * client that asked for reduced motion, and React refuses to patch up the
 * resulting attribute mismatch. Deciding it at the config level keeps the
 * markup identical on both sides.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
