# Rafiq Website Conversion Redesign

**Date:** 2026-08-27

**Status:** Approved for implementation

**Release target:** `main`, followed by the connected Vercel production deployment

**Resolved production metadata base:** `https://rafiq-website-beryl.vercel.app`

## Context

Rafiq's current website has a strong visual identity and credible product screenshots, but its acquisition funnel works against the visitor. The page is long, repeats similar product claims, asks for an email through several competing surfaces, and interrupts the first product explanation with a large modal. Pricing also competes with the pre-launch goal.

The redesign makes one action unmistakable: leave an email to reserve 30 days of full Rafiq Premium, with no card required. The site must earn that email by explaining the product clearly, demonstrating how it works, and resolving the privacy and Android Accessibility concerns that are unique to Rafiq.

The repository is deployed through Vercel, but no custom domain is connected yet. The implementation must discover and use the connected Vercel production URL for canonical metadata until a custom domain is actually configured. It must not continue claiming `https://rafiq.app` while that domain serves a different website.

## Approved Product Promise

The promotion is represented consistently as:

> Submit your email before launch to reserve 30 days of the full Rafiq Premium experience. No payment card is required.

Every successfully recorded email qualifies. The Google Form response Sheet is the eligibility record. The launch email will contain the instructions required to redeem the promotional access. Automating the in-app entitlement is outside this website repository; the website's responsibility is to record the claim accurately and communicate the promise without ambiguity.

Approved core copy:

- Hero eyebrow: **Android early access · 30 days Premium free**
- Primary CTA: **Claim my free month**
- Navigation CTA: **Get 30 days free**
- Offer heading: **Your first 30 days of Rafiq Premium are on us.**
- Success heading: **Your free month is reserved.**
- Reassurance: **No card. One launch email. Nothing you look at leaves your phone.**

## Goals

1. Make email submission the primary conversion event and the only commercial call to action before launch.
2. Explain Rafiq's value, operation, and privacy model quickly enough for mobile visitors to make a confident decision.
3. Remove pricing and replace it with the approved 30-day Premium offer.
4. Improve motion quality while reducing JavaScript, preserving content without JavaScript, and honoring reduced-motion preferences.
5. Correct existing accessibility, SEO, social-preview, dependency, form-fallback, and documentation defects.
6. Instrument the funnel so conversion changes can be measured by placement without collecting email addresses in analytics.
7. Ship a verified commit to `main` and confirm the resulting Vercel deployment.

## Non-Goals

- Inventing testimonials, user counts, ratings, countdowns, scarcity, endorsements, or efficacy claims.
- Adding a newsletter sequence. The promise remains one launch email unless the product owner explicitly changes it later.
- Building an entitlement backend or changing the Android app's billing implementation.
- Connecting or purchasing a custom domain during this change.
- Rewriting the legal policy content beyond metadata and navigation corrections required by the redesign.

## Success Criteria

### Funnel

- A visitor sees the 30-day offer, email field, primary CTA, and reassurance in the initial mobile hero.
- Pricing is absent from navigation, page content, FAQs, configuration, and website documentation.
- There is no automatic modal or other surface that blocks reading.
- The page contains two synchronized email forms at most: hero and dedicated offer section.
- Navigation and the closing CTA lead to the dedicated offer section.
- Funnel events distinguish hero and offer submissions without transmitting an email address.

### Experience

- At 390px width, the rendered landing page is at least 35% shorter than the audited 18,729px baseline.
- All essential content and both email forms remain visible and usable when JavaScript is unavailable.
- The page has no horizontal overflow at 320px, 390px, 768px, 1024px, or 1440px.
- Keyboard navigation, dark mode, 200% zoom, and reduced motion remain usable.
- The experience uses no more than one general-purpose animation library.

### Technical quality

- Tests, lint, production build, link/metadata checks, form configuration verification, and a production dependency audit pass.
- Exported HTML does not hide substantive content with `opacity: 0` before hydration.
- Each public route has the correct canonical URL and route-appropriate social metadata.
- The Open Graph image is 1200×630, reflects the new offer, and stays below 300 KiB.
- The deployed Vercel URL returns the new page after the verified commit is pushed to `main`.

The requested 80–90% landing-to-email rate remains an ambition, not a release assertion. Traffic intent and source strongly constrain achievable conversion. The release establishes a measurable baseline and removes known funnel friction; future changes should be evaluated against observed data.

## Information Architecture

The landing page is reorganized into a shorter narrative:

