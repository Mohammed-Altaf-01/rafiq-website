"use client";

import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "motion/react";
import { useId, useState, useSyncExternalStore, type ReactNode } from "react";

import { PrimaryButton } from "@/components/ui/button";
import {
  earlyAccessEnabled,
  isEmail,
  rememberedEmail,
  subscribeRememberedEmail,
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
 *
 * `secondary` is a second call to sit beside the submit — the hero's "See how
 * it works". Passing it turns the form from one row into two, the address over
 * the pair of buttons, because a field and two pills on one line reads as three
 * peers rather than as one question with an answer. It is also rendered under
 * the confirmation: signing up is not a reason to lose the way into the page.
 *
 * `stack` puts the button under the field at every width, for the narrow
 * columns — the scroll gate's dialog — where a row would leave the field too
 * short to read a typed address back in.
 *
 * `onDone` fires once the address is in. Only the scroll gate uses it, to close
 * itself a beat after the confirmation appears; the sections on the page keep
 * their confirmation on screen and pass nothing.
 */
export function EarlyAccess({
  onDark = false,
  storeLabel = "Get Rafiq on Google Play",
  align = "start",
  secondary,
  stack = false,
  id,
  className = "",
  onDone,
}: {
  onDark?: boolean;
  storeLabel?: string;
  align?: "start" | "center";
  secondary?: ReactNode;
  stack?: boolean;
  id?: string;
  className?: string;
  onDone?: () => void;
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
   *
   * Subscribing rather than reading once is what keeps the page consistent with
   * itself: an address left in the scroll gate settles this form too, wherever
   * on the page it is, instead of leaving a second empty field behind.
   */
  const remembered = useSyncExternalStore(
    subscribeRememberedEmail,
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
      onDone?.();
      return;
    }

    setStatus("sending");
    try {
      await submitEarlyAccess(email);
      setStatus("done");
      onDone?.();
    } catch {
      setStatus("error");
    }
  }

  const invalid = status === "error" && !isEmail(email);
  const ink = onDark ? "var(--deep-ink)" : "var(--ink)";
  const inkSoft = onDark ? "var(--deep-ink-soft)" : "var(--ink-soft)";

  // One column instead of a row: either because a second button has to sit
  // under the field, or because the caller asked for it.
  const column = stack || Boolean(secondary);

  const submit = (
    <button
      type="submit"
      disabled={status === "sending"}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-bold whitespace-nowrap transition-all duration-200 hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.985] disabled:cursor-progress disabled:opacity-70 ${
        secondary ? "sm:flex-1" : column ? "w-full" : "shrink-0"
      }`}
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
  );

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
              {/* `w-fit` so the button keeps its own width here: the `flex-1`
                  it carries for the form row would otherwise stretch it across
                  the whole confirmation. */}
              {secondary ? <div className="mt-6 flex w-fit">{secondary}</div> : null}
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
              className={
                column
                  ? // Two rows. The cap is what makes the buttons read as
                    // belonging to the field above them: they grow to share its
                    // width exactly instead of trailing off under one end of it.
                    `flex w-full max-w-[28rem] flex-col gap-3 ${align === "center" ? "mx-auto" : ""}`
                  : `flex w-full flex-col gap-3 sm:flex-row ${
                      align === "center" ? "sm:justify-center" : ""
                    }`
              }
            >
              <input
                id={inputId}
                type="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setTyped(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                // Checked on the way out of the field, not on every keystroke:
                // an address is malformed for as long as it is half-typed, and
                // saying so while someone is still typing it is just noise.
                onBlur={() => {
                  if (!settled && typed.trim() !== "" && !isEmail(typed)) setStatus("error");
                }}
                aria-invalid={invalid}
                aria-describedby={status === "error" ? `${inputId}-note` : undefined}
                disabled={status === "sending"}
                className={`early-input w-full min-w-0 px-5 py-3.5 text-[0.95rem] font-medium transition-shadow duration-200 ${
                  column ? "" : "sm:w-[300px]"
                }`}
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

              {secondary ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  {submit}
                  {secondary}
                </div>
              ) : (
                submit
              )}
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
