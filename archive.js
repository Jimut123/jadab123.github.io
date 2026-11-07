/**
 * Digital Document Repository Engine for jadab123.github.io
 * Works both on GitHub Pages (https://) and local file system (file://)
 */

(function () {
  "use strict";

  const ARCHIVE_CONFIG = {
    "RTI Archive": {
      mountId: "rti-archive-mount",
      badge: "RTI Repository",
      subtitle: "Statutory applications, CPIO replies, First Appeals, CIC Second Appeals, and vigilance correspondence",
      suggestedCategories: [
        "RTI Applications",
        "CPIO Replies",
        "First Appeals",
        "First Appellate Authority Orders",
        "Second Appeals before CIC",
        "CIC Orders and Decisions",
        "Vigilance-related Correspondence",
        "Follow-up Letters and Reminders"
      ]
    },
    "Public Accountability Archive": {
      mountId: "pa-archive-mount",
      badge: "Public Accountability Repository",
      subtitle: "Parliamentary committee replies, Ministry Office Memoranda, APAR records, and institutional service records",
      suggestedCategories: [
        "APAR Records",
        "Administrative Representations",
        "Official Correspondence",
        "Service-related Documents",
        "Administrative Decisions",
        "Replies and Clarifications",
        "Other Relevant Records"
      ]
    }
  };

  // Built-in fallback so opening index.html via file:// works without a local server
  const FALLBACK_REPOSITORY_DATA = {
    cases: [
      {
        case_id: "CASE-RTI-01",
        archive: "RTI Archive",
        title: "CIC Second Appeal & Administrative Grievance Records (2023)",
        reference_number: "CIC/MOSPI/A/2023 · Memo CAF 6-12/197",
        year: "2023",
        category: "Second Appeals before CIC",
        description: "Comprehensive dossier of the Second Appeal filed before the Central Information Commission (15 August 2023), requests for file inspection regarding misplaced files, and administrative memorandum dated 19 October 2023."
      },
      {
        case_id: "CASE-RTI-02",
        archive: "RTI Archive",
        title: "Vigilance, CVO & Part-Time Vigilance Officer (PTVO) Correspondence",
        reference_number: "CPIO/PTVO/04.08.2022 · MoSPI Vigilance",
        year: "2022–2023",
        category: "Vigilance-related Correspondence",
        description: "Official correspondence with the Chief Vigilance Officer (CVO), Ministry of Statistics and Programme Implementation (MoSPI), RTI replies from CPIO regarding PTVO, status inquiries on vigilance cases, and representation to the Visitor."
      },
      {
        case_id: "CASE-RTI-03",
        archive: "RTI Archive",
        title: "Institutional Service Communications, NOC & Official ID Records",
        reference_number: "ISI-ADMIN-NOC-ID",
        year: "2022–2023",
        category: "Follow-up Letters and Reminders",
        description: "Official email communications and records regarding No Objection Certificate (NOC) issuance with objections and official email/ID status notifications."
      },
      {
        case_id: "CASE-RTI-04",
        archive: "RTI Archive",
        title: "Bar Council of India (BCI) — Essential Qualifications (EQ) for Teaching Law",
        reference_number: "BCI/RTI/EQ/2011",
        year: "2011",
        category: "RTI Applications",
        description: "RTI applications, Bar Council of India rules, CPIO replies, First Appellate Authority reminders, and schedules concerning Essential Qualifications (EQ) and teaching law subjects without an LL.B. degree."
      },
      {
        case_id: "CASE-RTI-05",
        archive: "RTI Archive",
        title: "University of Burdwan — RTI Appeal & Matriculation Verification Records",
        reference_number: "BU/RTI/20.12",
        year: "2011–2012",
        category: "First Appeals",
        description: "First Appeal filed before the Appellate Authority at the University of Burdwan and corresponding CPIO reply providing matriculation documentary records."
      },
      {
        case_id: "CASE-RTI-06",
        archive: "RTI Archive",
        title: "Legal Education Records — NLSIU Bangalore & Bangalore University",
        reference_number: "NLSIU/RTI/0001 · BU-LLB",
        year: "2011",
        category: "CPIO Replies",
        description: "RTI reply from the National Law School of India University (NLSIU), Bengaluru, and LL.B. examination result records from Bangalore University."
      },
      {
        case_id: "CASE-RTI-07",
        archive: "RTI Archive",
        title: "Presidency University Selection Process & RTI Documentation",
        reference_number: "PU/RTI/V2.0",
        year: "2015",
        category: "RTI Applications",
        description: "Consolidated RTI application and interview documentation relating to administrative selection processes at Presidency University, Kolkata."
      },
      {
        case_id: "CASE-RTI-08",
        archive: "RTI Archive",
        title: "Appellate Orders, Indian Maritime University Reply & RTI Advisory Records",
        reference_number: "JKP/AA/RG2009/06 · IMU-RTI",
        year: "2009–2012",
        category: "First Appellate Authority Orders",
        description: "First Appellate Authority decision dated 03.02.2009, RTI reply from Indian Maritime University, and RTI procedural advisory notes."
      },
      {
        case_id: "CASE-PA-01",
        archive: "Public Accountability Archive",
        title: "Parliamentary Committees & Ministry of HRD Accountability Records",
        reference_number: "LOK-SABHA-0001 · MHRD-OM",
        year: "2014–2016",
        category: "Official Correspondence",
        description: "Official replies submitted to the Lok Sabha Parliamentary Committee, the Parliamentary Committee on Welfare of Scheduled Castes and Scheduled Tribes, and Office Memoranda issued by the Ministry of Human Resource Development (MHRD)."
      },
      {
        case_id: "CASE-PA-02",
        archive: "Public Accountability Archive",
        title: "Annual Performance Appraisal Report (APAR) Records (2023–24)",
        reference_number: "ISI/APAR/2023-24",
        year: "2023–2024",
        category: "APAR Records",
        description: "Official Annual Performance Appraisal Report (APAR) of Dr. Jadab Kumar Pal for the reporting period 2023–24 and prior official reminders for APAR completion."
      },
      {
        case_id: "CASE-PA-03",
        archive: "Public Accountability Archive",
        title: "PIO Administration, PGDBA Honorarium & Service Records",
        reference_number: "JKP/PIO/HON · PGDBA",
        year: "2008–2015",
        category: "Service-related Documents",
        description: "Financial and administrative accountability records relating to PGDBA honorarium disbursements, Public Information Officer (PIO) honorarium, and weekly PIO operational reports."
      },
      {
        case_id: "CASE-PA-04",
        archive: "Public Accountability Archive",
        title: "Central Information Commission (CIC) Public Accountability Decision (2008)",
        reference_number: "CIC/OK/29092008-16",
        year: "2008",
        category: "Administrative Decisions",
        description: "Central Information Commission order and compliance record dated 29 September 2008."
      }
    ],
    documents: [
      {
        id: "RTI-001",
        title: "CIC Second Appeal (15.08.2023) — Complete Dossier & Annexures",
        filename: "CIC APPEAL 15.08.2023 ALL DOCUMENTS.pdf",
        filepath: "RTI Archive/CIC APPEAL 15.08.2023 ALL DOCUMENTS.pdf",
        archive: "RTI Archive",
        category: "Second Appeals before CIC",
        case_id: "CASE-RTI-01",
        date: "2023-08-15",
        display_date: "15 August 2023",
        year: "2023",
        document_type: "PDF",
        reference_number: "CIC/2023/08/15",
        description: "Second Appeal filed before the Central Information Commission along with chronological supporting annexures, initial RTI application, and appellate records.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-002",
        title: "Request for File Inspection — Misplaced Administrative File",
        filename: "File Misplaced Requesting File Inspection.PDF",
        filepath: "RTI Archive/File Misplaced Requesting File Inspection.PDF",
        archive: "RTI Archive",
        category: "RTI Applications",
        case_id: "CASE-RTI-01",
        date: "2023-09-01",
        display_date: "2023",
        year: "2023",
        document_type: "PDF",
        reference_number: "RTI/FILE-INSP/2023",
        description: "Communication regarding denial of statutory file inspection on grounds of the official file being misplaced.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-003",
        title: "Representation on Administrative Harassment (Memo CAF 6-12 / 197)",
        filename: "Harassment of employee Meno CAF 6-12  197 dated 19th October 2023.pdf",
        filepath: "RTI Archive/Harassment of employee Meno CAF 6-12  197 dated 19th October 2023.pdf",
        archive: "RTI Archive",
        category: "Vigilance-related Correspondence",
        case_id: "CASE-RTI-01",
        date: "2023-10-19",
        display_date: "19 October 2023",
        year: "2023",
        document_type: "PDF",
        reference_number: "CAF 6-12 / 197",
        description: "Official record and representation concerning Memo No. CAF 6-12 / 197 dated 19 October 2023.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-004",
        title: "CPIO Reply Regarding Part-Time Vigilance Officer (PTVO)",
        filename: "RTI REPLY CPIO 04.08.2022 PTVO.pdf",
        filepath: "RTI Archive/RTI REPLY CPIO 04.08.2022 PTVO.pdf",
        archive: "RTI Archive",
        category: "CPIO Replies",
        case_id: "CASE-RTI-02",
        date: "2022-08-04",
        display_date: "04 August 2022",
        year: "2022",
        document_type: "PDF",
        reference_number: "CPIO/PTVO/04.08.2022",
        description: "Response issued by the Central Public Information Officer dated 4 August 2022 regarding the appointment and functioning of the Part-Time Vigilance Officer.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-005",
        title: "Official Correspondence to PTVO and CVO, MoSPI",
        filename: "Letter to PTVO to CVO MoSPI .pdf",
        filepath: "RTI Archive/Letter to PTVO to CVO MoSPI .pdf",
        archive: "RTI Archive",
        category: "Vigilance-related Correspondence",
        case_id: "CASE-RTI-02",
        date: "2022-09-10",
        display_date: "2022",
        year: "2022",
        document_type: "PDF",
        reference_number: "MoSPI/CVO/PTVO",
        description: "Formal letter addressed to the Part-Time Vigilance Officer and Chief Vigilance Officer, Ministry of Statistics and Programme Implementation.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-006",
        title: "Chief Vigilance Officer (CVO) Correspondence Record",
        filename: "CVO.pdf",
        filepath: "RTI Archive/CVO.pdf",
        archive: "RTI Archive",
        category: "Vigilance-related Correspondence",
        case_id: "CASE-RTI-02",
        date: "2022-10-01",
        display_date: "2022",
        year: "2022",
        document_type: "PDF",
        reference_number: "CVO-DOC",
        description: "Documentary record pertaining to Chief Vigilance Officer proceedings and administrative vigilance correspondence.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-007",
        title: "Representation Requesting Administrative Action Against PTVO",
        filename: "Request to take  action against PTVO.pdf",
        filepath: "RTI Archive/Request to take  action against PTVO.pdf",
        archive: "RTI Archive",
        category: "Vigilance-related Correspondence",
        case_id: "CASE-RTI-02",
        date: "2022-11-01",
        display_date: "2022",
        year: "2022",
        document_type: "PDF",
        reference_number: "VIG/PTVO/ACT",
        description: "Formal representation requesting administrative and vigilance inquiry regarding actions of the Part-Time Vigilance Officer.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-008",
        title: "Application Requesting Status and Certified Copies of Complaints",
        filename: "Requesting status and copy of complaints.pdf",
        filepath: "RTI Archive/Requesting status and copy of complaints.pdf",
        archive: "RTI Archive",
        category: "RTI Applications",
        case_id: "CASE-RTI-02",
        date: "2022-11-15",
        display_date: "2022",
        year: "2022",
        document_type: "PDF",
        reference_number: "RTI/COMP-STATUS",
        description: "Request for official status report and certified copies of complaints filed under administrative/vigilance procedures.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-009",
        title: "Follow-Up Request for Status of All Pending Vigilance Cases",
        filename: "Yahoo Mail - Fw Request to inform status of my all vigilance cases.pdf",
        filepath: "RTI Archive/Yahoo Mail - Fw Request to inform status of my all vigilance cases.pdf",
        archive: "RTI Archive",
        category: "Follow-up Letters and Reminders",
        case_id: "CASE-RTI-02",
        date: "2023-01-15",
        display_date: "2023",
        year: "2023",
        document_type: "PDF",
        reference_number: "VIG/STATUS-REM",
        description: "Written reminder requesting formal disclosure of the current status of all vigilance matters.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-010",
        title: "Statutory Representation / Complaint Addressed to the Hon'ble Visitor",
        filename: "Smt. Prativa Patil_0001.pdf",
        filepath: "RTI Archive/Smt. Prativa Patil_0001.pdf",
        archive: "RTI Archive",
        category: "Vigilance-related Correspondence",
        case_id: "CASE-RTI-02",
        date: "2012-05-01",
        display_date: "2012",
        year: "2012",
        document_type: "PDF",
        reference_number: "VISITOR-REP-0001",
        description: "Formal representation submitted to the Hon'ble President of India / Visitor regarding institutional governance.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-011",
        title: "Official Communication — NOC Received with Objection",
        filename: "Yahoo Mail - NOC received with objection.pdf",
        filepath: "RTI Archive/Yahoo Mail - NOC received with objection.pdf",
        archive: "RTI Archive",
        category: "Follow-up Letters and Reminders",
        case_id: "CASE-RTI-03",
        date: "2023-02-10",
        display_date: "2023",
        year: "2023",
        document_type: "PDF",
        reference_number: "ADMIN/NOC-OBJ",
        description: "Official correspondence recording receipt of No Objection Certificate (NOC) with conditional administrative remarks.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-012",
        title: "Official Email Record — Inactive ID Notification",
        filename: "Yahoo Mail - Inactive ID Notification.pdf",
        filepath: "RTI Archive/Yahoo Mail - Inactive ID Notification.pdf",
        archive: "RTI Archive",
        category: "Follow-up Letters and Reminders",
        case_id: "CASE-RTI-03",
        date: "2023-03-01",
        display_date: "2023",
        year: "2023",
        document_type: "PDF",
        reference_number: "ADMIN/ID-NOTIF",
        description: "Administrative notification regarding institutional account/ID status.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-013",
        title: "Bar Council of India (BCI) Rules — Extract on Legal Education (File 4)",
        filename: "File 4_BAR COUNCIL OF INDIA RULES.pdf",
        filepath: "RTI Archive/File 4_BAR COUNCIL OF INDIA RULES.pdf",
        archive: "RTI Archive",
        category: "RTI Applications",
        case_id: "CASE-RTI-04",
        date: "2011-01-15",
        display_date: "2011",
        year: "2011",
        document_type: "PDF",
        reference_number: "BCI/RULES/F4",
        description: "Statutory rules framed by the Bar Council of India governing legal education standards and faculty qualifications.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-014",
        title: "RTI Application to Bar Council of India — Essential Qualifications (EQ) for Teaching Law",
        filename: "BCI RTI APPLICATION REGARDING EQ FOR TEACHING LAW SUBJECTS.pdf",
        filepath: "RTI Archive/BCI RTI APPLICATION REGARDING EQ FOR TEACHING LAW SUBJECTS.pdf",
        archive: "RTI Archive",
        category: "RTI Applications",
        case_id: "CASE-RTI-04",
        date: "2011-02-10",
        display_date: "2011",
        year: "2011",
        document_type: "PDF",
        reference_number: "BCI/RTI/EQ-APP",
        description: "RTI application seeking certified norms on Essential Qualifications prescribed for teaching law subjects.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-015",
        title: "Bar Council of India — 5-Page Application Dossier on EQ for Teaching Law",
        filename: "BAR COUNCIL OF INDIA 5 Pages.pdf",
        filepath: "RTI Archive/BAR COUNCIL OF INDIA 5 Pages.pdf",
        archive: "RTI Archive",
        category: "RTI Applications",
        case_id: "CASE-RTI-04",
        date: "2011-03-01",
        display_date: "2011",
        year: "2011",
        document_type: "PDF",
        reference_number: "BCI/RTI/5P",
        description: "Complete 5-page RTI submission and annexures addressed to the Bar Council of India regarding faculty qualification norms.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-016",
        title: "Bar Council of India Record (Dated 20.04.2011)",
        filename: "BCI_20.04.2011.pdf",
        filepath: "RTI Archive/BCI_20.04.2011.pdf",
        archive: "RTI Archive",
        category: "CPIO Replies",
        case_id: "CASE-RTI-04",
        date: "2011-04-20",
        display_date: "20 April 2011",
        year: "2011",
        document_type: "PDF",
        reference_number: "BCI/20.04.2011",
        description: "Bar Council of India communication dated 20 April 2011 in response to RTI query.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-017",
        title: "Bar Council of India CPIO Reply on Essential Qualifications & Timetable",
        filename: "BCI REPLY FOR EQ.pdf",
        filepath: "RTI Archive/BCI REPLY FOR EQ.pdf",
        archive: "RTI Archive",
        category: "CPIO Replies",
        case_id: "CASE-RTI-04",
        date: "2011-05-10",
        display_date: "2011",
        year: "2011",
        document_type: "PDF",
        reference_number: "BCI/CPIO/EQ-REPLY",
        description: "CPIO reply from the Bar Council of India enclosing details on Essential Qualifications and academic schedule for teaching law subjects.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-018",
        title: "Reminder to First Appellate Authority — Bar Council of India",
        filename: "BCI AA_REMINDER.pdf",
        filepath: "RTI Archive/BCI AA_REMINDER.pdf",
        archive: "RTI Archive",
        category: "Follow-up Letters and Reminders",
        case_id: "CASE-RTI-04",
        date: "2011-06-15",
        display_date: "2011",
        year: "2011",
        document_type: "PDF",
        reference_number: "BCI/AA/REM",
        description: "Reminder addressed to the First Appellate Authority of the Bar Council of India regarding pending appellate points.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-019",
        title: "Representation to BCI Chairman — Teaching Law Subjects Without LL.B.",
        filename: "BCI_CHAIRMAN_WITHOUT LLB.pdf",
        filepath: "RTI Archive/BCI_CHAIRMAN_WITHOUT LLB.pdf",
        archive: "RTI Archive",
        category: "Vigilance-related Correspondence",
        case_id: "CASE-RTI-04",
        date: "2011-07-01",
        display_date: "2011",
        year: "2011",
        document_type: "PDF",
        reference_number: "BCI/CHMN/LLB",
        description: "Submission regarding regulatory compliance on appointment of faculty teaching law subjects without holding an LL.B. degree.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-020",
        title: "Bar Council of India Record — RGS, PM, TKB & AC",
        filename: "BCI_RGS_PM_TKB_AC.pdf",
        filepath: "RTI Archive/BCI_RGS_PM_TKB_AC.pdf",
        archive: "RTI Archive",
        category: "CPIO Replies",
        case_id: "CASE-RTI-04",
        date: "2011-07-15",
        display_date: "2011",
        year: "2011",
        document_type: "PDF",
        reference_number: "BCI/RGS-PM-TKB-AC",
        description: "Related Bar Council of India documentary record concerning institutional faculty verification.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-021",
        title: "BCI Note on Essential Qualifications (M.Sc. / Ph.D.) [Word Source]",
        filename: "BCI EQ REGARDING MSC PHD.doc",
        filepath: "RTI Archive/BCI EQ REGARDING MSC PHD.doc",
        archive: "RTI Archive",
        category: "RTI Applications",
        case_id: "CASE-RTI-04",
        date: "2011-05-12",
        display_date: "2011",
        year: "2011",
        document_type: "DOC",
        reference_number: "BCI/DOC/MSC-PHD",
        description: "Editable Word document in repository concerning BCI Essential Qualifications for M.Sc./Ph.D. holders.",
        published: false,
        review_required: true
      },
      {
        id: "RTI-022",
        title: "BCI Academic Timetable Record [Word Source]",
        filename: "BCI TIME TABLE.doc",
        filepath: "RTI Archive/BCI TIME TABLE.doc",
        archive: "RTI Archive",
        category: "CPIO Replies",
        case_id: "CASE-RTI-04",
        date: "2011-05-14",
        display_date: "2011",
        year: "2011",
        document_type: "DOC",
        reference_number: "BCI/DOC/TT",
        description: "Editable Word document in repository containing timetable details referenced in BCI RTI reply.",
        published: false,
        review_required: true
      },
      {
        id: "RTI-023",
        title: "Representation to BCI Chairman — Without LL.B. [Word Source Duplicate]",
        filename: "BCI_CHAIRMAN_WITHOUT LLB.doc",
        filepath: "RTI Archive/BCI_CHAIRMAN_WITHOUT LLB.doc",
        archive: "RTI Archive",
        category: "Vigilance-related Correspondence",
        case_id: "CASE-RTI-04",
        date: "2011-07-01",
        display_date: "2011",
        year: "2011",
        document_type: "DOC",
        reference_number: "BCI/DOC/CHMN",
        description: "Word document version of the representation to the BCI Chairman (PDF version is already published as RTI-019).",
        published: false,
        review_required: true
      },
      {
        id: "RTI-024",
        title: "RTI First Appeal — University of Burdwan (20.12)",
        filename: "RTI_APPEAL_BURDWAN_UNIV_20.12.pdf",
        filepath: "RTI Archive/RTI_APPEAL_BURDWAN_UNIV_20.12.pdf",
        archive: "RTI Archive",
        category: "First Appeals",
        case_id: "CASE-RTI-05",
        date: "2011-12-20",
        display_date: "20 December",
        year: "2011",
        document_type: "PDF",
        reference_number: "BU/RTI-APPEAL/20.12",
        description: "First Appeal filed under Section 19(1) of the RTI Act before the First Appellate Authority, University of Burdwan.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-025",
        title: "CPIO Reply — University of Burdwan Matriculation Document",
        filename: "Matriculation BU_DOCUMENT.pdf",
        filepath: "RTI Archive/Matriculation BU_DOCUMENT.pdf",
        archive: "RTI Archive",
        category: "CPIO Replies",
        case_id: "CASE-RTI-05",
        date: "2012-01-15",
        display_date: "2012",
        year: "2012",
        document_type: "PDF",
        reference_number: "BU/CPIO/MATRIC",
        description: "Documentary reply obtained under the Right to Information Act from the University of Burdwan.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-026",
        title: "RTI Reply from National Law School of India University (NLSIU), Bengaluru",
        filename: "NLSIU Bangalore RTI_0001.pdf",
        filepath: "RTI Archive/NLSIU Bangalore RTI_0001.pdf",
        archive: "RTI Archive",
        category: "CPIO Replies",
        case_id: "CASE-RTI-06",
        date: "2011-08-10",
        display_date: "2011",
        year: "2011",
        document_type: "PDF",
        reference_number: "NLSIU/RTI/0001",
        description: "Official CPIO response furnished by the National Law School of India University, Bengaluru.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-027",
        title: "Bangalore University — LL.B. Examination Result Record",
        filename: "Bangalore University LL.B. Result.pdf",
        filepath: "RTI Archive/Bangalore University LL.B. Result.pdf",
        archive: "RTI Archive",
        category: "CPIO Replies",
        case_id: "CASE-RTI-06",
        date: "2011-08-20",
        display_date: "2011",
        year: "2011",
        document_type: "PDF",
        reference_number: "BU-BLR/LLB-RES",
        description: "Certified LL.B. examination result record obtained from Bangalore University.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-028",
        title: "Presidency University — Interview & RTI Dossier (Version 2.0)",
        filename: "Presidency University Interview and RTI Version 2.0 (1).pdf",
        filepath: "RTI Archive/Presidency University Interview and RTI Version 2.0 (1).pdf",
        archive: "RTI Archive",
        category: "RTI Applications",
        case_id: "CASE-RTI-07",
        date: "2015-06-01",
        display_date: "2015",
        year: "2015",
        document_type: "PDF",
        reference_number: "PRESIDENCY/RTI/V2",
        description: "Compiled dossier containing interview records and Right to Information correspondence regarding Presidency University.",
        published: true,
        review_required: false
      },
      {
        id: "RTI-029",
        title: "First Appellate Authority Order / Reference (03.02.2009)",
        filename: "Ref No JKP_AA_RG2009_06_03.02.2009.pdf",
        filepath: "RTI Archive/Ref No JKP_AA_RG2009_06_03.02.2009.pdf",
        archive: "RTI Archive",
        category: "First Appellate Authority Orders",
        case_id: "CASE-RTI-08",
        date: "2009-02-03",
        display_date: "03 February 2009",
        year: "2009",
        document_type: "PDF",
        reference_number: "JKP/AA/RG2009/06",
        description: "Appellate record bearing Reference No. JKP_AA_RG2009_06 dated 3 February 2009 (present in repository folder, previously unlinked).",
        published: false,
        review_required: true
      },
      {
        id: "RTI-030",
        title: "Indian Maritime University — CPIO Reply",
        filename: "INDIAN_MARITIME_UNIVERSITY_REPLY.pdf",
        filepath: "RTI Archive/INDIAN_MARITIME_UNIVERSITY_REPLY.pdf",
        archive: "RTI Archive",
        category: "CPIO Replies",
        case_id: "CASE-RTI-08",
        date: "2012-03-01",
        display_date: "2012",
        year: "2012",
        document_type: "PDF",
        reference_number: "IMU/RTI/REPLY",
        description: "Official RTI response received from Indian Maritime University (present in repository folder, previously unlinked).",
        published: false,
        review_required: true
      },
      {
        id: "RTI-031",
        title: "RTI Procedural & Legal Advisory Note (Shailesh Gandhi Reference)",
        filename: "JKP_SHAILESH_ADVICE.pdf",
        filepath: "RTI Archive/JKP_SHAILESH_ADVICE.pdf",
        archive: "RTI Archive",
        category: "CIC Orders and Decisions",
        case_id: "CASE-RTI-08",
        date: "2011-09-01",
        display_date: "2011",
        year: "2011",
        document_type: "PDF",
        reference_number: "JKP/ADVICE/CIC",
        description: "Advisory note and reference documentation on RTI proceedings (present in repository folder, previously unlinked).",
        published: false,
        review_required: true
      },
      {
        id: "PA-001",
        title: "Lok Sabha Parliamentary Committee — Official Reply",
        filename: "Lok sabha Parliamentary Committee Reply_0001.pdf",
        filepath: "Public Accountability Archive/Lok sabha Parliamentary Committee Reply_0001.pdf",
        archive: "Public Accountability Archive",
        category: "Replies and Clarifications",
        case_id: "CASE-PA-01",
        date: "2015-04-01",
        display_date: "2015",
        year: "2015",
        document_type: "PDF",
        reference_number: "LS/PARL-COMM/0001",
        description: "Official institutional reply submitted to the Lok Sabha Parliamentary Committee.",
        published: true,
        review_required: false
      },
      {
        id: "PA-002",
        title: "Parliamentary Committee on Welfare of SC/ST — Institutional Reply",
        filename: "Parliamentary Committee on SC ST and Mr. Naskar Reply_0001.pdf",
        filepath: "Public Accountability Archive/Parliamentary Committee on SC ST and Mr. Naskar Reply_0001.pdf",
        archive: "Public Accountability Archive",
        category: "Replies and Clarifications",
        case_id: "CASE-PA-01",
        date: "2015-05-01",
        display_date: "2015",
        year: "2015",
        document_type: "PDF",
        reference_number: "PARL-SCST/0001",
        description: "Official reply and compliance record submitted before the Parliamentary Committee on Scheduled Castes and Scheduled Tribes.",
        published: true,
        review_required: false
      },
      {
        id: "PA-003",
        title: "Office Memorandum (OM) Issued by Ministry of HRD",
        filename: "MHRD RTI 1.pdf",
        filepath: "Public Accountability Archive/MHRD RTI 1.pdf",
        archive: "Public Accountability Archive",
        category: "Official Correspondence",
        case_id: "CASE-PA-01",
        date: "2014-08-01",
        display_date: "2014",
        year: "2014",
        document_type: "PDF",
        reference_number: "MHRD/OM/RTI-1",
        description: "Office Memorandum issued by the Ministry of Human Resource Development concerning statutory governance and RTI compliance.",
        published: true,
        review_required: false
      },
      {
        id: "PA-004",
        title: "Official Reminder for Annual Performance Appraisal Report (APAR)",
        filename: "Reminder for APAR.pdf",
        filepath: "Public Accountability Archive/Reminder for APAR.pdf",
        archive: "Public Accountability Archive",
        category: "APAR Records",
        case_id: "CASE-PA-02",
        date: "2023-12-15",
        display_date: "2023",
        year: "2023",
        document_type: "PDF",
        reference_number: "ADMIN/APAR-REM",
        description: "Formal reminder regarding timely recording and completion of the Annual Performance Appraisal Report.",
        published: true,
        review_required: false
      },
      {
        id: "PA-005",
        title: "APAR of Dr. Jadab Kumar Pal (Reporting Year 2023–24)",
        filename: "APAR_DR. JADAB KR. PAL 2023-24.pdf",
        filepath: "Public Accountability Archive/APAR_DR. JADAB KR. PAL 2023-24.pdf",
        archive: "Public Accountability Archive",
        category: "APAR Records",
        case_id: "CASE-PA-02",
        date: "2024-02-01",
        display_date: "2023–2024",
        year: "2024",
        document_type: "PDF",
        reference_number: "APAR/JKP/2023-24",
        description: "Complete Annual Performance Appraisal Report (APAR) of Dr. Jadab Kumar Pal for the 2023–24 assessment cycle.",
        published: true,
        review_required: false
      },
      {
        id: "PA-006",
        title: "Statement of PGDBA Honorarium Paid",
        filename: "PGDBA Honourarium.xls",
        filepath: "Public Accountability Archive/PGDBA Honourarium.xls",
        archive: "Public Accountability Archive",
        category: "Service-related Documents",
        case_id: "CASE-PA-03",
        date: "2012-06-01",
        display_date: "2012",
        year: "2012",
        document_type: "XLS",
        reference_number: "FIN/PGDBA-HON",
        description: "Spreadsheet statement detailing PGDBA honorarium disbursements.",
        published: true,
        review_required: false
      },
      {
        id: "PA-007",
        title: "Public Information Officer (PIO) Honorarium Record",
        filename: "JKP_PIO_HONORARIUM.pdf",
        filepath: "Public Accountability Archive/JKP_PIO_HONORARIUM.pdf",
        archive: "Public Accountability Archive",
        category: "Service-related Documents",
        case_id: "CASE-PA-03",
        date: "2010-06-01",
        display_date: "2010",
        year: "2010",
        document_type: "PDF",
        reference_number: "PIO/HON/JKP",
        description: "Administrative record concerning Public Information Officer (PIO) honorarium (present in repository folder, previously unlinked).",
        published: false,
        review_required: true
      },
      {
        id: "PA-008",
        title: "PIO Weekly Administrative Activity Report",
        filename: "JKP_PIO_WEEK.pdf",
        filepath: "Public Accountability Archive/JKP_PIO_WEEK.pdf",
        archive: "Public Accountability Archive",
        category: "Service-related Documents",
        case_id: "CASE-PA-03",
        date: "2010-07-01",
        display_date: "2010",
        year: "2010",
        document_type: "PDF",
        reference_number: "PIO/WEEK/PDF",
        description: "Weekly statutory RTI/PIO disposal and activity record (present in repository folder, previously unlinked).",
        published: false,
        review_required: true
      },
      {
        id: "PA-009",
        title: "PIO Weekly Administrative Activity Report [Word Source Duplicate]",
        filename: "JKP_PIO_WEEK.doc",
        filepath: "Public Accountability Archive/JKP_PIO_WEEK.doc",
        archive: "Public Accountability Archive",
        category: "Service-related Documents",
        case_id: "CASE-PA-03",
        date: "2010-07-01",
        display_date: "2010",
        year: "2010",
        document_type: "DOC",
        reference_number: "PIO/WEEK/DOC",
        description: "Editable Word source corresponding to JKP_PIO_WEEK.pdf.",
        published: false,
        review_required: true
      },
      {
        id: "PA-010",
        title: "Central Information Commission Decision (CIC/OK/29092008-16)",
        filename: "CIC OK-29092008-16_JAGEEVAN.pdf",
        filepath: "Public Accountability Archive/CIC OK-29092008-16_JAGEEVAN.pdf",
        archive: "Public Accountability Archive",
        category: "Administrative Decisions",
        case_id: "CASE-PA-04",
        date: "2008-09-29",
        display_date: "29 September 2008",
        year: "2008",
        document_type: "PDF",
        reference_number: "CIC/OK/29092008-16",
        description: "Central Information Commission decision dated 29 September 2008 (present in repository folder, previously unlinked).",
        published: false,
        review_required: true
      }
    ]
  };

  let repositoryData = FALLBACK_REPOSITORY_DATA;

  const archiveState = {
    "RTI Archive": {
      search: "",
      category: "ALL",
      year: "ALL",
      docType: "ALL",
      sortBy: "date-desc",
      viewMode: "cases",
      includeUnlinked: false,
      expandedCases: new Set(["CASE-RTI-01", "CASE-RTI-02"])
    },
    "Public Accountability Archive": {
      search: "",
      category: "ALL",
      year: "ALL",
      docType: "ALL",
      sortBy: "date-desc",
      viewMode: "cases",
      includeUnlinked: false,
      expandedCases: new Set(["CASE-PA-01", "CASE-PA-02"])
    }
  };

  function encodeFilePath(filepath) {
    return filepath
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  async function initArchives() {
    try {
      const response = await fetch("documents.json", { cache: "no-cache" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const json = await response.json();
      if (json && Array.isArray(json.documents)) {
        repositoryData = json;
      }
    } catch (err) {
      // Uses FALLBACK_REPOSITORY_DATA seamlessly when opened via file://
      repositoryData = FALLBACK_REPOSITORY_DATA;
    }

    renderGlobalOverview();
    Object.keys(ARCHIVE_CONFIG).forEach((archiveName) => {
      renderArchiveSection(archiveName);
    });
    setupModalEvents();
  }

  function renderGlobalOverview() {
    const overviewMount = document.getElementById("archive-global-overview");
    if (!overviewMount) return;

    const publishedDocs = repositoryData.documents.filter((d) => d.published);
    const totalIndexed = repositoryData.documents.length;
    const totalCases = repositoryData.cases.length;
    const years = publishedDocs
      .map((d) => parseInt(d.year, 10))
      .filter((y) => !isNaN(y));
    const minYear = years.length ? Math.min(...years) : "-";
    const maxYear = years.length ? Math.max(...years) : "-";

    overviewMount.innerHTML = `
      <div class="repo-overview-banner">
        <div class="repo-overview-header">
          <div>
            <span class="repo-eyebrow">Digital Records Management System</span>
            <h2 class="repo-overview-title">Document Archives</h2>
            <p class="repo-overview-desc">
              A searchable, case-indexed repository of administrative, Right to Information (RTI), and public accountability records.
            </p>
          </div>
          <div class="repo-Global-Stats">
            <div class="stat-pill">
              <span class="stat-value">${publishedDocs.length}</span>
              <span class="stat-label">Published Records (${totalIndexed} Total Indexed)</span>
            </div>
            <div class="stat-pill">
              <span class="stat-value">${totalCases}</span>
              <span class="stat-label">Case Files</span>
            </div>
            <div class="stat-pill">
              <span class="stat-value">${minYear}–${maxYear}</span>
              <span class="stat-label">Year Span</span>
            </div>
          </div>
        </div>
        <div class="repo-quick-cards">
          <a href="#RTI Archive" class="repo-quick-card">
            <div class="quick-card-title">RTI Archive &rarr;</div>
            <div class="quick-card-meta">Applications, CPIO replies, First Appeals, CIC Second Appeals &amp; vigilance records</div>
          </a>
          <a href="#Public Accountability Archive" class="repo-quick-card">
            <div class="quick-card-title">Public Accountability Archive &rarr;</div>
            <div class="quick-card-meta">Parliamentary Committee replies, MHRD Office Memoranda, APAR &amp; service records</div>
          </a>
        </div>
      </div>
    `;
  }

  function getFilteredDocuments(archiveName) {
    const state = archiveState[archiveName];
    const query = state.search.trim().toLowerCase();

    let docs = repositoryData.documents.filter((doc) => {
      if (doc.archive !== archiveName) return false;
      if (!state.includeUnlinked && !doc.published) return false;
      if (state.category !== "ALL" && doc.category !== state.category) return false;
      if (state.year !== "ALL" && String(doc.year) !== String(state.year)) return false;
      if (state.docType !== "ALL" && doc.document_type !== state.docType) return false;

      if (query) {
        const parentCase = repositoryData.cases.find((c) => c.case_id === doc.case_id);
        const caseTitle = parentCase ? parentCase.title : "";
        const searchable = [
          doc.id,
          doc.title,
          doc.description,
          doc.category,
          doc.year,
          doc.display_date,
          doc.reference_number,
          doc.case_id,
          doc.document_type,
          caseTitle
        ]
          .join(" ")
          .toLowerCase();
        return searchable.includes(query);
      }
      return true;
    });

    docs.sort((a, b) => {
      if (state.sortBy === "date-desc") return (b.date || "").localeCompare(a.date || "");
      if (state.sortBy === "date-asc") return (a.date || "").localeCompare(b.date || "");
      if (state.sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (state.sortBy === "category-asc") return a.category.localeCompare(b.category);
      return 0;
    });

    return docs;
  }

  function renderArchiveSection(archiveName) {
    const config = ARCHIVE_CONFIG[archiveName];
    const mount = document.getElementById(config.mountId);
    if (!mount) return;

    const state = archiveState[archiveName];
    const allArchiveDocs = repositoryData.documents.filter(
      (d) => d.archive === archiveName && (state.includeUnlinked || d.published)
    );
    const unlinkedCount = repositoryData.documents.filter(
      (d) => d.archive === archiveName && !d.published
    ).length;

    const allArchiveCases = repositoryData.cases.filter((c) => c.archive === archiveName);
    const activeCategories = Array.from(new Set(allArchiveDocs.map((d) => d.category))).sort();
    const availableYears = Array.from(new Set(allArchiveDocs.map((d) => d.year))).sort((a, b) =>
      String(b).localeCompare(String(a))
    );
    const availableTypes = Array.from(new Set(allArchiveDocs.map((d) => d.document_type))).sort();

    const yearNums = allArchiveDocs.map((d) => parseInt(d.year, 10)).filter((n) => !isNaN(n));
    const yearRange =
      yearNums.length > 0 ? `${Math.min(...yearNums)}–${Math.max(...yearNums)}` : "N/A";

    const filteredDocs = getFilteredDocuments(archiveName);

    const categoryOptions = Array.from(
      new Set([...config.suggestedCategories, ...activeCategories])
    );

    mount.innerHTML = `
      <nav class="repo-breadcrumb" aria-label="Breadcrumb">
        <a href="#about">Home</a>
        <span aria-hidden="true">/</span>
        <a href="#archive-global-overview">Document Archives</a>
        <span aria-hidden="true">/</span>
        <span class="breadcrumb-current">${escapeHtml(archiveName)}</span>
      </nav>

      <div class="repo-section-header">
        <div>
          <span class="repo-badge">${escapeHtml(config.badge)}</span>
          <h2>${escapeHtml(archiveName)}</h2>
          <p class="repo-subtitle">${escapeHtml(config.subtitle)}</p>
        </div>
      </div>

      <div class="repo-stats-grid" role="region" aria-label="${escapeHtml(archiveName)} statistics">
        <div class="repo-stat-card">
          <div class="repo-stat-num">${allArchiveDocs.length}</div>
          <div class="repo-stat-lbl">Total Documents</div>
        </div>
        <div class="repo-stat-card">
          <div class="repo-stat-num">${allArchiveCases.length}</div>
          <div class="repo-stat-lbl">Case Files</div>
        </div>
        <div class="repo-stat-card">
          <div class="repo-stat-num">${activeCategories.length}</div>
          <div class="repo-stat-lbl">Active Categories</div>
        </div>
        <div class="repo-stat-card">
          <div class="repo-stat-num">${yearRange}</div>
          <div class="repo-stat-lbl">Year Range</div>
        </div>
      </div>

      <div class="repo-controls-panel">
        <div class="repo-search-row">
          <div class="repo-search-input-wrap">
            <label for="search-${config.mountId}" class="sr-only">Search documents</label>
            <input
              type="search"
              id="search-${config.mountId}"
              class="repo-search-input"
              placeholder="Search by title, subject, year, case ID, or reference number..."
              value="${escapeHtml(state.search)}"
            >
          </div>
          <div class="repo-view-toggle" role="group" aria-label="View mode">
            <button
              type="button"
              class="view-btn ${state.viewMode === "cases" ? "active" : ""}"
              data-action="view-cases"
            >
              Case-Wise Chronology
            </button>
            <button
              type="button"
              class="view-btn ${state.viewMode === "flat" ? "active" : ""}"
              data-action="view-flat"
            >
              All Documents (${filteredDocs.length})
            </button>
          </div>
        </div>

        <div class="repo-filters-row">
          <div class="filter-group">
            <label for="cat-${config.mountId}">Category</label>
            <select id="cat-${config.mountId}" data-filter="category">
              <option value="ALL" ${state.category === "ALL" ? "selected" : ""}>All Categories</option>
              ${categoryOptions
                .map(
                  (cat) =>
                    `<option value="${escapeHtml(cat)}" ${
                      state.category === cat ? "selected" : ""
                    }>${escapeHtml(cat)}</option>`
                )
                .join("")}
            </select>
          </div>

          <div class="filter-group">
            <label for="year-${config.mountId}">Year</label>
            <select id="year-${config.mountId}" data-filter="year">
              <option value="ALL" ${state.year === "ALL" ? "selected" : ""}>All Years</option>
              ${availableYears
                .map(
                  (yr) =>
                    `<option value="${escapeHtml(yr)}" ${
                      String(state.year) === String(yr) ? "selected" : ""
                    }>${escapeHtml(yr)}</option>`
                )
                .join("")}
            </select>
          </div>

          <div class="filter-group">
            <label for="type-${config.mountId}">Format</label>
            <select id="type-${config.mountId}" data-filter="docType">
              <option value="ALL" ${state.docType === "ALL" ? "selected" : ""}>All Formats</option>
              ${availableTypes
                .map(
                  (tp) =>
                    `<option value="${escapeHtml(tp)}" ${
                      state.docType === tp ? "selected" : ""
                    }>${escapeHtml(tp)}</option>`
                )
                .join("")}
            </select>
          </div>

          <div class="filter-group">
            <label for="sort-${config.mountId}">Sort By</label>
            <select id="sort-${config.mountId}" data-filter="sortBy">
              <option value="date-desc" ${state.sortBy === "date-desc" ? "selected" : ""}>Date (Newest First)</option>
              <option value="date-asc" ${state.sortBy === "date-asc" ? "selected" : ""}>Date (Chronological)</option>
              <option value="title-asc" ${state.sortBy === "title-asc" ? "selected" : ""}>Title (A–Z)</option>
              <option value="category-asc" ${state.sortBy === "category-asc" ? "selected" : ""}>Category</option>
            </select>
          </div>
        </div>

        <div class="repo-pills-row">
          <span class="pills-label">Browse by Year:</span>
          <button type="button" class="year-pill ${state.year === "ALL" ? "active" : ""}" data-year="ALL">All</button>
          ${availableYears
            .map(
              (yr) =>
                `<button type="button" class="year-pill ${
                  String(state.year) === String(yr) ? "active" : ""
                }" data-year="${escapeHtml(yr)}">${escapeHtml(yr)}</button>`
            )
            .join("")}

          ${
            unlinkedCount > 0
              ? `<label class="unlinked-toggle">
                  <input type="checkbox" data-action="toggle-unlinked" ${
                    state.includeUnlinked ? "checked" : ""
                  }>
                  <span>Show ${unlinkedCount} unlinked repository file(s) flagged for review</span>
                </label>`
              : ""
          }
        </div>
      </div>

      <div class="repo-results-bar">
        <span>Showing <strong>${filteredDocs.length}</strong> of ${allArchiveDocs.length} document(s)</span>
        ${
          state.viewMode === "cases"
            ? `<div class="case-expand-actions">
                <button type="button" class="link-btn" data-action="expand-all">Expand All Cases</button>
                <span>·</span>
                <button type="button" class="link-btn" data-action="collapse-all">Collapse All</button>
              </div>`
            : ""
        }
      </div>

      <div class="repo-listing-container">
        ${
          filteredDocs.length === 0
            ? `<div class="repo-empty-state">
                <p>No documents match your current search or filter criteria.</p>
                <button type="button" class="repo-btn-secondary" data-action="reset-filters">Reset All Filters</button>
              </div>`
            : state.viewMode === "cases"
            ? renderCaseWiseListing(archiveName, filteredDocs)
            : `<div class="repo-doc-list">${filteredDocs
                .map((doc) => renderDocumentRow(doc, true))
                .join("")}</div>`
        }
      </div>
    `;

    attachArchiveEvents(archiveName, mount);
  }

  function renderCaseWiseListing(archiveName, filteredDocs) {
    const state = archiveState[archiveName];
    const casesInArchive = repositoryData.cases.filter((c) => c.archive === archiveName);

    return casesInArchive
      .map((caseObj) => {
        const docsForCase = filteredDocs
          .filter((d) => d.case_id === caseObj.case_id)
          .sort((a, b) => (a.date || "").localeCompare(b.date || ""));

        if (docsForCase.length === 0) return "";

        const isExpanded =
          state.expandedCases.has(caseObj.case_id) || state.search.trim().length > 0;

        return `
          <div class="repo-case-card ${isExpanded ? "expanded" : ""}">
            <div class="repo-case-header" data-case-toggle="${escapeHtml(caseObj.case_id)}" role="button" tabindex="0" aria-expanded="${isExpanded}">
              <div class="repo-case-main">
                <div class="repo-case-meta-top">
                  <span class="case-id-badge">${escapeHtml(caseObj.case_id)}</span>
                  <span class="case-year-badge">${escapeHtml(caseObj.year)}</span>
                  <span class="case-cat-badge">${escapeHtml(caseObj.category)}</span>
                  ${
                    caseObj.reference_number
                      ? `<span class="case-ref-num">Ref: ${escapeHtml(caseObj.reference_number)}</span>`
                      : ""
                  }
                </div>
                <h3 class="repo-case-title">${escapeHtml(caseObj.title)}</h3>
                <p class="repo-case-desc">${escapeHtml(caseObj.description)}</p>
              </div>
              <div class="repo-case-right">
                <span class="case-doc-count">${docsForCase.length} ${
          docsForCase.length === 1 ? "Record" : "Records"
        }</span>
                <span class="case-chevron" aria-hidden="true">${isExpanded ? "−" : "+"}</span>
              </div>
            </div>

            <div class="repo-case-body" ${isExpanded ? "" : "hidden"}>
              <div class="case-chronology-header">Chronological Sequence of Case Records</div>
              <div class="repo-timeline-list">
                ${docsForCase.map((doc) => renderDocumentRow(doc, false)).join("")}
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderDocumentRow(doc, showCaseBadge) {
    const safeUrl = encodeFilePath(doc.filepath);
    const isPdf = doc.document_type.toUpperCase() === "PDF";
    const typeClass = isPdf ? "badge-pdf" : "badge-other";

    return `
      <article class="repo-doc-card ${doc.review_required ? "doc-unlinked-review" : ""}">
        <div class="doc-icon-col">
          <span class="doc-format-badge ${typeClass}">${escapeHtml(doc.document_type)}</span>
        </div>
        <div class="doc-info-col">
          <div class="doc-meta-line">
            <span class="doc-date">${escapeHtml(doc.display_date || doc.year)}</span>
            <span class="meta-sep">·</span>
            <span class="doc-category-tag">${escapeHtml(doc.category)}</span>
            ${
              doc.reference_number
                ? `<span class="meta-sep">·</span><span class="doc-ref">Ref: ${escapeHtml(
                    doc.reference_number
                  )}</span>`
                : ""
            }
            ${
              showCaseBadge
                ? `<span class="meta-sep">·</span><span class="doc-case-tag">${escapeHtml(
                    doc.case_id
                  )}</span>`
                : ""
            }
            ${
              doc.review_required
                ? `<span class="review-flag-badge">Unlinked File — For Review</span>`
                : ""
            }
          </div>
          <h4 class="doc-title">
            <a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${escapeHtml(doc.title)}</a>
          </h4>
          ${doc.description ? `<p class="doc-desc">${escapeHtml(doc.description)}</p>` : ""}
        </div>
        <div class="doc-actions-col">
          ${
            isPdf
              ? `<button
                  type="button"
                  class="repo-btn-preview"
                  data-preview-url="${safeUrl}"
                  data-preview-title="${escapeHtml(doc.title)}"
                >
                  Preview PDF
                </button>`
              : ""
          }
          <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="repo-btn-view">
            View Document
          </a>
          <a href="${safeUrl}" download="${escapeHtml(doc.filename)}" class="repo-btn-download">
            Download
          </a>
        </div>
      </article>
    `;
  }

  function attachArchiveEvents(archiveName, mount) {
    const state = archiveState[archiveName];

    const searchInput = mount.querySelector(".repo-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        state.search = e.target.value;
        const cursorPos = e.target.selectionStart;
        renderArchiveSection(archiveName);
        const newInput = mount.querySelector(".repo-search-input");
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(cursorPos, cursorPos);
        }
      });
    }

    mount.querySelectorAll("select[data-filter]").forEach((sel) => {
      sel.addEventListener("change", (e) => {
        const filterKey = e.target.getAttribute("data-filter");
        state[filterKey] = e.target.value;
        renderArchiveSection(archiveName);
      });
    });

    mount.querySelectorAll(".year-pill").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.year = btn.getAttribute("data-year");
        renderArchiveSection(archiveName);
      });
    });

    mount.querySelectorAll("[data-action]").forEach((el) => {
      const action = el.getAttribute("data-action");
      if (action === "toggle-unlinked") {
        el.addEventListener("change", (e) => {
          state.includeUnlinked = e.target.checked;
          renderArchiveSection(archiveName);
        });
      } else {
        el.addEventListener("click", () => {
          if (action === "view-cases") state.viewMode = "cases";
          if (action === "view-flat") state.viewMode = "flat";
          if (action === "expand-all") {
            repositoryData.cases
              .filter((c) => c.archive === archiveName)
              .forEach((c) => state.expandedCases.add(c.case_id));
          }
          if (action === "collapse-all") {
            state.expandedCases.clear();
          }
          if (action === "reset-filters") {
            state.search = "";
            state.category = "ALL";
            state.year = "ALL";
            state.docType = "ALL";
            state.sortBy = "date-desc";
          }
          renderArchiveSection(archiveName);
        });
      }
    });

    mount.querySelectorAll("[data-case-toggle]").forEach((header) => {
      const toggleCase = () => {
        const caseId = header.getAttribute("data-case-toggle");
        if (state.expandedCases.has(caseId)) {
          state.expandedCases.delete(caseId);
        } else {
          state.expandedCases.add(caseId);
        }
        renderArchiveSection(archiveName);
      };
      header.addEventListener("click", toggleCase);
      header.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleCase();
        }
      });
    });

    mount.querySelectorAll("[data-preview-url]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openPdfModal(
          btn.getAttribute("data-preview-url"),
          btn.getAttribute("data-preview-title")
        );
      });
    });
  }

  function setupModalEvents() {
    const modal = document.getElementById("pdf-preview-modal");
    if (!modal) return;

    modal.addEventListener("click", (e) => {
      if (
        e.target.hasAttribute("data-close-modal") ||
        e.target.classList.contains("pdf-modal-backdrop")
      ) {
        closePdfModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hasAttribute("hidden")) {
        closePdfModal();
      }
    });
  }

  function openPdfModal(url, title) {
    const modal = document.getElementById("pdf-preview-modal");
    const frame = document.getElementById("pdf-preview-frame");
    const titleEl = document.getElementById("pdf-modal-title");
    const openLink = document.getElementById("pdf-modal-external");

    if (!modal || !frame) return;
    titleEl.textContent = title || "Document Preview";
    frame.src = url;
    openLink.href = url;
    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  }

  function closePdfModal() {
    const modal = document.getElementById("pdf-preview-modal");
    const frame = document.getElementById("pdf-preview-frame");
    if (!modal || !frame) return;
    frame.src = "about:blank";
    modal.setAttribute("hidden", "hidden");
    document.body.style.overflow = "";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initArchives);
  } else {
    initArchives();
  }
})();

