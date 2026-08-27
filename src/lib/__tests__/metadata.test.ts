import { describe, expect, it } from "vitest";

import { createPageMetadata, type PublicPath } from "@/lib/metadata";

const base = "https://rafiq-website-beryl.vercel.app";
const socialImage = `${base}/opengraph-image`;
const socialImageAlt =
  "Rafiq — lower your gaze, take back your time, and get 30 days Premium free.";

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
    title: "Rafiq: Lower your gaze. Take back your time.",
    socialTitle: "Rafiq: Lower your gaze. Take back your time.",
    description:
      "Rafiq is an Android app that blocks adult content and short-video feeds, and holds the screen-time limits you set for yourself. Every match happens on your device. Nothing you look at is ever stored or sent.",
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
});
