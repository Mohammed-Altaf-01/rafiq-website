# Rafiq Conversion Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Rafiq landing page around one measurable email conversion—reserving 30 days of Premium with no card—while improving motion, accessibility, performance, metadata, and production reliability.

**Architecture:** Keep the site a Next.js 16 static export. Render acquisition copy and layout as Server Components; isolate client behavior to the synchronized Google Form capture, theme/navigation controls, the three-state product demonstration, and progressive Motion wrappers. Store every promotion fact in `site.offer`, use the Google Form response Sheet as the eligibility record, and validate the generated `out/` artifact before pushing `main` to Vercel.

**Tech Stack:** Next.js 16.3.3, React 19, TypeScript, Tailwind CSS 4, Motion, Vitest, React Testing Library, Testing Library user-event, jsdom, Vercel Analytics, Vercel MCP.

**Spec:** `docs/superpowers/specs/2026-08-27-conversion-redesign-design.md`

## Global Constraints

- Work on the current `main` branch because the user explicitly authorized it; do not push until the complete local release gate passes.
- Preserve the existing Rafiq wordmark, warm olive/clay/gold palette, app screenshots, Qur'an 24:30 passage, legal copy, and truthful product capabilities.
- Do not invent testimonials, counts, ratings, urgency, scarcity, endorsements, efficacy claims, or commercial terms.
- The promotion wording is exactly 30 Premium days, no card, reserved by email before launch. The browser may say “request sent” or “reserved”; it may not claim that an opaque Google response was verified.
- Do not submit a Google Form probe during routine verification; that writes an external row. Run the configuration-only verifier.
- Never send an email address or arbitrary exception text to analytics.
- Use Motion as the only general-purpose animation library. Exported content must remain visible without JavaScript.
- Follow the local Next.js docs in `node_modules/next/dist/docs/` before framework-specific edits and re-check them after the Next.js patch upgrade.
- Use test-first red/green cycles for behavior changes. Configuration and human-facing documentation are the only planned TDD exceptions.
- Use `apply_patch` for file edits and preserve unrelated user changes.

---

## Task 1: Persist product, design, and surface authority

**Files:**
- Create: `PRODUCT.md`
- Create: `DESIGN.md`
- Create: `.impeccable/design.json`
- Create through helper: `.impeccable/surfaces/src-app-page-tsx.md` (use the path returned by the surface-brief script)
- Modify: `docs/superpowers/specs/2026-08-27-conversion-redesign-design.md`

- [x] **Step 1: Write the product record from approved facts**

Create `PRODUCT.md` with `<!-- impeccable:product-schema 1 -->`, platform `web`, the primary audience (Muslims on Android seeking voluntary protection from adult content, short-video feeds, and app overuse), Rafiq’s on-device mechanism, current pre-launch state, Google Form eligibility record, absent testimonials/benchmarks, and WCAG-minded accessibility commitment. Mark entitlement automation and custom-domain connection as explicit future decisions rather than present capabilities.

- [x] **Step 2: Document the incumbent visual system**

Create `DESIGN.md` in scan mode with canonical sections and machine-readable frontmatter. Extract the actual tokens from `src/app/globals.css`: warm cream/espresso surfaces, olive primary, clay/gold accents, Jakarta body/display, Amiri Arabic, 24/18/14px radii, warm shadows, star field, pill actions, and full-bleed scripture moments. Use the qualitative north star **“The Steadfast Companion”**: calm, spiritually grounded, direct, never punitive or gamified.

- [x] **Step 3: Write the design sidecar**

Create `.impeccable/design.json` schema version 2 with color/typography metadata, exact shadow and motion tokens, Tailwind breakpoints, and self-contained previews for the primary button, tonal button, email field, card, and navigation. Do not duplicate primitive token values outside `DESIGN.md` frontmatter.

- [x] **Step 4: Persist the landing-page surface brief**

Run:

```bash
node /Users/altaf/.agents/skills/impeccable/scripts/surface-brief.mjs read src/app/page.tsx
node /Users/altaf/.agents/skills/impeccable/scripts/surface-brief.mjs write src/app/page.tsx /tmp/rafiq-surface-brief.md
```

The brief must record Persuade mode, the email-reservation action, the truthful proof sources, the focused narrative, the memorable two-device hero/three-state pause demonstration, and the no-modal/no-invented-proof constraints.

