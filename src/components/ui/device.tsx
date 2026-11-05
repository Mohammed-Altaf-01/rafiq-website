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
  highPriority = false,
  onDark = false,
}: {
  src: ScreenSrc;
  alt: string;
  eager?: boolean;
  highPriority?: boolean;
  onDark?: boolean;
}) {
  const { width, height } = screenSize[src];

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      // Next 16 recommends eager loading or fetchPriority over preload when a
      // hero contains two viewport-dependent LCP images. Both load eagerly. The
      // home screen is the measured LCP below 1024px, where this app's Android
      // visitors are, so that phone gets `high`.
      loading={eager ? "eager" : "lazy"}
      fetchPriority={highPriority ? "high" : undefined}
      className={`h-auto w-full select-none ${onDark ? "lift-device-deep" : "lift-device"}`}
      draggable={false}
    />
  );
}
