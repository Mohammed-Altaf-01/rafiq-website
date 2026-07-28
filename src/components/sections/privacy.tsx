import { CheckIcon, ProhibitIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { theTreacheryOfEyes } from "@/lib/scripture";

const never = [
  "The URL you visited",
  "What you searched for",
  "Anything you typed",
  "Page content, messages or email",
  "Which site triggered a block",
];

const kept = [
  "That a block happened, and at what time",
  "Which of the three kinds it was",
  "Minutes spent in apps you set limits on",
  "Your streak and your dhikr count",
];

export function Privacy() {
  return (
    <section
      id="privacy"
      className="border-y px-5 py-28 sm:px-8 sm:py-36"
      style={{ background: "var(--surface)", borderColor: "var(--line)" }}
    >
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <p className="overline text-gold">The promise</p>
          <h2 className="display mt-4 max-w-[17ch] text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem]">
            Rafiq reads your screen. It keeps none of it.
          </h2>
          <p className="mt-6 max-w-[58ch] text-[1.02rem] leading-relaxed text-ink-soft sm:text-[1.1rem]">
            To catch a blocked page, Rafiq has to look at one. That is the most sensitive
            permission on Android, so here is the exact deal. Text is compared against the
            blocklist in memory and dropped within a fraction of a second. It is never
            written to storage, never sent over the network, and never printed to a log,
            not even in test builds.
          </p>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-x-14 gap-y-12 md:grid-cols-2">
          <RevealItem>
            <h3 className="text-[1.15rem] font-extrabold tracking-tight">
              Never stored, never sent
            </h3>
            <ul className="mt-6 space-y-4">
              {never.map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <ProhibitIcon
                    size={19}
                    weight="regular"
                    className="mt-[3px] shrink-0"
                    style={{ color: "var(--clay)" }}
                  />
                  <span className="text-[0.98rem] leading-relaxed text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem>
            <h3 className="text-[1.15rem] font-extrabold tracking-tight">
              The whole of what it does keep
            </h3>
            <ul className="mt-6 space-y-4">
              {kept.map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <CheckIcon
                    size={19}
                    weight="regular"
                    className="mt-[3px] shrink-0"
                    style={{ color: "var(--primary)" }}
                  />
                  <span className="text-[0.98rem] leading-relaxed text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 max-w-[44ch] text-[0.9rem] leading-relaxed text-ink-faint">
              There are no ads in Rafiq and no ad networks to sell to. On the free tier
              none of this leaves the device at all.
            </p>
          </RevealItem>
        </RevealGroup>

        <Reveal delay={0.1}>
          <div
            className="mt-16 flex flex-col gap-8 rounded-[var(--radius-card)] p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12"
            style={{ background: "var(--card)", boxShadow: "inset 0 0 0 1px var(--line)" }}
          >
            <figure className="max-w-[46ch]">
              <p
                className="arabic text-[1.5rem] sm:text-[1.75rem]"
                dir="rtl"
                lang="ar"
                style={{ color: "var(--ink)" }}
              >
                {theTreacheryOfEyes.arabic}
              </p>
              <figcaption className="mt-4">
                <p className="text-[0.98rem] leading-relaxed text-ink-soft">
                  {theTreacheryOfEyes.translation}
                </p>
                <p className="mt-3 text-[0.82rem] font-bold" style={{ color: "var(--gold)" }}>
                  {theTreacheryOfEyes.reference}
                </p>
              </figcaption>
            </figure>

            <p className="max-w-[34ch] text-[0.98rem] leading-relaxed text-ink-soft lg:text-right">
              One already sees everything. Rafiq does not need to keep a copy. Read the
              full{" "}
              <Link
                href="/privacy"
                className="font-semibold underline decoration-1 underline-offset-4"
                style={{ color: "var(--primary)" }}
              >
                privacy policy
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