- [x] **Step 5: Mark the approved design spec approved**

Change the spec status from “awaiting final review” to “Approved for implementation” and record the stable production metadata base discovered through Vercel: `https://rafiq-website-beryl.vercel.app`.

- [x] **Step 6: Review and commit the authority files**

Run `git diff --check` and inspect each file for accidental pricing, 7-day, or 14-day claims.

```bash
git add PRODUCT.md DESIGN.md .impeccable docs/superpowers/specs/2026-08-27-conversion-redesign-design.md
git commit -m "docs: record Rafiq product and design foundations"
```

---

## Task 2: Upgrade patched dependencies and install the test harness

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `vitest.config.mts`
- Create: `src/test/setup.ts`

- [x] **Step 1: Re-read installed Next.js guidance**

Read the full local guides for Vitest, upgrading, static exports, metadata/OG images, images, accessibility, and production checklists. After upgrading, re-open the same paths from the new `node_modules/next/dist/docs/` so implementation follows 16.3.3, not memory.

- [x] **Step 2: Upgrade compatible framework packages**

Run:

```bash
npm install next@16.3.3 react@19.2.8 react-dom@19.2.8 eslint-config-next@16.3.3
```

Do not force unrelated major upgrades. Record exact installed versions with `npm ls next react react-dom eslint-config-next`.

- [x] **Step 3: Install the documented Vitest stack**

Run:

```bash
npm install --save-dev vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom @testing-library/user-event @testing-library/jest-dom vite-tsconfig-paths
```

- [x] **Step 4: Configure deterministic tests**

Create `vitest.config.mts` using `react()` and `tsconfigPaths()`, `environment: "jsdom"`, `setupFiles: ["./src/test/setup.ts"]`, and CSS handling. In setup, import `@testing-library/jest-dom/vitest`, clean up after each test, restore mocks, and provide a deterministic `matchMedia` helper only where jsdom lacks the browser contract.

- [x] **Step 5: Add scripts**

Add:

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "verify:static": "node scripts/verify-static-output.mjs",
  "verify": "npm run test && npm run lint && npm run build && npm run verify:static && npm run verify:form"
}
```

- [x] **Step 6: Prove the harness and security baseline**

Run `npm run test -- --passWithNoTests`, `npm run lint`, `npm run build`, and `npm audit --omit=dev`. If audit still reports a compatible transitive patch, run `npm audit fix --omit=dev`, inspect the lockfile diff, and repeat all four commands. Do not use `--force`.

- [x] **Step 7: Commit only after fresh checks**

```bash
git add package.json package-lock.json vitest.config.mts src/test/setup.ts
git commit -m "build: update Next.js and add the test harness"
```

---

## Task 3: Centralize the 30-day offer and correct acquisition state

**Files:**
- Modify: `src/lib/site.ts`
- Modify: `src/lib/early-access.ts`
- Create: `src/lib/__tests__/early-access.test.ts`

- [x] **Step 1: Write failing offer and validation tests**

Name the break each test catches, then test literal observable behavior:

```ts
it("targets the free-month section while prelaunch capture is active", () => {
  expect(earlyAccessTarget(true)).toBe("#free-month");
});

it.each([
  ["person@example.com", true],
  [" person+tag@example.co.uk ", true],
  ["person@site", false],
  ["person@example..com", false],
])("validates %s", (value, expected) => {
  expect(isEmail(value)).toBe(expected);
});
```

Add independent tests for localStorage read/write synchronization, storage-event updates, network rejection, successful request-sent storage, and clearing the remembered address. Mock only `fetch` as the external boundary.

- [x] **Step 2: Run RED**

```bash
npm run test -- src/lib/__tests__/early-access.test.ts
```

Confirm failures are due to absent `site.offer`, `#free-month`, controlled result semantics, and `forgetRememberedEmail`, not test setup.

- [x] **Step 3: Add one offer configuration and retire pricing safely**

In `site.ts`, set `site.url` to `https://rafiq-website-beryl.vercel.app` and add:

```ts
offer: {
  active: true,
  premiumDays: 30,
  requiresCard: false,
  action: "https://docs.google.com/forms/d/e/1FAIpQLSfpNMJaXgnurO4chFT8YrJG3qn3hx6H693O5TmHDr8v5kloxw/formResponse",
  field: "entry.1045781291",
}
```

