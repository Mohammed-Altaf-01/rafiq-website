import { describe, expect, it } from "vitest";

import { alt, contentType, dynamic, size } from "@/app/opengraph-image";

describe("Open Graph image contract", () => {
  it("uses the universal sharing dimensions and names the offer", () => {
    expect(size).toEqual({ width: 1200, height: 630 });
    expect(contentType).toBe("image/png");
    expect(alt).toContain("30 days Premium free");
    expect(dynamic).toBe("force-static");
  });
});
