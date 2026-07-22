#!/usr/bin/env python3
"""Dependency-free checks for the static site."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
EXCLUDED = {".git", "_site"}


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: list[str] = []
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"])
        attribute = "href" if tag in {"a", "link"} else "src" if tag in {"img", "script"} else None
        if attribute and values.get(attribute):
            self.links.append(values[attribute])


def html_pages() -> list[Path]:
    return [
        path for path in ROOT.rglob("*.html")
        if not any(part in EXCLUDED for part in path.relative_to(ROOT).parts)
    ]


def resolve_target(page: Path, link: str) -> tuple[Path, str]:
    parsed = urlsplit(link)
    path = unquote(parsed.path)
    if path.startswith("/"):
        target = ROOT / path.lstrip("/")
    elif path:
        target = page.parent / path
    else:
        target = page
    if target.is_dir():
        target /= "index.html"
    return target.resolve(), parsed.fragment


def main() -> None:
    pages = html_pages()
    errors: list[str] = []
    parsed_pages: dict[Path, PageParser] = {}

    for page in pages:
        source = page.read_text(encoding="utf-8")
        parser = PageParser()
        parser.feed(source)
        parser.close()
        parsed_pages[page.resolve()] = parser
        if "{{" in source or "{%" in source:
            errors.append(f"{page.relative_to(ROOT)}: contains an unrendered template expression")

    for page, parser in parsed_pages.items():
        for link in parser.links:
            parsed = urlsplit(link)
            if parsed.scheme or parsed.netloc or link.startswith(("mailto:", "tel:", "data:")):
                continue
            target, fragment = resolve_target(page, link)
            if not target.exists():
                errors.append(f"{page.relative_to(ROOT)}: missing local target {link}")
                continue
            if fragment and target.suffix == ".html":
                target_parser = parsed_pages.get(target)
                if target_parser and fragment not in target_parser.ids:
                    errors.append(f"{page.relative_to(ROOT)}: missing anchor {link}")

    if errors:
        raise SystemExit("\n".join(errors))
    print(f"Checked {len(pages)} HTML pages and their local links.")


if __name__ == "__main__":
    main()
