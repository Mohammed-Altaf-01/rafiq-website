import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  CheckIcon,
  ClockIcon,
  DeviceMobileIcon,
  EnvelopeSimpleIcon,
  ProhibitIcon,
  WarningIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { Footer } from "@/components/site/footer";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { PrimaryButton } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = createPageMetadata("/delete-account");

/*
 * This page exists for the Play Console "App content → Data safety → Data
 * deletion" field, which only accepts an https URL: it has to be readable with
 * no sign-in and no install, so a mailto: link or the in-app screen alone does
 * not satisfy it. Google's reviewers look for four things here, so all four are
 * spelled out below: the in-app route, a route that still works after the app
 * is gone, exactly what the deletion covers, and what survives it with a reason
 * and a retention period.
 */

const inAppSteps = [
  "Open Rafiq and go to Settings.",
  "Tap Account.",
  "Tap Delete account.",
  "Confirm. Your account and everything synced with it are removed straight away.",
];

const deleted = [
  "Your account itself — the anonymous Firebase identifier, or, if you signed in with Google, your email address, display name, profile photo and Google account ID",
  "Your cloud profile and settings: limits, schedules, blocked categories and app choices",
  "Your streak, dhikr count and block counts",
  "Your subscriber record with RevenueCat, including any attributes attached to it",
  "Any support email you sent us about your account",
];

const kept = [
  {
    what: "Google Play purchase records",
    why: "Held by Google, not by us, and required for tax and refund law. We cannot delete these, and neither can you.",
    how: "Kept by Google under their retention policy.",
  },
  {
    what: "Analytics counts already stripped of your identifier",
    why: "Aggregate event counts, like how many people finished onboarding. Nothing in them points back to you once your account is gone.",
    how: "Deleted automatically by Firebase Analytics after roughly 14 months.",
  },
  {
    what: "Crash reports",
    why: "Stack traces, device model and OS version, used to fix bugs. They never contain screen text or anything you viewed.",
    how: "Deleted automatically by Crashlytics after roughly 90 days.",
  },
];

/** Prefilled so the request arrives with the one thing we need to verify it. */
const deletionMailto =
  `mailto:${site.supportEmail}` +
  `?subject=${encodeURIComponent("Delete my Rafiq account")}` +
  `&body=${encodeURIComponent(
    "Please delete my Rafiq account and all data stored with it.\n\n" +
      "Account email (or Google account) used in Rafiq:\n\n" +
      "I understand this cannot be undone.\n",
  )}`;

