"use client";

import { motion } from "motion/react";

import type { Passage } from "@/lib/scripture";

type Tone = "page" | "deep";

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
  const words = passage.arabic.split(" ");

  const arabicSize =
    size === "xl"
      ? "text-[1.75rem] sm:text-[2.5rem] lg:text-[3.25rem]"
      : size === "lg"
        ? "text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem]"
        : "text-[1.3rem] sm:text-[1.65rem]";

  return (
    <figure className={`text-center ${className}`}>
      <motion.p
        dir="rtl"
        lang="ar"
        className={`arabic mx-auto max-w-[15em] ${arabicSize}`}
        style={{ color: c.arabic }}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.5 }}
        variants={{
          hidden: {},
          shown: { transition: { staggerChildren: Math.min(0.075, 1.1 / words.length) } },
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, filter: "blur(3px)", y: 8 },
              shown: {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
              },
            }}
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
      </figcaption>
    </figure>
  );
}
