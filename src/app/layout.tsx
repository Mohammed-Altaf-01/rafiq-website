import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Amiri, Plus_Jakarta_Sans } from "next/font/google";

import { MotionProvider } from "@/components/motion-provider";
import { SkipLink } from "@/components/site/skip-link";
import { ThemeScript } from "@/components/theme-script";
import { createPageMetadata } from "@/lib/metadata";
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
  weight: "400",
  variable: "--font-amiri",
  display: "swap",
  // The Arabic sits below the fold everywhere, so it must not compete with the hero.
  preload: false,
});

const homeMetadata = createPageMetadata("/");

export const metadata: Metadata = {
  ...homeMetadata,
  metadataBase: new URL(site.url),
  title: {
    default: site.homeTitle,
    template: `%s · ${site.name}`,
  },
  applicationName: site.name,
  keywords: [
    "Rafiq",
    "Rafiq Guardian",
    "Islamic adult content blocker",
    "Islamic porn blocker",
    "porn blocker for Muslims",
    "lower your gaze",
    "block Shorts and Reels",
    "screen time limits",
    "Android",
  ],
  robots: { googleBot: { "max-image-preview": "large" } },
  // The route helper supplies canonical, Open Graph, Twitter, and image data.
  // opengraph-image.tsx generates the shared social card at that image URL.
  // Tab and home-screen icons come from the favicon.ico / icon.png /
  // apple-icon.png files in this directory, which Next links automatically.
};

// Cream by default: the page loads light regardless of the OS preference, so
// keying the browser chrome to `prefers-color-scheme` would tint it dark above a
// light page. ThemeToggle retints it for a visitor who chose dark.
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
