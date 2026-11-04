import { HeroVisual } from "@/components/sections/hero-visual";
import { TonalButton } from "@/components/ui/button";
import { PlayStoreLink } from "@/components/ui/play-store-link";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-24 lg:flex lg:min-h-[760px] lg:items-center lg:pt-24"
    >
      <div className="star-field pointer-events-none absolute inset-0 opacity-55" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(72% 58% at 82% 12%, color-mix(in srgb, var(--gold-fill) 13%, transparent) 0%, transparent 68%), radial-gradient(56% 52% at 0% 100%, color-mix(in srgb, var(--primary) 10%, transparent) 0%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-[1240px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8 xl:gap-16">
        <div className="relative z-10 max-w-[680px]">
          <h1
            id="hero-title"
            className="display text-[clamp(2.65rem,5.4vw,4rem)]"
          >
            <span className="block" style={{ color: "var(--clay)" }}>
              Lower your gaze.{" "}
            </span>
            <span className="block" style={{ color: "var(--primary)" }}>
              Take back your time.
            </span>
          </h1>

          <p className="mt-7 max-w-[58ch] text-[1.02rem] leading-relaxed text-ink-soft sm:text-[1.12rem]">
            Rafiq is an Islamic adult content blocker for Android. It blocks porn sites
            and searches, Shorts and Reels, then holds the daily app limits you chose.
            Matching happens on your phone—not on a server that sees what you see.
          </p>

          <div className="mt-9 max-w-[32rem]">
            <div className="flex flex-col gap-3 sm:flex-row">
              <PlayStoreLink source="hero" className="w-full sm:flex-1" />
              <TonalButton href="#how-it-works" className="w-full sm:flex-1">
                See how it works
              </TonalButton>
            </div>
            <p className="mt-3 text-[0.86rem] font-semibold text-ink-soft">
              Available now for Android 8.1 and newer.
            </p>
          </div>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
