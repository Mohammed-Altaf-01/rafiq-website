"use client";

import { GooglePlayLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { track } from "@vercel/analytics";
import type { MouseEventHandler } from "react";

import { site } from "@/lib/site";

export type PlayStoreSource = "hero" | "download" | "nav" | "closing" | "not_found";

export function PlayStoreLink({
  source,
  label = "Get Rafiq on Google Play",
  onDark = false,
  compact = false,
  className = "",
  onClick,
}: {
  source: PlayStoreSource;
  label?: string;
  onDark?: boolean;
  compact?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <a
      href={site.playStore}
      onClick={(event) => {
        track("play_store_click", { source });
        onClick?.(event);
      }}
      className={`pressable inline-flex items-center justify-center whitespace-nowrap rounded-full font-bold ${
        compact
          ? "min-h-10 gap-1.5 px-5 py-2.5 text-[0.875rem]"
          : "min-h-12 gap-2.5 px-7 py-3.5 text-[0.95rem]"
      } ${className}`}
      style={{
        background: onDark ? "var(--deep-primary)" : "var(--primary)",
        color: onDark ? "#1C1A16" : "var(--on-primary)",
        boxShadow: onDark
          ? "0 10px 26px -12px rgba(0,0,0,0.7)"
          : "0 10px 26px -12px var(--shade-deep)",
      }}
    >
      <GooglePlayLogoIcon size={compact ? 18 : 20} weight="fill" aria-hidden />
      <span>{label}</span>
    </a>
  );
}
