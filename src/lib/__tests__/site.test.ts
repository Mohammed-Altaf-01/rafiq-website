import { describe, expect, it } from "vitest";

import { nav, site } from "@/lib/site";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.rafiqgaurdian.app";

describe("launched acquisition configuration", () => {
  it("routes acquisition to the live Google Play listing without an email offer", () => {
    expect(site.playStore).toBe(PLAY_STORE_URL);
    expect(nav.at(-1)).toEqual({ label: "Get the app", hash: "#download" });
    expect("offer" in site).toBe(false);
    expect("earlyAccessUrl" in site).toBe(false);
  });
});
