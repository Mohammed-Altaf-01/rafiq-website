"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { TonalButton } from "@/components/ui/button";
import { Device } from "@/components/ui/device";
import { EarlyAccess } from "@/components/ui/early-access";

gsap.registerPlugin(ScrollTrigger);

// A phone browser hiding or showing its own toolbar counts as a viewport
// resize, and this hero is `100dvh` tall, so every one of those would refresh
// every trigger on the page and snap the parallax to a new position mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true });

/*
 * `shimmer` is the app's own signature, ported: the colour sweep the home
 * screen runs through the salam (`ShimmerText.kt`). It belongs on the first
 * line and nowhere else — one gesture, in the one place the eye lands first.
 */
const LINES = [
  { text: "Lower your gaze.", className: "shimmer" },
  { text: "Take back your time.", className: "text-primary" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !root.current) return;

    const ctx = gsap.context(() => {
      // Entrance. The headline rises out of its own baseline one line at a
      // time so the two halves of the promise land in sequence, then the
      // screens settle in behind it.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // The line and its mask are the same height now, so 100% would already
      // park it out of sight. 110 keeps a margin under the descender padding.
      tl.from(".hero-line-inner", { yPercent: 110, duration: 1.05, stagger: 0.11 })
        .from(".hero-sub", { opacity: 0, y: 18, duration: 0.8 }, "-=0.62")
        .from(".hero-cta", { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, "-=0.5")
        .from(
          ".hero-device-main",
          { opacity: 0, y: 54, rotate: 2.5, duration: 1.25 },
          "-=1.05",
        )
        .from(
          ".hero-device-back",
          { opacity: 0, y: 40, x: 26, rotate: 2, duration: 1.1 },
          "-=1.0",
        );

      // Depth on scroll: the two screens leave at slightly different rates,
      // which is what makes the cluster read as layered rather than flat.
      gsap.to(".hero-device-back", {
        yPercent: -13,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to(".hero-device-main", {
        yPercent: -5,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-[68px] pb-16"
    >
      <div className="star-field pointer-events-none absolute inset-0 opacity-70" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(90% 62% at 68% 8%, color-mix(in srgb, var(--gold-fill) 15%, transparent) 0%, transparent 62%)," +
            "radial-gradient(70% 55% at 0% 100%, color-mix(in srgb, var(--primary) 12%, transparent) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.35fr_0.65fr] lg:gap-10">
        <div>
          <h1 className="display text-[2.25rem] sm:text-[3.25rem] lg:text-[3rem] xl:text-[3.75rem]">
            {LINES.map((line) => (
              /*
               * Two boxes: the mask each line rises out of, and the line.
               *
               * `display` runs a 0.98 line-height against a font whose ascent
               * and descent total 1.26em, so the tails of "y" and "g" hang
               * 0.14em below the line box and get cut twice over -- once by the
               * mask, and once by `background-clip: text`, which paints the
               * shimmer only inside the line's own border box. The padding is on
               * the line rather than the mask because that is the box both clips
               * are measured against; the mask's negative margin then hands the
               * space back to the layout, so the two lines sit exactly as
               * tightly as they did before any of it.
               */
              <span key={line.text} className="block overflow-hidden -mb-[0.16em]">
                {/* `w-fit` so the shimmer's gradient is measured against the
                    line itself rather than the column it sits in. */}
                <span className={`hero-line-inner block w-fit pb-[0.24em] ${line.className}`}>
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-7 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-soft sm:text-[1.15rem]">
            Rafiq blocks what you asked it to block, and holds the limits you set.
            Everything stays on your phone.
          </p>

          {/*
            Address first, then the two things you can do with the page — the
            second call rides inside the form so it shares a row with the submit
            instead of being stranded under the fine print.
          */}
          <div className="hero-cta mt-10">
            <EarlyAccess
              secondary={
                <TonalButton href="#pause" className="sm:flex-1">
                  See how it works
                </TonalButton>
              }
            />
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[340px] justify-center sm:max-w-[400px]">
          <div className="hero-device-back absolute -left-[13%] top-[7%] w-[58%] -rotate-[9deg]">
            <Device
              src="/screens/block-adult.webp"
              alt="A Rafiq block screen holding a three minute pause, with a dhikr to repeat while it runs."
              // Both hero screens are above the fold, and either one can end up
              // being the largest paint depending on viewport width.
              eager
              sizes="(max-width: 1024px) 34vw, 230px"
            />
          </div>
          <div className="hero-device-main relative w-[74%] rotate-[2deg]">
            <Device
              src="/screens/home.webp"
              alt="The Rafiq home screen showing a clean-day streak, today's blocks and the dhikr of the day."
              eager
              sizes="(max-width: 1024px) 46vw, 300px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
