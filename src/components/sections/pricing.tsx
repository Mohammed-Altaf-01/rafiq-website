import { CheckIcon } from "@phosphor-icons/react/dist/ssr";

import { PrimaryButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { pricing, site } from "@/lib/site";

const unlocks = [
  "Strict blocking, held by a PIN and a cooldown",
  "Hard app limits that cannot be waved through",
  "Enforcement across browsers and apps",
  "Your streaks and settings synced across devices",
];

export function Pricing() {
  return (
    <section id="pricing" className="px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1240px]">
        <Reveal>
          <p className="overline text-gold">Pricing</p>
          <h2 className="display mt-4 max-w-[15ch] text-[2.25rem] sm:text-[3rem] lg:text-[3.5rem]">
            Free stays useful. Paid makes it stick.
          </h2>
          <p className="mt-6 max-w-[56ch] text-[1.02rem] leading-relaxed text-ink-soft sm:text-[1.1rem]">
            On the free tier the blocks still appear, but they are soft: after a short
            pause you can carry on. Premium is what turns a suggestion into a rule.
            Every new install starts with {pricing.trialDays} days of it.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="mt-14 grid overflow-hidden rounded-[var(--radius-card)] lg:grid-cols-[1.05fr_0.95fr]"
            style={{ background: "var(--card)", boxShadow: "inset 0 0 0 1px var(--line)" }}
          >
            <div className="flex flex-col justify-center p-8 sm:p-11">
              <h3 className="text-[1.4rem] font-extrabold tracking-tight">Rafiq Premium</h3>
              <p className="mt-2 text-[0.98rem] text-ink-soft">
                Stronger protection to guard your heart.
              </p>
              <ul className="mt-8 space-y-4">
                {unlocks.map((item) => (
                  <li key={item} className="flex items-start gap-3.5">
                    <CheckIcon
                      size={19}
                      weight="bold"
                      className="mt-[3px] shrink-0"
                      style={{ color: "var(--primary)" }}
                    />
                    <span className="text-[0.98rem] leading-relaxed text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="flex flex-col justify-center gap-4 p-8 sm:p-11"
              style={{ background: "var(--surface)" }}
            >
              <div
                className="rounded-[var(--radius-tile)] p-6"
                style={{ background: "var(--card)", boxShadow: "inset 0 0 0 1px var(--line)" }}
              >
                <p className="text-[0.9rem] font-bold text-ink-soft">Monthly</p>
                <p className="mt-1.5 text-[2rem] font-extrabold tracking-tight">
                  {pricing.monthly.price}
                </p>
                <p className="text-[0.88rem] text-ink-faint">{pricing.monthly.period}</p>
              </div>

              <div
                className="relative rounded-[var(--radius-tile)] p-6"
                style={{
                  background: "var(--card)",
                  boxShadow: "inset 0 0 0 1.5px var(--gold-fill)",
                }}
              >
                <span
                  className="absolute -top-2.5 left-6 rounded-full px-3 py-1 text-[0.66rem] font-bold tracking-[0.1em] uppercase"
                  style={{ background: "var(--gold-fill)", color: "#2E2A23" }}
                >
                  {pricing.annual.saving}
                </span>
                <p className="text-[0.9rem] font-bold text-ink-soft">Annual</p>
                <p className="mt-1.5 text-[2rem] font-extrabold tracking-tight">
                  {pricing.annual.price}
                </p>
                <p className="text-[0.88rem] text-ink-faint">
                  {pricing.annual.perMonth} · billed yearly
                </p>
              </div>

              <PrimaryButton
                href={site.playStore ?? site.earlyAccessUrl}
                className="mt-2 w-full"
              >
                {site.playStore ? "Start free trial" : "Get early access"}
              </PrimaryButton>
              <p className="text-center text-[0.82rem] text-ink-faint">
                Cancel anytime in Google Play. Prices shown in your local currency at
                checkout.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
