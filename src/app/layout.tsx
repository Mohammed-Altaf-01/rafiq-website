import type { Metadata, Viewport } from "next";
import { Amiri, Plus_Jakarta_Sans } from "next/font/google";

import { MotionProvider } from "@/components/motion-provider";
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
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    url: site.url,
    images: [{ url: "/brand/app-icon.png", width: 512, height: 512, alt: "Rafiq" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    images: ["/brand/app-icon.png"],
  },
  icons: {
    icon: [{ url: "/brand/app-icon.png", type: "image/png" }],
    apple: "/brand/app-icon.png",
  },
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
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