Keep `playStore` and support fallback. Update nav hashes to `#how-it-works`, `#protection`, `#privacy`, and `#free-month`.

The legacy standalone `pricing` export remains only until Task 5 deletes its current section importers; no new code may consume it. Removing it here would knowingly make the intermediate commit fail TypeScript. Task 5 removes the export and all importers together.

- [x] **Step 4: Implement storage correction and request-sent semantics**

Keep the real Google Form POST and `no-cors`; return only after the request promise resolves. Export `forgetRememberedEmail()` to clear storage/cache and notify mounted forms. Never expose a production-only reset method. Keep arbitrary errors out of analytics-facing return values.

- [x] **Step 5: Run GREEN and refactor**

Run the focused test until clean, then `npm run test` and `npm run lint`. Check the new acquisition path for duration sources:

```bash
rg -n "trialDays|pricing|7 days|7-day|14 days|14-day" src/lib/early-access.ts src/components/ui/early-access.tsx
```

Matches in the new acquisition path must be zero. The known legacy pricing export and its existing section importers are removed together in Task 5; legal historical wording is reviewed manually rather than blindly changed.

- [x] **Step 6: Commit**

```bash
git add src/lib/site.ts src/lib/early-access.ts src/lib/__tests__/early-access.test.ts
git commit -m "feat: centralize the 30-day early access offer"
```

---

## Task 4: Rebuild the synchronized email form around conversion

**Files:**
- Modify: `src/components/ui/early-access.tsx`
- Create: `src/components/ui/__tests__/early-access.test.tsx`
- Delete: `src/components/ui/email-gate.tsx`

- [x] **Step 1: Write failing native-form and state tests**

Render the real component and assert:

```tsx
expect(screen.getByRole("button", { name: "Claim my free month" })).toBeEnabled();
expect(screen.getByRole("textbox", { name: "Email address" })).toHaveAttribute(
  "name",
  "entry.1045781291",
);
expect(screen.getByRole("form", { name: "Reserve 30 days of Rafiq Premium" })).toHaveAttribute(
  "method",
  "post",
);
```

Add separate tests for blur/submission validation, sending label, request-sent success, network error/support fallback, remembered success, “Use a different email”, synchronized form instances, honeypot no-request behavior, Play Store fallback, disabled-form mailto fallback, form-view tracking once, and controlled analytics properties. The test must fail if an email or arbitrary error message enters any event payload.

- [x] **Step 2: Run RED**

```bash
npm run test -- src/components/ui/__tests__/early-access.test.tsx
```

Confirm missing native attributes/copy/correction and old event names account for the failures.

- [x] **Step 3: Implement the accessible progressive form**

Give the form a real `action={site.offer.action}`, `method="post"`, accessible name, and the input `name={site.offer.field}`. Keep the controlled JS handler for validation, analytics, synchronized state, and inline success. Use two typed sources only: `"hero" | "offer"`.

- [x] **Step 4: Apply approved conversion copy**

- Submit: **Claim my free month**
- Sending: **Reserving…**
- Success: **Your free month is reserved.**
- Reassurance: **No card. One launch email. Nothing you look at leaves your phone.**
- Correction: **Use a different email**

Explain that redemption instructions arrive in the launch email. The correction clears only local state and explicitly does not claim to remove the prior Sheet row.

- [x] **Step 5: Instrument the controlled funnel**

Emit exactly `early_access_form_view`, `early_access_submit`, `early_access_request_sent`, `early_access_invalid`, `early_access_error` with `reason: "network" | "configuration"`, and `early_access_email_change`. Track view once on actual intersection, not merely because the below-fold form mounted.

- [x] **Step 6: Remove the automatic modal**

Delete `email-gate.tsx` and all references. No replacement popup, dialog, gate, exit intent, or scroll interception is allowed.

- [x] **Step 7: Run GREEN, accessibility checks, and commit**

Run the focused test, full tests, and lint. Inspect the rendered form in both themes before committing.

```bash
git add src/components/ui/early-access.tsx src/components/ui/__tests__/early-access.test.tsx src/components/ui/email-gate.tsx
git commit -m "feat: turn early access into a progressive free-month claim"
```

---

