---
name: Rafiq
description: A warm, steadfast digital companion for intentional Android use.
colors:
  canvas-cream: "#f6f1e7"
  surface-sand: "#efe7d6"
  card-paper: "#fbf8f1"
  raised-paper: "#ffffff"
  espresso: "#1c1a16"
  ink: "#2e2a23"
  ink-soft: "#625b4d"
  olive: "#5c6b4c"
  olive-hover: "#4a5840"
  clay: "#a96a3d"
  clay-display: "#c08457"
  gold: "#9a7526"
  gold-display: "#c9a24b"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.032em"
  body:
    fontFamily: "Plus Jakarta Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  arabic:
    fontFamily: "Amiri, Traditional Arabic, serif"
    fontWeight: 400
    lineHeight: 1.9
rounded:
  card: "24px"
  tile: "18px"
  input: "14px"
  pill: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.olive}"
    textColor: "{colors.canvas-cream}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
    typography: "{typography.body}"
  button-tonal:
    backgroundColor: "{colors.surface-sand}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
    typography: "{typography.body}"
  email-field:
    backgroundColor: "{colors.raised-paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.input}"
    padding: "14px 20px"
    typography: "{typography.body}"
---

# Design System: Rafiq

## Overview

**Creative North Star: “The Steadfast Companion”**

Rafiq should feel like a calm companion that stays present at the exact moment resolve becomes difficult. The system pairs warm, tactile surfaces with direct contemporary typography and real product screens. Spiritual context appears with space and dignity; the interface around it remains practical, legible, and concrete.

The experience is composed, not austere. Olive owns action, clay and gold provide sparing warmth, and the espresso block creates a night-time counterpoint. Pattern, shimmer, and device depth are signature gestures used once at page scale rather than repeated as decoration.

**Key Characteristics:**

- Warm, grounded surfaces with one clear action color
- Bold, compact display type beside generous readable body copy
- Real Android screens as proof, not generic feature iconography
- Full-bleed sacred moments separated from conversion controls
- Gentle depth and motion that never hides content

## Colors

Warm cream and espresso establish day/night context; olive signals action, while clay and gold carry spiritual and crafted accents.

### Primary

- **Companion Olive:** The sole primary action color for buttons, focus, active progress, and decisive links.

### Secondary

- **Earth Clay:** An emphasis color for protection moments and small labels, using the darker text-safe value for copy and the lighter display value for ornament.
- **Prayer Gold:** A sparse sacred/reference accent, again separating text-safe and display roles.

### Neutral

- **Canvas Cream:** The default page field.
- **Surface Sand:** Tonal controls and inset surfaces.
- **Paper Card:** Content containers that lift slightly from the canvas.
- **Espresso:** A constant dark stage for night/protection moments, independent of theme.
- **Warm Ink:** Primary and secondary copy stay brown-black rather than neutral gray.

### Named Rules

**The One Action Rule.** Olive is reserved for the action or state that matters most in a region; it is not scattered across decorative elements.

**The Text-Safe Accent Rule.** Clay and gold copy always use their contrast-corrected values. Their brighter values belong to marks, rings, and pattern.

## Typography

**Display Font:** Plus Jakarta Sans (with system sans-serif fallback)  
**Body Font:** Plus Jakarta Sans (with system sans-serif fallback)  
**Arabic Font:** Amiri (with Traditional Arabic fallback)

**Character:** Heavy Jakarta display text gives the promise clarity without borrowing authority from a traditional serif. Amiri is reserved for Arabic scripture so sacred text retains the calligraphic rhythm the surrounding interface deliberately avoids imitating.

### Hierarchy

- **Display** (800, responsive, 0.98 line height): one direct promise or section thesis.
- **Headline** (800, responsive, approximately 1.05 line height): major objection and outcome sections.
- **Title** (700–800): cards, FAQ questions, and interactive state names.
- **Body** (400–600, approximately 1.7 line height): concrete explanation, generally capped near 62 characters.
- **Label** (700, small uppercase with wide tracking): section orientation, never the primary message.
- **Arabic** (400, 1.9 line height): complete passages with translation and reference.

