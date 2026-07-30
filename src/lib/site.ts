export const site = {
  name: "Rafiq",
  tagline: "Lower your gaze. Take back your time.",
  description:
    "Rafiq is an Android app that blocks adult content and short-video feeds, and holds the screen-time limits you set for yourself. Every match happens on your device. Nothing you look at is ever stored or sent.",
  url: "https://rafiq.app",
  supportEmail: "rafiqgaurdian@gmail.com",

  /*
   * The Play listing does not exist yet: LAUNCH.md §0 requires a 14-day closed
   * test with 12+ testers before production access can even be requested.
   * Point `playStore` at the real listing the day it goes live and the whole
   * page switches from early-access wording to a download CTA.
   */
  playStore: null as string | null,
  earlyAccessUrl: "mailto:rafiqgaurdian@gmail.com?subject=Rafiq%20early%20access",

  /*
   * Early-access capture. The site is a static export, so there is no server
   * of ours to post to: the signup form posts straight into a Google Form
   * (https://forms.gle/PBWtKF2EwhHw2d4YA), which drops every address into the
   * Sheet behind it and can be exported as CSV.
   *
   *   action   the form's POST endpoint — its /viewform URL with the last
   *            segment swapped for `formResponse`.
   *   field    the entry id of the required "Email" question.
   *
   * The form carries a second, optional question ("Anything that you would
   * like to tell Us?", entry.839337160). The site does not post it: the hero
   * asks for one thing. Anyone who wants to say more can open the form itself.
   *
   * Three settings under Settings → Responses each make Google demand a
   * signed-in Google account before it will accept a submission, which answers
   * every anonymous post from this site with a 401 and records nothing:
   * "Collect email addresses: Verified", "Allow response editing", and
   * "Limit to 1 response". All three have to stay off. Turning any of them on
   * breaks signup silently — the form still opens for anyone, and the site
   * cannot see the rejection (see `submitEarlyAccess`).
   *
   * `npm run verify:form -- --submit` posts a probe address and reads the real
   * status code. Run it after touching the form.
   *
   * While `action` is null every CTA falls back to `earlyAccessUrl`, so the
   * page never shows a form that quietly drops what people type into it.
   */
  earlyAccess: {
    action:
      "https://docs.google.com/forms/d/e/1FAIpQLSfpNMJaXgnurO4chFT8YrJG3qn3hx6H693O5TmHDr8v5kloxw/formResponse" as
        | string
        | null,
    field: "entry.1045781291",
  },

  minAndroid: "8.1",
} as const;

export const pricing = {
  trialDays: 7,
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
