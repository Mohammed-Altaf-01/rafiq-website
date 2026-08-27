# Rafiq marketing site

The conversion-focused, statically exported website for Rafiq, an Android app
that blocks adult content and short-video feeds and holds the screen-time limits
people set for themselves.

Public routes:

- `/` — landing page and early-access claim
- `/privacy/` — Privacy Policy
- `/terms/` — Terms of Service
- `/delete-account/` — account-deletion instructions

## Production

The current production URL is
[`https://rafiq-website-beryl.vercel.app`](https://rafiq-website-beryl.vercel.app).
There is no connected custom domain yet. Until one is connected and verified,
that Vercel URL is the source of truth for canonical links, Open Graph data,
robots, sitemap, and hosted legal links.

Vercel is connected to this Git repository. A verified push to `main` triggers
the production deployment; there is no separate manual hosting command. The
Next.js configuration uses `output: "export"`, and `npm run build` writes the
deployable artifact to `out/`.

## Early-access promise

Submitting an email before launch reserves **30 days of the full Rafiq Premium
experience**, with no payment card required. The response Sheet linked to the
Google Form is the eligibility record. The website records the claim; it does
not grant an in-app entitlement itself.

At launch, the product owner must:

1. use the Sheet as the complete eligibility list;
2. send every eligible address the promised launch email and redemption steps;
3. make those steps grant the full 30-day access described on the site; and
4. keep addresses private and use them only for this launch promise unless the
   person separately consents to something else.

This fulfillment step is part of the offer. Shipping the app without the launch
email and a working redemption path would break the promise made by the site.

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
the only general-purpose animation library. Essential content and both email
forms remain present in the static HTML; client-side motion enhances them after
hydration and respects reduced-motion preferences.

## Google Form operations

The hero and free-month forms post directly to the Google Form configured at
`site.offer.action` in `src/lib/site.ts`. Both use the field name in
`site.offer.field`. The linked response Sheet is the launch eligibility list.

Keep these Google Form settings off because each can require a signed-in Google
account and reject anonymous website requests:

- **Collect email addresses: Verified**
- **Allow response editing**
- **Limit to 1 response**

Run the read-only configuration check after changing the form or its source
configuration:

```bash
npm run verify:form
```

That command checks public reachability and the configured field. It submits no
address, writes no Sheet row, and does **not** prove that Google recorded a
submission.

There is a separate end-to-end probe:

```bash
npm run verify:form -- --submit
```

The probe writes `probe+<timestamp>@rafiq.invalid` into the real Sheet and reads
Google's status response. Run it only with explicit approval, then delete the
probe row. It is intentionally not part of the normal release gate.

Browser submissions use `mode: "no-cors"`, so the response is opaque. The UI
and analytics therefore say **request sent**, never “Google verified the row.”
A network rejection is still shown as an error. The submitted address is
remembered only in that browser's `localStorage` so the second form and return
visits do not ask again.

## Analytics and conversion measurement

Vercel Analytics receives only controlled event names and categorical
properties. Email addresses are never included.

| Event | Meaning | Properties |
| --- | --- | --- |
| `early_access_form_view` | A form became meaningfully visible | `source: hero \| offer` |
| `early_access_submit` | A valid submission attempt began | `source` |
| `early_access_request_sent` | The browser request completed without a network rejection | `source` |
| `early_access_invalid` | Client validation rejected the address shape | `source` |
| `early_access_error` | A controlled network/configuration failure occurred | `source`, `reason` |
| `early_access_email_change` | The visitor cleared the locally remembered address | `source` |
| `offer_cta_click` | Navigation or closing copy sent a visitor to the offer | `source: nav \| closing` |

These events establish the real conversion baseline. They do not imply or
guarantee a particular conversion percentage.

## Verification and release

`npm run verify` is the local release gate. It runs the unit/component suite,
ESLint, a production build, artifact checks, and the read-only form
configuration check.

```bash
npm run test
npm run lint
npm run build
npm run verify:static
npm run verify:form
npm audit --omit=dev

# Complete local gate
npm run verify
```

`verify:static` inspects the real `out/` files. It checks public routes,
route-specific canonicals and sharing URLs, internal anchors, initial content
visibility, removal of stale commercial claims, social-image dimensions and
size, crawl files, and the homepage JavaScript gzip budget.

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
  it cannot point visitors to an unrelated domain before Rafiq has one.
- Qur'an and hadith sources live in `src/lib/scripture.ts` with references.
- Design tokens and theme behavior live in `src/app/globals.css`, `DESIGN.md`,
  and `.impeccable/design.json`.

The published support address is intentionally taken verbatim from the legal
documents: `rafiqgaurdian@gmail.com`. Confirm that inbox remains monitored
before an app-store submission or launch email.