1. **Navigation** — wordmark, four section links, theme toggle, and a persistent offer CTA.
2. **Hero** — emotional promise, concrete product description, 30-day offer form, reassurance, and real app screens.
3. **Proof ribbon** — four compact claims: adult-content blocking, Shorts/Reels protection, app limits, and on-device matching.
4. **Mission** — one scripture-led full-bleed moment explaining why Rafiq exists.
5. **How the pause works** — a compact, accessible three-step product demonstration.
6. **Protection and privacy** — the hard-night use case, strict mode, offline enforcement, reboot resilience, and exact on-device privacy promise.
7. **Progress** — a concise outcome section showing streaks and time returned, using the journey screen.
8. **Free-month offer** — the dedicated conversion section replacing pricing, with form and eligibility explanation.
9. **FAQ** — five conversion-critical objections.
10. **Closing statement and footer** — emotionally resonant close, offer anchor, legal routes, support, and Android compatibility.

The proof ribbon, protection cards, progress section, and FAQ remain compact. Their purpose is objection resolution rather than exhaustive feature documentation.

## Section Design

### Navigation

- Links: **How it works**, **Protection**, **Privacy**, **Free month**.
- The desktop CTA reads **Get 30 days free** and targets `#free-month`.
- Mobile retains a visible path to the offer and an accessible menu.
- The menu closes on selection, Escape, and outside interaction, and returns focus logically.
- A skip link precedes the navigation.

### Hero

- Preserve the current brand palette, typography, star pattern, wordmark, and real app imagery.
- Keep the emotionally direct headline style, but make the supporting copy more concrete: adult content, Shorts/Reels, app limits, and on-device privacy.
- Put the offer label directly above the headline or form.
- Use one email field and **Claim my free month** as the dominant action.
- Keep **See how it works** as a secondary anchor, visually subordinate to submission.
- Do not place the fine print so far below the field that it appears unrelated.

### Proof ribbon

- Use four icon-and-label items with short, literal phrasing.
- Animate only the group arrival; do not animate every word or icon independently.
- Collapse into a two-by-two layout on phones.

### Mission

- Retain the Qur'an 24:30 passage and its translation as the single primary scripture moment.
- Sacred text remains complete, legible, and paired with its reference.
- Motion is restrained and never required to reveal or understand the passage.

### How the pause works

- Replace the long pinned GSAP sequence with an accessible three-state demonstration.
- States: **Caught before it loads**, **A pause instead of a loophole**, and **The rule keeps holding**.
- Real app screens update through a tab-like control on wide layouts.
- On mobile, controls and screen remain in a single reading flow without pinning several viewport heights.
- The active state is announced semantically and operable by keyboard.
- Screen changes use a short opacity/transform handoff and preserve a stable layout box.

### Protection and privacy

- Combine the strongest current content instead of repeating separate long sections.
- Lead with the emotional scenario: protection has to hold when the visitor stops wanting it to.
- Keep strict mode, offline operation, reboot resilience, and the dhikr pause.
- Present privacy as a precise contract: what is briefly inspected, what is stored, and what never leaves the device.
- Link to the full Privacy Policy.

### Progress

- Use the journey screen as the main visual.
- Limit supporting copy to three outcomes: an honest streak, patterns visible over time, and minutes returned.
- This section answers “what changes for me?” rather than listing more mechanics.

### Free-month offer

- Replace the pricing component and retain its position as the final commercial decision point.
- Display a large **30 days** visual marker, the approved offer heading, and three inclusions: strict blocking, hard app limits, and cross-app protection.
- State that email submission reserves eligibility and that redemption instructions arrive in the launch email.
- Include the second and final form instance.
- Do not display subscription prices, savings percentages, renewal pressure, or a countdown.

### FAQ

Keep five questions:

1. Why does Rafiq need Android Accessibility permission?
2. What exactly does it block?
3. Can protection be switched off?
4. Does it work offline, and does browsing data leave the phone?
5. How does the free month work, and what happens afterward?

The final answer explains that there is no card requirement and that the app falls back to its useful free tier when promotional Premium access ends.

## Email Capture Architecture

### Configuration

Move acquisition copy and behavior into a single configuration object containing:

- promotion active state;
- 30 Premium days;
- no-card requirement;
- Google Form action and entry field;
- support fallback;
- Play Store URL when available.

No component owns a separate duration string.

### Submission flow

