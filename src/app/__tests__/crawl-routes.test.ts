import { describe, expect, it } from "vitest";

import robots, { dynamic as robotsDynamic } from "@/app/robots";
import sitemap, { dynamic as sitemapDynamic } from "@/app/sitemap";

const base = "https://www.rafiqguardian.app";

describe("crawl metadata", () => {
  it("opts metadata routes into static export", () => {
    expect(robotsDynamic).toBe("force-static");
    expect(sitemapDynamic).toBe("force-static");
  });

  it("allows the public site and advertises its sitemap", () => {
    expect(robots()).toMatchObject({
      rules: { userAgent: "*", allow: "/" },
      host: base,
      sitemap: `${base}/sitemap.xml`,
    });
  });

  it("lists every public page at its canonical URL", () => {
    expect(sitemap().map(({ url }) => url)).toEqual([
      `${base}/`,
      `${base}/privacy/`,
      `${base}/terms/`,
      `${base}/delete-account/`,
    ]);
  });
});
