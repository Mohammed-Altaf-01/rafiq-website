"""Turn each Rafiq design render into a web asset.

The renders are already tight device mockups: a hairline bezel, rounded
corners, and at most a few pixels of flat backdrop showing through the corner
arcs. The earlier flood-fill approach was wrong for exactly that reason -- with
no real margin to work in, the fill crossed the bezel and ate the drop shadows
inside the screen. This instead measures the device rectangle, crops to it, and
lays an anti-aliased rounded-rect mask over the corners. Nothing inside the
device is ever touched.
"""
import os

from PIL import Image, ImageDraw

SRC = "/Users/altaf/AndroidStudioProjects/Rafiq/designs"
OUT = "/Users/altaf/AndroidStudioProjects/rafiq-website/public/screens"
MANIFEST = "/Users/altaf/AndroidStudioProjects/rafiq-website/src/lib/screens.ts"
os.makedirs(OUT, exist_ok=True)

FILES = {
    "home": "homepage/homepage.png",
    "journey": "homepage/journey_screen.png",
    "journey-dark": "homepage/journey_black.png",
    "limits": "homepage/protect_screen.png",
    "settings": "homepage/setting_page.png",
    "purchase": "homepage/purchase_page.png",
    "paywall": "paywall_screen.png",
    "block-adult": "blocking screens/adult_content_blocking_screen.png",
    "block-adult-done": "blocking screens/adult_content_blocking_timerfinished.png",
    # The two file names read the other way round to what they show:
    # `timebound` is the short-video pause, `insta` is the spent daily budget.
    "block-reels": "blocking screens/blocking_screen_timebound.png",
    "block-limit": "blocking screens/blocking_screen_insta.png",
    "welcome": "welcome screen and story/first_screen_update.png",
    "story-1": "welcome screen and story/story_page1.png",
    "story-2": "welcome screen and story/story_page_2.png",
    "trust": "login page and accessibility screens/trust_page.png",
    "accessibility": "login page and accessibility screens/accessibility_screen_1.png",
    "setup-done": "login page and accessibility screens/accessibility_setup_complete.png",
    "login": "login page and accessibility screens/login_page_updated.png",
}

"""Explicit crops for renders the designer exported past the canvas edge.

`adult_content_blocking_timerfinished` is the only one: its device frame runs
off the top, right and bottom of the image, so there is no whole device to
recover. Trimming the one surviving bezel strip leaves the screen itself, which
the uniform frame below then gives an edge back to. Nothing is invented to fill
the gap.
"""
HARD_CROP = {"block-adult-done": (26, 6, 714, 1536)}

"""Renders whose drop shadow is soft enough that the default tolerance reads it
as part of the device, leaving a pale halo the frame below cannot cover (23px of
it under `paywall`). Measuring the box against a much larger tolerance ignores
the shadow and lands on the device itself."""
SHADOWED = {"paywall"}

TARGET_W = 880  # ~2x the widest on-page render
SS = 4  # supersample factor for the corner mask and the frame

"""One device edge for every screen, painted rather than inherited.

The renders disagree with each other about what a phone looks like: corner radii
run from 4.3% to 7.4% of the width, and the bezel is anywhere between a 2% band
and nothing at all -- `purchase`, `settings`, `trust` and `setup-done` run their
content flush to the crop, which is what reads as a cut-off screen next to the
ones that do have an edge. So the render's own bezel is not preserved. Every
screen is masked to the same radius and then given the same ring on top.

`RADIUS` clears the widest measured radius so the mask only ever removes corner,
never leaves a transparent notch where a render was already rounder. `FRAME`
clears the widest measured bezel for the same reason: at 2% it covers whatever
edge the render came with instead of sitting inside it and doubling up.
"""
RADIUS = 0.075  # corner radius, fraction of width
FRAME = 0.020  # device edge thickness, fraction of width
FRAME_RGB = (150, 147, 138)  # the warm grey most of the renders already used


