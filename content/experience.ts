/**
 * Professional background.
 *
 * VERIFICATION RULE — read before adding an entry.
 * Everything in `experience` is supported by Evode's résumé (January 2026).
 * Entries that appear on the previous portfolio or on LinkedIn but are NOT
 * supported by the résumé live in `pendingVerification` below. They are not
 * rendered anywhere on the site. See CONTENT_REVIEW.md.
 */

export type ExperienceEntry = {
  organization: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  detail?: string[];
  url?: string;
};

export const experience: ExperienceEntry[] = [
  {
    organization: "Actober AI",
    role: "Founding engineer — ACT",
    location: "San Francisco Bay Area",
    period: "2026 — present",
    summary:
      "Building the capture-to-lesson system for HVAC field work: React Native client, FastAPI backend, media pipeline, and review-gated publishing.",
    detail: [
      "Designed the data model and built the FastAPI backend behind a Postgres-backed durable job queue, deployed on Fly.io.",
      "Implemented the React Native capture flow — glove-friendly moment marking, consent state, and retryable uploads.",
      "Built per-account tenant scoping so cross-account identifiers return 404 across the entire API, covered by tests.",
      "Ran an audit of the production corpus that showed the apparent usage was internal testing, and reset the corpus rather than report it as traction.",
    ],
    url: "https://github.com/Evode-Manirahari/act",
  },
  {
    organization: "Student Senate for California Community Colleges (SSCCC)",
    role: "Treasurer, Region I",
    location: "Sacramento, CA",
    period: "Nov 2024 — Jul 2025",
    summary:
      "Held the regional budget: tracked expenses and reimbursements, built reporting, and taught other students how the process worked.",
    detail: [
      "Tracked budgets and produced reports and spreadsheets for ongoing expenses and reimbursements.",
      "Built dashboards in Sheets and Excel for tracking and transparency.",
      "Led “Budget 101” workshops so other student leaders could use the process themselves.",
    ],
  },
  {
    organization: "Mendocino College",
    role: "Student Support & IT",
    location: "Ukiah, CA",
    period: "Jan 2024 — Jun 2025",
    summary:
      "Front-line technical support for students, staff, and visitors — triaging requests, resolving common issues, and running classroom and event A/V.",
    detail: [
      "Logged and tracked support requests and resolved common technical issues.",
      "Supported classroom and event A/V setups and troubleshot problems live during events.",
      "Helped staff and students with campus equipment and trained others on Google Workspace and Microsoft Office.",
    ],
  },
  {
    organization: "Associated Students of Mendocino College (ASMC)",
    role: "Activities Director",
    location: "Ukiah, CA",
    period: "May 2024 — Jun 2025",
    summary:
      "Planned and ran campus programming — logistics, setup and breakdown, on-site supervision, and coordination with clubs and campus partners.",
  },
];

/** The three highest-signal entries for the homepage summary. */
export const homepageExperience = experience.slice(0, 3);

/**
 * NOT RENDERED. Claims carried over from the previous portfolio that the
 * current résumé does not support, or that conflict with it. Each one needs a
 * source or Evode's confirmation before it can move into `experience`.
 * Tracked in CONTENT_REVIEW.md.
 */
export const pendingVerification: (ExperienceEntry & { issue: string })[] = [
  {
    organization: "Reality AI Labs",
    role: "AI Engineer Intern",
    location: "Remote",
    period: "Apr 2024 — Sep 2024",
    summary:
      "Previous portfolio described building an AI career coach with RAG, an evaluation harness, and FastAPI services on GCP/AWS.",
    issue:
      "Not present on the January 2026 résumé. Needs an offer letter, manager reference, or Evode's confirmation before publishing.",
  },
  {
    organization: "Web3 Labs",
    role: "Software Engineer Intern",
    location: "San Francisco, CA",
    period: "Feb 2024 — Jun 2024",
    summary:
      "Previous portfolio described backend services in Java/Spring Boot with Kafka and Snowflake, and quantified improvements.",
    issue:
      "Not present on the January 2026 résumé. Percentage improvements have no cited source.",
  },
  {
    organization: "Mendocino College with SETI Institute and NASA",
    role: "IT Support & Software Developer",
    location: "Ukiah, CA",
    period: "Jan 2024 — Jun 2025",
    summary:
      "Previous portfolio described a Python pipeline for CAMS spectrograph data and a ~95% processing-time reduction.",
    issue:
      "Conflicts with the résumé, which describes the same period as front-desk and IT support with no research component. The 95% figure, the 1,200+ issues, and the NASA/SETI affiliation all need sources.",
  },
];
