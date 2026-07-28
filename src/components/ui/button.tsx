import type { ReactNode } from "react";

/**
 * Buttons are full-pill across the whole page. Cards are 24px, tiles 18px.
 * That is the entire radius system; nothing else invents its own.
 */
const base =
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full " +
  "px-7 py-3.5 text-[0.95rem] font-bold transition-all duration-200 " +
  "active:translate-y-[1px] active:scale-[0.985]";

export function PrimaryButton({
  href,
  children,
  onDark = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`${base} hover:-translate-y-[1px] ${className}`}
      style={{
        background: onDark ? "var(--deep-primary)" : "var(--primary)",
        color: onDark ? "#1C1A16" : "var(--on-primary)",
        boxShadow: onDark
          ? "0 10px 26px -12px rgba(0,0,0,0.7)"
          : "0 10px 26px -12px var(--shade-deep)",
      }}
    >
      {children}
    </a>
  );
}

export function TonalButton({
  href,
  children,
  onDark = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`${base} ${className}`}
      style={{
        background: onDark ? "rgba(237,230,214,0.08)" : "var(--surface)",
        color: onDark ? "var(--deep-ink)" : "var(--ink)",
        boxShadow: onDark
          ? "inset 0 0 0 1px var(--deep-line)"
          : "inset 0 0 0 1px var(--line-strong)",
      }}
    >
      {children}
    </a>
  );
}
