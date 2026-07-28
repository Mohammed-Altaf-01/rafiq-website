import { Device } from "@/components/ui/device";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import type { ScreenSrc } from "@/lib/screens";

const moves: { title: string; body: string; screen: ScreenSrc; alt: string; offset: string }[] = [
  {
    title: "Read the promise first",
    body: "Before Android asks for anything, Rafiq shows you in plain words what it will read and what it will never keep.",
    screen: "/screens/trust.webp",
    alt: "Rafiq's trust promise screen, shown before any permission is requested.",
    offset: "lg:mt-0",
  },
  {
    title: "Grant the one permission",
    body: "Rafiq hands you straight to the right Android screen and waits. Nothing is enabled quietly behind your back.",
    screen: "/screens/accessibility.webp",
    alt: "Rafiq guiding the user through granting the Android Accessibility permission.",
    offset: "lg:mt-12",
  },
  {
    title: "Then it stays out of the way",
    body: "Protection runs in the background and only surfaces when something is actually blocked. That is the whole setup.",
    screen: "/screens/setup-done.webp",
    alt: "Rafiq's setup complete screen confirming protection is now active.",
    offset: "lg:mt-5",
  },
];

export function Setup() {
  return (
    <section className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="display max-w-[18ch] text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem]">
            It takes two minutes, and it asks before it acts.
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid gap-x-14 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {moves.map((move) => (
            <RevealItem key={move.title} className={move.offset}>
              <div className="mx-auto w-[64%] max-w-[250px] sm:w-[80%] lg:w-[92%] lg:max-w-none">
                <Device src={move.screen} alt={move.alt} sizes="(max-width: 1024px) 60vw, 260px" />
              </div>
              <h3 className="mt-9 text-[1.2rem] font-extrabold tracking-tight">{move.title}</h3>
              <p className="mt-3 max-w-[36ch] text-[0.98rem] leading-relaxed text-ink-soft">
                {move.body}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
