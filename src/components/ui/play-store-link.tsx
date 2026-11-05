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
      className={`pressable inline-flex items-center justify-center rounded-full text-center font-bold ${
        // Under 360px the nav bar has no room for the icon; the full-size label may wrap.
        compact
          ? "min-h-11 gap-1.5 whitespace-nowrap px-3 py-2.5 text-[0.875rem] min-[360px]:px-5 max-[359px]:[&>svg]:hidden"
          : "min-h-12 gap-2.5 px-5 py-3.5 text-[0.95rem] sm:px-7"
      } ${
        onDark
          ? "bg-deep-primary text-deep shadow-[0_10px_26px_-12px_rgba(0,0,0,0.7)]"
          : "bg-primary text-on-primary shadow-[0_10px_26px_-12px_var(--shade-deep)]"
      } ${className}`}
    >
      <GooglePlayLogoIcon size={compact ? 18 : 20} weight="fill" aria-hidden className="shrink-0" />
      <span>{label}</span>
    </a>
  );
}
