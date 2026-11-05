import type { ReactNode } from "react";

/**
 * Buttons are full-pill across the whole page. Cards are 24px, tiles 18px.
 * That is the entire radius system; nothing else invents its own.
 */
const base =
  "pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-full " +
  "px-5 py-3.5 text-center text-[0.95rem] font-bold sm:px-7";

export function PrimaryButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`${base} bg-primary text-on-primary shadow-[0_10px_26px_-12px_var(--shade-deep)] ${className}`}
    >
      {children}
    </a>
  );
}

export function TonalButton({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={`${base} bg-surface text-ink inset-ring inset-ring-line-strong ${className}`}>
      {children}
    </a>
  );
}
