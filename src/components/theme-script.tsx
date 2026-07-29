/**
 * Resolves the theme before first paint so a returning dark-mode visitor never
 * sees a cream flash. Kept as a raw inline script for that reason: any
 * React-side resolution runs after hydration, which is already too late.
 *
 * Light is the default for everyone. The OS preference is deliberately ignored:
 * dark is only served to a visitor who asked for it with the toggle.
 */
const script = `(function(){try{var s=localStorage.getItem("rafiq-theme");document.documentElement.dataset.theme=s==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
