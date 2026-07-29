export const site = {
  name: "Rafiq",
  tagline: "Lower your gaze. Take back your time.",
  description:
    "Rafiq is an Android app that blocks adult content and short-video feeds, and holds the screen-time limits you set for yourself. Every match happens on your device. Nothing you look at is ever stored or sent.",
  url: "https://rafiq.app",
  supportEmail: "rafiq@support.com",

  /*
   * The Play listing does not exist yet: LAUNCH.md §0 requires a 14-day closed
   * test with 12+ testers before production access can even be requested.
   * Point `playStore` at the real listing the day it goes live and the whole
   * page switches from early-access wording to a download CTA.
   */
  playStore: null as string | null,
  earlyAccessUrl: "mailto:rafiq@support.com?subject=Rafiq%20early%20access",

  /*
   * Early-access capture. The site is a static export, so there is no server
   * of ours to post to: the signup form posts straight into a Google Form,
   * which drops every address into a Sheet you own and can export as CSV.
   *
   * To wire it up, make a Google Form with exactly one required short-answer
   * question for the email address, then fill both fields in:
   *
   *   action   the form's POST endpoint. Take the /viewform URL of the live
   *            form and swap the last segment for `formResponse`.
   *   field    that question's entry id. On the live form use the ⋮ menu,
   *            "Get pre-filled link", type anything, press "Get link", and
   *            read `entry.NNNNNNNNNN` out of the URL it copies.
   *
   * Leave Google's own "Collect email addresses" setting OFF. It forces a
   * sign-in on the hosted form and rejects anonymous posts like ours.
   *
   * While `action` is null every CTA falls back to `earlyAccessUrl`, so the
   * page never shows a form that quietly drops what people type into it.
   */
  earlyAccess: {
    action: null as string | null,
    field: "entry.0000000000",
  },

  minAndroid: "8.1",
} as const;

export const pricing = {
  trialDays: 14,
  monthly: { price: "$4.99", period: "per month" },
  annual: { price: "$35.99", period: "per year", perMonth: "$3.00 / month", saving: "Save 40%" },
} as const;

/*
 * Section anchors, stored without a path. The nav resolves them against the
 * current route: a bare `#pause` on the legal pages would do nothing, since the
 * section it points at only exists on the landing page.
 */
export const nav = [
  { label: "The pause", hash: "#pause" },
  { label: "Protection", hash: "#protection" },
  { label: "Privacy", hash: "#privacy" },
  { label: "Pricing", hash: "#pricing" },
] as const;