### Named Rules

**The Plain Promise Rule.** Display type may be emotionally direct, but supporting copy must immediately name the product mechanism in ordinary language.

## Layout

The desktop canvas uses a centered 1240px maximum with 20px phone gutters and 32px larger-screen gutters. First viewports may use an asymmetric copy/device split; reading sections alternate between focused full-width moments and compact two-column proof. Space above a section thesis is greater than the gap beneath it.

At phone widths, every conversion argument follows one reading column. Proof may use a two-by-two grid, but screenshots, controls, headings, and forms never require horizontal scrolling. A section earns its height through proof or decision-making; repeated feature narration is removed.

## Elevation & Depth

Depth is warm and diffuse. Cards use tonal separation first, then a soft brown shadow; devices receive layered drop shadows that respect their transparent rounded masks. The espresso stage uses blacker shadows because it is a distinct physical surface. Blur-backed navigation is allowed only as a temporary condensed layer over content.

### Shadow Vocabulary

- **Warm lift:** A tiny contact shadow plus a broad, low-opacity brown falloff for cards.
- **Device lift:** Two drop-shadow layers—one edge definition and one ambient depth field.
- **Deep device lift:** The same structure with stronger black opacity on espresso.

### Named Rules

**The Warm Shadow Rule.** Light-theme elevation never uses cold neutral gray or a harsh single shadow.

## Shapes

Actions are full pills. Fields use a restrained 14px curve; tiles use 18px; large cards use 24px. The limited scale keeps soft geometry intentional. Device imagery preserves its own anti-aliased mask and bezel and is never placed inside a generic phone-frame component.

## Components

### Buttons

- **Shape:** Full pill with confident horizontal padding.
- **Primary:** Companion Olive with warm off-white copy and a shallow warm shadow.
- **Hover / Focus:** Fine-pointer hover may rise by one pixel; press feedback is a subtle scale, and visible focus remains a 2px olive outline with 3px offset.
- **Tonal:** Surface Sand with Warm Ink and a one-pixel inset line.

### Cards / Containers

- **Corner Style:** Large, gently curved card silhouette.
- **Background:** Paper Card or tonal Sand depending on hierarchy.
- **Shadow Strategy:** Flat by default for dense groups; warm lift only when separation needs depth.
- **Border:** Hairline warm-ink transparency, never a cold gray outline.

### Inputs / Fields

- **Style:** Raised Paper field with an inset warm hairline and 14px corners.
- **Focus:** Olive focus outline and stronger field ring without layout shift.
- **Error / Disabled:** Clay communicates validation; disabled state retains readable text and reduces emphasis without disappearing.

### Navigation

The wordmark stays visually stable while the background plate condenses after scroll. Section links are quiet until hover/focus; the offer CTA remains the only filled action. Mobile navigation is a compact disclosure, not a full-screen takeover.

### Scripture Moment

Arabic, translation, and reference are inseparable. The full-bleed field may carry star pattern and a deep or warm tonal stage, but no form or commercial CTA competes inside the sacred block.

## Do's and Don'ts

### Do:

- **Do** use real Rafiq screens when demonstrating a capability.
- **Do** let one strong page-scale pattern or motion gesture create memory.
- **Do** pair every emotional headline with literal mechanism and privacy copy.
- **Do** keep all substantive content visible before motion enhancement.

### Don't:

- **Don't** invent proof, decorative dashboards, testimonials, or capability data.
- **Don't** scatter icons into generic feature-card grids when a real screen or precise statement is available.
- **Don't** place the negative-space mark bare on an espresso surface; use its warm seal plate.
- **Don't** gamify worship, add urgency theater, or turn the site into a punitive warning.