def backdrop(img):
    """The flat colour showing through the corner arcs, if there is one.

    Renders whose bezel runs straight into the image edge have no backdrop and
    return None, so the crop is skipped entirely.
    """
    px = img.load()
    w, h = img.size
    corners = [px[x, y][:3] for x, y in ((0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1))]
    light = [c for c in corners if sum(c) / 3 > 195]
    if len(light) < 3:
        return None
    return tuple(round(sum(c[i] for c in light) / len(light)) for i in range(3))


def device_box(img, bg, tol=14):
    """Bounding box of everything that is not the backdrop."""
    px = img.load()
    w, h = img.size

    def occupied(x, y):
        p = px[x, y]
        return max(abs(p[i] - bg[i]) for i in range(3)) > tol

    left = next((x for x in range(w) if any(occupied(x, y) for y in range(0, h, 3))), 0)
    right = next(
        (x for x in range(w - 1, -1, -1) if any(occupied(x, y) for y in range(0, h, 3))), w - 1
    )
    top = next((y for y in range(h) if any(occupied(x, y) for x in range(0, w, 3))), 0)
    bottom = next(
        (y for y in range(h - 1, -1, -1) if any(occupied(x, y) for x in range(0, w, 3))), h - 1
    )
    return (left, top, right + 1, bottom + 1)


def add_frame(img, radius, thickness):
    """Paint the uniform device edge, anti-aliased against the same arc the
    corner mask is about to cut, so the ring and the silhouette share an edge."""
    w, h = img.size
    ring = Image.new("L", (w * SS, h * SS), 0)
    ImageDraw.Draw(ring).rounded_rectangle(
        (0, 0, w * SS - 1, h * SS - 1), radius=radius * SS, outline=255, width=thickness * SS
    )
    out = img.copy()
    out.paste(Image.new("RGB", (w, h), FRAME_RGB), (0, 0), ring.resize((w, h), Image.LANCZOS))
    return out


def round_corners(img, radius):
    """Anti-aliased rounded-rect alpha, drawn oversized then downsampled so the
    arc has no stair-stepping at the sizes these render at."""
    w, h = img.size
    mask = Image.new("L", (w * SS, h * SS), 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, w * SS - 1, h * SS - 1), radius=radius * SS, fill=255
    )
    mask = mask.resize((w, h), Image.LANCZOS)
    out = img.copy()
    out.putalpha(mask)
    return out


manifest = {}
for name, rel in sorted(FILES.items()):
    path = os.path.join(SRC, rel)
    if not os.path.exists(path):
        print("MISSING", rel)
        continue

    img = Image.open(path).convert("RGB")
    if name in HARD_CROP:
        img = img.crop(HARD_CROP[name])
        bg = None
    else:
        bg = backdrop(img)
        if bg is not None:
            img = img.crop(device_box(img, bg, tol=70 if name in SHADOWED else 14))

    if img.width > TARGET_W:
        img = img.resize((TARGET_W, round(img.height * TARGET_W / img.width)), Image.LANCZOS)

    radius = round(img.width * RADIUS)
    img = round_corners(add_frame(img, radius, round(img.width * FRAME)), radius)

    img.save(os.path.join(OUT, f"{name}.webp"), "WEBP", quality=92, method=6)
    manifest[name] = (img.width, img.height)
    print(f"{name:18} bg={bg} -> {img.width}x{img.height}")

lines = [
    "/**",
    " * Intrinsic size of every exported screen, written by the asset script.",
    " * `Device` reads it so each render reserves its true aspect ratio instead of",
    " * one shared guess, which is what stops the page shifting as they load.",
    " */",
    "export const screenSize = {",
]
for name, (w, h) in sorted(manifest.items()):
    lines.append(f'  "/screens/{name}.webp": {{ width: {w}, height: {h} }},')
lines += ["} as const;", "", "export type ScreenSrc = keyof typeof screenSize;", ""]
with open(MANIFEST, "w") as fh:
    fh.write("\n".join(lines))
print("wrote", MANIFEST)
