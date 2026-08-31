import type { Metadata } from "next";

import { site } from "@/lib/site";

export type PublicPath = "/" | "/privacy" | "/terms" | "/delete-account";

const pages: Record<PublicPath, { title: string; description: string }> = {
  "/": {
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
  },
  "/privacy": {
    title: "Privacy Policy",
    description:
      "What Rafiq collects, what it deliberately never collects, and the choices you have. Content matching happens on your device and is never stored or sent.",
  },
  "/terms": {
    title: "Terms of Service",
    description:
      "The agreement for using Rafiq, including accounts, Android permissions, subscriptions, blocking behavior, and your responsibilities.",
  },
  "/delete-account": {
    title: "Delete your account",
    description:
      "How to delete your Rafiq account and everything stored with it—from inside the app, or by email if you have already uninstalled.",
  },
};

const socialImage = {
  url: `${site.url}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Rafiq — lower your gaze, take back your time. Available now on Google Play.",
};

export function canonicalUrl(path: PublicPath): string {
  const trailingPath = path === "/" ? "/" : `${path}/`;
  return new URL(trailingPath, `${site.url}/`).toString();
}

export function createPageMetadata(path: PublicPath): Metadata {
  const page = pages[path];
  const canonical = canonicalUrl(path);
  const socialTitle = path === "/" ? page.title : `${page.title} · ${site.name}`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: socialTitle,
      description: page.description,
      url: canonical,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: page.description,
      images: [socialImage],
    },
  };
}
