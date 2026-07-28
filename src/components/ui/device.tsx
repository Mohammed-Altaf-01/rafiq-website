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
 */
export function Device({
  src,
  alt,
  priority = false,
  onDark = false,
  className = "",
  sizes = "(max-width: 768px) 70vw, 380px",
}: {
  src: ScreenSrc;
  alt: string;
  priority?: boolean;
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
      priority={priority}
      sizes={sizes}
      className={`h-auto w-full select-none ${onDark ? "lift-device-deep" : "lift-device"} ${className}`}
      draggable={false}
    />
  );
}
