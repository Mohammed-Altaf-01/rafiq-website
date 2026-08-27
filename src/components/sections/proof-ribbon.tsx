import {
  DeviceMobileIcon,
  FilmStripIcon,
  ShieldCheckIcon,
  TimerIcon,
} from "@phosphor-icons/react/dist/ssr";

const proof = [
  { Icon: ShieldCheckIcon, label: "Adult content" },
  { Icon: FilmStripIcon, label: "Shorts & Reels" },
  { Icon: TimerIcon, label: "Daily app limits" },
  { Icon: DeviceMobileIcon, label: "On-device matching" },
];

export function ProofRibbon() {
  return (
    <section
      aria-label="What Rafiq protects"
      className="border-y px-5 py-7 sm:px-8"
      style={{ borderColor: "var(--line)", background: "var(--card)" }}
    >
      <ul className="mx-auto grid max-w-[1080px] grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 sm:gap-8">
        {proof.map(({ Icon, label }) => (
          <li key={label} className="flex items-center gap-3 sm:justify-center">
            <Icon size={21} weight="regular" aria-hidden style={{ color: "var(--primary)" }} />
            <span className="text-[0.86rem] font-bold text-ink sm:text-[0.92rem]">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
