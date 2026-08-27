import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { getPanelMotion, HowItWorks } from "@/components/sections/how-it-works";

describe("HowItWorks", () => {
  it("links the selected tab to one stable panel", () => {
    render(<HowItWorks />);

    const selected = screen.getByRole("tab", { name: /Caught before it loads/ });
    const panel = screen.getByRole("tabpanel");
    expect(selected).toHaveAttribute("aria-selected", "true");
    expect(selected).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveAttribute("aria-labelledby", selected.id);
    expect(screen.getByAltText(/replacing an adult-content page/)).toBeInTheDocument();
  });

  it("changes state by click and by complete tab keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<HowItWorks />);

    const pause = screen.getByRole("tab", { name: /A pause instead of a loophole/ });
    await user.click(pause);
    expect(pause).toHaveAttribute("aria-selected", "true");
    expect(await screen.findByAltText(/completed pause screen/)).toBeInTheDocument();

    await user.keyboard("{ArrowRight}");
    const holding = screen.getByRole("tab", { name: /The rule keeps holding/ });
    expect(holding).toHaveFocus();
    expect(holding).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Home}");
    const caught = screen.getByRole("tab", { name: /Caught before it loads/ });
    expect(caught).toHaveFocus();
    expect(caught).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{End}");
    await waitFor(() => expect(holding).toHaveAttribute("aria-selected", "true"));
  });

  it("keeps reduced-motion state feedback but removes panel travel", () => {
    const reduced = getPanelMotion(true);
    const regular = getPanelMotion(false);

    expect(reduced.hidden.opacity).toBe(0);
    expect(reduced.hidden.transform).toBe(reduced.shown.transform);
    expect(regular.hidden.transform).not.toBe(regular.shown.transform);
    expect(reduced.transition.duration).toBeLessThanOrEqual(0.2);
  });
});
