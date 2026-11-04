# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Rafiq is for Muslims using Android who want voluntary, practical help lowering their gaze, interrupting short-video loops, and keeping app limits they chose for themselves. The primary website visitor is evaluating the live app and needs to understand what it blocks, why Android Accessibility access is required, whether browsing data leaves the phone, and whether to install it from Google Play.

## Product Purpose

Rafiq helps a person put a deliberate pause between an impulse and an action. It blocks known adult-content destinations and searches, recognises Shorts/Reels-style feeds, and enforces daily app limits. Website success means a qualified visitor understands that mechanism and confidently opens the Google Play listing to install the app.

## Positioning

Rafiq is a steadfast companion rather than a punitive lock. Its block screen returns a quiet pause, dhikr, and an eventual conscious choice. Matching and enforcement happen on the Android device instead of sending inspected browsing content to a remote filtering service.

## Operating Context

The product is live on Google Play at `https://play.google.com/store/apps/details?id=com.rafiqgaurdian.app`. The website is a statically exported Next.js application deployed from the `main` Git branch to Vercel. The production origin is `https://www.rafiqguardian.app`; the apex domain and the old `rafiq-website-beryl.vercel.app` alias redirect to it.

Every acquisition action leads directly to the public Google Play listing. The website does not collect email addresses or maintain a waitlist. Google Play and the Android app own installation, current purchase terms, and subscription fulfillment.

## Capabilities and Constraints

- Android 8.1 is the current minimum supported version.
- Rafiq blocks matched adult-content domains and keywords, Shorts/Reels-style feeds, and apps whose configured daily limit is spent.
- Matching, configured limits, streaks, and local progress data are designed to remain on the device. Network access is used for blocklist updates and optional account/subscription functions described by the legal documents.
- Android Accessibility permission is required to inspect the small amount of on-screen context needed for blocking. Protection stops when that permission is removed.
- The website is a static export with no first-party acquisition backend or email-capture form.
- `site.playStore` is the canonical acquisition destination for every install action.

## Brand Commitments

The product name is Rafiq—“companion.” Preserve the existing crescent/calligraphy mark, warm olive/clay/gold identity, real Android product screens, Plus Jakarta Sans interface type, Amiri Arabic type, and respectful presentation of complete scripture with translation and reference. The voice is spiritually grounded, candid, compassionate, and direct; it never shames, threatens, gamifies worship, or manufactures urgency.

## Evidence on Hand

- Real product screens live in `public/screens/` with intrinsic dimensions in `src/lib/screens.ts`.
- The brand mark and patterns live in `public/brand/`.
- Qur'an and hadith passages with references live in `src/lib/scripture.ts`.
- The Privacy Policy and Terms are copied from the Android project into `src/content/`.
- The confirmed Google Play listing URL is public acquisition configuration in `src/lib/site.ts`.
- No testimonials, customer counts, ratings, press, or efficacy benchmarks are available. Future website work must not fabricate them.

## Product Principles

1. Earn trust before asking for commitment.
2. Add friction to reflexes without taking away informed choice.
3. Keep sensitive matching on the device and explain that boundary precisely.
4. Prefer one honest promise over many marketing claims.
5. Treat sacred text as meaning, never decoration.

## Accessibility & Inclusion

The website must remain understandable and operable with keyboard navigation, screen readers, 200% zoom, reduced motion, dark mode, and JavaScript unavailable. Arabic text keeps its language and direction metadata. Motion may clarify sequence but never gate content or action.
