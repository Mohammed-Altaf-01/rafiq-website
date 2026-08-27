/**
 * Configuration check for the early-access Google Form, with an optional
 * row-writing probe.
 *
 *   node scripts/verify-early-access.mjs
 *     Read-only: checks public reachability, the configured entry id, and
 *     visible sign-in requirements. It does not submit an address and cannot
 *     prove that Google will record one.
 *
 *   node scripts/verify-early-access.mjs --submit
 *     End to end: posts one probe and reads Google's real status. This writes a
 *     row and must only be run with explicit authorization.
 *
 * The probe uses `probe+<timestamp>@rafiq.invalid`, so it is obvious and
 * filterable. `.invalid` is reserved by RFC 2606 and can never belong to
 * anyone. Delete the probe row from the eligibility Sheet afterward.
 */

import { readFile } from "node:fs/promises";

const SUBMIT = process.argv.includes("--submit");
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function fail(message, ...detail) {
  console.error(`\n✗ ${message}`);
  for (const line of detail) console.error(`  ${line}`);
  process.exit(1);
}

/*
 * site.ts is TypeScript that Node will not import, and the two values wanted
 * here are string literals. Reading them out is cheaper and has no build step.
 */
const source = await readFile(new URL("../src/lib/site.ts", import.meta.url), "utf8");
const action = source.match(/action:\s*\n?\s*"([^"]+)"/)?.[1] ?? null;
const field = source.match(/field:\s*"(entry\.\d+)"/)?.[1] ?? null;

if (!action) fail("site.earlyAccess.action is null — the site is on the mailto fallback.");
if (!field) fail("site.earlyAccess.field is missing from src/lib/site.ts.");

const viewform = action.replace(/\/formResponse$/, "/viewform");
console.log(`form   ${viewform}`);
console.log(`field  ${field}`);

/* 1. The form has to be public, or nobody can even open it. */
const view = await fetch(viewform, { headers: { "User-Agent": UA }, redirect: "manual" });
if (view.status !== 200) {
  fail(
    `The form is not publicly readable (HTTP ${view.status}).`,
    view.headers.get("location")?.startsWith("https://accounts.google.com")
      ? "It redirects to a Google sign-in. Set sharing so anyone with the link can respond."
      : "Check the form still exists and is accepting responses.",
  );
}
const html = await view.text();

/* 2. The entry id in site.ts has to be a question this form still has. */
if (!html.includes(field.replace("entry.", ""))) {
  const ids = [...html.matchAll(/entry\.(\d+)/g)].map((m) => m[1]);
  fail(
    `${field} is not a question on this form.`,
    `Entry ids found: ${[...new Set(ids)].join(", ") || "none"}`,
  );
}

/*
 * 3. Three response settings each make Google demand a signed-in Google
 * account before it will accept a submission, which kills every anonymous post
 * from the site with a 401. They are readable from the page's own bootstrap
 * data, so the cause can be named instead of guessed at.
 */
const bootstrap = html.match(/FB_PUBLIC_LOAD_DATA_ = (.*?);<\/script>/s);
const forcesSignIn = [];
if (bootstrap) {
  try {
    const data = JSON.parse(bootstrap[1]);
    if (data?.[1]?.[2]?.[3]) forcesSignIn.push('"Allow response editing"');
    if (data?.[1]?.[10]?.[6] === 2) forcesSignIn.push('"Collect email addresses: Verified"');
    if (data?.[1]?.[10]?.[2]) forcesSignIn.push('"Limit to 1 response"');
  } catch {
    // Google changed the shape. The live POST below is the real check anyway.
  }
}
if (forcesSignIn.length) {
  console.log(`\n! Settings → Responses has ${forcesSignIn.join(" and ")} switched on.`);
  console.log("  Each of these forces responders to sign in, which rejects the site's posts.");
}

if (!SUBMIT) {
  console.log("\n✓ Configuration check passed. No address was submitted and no row was written.");
  console.log("  Recording is only proven by a separately authorized --submit probe.");
  process.exit(0);
}

/* 4. Optional end-to-end check: write one probe row and read the status. */
const probe = `probe+${Date.now()}@rafiq.invalid`;
const body = new URLSearchParams({
  [field]: probe,
  fvv: "1",
  pageHistory: "0",
  submissionTimestamp: "-1",
});
const fbzx = html.match(/name="fbzx" value="(-?\d+)"/)?.[1];
if (fbzx) {
  body.set("fbzx", fbzx);
  body.set("partialResponse", JSON.stringify([null, null, fbzx]));
}

const post = await fetch(action, {
  method: "POST",
  headers: {
    "User-Agent": UA,
    "Content-Type": "application/x-www-form-urlencoded",
    Referer: viewform,
  },
  body,
  redirect: "manual",
});

console.log(`\nposted ${probe} → HTTP ${post.status}`);

if (post.status === 401 || post.status === 403) {
  fail(
    "Google refused the submission. Nothing reached the Sheet.",
    forcesSignIn.length
      ? `Turn off ${forcesSignIn.join(" and ")} in Settings → Responses, then re-run.`
      : "The form is demanding a signed-in Google account. Check Settings → Responses.",
  );
}
if (post.status >= 300) {
  fail(`Unexpected HTTP ${post.status}.`, `Location: ${post.headers.get("location") ?? "none"}`);
}

const confirmation = await post.text();
if (!/response has been recorded|Thanks for submitting/i.test(confirmation)) {
  fail("HTTP 200, but Google did not return its confirmation page.", "The row may not have saved.");
}

console.log("\n✓ Recorded. Check the Sheet for that address, then delete the probe row.");
