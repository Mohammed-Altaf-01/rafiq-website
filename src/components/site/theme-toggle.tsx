"use client";

import { MoonStarsIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/*
 * The theme lives on `<html data-theme>`, written before first paint by
 * ThemeScript. This subscribes to that attribute rather than mirroring it into
 * React state, so there is one source of truth and nothing to keep in sync.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
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

export function ThemeToggle({ onDark = false }: { onDark?: boolean }) {
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
      className="inline-flex size-10 items-center justify-center rounded-full transition-colors duration-200 active:scale-[0.94]"
      style={{
        color: onDark ? "var(--deep-ink-soft)" : "var(--ink-soft)",
        boxShadow: `inset 0 0 0 1px ${onDark ? "var(--deep-line)" : "var(--line)"}`,
      }}
    >
      {theme === "dark" ? (
        <SunIcon size={18} weight="regular" />
      ) : theme === "light" ? (
        <MoonStarsIcon size={18} weight="regular" />
      ) : null}
    </button>
  );
}
