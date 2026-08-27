import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const imageCalls = vi.hoisted(() => [] as Array<Record<string, unknown>>);

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    imageCalls.push(props);
    return null;
  },
}));

vi.mock("motion/react", () => ({
  motion: { div: "div" },
  useReducedMotion: () => false,
  useScroll: () => ({ scrollY: {} }),
  useTransform: () => "translate3d(0, 0%, 0)",
}));

import { HeroVisual } from "@/components/sections/hero-visual";
import { Mark, Wordmark } from "@/components/brand/mark";
import { Device } from "@/components/ui/device";

describe("hero image loading", () => {
  it("gives only the likely LCP image a high-priority fetch", () => {
    render(<HeroVisual />);

    const home = imageCalls.find((props) => props.src === "/screens/home.webp");
    const measuredLcp = imageCalls.find(
      (props) => props.src === "/screens/block-limit.webp",
    );

    expect(measuredLcp).toMatchObject({ loading: "eager", fetchPriority: "high" });
    expect(home).toMatchObject({ loading: "eager" });
    expect(home?.fetchPriority).toBeUndefined();
    expect(imageCalls.filter((props) => props.fetchPriority === "high")).toHaveLength(1);
  });

  it("keeps below-fold product screens lazy", () => {
    imageCalls.length = 0;
    render(
      <Device
        src="/screens/block-adult.webp"
        alt="A below-fold adult-content block screen."
      />,
    );

    expect(imageCalls[0]).toMatchObject({ loading: "lazy" });
    expect(imageCalls[0]?.fetchPriority).toBeUndefined();
  });

  it("keeps reusable marks lazy and removes deprecated priority", () => {
    imageCalls.length = 0;
    const { unmount } = render(<Mark />);

    expect(imageCalls[0]).toMatchObject({ loading: "lazy" });
    expect(imageCalls[0]?.priority).toBeUndefined();

    unmount();
    imageCalls.length = 0;
    render(<Wordmark />);

    expect(imageCalls[0]).toMatchObject({ loading: "lazy" });
    expect(imageCalls[0]?.priority).toBeUndefined();
  });
});