## Task 5: Replace the long page with the focused conversion narrative

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/sections/hero.tsx`
- Create: `src/components/sections/hero-visual.tsx`
- Create: `src/components/sections/proof-ribbon.tsx`
- Modify: `src/components/sections/verse.tsx`
- Create: `src/components/sections/how-it-works.tsx`
- Modify: `src/components/sections/protection.tsx`
- Modify: `src/components/sections/journey.tsx`
- Create: `src/components/sections/free-month.tsx`
- Modify: `src/components/sections/faq.tsx`
- Modify: `src/components/sections/cta.tsx`
- Modify: `src/components/site/footer.tsx`
- Delete: `src/components/sections/glance.tsx`
- Delete: `src/components/sections/pause.tsx`
- Delete: `src/components/sections/pricing.tsx`
- Delete: `src/components/sections/privacy.tsx`
- Delete: `src/components/sections/setup.tsx`
- Create: `src/app/__tests__/page.test.tsx`

- [x] **Step 1: Write a failing landing narrative test**

Render the synchronous page shell and assert one H1, the offer copy, four proof labels, the mission reference, three how-it-works state names, protection/privacy contract, three progress outcomes, five FAQs, two forms at most, and no pricing/7-day/14-day text. If interactive children require browser APIs, use real components with jsdom polyfills rather than replacing them with fake DOM.

- [x] **Step 2: Run RED**

```bash
npm run test -- src/app/__tests__/page.test.tsx
```

The existing Pricing section, duplicate long sections, old heading/copy, and modal reference must make this fail.

- [x] **Step 3: Recompose the page in the approved order**

`Nav → Hero → ProofRibbon → Verse → HowItWorks → Protection → Journey → FreeMonth → Faq → Cta → Footer`. Remove every obsolete import and the email gate. Add `id="main-content"` to `<main>`.

- [x] **Step 4: Make the initial viewport convert**

Keep static hero text server-rendered. Use the eyebrow **Android early access · 30 days Premium free**, concrete blocking/privacy copy, the hero form, the secondary “See how it works” anchor, and the real two-phone composition. Only `hero-visual.tsx` owns scroll-aware artwork.

- [x] **Step 5: Build the compact proof and objection sections**

Proof labels: **Adult content**, **Shorts & Reels**, **Daily app limits**, **On-device matching**. Combine strict mode, offline/reboot resilience, dhikr pause, inspected/stored/sent privacy facts, and Privacy Policy link into one concise protection section.

- [x] **Step 6: Build the offer decision point**

Use a large `30 days` marker, heading **Your first 30 days of Rafiq Premium are on us.**, three truthful inclusions, eligibility/redemption explanation, and the second/final `EarlyAccess source="offer"` form. No price, savings badge, renewal countdown, or payment pressure.

- [x] **Step 7: Reduce the FAQ and close**

Keep exactly the five approved objections. The last answer states no card and fallback to the useful free tier after promotional Premium. Closing CTA targets `#free-month` and emits `offer_cta_click` with source `closing` without duplicating a third form.

- [x] **Step 8: Run GREEN and length checks**

Run focused/full tests and lint. Start the dev server and measure page height at 390×844; target `≤ 12,174px` and preferably materially shorter. Check no horizontal overflow at 320px.

- [x] **Step 9: Commit**

```bash
git add src/app/page.tsx src/app/__tests__/page.test.tsx src/components/sections src/components/site/footer.tsx
git commit -m "feat: rebuild the landing page around one conversion story"
```

---

## Task 6: Implement the single-library motion system progressively

**Plans:**
- `animation-plans/002-consolidate-motion-and-remove-scroll-traps.md`
- `animation-plans/003-tighten-interaction-transitions.md`
- `animation-plans/001-progressive-reveals.md`
- `animation-plans/004-preserve-feedback-with-reduced-motion.md`

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/motion-provider.tsx`
- Modify: `src/components/sections/hero-visual.tsx`
- Modify: `src/components/sections/how-it-works.tsx`
- Modify: `src/components/ui/reveal.tsx`
- Modify: `src/components/ui/scripture.tsx`
- Modify: `src/components/ui/button.tsx`
- Modify: `src/components/ui/early-access.tsx`
- Modify: `src/components/sections/faq.tsx`
- Modify: `src/components/site/nav.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `src/components/ui/__tests__/reveal.test.tsx`
- Create: `src/components/ui/__tests__/scripture.test.tsx`
- Create: `src/components/sections/__tests__/how-it-works.test.tsx`

