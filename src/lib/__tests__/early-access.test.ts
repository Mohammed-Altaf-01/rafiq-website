import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const STORE_KEY = "rafiq-early-access";
const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfpNMJaXgnurO4chFT8YrJG3qn3hx6H693O5TmHDr8v5kloxw/formResponse";
const FORM_FIELD = "entry.1045781291";

beforeEach(() => {
  vi.resetModules();
  localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("offer configuration", () => {
  it("keeps every promotional fact in one 30-day offer", async () => {
    const { site } = await import("@/lib/site");

    expect(site).toMatchObject({
      url: "https://rafiq-website-beryl.vercel.app",
      offer: {
        active: true,
        premiumDays: 30,
        requiresCard: false,
        action: FORM_ACTION,
        field: FORM_FIELD,
      },
    });
    expect("pricing" in site).toBe(false);
  });

  it("targets the dedicated offer section while capture is active", async () => {
    const { earlyAccessTarget } = await import("@/lib/early-access");

    expect(earlyAccessTarget(true)).toBe("#free-month");
    expect(earlyAccessTarget(false)).toBe("/#free-month");
  });
});

describe("email validation", () => {
  it.each([
    ["person@example.com", true],
    [" person+tag@example.co.uk ", true],
    ["person@site", false],
    ["person@example..com", false],
    ["person@-example.com", false],
    ["person@example.c", false],
  ])("validates %s", async (value, expected) => {
    const { isEmail } = await import("@/lib/early-access");

    expect(isEmail(value)).toBe(expected);
  });
});

describe("remembered email state", () => {
  it("reads an existing reservation from local storage", async () => {
    localStorage.setItem(STORE_KEY, "saved@example.com");
    const { rememberedEmail } = await import("@/lib/early-access");

    expect(rememberedEmail()).toBe("saved@example.com");
  });

  it("notifies subscribers when another tab changes the reservation", async () => {
    const { subscribeRememberedEmail } = await import("@/lib/early-access");
    const listener = vi.fn();
    const unsubscribe = subscribeRememberedEmail(listener);

    window.dispatchEvent(new StorageEvent("storage", { key: STORE_KEY }));

    expect(listener).toHaveBeenCalledOnce();
    unsubscribe();
  });

  it("shares one storage listener across both form subscribers", async () => {
    const addEventListener = vi.spyOn(window, "addEventListener");
    const removeEventListener = vi.spyOn(window, "removeEventListener");
    const { subscribeRememberedEmail } = await import("@/lib/early-access");

    const unsubscribeHero = subscribeRememberedEmail(vi.fn());
    const unsubscribeOffer = subscribeRememberedEmail(vi.fn());

    expect(
      addEventListener.mock.calls.filter(([type]) => type === "storage"),
    ).toHaveLength(1);

    unsubscribeHero();
    expect(
      removeEventListener.mock.calls.filter(([type]) => type === "storage"),
    ).toHaveLength(0);

    unsubscribeOffer();
    expect(
      removeEventListener.mock.calls.filter(([type]) => type === "storage"),
    ).toHaveLength(1);
  });

  it("lets a visitor clear the remembered address and notifies both forms", async () => {
    localStorage.setItem(STORE_KEY, "wrong@example.com");
    const earlyAccessModule = (await import("@/lib/early-access")) as typeof import("@/lib/early-access") & {
      forgetRememberedEmail?: () => void;
    };
    const listener = vi.fn();
    const unsubscribe = earlyAccessModule.subscribeRememberedEmail(listener);

    expect(typeof earlyAccessModule.forgetRememberedEmail).toBe("function");
    earlyAccessModule.forgetRememberedEmail?.();

    expect(localStorage.getItem(STORE_KEY)).toBeNull();
    expect(earlyAccessModule.rememberedEmail()).toBeNull();
    expect(listener).toHaveBeenCalledOnce();
    unsubscribe();
  });
});

describe("Google Form request", () => {
  it("posts the trimmed address under the configured Google field and remembers it", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);
    const { rememberedEmail, submitEarlyAccess } = await import("@/lib/early-access");

    await submitEarlyAccess("  person@example.com  ");

    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(FORM_ACTION);
    expect(init).toMatchObject({ method: "POST", mode: "no-cors" });
    expect((init.body as URLSearchParams).toString()).toBe(
      `${FORM_FIELD}=person%40example.com`,
    );
    expect(rememberedEmail()).toBe("person@example.com");
  });

  it("does not remember an address when the network request rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));
    const { rememberedEmail, submitEarlyAccess } = await import("@/lib/early-access");

    await expect(submitEarlyAccess("person@example.com")).rejects.toThrow("offline");
    expect(rememberedEmail()).toBeNull();
    expect(localStorage.getItem(STORE_KEY)).toBeNull();
  });
});
