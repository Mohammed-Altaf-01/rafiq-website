import { Device } from "@/components/ui/device";

const outcomes = [
  {
    title: "An honest streak",
    body: "Clean days count without asking you to log them, and a slip resets the number instead of flattering it.",
  },
  {
    title: "Patterns visible over time",
    body: "A simple calendar makes stronger weeks and difficult days easier to notice without exporting a history.",
  },
  {
    title: "Minutes handed back",
    body: "Time not spent inside a feed sits beside the blocks, making the trade visible rather than theoretical.",
  },
];

export function Journey() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-[1120px] items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="relative mx-auto w-[68%] max-w-[310px] lg:w-full">
          <div
            className="absolute -inset-7 rounded-[44%] bg-gold-fill/11"
            aria-hidden
          />
          <div className="relative">
            <Device
              src="/screens/journey.webp"
              alt="Rafiq's journey screen showing a clean-day streak, a monthly pattern, and time returned."
            />
          </div>
        </div>

        <div>
          <h2 className="display max-w-[14ch] text-[2.4rem] sm:text-[3.2rem] lg:text-[3.55rem]">
            See the time that quietly came back.
          </h2>
          <p className="mt-6 max-w-[54ch] text-[1rem] leading-relaxed text-ink-soft sm:text-[1.08rem]">
            Rafiq keeps a small, local record so you can see whether the rule is changing
            the week—without asking you to turn self-control into another tracking task.
          </p>

          <ul className="mt-10">
            {outcomes.map((outcome) => (
              <li key={outcome.title} className="border-t border-line-strong py-5">
                <h3 className="text-[1.05rem] font-extrabold">{outcome.title}</h3>
                <p className="mt-2 max-w-[55ch] text-[0.92rem] leading-relaxed text-ink-soft">
                  {outcome.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