- [x] **Step 1: Load the Impeccable craft floor immediately before UI edits**

Read `/Users/altaf/.agents/skills/impeccable/reference/craft-floor.md` fully. Apply its bans and quality checks throughout this and later UI tasks.

- [x] **Step 2: Execute each animation plan test-first**

Follow the exact red/green steps and values in the four animation plans. Mark each plan’s status `DONE` only after its mechanical and feel checks pass.

- [x] **Step 3: Remove GSAP**

```bash
npm uninstall gsap
rg -n "gsap|ScrollTrigger" src package.json
```

The second command must return no matches. Do not keep dead timeline helpers.

- [x] **Step 4: Prove exported visibility**

After `npm run build`, inspect `out/index.html`. No substantive headline, paragraph, section, scripture word, proof label, or form may carry an inline hidden initial state. Decorative offscreen art may be excluded by an explicit allowlist in the verifier.

- [x] **Step 5: Measure the client bundle**

Compute the unique JavaScript files referenced by `out/index.html` and their gzip sum. Record the result in the verification log; it must be below the audited 302.5 KiB baseline.

- [x] **Step 6: Run motion verification and commit**

Run focused tests, full tests, lint, and build. Feel-check default and reduced motion at desktop/mobile. Then:

```bash
git add animation-plans src/app/globals.css src/components package.json package-lock.json
git commit -m "feat: consolidate and refine the landing motion system"
```

---

## Task 7: Harden navigation, FAQ, images, and accessibility

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/site/nav.tsx`
- Modify: `src/components/legal/legal-page.tsx`
- Modify: `src/app/delete-account/page.tsx`
- Modify: `src/components/sections/faq.tsx`
- Modify: `src/components/ui/device.tsx`
- Modify: `src/components/brand/mark.tsx`
- Create: `src/components/site/__tests__/nav.test.tsx`
- Create: `src/components/sections/__tests__/faq.test.tsx`

- [x] **Step 1: Write failing interaction and image-contract tests**

Test the skip link/main target, menu selection/Escape/outside close, logical focus return, non-obscured closed controls, FAQ `aria-expanded`/`aria-controls`/labelled panels, and exactly one hero image using the Next 16 LCP-loading signal.

- [x] **Step 2: Run RED**

```bash
npm run test -- src/components/site/__tests__/nav.test.tsx src/components/sections/__tests__/faq.test.tsx
```

- [x] **Step 3: Implement navigation containment without a modal**

Add the skip link before navigation. When mobile menu opens, focus its first link; close on selection, Escape, and outside pointer interaction; return focus to the menu button when appropriate. Keep the closed tree unmounted. Track nav offer clicks as `{ source: "nav" }` only.

- [x] **Step 4: Correct FAQ semantics**

Use stable button/panel IDs, `aria-expanded`, `aria-controls`, and `role="region"` with `aria-labelledby`. Preserve all content in DOM only when open and make rapid toggles interruptible.

- [x] **Step 5: Fix Next Image loading**

Following the installed Next 16 image guide, remove deprecated `priority`. Runtime traces identify different hero LCP elements by viewport: `/screens/home.webp` on desktop and `/screens/block-limit.webp` on mobile. Load both small hero proofs eagerly (81 KiB combined), give only the mobile-measured candidate `fetchPriority="high"`, and keep below-fold screens and reusable marks lazy. Keep accurate `sizes` and eliminate LCP warnings.

- [x] **Step 6: Verify accessibility and commit**

Keyboard-test every control, both themes, reduced motion, and 200% browser zoom. Run focused/full tests, lint, build, and then:

```bash
git add src/app/layout.tsx src/app/delete-account/page.tsx src/components
git commit -m "fix: harden navigation and landing accessibility"
```

---

## Task 8: Correct metadata, sharing, crawlability, and not-found behavior

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/privacy/page.tsx`
- Modify: `src/app/terms/page.tsx`
- Modify: `src/app/delete-account/page.tsx`
- Create: `src/lib/metadata.ts`
- Create: `src/lib/__tests__/metadata.test.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/app/not-found.tsx`
- Delete: `src/app/opengraph-image.png`
- Delete: `src/app/opengraph-image.alt.txt`
- Create: `src/app/opengraph-image.tsx`

- [x] **Step 1: Write failing metadata tests**

