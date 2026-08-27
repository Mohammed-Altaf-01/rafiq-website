# 004 — Preserve useful feedback with reduced motion

- **Status**: DONE
- **Commit**: 063844a
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: 4 files, roughly 90 lines

## Problem

The global reduced-motion rule collapses every transition to 0.01ms. That removes not only spatial motion but also color, opacity, validation, focus-adjacent, and state feedback that helps comprehension.

```css
/* src/app/globals.css:394-406 — current */
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Target

Reduced motion removes translation, parallax, rotation, shimmer travel, and layout movement but retains 160–200ms opacity/color/box-shadow feedback. `MotionConfig reducedMotion="user"` remains the JavaScript policy. CSS uses explicit opt-in attributes/classes for spatial motion instead of disabling every transition globally.

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .shimmer { animation: none; background-position: 50% 50%; }
  [data-spatial-motion="true"] { transform: none !important; }
  .pressable { transform: none !important; }
}
```

Motion components branch through `useReducedMotion()` where a complete transform string is computed. Reduced variants use only opacity and a maximum duration of 0.2s.

## Repo conventions to follow

- `src/components/motion-provider.tsx` already owns the Motion-wide reduced-motion setting.
- `src/components/legal/reading-progress.tsx` already calls `useReducedMotion()` and can serve as the branch pattern.
- The shimmer is decorative; freezing it preserves the brand-colored text without moving it.

## Steps

1. Add a reduced-motion media test or component-level mocked preference test proving content stays visible, parallax becomes a constant transform, and success/error opacity feedback remains.
2. Run the tests and confirm the current blanket rule/variants fail the expected contract.
3. Remove the wildcard 0.01ms reset from `src/app/globals.css`; add the exact targeted rules above.
4. Mark spatial CSS targets with `data-spatial-motion="true"` and branch dynamic Motion transforms through `useReducedMotion()`.
5. Audit shimmer, nav menu, hero, product states, FAQ, form confirmation, and legal progress under both motion preferences.

## Boundaries

- Do NOT disable all animation globally.
- Do NOT animate translation, rotation, scale, parallax, or layout under reduced motion.
- Do NOT remove opacity/color feedback that communicates a state change.
- Do NOT alter legal reading-progress semantics.

## Verification

- **Mechanical**: `npm run test -- reduced-motion`, `npm run lint`, `npm run build`, and the static verifier confirms substantive content is visible.
- **Feel check**: emulate `prefers-reduced-motion: reduce`; scroll and switch every interactive state. Nothing travels, rotates, scales, or scrubs, but each state still becomes legible through a short fade/color change.
- Emulate no preference again and verify the restrained spatial motion returns.
- **Done when**: reduced-motion users lose movement, not meaning or feedback.
