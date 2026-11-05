"use client";

import { motion, useInView, type Variants } from "motion/react";
import {
  Children,
  cloneElement,
  isValidElement,
  useRef,
  type ReactNode,
} from "react";

import { useMounted } from "@/lib/use-mounted";

const EASE = [0.23, 1, 0.32, 1] as const;

const revealVariants: Variants = {
  hidden: { opacity: 0, transform: "translate3d(0, 18px, 0)" },
  shown: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
  },
};

function useEnhancedInView(ref: React.RefObject<Element | null>) {
  const mounted = useMounted();
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return !mounted || inView;
}

/** Content is visible in static HTML; hydrated clients add one restrained reveal. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "p" | "span";
}) {
  const ref = useRef<Element>(null);
  const shown = useEnhancedInView(ref);
  const Tag = motion[as];

  return (
    <Tag
      ref={ref as never}
      data-spatial-motion="true"
      className={className}
      initial={false}
      animate={shown ? "shown" : "hidden"}
      variants={revealVariants}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Adds a decorative 50ms reading-order delay without delaying interaction. */
export function RevealGroup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  let index = 0;
  return (
    <div className={className}>
      {Children.map(children, (child) =>
        isValidElement<{ index?: number }>(child) && child.type === RevealItem
          ? cloneElement(child, { index: index++ })
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
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useEnhancedInView(ref);

  return (
    <motion.div
      ref={ref}
      data-spatial-motion="true"
      className={className}
      style={style}
      initial={false}
      animate={shown ? "shown" : "hidden"}
      variants={revealVariants}
      transition={{ duration: 0.55, delay: Math.min(index, 4) * 0.05, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