Test a pure `createPageMetadata` helper with literal expected canonical/OG URLs for `/`, `/privacy`, `/terms`, and `/delete-account`. Assert route-specific titles/descriptions and that the base URL is `https://rafiq-website-beryl.vercel.app`, never `rafiq.app`.

- [x] **Step 2: Run RED**

```bash
npm run test -- src/lib/__tests__/metadata.test.ts
```

- [x] **Step 3: Implement route metadata**

Use `metadataBase` in the root layout and explicit `alternates.canonical`, Open Graph title/description/url/type, and Twitter card data per route. Keep legal page descriptions factual and distinct.

- [x] **Step 4: Add crawl files and 404**

Generate robots and sitemap through documented `MetadataRoute` functions. Include `/`, `/privacy`, `/terms`, and `/delete-account`. Create a branded, useful not-found page with Home and free-month links.

- [x] **Step 5: Replace the social image in code**

Create `opengraph-image.tsx` with `ImageResponse`, exported `alt`, `size = { width: 1200, height: 630 }`, and `contentType = "image/png"`. Use the Rafiq palette/star geometry and visible **30 days Premium free** promise. Keep the render simple enough that the built PNG is `< 307200` bytes.

- [x] **Step 6: Build, inspect generated tags/image, and commit**

Run tests, lint, and build. Inspect all exported head tags and read PNG dimensions from the built file. Then:

```bash
git add src/app src/lib/metadata.ts src/lib/__tests__/metadata.test.ts
git commit -m "fix: give every public route correct metadata"
```

---

## Task 9: Add static release verification and refresh operations documentation

