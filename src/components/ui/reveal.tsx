"use client";

import { motion, type Variants } from "motion/react";
import { Children, cloneElement, isValidElement, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

// Reduced motion is handled once, by the MotionConfig in MotionProvider.
// Branching on it here would change the markup between the exported HTML and
// the client, which React cannot reconcile.

/**
 * Entrance reveal. Used to give sections a reading order on arrival rather
 * than dropping the whole block in at once.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "p" | "span";
}) {
  const Tag = motion[as];

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay: Math.min(i, 4) * 0.075 },
  }),
};

/**
 * Groups `RevealItem` children so a row resolves in reading order.
 *
 * The stagger is a delay per item, not a parent timeline. A parent timeline
 * measures the whole group, and every one of these groups is a grid that
 * stacks into a single tall column on a phone: the group crosses its trigger
 * while the reader is still on the first card, so cards two and three play out
 * hundreds of pixels below the fold and are already sitting there, finished,
 * by the time the reader reaches them. Each item watches for itself instead,
 * which is identical on a wide screen (the row arrives together, so the delays
 * still read as a stagger) and correct on a narrow one.
 */
export function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  let i = 0;
  return (
    <div className={className}>
      {Children.map(children, (child) =>
        isValidElement<{ index?: number }>(child) && child.type === RevealItem
          ? cloneElement(child, { index: i++ })
          : child,
      )}
    </div>
  );
}

export function RevealItem({
  children,
  className = "",
  style,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Set by `RevealGroup`. Position in the group, which becomes its delay. */
  index?: number;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={itemVariants}
      custom={index}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
