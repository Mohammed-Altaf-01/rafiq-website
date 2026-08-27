import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Faq } from "@/components/sections/faq";

describe("FAQ disclosure", () => {
  it("keeps every native disclosure answer visible when JavaScript is unavailable", () => {
    const html = renderToStaticMarkup(<Faq />);

    expect(html).toContain("falls back to its useful free tier");
    expect(html).not.toMatch(/opacity:\s*0/);
  });

  it("retargets repeated disclosure changes without losing state", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const first = screen.getByRole("button", {
      name: "Why does Rafiq need Android Accessibility permission?",
    });
    const second = screen.getByRole("button", { name: "What exactly does it block?" });

    expect(first).toHaveAttribute("aria-expanded", "true");
    await user.click(second);
    await waitFor(() => expect(second).toHaveAttribute("aria-expanded", "true"));
    await user.click(second);
    await waitFor(() => expect(second).toHaveAttribute("aria-expanded", "false"));
    await user.click(first);
    await waitFor(() => expect(first).toHaveAttribute("aria-expanded", "false"));
  });
});
