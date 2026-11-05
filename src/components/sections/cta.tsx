import { Mark } from "@/components/brand/mark";
import { PlayStoreLink } from "@/components/ui/play-store-link";

export function Cta() {
  return (
    <section
      className="relative overflow-hidden bg-deep px-5 py-20 text-center text-deep-ink sm:px-8 sm:py-32"
    >
      <div className="star-field-gold pointer-events-none absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-[780px]">
        <Mark size={54} onDark />
        <h2 className="display mx-auto mt-10 max-w-[16ch] text-[2.45rem] sm:text-[3.35rem] lg:text-[3.8rem]">
          Make the choice once. Let your companion remember it.
        </h2>
        <p
          className="mx-auto mt-6 max-w-[52ch] text-[1rem] leading-relaxed text-deep-ink-soft sm:text-[1.08rem]"
        >
          Rafiq is live on Google Play. Install it on Android and put the protections
          you chose in place today.
        </p>
        <PlayStoreLink source="closing" onDark className="mt-9" />
      </div>
    </section>
  );
}
