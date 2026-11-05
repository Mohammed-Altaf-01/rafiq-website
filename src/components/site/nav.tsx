"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Wordmark } from "@/components/brand/mark";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { PlayStoreLink } from "@/components/ui/play-store-link";
import { nav } from "@/lib/site";

export function Nav() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  // The sections these point at live on the landing page. From the legal pages
  // a bare hash resolves to nothing, so send the reader home first and let the
  // browser take them to the section once it arrives.
  const onHome = usePathname() === "/";
  const to = (hash: string) => (onHome ? hash : `/${hash}`);

  // Motion's scroll observer rather than a scroll listener: no per-frame
  // React state, and the bar only re-renders on the one threshold crossing.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    if (next !== condensed) setCondensed(next);
  });

  useEffect(() => {
    if (!open) return;

    firstMenuLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const rest = "translate3d(0, 0, 0)";
  const menuOffset = reduced ? rest : "translate3d(0, -10px, 0)";

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div
        // The condensed bar spans the viewport, not the content container, so
        // the hairline reads as a real edge rather than a stray line.
        className="relative flex h-[68px] w-full items-center justify-between px-5 sm:px-8"
      >
        {/*
          The plate fades in on its own layer rather than the bar animating its
          own background colour. `color-mix()` is not an animatable colour, and
          cross-fading opacity is the smoother result anyway: the blur, the
          tint and the hairline all arrive together.
        */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-bg/82 shadow-[0_1px_0_0_var(--line)] backdrop-blur-[14px]"
          initial={false}
          animate={{ opacity: condensed ? 1 : 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        />
        <Link href="/" aria-label="Rafiq home" className="inline-flex min-h-11 shrink-0 items-center">
          <Wordmark />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Sections">
          {nav.map((item) => (
            <Link
              key={item.hash}
              href={to(item.hash)}
              className="relative text-[0.9rem] font-semibold text-ink-soft transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 min-[375px]:gap-2.5">
          <ThemeToggle />
          <PlayStoreLink
            source="nav"
            label="Get Rafiq"
            compact
            className="shrink-0"
          />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={open ? "mobile-sections-menu" : undefined}
            aria-haspopup="true"
            className="pressable inline-flex size-11 items-center justify-center rounded-full text-ink-soft inset-ring inset-ring-line lg:hidden"
          >
            {open ? <XIcon size={18} /> : <ListIcon size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.nav
            id="mobile-sections-menu"
            aria-label="Sections"
            data-spatial-motion="true"
            initial={{ opacity: 0, transform: menuOffset }}
            animate={{ opacity: 1, transform: rest }}
            exit={{ opacity: 0, transform: menuOffset }}
            transition={{ duration: reduced ? 0.18 : 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="mx-5 max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-card bg-card shadow-[inset_0_0_0_1px_var(--line),0_20px_40px_-20px_var(--shade-deep)] sm:mx-8 lg:hidden"
          >
            <ul className="flex flex-col p-2.5">
              {nav.map((item, index) => (
                <li key={item.hash}>
                  <Link
                    ref={index === 0 ? firstMenuLinkRef : undefined}
                    href={to(item.hash)}
                    onClick={() => setOpen(false)}
                    className="block rounded-input px-4 py-3 text-[0.95rem] font-semibold text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <PlayStoreLink
                  source="nav"
                  onClick={() => setOpen(false)}
                  className="mt-1 w-full"
                />
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
