import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => undefined;

/** False in the static HTML and during hydration, true after: both sides render the same markup. */
export function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
