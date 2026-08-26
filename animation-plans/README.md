# Rafiq animation improvement plans

Audit commit: `063844a`

| # | Plan | Severity | Status |
|---|---|---|---|
| 001 | Keep content visible while preserving meaningful reveals | HIGH | TODO |
| 002 | Consolidate on Motion and replace scroll-controlled stages | HIGH | TODO |
| 003 | Tighten forms, navigation, FAQ, and press feedback | MEDIUM | TODO |
| 004 | Preserve useful feedback with reduced motion | MEDIUM | TODO |

## Recommended execution order

1. **002** removes the duplicate GSAP system and defines the new product-state structure.
2. **003** establishes the shared easing and duration tokens consumed by the remaining plans.
3. **001** makes section and scripture reveals progressively enhanced and static-export safe.
4. **004** applies the final reduced-motion policy across every revised interaction.

Plans 001 and 004 depend on the single-library architecture from 002. Plan 001 and plan 002 consume the timing vocabulary from 003, so the executor should land the token portion of 003 before their final refactor even if tests are written in the order above.