**Files:**
- Create: `scripts/verify-static-output.mjs`
- Modify: `scripts/verify-early-access.mjs`
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-08-27-conversion-redesign-design.md`

- [ ] **Step 1: Write the static verifier against the real export**

The script must fail with a clear message if `out/` is absent and otherwise verify:

- all four route HTML files exist;
- each canonical and `og:url` matches its route;
- internal landing anchors resolve to IDs;
- no substantive exported node starts with `opacity:0`, `visibility:hidden`, or `display:none`;
- pricing, `$4.99`, `$35.99`, `7-day`, `7 days`, `14-day`, and `14 days` are absent from landing marketing HTML;
- the OG asset is PNG, 1200×630, and below 300 KiB;
- robots and sitemap exist and use the stable Vercel URL;
- the homepage referenced-JS gzip sum is printed and below 302.5 KiB.

Use jsdom for HTML behavior; derive expected literals independently of the implementation helper.

- [ ] **Step 2: Prove verifier failure before the new build**

Run it once against a deliberately copied/incomplete fixture directory or the old export and confirm it reports at least the known old pricing/canonical/hidden-content defects. Do not weaken checks to make the current artifact pass.

- [ ] **Step 3: Run the verifier against a fresh new build**

```bash
npm run build
npm run verify:static
```

Fix the product code when a check exposes a real defect. Do not add broad allowlists.

- [ ] **Step 4: Refresh README operations**

Document the 30-day offer, Google Form Sheet eligibility role, launch-email redemption obligation, Vercel Git deployment, stable current production URL and absent custom domain, Motion-only architecture, analytics event meanings, tests/verification commands, and exact Node requirement. Remove Firebase deployment, pricing, 7/14-day claims, and incorrect OG claims.

- [ ] **Step 5: Keep form verification terminology honest**

Update script/help comments to distinguish configuration-only verification from the optional row-writing `--submit` probe. Do not run `--submit`.

- [ ] **Step 6: Run docs/static checks and commit**

Run `npm run verify`, `npm audit --omit=dev`, and `git diff --check`. Then:

```bash
git add scripts README.md docs/superpowers/specs/2026-08-27-conversion-redesign-design.md package.json
git commit -m "chore: automate the website release checks"
```

---

## Task 10: Complete visual, responsive, and full-story verification

**Files:**
- Modify only files exposed by verification failures
- Update: `DESIGN.md` and `.impeccable/design.json` if final tokens differ

- [ ] **Step 1: State the end-to-end story**

Record: “A visitor lands on the static Rafiq page, understands the protection/privacy promise, enters an email in hero or free-month form, the browser posts the configured Google field to Google Forms, both forms resolve to a local request-sent confirmation, and Vercel Analytics receives source-only funnel events.”

- [ ] **Step 2: Start a production-equivalent local server**

Run a static server over `out/` after a fresh build (or the project’s documented production preview). Capture server output and browser console.

- [ ] **Step 3: Browser-verify required viewports**

Use the Vercel agent-browser verification workflow at 320×568, 390×844, 768×1024, 1280×720, and 1440×900. At each relevant breakpoint check no overflow, correct CTA visibility, readable screenshots, form usability, stable how-it-works panel, and a page height ≤12,174px at 390×844.

- [ ] **Step 4: Verify modes and interaction paths**

Check light/dark, reduced/default motion, 200% zoom, keyboard-only focus order, skip link, mobile menu, tabs, FAQ, hero form, offer form, synchronized success with a mocked/local network boundary, and email correction. Do not submit to the real Google endpoint.

- [ ] **Step 5: Verify progressive enhancement**

Disable JavaScript or load the raw export. Confirm all essential copy and both forms are visible; inspect form action/method/name and native browser validation/fallback without sending the form.

- [ ] **Step 6: Scan console, network, layout, and generated output**

There must be no hydration error, React warning, failed local asset, horizontal overflow, duplicate high-priority image warning, or unexpected layout shift. Fix each defect test-first and repeat the affected check.

- [ ] **Step 7: Run the Impeccable detector exactly once**

After UI edits are finished:

```bash
node /Users/altaf/.agents/skills/impeccable/scripts/detect.mjs --json src/app/page.tsx src/app/globals.css src/components/sections src/components/site src/components/ui
```

Apply material findings. Do not run a second detector.

- [ ] **Step 8: Run the required finish review**

Use the `impeccable_finish_reviewer` subagent read-only with the original request, approved spec, `PRODUCT.md`, `DESIGN.md`, surface brief, changed targets, and detector findings. Apply material fixes test-first, then re-run only affected verification plus the final release gate.

- [ ] **Step 9: Review React component quality**

Apply the Vercel React checklist: minimal client boundaries, no inline component definitions, primitive effect dependencies, lazy localStorage reads, no unnecessary memo, direct icon imports, and no duplicate global listeners.

---

## Task 11: Run the release gate, push `main`, and verify Vercel production

**Files:**
- No planned source changes; any failure starts a test-first corrective cycle

- [ ] **Step 1: Review the complete diff and acceptance checklist**

Compare `git diff origin/main...HEAD` line-by-line against the approved spec and this plan. Confirm deleted pricing/modal code has no references, only intended files changed, and no secret/token was added.

- [ ] **Step 2: Run fresh release evidence**

Run every command from a clean shell and read full output:

```bash
npm run test
npm run lint
npm run build
npm run verify:static
npm run verify:form
npm audit --omit=dev
git diff --check origin/main...HEAD
git status --short --branch
```

No completion, commit, or push claim is allowed unless all required commands exit 0. If a remaining audit advisory exists, stop and document its actual dependency path/runtime relevance before deciding whether release can proceed.

- [ ] **Step 3: Commit any final verified fixes**

If final-review fixes remain staged, create one descriptive final commit only after repeating the affected tests and full release gate. Confirm `git status` is clean and `main` contains the approved spec, plan, implementation, and verification changes.

- [ ] **Step 4: Push the authorized production branch**

```bash
git push origin main
```

Record the pushed full SHA. Do not force-push.

- [ ] **Step 5: Wait for the matching Vercel deployment**

Using Vercel MCP team `team_xsmbaF4w4eRT0TPRVzTbIJNO` and project `prj_TmvFY7B95mxYYkkEmAZdcISw8IQ2`, list deployments until the production deployment metadata contains the pushed Git SHA and reaches `READY`. If it reaches `ERROR`, fetch build logs, reproduce locally, fix test-first, re-run the full gate, commit, and push normally.

- [ ] **Step 6: Verify the deployed artifact**

Check the immutable deployment URL and stable alias `https://rafiq-website-beryl.vercel.app`: HTTP 200, new 30-day hero/offer, no pricing, correct route metadata/OG/robots/sitemap, forms’ action/method/name without submission, responsive layout, and clean browser console.

- [ ] **Step 7: Report release evidence**

Report the commit SHA, stable production URL, immutable deployment URL, Vercel status/build duration, exact local command outcomes, production browser checks, dependency audit result, and the intentionally deferred custom-domain/form-probe items. Do not claim an 80–90% conversion rate; state that instrumentation now measures the real baseline.
