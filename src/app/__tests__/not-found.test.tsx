import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NotFound from "@/app/not-found";

describe("not found page", () => {
  it("offers a useful route back into the conversion story", () => {
    render(<NotFound />);

    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "This page is not here",
    );
    expect(screen.getByRole("link", { name: "Go home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Get Rafiq on Google Play" })).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.rafiqgaurdian.app",
    );
  });
});
