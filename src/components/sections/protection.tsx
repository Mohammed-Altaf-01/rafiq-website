import {
  ArrowsClockwiseIcon,
  HandsPrayingIcon,
  LockKeyIcon,
  SlidersIcon,
  WifiSlashIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Device } from "@/components/ui/device";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const tile =
  "relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] p-7 sm:p-8";

export function Protection() {
  return (
    <section id="protection" className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <h2 className="display max-w-[15ch] text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem]">
            Protection that holds when you stop wanting it to.
          </h2>
          <p className="mt-6 max-w-[54ch] text-[1.02rem] leading-relaxed text-ink-soft sm:text-[1.1rem]">
            Anyone can install a blocker on a strong day. The question is what happens
            on a weak one, at one in the morning, when the phone is in your hand.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-4 md:grid-cols-12">
          {/* Tall anchor cell. Carries the real screen so the grid is not
              six white boxes of type. */}
          <RevealItem className="md:col-span-7 md:row-span-2">
            <div
              className={tile}
              style={{
                background: "var(--card)",
                boxShadow: "inset 0 0 0 1px var(--line)",
              }}
            >
              <SlidersIcon size={26} weight="regular" style={{ color: "var(--primary)" }} />
              <h3 className="mt-5 text-[1.4rem] font-extrabold tracking-tight sm:text-[1.6rem]">
                A daily budget for the apps that pull you in
              </h3>
              <p className="mt-4 max-w-[44ch] text-[0.98rem] leading-relaxed text-ink-soft">
                Pick the apps, set the minutes, and Rafiq counts them for you. It shows
                you where the day actually went, and it closes the door when the budget
                runs out.
              </p>
              <div className="mt-9 flex justify-center md:mt-auto md:pt-12">
                <div className="w-[74%] max-w-[320px] translate-y-8">
                  <Device
                    src="/screens/limits.webp"
                    alt="Rafiq's app limits screen with a 60 minute daily budget set on Instagram."
                    sizes="(max-width: 768px) 60vw, 290px"
                  />
                </div>
              </div>
            </div>
          </RevealItem>

          <RevealItem className="md:col-span-5">
            <div
              className={`${tile} justify-center`}
              style={{
                background:
                  "linear-gradient(155deg, color-mix(in srgb, var(--primary) 20%, var(--card)) 0%, var(--card) 72%)",
                boxShadow: "inset 0 0 0 1px var(--line)",
              }}
            >
              <LockKeyIcon size={26} weight="regular" style={{ color: "var(--primary)" }} />
              <h3 className="mt-5 text-[1.3rem] font-extrabold tracking-tight sm:text-[1.45rem]">
                Strict mode, held by a PIN
              </h3>
              <p className="mt-4 max-w-[42ch] text-[0.98rem] leading-relaxed text-ink-soft">
                Turning protection off costs a PIN and a cooldown. Your calm self sets
                the rule; your tired self cannot quietly undo it. The PIN is stored as a
                salted hash behind a hardware-backed key, so nothing on the device can
                read it back.
              </p>
            </div>
          </RevealItem>

          <RevealItem className="md:col-span-5">
            <div
              className={`${tile} star-field-gold justify-center`}
              style={{
                background: "var(--deep)",
                color: "var(--deep-ink)",
                boxShadow: "inset 0 0 0 1px rgba(216,184,95,0.22)",
              }}
            >
              <HandsPrayingIcon size={26} weight="regular" style={{ color: "var(--deep-gold)" }} />
              <h3 className="mt-5 text-[1.3rem] font-extrabold tracking-tight sm:text-[1.45rem]">
                Something to say while you wait
              </h3>
              <p
                className="mt-4 max-w-[42ch] text-[0.98rem] leading-relaxed"
                style={{ color: "var(--deep-ink-soft)" }}
              >
                Every block carries a dhikr with its translation, and a counter if you
                want to keep it. The pause is not empty time.
              </p>
              <p
                className="arabic mt-8 text-center text-[2.25rem] sm:text-[2.75rem]"
                dir="rtl"
                lang="ar"
                style={{ color: "var(--deep-gold)" }}
              >
                أَسْتَغْفِرُ ٱللَّهَ
              </p>
              <p
                className="mt-2 text-center text-[0.85rem]"
                style={{ color: "var(--deep-ink-soft)" }}
              >
                Astaghfirullah. I seek the forgiveness of Allah.
              </p>
            </div>
          </RevealItem>

          <RevealItem className="md:col-span-5">
            <div
              className={tile}
              style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--line)" }}
            >
              <WifiSlashIcon size={26} weight="regular" style={{ color: "var(--clay)" }} />
              <h3 className="mt-5 text-[1.3rem] font-extrabold tracking-tight sm:text-[1.45rem]">
                No signal, still protected
              </h3>
              <p className="mt-4 max-w-[42ch] text-[0.98rem] leading-relaxed text-ink-soft">
                The blocklist ships inside the app and matches on device. Airplane mode
                is not a loophole. A connection only fetches updates to the list.
              </p>
            </div>
          </RevealItem>

          <RevealItem className="md:col-span-7">
            <div
              className={tile}
              style={{ background: "var(--surface)", boxShadow: "inset 0 0 0 1px var(--line)" }}
            >
              <ArrowsClockwiseIcon size={26} weight="regular" style={{ color: "var(--clay)" }} />
              <h3 className="mt-5 text-[1.3rem] font-extrabold tracking-tight sm:text-[1.45rem]">
                It comes back after a reboot
              </h3>
              <p className="mt-4 max-w-[52ch] text-[0.98rem] leading-relaxed text-ink-soft">
                A blocker that dies quietly is worse than none, because you stop
                checking. Rafiq re-arms itself after a restart, survives battery saver,
                and walks you through the settings that aggressive Android skins use to
                kill background apps.
              </p>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
