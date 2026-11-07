# Archive redesign: pass 1 audit and pass 2 implementation

## Scope and preservation
The initial audit used the complete repository tree at commit `19476a68e501e064a3e56f97d18316edc28cbdb1`. The archive contains **41 files**: 31 under `RTI Archive/` and 10 under `Public Accountability Archive/`. It includes 35 PDFs and 6 non-PDF files (3 DOC, 1 XLS; counts checked against the indexed file list). No source archive file was moved, renamed, replaced, or edited. This work adds a static metadata-driven browsing page and index. The existing homepage and legacy archive links are intentionally left unchanged to preserve the personal site and existing URLs.

This repository is already a fork of `jadab123/jadab123.github.io`; a second fork was not created. Work was made on `copilot/archive-repository-redesign`.

## Pass 1 — inventory and information-architecture proposal

### Inventory

RTI Archive (31 files)

- BAR COUNCIL OF INDIA 5 Pages.pdf
- BCI AA_REMINDER.pdf
- BCI EQ REGARDING MSC PHD.doc
- BCI REPLY FOR EQ.pdf
- BCI RTI APPLICATION REGARDING EQ FOR TEACHING LAW SUBJECTS.pdf
- BCI TIME TABLE.doc
- BCI_20.04.2011.pdf
- BCI_CHAIRMAN_WITHOUT LLB.doc
- BCI_CHAIRMAN_WITHOUT LLB.pdf
- BCI_RGS_PM_TKB_AC.pdf
- Bangalore University LL.B. Result.pdf
- CIC APPEAL 15.08.2023 ALL DOCUMENTS.pdf
- CVO.pdf
- File 4_BAR COUNCIL OF INDIA RULES.pdf
- File Misplaced Requesting File Inspection.PDF
- Harassment of employee Meno CAF 6-12  197 dated 19th October 2023.pdf
- INDIAN_MARITIME_UNIVERSITY_REPLY.pdf
- JKP_SHAILESH_ADVICE.pdf
- Letter to PTVO to CVO MoSPI .pdf
- Matriculation BU_DOCUMENT.pdf
- NLSIU Bangalore RTI_0001.pdf
- Presidency University Interview and RTI Version 2.0 (1).pdf
- RTI REPLY CPIO 04.08.2022 PTVO.pdf
- RTI_APPEAL_BURDWAN_UNIV_20.12.pdf
- Ref No JKP_AA_RG2009_06_03.02.2009.pdf
- Request to take  action against PTVO.pdf
- Requesting status and copy of complaints.pdf
- Smt. Prativa Patil_0001.pdf
- Yahoo Mail - Fw Request to inform status of my all vigilance cases.pdf
- Yahoo Mail - Inactive ID Notification.pdf
- Yahoo Mail - NOC received with objection.pdf

Public Accountability Archive (10 files)

- APAR_DR. JADAB KR. PAL 2023-24.pdf
- CIC OK-29092008-16_JAGEEVAN.pdf
- JKP_PIO_HONORARIUM.pdf
- JKP_PIO_WEEK.doc
- JKP_PIO_WEEK.pdf
- Lok sabha Parliamentary Committee Reply_0001.pdf
- MHRD RTI 1.pdf
- PGDBA Honourarium.xls
- Parliamentary Committee on SC ST and Mr. Naskar Reply_0001.pdf
- Reminder for APAR.pdf

### Audit observations

