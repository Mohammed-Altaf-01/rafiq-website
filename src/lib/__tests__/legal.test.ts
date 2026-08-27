import { describe, expect, it } from "vitest";

import { loadLegal } from "@/lib/legal";

describe("hosted legal documents", () => {
  it.each(["privacy-policy", "terms-and-conditions"] as const)(
    "routes the deletion link in %s to the deployed website",
    async (file) => {
      const document = await loadLegal(file);

      expect(document.html).toContain(
        "https://rafiq-website-beryl.vercel.app/delete-account/",
      );
      expect(document.html).not.toContain("https://rafiq.app");
    },
  );
});
