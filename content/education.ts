export type EducationEntry = {
  institution: string;
  credential: string;
  period: string;
  location: string;
  note?: string;
};

export const education: EducationEntry[] = [
  {
    institution: "Sonoma State University",
    credential: "B.S. Computer Science",
    period: "Expected May 2027",
    location: "Rohnert Park, CA",
    note: "Coursework across systems, architecture, and applied machine learning.",
  },
];

export type Recognition = {
  title: string;
  issuer: string;
  period: string;
  note?: string;
};

/**
 * Only verified credentials appear here. Awards listed on the previous
 * portfolio (Hanga Pitch Fest, NVIDIA Summer Bridge, National Bank of Rwanda
 * quiz challenge, CodePath, ColorStack, NSBE) are held in CONTENT_REVIEW.md
 * until a source or Evode's confirmation exists.
 */
export const recognition: Recognition[] = [
  {
    title: "AMD ROCm Certified Associate",
    issuer: "AMD AI Academy",
    period: "Issued Aug 2026 · valid through Aug 2028",
  },
];
