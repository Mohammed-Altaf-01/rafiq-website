import { readFile } from "node:fs/promises";
import path from "node:path";

import { marked } from "marked";

import { site } from "@/lib/site";

export type LegalDoc = {
  title: string;
  effective: string;
  updated: string;
  html: string;
  toc: { id: string; text: string }[];
};

/** Heading text is lifted out of rendered HTML, so entities come back with it. */
function decodeEntities(text: string) {
  return text
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code: string) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function slug(text: string) {
  return text
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * The two policy documents are the same files the app bundles, copied into
 * `src/content` verbatim. They are parsed at build time and rendered as static
 * HTML. The one deployment-owned value—the account-deletion URL—is routed to
 * this site's verified base URL so a stale custom-domain reference cannot send
 * a legal request to an unrelated website.
 */
export async function loadLegal(file: "privacy-policy" | "terms-and-conditions"): Promise<LegalDoc> {
  const raw = await readFile(path.join(process.cwd(), "src/content", `${file}.md`), "utf8");

  const title = raw.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? "";
  const effective = raw.match(/\*\*Effective date:\*\*\s*(.+)/)?.[1]?.trim() ?? "";
  const updated = raw.match(/\*\*Last updated:\*\*\s*(.+)/)?.[1]?.trim() ?? "";

  // The title and the two dates are lifted into the page header, so drop them
  // from the body to avoid printing them twice.
  const body = raw
    .replace(/^#\s+.+$/m, "")
    .replace(/^\*\*Effective date:\*\*.*$/m, "")
    .replace(/^\*\*Last updated:\*\*.*$/m, "")
    .trimStart();

  const parsed = (await marked.parse(body, { gfm: true, breaks: false })).replaceAll(
    "https://rafiq.app/delete-account/",
    `${site.url}/delete-account/`,
  );

  const toc: { id: string; text: string }[] = [];
  const html = parsed.replace(/<h2>([\s\S]*?)<\/h2>/g, (_match, inner: string) => {
    const text = decodeEntities(inner.replace(/<[^>]+>/g, "")).trim();
    const id = slug(text);
    toc.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  return { title, effective, updated, html, toc };
}
