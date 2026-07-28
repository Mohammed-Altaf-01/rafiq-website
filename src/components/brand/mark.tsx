import Image from "next/image";

/**
 * The calligraphy in the Rafiq mark is knocked OUT of the crescent, so the
 * letterforms are negative space and only resolve against a light field.
 * On any dark surface the mark therefore sits on a warm plate and becomes a
 * seal. Recolouring it does not work: the script was never drawn.
 * (See AGENTS.md §3a in the app repo.)
 */
export function Mark({
  size = 32,
  onDark = false,
  className = "",
}: {
  size?: number;
  onDark?: boolean;
  className?: string;
}) {
  const mark = (
    <Image
      src="/brand/mark.png"
      alt=""
      width={size}
      height={size}
      priority
      style={{ width: onDark ? size * 0.76 : size, height: "auto" }}
    />
  );

  if (!onDark) {
    return (
      <span className={`inline-flex shrink-0 items-center justify-center ${className}`}>
        {mark}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: "#EDE6D6",
        boxShadow: "inset 0 0 0 1px rgba(216, 184, 95, 0.4)",
      }}
    >
      {mark}
    </span>
  );
}

export function Wordmark({ onDark = false }: { onDark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark size={onDark ? 34 : 30} onDark={onDark} />
      <span
        className="text-[1.05rem] font-extrabold tracking-tight"
        style={{ color: onDark ? "var(--deep-ink)" : "var(--ink)" }}
      >
        Rafiq
      </span>
    </span>
  );
}
