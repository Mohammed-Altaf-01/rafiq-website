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

/*
 * Shape only. No pattern can tell a real address from a plausible one — the
 * only proof is mail arriving at it — but it can refuse the things that are
 * certainly not addresses, which is the whole job here: an unroutable string in
 * the sheet is a launch email that bounces, and the person who typed it never
 * finds out.
 *
 * Rejected on top of the obvious "no @": a bare domain after it (`you@site`),
 * a one-letter TLD, a numeric one, dots that lead, trail or double up, and a
 * host label opening or closing on a hyphen.
 */
const EMAIL =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

export function isEmail(value: string) {
  const address = value.trim();
  // 254 is the longest address an SMTP envelope can carry.
  return address.length <= 254 && EMAIL.test(address);
}

/*
 * The address this device has already left, cached so that reading it is cheap
 * enough to be a render-time snapshot. `undefined` means it has not been read
 * yet; `null` means it was read and there is nothing stored.
 */
let cached: string | null | undefined;

/** Every mounted form, so one signup settles all of them at once. */
const listeners = new Set<() => void>();

export function rememberedEmail(): string | null {
  if (cached === undefined) {
    try {
      cached = localStorage.getItem(STORE_KEY);
    } catch {
      cached = null;
    }
  }
  return cached;
}

/**
 * Watches the stored address.
 *
 * Two signals feed it. `storage` events cover the same site open in another
 * tab, which the browser fires on its own; the set of listeners covers this
 * tab, where it does not. Without the second one a signup in the scroll gate
 * would leave the form in the closing section still sitting there empty, asking
 * for an address the site already has.
 */
export function subscribeRememberedEmail(onChange: () => void) {
  listeners.add(onChange);

  const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORE_KEY) return;
    cached = undefined;
    onChange();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function remember(email: string) {
  try {
    localStorage.setItem(STORE_KEY, email);
  } catch {
    // Private browsing, or storage disabled. The signup itself already went
    // through; all that is lost is recognising this person on their next visit.
  }
  // Held in memory either way, so the rest of the page still settles even when
  // the write was refused.
  cached = email;
  for (const listener of listeners) listener();
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