- There are paired similar-basename files in both archives: `BCI_CHAIRMAN_WITHOUT LLB.doc` and `.pdf`; and `JKP_PIO_WEEK.doc` and `.pdf`. The tree inventory cannot establish whether these are duplicates or different versions; compare hashes/content before describing them as duplicates.
- The 2023 CIC appeal is explicitly titled as a combined “ALL DOCUMENTS” file. BCI equivalence/teaching-law filenames suggest a possible case relationship, but chronology and relationships need document-level confirmation. Case grouping in the JSON is provisional.
- Filenames signal personal/employment/vigilance material, including an APAR, correspondence and honorarium/service records. Verify publication authorization and redact only via separately approved derivatives; never change source files. This index does not extract document text or expose text snippets.
- Metadata dates are only populated where the filename gives a clear date: 3 February 2009, 20 April 2011, 4 August 2022, 15 August 2023, 19 October 2023. The APAR cycle year is stored as 2024 for filtering but is not presented as a verified document date.
- No server-side checks or PDF parsing were performed. Link availability, duplicate content, and internal document dates still require local/browser verification.
- One homepage RTI link appears inconsistent with the repository filename: homepage markup uses `BCI RTI APPLICATION REGARDING EQ FOR TEACHING LAW SUBJECTS.pdf`, but the actual file is named `BCI RTI APPLICATION REGARDING EQ FOR TEACHING LAW SUBJECTS.pdf`? Verify exact case/spacing against the real URL before changing the old link; the index uses the exact repository tree path. GitHub Pages is case-sensitive.

### Proposed classification and location mapping

Do not move archive files during the initial rollout. Keep the existing two folders and classify through `archives/documents.json`.

- BCI items: proposed “RTI application”, “CPIO reply”, “First Appellate Authority reminder”, or “supporting record”; likely BCI teaching-equivalence case where filenames support it; verify all associations.
- CIC appeal all-documents PDF: proposed “Second appeal before CIC”; single combined record, dated 15 August 2023 by filename.
- University/Bar Council files: suggested RTI replies, applications, or supporting records based on filename and current homepage label; verify exact document types.
- Vigilance/PTVO/CVO/email records: proposed “Vigilance-related correspondence”; review sensitivity and do not infer a shared case.
- Public Accountability APAR and reminder: proposed “APAR records” and “Administrative representations / follow-up”; APAR requires explicit approval for public listing.
- Parliamentary Committee and MHRD records: proposed “Official replies and decisions”; verify type and any relationship.
- PIO-week, honorarium, and PGDBA spreadsheet: proposed administrative/service records; review contents and publication suitability.

## Pass 2 — static prototype/implementation

Added `archives.html`, `archives/documents.json`, `archives/archive.js`, `archives/archive.css`, `archives/README.md`, and `scripts/draft-archive-index.py`. The standalone page provides archive tabs, text search, archive/category/year/file-type filters, sorting, provisional case grouping, accurate index-derived counts, accessible result announcements, PDF preview, view/download actions, and review flags. It uses no backend, paid service, or external runtime dependency. Open `archives.html` under GitHub Pages (or a local static server); `file://` can block the JSON fetch.

The existing homepage was not edited in this two-pass delivery to protect its long document and preserve legacy links. For integration, add a navigation link to `archives.html` and replace the old archive sections only after verifying the rendered new page. This design decision means the new browser is not yet linked from the current homepage.

## Maintenance

1. Upload an approved record to the appropriate existing archive directory; do not overwrite or rename an existing file.
2. Run `python3 scripts/draft-archive-index.py` from the repository root. It creates `archives/index-drafts.json` with entries for files missing from the central index. Draft entries intentionally have no category/date/case assignment and are not displayed.
3. Review the draft, confirm public-access approval, verify category/date/reference/case against the document, then move approved metadata into `archives/documents.json` and set `review_required` to `false` only after review.
4. Check for broken links and verify mobile/desktop rendering before publishing.

## Verification status / remaining checks

- Inventory counts: checked against the complete recursive repository tree (31 RTI + 10 public accountability = 41).
- Source preservation: no archive source files were included in the write set.
- Link path construction: JavaScript URL-encodes each path component for the spaces and punctuation in existing names; browser-level HTTP checks were not run in this environment.
- Automated UI/HTML tests and mobile browser testing: not run. Review on GitHub Pages before replacing legacy links.
- Case relationships, exact metadata, duplicate content, sensitivity, and authorization: manual review required; all entries are marked `review_required: true`.