export default function DeleteAccountPage() {
  return (
    <>
      <main id="main-content" tabIndex={-1} className="px-5 pt-11 pb-24 sm:px-8">
        {/* Same chrome as the policy pages: a way back, a theme toggle, no nav. */}
        <div className="mx-auto flex max-w-[880px] items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.88rem] font-semibold text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeftIcon size={15} />
            Back to Rafiq
          </Link>

          <ThemeToggle />
        </div>

        <header className="mx-auto mt-12 max-w-[880px]">
          <p className="overline text-gold">Rafiq for Android</p>
          <h1 className="display mt-4 text-[2.5rem] sm:text-[3.25rem]">
            Delete your account
          </h1>
          <p className="mt-6 max-w-[60ch] text-[1.02rem] leading-relaxed text-ink-soft sm:text-[1.1rem]">
            You can delete your Rafiq account and everything stored with it at any time, with
            no need to ask us first. There are two ways to do it — one inside the app, one that
            still works if you have already uninstalled it.
          </p>
        </header>

        <div className="mx-auto mt-14 grid max-w-[880px] gap-5 md:grid-cols-2">
          <section
            className="rounded-[var(--radius-card)] p-7"
            style={{ background: "var(--card)", boxShadow: "inset 0 0 0 1px var(--line)" }}
          >
            <DeviceMobileIcon size={24} style={{ color: "var(--primary)" }} />
            <h2 className="mt-4 text-[1.15rem] font-extrabold tracking-tight">
              In the app
            </h2>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-faint">
              Immediate, and the option we recommend.
            </p>
            <ol className="mt-6 space-y-3">
              {inAppSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3.5">
                  <span
                    className="mt-[1px] flex size-[22px] shrink-0 items-center justify-center rounded-full text-[0.75rem] font-bold"
                    style={{ background: "var(--surface)", color: "var(--ink-faint)" }}
                  >
                    {index + 1}
                  </span>
                  <span className="text-[0.95rem] leading-relaxed text-ink-soft">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section
            className="rounded-[var(--radius-card)] p-7"
            style={{ background: "var(--card)", boxShadow: "inset 0 0 0 1px var(--line)" }}
          >
            <EnvelopeSimpleIcon size={24} style={{ color: "var(--primary)" }} />
            <h2 className="mt-4 text-[1.15rem] font-extrabold tracking-tight">
              By email
            </h2>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-faint">
              For anyone who has already removed the app, or cannot reach that screen.
            </p>
            <p className="mt-6 text-[0.95rem] leading-relaxed text-ink-soft">
              Send us a request from the email address tied to your account — that address is
              how we confirm the request is really yours. We reply to confirm, and the deletion
              is done within 30 days of the request, usually within 72 hours.
            </p>

            <PrimaryButton href={deletionMailto} className="mt-7 w-full">
              Request deletion by email
            </PrimaryButton>

            <p className="mt-4 text-[0.85rem] leading-relaxed text-ink-faint">
              Or write to{" "}
              <a
                href={`mailto:${site.supportEmail}`}
                className="font-semibold underline decoration-1 underline-offset-4"
                style={{ color: "var(--primary)" }}
              >
                {site.supportEmail}
              </a>{" "}
              yourself, with &ldquo;Delete my Rafiq account&rdquo; as the subject.
            </p>
          </section>
        </div>

        <section className="mx-auto mt-20 max-w-[880px]">
          <h2 className="display text-[1.85rem] sm:text-[2.25rem]">What deletion covers</h2>
          <p className="mt-4 max-w-[60ch] text-[1rem] leading-relaxed text-ink-soft">
            Either route deletes the same things. It cannot be undone, and we cannot restore an
            account once it is gone.
          </p>

          <div className="mt-10 grid gap-x-14 gap-y-12 md:grid-cols-2">
            <div>
              <h3 className="text-[1.05rem] font-extrabold tracking-tight">Deleted</h3>
              <ul className="mt-5 space-y-4">
                {deleted.map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <CheckIcon
                      size={18}
                      className="mt-[5px] shrink-0"
                      style={{ color: "var(--primary)" }}
                    />
                    <span className="text-[0.95rem] leading-relaxed text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[1.05rem] font-extrabold tracking-tight">
                Kept, and why
              </h3>
              <ul className="mt-5 space-y-6">
                {kept.map((item) => (
                  <li key={item.what} className="flex items-start gap-3.5">
                    <ProhibitIcon
                      size={18}
                      className="mt-[5px] shrink-0"
                      style={{ color: "var(--clay)" }}
                    />
                    <div>
                      <p className="text-[0.95rem] font-semibold text-ink">{item.what}</p>
                      <p className="mt-1 text-[0.92rem] leading-relaxed text-ink-soft">
                        {item.why}
                      </p>
                      <p className="mt-1.5 flex items-center gap-1.5 text-[0.85rem] text-ink-faint">
                        <ClockIcon size={14} className="shrink-0" />
                        {item.how}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className="mx-auto mt-16 max-w-[880px] rounded-[var(--radius-card)] p-7"
          style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--line)" }}
        >
          <div className="flex items-start gap-3.5">
            <WarningIcon size={22} className="mt-[2px] shrink-0" style={{ color: "var(--clay)" }} />
            <div>
              <h2 className="text-[1.05rem] font-extrabold tracking-tight">
                Cancel your subscription first
              </h2>
              <p className="mt-2 max-w-[62ch] text-[0.95rem] leading-relaxed text-ink-soft">
                A Rafiq subscription is billed by Google Play, not by us, so deleting your
                account does not cancel it and does not stop it renewing. Cancel it in the Play
                Store before you delete, otherwise Google keeps charging the card.
              </p>
              <a
                href="https://play.google.com/store/account/subscriptions"
                className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold underline decoration-1 underline-offset-4"
                style={{ color: "var(--primary)" }}
              >
                Manage subscriptions on Google Play
                <ArrowUpRightIcon size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-[880px]">
          <h2 className="display text-[1.85rem] sm:text-[2.25rem]">
            What was never ours to delete
          </h2>
          <p className="mt-4 max-w-[62ch] text-[1rem] leading-relaxed text-ink-soft">
            Rafiq matches content on your device, in memory, and drops it within a fraction of
            a second. The pages you visited, what you searched for and anything you typed were
            never stored and never sent to us, so there is nothing of that kind for us to
            delete. Uninstalling the app removes what stays on the phone — the blocklists and
            your local settings — with it.
          </p>
          <p className="mt-6 text-[1rem] leading-relaxed text-ink-soft">
            The full detail is in the{" "}
            <Link
              href="/privacy"
              className="font-semibold underline decoration-1 underline-offset-4"
              style={{ color: "var(--primary)" }}
            >
              Privacy Policy
            </Link>
            . Anything else, write to{" "}
            <a
              href={`mailto:${site.supportEmail}`}
              className="font-semibold underline decoration-1 underline-offset-4"
              style={{ color: "var(--primary)" }}
            >
              {site.supportEmail}
            </a>
            .
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
