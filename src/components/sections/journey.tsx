import { Device } from "@/components/ui/device";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Scripture } from "@/components/ui/scripture";
import { theTwoBlessings } from "@/lib/scripture";

const facts = [
  {
    title: "A streak you did not have to log",
    body: "Rafiq counts the clean days for you. Slip once and the ring resets, which is the honest thing for it to do, and the next day starts at one again.",
  },
  {
    title: "A month you can see at a glance",
    body: "Every day is a square: clean, slipped, or still ahead of you. Patterns show up in the grid long before you would notice them in yourself.",
  },
  {
    title: "Minutes handed back",
    body: "The time you did not spend in a feed is counted alongside the blocks, so the trade is visible instead of theoretical.",
  },
];

export function Journey() {
  return (
    <section className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[900px]">
        <Scripture passage={theTwoBlessings} size="lg" />
      </div>

      <div className="mx-auto mt-24 grid max-w-[1240px] items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
        <Reveal className="mx-auto w-[62%] max-w-[300px] lg:w-full lg:max-w-[320px]" y={34}>
          <Device
            src="/screens/journey.webp"
            alt="Rafiq's journey screen showing a gold streak ring, current and longest streak, and a month of clean days."
            sizes="(max-width: 1024px) 62vw, 320px"
          />
        </Reveal>

        <div>
          <Reveal>
            <h2 className="display max-w-[16ch] text-[2.25rem] sm:text-[3rem] lg:text-[3.25rem]">
              Free time is a blessing you can watch come back.
            </h2>
            <p className="mt-6 max-w-[52ch] text-[1.02rem] leading-relaxed text-ink-soft sm:text-[1.1rem]">
              Rafiq keeps the record so you do not have to argue with your own memory
              about how the week actually went.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 space-y-9">
            {facts.map((fact) => (
              <RevealItem key={fact.title}>
                <h3 className="text-[1.15rem] font-extrabold tracking-tight">{fact.title}</h3>
                <p className="mt-2.5 max-w-[52ch] text-[0.98rem] leading-relaxed text-ink-soft">
                  {fact.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
