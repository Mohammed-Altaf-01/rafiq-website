export const site = {
  name: "Rafiq",
  alternateName: "Rafiq Guardian",
  tagline: "Lower your gaze. Take back your time.",
  homeTitle: "Rafiq Guardian: Islamic Adult Content & Reels Blocker",
  description:
    "Rafiq is an Islamic porn and adult content blocker for Android. It blocks Shorts and Reels and holds your screen-time limits. Matching stays on your phone.",
  url: "https://www.rafiqguardian.app",
  supportEmail: "support@rafiqguardian.app",
  playStore: "https://play.google.com/store/apps/details?id=com.rafiqgaurdian.app",

  minAndroid: "8.1",
} as const;

/*
 * Section anchors, stored without a path. The nav resolves them against the
 * current route: a bare `#how-it-works` on legal pages would do nothing, since the
 * section it points at only exists on the landing page.
 */
export const nav = [
  { label: "How it works", hash: "#how-it-works" },
  { label: "Protection", hash: "#protection" },
  { label: "Privacy", hash: "#privacy" },
  { label: "Get the app", hash: "#download" },
] as const;
