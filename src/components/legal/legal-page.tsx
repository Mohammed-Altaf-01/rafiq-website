import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

import { ReadingProgress } from "@/components/legal/reading-progress";
import { Footer } from "@/components/site/footer";
import { ThemeToggle } from "@/components/site/theme-toggle";
import type { LegalDoc } from "@/lib/legal";

export function LegalPage({ doc, sibling }: { doc: LegalDoc; sibling: { href: string; label: string } }) {
  return (
    <>
      <ReadingProgress />

      {/*
        No site nav here. A policy is a document, not a place to be sold from:
        the only way out is back to the landing page, where the nav lives. The
        theme toggle stays, because these are the longest reads on the site and
        a dark-theme reader would otherwise be stuck on a cream page.
      */}
      <main id="main-content" tabIndex={-1} className="px-5 pt-11 pb-24 sm:px-8">
        <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.88rem] font-semibold text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeftIcon size={15} />
            Back to Rafiq
          </Link>

          <ThemeToggle />
        </div>

        <header className="mx-auto mt-12 max-w-[1160px]">
          <h1 className="display text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem]">
            {doc.title}
          </h1>

          <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-2 text-[0.86rem]">
            <div className="flex gap-2">
              <dt className="text-ink-faint">Effective</dt>
              <dd className="font-semibold text-ink">{doc.effective}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-ink-faint">Last updated</dt>
              <dd className="font-semibold text-ink">{doc.updated}</dd>
            </div>
          </dl>
        </header>

        <div className="mx-auto mt-16 grid max-w-[1160px] gap-14 lg:grid-cols-[240px_1fr] lg:gap-20">
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-11">
              <p className="overline text-ink-faint">On this page</p>
              <ul className="mt-5 space-y-2.5">
                {doc.toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block text-[0.875rem] leading-snug text-ink-soft transition-colors hover:text-ink"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>

              <Link
                href={sibling.href}
                className="mt-9 inline-block border-t pt-6 text-[0.875rem] font-semibold transition-colors hover:opacity-80"
                style={{ color: "var(--primary)", borderColor: "var(--line)" }}
              >
                {sibling.label}
              </Link>
            </div>
          </nav>

          <article
            className="legal-prose min-w-0"
            dangerouslySetInnerHTML={{ __html: doc.html }}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}
