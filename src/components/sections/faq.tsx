"use client";

import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { site } from "@/lib/site";

const questions = [
  {
    q: "Why does Rafiq need the Accessibility permission?",
    a: "It is the only way on Android to see the URL in your address bar, the text in a search field, and the shape of a Shorts or Reels feed. Rafiq shows you a plain disclosure before Android ever asks, and it will not block anything until you grant it. Turn it off in Android Settings at any time and blocking simply stops.",
  },
  {
    q: "Can I switch the blocking off when I want to?",
    a: "Yes, and that is deliberate. Rafiq never locks you out permanently, because a false positive should not cost you your phone. On premium, switching off costs a PIN and a cooldown, so it takes a decision rather than a reflex.",
  },
  {
    q: "Does it work without an internet connection?",
    a: "Yes. The blocklist ships inside the app and every match runs on the device. A connection is only used to pull down updates to that list as sites and apps change.",
  },
  {
    q: "What exactly does it block?",
    a: "Three things: adult content matched against a curated list of domains and keywords, short-video feeds such as YouTube Shorts and Instagram Reels, and any app whose daily time limit you have already spent.",
  },
  {
    q: "What happens when the free trial ends?",
    a: `Nothing is taken away except strictness. After ${site.name}'s trial, blocks become soft: they still appear, and after a brief pause you can continue. Your streaks, settings and history are all kept.`,
  },
  {
    q: "Do I need an account?",
    a: "No. You can continue without signing in and everything stays on that one device. Signing in with Google is what lets a subscription and your streaks follow you to a new phone.",
  },
  {
    q: "How do I delete my data?",
    a: `Uninstalling removes everything held on the device. To remove cloud data, use Delete account in Settings, or email ${site.supportEmail} from the address tied to your account and it is gone within 30 days.`,
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="border-t px-5 py-28 sm:px-8 sm:py-36"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="mx-auto grid max-w-[1240px] gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <h2 className="display text-[2.25rem] sm:text-[2.75rem] lg:text-[3rem]">
          Questions worth asking.
        </h2>

        <ul>
          {questions.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={item.q}
                className="border-b"
                style={{ borderColor: "var(--line)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start justify-between gap-6 py-6 text-left"
                >
                  <span className="text-[1.02rem] font-bold sm:text-[1.1rem]">{item.q}</span>
                  <motion.span
                    className="mt-0.5 shrink-0"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    style={{ color: isOpen ? "var(--primary)" : "var(--ink-faint)" }}
                  >
                    <PlusIcon size={20} weight="regular" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-7 text-[0.98rem] leading-relaxed text-ink-soft">
                        {item.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
