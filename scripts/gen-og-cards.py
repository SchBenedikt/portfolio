#!/usr/bin/env python3
"""Generate branded Open Graph / social preview cards for the portfolio.

Reads content from src/lib/{projects,blog,organizations}.ts and renders one
1200x630 PNG per page into public/og/. Pure Pillow, no external deps.

Run: python3 scripts/gen-og-cards.py
"""
import os
import re
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "og")

# --- brand palette -----------------------------------------------------------
FOREST = (37, 59, 48)       # #253b30
FOREST_DARK = (26, 40, 33)  # #1a2821
MINT = (185, 203, 163)      # #b9cba3
PAPER = (248, 248, 243)     # #f8f8f3
INK = (34, 40, 32)          # #222820

W = 1200
H = 630

FONT_DIR = "/usr/share/fonts/truetype/dejavu"
SERIF_BOLD = os.path.join(FONT_DIR, "DejaVuSerif-Bold.ttf")
SANS_BOLD = os.path.join(FONT_DIR, "DejaVuSans-Bold.ttf")
SANS = os.path.join(FONT_DIR, "DejaVuSans.ttf")
MONO = os.path.join(FONT_DIR, "DejaVuSansMono.ttf")

WAPPEN = os.path.join(ROOT, "public", "schaechner-wappen-transparent.jpg")


def font(path, size):
    return ImageFont.truetype(path, size)


def wrap(draw, text, fnt, max_width):
    """Wrap text to fit max_width, returns list of lines."""
    words = text.split()
    if not words:
        return [""]
    lines = []
    cur = ""
    for word in words:
        trial = (cur + " " + word).strip()
        if draw.textlength(trial, font=fnt) <= max_width:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def base_canvas():
    """Gradient background with subtle mint beam + frame."""
    img = Image.new("RGB", (W, H))
    px = img.load()
    for y in range(H):
        t = y / (H - 1)
        r = round(FOREST[0] + (FOREST_DARK[0] - FOREST[0]) * t)
        g = round(FOREST[1] + (FOREST_DARK[1] - FOREST[1]) * t)
        b = round(FOREST[2] + (FOREST_DARK[2] - FOREST[2]) * t)
        for x in range(W):
            px[x, y] = (r, g, b)
    # soft mint diagonal beam, bottom-right corner
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for i in range(90):
        alpha = int(28 * (1 - abs(i - 45) / 45))
        x0 = W - 400 - i
        y0 = H - 100 - i * 4
        od.line([(x0, y0), (x0 + 760, y0 - 240)], fill=MINT + (alpha,), width=3)
    img = Image.alpha_composite(img.convert("RGBA"), overlay)
    # wappen, right side, subtle
    if os.path.exists(WAPPEN):
        wappen = Image.open(WAPPEN).convert("RGBA")
        scale = 0.9
        ww = int(wappen.width * scale)
        wh = int(wappen.height * scale)
        wappen = wappen.resize((ww, wh), Image.LANCZOS)
        alpha = wappen.getchannel("A").point(lambda a: int(a * 0.22))
        wappen.putalpha(alpha)
        img.alpha_composite(wappen, (W - ww + 120, (H - wh) // 2))
    # thin inner frame
    frame = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(frame).rectangle(
        [34, 34, W - 34, H - 34], outline=MINT + (90,), width=2
    )
    img = Image.alpha_composite(img, frame)
    return img


def render_card(eyebrow, title, sub, url_line="benedikt.schächner.de", filename="og-default.jpg"):
    img = base_canvas()
    d = ImageDraw.Draw(img)
    x = 96
    y = 96
    max_text = 660

    # eyebrow
    d.text((x, y), eyebrow, font=font(SANS_BOLD, 26), fill=MINT)
    y += 54

    # title (wrapped, serif bold)
    title_size = 88 if len(title) <= 20 else (64 if len(title) <= 40 else 48)
    f = font(SERIF_BOLD, title_size)
    lines = wrap(d, title, f, max_text)[:3]
    line_h = int(title_size * 1.16)
    for ln in lines:
        d.text((x, y), ln, font=f, fill=PAPER)
        y += line_h
    y += 18

    # mint rule
    d.rectangle([x, y, x + 120, y + 4], fill=MINT)
    y += 34

    # sub line(s)
    if sub:
        sf = font(SANS, 30)
        slines = wrap(d, sub, sf, max_text)[:2]
        for ln in slines:
            d.text((x, y), ln, font=sf, fill=(222, 226, 214))
            y += 42

    # url line, bottom left
    d.text((96, H - 96), url_line, font=font(MONO, 24), fill=MINT)

    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, filename)
    # JPEG keeps the repo light (OG images are ~70-100 KB instead of ~450 KB)
    img.convert("RGB").save(path, "JPEG", quality=90, optimize=True)
    print(f"wrote {os.path.relpath(path, ROOT)} ({title!r})")


# --- parse content from the TS data files ------------------------------------
def parse_entries(path, fields):
    """Extract dicts with the given fields from a simple TS object array."""
    with open(os.path.join(ROOT, path), encoding="utf-8") as fh:
        src = fh.read()
    # strip nested `details: { ... }` objects and long template bodies so the
    # flat-entry regex below can match each entry block
    src = re.sub(r"details:\s*\{[^{}]*\}", "", src)
    src = re.sub(r"longDescription:\s*`[^`]*`", "", src)
    entries = []
    for m in re.finditer(r"\{\s*([^{}]*?)\s*\}", src):
        block = m.group(1)
        if "slug:" not in block:
            continue
        entry = {}
        for f in fields:
            fm = re.search(rf"{f}:\s*['\"]([^'\"]*)['\"]", block)
            if fm:
                entry[f] = fm.group(1)
        if "slug" in entry:
            entries.append(entry)
    return entries


def gen_default():
    render_card(
        "PORTFOLIO · BENEDIKT SCHÄCHNER",
        "Benedikt Schächner.",
        "Webentwicklung · Crossmedia · Künstliche Intelligenz — Einiges davon ist hier zu sehen.",
        filename="og-default.jpg",
    )


def gen_blog():
    posts = parse_entries("src/lib/blog.ts", ["title", "slug", "category", "date", "description"])
    for p in posts:
        date = p.get("date", "").replace("-", ".")
        render_card(
            f"BLOG · {p.get('category', 'ARTIKEL').upper()}",
            p["title"],
            p.get("description", ""),
            f"benedikt.schächner.de · {date}",
            filename=f"blog-{p['slug']}.jpg",
        )


def gen_projects():
    projects = parse_entries(
        "src/lib/projects.ts", ["title", "slug", "category", "date", "description"]
    )
    for p in projects:
        date = p.get("date", "").replace("-", ".")
        render_card(
            f"PROJEKT · {p.get('category', '').upper()}",
            p["title"],
            p.get("description", ""),
            f"benedikt.schächner.de · {date}",
            filename=f"project-{p['slug']}.jpg",
        )


def gen_organizations():
    orgs = parse_entries("src/lib/organizations.ts", ["slug", "name"])
    for o in orgs:
        render_card(
            "ORGANISATION",
            o["name"],
            "Artikel & Projekte im Zusammenhang mit dieser Organisation.",
            filename=f"organization-{o['slug']}.jpg",
        )


if __name__ == "__main__":
    gen_default()
    gen_blog()
    gen_projects()
    gen_organizations()
    print(f"done -> {OUT}")