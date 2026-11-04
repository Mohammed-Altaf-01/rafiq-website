/**
 * Release checks against Next's real static export.
 *
 * Run `npm run build` first. An alternate export directory can be supplied for
 * regression fixtures with `node scripts/verify-static-output.mjs --dir PATH`.
 */

import { readFile, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { JSDOM } from "jsdom";

const PROJECT_ROOT = dirname(fileURLToPath(new URL("../package.json", import.meta.url)));
const BASE_URL = "https://www.rafiqguardian.app";
const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.rafiqgaurdian.app";
const MAX_HOMEPAGE_JS_GZIP_BYTES = 302.5 * 1024;
const MAX_OG_IMAGE_BYTES = 300 * 1024;

const routes = [
  { path: "/", file: "index.html", canonical: `${BASE_URL}/` },
  { path: "/privacy", file: "privacy/index.html", canonical: `${BASE_URL}/privacy/` },
  { path: "/terms", file: "terms/index.html", canonical: `${BASE_URL}/terms/` },
  {
    path: "/delete-account",
    file: "delete-account/index.html",
    canonical: `${BASE_URL}/delete-account/`,
  },
];

const forbiddenLandingClaims = [
  { label: "pricing", pattern: /\bpricing\b/i },
  { label: "$4.99", pattern: /\$4\.99/i },
  { label: "$35.99", pattern: /\$35\.99/i },
  { label: "7-day", pattern: /\b7-day\b/i },
  { label: "7 days", pattern: /\b7 days\b/i },
  { label: "14-day", pattern: /\b14-day\b/i },
  { label: "14 days", pattern: /\b14 days\b/i },
  { label: "early access", pattern: /\bearly access\b/i },
  { label: "free month", pattern: /\bfree month\b/i },
  { label: "before launch", pattern: /\bbefore launch\b/i },
  { label: "launch email", pattern: /\blaunch email\b/i },
];

const args = process.argv.slice(2);
const dirIndex = args.indexOf("--dir");
if (dirIndex !== -1 && !args[dirIndex + 1]) {
  console.error("\n✗ --dir requires a path to a static export.\n");
  process.exit(1);
}

const requestedRoot = dirIndex === -1 ? join(PROJECT_ROOT, "out") : args[dirIndex + 1];
const outputRoot = isAbsolute(requestedRoot)
  ? requestedRoot
  : resolve(process.cwd(), requestedRoot);

try {
  const outputStat = await stat(outputRoot);
  if (!outputStat.isDirectory()) throw new Error("not a directory");
} catch {
  console.error(`\n✗ Static export not found at ${outputRoot}.`);
  console.error("  Run `npm run build` before `npm run verify:static`.\n");
  process.exit(1);
}

const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

async function readRequired(relativePath, label = relativePath) {
  const absolutePath = join(outputRoot, relativePath);
  try {
    return await readFile(absolutePath);
  } catch {
    failures.push(`${label} is missing (${relativePath}).`);
    return null;
  }
}

function isInitiallyHidden(element) {
  return (
    element.style.opacity === "0" ||
    element.style.visibility === "hidden" ||
    element.style.display === "none"
  );
}

function isSubstantive(element) {
  if (element.getAttribute("aria-hidden") === "true") return false;

  const hasReadableText = element.textContent.trim().length > 0;
  const isContentElement = element.matches(
    "a, button, form, img, input:not([type='hidden']), select, textarea, video",
  );
  const containsContentElement = Boolean(
    element.querySelector(
      "a, button, form, img, input:not([type='hidden']), select, textarea, video",
    ),
  );

  return hasReadableText || isContentElement || containsContentElement;
}

const documents = new Map();
for (const route of routes) {
  const htmlBuffer = await readRequired(route.file, `${route.path} HTML`);
  if (!htmlBuffer) continue;

  const html = htmlBuffer.toString("utf8");
  const document = new JSDOM(html, { url: route.canonical }).window.document;
  documents.set(route.path, { document, html });

  const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute("href");
  const openGraphUrl = document
    .querySelector('meta[property="og:url"]')
    ?.getAttribute("content");
  const openGraphImage = document
    .querySelector('meta[property="og:image"]')
    ?.getAttribute("content");

  check(canonical === route.canonical, `${route.path} canonical is ${canonical ?? "missing"}.`);
  check(
    openGraphUrl === route.canonical,
    `${route.path} og:url is ${openGraphUrl ?? "missing"}.`,
  );
  check(
    openGraphImage?.startsWith(`${BASE_URL}/opengraph-image`) === true,
    `${route.path} does not reference the production Open Graph image.`,
  );
  check(!html.includes("rafiq.app"), `${route.path} still contains the unrelated rafiq.app URL.`);
}

const homepage = documents.get("/");
if (homepage) {
  const { document, html } = homepage;

  const internalAnchors = [
    ...document.querySelectorAll('a[href^="#"], a[href^="/#"]'),
  ];
  for (const anchor of internalAnchors) {
    const href = anchor.getAttribute("href");
    const hash = href?.slice(href.indexOf("#") + 1) ?? "";
    check(
      hash.length > 0 && Boolean(document.getElementById(decodeURIComponent(hash))),
      `Landing anchor ${href || "(empty)"} has no matching id.`,
    );
  }

  const hiddenContent = [...document.querySelectorAll("[style]")].filter(
    (element) => isInitiallyHidden(element) && isSubstantive(element),
  );
  for (const element of hiddenContent) {
    const description =
      element.id ||
      element.getAttribute("aria-label") ||
      element.textContent.trim().replace(/\s+/g, " ").slice(0, 70) ||
      element.tagName.toLowerCase();
    failures.push(`Substantive landing content starts hidden: ${description}.`);
  }

  const title = document.querySelector("title")?.textContent ?? "";
  check(
    title.includes("Rafiq Guardian") && title.length <= 60,
    `Homepage title is “${title}”; it must name Rafiq Guardian in 60 characters or fewer.`,
  );
  check(
    document
      .querySelector('meta[name="googlebot"]')
      ?.getAttribute("content")
      ?.includes("max-image-preview:large") === true,
    "Homepage does not allow large image previews.",
  );

  const jsonLd = document.querySelector('script[type="application/ld+json"]')?.textContent;
  const graph = jsonLd ? JSON.parse(jsonLd)["@graph"] : [];
  for (const type of ["Organization", "WebSite", "MobileApplication"]) {
    const entity = graph.find((item) => item["@type"] === type);
    check(
      entity?.url === `${BASE_URL}/`,
      `Homepage JSON-LD ${type} url is ${entity?.url ?? "missing"}.`,
    );
  }

  const marketingText = document.body.textContent.replace(/\s+/g, " ");
  for (const claim of forbiddenLandingClaims) {
    check(
      !claim.pattern.test(marketingText),
      `Landing marketing HTML still contains the old claim “${claim.label}”.`,
    );
  }

  check(
    document.querySelectorAll("form, input[type='email']").length === 0,
    "Landing HTML still contains an email-capture form or field.",
  );
  check(
    !html.includes("formResponse") && !html.includes("docs.google.com/forms"),
    "Landing HTML still contains the retired Google Form destination.",
  );

  const playStoreLinks = [
    ...document.querySelectorAll(`a[href="${PLAY_STORE_URL}"]`),
  ];
  check(
    playStoreLinks.length >= 4,
    `Landing HTML has ${playStoreLinks.length} direct Google Play links; expected at least 4.`,
  );
  for (const link of playStoreLinks) {
    check(Boolean(link.querySelector("svg")), "A Google Play action is missing its store icon.");
  }

  const scriptPaths = [
    ...new Set(
      [...document.querySelectorAll("script[src]")]
        .map((script) => script.getAttribute("src"))
        .filter(Boolean)
        .map((source) => new URL(source, routeUrl("/")).pathname)
        .filter((pathname) => pathname.endsWith(".js")),
    ),
  ];

  let gzipBytes = 0;
  for (const pathname of scriptPaths) {
    const relativePath = pathname.replace(/^\//, "");
    const source = await readRequired(relativePath, `Homepage script ${pathname}`);
    if (source) gzipBytes += gzipSync(source).byteLength;
  }

  const gzipKiB = gzipBytes / 1024;
  console.log(`homepage JS gzip  ${gzipKiB.toFixed(1)} KiB across ${scriptPaths.length} files`);
  check(scriptPaths.length > 0, "Homepage references no JavaScript files.");
  check(
    gzipBytes < MAX_HOMEPAGE_JS_GZIP_BYTES,
    `Homepage JS gzip is ${gzipKiB.toFixed(1)} KiB (limit: 302.5 KiB).`,
  );

  // Keep this read in the page-level branch so a missing homepage produces one
  // clear route error instead of cascading through every landing-page check.
  check(html.length > 0, "Homepage HTML is empty.");
}

function routeUrl(path) {
  return path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}/`;
}

const ogImage = await readRequired("opengraph-image", "Open Graph image");
if (ogImage) {
  const pngSignature = "89504e470d0a1a0a";
  const isPng = ogImage.length >= 24 && ogImage.subarray(0, 8).toString("hex") === pngSignature;
  check(isPng, "Open Graph image is not a PNG.");

  if (isPng) {
    const width = ogImage.readUInt32BE(16);
    const height = ogImage.readUInt32BE(20);
    check(width === 1200 && height === 630, `Open Graph image is ${width}×${height}.`);
  }
  check(
    ogImage.byteLength < MAX_OG_IMAGE_BYTES,
    `Open Graph image is ${(ogImage.byteLength / 1024).toFixed(1)} KiB (limit: 300 KiB).`,
  );
}

const robots = await readRequired("robots.txt");
if (robots) {
  const text = robots.toString("utf8");
  check(text.includes(`Host: ${BASE_URL}`), "robots.txt has the wrong Host.");
  check(
    text.includes(`Sitemap: ${BASE_URL}/sitemap.xml`),
    "robots.txt has the wrong Sitemap URL.",
  );
  check(!text.includes("rafiq.app"), "robots.txt still contains rafiq.app.");
}

const sitemap = await readRequired("sitemap.xml");
if (sitemap) {
  const text = sitemap.toString("utf8");
  for (const route of routes) {
    check(text.includes(`<loc>${route.canonical}</loc>`), `sitemap.xml omits ${route.canonical}.`);
  }
  check(!text.includes("rafiq.app"), "sitemap.xml still contains rafiq.app.");
}

if (failures.length) {
  console.error(`\n✗ Static export failed ${failures.length} check${failures.length === 1 ? "" : "s"}:`);
  for (const failure of failures) console.error(`  - ${failure}`);
  console.error("");
  process.exit(1);
}

console.log("✓ Static export routes, metadata, anchors, visibility, claims, sharing, and crawl files verified.");
