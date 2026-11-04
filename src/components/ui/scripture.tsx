"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useSyncExternalStore } from "react";

import type { Passage } from "@/lib/scripture";

type Tone = "page" | "deep";

const noopSubscribe = () => () => undefined;
const clientSnapshot = () => true;
const serverSnapshot = () => false;
const EASE = [0.23, 1, 0.32, 1] as const;
const REST = "translate3d(0, 0, 0)";

export function getScriptureMotion(reduced: boolean, wordCount: number) {
  const restingWord = {
    opacity: 1,
    filter: "blur(0px)",
    transform: REST,
  };

  return {
    group: {
      hidden: {},
      shown: {
        transition: {
          staggerChildren: reduced ? 0 : Math.min(0.05, 0.8 / wordCount),
        },
      },
    },
    word: {
      hidden: reduced
        ? restingWord
        : {
            opacity: 0,
            filter: "blur(3px)",
            transform: "translate3d(0, 8px, 0)",
          },
      shown: {
        ...restingWord,
        transition: { duration: reduced ? 0 : 0.55, ease: EASE },
      },
    },
  };
}

const tones = {
  page: {
    arabic: "var(--ink)",
    translation: "var(--ink-soft)",
    reference: "var(--gold)",
    transliteration: "var(--gold)",
  },
  deep: {
    arabic: "var(--deep-ink)",
    translation: "var(--deep-ink-soft)",
    reference: "var(--deep-gold)",
    transliteration: "var(--deep-gold)",
  },
} satisfies Record<Tone, Record<string, string>>;

/**
 * Sacred text, set the way the app sets it: Amiri, larger than the surrounding
 * copy, centred, and never without its translation and reference.
 *
 * The Arabic reveals word by word in reading order (right to left), which is
 * the one place on this page where motion is carrying meaning rather than
 * decoration. It is the difference between a verse being recited and a verse
 * being pasted.
 */
export function Scripture({
  passage,
  tone = "page",
  size = "lg",
  className = "",
}: {
  passage: Passage;
  tone?: Tone;
  size?: "md" | "lg" | "xl";
  className?: string;
}) {
  const c = tones[tone];
  // A pause mark has no letter of its own: split off, it floats into the line above.
  const words = passage.arabic.replace(/ ([\u06D6-\u06DC])/g, "$1").split(" ");
  const arabicRef = useRef<HTMLParagraphElement>(null);
  const mounted = useSyncExternalStore(noopSubscribe, clientSnapshot, serverSnapshot);
  const inView = useInView(arabicRef, { once: true, amount: 0.35 });
  const shown = !mounted || inView;
  const reduced = useReducedMotion();
  const scriptureMotion = getScriptureMotion(Boolean(reduced), words.length);

  const arabicSize =
    size === "xl"
      ? "text-[1.75rem] sm:text-[2.5rem] lg:text-[3.25rem]"
      : size === "lg"
        ? "text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem]"
        : "text-[1.3rem] sm:text-[1.65rem]";

  return (
    <figure className={`text-center ${className}`}>
      <motion.p
        ref={arabicRef}
        dir="rtl"
        lang="ar"
        className={`arabic mx-auto max-w-[15em] leading-[2.3] ${arabicSize}`}
        style={{ color: c.arabic }}
        initial={false}
        animate={shown ? "shown" : "hidden"}
        variants={scriptureMotion.group}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            data-spatial-motion="true"
            className="inline-block"
            variants={scriptureMotion.word}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </motion.p>

      {passage.transliteration ? (
        <p
          className="mt-5 text-[0.8rem] font-medium tracking-wide italic sm:text-[0.875rem]"
          style={{ color: c.transliteration, lineHeight: 1.6 }}
        >
          {passage.transliteration}
        </p>
      ) : null}

      <figcaption
        className={`mx-auto max-w-[46ch] ${passage.transliteration ? "mt-3" : "mt-7"}`}
      >
        <p
          className="text-[0.98rem] leading-relaxed sm:text-[1.075rem]"
          style={{ color: c.translation }}
        >
          {passage.translation}
        </p>
        <p
          className="overline mt-5"
          style={{ color: c.reference, letterSpacing: "0.18em" }}
        >
          {passage.reference}
        </p>
        <p className="mt-2 text-[0.8rem]" style={{ color: c.translation }}>
          {passage.translator}
          {passage.grade ? ` · ${passage.grade}` : ""}
        </p>
      </figcaption>
    </figure>
  );
}