1. The visitor enters an email.
2. Client validation rejects clearly malformed addresses after blur or submission, not during ordinary typing.
3. The honeypot blocks obvious automated submissions.
4. The client posts to the configured Google Form endpoint with `no-cors`.
5. When the request leaves the browser without a network rejection, the interface reports **Your free month is reserved** and synchronizes the second form.
6. The trimmed address is remembered locally to avoid asking again on that device.
7. The confirmation offers **Use a different email**. This clears the local remembered state and permits a corrected submission; it does not claim to delete the earlier Sheet row.

Because a `no-cors` response is opaque, the event and code terminology must say **request sent**, not imply that the browser verified the Google response. The repository's form-verification script remains the configuration safety check.

### Progressive enhancement

- Each form has a real `action`, `method="post"`, and input `name` matching the Google Form field.
- JavaScript intercepts the form only to provide validation, analytics, synchronized state, and inline confirmation.
- Without JavaScript, submission navigates to Google's response flow instead of silently reloading the landing page.
- If JavaScript detects a network rejection, the visitor receives a retry message and support-email fallback.

## Analytics

Continue using privacy-preserving Vercel Analytics. Never attach the email, raw URL query, or other personal data to an event.

Events:

- `early_access_form_view` — `{ source: "hero" | "offer" }`
- `early_access_submit` — `{ source }`
- `early_access_request_sent` — `{ source }`
- `early_access_invalid` — `{ source }`
- `early_access_error` — `{ source, reason }`, where `reason` is a controlled category rather than an arbitrary error message
- `early_access_email_change` — `{ source }`
- `offer_cta_click` — `{ source: "nav" | "closing" }`

Page views provide the landing denominator. Form views, submits, and request-sent events expose the main funnel drop-offs.

## Motion System

- Use Motion as the sole general-purpose animation library for hero depth, viewport reveals, and demonstration transitions.
- Remove GSAP and ScrollTrigger from the client bundle.
- Content renders visible in exported HTML. Motion enhances visibility; it never establishes it.
- Entrance motion uses opacity plus a small transform, generally 180–500ms.
- The hero receives one choreographed entrance and restrained scroll depth.
- Product demonstration transitions preserve spatial continuity and stable dimensions.
- Buttons receive responsive press feedback; form success resolves through a clear state transition.
- Infinite decorative motion is removed or limited so it does not compete with the email field.
- `prefers-reduced-motion` produces a fully static page with no scrubbed, parallax, shimmer, or staggered movement.
- Only `transform` and `opacity` are used for frequent animation. Layout-height animation is limited to the FAQ and tested for jank.

## Accessibility

- Provide a skip link to the landing-page main content.
- Preserve a single `h1`, logical heading levels, landmarks, and descriptive image alternatives.
- Use accessible tab semantics for the product demonstration.
- Ensure FAQ triggers expose `aria-expanded` and `aria-controls` with labelled panels.
- Keep visible focus styles across light and dark themes.
- Ensure the mobile menu cannot leave obscured controls in the active focus order.
- Do not create any automatic modal or keyboard trap.
- Verify target sizing, contrast, 200% zoom, screen-reader labels, and keyboard-only operation.

## Performance and Next.js Boundaries

- Keep static text and layout in Server Components.
- Limit Client Component boundaries to navigation behavior, theme control, forms, the interactive demonstration, and small motion wrappers.
- Follow the repository's bundled Next.js 16 documentation before each framework-specific change.
- Replace deprecated `next/image` priority usage and ensure only the actual likely hero LCP image receives eager/high-priority loading.
- Keep responsive `sizes` accurate and remove the duplicate image-loading warning.
- Lazy-load below-fold screens and any interaction code that is not needed for the initial hero.
- Measure the homepage JavaScript referenced by the production export and reduce it from the audited 302.5 KiB gzipped baseline.
- Ensure no substantive exported element begins hidden.

## SEO and Sharing

- Resolve the connected Vercel production URL before editing `metadataBase` and `site.url`.
- Give `/`, `/privacy`, `/terms`, and `/delete-account` their own canonical URL, Open Graph title, description, and URL.
- Add static sitemap and robots metadata.
- Add a branded not-found page.
- Create a 1200×630 Open Graph image below 300 KiB featuring the core promise and 30-day offer.
- Preserve route-appropriate titles and descriptions for legal pages.

## Security and Dependencies

- Upgrade Next.js and `eslint-config-next` together to the patched compatible release available during implementation.
- Resolve the audited Nano ID, PostCSS, and Sharp advisories through compatible package updates rather than forced unrelated majors.
- Re-run a production-only audit and document any remaining advisory with its actual runtime relevance.
- Do not expose secrets; the Google Form endpoint and field identifier remain public configuration by design.

