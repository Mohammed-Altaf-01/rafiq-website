"use client";

import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { track } from "@vercel/analytics";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
  type ReactNode,
} from "react";

import { PrimaryButton } from "@/components/ui/button";
import {
  earlyAccessEnabled,
  forgetRememberedEmail,
  isEmail,
  rememberedEmail,
  subscribeRememberedEmail,
  submitEarlyAccess,
} from "@/lib/early-access";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "done" | "error";
type ErrorReason = "invalid" | "network" | "configuration" | null;

export type EarlyAccessSource = "hero" | "offer";

/**
 * The email capture has a real form action so it still works without
 * JavaScript. With JavaScript, the same POST stays on the page and every form
 * instance settles together through the shared remembered-email store.
 */
export function EarlyAccess({
  onDark = false,
  storeLabel = "Get Rafiq on Google Play",
  align = "start",
  secondary,
  id,
  className = "",
  source,
}: {
  onDark?: boolean;
  storeLabel?: string;
  align?: "start" | "center";
  secondary?: ReactNode;
  id?: string;
  className?: string;
  source: EarlyAccessSource;
}) {
  const inputId = useId();
  const noteId = `${inputId}-note`;
  const inputRef = useRef<HTMLInputElement>(null);
  const viewRef = useRef<HTMLDivElement>(null);
  const viewTracked = useRef(false);
  const isInView = useInView(viewRef, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();

  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorReason, setErrorReason] = useState<ErrorReason>(null);
  const [trap, setTrap] = useState("");

  const remembered = useSyncExternalStore(
    subscribeRememberedEmail,
    rememberedEmail,
    () => null,
  );

  useEffect(() => {
    if (!isInView || viewTracked.current || site.playStore || !earlyAccessEnabled) return;
    viewTracked.current = true;
    track("early_access_form_view", { source });
  }, [isInView, source]);

  const settled = status === "idle" && remembered !== null;
  const done = status === "done" || settled;
  const email = settled ? remembered : typed;
  const invalid = status === "error" && errorReason === "invalid";
  const formLocation = source === "hero" ? "the introduction" : "the free-month offer";
  const ink = onDark ? "var(--deep-ink)" : "var(--ink)";
  const inkSoft = onDark ? "var(--deep-ink-soft)" : "var(--ink-soft)";

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

  function reportInvalid() {
    if (status === "sending" || invalid) return;
    setStatus("error");
    setErrorReason("invalid");
    track("early_access_invalid", { source });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    if (!isEmail(email)) {
      reportInvalid();
      return;
    }

    // A bot that fills the hidden field gets a quiet success screen. No
    // request, analytics event, or remembered address is created.
    if (trap) {
      setStatus("done");
      setErrorReason(null);
      return;
    }

    track("early_access_submit", { source });
    setStatus("sending");
    setErrorReason(null);

    try {
      await submitEarlyAccess(email);
      track("early_access_request_sent", { source });
      setStatus("done");
    } catch {
      const reason = site.offer.action ? "network" : "configuration";
      track("early_access_error", { source, reason });
      setStatus("error");
      setErrorReason(reason);
    }
  }

  function useDifferentEmail() {
    forgetRememberedEmail();
    setTyped("");
    setTrap("");
    setStatus("idle");
    setErrorReason(null);
    track("early_access_email_change", { source });
    window.requestAnimationFrame(() => inputRef.current?.focus());
  }

  const column = Boolean(secondary);
  const buttonClass = `pressable inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 text-[0.95rem] font-bold disabled:cursor-progress disabled:opacity-70 ${
    secondary ? "sm:flex-1" : column ? "w-full" : "shrink-0"
  }`;
  const rest = "translate3d(0, 0, 0)";
  const enterOffset = reduced ? rest : "translate3d(0, 8px, 0)";
  const exitOffset = reduced ? rest : "translate3d(0, -6px, 0)";

  return (
    <div
      ref={viewRef}
      id={id}
      className={`w-full ${align === "center" ? "text-center" : ""} ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div
            key="done"
            data-spatial-motion="true"
            initial={{ opacity: 0, transform: enterOffset }}
            animate={{ opacity: 1, transform: rest }}
            exit={{ opacity: 0, transform: exitOffset }}
            transition={{ duration: reduced ? 0.18 : 0.22, ease: [0.23, 1, 0.32, 1] }}
            className={`flex items-start gap-3 ${align === "center" ? "justify-center text-left" : ""}`}
          >
            <span
              className="mt-0.5 shrink-0"
              style={{ color: onDark ? "var(--deep-primary)" : "var(--primary)" }}
            >
              <CheckCircleIcon size={24} weight="fill" aria-hidden />
            </span>
            <div>
              <p className="text-[1.02rem] font-bold" style={{ color: ink }}>
                Your free month is reserved.
              </p>
              <p
                className="mt-1 max-w-[48ch] text-[0.94rem] leading-relaxed"
                style={{ color: inkSoft }}
              >
                We will email <span className="font-semibold">{email}</span> on launch day
                with the steps to redeem {site.offer.premiumDays} days of {site.name} Premium.
                No card required.
              </p>
              <button
                type="button"
                onClick={useDifferentEmail}
                className="mt-3 rounded-sm text-[0.88rem] font-bold underline decoration-1 underline-offset-4 transition-colors duration-200 hover:no-underline"
                style={{ color: ink }}
              >
                Use a different email
              </button>
              <p className="mt-2 max-w-[52ch] text-[0.78rem] leading-relaxed" style={{ color: inkSoft }}>
                Changing this clears the address remembered on this device. It does not
                remove the earlier reservation from our launch list.
              </p>
              {secondary ? <div className="mt-6 flex w-fit">{secondary}</div> : null}
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            action={site.offer.action ?? undefined}
            method="post"
            aria-label={`Reserve ${site.offer.premiumDays} days of Rafiq Premium from ${formLocation}`}
            onSubmit={onSubmit}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>

            <div
              className={
                column
                  ? `flex w-full max-w-[30rem] flex-col gap-3 ${align === "center" ? "mx-auto" : ""}`
                  : `flex w-full flex-col gap-3 sm:flex-row ${
                      align === "center" ? "sm:justify-center" : ""
                    }`
              }
            >
              <input
                ref={inputRef}
                id={inputId}
                type="email"
                name={site.offer.field}
                inputMode="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                value={typed}
                onChange={(event) => {
                  setTyped(event.target.value);
                  if (status === "error") {
                    setStatus("idle");
                    setErrorReason(null);
                  }
                }}
                onBlur={() => {
                  if (typed.trim() !== "" && !isEmail(typed)) reportInvalid();
                }}
                onInvalid={(event) => {
                  event.preventDefault();
                  reportInvalid();
                }}
                aria-invalid={invalid}
                aria-describedby={noteId}
                disabled={status === "sending"}
                className={`early-input min-h-12 w-full min-w-0 px-5 py-3.5 text-[0.95rem] font-medium transition-[box-shadow,background-color] duration-200 ${
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

              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                value={trap}
                onChange={(event) => setTrap(event.target.value)}
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              {secondary ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className={buttonClass}
                    style={{
                      background: onDark ? "var(--deep-primary)" : "var(--primary)",
                      color: onDark ? "#1C1A16" : "var(--on-primary)",
                      boxShadow: onDark
                        ? "0 10px 26px -12px rgba(0,0,0,0.7)"
                        : "0 10px 26px -12px var(--shade-deep)",
                    }}
                  >
                    {status === "sending" ? "Reserving…" : "Claim my free month"}
                  </button>
                  {secondary}
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={buttonClass}
                  style={{
                    background: onDark ? "var(--deep-primary)" : "var(--primary)",
                    color: onDark ? "#1C1A16" : "var(--on-primary)",
                    boxShadow: onDark
                      ? "0 10px 26px -12px rgba(0,0,0,0.7)"
                      : "0 10px 26px -12px var(--shade-deep)",
                  }}
                >
                  {status === "sending" ? "Reserving…" : "Claim my free month"}
                </button>
              )}
            </div>

            <p
              id={noteId}
              role={status === "error" ? "alert" : "status"}
              aria-live="polite"
              className={`mt-3 text-[0.85rem] leading-relaxed ${
                align === "center" ? "" : "max-w-[58ch]"
              }`}
              style={{ color: status === "error" ? "var(--clay)" : inkSoft }}
            >
              {errorReason === "invalid" ? (
                "That does not look like an email address. Check it and try again."
              ) : errorReason ? (
                <>
                  That request did not leave your browser. Try again, or {""}
                  <a
                    href={`mailto:${site.supportEmail}`}
                    className="font-bold underline decoration-1 underline-offset-4 hover:no-underline"
                  >
                    email Rafiq support
                  </a>
                  .
                </>
              ) : (
                "No card. One launch email. Nothing you look at leaves your phone."
              )}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
