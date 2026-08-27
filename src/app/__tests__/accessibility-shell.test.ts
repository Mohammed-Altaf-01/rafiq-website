import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const read = (file: string) => readFileSync(resolve(process.cwd(), file), "utf8");

describe("route accessibility shell", () => {
  it("renders the skip link before route content", () => {
    const layout = read("src/app/layout.tsx");

    expect(layout.indexOf("<SkipLink />")).toBeGreaterThan(-1);
    expect(layout.indexOf("<SkipLink />")).toBeLessThan(layout.indexOf("{children}"));
  });

  it.each([
    "src/app/page.tsx",
    "src/components/legal/legal-page.tsx",
    "src/app/delete-account/page.tsx",
  ])("gives %s a main-content target", (file) => {
    expect(read(file)).toContain('id="main-content"');
  });
});
