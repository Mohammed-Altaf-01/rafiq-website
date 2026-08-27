import { createElement } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const motionMocks = vi.hoisted(() => {
  const scrollY = { kind: "viewport-scroll" };
  const scrollYProgress = { kind: "target-progress" };

  return {
    scrollY,
    scrollYProgress,
    useScroll: vi.fn(() => ({ scrollY, scrollYProgress })),
    useTransform: vi.fn(() => "translate3d(0, 0, 0)"),
  };
});

vi.mock("motion/react", () => ({
  motion: { div: "div" },
  useReducedMotion: () => false,
  useScroll: motionMocks.useScroll,
  useTransform: motionMocks.useTransform,
}));

vi.mock("@/components/ui/device", () => ({ Device: () => null }));

import { HeroVisual, heroDepthRange } from "@/components/sections/hero-visual";

describe("hero depth", () => {
  it("becomes constant when reduced motion is requested", () => {
    const reduced = heroDepthRange(true);
    const regular = heroDepthRange(false);

    expect(reduced.back[0]).toBe(reduced.back[1]);
    expect(reduced.front[0]).toBe(reduced.front[1]);
    expect(reduced.back[0]).toBe("translate3d(0, 0%, 0)");
    expect(regular.back[0]).not.toBe(regular.back[1]);
    expect(regular.front[0]).not.toBe(regular.front[1]);
    expect(regular.back.every((value) => value.startsWith("translate3d("))).toBe(true);
  });

  it("drives depth from the proven viewport scroll signal", () => {
    render(createElement(HeroVisual));

    expect(motionMocks.useScroll).toHaveBeenCalledWith();
    expect(motionMocks.useTransform).toHaveBeenNthCalledWith(
      1,
      motionMocks.scrollY,
      [0, 720],
      heroDepthRange(false).back,
    );
    expect(motionMocks.useTransform).toHaveBeenNthCalledWith(
      2,
      motionMocks.scrollY,
      [0, 720],
      heroDepthRange(false).front,
    );
  });
});
