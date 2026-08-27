import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

describe("progressive Reveal markup", () => {
  it("exports substantive content without an inline hidden state", () => {
    const html = renderToStaticMarkup(
      <Reveal>
        <h2>Always readable</h2>
      </Reveal>,
    );

    expect(html).toContain("Always readable");
    expect(html).not.toMatch(/opacity:\s*0/);
    expect(html).not.toMatch(/translate(?:Y|3d)\([^)]*(?:18|20|22)px/);
  });

  it("keeps grouped children visible in static output", () => {
    const html = renderToStaticMarkup(
      <RevealGroup>
        <RevealItem>First proof</RevealItem>
        <RevealItem>Second proof</RevealItem>
      </RevealGroup>,
    );

    expect(html).toContain("First proof");
    expect(html).toContain("Second proof");
    expect(html).not.toMatch(/opacity:\s*0/);
  });
});
