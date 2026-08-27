import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { trackMock } = vi.hoisted(() => ({ trackMock: vi.fn() }));

vi.mock("@vercel/analytics", () => ({ track: trackMock }));

const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfpNMJaXgnurO4chFT8YrJG3qn3hx6H693O5TmHDr8v5kloxw/formResponse";
const FORM_FIELD = "entry.1045781291";

beforeEach(() => {
  vi.resetModules();
  localStorage.clear();
  trackMock.mockReset();
});

afterEach(() => {
  vi.doUnmock("@/lib/site");
  vi.unstubAllGlobals();
});

async function loadEarlyAccess() {
  return (await import("@/components/ui/early-access")).EarlyAccess;
}

async function loadEarlyAccessWithSite(overrides: {
  playStore?: string | null;
  offer?: { active?: boolean; action?: string | null };
}) {
  vi.doMock("@/lib/site", async () => {
    const actual = await vi.importActual<typeof import("@/lib/site")>("@/lib/site");
    return {
      ...actual,
      site: {
        ...actual.site,
        ...overrides,
        offer: {
          ...actual.site.offer,
          ...overrides.offer,
        },
      },
    };
  });
  return loadEarlyAccess();
}

async function renderEarlyAccess(
  props: Partial<ComponentProps<Awaited<ReturnType<typeof loadEarlyAccess>>>> = {},
) {
  const EarlyAccess = await loadEarlyAccess();
  return render(<EarlyAccess source="hero" {...props} />);
}

describe("progressive form contract", () => {
  it("exposes a real Google Form POST and the approved 30-day promise", async () => {
    await renderEarlyAccess();

    const form = screen.getByRole("form", {
      name: "Reserve 30 days of Rafiq Premium from the introduction",
    });
    expect(form).toHaveAttribute("action", FORM_ACTION);
    expect(form).toHaveAttribute("method", "post");
    expect(form).not.toHaveAttribute("novalidate");
    expect(screen.getByRole("textbox", { name: "Email address" })).toHaveAttribute(
      "name",
      FORM_FIELD,
    );
    expect(screen.getByRole("button", { name: "Claim my free month" })).toBeEnabled();
    expect(
      screen.getByText("No card. One launch email. Nothing you look at leaves your phone."),
    ).toBeInTheDocument();
  });

  it("tracks a form view once without personal data", async () => {
    const { rerender } = await renderEarlyAccess();
    const EarlyAccess = await loadEarlyAccess();

    await waitFor(() =>
      expect(trackMock).toHaveBeenCalledWith("early_access_form_view", { source: "hero" }),
    );
    rerender(<EarlyAccess source="hero" className="updated" />);

    expect(
      trackMock.mock.calls.filter(([event]) => event === "early_access_form_view"),
    ).toHaveLength(1);
  });
});

