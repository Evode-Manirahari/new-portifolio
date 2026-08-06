/**
 * Grouped capability lists.
 *
 * Editing rule: a technology only appears here if it is used in a project that
 * appears on this site. No bars, no ratings, nothing added for search engines.
 */

export type CapabilityGroup = {
  title: string;
  /** Where these show up, so a reader can go check the claim. */
  evidence: string;
  items: string[];
};

export const capabilities: CapabilityGroup[] = [
  {
    title: "Frontend",
    evidence: "ACT admin · DrCrop · FieldCard · this site",
    items: [
      "React",
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Responsive layout systems",
      "Accessibility (WCAG 2.2 AA)",
      "Zustand state management",
      "Server Components",
    ],
  },
  {
    title: "Backend",
    evidence: "act-api · SecondLine · FocusGate · DrCrop",
    items: [
      "Python",
      "FastAPI",
      "Node.js",
      "REST API design",
      "WebSockets",
      "PostgreSQL",
      "SQLAlchemy (async)",
      "Alembic migrations",
      "Durable job queues",
      "Multi-tenant isolation",
      "JWT authentication",
      "Webhook signature verification",
    ],
  },
  {
    title: "Applied AI",
    evidence: "ACT · SecondLine · FocusGate · FieldCard",
    items: [
      "LLM integration (Anthropic SDK)",
      "Structured outputs",
      "Tool calling with typed schemas",
      "Retrieval and embeddings",
      "Speech-to-text (Deepgram)",
      "Text-to-speech",
      "Evaluation harnesses",
      "Guardrails and refusal boundaries",
      "Multi-step agent workflows",
      "Prompt caching",
    ],
  },
  {
    title: "Mobile",
    evidence: "ACT mobile client",
    items: [
      "React Native",
      "Expo",
      "Camera and media capture",
      "Offline upload retry and resume",
      "Secure session storage",
      "Field-first interaction design",
    ],
  },
  {
    title: "Infrastructure",
    evidence: "act-api · DrCrop · SecondLine · Agentbase",
    items: [
      "Docker",
      "Fly.io",
      "Vercel",
      "Supabase",
      "Cloudflare R2",
      "GitHub Actions",
      "CI/CD pipelines",
      "Structured logging and observability",
    ],
  },
];
