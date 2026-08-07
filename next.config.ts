import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next regenerates AGENTS.md / CLAUDE.md on every `next dev` otherwise,
  // which leaves untracked files in the repo after each run.
  agentRules: false,
};

export default nextConfig;
