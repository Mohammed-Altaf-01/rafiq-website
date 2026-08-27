import { Scripture } from "@/components/ui/scripture";
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
      className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32"
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
        <h2 className="sr-only">Why Rafiq exists</h2>
        <Scripture passage={loweringTheGaze} tone="deep" size="xl" />

        <p
          className="mx-auto mt-14 max-w-[54ch] text-center text-[1.02rem] leading-relaxed sm:text-[1.1rem]"
          style={{ color: "var(--deep-ink-soft)" }}
        >
          The command is to lower the gaze, not to renegotiate it every few minutes.
          Rafiq helps the choice you made in a clear moment keep holding in a difficult one.
        </p>
      </div>
    </section>
  );
}
