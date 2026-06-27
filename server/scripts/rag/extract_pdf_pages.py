import argparse
import json
import os
import sys


def classify_page(text, image_count):
    word_count = len((text or "").split())
    replacement_count = (text or "").count("\ufffd")
    has_unicode_noise = replacement_count > 5

    if word_count < 40 or has_unicode_noise:
        return "needs_ocr"

    if image_count > 0 and word_count < 80:
        return "needs_ocr"

    return "text_ok"


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--pdf", required=True)
    parser.add_argument("--render-dir", default="")
    parser.add_argument("--render-ocr", action="store_true")
    args = parser.parse_args()

    try:
        import fitz  # PyMuPDF
    except Exception as exc:
        print(json.dumps({
            "ok": False,
            "error": f"PyMuPDF is not installed or failed to import: {exc}",
            "pages": []
        }, ensure_ascii=False))
        return 0

    doc = fitz.open(args.pdf)
    pages = []

    if args.render_ocr and args.render_dir:
        os.makedirs(args.render_dir, exist_ok=True)

    for index, page in enumerate(doc, start=1):
        text = page.get_text("text") or ""
        image_count = len(page.get_images(full=True))
        status = classify_page(text, image_count)
        image_path = ""

        if status == "needs_ocr" and args.render_ocr and args.render_dir:
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
            image_path = os.path.join(args.render_dir, f"page-{index}.png")
            pix.save(image_path)

        pages.append({
            "page": index,
            "text": text,
            "textLength": len(text),
            "wordCount": len(text.split()),
            "imageCount": image_count,
            "status": status,
            "imagePath": image_path
        })

    print(json.dumps({
        "ok": True,
        "pageCount": len(doc),
        "pages": pages
    }, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
