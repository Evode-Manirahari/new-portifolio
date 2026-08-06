export type LeadershipEntry = {
  role: string;
  organization: string;
  period: string;
  summary: string;
};

/**
 * Both entries are supported by the January 2026 résumé.
 * ColorStack and NSBE membership appear on the previous portfolio only —
 * see CONTENT_REVIEW.md.
 */
export const leadership: LeadershipEntry[] = [
  {
    role: "Treasurer, Region I",
    organization: "Student Senate for California Community Colleges",
    period: "Nov 2024 — Jul 2025",
    summary:
      "Owned regional budget tracking and reporting, and ran “Budget 101” workshops so other student leaders could work the process without me.",
  },
  {
    role: "Activities Director",
    organization: "Associated Students of Mendocino College",
    period: "May 2024 — Jun 2025",
    summary:
      "Planned campus programming end to end — timelines, logistics, setup and breakdown, and on-site supervision with clubs and campus partners.",
  },
];
