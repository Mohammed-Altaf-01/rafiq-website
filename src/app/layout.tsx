import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Amiri, Plus_Jakarta_Sans } from "next/font/google";

import { MotionProvider } from "@/components/motion-provider";
import { SkipLink } from "@/components/site/skip-link";
import { ThemeScript } from "@/components/theme-script";
import { site } from "@/lib/site";

import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "lower your gaze",
    "content blocker",
    "Muslim app",
    "screen time",
    "block Shorts and Reels",
    "Android",
  ],
  // The link preview card. `og:image` is deliberately NOT listed here: the
  // `opengraph-image.png` file next to this one is picked up by Next's file
  // convention, which emits the URL along with `og:image:type`, `:width` and
  // `:height` read from the file itself, and the alt text from
  // `opengraph-image.alt.txt`. WhatsApp in particular ignores a card whose
  // dimensions it cannot learn without downloading the image first.
  //
  // To swap in a different banner, overwrite `src/app/opengraph-image.png`.
  // Keep it 1200x630 (the 1.91:1 that X, WhatsApp, Slack and iMessage all
  // crop to) and under ~300KB, or WhatsApp silently drops the thumbnail.
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
  },
  // The canonical URL. Without it, a link shared with tracking junk on the end
  // (?utm_source=…, WhatsApp's own appended params) can be scraped as a
  // separate page, so the crawler caches an empty card against that variant.
  alternates: {
    canonical: "/",
  },
  // Tab and home-screen icons come from the favicon.ico / icon.png /
  // apple-icon.png files in this directory, which Next links automatically.
};

// Cream, unconditionally: the page itself loads light regardless of the OS
// preference, so keying the browser chrome to `prefers-color-scheme` would tint
// it dark above a light page.
export const viewport: Viewport = {
  themeColor: "#f6f1e7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `data-scroll-behavior` tells the router the smooth scrolling in
    // globals.css is deliberate, so it suppresses it during route changes
    // instead of gliding the reader down a document they just navigated to.
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${jakarta.variable} ${amiri.variable}`}>
        <SkipLink />
        <MotionProvider>{children}</MotionProvider>

        {/*
          Page views only, and no cookies or identifiers — which is the whole
          reason this and not a general-purpose analytics suite, on a site whose
          pitch is that nothing about you is collected.

          The script it loads is served from `/_vercel/insights/script.js` by
          Vercel's edge, so it only reports anything when the site is deployed
          on Vercel with Web Analytics enabled for the project. On Firebase
          Hosting that path 404s and nothing is recorded.
        */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
