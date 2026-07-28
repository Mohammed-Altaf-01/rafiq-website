/**
 * Intrinsic size of every exported screen, written by the asset script.
 * `Device` reads it so each render reserves its true aspect ratio instead of
 * one shared guess, which is what stops the page shifting as they load.
 */
export const screenSize = {
  "/screens/accessibility.webp": { width: 576, height: 1276 },
  "/screens/block-adult.webp": { width: 714, height: 1548 },
  "/screens/block-adult-done.webp": { width: 688, height: 1530 },
  "/screens/block-limit.webp": { width: 540, height: 1176 },
  "/screens/block-reels.webp": { width: 640, height: 1414 },
  "/screens/home.webp": { width: 712, height: 1518 },
  "/screens/journey.webp": { width: 553, height: 1181 },
  "/screens/journey-dark.webp": { width: 556, height: 1181 },
  "/screens/limits.webp": { width: 549, height: 1182 },
  "/screens/login.webp": { width: 502, height: 1084 },
  "/screens/paywall.webp": { width: 513, height: 1090 },
  "/screens/purchase.webp": { width: 640, height: 1414 },
  "/screens/settings.webp": { width: 640, height: 1414 },
  "/screens/setup-done.webp": { width: 576, height: 1276 },
  "/screens/story-1.webp": { width: 490, height: 1050 },
  "/screens/story-2.webp": { width: 490, height: 1050 },
  "/screens/trust.webp": { width: 576, height: 1258 },
  "/screens/welcome.webp": { width: 484, height: 1050 },
} as const;

export type ScreenSrc = keyof typeof screenSize;
