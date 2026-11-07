#!/usr/bin/env python3
"""
Archive Maintenance & Verification Script for jadab123.github.io
Scans 'RTI Archive' and 'Public Accountability Archive' for new or missing files.
Usage:
  python3 scan_archives.py           # Audit and preview new entries
  python3 scan_archives.py --append  # Append draft entries to documents.json for manual review
"""

import json
import os
import sys
from pathlib import Path

ARCHIVE_DIRS = ["RTI Archive", "Public Accountability Archive"]
INDEX_FILE = Path("documents.json")


def main():
    if not INDEX_FILE.exists():
        print(f"Error: {INDEX_FILE} not found in current directory.")
        sys.exit(1)

    with INDEX_FILE.open("r", encoding="utf-8") as f:
        data = json.load(f)

    indexed_paths = {doc["filepath"]: doc for doc in data.get("documents", [])}

    # 1. Check for broken links in documents.json
    missing_on_disk = []
    for filepath, doc in indexed_paths.items():
        if not Path(filepath).exists():
            missing_on_disk.append((doc["id"], filepath))

    # 2. Scan archive directories for unindexed files
    unindexed_files = []
    for folder in ARCHIVE_DIRS:
        folder_path = Path(folder)
        if not folder_path.is_dir():
            continue
        for file_path in sorted(folder_path.iterdir()):
            if file_path.is_file() and not file_path.name.startswith("."):
                rel_path = f"{folder}/{file_path.name}"
                if rel_path not in indexed_paths:
                    unindexed_files.append((folder, file_path.name, rel_path))

    print("=== REPOSITORY ARCHIVE AUDIT ===")
    print(f"Total indexed documents : {len(indexed_paths)}")
    print(f"Total indexed cases     : {len(data.get('cases', []))}")
    print(f"Missing files on disk   : {len(missing_on_disk)}")
    print(f"New unindexed files     : {len(unindexed_files)}")

    if missing_on_disk:
        print("\n[!] BROKEN FILEPATHS IN documents.json:")
        for doc_id, path in missing_on_disk:
            print(f"  - {doc_id}: {path}")

    if not unindexed_files:
        print("\nAll files in archive folders are accounted for in documents.json.")
        return

    print("\n[+] NEW UNINDEXED FILES DETECTED:")
    new_entries = []
    next_num = len(indexed_paths) + 1

    for folder, filename, rel_path in unindexed_files:
        prefix = "RTI" if folder == "RTI Archive" else "PA"
        ext = Path(filename).suffix.lstrip(".").upper() or "FILE"
        stem = Path(filename).stem.replace("_", " ")

        draft = {
            "id": f"{prefix}-{next_num:03d}",
            "title": f"[VERIFY TITLE] {stem}",
            "filename": filename,
            "filepath": rel_path,
            "archive": folder,
            "category": "Pending Classification",
            "case_id": "UNASSIGNED",
            "date": "",
            "display_date": "Date Pending Verification",
            "year": "Pending",
            "document_type": ext,
            "reference_number": "",
            "description": "Newly detected file pending manual metadata verification.",
            "published": False,
            "review_required": True
        }
        new_entries.append(draft)
        next_num += 1
        print(f"  - {rel_path}")

    if "--append" in sys.argv:
        data["documents"].extend(new_entries)
        with INDEX_FILE.open("w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"\nAppended {len(new_entries)} draft entry/entries to {INDEX_FILE} (marked 'published': false).")
    else:
        print("\nRun `python3 scan_archives.py --append` to add these draft entries to documents.json.")


if __name__ == "__main__":
    main()


