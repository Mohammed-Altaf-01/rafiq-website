import { Wordmark } from "@/components/brand/mark";
import { TonalButton } from "@/components/ui/button";
import { PlayStoreLink } from "@/components/ui/play-store-link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="star-field relative flex min-h-dvh items-center overflow-hidden px-5 py-24 sm:px-8"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-line-strong"
      />
      <div className="relative mx-auto w-full max-w-[760px] text-center">
        <div className="flex justify-center">
          <Wordmark />
        </div>
        <p className="eyebrow mt-14 text-clay">Error 404</p>
        <h1 className="display mx-auto mt-5 max-w-[13ch] text-[3rem] sm:text-[4.5rem]">
          This page is not here.
        </h1>
        <p className="mx-auto mt-7 max-w-[54ch] text-[1.02rem] leading-relaxed text-ink-soft sm:text-[1.12rem]">
          Rafiq is still here to help you protect your attention. Return home, or go
          straight to its Google Play listing.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <PlayStoreLink source="not_found" />
          <TonalButton href="/">Go home</TonalButton>
        </div>
      </div>
    </main>
  );
}
