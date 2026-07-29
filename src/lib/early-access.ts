import { site } from "@/lib/site";

/** The one address remembered on this device, so a returning visitor is not asked twice. */
const STORE_KEY = "rafiq-early-access";

export const earlyAccessEnabled = site.earlyAccess.action !== null;

/**
 * Where a "Get early access" button should send someone: the store once it
 * exists, otherwise the signup form in the closing section, and the mailto
 * only while that form has nowhere to post to.
 *
 * `onHome` is false on the legal pages, where `#early-access` matches nothing.
 */
export function earlyAccessTarget(onHome: boolean) {
  if (site.playStore) return site.playStore;
  if (!earlyAccessEnabled) return site.earlyAccessUrl;
  return onHome ? "#early-access" : "/#early-access";
}

/** Deliberately loose. The only real check of an address is mail arriving at it. */
export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function rememberedEmail(): string | null {
  try {
    return localStorage.getItem(STORE_KEY);
  } catch {
    return null;
  }
}

function remember(email: string) {
  try {
    localStorage.setItem(STORE_KEY, email);
  } catch {
    // Private browsing, or storage disabled. The signup itself already went
    // through; all that is lost is recognising this person on their next visit.
  }
}

/**
 * Posts one address into the Google Form behind `site.earlyAccess`.
 *
 * The request is `no-cors`, because Google does not send back a CORS header
 * for form submissions. That means the response is opaque: we can see that the
 * request left the browser, and nothing else. A rejected promise is a real
 * network failure and worth showing; a 401 from a form that has started
 * demanding a Google sign-in resolves here and looks exactly like success, so
 * the visitor reads "You are on the list" while nothing was saved.
 *
 * Nothing in the browser can tell those apart. `npm run verify:form -- --submit`
 * makes the same post from Node, where the status code is readable — that is
 * the only real check this path has.
 */
export async function submitEarlyAccess(email: string) {
  const { action, field } = site.earlyAccess;
  if (!action) throw new Error("site.earlyAccess.action is not set");

  const body = new URLSearchParams({ [field]: email.trim() });
  await fetch(action, {
    method: "POST",
    mode: "no-cors",
    body,
  });

  remember(email.trim());
}
