import Link from "next/link";

import { Mark } from "@/components/brand/mark";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t px-5 pt-16 pb-12 sm:px-8" style={{ borderColor: "var(--line)" }}>
      <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Mark size={30} />
            <span className="text-[1.05rem] font-extrabold tracking-tight">Rafiq</span>
          </div>
          <p className="mt-4 max-w-[38ch] text-[0.9rem] leading-relaxed text-ink-soft">
            A quiet companion for your phone. Built for Android {site.minAndroid} and newer.
          </p>
        </div>

        <nav aria-label="Product">
          <h2 className="text-[0.8rem] font-bold text-ink">Product</h2>
          <ul className="mt-4 space-y-2.5 text-[0.9rem] text-ink-soft">
            {nav.map((item) => (
              <li key={item.hash}>
                <Link href={`/${item.hash}`} className="transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal and support">
          <h2 className="text-[0.8rem] font-bold text-ink">Legal</h2>
          <ul className="mt-4 space-y-2.5 text-[0.9rem] text-ink-soft">
            <li>
              <Link href="/privacy" className="transition-colors hover:text-ink">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-ink">
                Terms of Service
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${site.supportEmail}`}
                className="transition-colors hover:text-ink"
              >
                {site.supportEmail}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.supportEmail}?subject=Delete%20my%20Rafiq%20account`}
                className="transition-colors hover:text-ink"
              >
                Delete your account
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className="mx-auto mt-12 flex max-w-[1240px] flex-col gap-3 border-t pt-8 text-[0.82rem] text-ink-faint sm:flex-row sm:items-center sm:justify-between"
        style={{ borderColor: "var(--line)" }}
      >
        <p>&copy; {new Date().getFullYear()} Rafiq. Made with care.</p>
        <p className="arabic text-[1rem]" dir="rtl" lang="ar" style={{ color: "var(--gold)" }}>
          وَٱللَّهُ خَيْرٌ حَـٰفِظًا
        </p>
      </div>
    </footer>
  );
}
