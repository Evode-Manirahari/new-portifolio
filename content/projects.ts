export type ProjectStatus =
  | "current-build"
  | "deployed-prototype"
  | "hackathon"
  | "experiment"
  | "research"
  | "archived";

export const statusLabel: Record<ProjectStatus, string> = {
  "current-build": "Current build",
  "deployed-prototype": "Deployed prototype",
  hackathon: "Hackathon build",
  experiment: "Experiment",
  research: "Research",
  archived: "Archived",
};

export type Project = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  /** One line on what is and is not true about its stage. Recruiters read this. */
  statusNote: string;
  problem: string;
  year: string;
  role: string;
  status: ProjectStatus;
  featured: boolean;
  categories: string[];
  technologies: string[];
  responsibilities: string[];
  /** The single sentence that answers "what did Evode actually build". */
  contribution: string;
  proofPoints: string[];
  repositoryUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
  coverImage: string;
  coverAlt: string;
};

export const projects: Project[] = [
  {
    slug: "actober",
    name: "ACT — Actober AI",
    headline: "Teaching software what experienced technicians notice.",
    summary:
      "A system that turns footage from real HVAC jobs into verified, company-specific lessons before experienced technicians retire.",
    statusNote:
      "In active development. Deployed backend and working end-to-end loop; no field capture and no paying customers yet.",
    problem:
      "When a thirty-year HVAC technician retires, the diagnostic shortcuts that keep callbacks low on that company's own install base leave with them. Nobody wrote them down, because writing them down was never the job.",
    year: "2026",
    role: "Solo engineer and product owner — mobile, backend, admin, infrastructure",
    status: "current-build",
    featured: true,
    categories: ["Applied AI", "Mobile", "Backend", "Infrastructure"],
    technologies: [
      "React Native",
      "Expo",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "Next.js",
      "Claude",
      "Deepgram",
      "Cloudflare R2",
      "Supabase Auth",
      "Fly.io",
    ],
    responsibilities: [
      "Product strategy and the capture-to-lesson loop",
      "React Native capture, debrief, learn, and outcome screens",
      "FastAPI backend, data model, and durable processing queue",
      "Media pipeline: upload, frame extraction, transcription, moment detection",
      "Next.js admin review and publishing gate",
      "Auth, per-tenant isolation, consent and redaction paths",
      "Deployment and evaluation of whether any of it works",
    ],
    contribution:
      "Designed the capture workflow, implemented the React Native recording experience with glove-friendly marking and retryable uploads, built the FastAPI backend and its Postgres-backed job queue, wired transcription and moment detection into a review-gated publishing pipeline, and shipped the whole loop against a deployed backend.",
    proofPoints: [
      "The Capture → Detect → Ask → Structure → Review → Teach → Measure loop runs end to end against the deployed backend at act-api-evode.fly.dev.",
      "Backend carries 444 tests across 47 test modules and 26 Alembic migrations, including per-object tenant scoping tests that assert cross-account IDs return 404 across the entire API.",
      "A July 2026 audit of the production corpus found the recordings were my own app tests and five compiled lesson cards had no genuine expert input — I deleted them and reset the corpus to zero rather than count them as traction.",
    ],
    repositoryUrl: "https://github.com/Evode-Manirahari/act",
    coverImage: "/images/projects/act-cover.svg",
    coverAlt:
      "Diagram of the ACT loop: capture, detect, ask, structure, review, teach, measure.",
  },
  {
    slug: "secondline",
    name: "SecondLine",
    headline: "A phone line that gets better after every call.",
    summary:
      "A self-improving voice system for missed calls at small local businesses.",
    statusNote:
      "Built in one day at the YC Voice Agents Hackathon. Deployed and demonstrable; not a running business.",
    problem:
      "A florist or clinic that misses a call usually loses the customer — most callers do not try again, they call the next shop. Voicemail does not recover them.",
    year: "2026",
    role: "Built at the YC Voice Agents Hackathon (Pipecat · Cekura · NVIDIA · AWS · Twilio)",
    status: "hackathon",
    featured: true,
    categories: ["Applied AI", "Voice", "Backend", "Evaluation"],
    technologies: [
      "Python",
      "Pipecat",
      "Twilio",
      "WebRTC",
      "SQLite",
      "FastAPI",
      "NVIDIA Nemotron",
      "Claude",
      "Cekura",
    ],
    responsibilities: [
      "Business logic, typed tool layer, and persistent caller memory",
      "Allergen safety guard enforced below the model",
      "Sixteen-scenario evaluation harness with a simulated caller",
      "Automatic failure-to-fix improvement loop",
      "Multi-transport deployment and production debugging",
      "Owner dashboard and task queue",
    ],
    contribution:
      "Built the business brain and its eleven typed tools so the model could never invent business state, wrote the sixteen-scenario evaluation harness and the improvement engine that turns each failure into a validation rule, escalation rule, prompt patch, or memory update, and debugged the production transport bug that automated voice testing exposed.",
    proofPoints: [
      "Local evaluation harness: 16 scenarios graded on 6 dimensions; pass rate moved from 88% to 94% and unsafe actions from 1 to 0 after the improvement loop ran.",
      "The unsafe action was real: the agent was about to add a lily bouquet for a caller with a recorded lily allergy. The loop wrote a validation rule that blocks it at the tool layer and proved it gone on re-run.",
      "Automated voice testing against the live deployment scored 0% on the first run and pinpointed the cause — the deployed bot handled Twilio and local WebRTC but not the Daily transport, so it silently built no pipeline. Adding that case took the agent from silent to fully conversational.",
    ],
    repositoryUrl: "https://github.com/Evode-Manirahari/SecondLine",
    liveUrl: "https://evode-manirahari.github.io/SecondLine/",
    liveLabel: "Project site",
    coverImage: "/images/projects/secondline-cover.svg",
    coverAlt:
      "Diagram of a call flowing through speech recognition, a typed tool layer, and an evaluation loop.",
  },
  {
    slug: "drcrop",
    name: "DrCrop",
    headline: "Turning drone flights into acres not sprayed.",
    summary:
      "A row-aware imaging pipeline that converts vineyard drone imagery into spray, scout, and skip maps.",
    statusNote:
      "Deployed prototype running on synthetic orthomosaics. No real flight has been processed and no grower has used it.",
    problem:
      "Vineyards spray whole blocks because they cannot see which rows actually need it. The imagery to know better already exists; the decision layer on top of it does not.",
    year: "2026",
    role: "Solo engineer — imaging pipeline, exports, verification, and web surface",
    status: "deployed-prototype",
    featured: true,
    categories: ["Backend", "Imaging", "Geospatial", "Applied AI"],
    technologies: [
      "Node.js",
      "JavaScript",
      "Raster processing",
      "GeoJSON",
      "KML",
      "PDF generation",
      "Claude",
      "Fly.io",
    ],
    responsibilities: [
      "Orthomosaic intake and vegetation index computation",
      "Row-aware masking that separates canopy from inter-row",
      "Management zoning with acreage and cost estimates",
      "PDF, KML, and GeoJSON export writers",
      "Before/after verification diffing",
      "Grower-facing site and lead capture endpoint",
    ],
    contribution:
      "Built the six-stage drone-to-prescription pipeline end to end — vegetation index, row-aware masking, zoning, and a hand-rolled PNG encoder, PDF builder, KML and GeoJSON writer with no new dependencies — plus the before/after verification diff that reports acres spared.",
    proofPoints: [
      "Six stages — intake, ExG vegetation index, row-aware mask, zoning, export, verify — run end to end on a synthetic Sonoma vineyard orthomosaic and produce every export format.",
      "PNG encoding, PDF generation, KML and GeoJSON writing are all hand-rolled on Node's zlib; the drone module added zero npm dependencies.",
      "Row-aware masking is the part that matters: weeds are scored between the vines rather than under the canopy, which is what makes a skip zone trustworthy.",
    ],
    repositoryUrl: "https://github.com/Evode-Manirahari/DrCrop",
    liveUrl: "https://drcrop-demo.fly.dev/demo",
    liveLabel: "Live pipeline demo",
    coverImage: "/images/projects/drcrop-cover.svg",
    coverAlt:
      "Diagram of a vineyard block divided into spray, scout, and skip management zones.",
  },
  {
    slug: "focusgate",
    name: "FocusGate",
    headline: "Staying reachable without staying distracted.",
    summary:
      "A content-aware message relay for working students who need to protect study time without missing urgent work communication.",
    statusNote:
      "v1 relay backend and operator dashboard, running locally. The concierge test that would validate it has not been run.",
    problem:
      "Do Not Disturb decides on sender, never on content. \"ok love you\" interrupts exactly as hard as \"can you cover tonight?\" — so students who need the shift keep their phone on and lose the study block.",
    year: "2026",
    role: "Solo engineer — product judgment, relay backend, triage design",
    status: "experiment",
    featured: true,
    categories: ["Applied AI", "Backend", "Product judgment"],
    technologies: [
      "TypeScript",
      "Node.js",
      "Twilio",
      "Claude",
      "Webhooks",
      "Vitest",
    ],
    responsibilities: [
      "The product decision to relay rather than block",
      "Server-side triage with a deterministic trust floor",
      "Fail-open routing on every uncertain path",
      "Block state machine, held messages, and end-of-block digest",
      "Twilio signature verification and operator dashboard",
    ],
    contribution:
      "Made the call to build a server-side relay instead of another app blocker — because the OS already blocks apps and cannot read content — then implemented the triage path with a keyword trust floor ahead of the model, fail-open behavior on every error and timeout, and the block state machine that holds, auto-replies, and digests.",
    proofPoints: [
      "Every uncertain path biases toward delivery: an error, a timeout, or an ambiguous verdict forwards the message. A false interrupt is mildly annoying; a missed shift offer costs money and trust.",
      "A deterministic keyword floor runs before the model, so the most urgent cases never depend on inference being available.",
      "Because triage lives on the server, the same backend works on iOS and Android with no notification interception — which iOS forbids anyway.",
    ],
    repositoryUrl: "https://github.com/Evode-Manirahari/FocusGate",
    coverImage: "/images/projects/focusgate-cover.svg",
    coverAlt:
      "Diagram of an incoming message routed to deliver, hold, or fail-open delivery.",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

/** Prev/next within the featured set, wrapping at the ends. */
export function getProjectNeighbours(slug: string) {
  const list = featuredProjects;
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1) return { previous: undefined, next: undefined };
  return {
    previous: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  };
}

/* ------------------------------------------------------------------
   Archive — smaller builds, listed as an editorial index.
   Only repositories Evode authored appear here. Forks are excluded.
   ------------------------------------------------------------------ */

export type ArchiveEntry = {
  name: string;
  year: string;
  thesis: string;
  status: ProjectStatus;
  area: string;
  repositoryUrl?: string;
  liveUrl?: string;
};

export const archive: ArchiveEntry[] = [
  {
    name: "FieldCard",
    year: "2026",
    thesis:
      "Rebuilt ACT's voice-debrief slice as clean, standalone code: describe a job by voice, get asked two sharp follow-up questions, receive a structured teachable card.",
    status: "hackathon",
    area: "Voice · Next.js · Structured outputs",
    repositoryUrl: "https://github.com/Evode-Manirahari/fieldcard",
  },
  {
    name: "eyebrain",
    year: "2026",
    thesis:
      "Ask your security cameras what happened instead of scrubbing hours of footage — a local, on-device voice agent over multi-camera video.",
    status: "hackathon",
    area: "On-device AI · Video retrieval · Voice",
    repositoryUrl: "https://github.com/Evode-Manirahari/eyebrain",
  },
  {
    name: "Agentbase",
    year: "2026",
    thesis:
      "Scoped identity, approval, and audit for AI agents before they touch real APIs, CRMs, and internal tools.",
    status: "experiment",
    area: "TypeScript · Agent safety · Audit",
    repositoryUrl: "https://github.com/Evode-Manirahari/Agentbase",
  },
  {
    name: "glowing-robot",
    year: "2026",
    thesis:
      "Robot QA without a terminal: upload a mission log, replay it in simulation, detect collisions and path deviations, compare policy versions.",
    status: "experiment",
    area: "Robotics · Simulation · Python",
    repositoryUrl: "https://github.com/Evode-Manirahari/glowing-robot",
  },
  {
    name: "ruhagoAI",
    year: "2026",
    thesis:
      "Probabilistic open-play simulation for football — sample plausible futures from tracking data instead of predicting one.",
    status: "research",
    area: "Machine learning · Multi-agent simulation",
    repositoryUrl: "https://github.com/Evode-Manirahari/RuhagoAI",
  },
  {
    name: "Tracer",
    year: "2026",
    thesis:
      "Turns a plain-English board idea into structured PCB requirements, a formal spec, and a validation report. Built with a team.",
    status: "hackathon",
    area: "FastAPI · React · Requirements formalisation",
    repositoryUrl: "https://github.com/authentisity/tracer",
  },
  {
    name: "FixGuide AI",
    year: "2026",
    thesis:
      "On-device repair guidance built for the Cactus × Google DeepMind × Y Combinator Gemma voice-agent hackathon.",
    status: "hackathon",
    area: "On-device models · Voice",
    repositoryUrl: "https://github.com/Evode-Manirahari/fixguide-ai",
  },
];
