"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Wordmark } from "@/components/brand/mark";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { nav, site } from "@/lib/site";

export function Nav() {
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);
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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
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
          className="pointer-events-none absolute inset-0 -z-10"
          initial={false}
          animate={{ opacity: condensed ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            backgroundColor: "color-mix(in srgb, var(--bg) 82%, transparent)",
            boxShadow: "0 1px 0 0 var(--line)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        />
        <Link href="/" aria-label="Rafiq home" className="shrink-0">
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

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href={site.playStore ?? site.earlyAccessUrl}
            className="hidden rounded-full px-5 py-2.5 text-[0.875rem] font-bold transition-all duration-200 hover:-translate-y-[1px] active:translate-y-[1px] sm:inline-flex"
            style={{ background: "var(--primary)", color: "var(--on-primary)" }}
          >
            {site.playStore ? "Get Rafiq" : "Get early access"}
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center rounded-full text-ink-soft lg:hidden"
            style={{ boxShadow: "inset 0 0 0 1px var(--line)" }}
          >
            {open ? <XIcon size={18} /> : <ListIcon size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            aria-label="Sections"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mx-5 overflow-hidden rounded-[var(--radius-card)] lg:hidden"
            style={{
              background: "var(--card)",
              boxShadow: "inset 0 0 0 1px var(--line), 0 20px 40px -20px var(--shade-deep)",
              backdropFilter: "blur(14px)",
            }}
          >
            <ul className="flex flex-col p-2.5">
              {nav.map((item) => (
                <li key={item.hash}>
                  <Link
                    href={to(item.hash)}
                    onClick={() => setOpen(false)}
                    className="block rounded-[var(--radius-input)] px-4 py-3 text-[0.95rem] font-semibold text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={site.playStore ?? site.earlyAccessUrl}
                  onClick={() => setOpen(false)}
                  className="mt-1 block rounded-full px-4 py-3 text-center text-[0.95rem] font-bold"
                  style={{ background: "var(--primary)", color: "var(--on-primary)" }}
                >
                  {site.playStore ? "Get Rafiq" : "Get early access"}
                </a>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
