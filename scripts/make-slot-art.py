#!/usr/bin/env python3
"""Unique slot tiles + lobby covers without Imagine quota."""
from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

ROOT = Path("/workspace/public/games")
SYM = ROOT / "sym"
OUT = SYM
SIZE = 512

SERIF = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf", 280)
SERIF_SM = ImageFont.truetype("/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf", 92)


def grad(c0, c1, size=SIZE, vertical=True) -> Image.Image:
    img = Image.new("RGB", (size, size))
    px = img.load()
    for i in range(size):
        t = i / (size - 1)
        r = int(c0[0] + (c1[0] - c0[0]) * t)
        g = int(c0[1] + (c1[1] - c0[1]) * t)
        b = int(c0[2] + (c1[2] - c0[2]) * t)
        if vertical:
            for x in range(size):
                px[x, i] = (r, g, b)
        else:
            for y in range(size):
                px[i, y] = (r, g, b)
    return img


def vignette(img: Image.Image, strength=0.45) -> Image.Image:
    w, h = img.size
    overlay = Image.new("RGB", (w, h), (0, 0, 0))
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse((-int(w * 0.15), -int(h * 0.15), int(w * 1.15), int(h * 1.15)), fill=int(255 * (1 - strength)))
    mask = mask.filter(ImageFilter.GaussianBlur(90))
    return Image.composite(img, overlay, ImageOps.invert(mask))


def gold_letter(bg: Image.Image, letter: str, fill=(232, 200, 90), stroke=(60, 40, 10)) -> Image.Image:
    img = bg.copy()
    d = ImageDraw.Draw(img)
    # ornate corners
    m = 28
    for x0, y0, x1, y1 in [(m, m, 90, 90), (SIZE - 90, m, SIZE - m, 90), (m, SIZE - 90, 90, SIZE - m), (SIZE - 90, SIZE - 90, SIZE - m, SIZE - m)]:
        d.rounded_rectangle((x0, y0, x1, y1), radius=8, outline=fill, width=3)
    bbox = d.textbbox((0, 0), letter, font=SERIF)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    xy = ((SIZE - tw) / 2 - bbox[0], (SIZE - th) / 2 - bbox[1] - 12)
    d.text(xy, letter, font=SERIF, fill=stroke, stroke_width=10, stroke_fill=stroke)
    d.text(xy, letter, font=SERIF, fill=fill, stroke_width=2, stroke_fill=(255, 236, 170))
    return img


def save(img: Image.Image, name: str) -> None:
    path = OUT / name
    img.convert("RGB").save(path, "JPEG", quality=88, optimize=True)
    print("wrote", path.name)


def royals():
    palettes = {
        "lucky": ((18, 48, 22), (6, 18, 8), (210, 232, 106)),
        "wolf": ((140, 96, 42), (72, 38, 14), (255, 214, 96)),
        "fish": ((12, 48, 72), (4, 16, 28), (122, 224, 210)),
        "wege": ((36, 72, 40), (10, 24, 12), (196, 168, 72)),
    }
    for prefix, (c0, c1, ink) in palettes.items():
        base = vignette(grad(c0, c1))
        for L in "JQKA":
            save(gold_letter(base, L, fill=ink, stroke=(20, 14, 6)), f"{prefix}-{L.lower()}.jpg")


def wolf_moon():
    bg = vignette(grad((24, 48, 72), (120, 72, 24)))
    d = ImageDraw.Draw(bg)
    d.ellipse((118, 90, 394, 366), fill=(255, 214, 96))
    d.ellipse((168, 108, 392, 332), fill=(24, 48, 72))
    # mesa
    d.polygon([(40, 460), (140, 320), (220, 360), (310, 280), (400, 340), (480, 460)], fill=(92, 52, 22))
    save(bg, "wolf-moon.jpg")


