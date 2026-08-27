import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const css = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

describe("shared CSS motion contract", () => {
  it("declares the interaction timing vocabulary", () => {
    expect(css).toContain("--ease-out: cubic-bezier(0.23, 1, 0.32, 1)");
    expect(css).toContain("--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)");
    expect(css).toContain("--duration-press: 140ms");
    expect(css).toContain("--duration-ui: 200ms");
    expect(css).toContain("--duration-panel: 240ms");
  });

  it("targets spatial motion instead of deleting all useful feedback", () => {
    expect(css).toContain('[data-spatial-motion="true"]');
    expect(css).toContain(".pressable");
    expect(css).not.toContain("transition-duration: 0.01ms !important");
  });
});
