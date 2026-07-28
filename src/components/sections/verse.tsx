import { Scripture } from "@/components/ui/scripture";
import { Reveal } from "@/components/ui/reveal";
import { loweringTheGaze } from "@/lib/scripture";

/**
 * The one full-bleed espresso block on the page. It is deliberate, not an
 * alternating theme: this is the verse the whole product is built on, and the
 * app itself presents sacred text on a dark, quiet field.
 */
export function Verse() {
  return (
    <section
      id="gaze"
      className="relative overflow-hidden px-5 py-28 sm:px-8 sm:py-36"
      style={{ background: "var(--deep)", color: "var(--deep-ink)" }}
    >
      <div
        className="star-field-gold pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(58% 46% at 50% 14%, rgba(216,184,95,0.13) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        aria-hidden
        style={{ background: "linear-gradient(90deg, transparent, rgba(216,184,95,0.4), transparent)" }}
      />

      <div className="relative mx-auto max-w-[900px]">
        <Scripture passage={loweringTheGaze} tone="deep" size="xl" />

        <Reveal delay={0.35}>
          <p
            className="mx-auto mt-16 max-w-[52ch] text-center text-[1.02rem] leading-relaxed sm:text-[1.1rem]"
            style={{ color: "var(--deep-ink-soft)" }}
          >
            The command is to lower the gaze, not to fight it every few minutes.
            Rafiq exists to move that struggle off your shoulders and onto your phone,
            so the thing you already decided stays decided.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
