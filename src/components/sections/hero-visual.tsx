"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { Device } from "@/components/ui/device";

type DepthRange = {
  back: [string, string];
  front: [string, string];
};

// Keep the zero value in the same percentage unit as the moving keyframes so
// Motion serializes identical server and reduced-motion client styles.
const REST = "translate3d(0, 0%, 0)";
const HERO_SCROLL_RANGE: [number, number] = [0, 720];

export function heroDepthRange(reduced: boolean): DepthRange {
  if (reduced) return { back: [REST, REST], front: [REST, REST] };
  return {
    back: [REST, "translate3d(0, -9%, 0)"],
    front: [REST, "translate3d(0, -5%, 0)"],
  };
}

/** Real product screens provide the hero's proof and its only major depth moment. */
export function HeroVisual() {
  const reduced = useReducedMotion();
  const ranges = heroDepthRange(Boolean(reduced));
  const { scrollY } = useScroll();
  const backTransform = useTransform(scrollY, HERO_SCROLL_RANGE, ranges.back);
  const frontTransform = useTransform(scrollY, HERO_SCROLL_RANGE, ranges.front);

  return (
    <div
      className="relative mx-auto aspect-[7/10] w-full max-w-[430px] sm:aspect-auto sm:h-[590px] lg:h-[650px] lg:max-w-[500px]"
    >
      <motion.div
        data-spatial-motion="true"
        className="absolute top-[15%] left-[2%] w-[55%] sm:left-[1%]"
        style={{ transform: backTransform }}
      >
        <div className="-rotate-[8deg]">
          <Device
            src="/screens/block-limit.webp"
            alt="Rafiq holding a daily app limit after its chosen minutes have been used."
            eager
          />
        </div>
      </motion.div>
      <motion.div
        data-spatial-motion="true"
        className="absolute top-0 right-[1%] w-[64%]"
        style={{ transform: frontTransform }}
      >
        <div className="rotate-[2deg]">
          <Device
            src="/screens/home.webp"
            alt="The Rafiq home screen showing protection controls, today's blocks, time saved, and the dhikr of the day."
            eager
            highPriority
          />
        </div>
      </motion.div>
    </div>
  );
}
