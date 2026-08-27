"use client";

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { track } from "@vercel/analytics";
import Link from "next/link";

import { Mark } from "@/components/brand/mark";

export function Cta() {
  return (
    <section
      className="relative overflow-hidden px-5 py-24 text-center sm:px-8 sm:py-32"
      style={{ background: "var(--deep)", color: "var(--deep-ink)" }}
    >
      <div className="star-field-gold pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-[780px]">
        <Mark size={54} onDark />
        <h2 className="display mx-auto mt-10 max-w-[16ch] text-[2.45rem] sm:text-[3.35rem] lg:text-[3.8rem]">
          Make the choice once. Let your companion remember it.
        </h2>
        <p
          className="mx-auto mt-6 max-w-[52ch] text-[1rem] leading-relaxed sm:text-[1.08rem]"
          style={{ color: "var(--deep-ink-soft)" }}
        >
          Rafiq is being prepared for Android. Reserve your first month now, then
          receive one email when it is ready to install.
        </p>
        <Link
          href="#free-month"
          onClick={() => track("offer_cta_click", { source: "closing" })}
          className="pressable mt-9 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-bold"
          style={{
            background: "var(--deep-primary)",
            color: "#1c1a16",
            boxShadow: "0 14px 32px -18px rgba(0,0,0,0.75)",
          }}
        >
          Reserve my free month
          <ArrowRightIcon size={18} weight="bold" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