describe("submission states", () => {
  it("waits until blur before flagging an incomplete address", async () => {
    const user = userEvent.setup();
    await renderEarlyAccess();

    const input = screen.getByRole("textbox", { name: "Email address" });
    await user.type(input, "person@");
    expect(screen.queryByText(/does not look like an email address/)).not.toBeInTheDocument();

    await user.tab();

    expect(
      screen.getByText("That does not look like an email address. Check it and try again."),
    ).toBeInTheDocument();
    expect(trackMock).toHaveBeenCalledWith("early_access_invalid", { source: "hero" });
  });

  it("rejects a malformed address after submission and never starts a request", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    await renderEarlyAccess();

    await user.type(screen.getByRole("textbox", { name: "Email address" }), "not-an-email");
    await user.click(screen.getByRole("button", { name: "Claim my free month" }));

    expect(
      screen.getByText("That does not look like an email address. Check it and try again."),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(trackMock).toHaveBeenCalledWith("early_access_invalid", { source: "hero" });
  });

  it("shows sending, then synchronizes both forms to request-sent success", async () => {
    const user = userEvent.setup();
    let releaseRequest: (() => void) | undefined;
    const request = new Promise<void>((resolve) => {
      releaseRequest = resolve;
    });
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(request));
    const EarlyAccess = await loadEarlyAccess();
    render(
      <>
        <EarlyAccess source="hero" />
        <EarlyAccess source="offer" />
      </>,
    );

    const heroForm = screen.getByRole("form", {
      name: "Reserve 30 days of Rafiq Premium from the introduction",
    });
    expect(
      screen.getByRole("form", {
        name: "Reserve 30 days of Rafiq Premium from the free-month offer",
      }),
    ).toBeInTheDocument();
    await user.type(within(heroForm).getByRole("textbox", { name: "Email address" }), "person@example.com");
    await user.click(within(heroForm).getByRole("button", { name: "Claim my free month" }));

    expect(within(heroForm).getByRole("button", { name: "Reserving…" })).toBeDisabled();
    releaseRequest?.();

    await waitFor(() =>
      expect(screen.getAllByText("Your free month is reserved.")).toHaveLength(2),
    );
    expect(trackMock).toHaveBeenCalledWith("early_access_submit", { source: "hero" });
    expect(trackMock).toHaveBeenCalledWith("early_access_request_sent", { source: "hero" });
    expect(JSON.stringify(trackMock.mock.calls)).not.toContain("person@example.com");
  });

  it("shows a retry and support fallback for a network rejection", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("private diagnostic")));
    await renderEarlyAccess({ source: "offer" });

    await user.type(screen.getByRole("textbox", { name: "Email address" }), "person@example.com");
    await user.click(screen.getByRole("button", { name: "Claim my free month" }));

    expect(await screen.findByText(/That request did not leave your browser/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "email Rafiq support" })).toHaveAttribute(
      "href",
      "mailto:rafiqgaurdian@gmail.com",
    );
    expect(trackMock).toHaveBeenCalledWith("early_access_error", {
      source: "offer",
      reason: "network",
    });
    expect(JSON.stringify(trackMock.mock.calls)).not.toContain("private diagnostic");
  });

  it("lets a honeypot submission resolve quietly without a request or funnel event", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { container } = await renderEarlyAccess();

    await user.type(screen.getByRole("textbox", { name: "Email address" }), "person@example.com");
    fireEvent.change(container.querySelector('input[name="company"]') as HTMLInputElement, {
      target: { value: "bot value" },
    });
    await user.click(screen.getByRole("button", { name: "Claim my free month" }));

    expect(await screen.findByText("Your free month is reserved.")).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(trackMock.mock.calls.some(([event]) => event === "early_access_submit")).toBe(false);
    expect(trackMock.mock.calls.some(([event]) => event === "early_access_request_sent")).toBe(
      false,
    );
  });
});

describe("remembered and fallback states", () => {
  it("lets a returning visitor use a different email without claiming to delete the first row", async () => {
    const user = userEvent.setup();
    localStorage.setItem("rafiq-early-access", "wrong@example.com");
    await renderEarlyAccess({ source: "offer" });

    expect(screen.getByText("Your free month is reserved.")).toBeInTheDocument();
    expect(screen.getByText(/does not remove the earlier reservation/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Use a different email" }));

    expect(await screen.findByRole("textbox", { name: "Email address" })).toHaveValue("");
    expect(localStorage.getItem("rafiq-early-access")).toBeNull();
    expect(trackMock).toHaveBeenCalledWith("early_access_email_change", { source: "offer" });
  });

  it("uses the Play Store link once a listing exists", async () => {
    const EarlyAccess = await loadEarlyAccessWithSite({
      playStore: "https://play.google.com/store/apps/details?id=com.rafiq",
    });
    render(<EarlyAccess source="hero" />);

    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Get Rafiq on Google Play" })).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.rafiq",
    );
  });

  it("uses the support mail fallback when capture is inactive", async () => {
    const EarlyAccess = await loadEarlyAccessWithSite({
      offer: { active: false, action: null },
    });
    render(<EarlyAccess source="hero" />);

    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Get early access" })).toHaveAttribute(
      "href",
      expect.stringContaining("mailto:"),
    );
  });
});
