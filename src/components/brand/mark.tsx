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
      src="/brand/mark.webp"
      alt=""
      width={size}
      height={size}
      loading="lazy"
      className={onDark ? undefined : "in-data-[theme=dark]:scale-[0.76]"}
      style={{ width: onDark ? size * 0.76 : size, height: "auto" }}
    />
  );

  if (!onDark) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded-full in-data-[theme=dark]:bg-deep-ink in-data-[theme=dark]:inset-ring in-data-[theme=dark]:inset-ring-deep-gold/40 ${className}`}
      >
        {mark}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-deep-ink inset-ring inset-ring-deep-gold/40 ${className}`}
      style={{ width: size, height: size }}
    >
      {mark}
    </span>
  );
}

export function Wordmark() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark size={30} />
      <span className="text-[1.05rem] font-extrabold tracking-tight text-ink">Rafiq</span>
    </span>
  );
}
