"use client";

import {
  EyeClosedIcon,
  LockKeyIcon,
  ShieldCheckIcon,
  XIcon,
} from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { EarlyAccess } from "@/components/ui/early-access";
import { Scripture } from "@/components/ui/scripture";
import { earlyAccessEnabled, rememberedEmail } from "@/lib/early-access";
import { theSteadyDeed } from "@/lib/scripture";
import { pricing, site } from "@/lib/site";

/** Once per tab. `sessionStorage`, not `localStorage`: a new visit may ask again. */
const SESSION_KEY = "rafiq-gate-shown";

/** How far down the page counts as "they are reading and still have not signed up". */
const TRIGGER = 0.5;

const reasons = [
  {
    Icon: ShieldCheckIcon,
    title: "It blocks the feed, not just the site",
    body: "Adult pages stop before they finish loading, and Shorts and Reels are caught by their shape on screen — so it keeps holding when an app renames things.",
  },
  {
    Icon: LockKeyIcon,
    title: "It holds on the weak night",
    body: "Strict mode costs a PIN and a cooldown to undo, and it re-arms itself after a reboot or battery saver. Your calm self sets the rule.",
  },
  {
    Icon: EyeClosedIcon,
    title: "Nothing you looked at leaves the phone",
    body: "Every match runs on device. No account, no history, no server — which is also why airplane mode is not a loophole.",
  },
];

/**
 * The scroll gate: one interruption, halfway down, for a reader who has taken
 * the page in and still has not left an address.
 *
 * Deliberately narrow about when it may appear. It never opens for someone who
 * has already signed up on this device, never twice in a tab, and never at all
 * once `site.playStore` exists — at that point there is a store listing to send
 * people to and nothing to collect.
 */
export function EmailGate() {
  const [open, setOpen] = useState(false);
  const spent = useRef(false);
  const panel = useRef<HTMLDivElement>(null);
  const restoreFocus = useRef<HTMLElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollYProgress } = useScroll();

  const close = useCallback(() => setOpen(false), []);

  /*
   * Motion's scroll observer, as in the nav: no per-frame React state, and the
   * crossing is spent on the first one whether or not it opens anything.
   *
   * Every check happens here rather than on mount, because the page is exported
   * as static HTML: the server cannot know whether this reader has signed up or
   * already been asked, so nothing about that may reach the first render.
   */
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (spent.current || progress < TRIGGER) return;
    spent.current = true;

    if (site.playStore || !earlyAccessEnabled) return;
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // Storage blocked. Fall through: better to ask once more than never.
    }
    if (rememberedEmail() !== null) return;

    setOpen(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Nothing to do. Worst case it opens again in a later tab.
    }
  });

  // The page must not scroll behind the dialog, and Escape must close it.
  useEffect(() => {
    if (!open) return;

    restoreFocus.current = document.activeElement as HTMLElement | null;
    panel.current?.focus();

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      restoreFocus.current?.focus();
    };
  }, [open, close]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            aria-hidden
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0"
            style={{
              background: "color-mix(in srgb, var(--deep) 48%, transparent)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          />

          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gate-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            /*
              A column, not a scrolling block: the form below is pinned and the
              reading above it takes whatever height is left. `min-h-0` on that
              child is what lets it shrink far enough to scroll at all — a flex
              item defaults to its content height and would otherwise push the
              form off the bottom of a short screen.
            */
            className="gate-panel relative flex w-full max-w-[31rem] flex-col overflow-hidden rounded-[var(--radius-card)] outline-none"
            style={{
              background: "var(--card)",
              boxShadow:
                "inset 0 0 0 1px var(--line), 0 1px 2px var(--shade), 0 40px 80px -32px var(--shade-deep)",
            }}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              // Above the scrolling copy, and opaque, so a line of text passing
              // underneath it never turns into a smudge behind the cross.
              className="absolute top-3.5 right-3.5 z-10 inline-flex size-9 items-center justify-center rounded-full text-ink-faint transition-colors duration-200 hover:text-ink sm:top-4 sm:right-4"
              style={{ background: "var(--card)", boxShadow: "inset 0 0 0 1px var(--line)" }}
            >
              <XIcon size={16} weight="bold" />
            </button>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-7 pb-7 sm:px-9 sm:pt-9 sm:pb-8">
              {/* Room at the top for the close button to sit over nothing. */}
              <div className="pr-8 sm:pr-6">
                <Scripture passage={theSteadyDeed} size="md" />
              </div>

              <p className="overline mt-9 text-center text-gold">Early access</p>
              <h2
                id="gate-title"
                className="display mx-auto mt-3 max-w-[18ch] text-center text-[1.55rem] sm:text-[2rem]"
              >
                One address, and you are on the list.
              </h2>
              <p className="mx-auto mt-4 max-w-[42ch] text-center text-[0.95rem] leading-relaxed text-ink-soft sm:text-[0.98rem]">
                {site.name} is not on Google Play yet. Leave an email and you will hear
                the day it is — with {pricing.trialDays} days of everything, no card.
              </p>

              <ul className="mt-7 flex flex-col gap-5">
                {reasons.map(({ Icon, title, body }) => (
                  <li key={title} className="flex gap-3.5">
                    <span className="mt-[3px] shrink-0" style={{ color: "var(--primary)" }}>
                      <Icon size={20} weight="regular" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[0.95rem] font-bold sm:text-[0.98rem]">{title}</p>
                      <p className="mt-1 text-[0.875rem] leading-relaxed text-ink-soft sm:text-[0.9rem]">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/*
              Pinned. The one thing the dialog is asking for stays on screen
              however far the reader scrolls the case for it.

              The same form the closing section carries, so an address left here
              is remembered exactly like one left there. `onDone` holds the
              confirmation on screen for a beat before the dialog leaves, rather
              than snapping shut on a submit.
            */}
            <div
              className="shrink-0 px-5 pt-5 pb-6 sm:px-9 sm:pt-6 sm:pb-8"
              style={{
                background: "var(--card)",
                boxShadow: "0 -1px 0 0 var(--line)",
              }}
            >
              <EarlyAccess
                align="center"
                stack
                onDone={() => {
                  closeTimer.current = setTimeout(close, 2600);
                }}
              />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