## Testing Strategy

Add Vitest, Testing Library, user-event, and jsdom as development dependencies.

### Unit and component tests

- email validation accepts and rejects representative addresses;
- promotion configuration renders 30 days consistently;
- forms expose native action, method, and Google entry name;
- invalid, sending, request-sent, network-error, remembered, and change-email states;
- synchronized forms update after one submission;
- honeypot prevents a network request;
- analytics receives controlled event properties and never an email;
- FAQ and demonstration keyboard/ARIA behavior;
- Play Store and disabled-form fallbacks remain valid.

### Static-output checks

- all public routes exist;
- canonical and Open Graph URLs match each route;
- substantive landing content is not exported with hidden initial styles;
- pricing text and old 7/14-day marketing claims are absent;
- Open Graph dimensions and file size meet the acceptance criteria;
- internal section links target existing IDs.

### Browser verification

- 320×568, 390×844, 768×1024, 1280×720, and 1440×900;
- light and dark themes;
- reduced motion;
- JavaScript-disabled form and content behavior;
- keyboard-only navigation and focus order;
- mobile menu, demonstration, FAQ, both forms, success synchronization, and email correction;
- console errors, hydration warnings, horizontal overflow, and layout shifts.

### Required release commands

- test suite;
- ESLint;
- production build;
- form configuration verification without writing a probe row;
- production dependency audit;
- static-output verification script.

An end-to-end Google Form probe writes a row and therefore remains optional unless separately approved at verification time.

## Documentation

Update the README to describe:

- the 30-day email promotion;
- the current Vercel deployment model;
- the absence of a connected custom domain;
- the Google Form's role as the eligibility record;
- analytics event semantics;
- the current Motion-only architecture;
- test and verification commands;
- the operational step required to deliver redemption instructions at launch.

Remove stale Firebase deployment instructions, pricing values, and trial-duration claims.

### Operations handoff

- The repository requires Node `^20.19.0 || ^22.12.0 || >=24.0.0` and produces a static `out/` artifact.
- Production deploys from `main` through the connected Vercel project. The stable alias remains `https://rafiq-website-beryl.vercel.app` until a custom domain is actually connected and verified.
- `npm run verify:static` inspects the built artifact rather than source assumptions: routes, route-specific canonical/OG URLs, anchors, pre-hydration visibility, stale marketing claims, social image, crawl files, and homepage JavaScript gzip.
- `npm run verify:form` is configuration-only and writes no response. The `--submit` variant is an optional, separately authorized end-to-end probe because it writes a real Sheet row.
- The response Sheet is the promotion eligibility record. Sending launch-day redemption instructions to every eligible address is a product-owner release obligation, not an automated behavior of this repository.
- Hosted legal prose preserves the app documents while resolving their deployment-owned account-deletion link against the verified site URL, so the pre-domain release cannot route legal requests to an unrelated website.

## Release Process

1. Implement on the current `main` branch as explicitly requested.
2. Keep unrelated user work untouched.
3. Run the complete verification suite against a fresh production build.
4. Review the final diff and confirm that only intended files changed.
5. Commit the verified implementation.
6. Push `main` to `origin`, intentionally triggering the connected Vercel deployment.
7. Use the connected Vercel tooling to wait for the deployment, inspect build status, and obtain the production URL.
8. Verify the deployed landing page, metadata, forms without submission, responsive layout, and console state.
9. Report the commit, deployment URL/status, verification evidence, and the later custom-domain action separately.

If the Vercel build fails, do not push follow-up guesses. Inspect the deployment evidence, reproduce locally, fix test-first, re-run the full release suite, and then push the corrective commit.

## Risks and Mitigations

- **Promotional fulfillment mismatch:** The Sheet is explicitly the eligibility source of truth, and the README documents the launch-email fulfillment step.
- **Opaque Google Form response:** Use request-sent terminology, retain the verification script, and never claim browser-verified persistence.
- **Loss of product detail after shortening:** Keep the strongest proof and link to privacy/legal detail; remove repetition, not objection resolution.
- **Motion regression or bundle growth:** Use one library, progressive enhancement, bundle measurement, reduced-motion checks, and mobile browser verification.
- **Automatic deployment from `main`:** Push only after the full local release gate passes, then verify the actual Vercel deployment before reporting completion.
- **Unconnected custom domain:** Use the real Vercel production URL in metadata until a later, explicit domain cutover.
