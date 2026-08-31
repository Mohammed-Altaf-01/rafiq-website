"use client";

import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { motion, useReducedMotion } from "motion/react";
import { useId, useState, useSyncExternalStore } from "react";

import { site } from "@/lib/site";

const noopSubscribe = () => () => undefined;
const clientSnapshot = () => true;
const serverSnapshot = () => false;

const questions = [
  {
    q: "Why does Rafiq need Android Accessibility permission?",
    a: "Android Accessibility is what lets Rafiq briefly read the address-bar URL, search text, or feed layout needed to recognise one of your rules. The app explains that boundary before Android asks. Blocking stops if you remove the permission.",
  },
  {
    q: "What exactly does it block?",
    a: "Rafiq matches known adult-content domains and search terms, recognises Shorts- and Reels-style feeds, and blocks an app after the daily limit you set has been spent.",
  },
  {
    q: "Can protection be switched off?",
    a: "Yes. A false positive should never cost you access to your phone. Premium strict mode can put a PIN and cooldown in front of switching protection off, turning a reflex into a deliberate choice.",
  },
  {
    q: "Does it work offline, and does browsing data leave the phone?",
    a: "Matching works offline because the blocklist and detection run on your device. A connection can fetch blocklist updates, but what you viewed and the on-screen text used for matching are not sent off-device.",
  },
  {
    q: "Where can I get Rafiq?",
    a: `Rafiq is available now on Google Play for Android ${site.minAndroid} and newer. Open the store listing to install it. You can start with the free tier; any Premium purchase is handled by Google Play, which shows the current terms before you pay.`,
  },
];

export function Faq() {
  const baseId = useId();
  const reduced = useReducedMotion();
  const mounted = useSyncExternalStore(noopSubscribe, clientSnapshot, serverSnapshot);
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set([0]));

  return (
    <section
      aria-labelledby={`${baseId}-title`}
      className="border-t px-5 py-24 sm:px-8 sm:py-32"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto grid max-w-[1160px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <h2
            id={`${baseId}-title`}
            className="display max-w-[12ch] text-[2.4rem] sm:text-[3.05rem]"
          >
            Questions before you decide
          </h2>
          <p className="mt-5 max-w-[42ch] text-[0.96rem] leading-relaxed text-ink-soft">
            The permission is powerful and the promise is specific. These are the
            boundaries worth understanding first.
          </p>
        </div>

        <div>
          {questions.map((item, index) => {
            const summaryId = `${baseId}-question-${index}`;
            const panelId = `${baseId}-answer-${index}`;
            const isOpen = openItems.has(index);
            const panelVisible = !mounted || isOpen;

            return (
              <motion.details
                key={item.q}
                open={isOpen}
                data-spatial-motion="true"
                layout={reduced ? false : "position"}
                transition={{ layout: { duration: 0.24, ease: [0.23, 1, 0.32, 1] } }}
                className="group border-b"
                style={{ borderColor: "var(--line-strong)" }}
                onToggle={(event) => {
                  const open = event.currentTarget.open;
                  setOpenItems((current) => {
                    const next = new Set(current);
                    if (open) next.add(index);
                    else next.delete(index);
                    return next;
                  });
                }}
              >
                <summary
                  id={summaryId}
                  role="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex min-h-16 cursor-pointer list-none items-start justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden"
                >
                  <span className="text-[1rem] font-bold sm:text-[1.08rem]">{item.q}</span>
                  <PlusIcon
                    size={20}
                    weight="regular"
                    aria-hidden
                    data-spatial-motion="true"
                    className="mt-0.5 shrink-0 transition-transform duration-200 group-open:rotate-45"
                    style={{ color: "var(--primary)" }}
                  />
                </summary>
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={summaryId}
                  data-spatial-motion="true"
                  initial={false}
                  animate={{
                    opacity: panelVisible ? 1 : 0,
                    transform:
                      reduced || panelVisible
                        ? "translate3d(0, 0, 0)"
                        : "translate3d(0, -6px, 0)",
                  }}
                  transition={{ duration: reduced ? 0.18 : 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  <p className="max-w-[65ch] pb-7 text-[0.96rem] leading-relaxed text-ink-soft">
                    {item.a}
                  </p>
                </motion.div>
              </motion.details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
