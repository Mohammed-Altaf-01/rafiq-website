"use client";

import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState, useSyncExternalStore } from "react";

import { PrimaryButton } from "@/components/ui/button";
import {
  earlyAccessEnabled,
  isEmail,
  rememberedEmail,
  submitEarlyAccess,
} from "@/lib/early-access";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";

/**
 * Early-access signup: an address in, a promise back.
 *
 * Three shapes, decided by configuration rather than by the caller:
 * once the Play listing exists it is a download button, before the Google
 * Form is wired up it is the plain mailto the rest of the page used to carry,
 * and in between it is this form.
 */
export function EarlyAccess({
  onDark = false,
  storeLabel = "Get Rafiq on Google Play",
  align = "start",
  id,
  className = "",
}: {
  onDark?: boolean;
  storeLabel?: string;
  align?: "start" | "center";
  id?: string;
  className?: string;
}) {
  const inputId = useId();
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [trap, setTrap] = useState("");

  /*
   * Whether this device has already signed up. It has to come through
   * `useSyncExternalStore`: the page is exported as static HTML, which cannot
   * know who is reading it, so the server snapshot is null and React swaps in
   * the stored address after hydration instead of tripping over a mismatch.
   */
  const remembered = useSyncExternalStore(
    () => () => {},
    rememberedEmail,
    () => null,
  );

  const settled = status === "idle" && remembered !== null;
  const email = settled ? remembered : typed;

  if (site.playStore) {
    return (
      <PrimaryButton href={site.playStore} onDark={onDark} className={className}>
        {storeLabel}
      </PrimaryButton>
    );
  }

  if (!earlyAccessEnabled) {
    return (
      <PrimaryButton href={site.earlyAccessUrl} onDark={onDark} className={className}>
        Get early access
      </PrimaryButton>
    );
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "sending") return;
    if (!isEmail(email)) {
      setStatus("error");
      return;
    }
    // Anything in the honeypot came from a script. Give it the same screen a
    // person gets and post nothing.
    if (trap) {
      setStatus("done");
      return;
    }

    setStatus("sending");
    try {
      await submitEarlyAccess(email);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const invalid = status === "error" && !isEmail(email);
  const ink = onDark ? "var(--deep-ink)" : "var(--ink)";
  const inkSoft = onDark ? "var(--deep-ink-soft)" : "var(--ink-soft)";

  return (
    <div id={id} className={`w-full ${align === "center" ? "text-center" : ""} ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        {status === "done" || settled ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`flex items-start gap-3 ${align === "center" ? "justify-center text-left" : ""}`}
          >
            <span className="mt-[2px] shrink-0" style={{ color: onDark ? "var(--deep-primary)" : "var(--primary)" }}>
              <CheckCircleIcon size={24} weight="fill" />
            </span>
            <div>
              <p className="text-[1.02rem] font-bold" style={{ color: ink }}>
                You are on the list.
              </p>
              <p className="mt-1 max-w-[42ch] text-[0.94rem] leading-relaxed" style={{ color: inkSoft }}>
                We will email <span className="font-semibold">{email}</span> the day {site.name} is
                live on Google Play. That is the only reason we will ever write to you.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>

            <div
              className={`flex w-full flex-col gap-3 sm:flex-row ${
                align === "center" ? "sm:justify-center" : ""
              }`}
            >
              <input
                id={inputId}
                type="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setTyped(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                aria-invalid={invalid}
                aria-describedby={status === "error" ? `${inputId}-note` : undefined}
                disabled={status === "sending"}
                className="early-input w-full min-w-0 px-5 py-3.5 text-[0.95rem] font-medium transition-shadow duration-200 sm:w-[300px]"
                style={{
                  borderRadius: "var(--radius-input)",
                  background: onDark ? "rgba(237,230,214,0.08)" : "var(--surface)",
                  color: ink,
                  boxShadow: `inset 0 0 0 1px ${
                    invalid
                      ? "var(--clay-fill)"
                      : onDark
                        ? "var(--deep-line)"
                        : "var(--line-strong)"
                  }`,
                }}
              />

              {/* Bots fill every field they find. People never see this one. */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                value={trap}
                onChange={(e) => setTrap(e.target.value)}
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-bold whitespace-nowrap transition-all duration-200 hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.985] disabled:cursor-progress disabled:opacity-70"
                style={{
                  background: onDark ? "var(--deep-primary)" : "var(--primary)",
                  color: onDark ? "#1C1A16" : "var(--on-primary)",
                  boxShadow: onDark
                    ? "0 10px 26px -12px rgba(0,0,0,0.7)"
                    : "0 10px 26px -12px var(--shade-deep)",
                }}
              >
                {status === "sending" ? "Sending…" : "Get early access"}
              </button>
            </div>

            <p
              id={`${inputId}-note`}
              role="status"
              aria-live="polite"
              className={`mt-3 text-[0.85rem] leading-relaxed ${
                align === "center" ? "" : "max-w-[44ch]"
              }`}
              style={{ color: status === "error" ? "var(--clay)" : inkSoft }}
            >
              {status === "error"
                ? invalid
                  ? "That does not look like an email address. Check it and try again."
                  : "That did not go through. Try again, or email us at " + site.supportEmail + "."
                : "One email, on launch day. Nothing else, and never to anyone else."}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
