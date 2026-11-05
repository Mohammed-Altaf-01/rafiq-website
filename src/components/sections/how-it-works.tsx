"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

import { Device } from "@/components/ui/device";
import type { ScreenSrc } from "@/lib/screens";

const states: Array<{
  title: string;
  body: string;
  src: ScreenSrc;
  alt: string;
}> = [
  {
    title: "Caught before it loads",
    body: "A matched adult page or search is replaced before the content finishes appearing.",
    src: "/screens/block-adult.webp",
    alt: "Rafiq replacing an adult-content page with a calm block screen before the page loads.",
  },
  {
    title: "A pause instead of a loophole",
    body: "The screen gives you time, a reason for the block, and dhikr instead of an instant override.",
    src: "/screens/block-adult-done.webp",
    alt: "Rafiq's completed pause screen with a conscious option to return or continue.",
  },
  {
    title: "The rule keeps holding",
    body: "Short-video feeds and spent app limits are caught across the apps where the habit moves next.",
    src: "/screens/block-reels.webp",
    alt: "Rafiq blocking a short-video feed after recognising the Reels-style screen on the device.",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  function selectFromKeyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % states.length;
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + states.length) % states.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = states.length - 1;
    if (next === null) return;

    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return (
    <section id="how-it-works" className="scroll-mt-20 px-5 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-[1160px] items-center gap-8 lg:grid-cols-[0.94fr_1.06fr] lg:gap-20">
        {/* Below lg this wrapper dissolves so the phone sits between the intro and the tabs: a tap has to change something still on screen. */}
        <div className="contents lg:block">
          <div>
            <h2 className="display max-w-[14ch] text-[2.4rem] sm:text-[3.2rem] lg:text-[3.65rem]">
              A block should create a pause, not another fight.
            </h2>
            <p className="mt-6 max-w-[58ch] text-[1rem] leading-relaxed text-ink-soft sm:text-[1.08rem]">
              Rafiq watches only for the small pieces of on-screen context needed to match
              a rule. When one matches, the page or feed gives way to a deliberate choice.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="How Rafiq responds"
            aria-orientation="vertical"
            className="order-last space-y-2 lg:mt-10"
          >
            {states.map((state, index) => {
              const selected = index === active;
              const tabId = `${baseId}-tab-${index}`;
              return (
                <button
                  key={state.title}
                  ref={(element) => {
                    tabs.current[index] = element;
                  }}
                  id={tabId}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => selectFromKeyboard(event, index)}
                  className={`pressable w-full rounded-input px-5 py-4 text-left ${
                    selected ? "bg-surface inset-ring inset-ring-line-strong" : ""
                  }`}
                >
                  <span className="block text-[1rem] font-extrabold text-ink sm:text-[1.08rem]">
                    {state.title}
                  </span>
                  <span className="mt-1.5 block max-w-[54ch] text-[0.9rem] leading-relaxed text-ink-soft sm:text-[0.94rem]">
                    {state.body}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-card bg-deep px-8 py-8 shadow-[0_30px_70px_-36px_var(--shade-deep)] sm:px-12 sm:py-14">
          <div className="star-field-gold pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            tabIndex={0}
            className="relative mx-auto grid w-[72%] max-w-[330px]"
          >
            {/*
              Every screen stays mounted in one grid cell. The renders differ in
              height, and swapping them through normal flow stacked two phones for
              the length of the fade. Here the tallest one holds the height, all
              three are loaded before the first tap, and the fade can be interrupted.
              The outgoing screen waits so the dark card never shows through mid-fade.
            */}
            {states.map((state, index) => {
              const selected = index === active;
              return (
                <div
                  key={state.src}
                  aria-hidden={!selected}
                  className={`[grid-area:1/1] transition-opacity duration-(--duration-panel) ease-(--ease-out) ${
                    selected ? "z-10 opacity-100" : "opacity-0 delay-100"
                  }`}
                >
                  <Device src={state.src} alt={state.alt} onDark />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
