/**
 * Resolves the theme before first paint so a dark-mode visitor never sees a
 * cream flash. Kept as a raw inline script for that reason: any React-side
 * resolution runs after hydration, which is already too late.
 */
const script = `(function(){try{var s=localStorage.getItem("rafiq-theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.dataset.theme=(s==="light"||s==="dark")?s:(d?"dark":"light")}catch(e){document.documentElement.dataset.theme="light"}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
