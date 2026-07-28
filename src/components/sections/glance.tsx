import { Scripture } from "@/components/ui/scripture";
import { theSecondGlance } from "@/lib/scripture";

/** A breath between the block screen and the feature set. */
export function Glance() {
  return (
    <section
      className="mt-28 border-y px-5 py-20 sm:mt-36 sm:px-8 sm:py-24"
      style={{ background: "var(--surface)", borderColor: "var(--line)" }}
    >
      <div className="mx-auto max-w-[760px]">
        <Scripture passage={theSecondGlance} size="md" />
      </div>
    </section>
  );
}
