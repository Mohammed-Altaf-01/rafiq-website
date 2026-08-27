import {
  ArrowsClockwiseIcon,
  HandsPrayingIcon,
  LockKeyIcon,
  WifiSlashIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const safeguards = [
  {
    Icon: LockKeyIcon,
    title: "Strict mode adds a real decision",
    body: "Premium protection can require a PIN and a cooldown before it is switched off, so a reflex cannot quietly undo a rule.",
  },
  {
    Icon: WifiSlashIcon,
    title: "Airplane mode is not a gap",
    body: "The blocklist ships with the app and matching runs on the phone. A connection is only needed to receive blocklist updates.",
  },
  {
    Icon: ArrowsClockwiseIcon,
    title: "Protection returns after restart",
    body: "Rafiq re-arms after a reboot and guides you through battery settings that can otherwise stop Android protection in the background.",
  },
  {
    Icon: HandsPrayingIcon,
    title: "The pause is not empty time",
    body: "A block can carry a short dhikr, its meaning, and a counter while the immediate impulse has time to pass.",
  },
];

const privacyContract = [
  {
    title: "Briefly inspected",
    body: "The address-bar URL, search text, or feed layout needed to decide whether one of your rules matches.",
  },
  {
    title: "Stored on your phone",
    body: "Your chosen limits, protection settings, streak, and local progress record.",
  },
  {
    title: "Never sent off-device",
    body: "What you viewed and the on-screen text used for content matching.",
  },
];

export function Protection() {
  return (
    <section
      id="protection"
      className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32"
      style={{ background: "var(--surface)" }}
    >
      <div className="mx-auto max-w-[1160px]">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <h2 className="display max-w-[14ch] text-[2.4rem] sm:text-[3.2rem] lg:text-[3.65rem]">
              Protection has to hold on the night you stop wanting it.
            </h2>
            <p className="mt-6 max-w-[50ch] text-[1rem] leading-relaxed text-ink-soft sm:text-[1.08rem]">
              A strong-day promise is easy. Rafiq is built for the tired moment when the
              phone is already in your hand and changing the rule should take intention.
            </p>
          </div>

          <ul className="grid gap-x-10 gap-y-0 sm:grid-cols-2">
            {safeguards.map(({ Icon, title, body }) => (
              <li key={title} className="border-t py-7" style={{ borderColor: "var(--line-strong)" }}>
                <Icon size={23} weight="regular" aria-hidden style={{ color: "var(--primary)" }} />
                <h3 className="mt-4 text-[1.08rem] font-extrabold">{title}</h3>
                <p className="mt-2.5 text-[0.93rem] leading-relaxed text-ink-soft">{body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div
          id="privacy"
          className="mt-20 scroll-mt-24 rounded-[var(--radius-card)] px-6 py-9 sm:px-10 sm:py-12 lg:px-12"
          style={{ background: "var(--card)", boxShadow: "0 22px 52px -34px var(--shade-deep)" }}
        >
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <h2 className="display max-w-[13ch] text-[2.1rem] sm:text-[2.65rem]">
                Your screen is not our data.
              </h2>
              <p className="mt-5 max-w-[48ch] text-[0.96rem] leading-relaxed text-ink-soft">
                Android Accessibility provides the small amount of context required to
                make a match. The matching stays on your device; Rafiq does not build a
                remote history of what you looked at.
              </p>
              <Link
                href="/privacy"
                className="mt-6 inline-flex rounded-sm text-[0.9rem] font-bold text-ink underline decoration-1 underline-offset-4 hover:no-underline"
              >
                Read the full Privacy Policy
              </Link>
            </div>

            <dl>
              {privacyContract.map((item) => (
                <div
                  key={item.title}
                  className="grid gap-2 border-t py-5 sm:grid-cols-[0.42fr_0.58fr] sm:gap-7"
                  style={{ borderColor: "var(--line-strong)" }}
                >
                  <dt className="text-[0.92rem] font-extrabold text-ink">{item.title}</dt>
                  <dd className="text-[0.92rem] leading-relaxed text-ink-soft">{item.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
