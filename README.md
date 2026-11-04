# Rafiq marketing site

The conversion-focused, statically exported website for Rafiq, an Android app
that blocks adult content and short-video feeds and holds the screen-time limits
people set for themselves.

Public routes:

- `/` — landing page and Google Play acquisition journey
- `/privacy/` — Privacy Policy
- `/terms/` — Terms of Service
- `/delete-account/` — account-deletion instructions

## Production

The production URL is
[`https://www.rafiqguardian.app`](https://www.rafiqguardian.app). It is the source
of truth for canonical links, Open Graph data, JSON-LD, robots, sitemap, and hosted
legal links. The apex domain redirects to it in Vercel's domain settings, and the
old `rafiq-website-beryl.vercel.app` alias redirects to it through `vercel.json`.

Vercel is connected to this Git repository. A verified push to `main` triggers
the production deployment; there is no separate manual hosting command. The
Next.js configuration uses `output: "export"`, and `npm run build` writes the
deployable artifact to `out/`.

## Google Play acquisition

Rafiq is live at
[`https://play.google.com/store/apps/details?id=com.rafiqgaurdian.app`](https://play.google.com/store/apps/details?id=com.rafiqgaurdian.app).
That exact URL is configured once at `site.playStore` in `src/lib/site.ts` and
is the destination for the hero, navigation, download, closing, and 404-page
actions.

The marketing site does not collect an email address or keep acquisition data
in local storage. Google Play handles installation and presents current purchase
terms. The website records only privacy-safe, categorical CTA click events in
Vercel Analytics.

## Local development

The supported Node.js range is exactly
`^20.19.0 || ^22.12.0 || >=24.0.0`. It matches the installed build and test
toolchain; odd-numbered releases below 24 are intentionally not included.

```bash
npm ci
npm run dev        # http://localhost:3000
npm run build      # static export in ./out
```

Stack: Next.js 16 App Router, React 19, Tailwind CSS v4, Motion, Phosphor icons,
Vercel Analytics, Vercel Speed Insights, Plus Jakarta Sans, and Amiri. Motion is
the only general-purpose animation library. Essential content and every Google
Play link remain present in the static HTML; client-side motion enhances the
page after hydration and respects reduced-motion preferences.

## Store-link operations

`PlayStoreLink` in `src/components/ui/play-store-link.tsx` is the shared action.
It supplies the Play icon, consistent visual states, the exact listing URL, and
the controlled analytics event. Keep acquisition links on this component so a
future listing migration remains one configuration change.

The release check verifies that at least four direct store actions exist in the
exported homepage, that each includes the store icon, and that no email form or
retired Google Form endpoint remains.

## Analytics and conversion measurement

Vercel Analytics receives only a controlled event name and categorical source.
There is no email field on the marketing site.

| Event | Meaning | Properties |
| --- | --- | --- |
| `play_store_click` | A visitor opened the Google Play listing | `source: hero \| download \| nav \| closing \| not_found` |

These events establish the real conversion baseline. They do not imply or
guarantee a particular conversion percentage.

## Verification and release

`npm run verify` is the local release gate. It runs the unit/component suite,
ESLint, a production build, and artifact checks.

```bash
npm run test
npm run lint
npm run build
npm run verify:static
npm audit --omit=dev

# Complete local gate
npm run verify
```

`verify:static` inspects the real `out/` files. It checks public routes,
route-specific canonicals and sharing URLs, internal anchors, initial content
visibility, removal of stale pre-launch claims and forms, direct Google Play
actions and icons, social-image dimensions and size, crawl files, and the
homepage JavaScript gzip budget.

Release procedure:

1. run the full local gate and inspect `git diff --check`;
2. commit only the intended files and confirm the worktree is clean;
3. push `main` without force;
4. wait for the Vercel deployment whose Git SHA matches the push;
5. verify both its immutable URL and the stable production alias in a browser.

## Content and design sources

- Screens in `public/screens/` are real Rafiq design renders. Their true
  dimensions live in `src/lib/screens.ts`.
- Brand assets live in `public/brand/`; the calligraphic mark needs its warm
  plate on dark surfaces because the lettering is negative space.
- Legal prose in `src/content/` mirrors the app documents. At build time,
  `src/lib/legal.ts` replaces only the deployment-owned account-deletion URL so
  it cannot point visitors to the unrelated `rafiq.app` domain.
- Qur'an and hadith sources live in `src/lib/scripture.ts` with references.
- Design tokens and theme behavior live in `src/app/globals.css`, `DESIGN.md`,
  and `.impeccable/design.json`.

The published support address is intentionally taken verbatim from the legal
documents: `support@rafiqguardian.app`. Confirm that inbox remains monitored
while the app and its public listing remain live.
