/**
 * Single source of truth for identity, contact, and recruiter-facing summary.
 *
 * Editing rule: every string here must be traceable to the résumé, a repository,
 * or Evode's direct confirmation. Anything unverified belongs in
 * CONTENT_REVIEW.md, not on the page.
 */

/**
 * Canonical origin. Drives canonical tags, Open Graph URLs, the sitemap, and
 * robots.txt — so it must match the domain the site is actually served from,
 * with no trailing slash.
 *
 * The apex is canonical; www redirects to it. If that is ever flipped in
 * Vercel, flip it here too, or canonicals will point at the redirecting host.
 */
export const siteUrl = "https://evodemanirahari.com";

export const links = {
  github: "https://github.com/Evode-Manirahari",
  linkedin: "https://www.linkedin.com/in/evodemanirahari/",
  portfolioRepo: "https://github.com/Evode-Manirahari/new-portifolio",
  email: "manirahari@sonoma.edu",
  resume: "/Evode-Manirahari-Resume.pdf",
} as const;

/**
 * "placeholder" renders a visible notice next to the résumé links and on /about.
 * Drop the real PDF at public/Evode-Manirahari-Resume.pdf and flip this to
 * "available" — nothing else needs to change.
 */
export const resumeStatus: "placeholder" | "available" = "placeholder";

export const profile = {
  name: "Evode Manirahari",
  role: "Product-Minded Software & AI Engineer",
  headline:
    "I build software for real-world problems where reliability, judgment, and usability matter.",
  supporting:
    "I design and build full-stack products across applied AI, voice systems, mobile applications, backend infrastructure, and human-centered software.",
  identityLine: "Evode Manirahari — San Francisco Bay Area",
  location: "San Francisco Bay Area",
  availability:
    "Open to software engineering, product engineering, full-stack, backend, and applied AI opportunities.",
} as const;

export type SummaryRow = { label: string; value: string };

export const recruiterSummary: SummaryRow[] = [
  { label: "Primary", value: "Full-stack and product engineering" },
  {
    label: "Strengths",
    value: "Backend systems, applied AI, mobile, APIs, product design",
  },
  {
    label: "Current focus",
    value: "Building software for physical work and knowledge capture",
  },
  { label: "Based in", value: "San Francisco Bay Area" },
  {
    label: "Education",
    value: "B.S. Computer Science, Sonoma State University — May 2027",
  },
  {
    label: "Seeking",
    value:
      "Software engineering, product engineering, backend, full-stack, and applied AI roles",
  },
];

export const currentFocus = {
  statement:
    "I am currently exploring how software can preserve judgment that normally disappears when experienced workers leave.",
  body: "Most of what a thirty-year technician knows was never written down, because writing it down was never the job. ACT is my attempt to capture that reasoning from real work — with the original footage as proof, a human approving every lesson, and honest measurement of whether any of it lands.",
  projectSlug: "actober",
};

export const aboutPreview = [
  "I am Evode Manirahari, a software engineer and product builder based in the San Francisco Bay Area. I am interested in systems that have to survive contact with the real world: technicians wearing gloves, businesses missing calls, students protecting their attention, and growers making decisions across large fields.",
  "I work across product design, frontend, backend, mobile, infrastructure, and applied AI because difficult problems rarely fit neatly inside one job title.",
];

export const aboutBio = [
  "I am a software engineer and product builder based in the San Francisco Bay Area, studying Computer Science at Sonoma State University. I grew up in Rwanda around farming and hands-on work, and I have spent time in landscaping, scaffolding, and construction since moving to California. That is not a detail I mention for color — it is why the problems I pick tend to live outside the office.",
  "Most of my work starts the same way: someone is doing something difficult, the software available to them assumes conditions that do not hold, and the gap costs them money or attention or safety. A technician cannot type notes with gloves on. A florist cannot answer the phone during a rush. A student cannot afford to miss a shift offer, and cannot afford to check their phone every ten minutes either.",
  "I build the whole system rather than a slice of it, because in these problems the interesting decisions sit at the seams — between the capture surface and the pipeline, between a model's output and what a human is willing to trust. I would rather ship a narrow thing that survives real use than a broad thing that only works in a demo.",
];

export const engineeringInterests = [
  {
    title: "Systems that fail in the right direction",
    body: "Every product I build has a defined behavior for uncertainty. FocusGate forwards the message when triage is unsure, because a false interrupt is annoying and a missed shift offer is expensive. ACT refuses to answer live diagnosis questions at all. Choosing the failure direction is a design decision, not an error path.",
  },
  {
    title: "Evaluation as a first-class surface",
    body: "If a model is in the product, there has to be a way to score it, catch the regression, and prove the fix. SecondLine's harness grades sixteen scenarios across six dimensions and rewrites the agent policy from the failures. Without that loop, 'it seems better' is the only claim anyone can make.",
  },
  {
    title: "Data models before features",
    body: "The parts of ACT I am most confident in are the ones where the schema came first — recordings, marks, moments, questions, answers, knowledge objects, outcomes. Tenant scoping and provenance are much cheaper to enforce in the model than to bolt on later.",
  },
  {
    title: "Interfaces built for the actual body using them",
    body: "One-button capture, glove-friendly tap targets, offline upload retry. The constraint that shapes the interface is usually physical, not visual.",
  },
];

export const productPhilosophy = [
  {
    title: "Find the problem that refuses to fit in a box",
    body: "The problems worth building for are the ones where the obvious tool already exists and still does not work. Focus modes block apps but cannot read a message. Drone platforms sell maps but do not close the loop on whether the spray decision was right.",
  },
  {
    title: "Be specific about what is proven",
    body: "A July 2026 audit of ACT's production data showed that what looked like traction was my own app testing, and that five published lesson cards had been compiled from nothing. I deleted them and reset the corpus to zero. Knowing which of your numbers are real is part of the engineering.",
  },
  {
    title: "Keep the human where the judgment is",
    body: "Automation runs between approval gates, not around them. In ACT nothing publishes itself; a lead technician approves every lesson before an apprentice sees it.",
  },
  {
    title: "Ship the loop, not the demo",
    body: "A demo shows one path working once. A loop keeps working when the upload fails, the transport changes, or the model gets it wrong. Most of the engineering is in the second one.",
  },
];

export const currentGoals = [
  "Join an engineering team where I can own features end to end — schema, API, interface, and the measurement that says whether it worked.",
  "Keep building in domains where software meets physical work, and keep the evaluation honest enough that I can tell when it is not working.",
  "Finish my Computer Science degree at Sonoma State University (May 2027).",
];

export const contact = {
  heading: "Let's build something useful.",
  body: "Bring me a problem that refuses to fit inside a neat box. I am most useful early — when the data model, the interface, and the question of what is actually true are all still open.",
};