def gem_cut(color, name, shape="hex"):
    bg = Image.new("RGB", (SIZE, SIZE), (8, 8, 10))
    d = ImageDraw.Draw(bg)
    cx, cy, r = SIZE // 2, SIZE // 2, 188
    hi = tuple(min(255, int(c * 1.45 + 40)) for c in color)
    lo = tuple(max(0, int(c * 0.35)) for c in color)
    if shape == "circle":
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=color)
        d.ellipse((cx - r + 28, cy - r + 18, cx + r - 70, cy + r - 80), fill=hi)
    elif shape == "diamond":
        pts = [(cx, cy - r), (cx + r, cy), (cx, cy + r), (cx - r, cy)]
        d.polygon(pts, fill=color)
        d.polygon([(cx, cy - r), (cx + r * 0.35, cy - 20), (cx, cy + 20), (cx - r * 0.2, cy - 10)], fill=hi)
    elif shape == "sq":
        d.rounded_rectangle((cx - r, cy - r, cx + r, cy + r), radius=36, fill=color)
        d.rounded_rectangle((cx - r + 30, cy - r + 22, cx + 40, cy + 20), radius=18, fill=hi)
    else:  # hex
        pts = [
            (cx, cy - r),
            (cx + int(r * 0.86), cy - r // 2),
            (cx + int(r * 0.86), cy + r // 2),
            (cx, cy + r),
            (cx - int(r * 0.86), cy + r // 2),
            (cx - int(r * 0.86), cy - r // 2),
        ]
        d.polygon(pts, fill=color)
        d.polygon([pts[0], pts[1], (cx, cy)], fill=hi)
        d.polygon([pts[0], pts[5], (cx, cy)], fill=lo)
    save(vignette(bg, 0.25), name)


def burst_gems():
    gem_cut((46, 110, 210), "burst-blue.jpg", "circle")
    gem_cut((36, 170, 90), "burst-green.jpg", "hex")
    gem_cut((230, 180, 40), "burst-yellow.jpg", "sq")
    gem_cut((150, 70, 210), "burst-purple.jpg", "diamond")
    gem_cut((210, 48, 64), "burst-red.jpg", "circle")
    # crown
    bg = Image.new("RGB", (SIZE, SIZE), (16, 8, 28))
    d = ImageDraw.Draw(bg)
    d.polygon([(90, 330), (110, 160), (190, 250), (256, 110), (322, 250), (402, 160), (422, 330)], fill=(232, 196, 80))
    d.rectangle((90, 330, 422, 390), fill=(196, 150, 48))
    d.ellipse((226, 86, 286, 146), fill=(255, 80, 120))
    save(vignette(bg, 0.3), "burst-crown.jpg")


def jewel_gems():
    gem_cut((150, 70, 200), "jewel-amethyst.jpg", "circle")
    gem_cut((30, 160, 90), "jewel-emerald.jpg", "circle")
    gem_cut((40, 90, 200), "jewel-sapphire.jpg", "circle")
    gem_cut((200, 36, 48), "jewel-ruby.jpg", "circle")
    gem_cut((220, 230, 235), "jewel-diamond.jpg", "diamond")


def recolor_onto(src: Path, name: str, bg, enhance_color=1.15, enhance_bright=1.02, frame=None):
    base = grad(bg[0], bg[1]) if isinstance(bg, tuple) and isinstance(bg[0], tuple) else Image.new("RGB", (SIZE, SIZE), bg)
    face = Image.open(src).convert("RGB").resize((SIZE, SIZE), Image.Resampling.LANCZOS)
    face = ImageEnhance.Color(face).enhance(enhance_color)
    face = ImageEnhance.Brightness(face).enhance(enhance_bright)
    # keep subject via slightly shrunken paste
    pad = 18
    inner = face.resize((SIZE - pad * 2, SIZE - pad * 2), Image.Resampling.LANCZOS)
    base.paste(inner, (pad, pad))
    if frame:
        d = ImageDraw.Draw(base)
        d.rounded_rectangle((10, 10, SIZE - 11, SIZE - 11), radius=18, outline=frame, width=8)
    save(base, name)


def fruit_sets():
    mapping_always = {
        "cherry": "sizzle-cherry.jpg",
        "lemon": "sizzle-lemon.jpg",
        "plum": "sizzle-plum.jpg",
        "orange": "sizzle-orange.jpg",
        "bell": "sizzle-bell.jpg",
        "grapes": "blaze-grapes.jpg",
    }
    for k, src in mapping_always.items():
        recolor_onto(SYM / src, f"always-{k}.jpg", ((246, 236, 210), (196, 168, 110)), 1.1, 1.08, (196, 150, 48))
    # star
    bg = vignette(grad((246, 236, 210), (196, 168, 110)))
    d = ImageDraw.Draw(bg)
    import math

    pts = []
    for i in range(10):
        ang = -math.pi / 2 + i * math.pi / 5
        r = 190 if i % 2 == 0 else 78
        pts.append((256 + r * math.cos(ang), 256 + r * math.sin(ang)))
    d.polygon(pts, fill=(210, 36, 40))
    d.polygon(pts, outline=(196, 150, 48), width=6)
    save(bg, "always-star.jpg")

    mapping_multi = {
        "cherry": "blaze-cherry.jpg",
        "lemon": "blaze-lemon.jpg",
        "plum": "blaze-plum.jpg",
        "bell": "chance-bell.jpg",
        "grapes": "blaze-grapes.jpg",
        "star": "blaze-star.jpg",
    }
    for k, src in mapping_multi.items():
        recolor_onto(SYM / src, f"multi-{k}.jpg", ((48, 8, 10), (16, 4, 6)), 1.25, 0.95, (196, 40, 40))
    # wild stacked
    bg = vignette(grad((80, 12, 16), (20, 4, 6)))
    d = ImageDraw.Draw(bg)
    d.rounded_rectangle((70, 70, 442, 442), radius=24, fill=(196, 40, 40), outline=(255, 214, 96), width=8)
    bbox = d.textbbox((0, 0), "WILD", font=SERIF_SM)
    tw = bbox[2] - bbox[0]
    d.text(((SIZE - tw) / 2, 210), "WILD", font=SERIF_SM, fill=(255, 236, 170))
    save(bg, "multi-wild.jpg")


def wege_high():
    # celtic bronze mask-like gem and crown on moss
    gem_cut((48, 140, 72), "wege-gem.jpg", "hex")
    bg = vignette(grad((36, 72, 40), (10, 24, 12)))
    d = ImageDraw.Draw(bg)
    d.polygon([(100, 340), (120, 170), (200, 250), (256, 120), (312, 250), (392, 170), (412, 340)], fill=(196, 168, 72))
    d.rectangle((100, 340, 412, 400), fill=(150, 120, 40))
    save(bg, "wege-crown.jpg")


def cabinets():
    def grade(src: Path, name: str, color=1.2, bright=0.9, contrast=1.15, hue=None):
        im = Image.open(src).convert("RGB")
        im = ImageEnhance.Color(im).enhance(color)
        im = ImageEnhance.Brightness(im).enhance(bright)
        im = ImageEnhance.Contrast(im).enhance(contrast)
        if hue == "cream":
            overlay = Image.new("RGB", im.size, (246, 220, 160))
            im = Image.blend(im, overlay, 0.22)
        if hue == "black":
            overlay = Image.new("RGB", im.size, (10, 8, 16))
            im = Image.blend(im, overlay, 0.35)
        im.save(ROOT / name, "JPEG", quality=88, optimize=True)
        print("wrote", name)

    grade(ROOT / "heisse-fruechte.jpg", "immer-heiss.jpg", 1.15, 1.05, 1.1, "cream")
    grade(ROOT / "saphirnacht.jpg", "nur-juwelen.jpg", 1.3, 0.82, 1.2, "black")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    royals()
    wolf_moon()
    burst_gems()
    jewel_gems()
    fruit_sets()
    wege_high()
    cabinets()
    print("done")


if __name__ == "__main__":
    main()
