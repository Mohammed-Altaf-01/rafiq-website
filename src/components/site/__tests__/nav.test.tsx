import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Nav } from "@/components/site/nav";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

describe("Nav menu interruption", () => {
  it("keeps the closed mobile tree unmounted and focuses its first link on open", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    const trigger = screen.getByRole("button", { name: "Open menu" });
    expect(trigger).not.toHaveAttribute("aria-controls");
    expect(document.getElementById("mobile-sections-menu")).not.toBeInTheDocument();

    await user.click(trigger);

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-controls",
      "mobile-sections-menu",
    );
    expect(document.getElementById("mobile-sections-menu")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "How it works" }).at(-1)).toHaveFocus();
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();
    await user.keyboard("{Escape}");

    const trigger = screen.getByRole("button", { name: "Open menu" });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveFocus();
    await waitFor(() => {
      expect(document.getElementById("mobile-sections-menu")).not.toBeInTheDocument();
    });
  });

  it("closes after selecting a section", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getAllByRole("link", { name: "Free month" }).at(-1)!);

    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
    await waitFor(() => {
      expect(document.getElementById("mobile-sections-menu")).not.toBeInTheDocument();
    });
  });

  it("closes when the visitor interacts outside it", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Nav />
        <button type="button">Outside</button>
      </div>,
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    await user.click(screen.getByRole("button", { name: "Outside" }));

    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });
});
