import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import Home from "@/app/page";

const trackMock = vi.hoisted(() => vi.fn());

vi.mock("@vercel/analytics", () => ({ track: trackMock }));

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.rafiqgaurdian.app";

const proofLabels = [
  "Adult content",
  "Shorts & Reels",
  "Daily app limits",
  "On-device matching",
];

const pauseStates = [
  "Caught before it loads",
  "A pause instead of a loophole",
  "The rule keeps holding",
];

const privacyLabels = ["Briefly inspected", "Stored on your phone", "Never sent off-device"];

const progressOutcomes = [
  "An honest streak",
  "Patterns visible over time",
  "Minutes handed back",
];

const faqQuestions = [
  "Why does Rafiq need Android Accessibility permission?",
  "What exactly does it block?",
  "Can protection be switched off?",
  "Does it work offline, and does browsing data leave the phone?",
  "Where can I get Rafiq?",
];

describe("conversion landing narrative", () => {
  beforeEach(() => {
    trackMock.mockClear();
  });

  it("moves from one promise through product proof to a direct Google Play decision", () => {
    const { container } = render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Lower your gaze\.\s*Take back your time\./,
    );
    expect(container.querySelector("main#main-content")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Your companion is ready on Google Play.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Available now for Android 8\.1 and newer\./)).toBeInTheDocument();

    for (const label of proofLabels) expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText("Qur'an 24:30")).toBeInTheDocument();
    for (const state of pauseStates) {
      expect(screen.getByRole("tab", { name: new RegExp(state) })).toBeInTheDocument();
    }
    for (const label of privacyLabels) expect(screen.getByText(label)).toBeInTheDocument();
    for (const outcome of progressOutcomes) expect(screen.getByText(outcome)).toBeInTheDocument();

    const faq = screen.getByRole("region", { name: "Questions before you decide" });
    expect(within(faq).getAllByRole("button")).toHaveLength(5);
    for (const question of faqQuestions) {
      expect(within(faq).getByRole("button", { name: question })).toBeInTheDocument();
    }

    expect(container.querySelector("#pricing")).not.toBeInTheDocument();
    expect(container.querySelector("form")).not.toBeInTheDocument();
    expect(container.querySelector('input[type="email"]')).not.toBeInTheDocument();
    expect(container.textContent).not.toMatch(
      /early access|free month|launch email|before launch|claim my|reserve my|\$4\.99|\$35\.99|save 40%|\b7 days\b|\b14 days\b|free trial/i,
    );
  });

  it("sends every acquisition placement to the live store listing", async () => {
    const user = userEvent.setup();
    const { container } = render(<Home />);

    expect(screen.getByText("Strict blocking")).toBeInTheDocument();
    expect(screen.getByText("Hard app limits")).toBeInTheDocument();
    expect(screen.getByText("Cross-app protection")).toBeInTheDocument();
    expect(screen.getByText(/No website signup is required/i)).toBeInTheDocument();
    expect(screen.getByText(/You can start with the free tier/i)).toBeInTheDocument();

    const storeLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href") === PLAY_STORE_URL);
    expect(storeLinks.length).toBeGreaterThanOrEqual(4);
    for (const link of storeLinks) {
      expect(link).toHaveAttribute("href", PLAY_STORE_URL);
      expect(link.querySelector("svg")).toBeInTheDocument();
    }

    const hero = screen.getByRole("region", {
      name: /Lower your gaze\.\s*Take back your time\./,
    });
    const heroLink = within(hero).getByRole("link", { name: "Get Rafiq on Google Play" });
    heroLink.addEventListener("click", (event) => event.preventDefault(), { once: true });
    await user.click(heroLink);

    expect(trackMock).toHaveBeenCalledWith("play_store_click", { source: "hero" });
    expect(container.querySelector('a[href*="formResponse"]')).not.toBeInTheDocument();
  });

  it("keeps footer fine print on the contrast-safe text token", () => {
    render(<Home />);

    const copyright = screen.getByText(/Rafiq\. Made with care\./);
    expect(copyright).toHaveClass("text-ink-soft");
    expect(copyright).not.toHaveClass("text-ink-faint");
  });
});
