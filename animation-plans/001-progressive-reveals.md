# 001 — Keep content visible while preserving meaningful reveals

- **Status**: DONE
- **Commit**: 063844a
- **Severity**: HIGH
- **Category**: Accessibility / performance
- **Estimated scope**: 3 files, roughly 120 lines

## Problem

The static export writes substantive landing-page content with inline `opacity: 0`. If JavaScript fails, is delayed, or Motion never hydrates, visitors and assistive tooling receive a page whose content remains invisible. The audit found 69 such inline declarations in `out/index.html`.

```tsx
// src/components/ui/reveal.tsx:31-38 — current
<Tag
  className={className}
  initial={{ opacity: 0, y }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.25 }}
  transition={{ duration: 0.75, delay, ease: EASE }}
>
```

```tsx
// src/components/ui/scripture.tsx:61-80 — current
initial="hidden"
whileInView="shown"
viewport={{ once: true, amount: 0.5 }}
// ...
hidden: { opacity: 0, filter: "blur(3px)", y: 8 },
shown: {
  opacity: 1,
  filter: "blur(0px)",
  y: 0,
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
},
```

## Target

The exported HTML and the first hydrated render must be fully visible. Once the client is mounted, off-screen elements may settle into a hidden state and reveal as they enter. Use only `opacity`, `filter` under 20px, and full `transform` strings.

```ts
const reveal = {
  hidden: { opacity: 0, transform: "translate3d(0, 18px, 0)" },
  shown: {
    opacity: 1,
    transform: "translate3d(0, 0, 0)",
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
  },
};
```

The reveal wrapper must use `initial={false}`. A mount flag plus `useInView(..., { once: true, amount: 0.2 })` controls `animate`; before mount, `animate="shown"`. Group delays must be 50ms and decorative only. Under reduced motion, MotionConfig may retain opacity but must remove translation.

## Repo conventions to follow

- Shared motion configuration lives in `src/components/motion-provider.tsx`.
- Shared animation primitives live in `src/components/ui/reveal.tsx`.
- The app uses `motion/react`; do not add another animation package.
- `src/app/globals.css:395-407` already has a reduced-motion section, which plan 004 will refine.

## Steps

1. Add component tests proving a `Reveal` child and every Arabic scripture word render visible in the initial DOM style and remain present under reduced motion.
2. Run the focused tests and confirm they fail because the current output contains a hidden initial state.
3. Refactor `src/components/ui/reveal.tsx` to use a mount flag, `useInView`, `initial={false}`, full transform strings, the exact 0.55s ease-out above, and 50ms group delays.
4. Refactor `src/components/ui/scripture.tsx` to keep all words visible before client enhancement; preserve the reading-order reveal after mount with `opacity`, `blur(3px)`, and `translate3d(0, 8px, 0)` only.
5. Run tests, lint, and a static build. Count inline `opacity:0` declarations in `out/index.html`; substantive section copy must contribute zero.

## Boundaries

- Do NOT change scripture text, translation, reference, or Arabic reading order.
- Do NOT introduce CSS scroll-timeline or a second motion library.
- Do NOT make content availability depend on JavaScript.
- If the Motion APIs differ from the installed version, read that installed package's types before adapting.

## Verification

- **Mechanical**: `npm run test -- reveal scripture`, `npm run lint`, `npm run build`, then inspect `out/index.html` for hidden substantive content; all commands exit 0 and the hidden-content assertion passes.
- **Feel check**: scroll slowly on desktop and mobile. Each block should rise 18px at most and settle in 550ms; groups follow reading order at 50ms intervals without delaying interaction.
- In DevTools, set playback to 10% and confirm there is no layout movement, only composited transform/opacity.
- Disable JavaScript and reload: all section and scripture copy must remain visible.
- Toggle reduced motion: translation disappears while gentle opacity feedback remains.
- **Done when**: no visitor can lose content because an entrance animation failed, while enhanced clients still receive one restrained reveal per section.
