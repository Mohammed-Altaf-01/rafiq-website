import { Mark } from "@/components/brand/mark";
import { EarlyAccess } from "@/components/ui/early-access";
import { Reveal } from "@/components/ui/reveal";
import { Scripture } from "@/components/ui/scripture";
import { theShade } from "@/lib/scripture";
import { pricing } from "@/lib/site";

export function Cta() {
  return (
    <section
      className="relative overflow-hidden px-5 py-28 text-center sm:px-8 sm:py-36"
      style={{ background: "var(--deep)", color: "var(--deep-ink)" }}
    >
      <div className="star-field-gold pointer-events-none absolute inset-0 opacity-90" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(62% 50% at 50% 100%, rgba(143,160,122,0.16) 0%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-[820px]">
        <Reveal>
          <Mark size={62} onDark />
        </Reveal>

        <div className="mt-14">
          <Scripture passage={theShade} tone="deep" size="md" />
        </div>

        <Reveal delay={0.2}>
          <h2 className="display mx-auto mt-16 max-w-[17ch] text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem]">
            Decide it once. Let Rafiq hold the line.
          </h2>
          <p
            className="mx-auto mt-6 max-w-[46ch] text-[1.02rem] leading-relaxed sm:text-[1.1rem]"
            style={{ color: "var(--deep-ink-soft)" }}
          >
            {pricing.trialDays} days of the full experience, on every new install. No
            card, no ads, and nothing about what you looked at leaves your phone.
          </p>

          <div className="mt-10 flex justify-center">
            <EarlyAccess id="early-access" onDark align="center" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
