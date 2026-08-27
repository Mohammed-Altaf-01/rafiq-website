import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Nav } from "@/components/site/nav";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

describe("Nav menu interruption", () => {
  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();
    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
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
