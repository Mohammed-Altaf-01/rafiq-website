"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { Device } from "@/components/ui/device";
import { Reveal } from "@/components/ui/reveal";
import type { ScreenSrc } from "@/lib/screens";

gsap.registerPlugin(ScrollTrigger);

type Step = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  screen: ScreenSrc;
  alt: string;
};

const steps: Step[] = [
  {
    id: "adult",
    kicker: "Adult content",
    title: "It arrives before the page does.",
    body: "Rafiq reads the address bar and the search field as you type. When something matches, the page never finishes loading. What you get instead is a pause, not an error.",
    screen: "/screens/block-adult.webp",
    alt: "Rafiq's adult content block screen, holding a locked timer with a dhikr to repeat while it runs.",
  },
  {
    id: "timer",
    kicker: "The timer",
    title: "The wait is the whole point.",
    body: "The screen holds for as long as you set. Nothing happens in that gap except a dhikr to repeat. When it ends, the way out is right there, because a block you can never leave is a trap, not a tool.",
    screen: "/screens/block-adult-done.webp",
    alt: "The same block screen once the timer has finished, with the close button now unlocked.",
  },
  {
    id: "feeds",
    kicker: "Shorts and Reels",
    title: "The feed stops pulling.",
    body: "Rafiq recognises a short-video feed by its shape on screen rather than by its name, so it keeps working across YouTube Shorts and Instagram Reels. The rest of the app stays open.",
    screen: "/screens/block-reels.webp",
    alt: "Rafiq holding a YouTube Shorts feed for a few seconds before the scroll begins.",
  },
  {
    id: "limits",
    kicker: "Daily limits",
    title: "When the budget is spent, it is spent.",
    body: "Give an app a daily allowance. Rafiq counts the minutes and closes the door at the end of it. The counter resets at midnight, and not a second sooner.",
    screen: "/screens/block-limit.webp",
    alt: "Rafiq closing Instagram for the day once its sixty minute allowance is spent, with the counter resetting at midnight.",
  },
];

export function Pause() {
  const wrap = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // The pinned stage is opt-in: it only ever appears once this effect has
    // confirmed a wide viewport AND that the visitor has not asked for reduced
    // motion. Everyone else keeps the plain vertical list, which is also what
    // renders with JavaScript switched off.
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const stageEl = stage.current;
      const listEl = list.current;
      if (!wrap.current || !stageEl || !listEl) return;

      stageEl.style.display = "flex";
      listEl.style.display = "none";

      const screens = gsap.utils.toArray<HTMLElement>(".pause-screen", stageEl);
      const copies = gsap.utils.toArray<HTMLElement>(".pause-copy", stageEl);
      const ticks = gsap.utils.toArray<HTMLElement>(".pause-tick-fill", stageEl);

      gsap.set(screens.slice(1), { autoAlpha: 0, yPercent: 6 });
      gsap.set(copies.slice(1), { autoAlpha: 0, y: 26 });
      gsap.set(ticks.slice(1), { scaleX: 0 });
      gsap.set(ticks[0], { scaleX: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${(steps.length - 1) * window.innerHeight * 0.85}`,
          pin: stageEl,
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
        defaults: { duration: 0.5 },
      });

      /*
       * The two halves of each hand-off overlap. Leaving a gap between them
       * reads as a dropped frame when the reader scrolls slowly: for a moment
       * the stage holds nothing at all. Easing out and in against each other
       * across the overlap keeps something on screen the whole way through
       * without the two steps ever being legible at once.
       */
      for (let i = 1; i < steps.length; i += 1) {
        const at = i - 1;
        tl.to(screens[i - 1], { autoAlpha: 0, yPercent: -6, ease: "power1.in" }, at)
          .to(copies[i - 1], { autoAlpha: 0, y: -26, ease: "power1.in" }, at)
          .to(ticks[i - 1], { scaleX: 1, ease: "power2.inOut" }, at)
          .to(screens[i], { autoAlpha: 1, yPercent: 0, duration: 0.55, ease: "power1.out" }, at + 0.32)
          .to(copies[i], { autoAlpha: 1, y: 0, duration: 0.55, ease: "power1.out" }, at + 0.32)
          .to(ticks[i], { scaleX: 1, duration: 1, ease: "power2.inOut" }, at);
      }

      return () => {
        stageEl.style.display = "none";
        listEl.style.display = "";
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="pause" className="relative px-5 pt-28 sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <p className="overline text-gold">The block screen</p>
          <h2 className="display mt-4 max-w-[16ch] text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem]">
            A block should feel like a mosque door, not a firewall.
          </h2>
          <p className="mt-6 max-w-[54ch] text-[1.02rem] leading-relaxed text-ink-soft sm:text-[1.1rem]">
            Four things trigger it. Each one hands you the same thing: a few quiet seconds,
            and then your choice back.
          </p>
        </Reveal>
      </div>

      <div ref={wrap} className="mt-14 md:mt-20">
        {/* Enabled by the effect above. Four steps cross-fade through one pinned frame. */}
        <div
          ref={stage}
          style={{ display: "none" }}
          className="min-h-[100dvh] items-center py-16"
        >
          <div className="mx-auto grid w-full max-w-[1240px] items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[340px]">
              {steps.map((step) => (
                <article
                  key={step.id}
                  className="pause-copy absolute inset-0 flex flex-col justify-center"
                >
                  <p className="text-[0.82rem] font-bold text-clay">{step.kicker}</p>
                  <h3 className="mt-4 max-w-[16ch] text-[2rem] leading-[1.08] font-extrabold tracking-tight lg:text-[2.5rem]">
                    {step.title}
                  </h3>
                  <p className="mt-5 max-w-[46ch] text-[1.02rem] leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </article>
              ))}

              <ul className="absolute inset-x-0 bottom-0 flex gap-2.5" aria-hidden>
                {steps.map((step) => (
                  <li
                    key={step.id}
                    className="h-[3px] w-14 overflow-hidden rounded-full"
                    style={{ background: "var(--line-strong)" }}
                  >
                    <span
                      className="pause-tick-fill block h-full w-full origin-left rounded-full"
                      style={{ background: "var(--primary)" }}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative mx-auto h-[72vh] max-h-[660px] w-full max-w-[310px]">
              {steps.map((step) => (
                <div key={step.id} className="pause-screen absolute inset-0 flex items-center">
                  <Device src={step.screen} alt={step.alt} sizes="310px" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* The default. Narrow viewports, reduced motion, and no JavaScript. */}
        <div ref={list} className="mx-auto max-w-[1240px]">
          {steps.map((step, i) => (
            <Reveal
              key={step.id}
              as="section"
              className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${
                i > 0 ? "mt-20 md:mt-28" : ""
              }`}
            >
              <div className={`mx-auto w-[62%] max-w-[250px] md:w-full ${i % 2 ? "md:order-2" : ""}`}>
                <Device src={step.screen} alt={step.alt} sizes="(max-width: 768px) 62vw, 250px" />
              </div>
              <div>
                <p className="text-[0.82rem] font-bold text-clay">{step.kicker}</p>
                <h3 className="mt-3 max-w-[16ch] text-[1.65rem] leading-[1.12] font-extrabold tracking-tight md:text-[2rem]">
                  {step.title}
                </h3>
                <p className="mt-4 max-w-[46ch] text-[1rem] leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
