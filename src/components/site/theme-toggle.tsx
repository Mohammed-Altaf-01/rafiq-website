"use client";

import { MoonStarsIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// Android Chrome tints its toolbar from this tag, so it has to follow the toggle.
function syncBrowserChrome() {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", getComputedStyle(document.documentElement).getPropertyValue("--bg"));
}

/*
 * The theme lives on `<html data-theme>`, written before first paint by
 * ThemeScript. This subscribes to that attribute rather than mirroring it into
 * React state, so there is one source of truth and nothing to keep in sync.
 */
function subscribe(onChange: () => void) {
  syncBrowserChrome();
  const observer = new MutationObserver(() => {
    syncBrowserChrome();
    onChange();
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const readTheme = (): Theme => (document.documentElement.dataset.theme as Theme) ?? "light";

// Undefined on the server, so the icon is withheld until the client knows the
// real theme instead of guessing and flipping on hydration.
const readOnServer = (): Theme | undefined => undefined;

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, readOnServer);

  function toggle() {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("rafiq-theme", next);
    } catch {
      // Private browsing. The in-memory flip still holds for this session.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="pressable inline-flex size-11 items-center justify-center rounded-full text-ink-soft inset-ring inset-ring-line"
    >
      {theme === "dark" ? (
        <SunIcon size={18} weight="regular" />
      ) : theme === "light" ? (
        <MoonStarsIcon size={18} weight="regular" />
      ) : null}
    </button>
  );
}
