"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { PrimaryButton, TonalButton } from "@/components/ui/button";
import { Device } from "@/components/ui/device";
import { site } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const LINES = ["Lower your gaze.", "Take back your time."];

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

      tl.from(".hero-line-inner", { yPercent: 118, duration: 1.05, stagger: 0.11 })
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
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.08em]">
                <span
                  className="hero-line-inner block"
                  style={i === 1 ? { color: "var(--primary)" } : undefined}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-7 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-soft sm:text-[1.15rem]">
            Rafiq blocks what you asked it to block, and holds the limits you set.
            Everything stays on your phone.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="hero-cta">
              <PrimaryButton href={site.playStore ?? site.earlyAccessUrl}>
                {site.playStore ? "Get Rafiq on Google Play" : "Get early access"}
              </PrimaryButton>
            </span>
            <span className="hero-cta">
              <TonalButton href="#pause">See how it works</TonalButton>
            </span>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[340px] justify-center sm:max-w-[400px]">
          <div className="hero-device-back absolute -left-[13%] top-[7%] w-[58%] -rotate-[9deg]">
            <Device
              src="/screens/block-adult.webp"
              alt="A Rafiq block screen holding a three minute pause, with a dhikr to repeat while it runs."
              // Both hero screens are above the fold, and either one can end up
              // being the largest paint depending on viewport width.
              priority
              sizes="(max-width: 1024px) 34vw, 230px"
            />
          </div>
          <div className="hero-device-main relative w-[74%] rotate-[2deg]">
            <Device
              src="/screens/home.webp"
              alt="The Rafiq home screen showing a clean-day streak, today's blocks and the dhikr of the day."
              priority
              sizes="(max-width: 1024px) 46vw, 300px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
