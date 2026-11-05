import Link from "next/link";

import { Mark } from "@/components/brand/mark";
import { nav, site } from "@/lib/site";

// Comfortable thumb targets while the columns stack; the desktop list stays tight.
const linkClass = "inline-flex min-h-11 items-center transition-colors hover:text-ink md:min-h-0";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 pt-16 pb-12 sm:px-8">
      <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Mark size={30} />
            <span className="text-[1.05rem] font-extrabold tracking-tight">Rafiq</span>
          </div>
          <p className="mt-4 max-w-[38ch] text-[0.9rem] leading-relaxed text-ink-soft">
            {site.alternateName} is a steadfast companion for intentional Android use. Built for Android {site.minAndroid} and newer.
          </p>
        </div>

        <nav aria-label="Product">
          <h2 className="text-[0.8rem] font-bold text-ink">Product</h2>
          <ul className="mt-2 text-[0.9rem] text-ink-soft md:mt-4 md:space-y-2.5">
            {nav.map((item) => (
              <li key={item.hash}>
                <Link href={`/${item.hash}`} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal and support">
          <h2 className="text-[0.8rem] font-bold text-ink">Legal</h2>
          <ul className="mt-2 text-[0.9rem] text-ink-soft md:mt-4 md:space-y-2.5">
            <li>
              <Link href="/privacy" className={linkClass}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className={linkClass}>
                Terms of Service
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${site.supportEmail}`}
                className={linkClass}
              >
                {site.supportEmail}
              </a>
            </li>
            {/*
              A real page, not a mailto: the Play Console Data Safety form only
              takes an https URL, and Google expects to find that URL linked
              from the site itself.
            */}
            <li>
              <Link href="/delete-account" className={linkClass}>
                Delete your account
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className="mx-auto mt-12 flex max-w-[1240px] flex-col gap-3 border-t border-line pt-8 text-[0.82rem] text-ink-faint sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="space-y-1.5">
          <p className="text-ink-soft">&copy; {new Date().getFullYear()} Rafiq. Made with care.</p>
          <p className="text-ink-soft">
            Android is a trademark of Google LLC. Google Play and the Google Play logo are
            trademarks of Google LLC.
          </p>
        </div>
        <p className="arabic text-[1rem] text-gold" dir="rtl" lang="ar">
          وَٱللَّهُ خَيْرٌ حَـٰفِظًا
        </p>
      </div>
    </footer>
  );
}
