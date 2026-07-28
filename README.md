# Rafiq, marketing site

Landing page plus the two hosted legal documents Google Play requires before a
production release (`LAUNCH.md §8` in the app repo lists these as hard blockers).

- `/` landing page
- `/privacy` Privacy Policy
- `/terms` Terms of Service

## Stack

Next.js 16 (App Router, static export) · React 19 · Tailwind v4 · GSAP ScrollTrigger ·
Motion · Phosphor icons · Plus Jakarta Sans + Amiri via `next/font`.

Next.js was chosen over Vite because the two legal documents need real,
crawlable, per-route URLs for the Play Console Data Safety form. `output: "export"`
produces plain static HTML, so there is no Node server to run anywhere.

## Run it

```
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Deploy

`npm run build` writes `./out`. Anything that serves static files works. The
included `firebase.json` targets the Firebase project the app already uses:

```
npm run build
firebase deploy --only hosting
```

## Before going live

Three values in `src/lib/site.ts` are placeholders:

| Field | Today | What it needs |
| --- | --- | --- |
| `url` | `https://rafiq.app` | The real domain. It feeds `metadataBase`, Open Graph and the canonical URL. |
| `playStore` | `null` | The Play listing URL. Setting it flips every CTA on the page from "Get early access" to the download wording, in one edit. |
| `earlyAccessUrl` | a `mailto:` | Wherever early-access signups should actually go (closed-test opt-in link, a form). |

`supportEmail` is taken verbatim from the policy documents. Confirm that inbox is
live before submitting to Play, because both documents publish it as the contact
and the account-deletion route.

## Where the content comes from

Nothing on this site is invented product copy.

- **Screens** in `public/screens/` are the app's own design renders from
  `Rafiq/designs/`. They are real screens, not mock-ups built out of `div`s.
  Each one is cropped to its device rectangle and given an anti-aliased
  rounded-corner mask, so it sits on transparency with its own bezel intact.
  Do not knock the backdrop out by flooding a colour in from the corners: these
  renders have no real margin to work in, so the fill crosses the hairline bezel
  and eats the drop shadows inside the screen.
  `src/lib/screens.ts` is generated alongside them and carries each file's true
  size, because they are not all the same aspect ratio.
  Two of the source files need care. `adult_content_blocking_timerfinished.png`
  runs off the canvas on three sides, so it is hard-cropped to the screen alone;
  nothing is invented to replace the missing frame. And `blocking_screen_insta`
  / `blocking_screen_timebound` are named the other way round to what they show:
  `insta` is the spent daily budget, `timebound` is the short-video pause.
  Re-export them with `python3 scripts/prep-screens.py` (needs Pillow, and the
  app repo checked out beside this one).
- **The mark** in `public/brand/mark.png` is lifted from `Rafiq/artwork/rafiq_logo.png`
  by un-multiplying against its `#FBF6F0` card, per `AGENTS.md §3a`. The
  calligraphy is negative space, so `Mark` puts it on a warm plate whenever it
  sits on a dark surface. Never render it bare on espresso.
- **Legal text** in `src/content/` is a verbatim copy of
  `Rafiq/policies_and_terms/*.md`, parsed at build time. Re-copy those files when
  they change so the hosted wording can never drift from the in-app copy.
- **Pricing** matches the paywall screen: $4.99 monthly, $35.99 annual, 14-day trial.
- **Qur'an and hadith** live in `src/lib/scripture.ts`, each with its reference.

## Design system

Ported from `Rafiq/designs/rafiq_design_system_sheet.png` into CSS custom
properties in `src/app/globals.css`. Colour is driven entirely by those
properties, so there is no `dark:` utility strategy layered on top.

Two deviations from the sheet, both for contrast: on cream, the brand clay
`#C08457` and gold `#C9A24B` fall below 3:1, so text uses darkened forms and
`--clay-fill` / `--gold-fill` keep the brand values for rings and borders.

Radii are fixed: buttons are full-pill, cards 24px, tiles 18px, inputs 14px.

## Motion

GSAP drives the two scroll pieces (the hero parallax, and the pinned block-screen
sequence). Motion drives everything else. They are never mixed in one component
tree.

Reduced motion is decided once, by the `MotionConfig` in `MotionProvider`.
Do not put `useReducedMotion()` back into individual components to swap an
`initial` prop: the site is statically exported, so the hook is always false
when the HTML is written and true on a client that asked for reduced motion,
and React will not reconcile the attributes that fall out of that.

The pinned sequence is opt-in: it only appears once JavaScript has confirmed a
viewport of 768px or wider **and** that the visitor has not asked for reduced
motion. Everyone else, including anyone with JavaScript off, gets the same four
steps as a plain vertical list. Check that fallback when touching
`src/components/sections/pause.tsx`; it is easy to break and invisible in a
normal browser.
