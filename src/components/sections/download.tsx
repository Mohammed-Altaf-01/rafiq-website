import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { PlayStoreLink } from "@/components/ui/play-store-link";

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

export function Download() {
  return (
    <section
      id="download"
      className="scroll-mt-20 px-5 py-24 sm:px-8 sm:py-32"
      style={{ background: "var(--surface)" }}
    >
      <div
        className="mx-auto grid max-w-[1160px] gap-12 overflow-hidden rounded-[var(--radius-card)] px-6 py-9 sm:px-10 sm:py-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:px-14 lg:py-14"
        style={{ background: "var(--card)", boxShadow: "0 30px 70px -42px var(--shade-deep)" }}
      >
        <div>
          <Image
            src="/brand/app-icon.png"
            alt=""
            width={96}
            height={96}
            className="h-20 w-20 sm:h-24 sm:w-24"
          />
          <h2 className="display mt-7 max-w-[13ch] text-[2.25rem] sm:text-[2.85rem]">
            Your companion is ready on Google Play.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[0.98rem] leading-relaxed text-ink-soft">
            Install Rafiq, choose the protections you want, and keep matching on your
            device. No website signup is required.
          </p>
          <div className="mt-8">
            <PlayStoreLink source="download" />
          </div>
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

          <p className="mt-8 max-w-[54ch] text-[0.88rem] leading-relaxed text-ink-soft">
            Google Play handles installation and shows the current terms before any
            purchase. This website does not collect your email.
          </p>
        </div>
      </div>
    </section>
  );
}
