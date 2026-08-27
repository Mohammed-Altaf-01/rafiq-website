import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SkipLink } from "@/components/site/skip-link";

describe("SkipLink", () => {
  it("moves keyboard users to the route's main content", () => {
    render(
      <>
        <SkipLink />
        <main id="main-content">Content</main>
      </>,
    );

    expect(screen.getByRole("link", { name: "Skip to main content" })).toHaveAttribute(
      "href",
      "#main-content",
    );
  });
});
