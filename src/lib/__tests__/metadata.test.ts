import { describe, expect, it } from "vitest";

import { createPageMetadata, type PublicPath } from "@/lib/metadata";

const base = "https://www.rafiqguardian.app";
const socialImage = `${base}/opengraph-image`;
const socialImageAlt =
  "Rafiq — lower your gaze, take back your time. Available now on Google Play.";

const cases: Array<{
  path: PublicPath;
  canonical: string;
  title: string;
  socialTitle: string;
  description: string;
}> = [
  {
    path: "/",
    canonical: `${base}/`,
    title: "Rafiq Guardian: Islamic Adult Content & Reels Blocker",
    socialTitle: "Rafiq Guardian: Islamic Adult Content & Reels Blocker",
    description:
      "Rafiq is an Islamic porn and adult content blocker for Android. It blocks Shorts and Reels and holds your screen-time limits. Matching stays on your phone.",
  },
  {
    path: "/privacy",
    canonical: `${base}/privacy/`,
    title: "Privacy Policy",
    socialTitle: "Privacy Policy · Rafiq",
    description:
      "What Rafiq collects, what it deliberately never collects, and the choices you have. Content matching happens on your device and is never stored or sent.",
  },
  {
    path: "/terms",
    canonical: `${base}/terms/`,
    title: "Terms of Service",
    socialTitle: "Terms of Service · Rafiq",
    description:
      "The agreement for using Rafiq, including accounts, Android permissions, subscriptions, blocking behavior, and your responsibilities.",
  },
  {
    path: "/delete-account",
    canonical: `${base}/delete-account/`,
    title: "Delete your account",
    socialTitle: "Delete your account · Rafiq",
    description:
      "How to delete your Rafiq account and everything stored with it—from inside the app, or by email if you have already uninstalled.",
  },
];

describe("public route metadata", () => {
  it.each(cases)("builds exact metadata for $path", (page) => {
    const metadata = createPageMetadata(page.path);

    expect(metadata.title).toBe(page.title);
    expect(metadata.description).toBe(page.description);
    expect(metadata.alternates?.canonical).toBe(page.canonical);
    expect(metadata.openGraph).toMatchObject({
      type: "website",
      siteName: "Rafiq",
      title: page.socialTitle,
      description: page.description,
      url: page.canonical,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: page.socialTitle,
      description: page.description,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    });
    expect(JSON.stringify(metadata)).not.toContain("rafiq.app");
  });

  it("keeps the homepage title and description short enough to show in full", () => {
    const home = createPageMetadata("/");

    expect(String(home.title).length).toBeLessThanOrEqual(60);
    expect(String(home.description).length).toBeLessThanOrEqual(160);
  });
});
