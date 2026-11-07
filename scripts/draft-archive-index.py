#!/usr/bin/env python3
"""Create unclassified draft metadata for new archive files.

Run from the repository root: python3 scripts/draft-archive-index.py
The script never changes documents.json or source files. Review each draft and
copy verified entries into the central index manually.
"""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "archives" / "documents.json"
OUTPUT = ROOT / "archives" / "index-drafts.json"
ARCHIVES = ("RTI Archive", "Public Accountability Archive")
SUPPORTED = {".pdf", ".doc", ".docx", ".xls", ".xlsx", ".odt", ".ods"}


def main():
    indexed = json.loads(INDEX.read_text(encoding="utf-8"))
    indexed_paths = {record["filepath"] for record in indexed}
    drafts = []
    for archive in ARCHIVES:
        folder = ROOT / archive
        if not folder.exists():
            continue
        for path in sorted(folder.rglob("*")):
            if not path.is_file() or path.suffix.lower() not in SUPPORTED:
                continue
            relative = path.relative_to(ROOT).as_posix()
            if relative in indexed_paths:
                continue
            drafts.append({
                "id": "draft-" + str(len(drafts) + 1).zfill(4),
                "title": path.stem.replace("_", " "),
                "filename": path.name,
                "filepath": relative,
                "archive": archive,
                "category": "Needs manual classification",
                "case_id": None,
                "date": None,
                "year": None,
                "document_type": path.suffix.lstrip(".").upper(),
                "description": "Draft only. Verify metadata, public-access approval, and sensitivity before indexing.",
                "reference_number": None,
                "review_required": True
            })
    OUTPUT.write_text(json.dumps(drafts, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(drafts)} unclassified draft record(s) to {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
