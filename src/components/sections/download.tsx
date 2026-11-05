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
      className="scroll-mt-20 bg-surface px-5 py-20 sm:px-8 sm:py-32"
    >
      <div
        className="mx-auto grid max-w-[1160px] gap-12 rounded-card bg-card px-5 py-8 shadow-[0_30px_70px_-42px_var(--shade-deep)] sm:px-10 sm:py-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:px-14 lg:py-14"
      >
        <div>
          <Image
            src="/brand/app-icon.webp"
            alt=""
            width={96}
            height={96}
            className="size-20 rounded-tile sm:size-24"
          />
          <h2 className="display mt-7 max-w-[13ch] text-[2.25rem] sm:text-[2.85rem]">
            Your companion is ready on Google Play.
          </h2>
          <p className="mt-6 max-w-[52ch] text-[0.98rem] leading-relaxed text-ink-soft">
            Install Rafiq, choose the protections you want, and keep matching on your
            device. No website signup is required.
          </p>
          <div className="mt-8">
            <PlayStoreLink source="download" className="w-full sm:w-auto" />
          </div>
        </div>

        <div>
          <ul>
            {inclusions.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 border-t border-line-strong py-5 first:border-t-0 first:pt-0"
              >
                <CheckCircleIcon
                  size={23}
                  weight="fill"
                  className="mt-0.5 shrink-0 text-primary"
                  aria-hidden
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
