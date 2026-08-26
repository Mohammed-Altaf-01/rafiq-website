# 002 — Consolidate on Motion and replace scroll-controlled stages

- **Status**: TODO
- **Commit**: 063844a
- **Severity**: HIGH
- **Category**: Purpose, interruptibility, performance, cohesion
- **Estimated scope**: 5 files, roughly 280 lines removed or replaced

## Problem

The hero and the four-step product explanation use GSAP/ScrollTrigger while the rest of the page uses Motion. That duplicates runtime animation code, forces a long pinned scroll sequence, and drives `x`, `y`, rotation, visibility, and scroll scrubbing through JavaScript. The product explanation is rare marketing motion, but it currently owns multiple viewport heights and takes control away from the visitor.

```tsx
// src/components/sections/hero.tsx:3-16 — current
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// ...
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
```

```tsx
// src/components/sections/pause.tsx:86-95 — current
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: wrap.current,
    start: "top top",
    end: () => `+=${(steps.length - 1) * window.innerHeight * 0.85}`,
    pin: stageEl,
    scrub: 0.7,
    invalidateOnRefresh: true,
  },
  defaults: { duration: 0.5 },
});
```

```tsx
// src/components/sections/pause.tsx:107-112 — current
tl.to(screens[i - 1], { autoAlpha: 0, yPercent: -6, ease: "power1.in" }, at)
  .to(copies[i - 1], { autoAlpha: 0, y: -26, ease: "power1.in" }, at)
  // ...
  .to(copies[i], { autoAlpha: 1, y: 0, duration: 0.55, ease: "power1.out" }, at + 0.32);
```

## Target

Use `motion` as the sole JavaScript animation dependency and remove `gsap`. The hero keeps one depth gesture through a MotionValue containing the complete transform string. The product explanation becomes a compact, user-controlled three-state interface with semantic tabs on desktop and an equally compact stacked selector on mobile; no pinned scroll and no duplicated fallback DOM.

Hero depth:

```ts
const transform = useTransform(
  scrollYProgress,
  [0, 1],
  reduce ? ["translate3d(0,0,0)", "translate3d(0,0,0)"] : ["translate3d(0,0,0)", "translate3d(0,-5%,0)"],
);
```

State transition:

```ts
const panel = {
  hidden: { opacity: 0, transform: "translate3d(0, 10px, 0)" },
  shown: { opacity: 1, transform: "translate3d(0, 0, 0)" },
};
const transition = { duration: 0.22, ease: [0.23, 1, 0.32, 1] };
```

Tabs implement arrow-key navigation, Home/End, `aria-selected`, `aria-controls`, and visible focus. The three states explain (1) blocked content, (2) the intentional pause/dhikr, and (3) limits and short-feed protection. State changes must be interruptible and must not block a click.

## Repo conventions to follow

- `motion/react` is already used in nav, forms, FAQ, scripture, and reading progress.
- Device screenshots and typed sources come from `src/components/ui/device.tsx` and `src/lib/screens.ts`.
- The approved information architecture calls this section `#how-it-works`; navigation resolves landing-page hashes from legal routes.
- Use the strong ease-out token `cubic-bezier(0.23, 1, 0.32, 1)` introduced by plan 003.

## Steps

1. Add interaction tests for the three-state interface: default state, click selection, right/left arrows, Home/End, tab/panel ARIA linkage, and reduced-motion rendering.
2. Run the tests and confirm they fail because no three-state component exists.
3. Replace `src/components/sections/pause.tsx` with `src/components/sections/how-it-works.tsx`, preserving truthful product copy and using one screenshot/panel at a time.
4. Split the hero into a server-rendered copy/form shell and a small `src/components/sections/hero-visual.tsx` client island. Recreate only the two-device depth gesture with Motion full-transform strings.
5. Update `src/app/page.tsx` and navigation anchors to use `#how-it-works`.
6. Remove the `gsap` package and refresh `package-lock.json`; verify no `gsap` or `ScrollTrigger` imports remain.
7. Run focused tests, lint, build, and compare generated client chunks before and after.

## Boundaries

- Do NOT add carousel autoplay, scroll hijacking, or another motion dependency.
- Do NOT invent capabilities beyond the existing four truthful triggers.
- Do NOT use Motion `x`, `y`, or `scale` shorthands for the scroll-driven phone artwork; animate a complete `transform` string.
- Do NOT keep both the old and new product-explanation DOM trees.

## Verification

- **Mechanical**: `npm run test -- how-it-works hero`, `npm run lint`, `npm run build`, `npm ls gsap` must show no installed dependency, and `rg -n 'gsap|ScrollTrigger' src package.json` returns no matches.
- **Feel check**: device depth is subtle and linked to scroll without lag; quickly switching states always retargets from the current visual state; no viewport is pinned.
- In DevTools at 10% playback, the state panel should move 10px and fade over 220ms with no blank frame.
- Toggle reduced motion: hero artwork stays still and state changes keep opacity only.
- **Done when**: the page has one motion language, one product-demo DOM tree, no scroll trap, and keyboard-complete state selection.

