import Image from "next/image";

import { screenSize, type ScreenSrc } from "@/lib/screens";

/**
 * A real Rafiq screen. These are the app's own design renders, cropped to the
 * device rectangle with an anti-aliased rounded-corner mask, so the device edge
 * is part of the asset and the only thing added here is the warm-tinted shadow.
 *
 * The intrinsic size comes from the generated manifest rather than a shared
 * guess: the renders are not all the same aspect ratio, and a wrong ratio shows
 * up as the page shifting under the reader while the images load.
 *
 * The device edge is painted by `scripts/prep-screens.py`, not by CSS: it has to
 * follow the same anti-aliased corner arc the alpha mask cuts, and a CSS ring
 * laid over that arc leaves a hairline of background showing through it.
 */
export function Device({
  src,
  alt,
  eager = false,
  onDark = false,
  className = "",
  sizes = "(max-width: 768px) 70vw, 380px",
}: {
  src: ScreenSrc;
  alt: string;
  eager?: boolean;
  onDark?: boolean;
  className?: string;
  sizes?: string;
}) {
  const { width, height } = screenSize[src];

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      // `loading`/`fetchPriority` rather than `preload`: Next 16 deprecated
      // `priority`, and its replacement injects a `<link rel=preload>`, which
      // the docs warn against when more than one image on the page could turn
      // out to be the LCP element. The hero has two.
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      sizes={sizes}
      className={`h-auto w-full select-none ${onDark ? "lift-device-deep" : "lift-device"} ${className}`}
      draggable={false}
    />
  );
}
