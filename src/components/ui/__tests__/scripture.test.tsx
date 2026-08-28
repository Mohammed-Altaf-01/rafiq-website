import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { getScriptureMotion, Scripture } from "@/components/ui/scripture";
import { loweringTheGaze } from "@/lib/scripture";

describe("progressive Scripture markup", () => {
  it("exports every Arabic word, translation, and reference visibly", () => {
    const html = renderToStaticMarkup(<Scripture passage={loweringTheGaze} />);

    for (const word of loweringTheGaze.arabic.split(" ")) expect(html).toContain(word);
    expect(html).toContain(loweringTheGaze.translation);
    expect(html).toContain("24:30");
    expect(html).not.toMatch(/opacity:\s*0/);
    expect(html).not.toMatch(/filter:\s*blur\(3px\)/);
  });

  it("removes word travel, blur, and stagger when reduced motion is requested", () => {
    const reduced = getScriptureMotion(true, loweringTheGaze.arabic.split(" ").length);

    expect(reduced.group.shown.transition.staggerChildren).toBe(0);
    expect(reduced.word.hidden).toEqual({
      opacity: 1,
      filter: "blur(0px)",
      transform: "translate3d(0, 0, 0)",
    });
    expect(reduced.word.shown).toMatchObject({
      opacity: 1,
      filter: "blur(0px)",
      transform: "translate3d(0, 0, 0)",
      transition: { duration: 0 },
    });
  });
});
