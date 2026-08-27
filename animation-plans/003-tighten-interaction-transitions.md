# 003 — Tighten forms, navigation, FAQ, and press feedback

- **Status**: DONE
- **Commit**: 063844a
- **Severity**: MEDIUM
- **Category**: Easing, duration, physicality, performance
- **Estimated scope**: 7 files, roughly 180 lines

## Problem

Interactive controls mix `transition-all`, weak/default curves, layout animation, and durations from 200ms to 400ms. These high-frequency actions need a smaller shared vocabulary and transform-origin-aware feedback.

```tsx
// src/components/ui/button.tsx:9-10 — current
"px-7 py-3.5 text-[0.95rem] font-bold transition-all duration-200 " +
"active:translate-y-[1px] active:scale-[0.985]";
```

```tsx
// src/components/ui/early-access.tsx:149-160 — current
className={`... transition-all duration-200 hover:-translate-y-[1px] active:translate-y-[1px] active:scale-[0.985] ...`}
// ...
{status === "sending" ? "Sending…" : "Get early access"}
```

```tsx
// src/components/sections/faq.tsx:81-86 — current
<motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: "auto", opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
>
```

## Target

Add shared motion tokens to `src/app/globals.css`:

```css
--ease-out: cubic-bezier(0.23, 1, 0.32, 1);
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
--duration-press: 140ms;
--duration-ui: 200ms;
--duration-panel: 240ms;
```

Buttons use `transform 140ms var(--ease-out), background-color 200ms ease, box-shadow 200ms ease`; `:active` uses `scale(0.97)`, and hover translation only applies inside `@media (hover: hover) and (pointer: fine)`. Navigation/form panels enter in 220–240ms with opacity plus a 10px full transform. FAQ content never animates `height`; use Motion layout/FLIP for sibling repositioning and animate the body with opacity plus `translate3d(0, 6px, 0)` over 200ms.

## Repo conventions to follow

- Motion tokens belong next to color/radius tokens in `src/app/globals.css`.
- Focus remains the existing 2px primary outline with 3px offset.
- The page uses rounded pill primary actions and warm-tinted shadows; preserve those visual choices.
- Use `AnimatePresence initial={false}` for form and FAQ state swaps.

## Steps

1. Add tests for form sending/success/error transitions, FAQ rapid toggling, navigation Escape/outside behavior, and pressable accessible names.
2. Run focused tests and confirm the missing behaviors fail for the intended reasons.
3. Add the exact motion tokens above and shared `.pressable` rules with pointer/hover gating.
4. Replace all `transition-all` uses in buttons, nav CTA, and early-access submit with explicit transition properties.
5. Change nav and form panel animations to 220–240ms strong ease-out transforms and opacity; use full transform strings.
6. Refactor FAQ to avoid animated height, keep panel IDs/controls, support rapid retargeting, and move adjacent rows using Motion layout.
7. Verify no `transition-all`, `height: "auto"`, or UI transition over 300ms remains.

## Boundaries

- Do NOT change the visual palette or button hierarchy.
- Do NOT animate keyboard focus or move a control when focus arrives.
- Do NOT use `scale(0)`; the active target is exactly `scale(0.97)`.
- Do NOT add a tooltip or animation package.

## Verification

- **Mechanical**: `npm run test -- early-access faq nav`, `npm run lint`, `npm run build`, and `rg -n 'transition-all|height: "auto"' src` returns no UI matches.
- **Feel check**: spam FAQ and menu toggles; transitions retarget cleanly. Buttons respond immediately on press and do not drift on touchscreens.
- At 10% playback, panel motion begins quickly and decelerates; no `ease-in` delays the action.
- Toggle reduced motion: opacity/color feedback remains, translation and layout travel disappear.
- **Done when**: every high-frequency interaction feels immediate, interruptible, keyboard-safe, and governed by one shared timing vocabulary.
