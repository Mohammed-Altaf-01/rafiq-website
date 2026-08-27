import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Home from "@/app/page";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));

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
  "How does the free month work, and what happens afterward?",
];

describe("conversion landing narrative", () => {
  it("moves from one promise through product proof to one free-month decision", () => {
    const { container } = render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /Lower your gaze\.\s*Take back your time\./,
    );
    expect(container.querySelector("main#main-content")).toBeInTheDocument();

    expect(screen.getByText("Android early access · 30 days Premium free")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Your first 30 days of Rafiq Premium are on us.",
      }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("form", { name: "Reserve 30 days of Rafiq Premium" })).toHaveLength(
      2,
    );

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
    expect(container.textContent).not.toMatch(/\$4\.99|\$35\.99|save 40%|\b7 days\b|\b14 days\b|free trial/i);
  });

  it("keeps the offer truthful and closes by returning to the decision point", () => {
    const { container } = render(<Home />);

    expect(screen.getByText("Strict blocking")).toBeInTheDocument();
    expect(screen.getByText("Hard app limits")).toBeInTheDocument();
    expect(screen.getByText("Cross-app protection")).toBeInTheDocument();
    expect(screen.getByText(/launch email contains the steps to redeem it/i)).toBeInTheDocument();
    expect(screen.getByText(/falls back to its useful free tier/i)).toBeInTheDocument();

    const closingLink = screen.getByRole("link", { name: "Reserve my free month" });
    expect(closingLink).toHaveAttribute("href", "#free-month");
    expect(container.querySelectorAll('form[action*="formResponse"]')).toHaveLength(2);
  });

  it("uses visible offer text instead of unsupported ARIA on a paragraph", () => {
    render(<Home />);

    expect(screen.getByText("30", { selector: "span" }).parentElement).not.toHaveAttribute(
      "aria-label",
    );
  });

  it("keeps footer fine print on the contrast-safe text token", () => {
    render(<Home />);

    const copyright = screen.getByText(/Rafiq\. Made with care\./);
    expect(copyright).toHaveClass("text-ink-soft");
    expect(copyright).not.toHaveClass("text-ink-faint");
  });
});
