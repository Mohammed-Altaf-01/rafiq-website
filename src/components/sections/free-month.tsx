import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";

import { EarlyAccess } from "@/components/ui/early-access";
import { site } from "@/lib/site";

const inclusions = [
  {
    title: "Strict blocking",
    body: "Use the PIN and cooldown protections built for the moments when an easy switch-off would defeat the point.",
  },
  {
    title: "Hard app limits",
    body: "Let a daily budget close the chosen app when its minutes are spent, instead of showing one more reminder.",
  },
  {
    title: "Cross-app protection",
    body: "Keep adult-content and short-feed rules working as the same habit moves between browsers and apps.",
  },
];

export function FreeMonth() {
  return (
    <section
      id="free-month"
      className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32"
      style={{ background: "var(--surface)" }}
    >
      <div
        className="mx-auto grid max-w-[1160px] gap-12 overflow-hidden rounded-[var(--radius-card)] px-6 py-9 sm:px-10 sm:py-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:px-14 lg:py-14"
        style={{ background: "var(--card)", boxShadow: "0 30px 70px -42px var(--shade-deep)" }}
      >
        <div>
          <p
            className="display flex items-baseline gap-3 text-ink"
          >
            <span className="text-[clamp(4.8rem,12vw,8.5rem)]" style={{ color: "var(--clay)" }}>
              {site.offer.premiumDays}
            </span>
            <span className="text-[1.35rem] sm:text-[1.65rem]">days</span>
          </p>
          <h2 className="display mt-3 max-w-[13ch] text-[2.25rem] sm:text-[2.85rem]">
            Your first {site.offer.premiumDays} days of Rafiq Premium are on us.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[0.98rem] leading-relaxed text-ink-soft">
            Submit your email before launch to reserve the full Premium experience.
            The response list records your eligibility, and the launch email contains
            the steps to redeem it. No payment card is required.
          </p>
        </div>

        <div>
          <ul>
            {inclusions.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 border-t py-5 first:border-t-0 first:pt-0"
                style={{ borderColor: "var(--line-strong)" }}
              >
                <CheckCircleIcon
                  size={23}
                  weight="fill"
                  className="mt-0.5 shrink-0"
                  aria-hidden
                  style={{ color: "var(--primary)" }}
                />
                <div>
                  <h3 className="text-[1.02rem] font-extrabold">{item.title}</h3>
                  <p className="mt-1.5 max-w-[58ch] text-[0.91rem] leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 max-w-[34rem]">
            <EarlyAccess source="offer" />
          </div>
        </div>
      </div>
    </section>
  );
}
