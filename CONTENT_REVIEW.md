# Content review

Every factual claim on this site, where it came from, and whether it can stay.

**The rule this site is built on:** nothing is published unless it is traceable
to the résumé, a repository, a verifiable document, or Evode's direct
confirmation. Claims that failed that test are listed here and are **not
rendered anywhere on the site** — they are held until a source exists.

Status values: `Verified` · `Needs source` · `Needs Evode approval` · `Remove` ·
`Approved for publication`

Last reviewed: 2026-08-06

---

## 1. Identity and contact — published

| Claim | Source | Link | Status | Appears |
| --- | --- | --- | --- | --- |
| Name: Evode Manirahari | Résumé (Jan 2026) | — | Verified | Site-wide |
| Email: manirahari@sonoma.edu | Résumé; previous portfolio contact section | — | Verified | Hero, contact, footer, about |
| GitHub: github.com/Evode-Manirahari | Confirmed live | https://github.com/Evode-Manirahari | Verified | Nav, hero, contact, footer |
| LinkedIn: linkedin.com/in/evodemanirahari/ | Provided as canonical | https://www.linkedin.com/in/evodemanirahari/ | Verified | Contact, footer, mobile nav |
| Location: San Francisco Bay Area | Directed copy; résumé says "Rohnert Park, CA" | — | **Needs Evode approval** | Hero, summary, footer, contact |
| B.S. Computer Science, Sonoma State University, May 2027 | Résumé | — | Verified | Summary, experience, about |
| Availability line ("Open to software engineering…") | Directed copy | — | Approved for publication | Hero, contact |
| Phone number | On résumé | — | **Deliberately not published** | Nowhere |

> **Location note.** The résumé says Rohnert Park, CA. The site says
> San Francisco Bay Area, as directed. Rohnert Park is in Sonoma County; if
> Evode wants the narrower, literally-accurate version, change
> `profile.location` in `content/profile.ts`.

> **No claim is made anywhere on this site about visa status, work
> authorization, or relocation.** This is intentional. Do not add one.

---

## 2. Experience and education — published

| Claim | Source | Status | Appears |
| --- | --- | --- | --- |
| Treasurer, Region I — SSCCC, Sacramento, Nov 2024 – Jul 2025 | Résumé | Verified | Homepage, about, leadership |
| Budget tracking, Sheets/Excel dashboards, "Budget 101" workshops | Résumé bullets | Verified | About, leadership |
| Student Support & IT — Mendocino College, Ukiah, Jan 2024 – Jun 2025 | Résumé | Verified | Homepage, about |
| Ticket logging, A/V support, Google Workspace / Office training | Résumé bullets | Verified | About |
| Activities Director — ASMC, Ukiah, May 2024 – Jun 2025 | Résumé | Verified | Homepage, about, leadership |
| Founding engineer — ACT / Actober AI, 2026 – present | Repositories `act` + `act-api`, authored by Evode | Verified | Homepage, about |
| AMD ROCm Certified Associate, AMD AI Academy, issued Aug 2026, valid through Aug 2028 | Certificate PDF issued to Evode Manirahari, credential ID `076204dd-5c93-4412-a10d-d09826c213da` | Verified | About → Recognition |

---

## 3. Held back — NOT published, needs a source or approval

These appear on the previous portfolio (evode-manirahari.vercel.app) or were
suggested in the brief. None of them are rendered on this site. Unverified
entries live in `content/experience.ts` under `pendingVerification`, which is
never imported by a component.

| Claim | Where it came from | Problem | Status |
| --- | --- | --- | --- |
| **Reality AI Labs — AI Engineer Intern, Apr–Sep 2024** (ReX career coach, RAG with LangChain/LlamaIndex + FAISS/Pinecone, W&B eval harness, FastAPI on GCP/AWS, p95 < 300ms) | Previous portfolio | Absent from the Jan 2026 résumé. All metrics uncited. | **Needs Evode approval** |
| **Web3 Labs — Software Engineer Intern, Feb–Jun 2024** (Java/Spring Boot/Hibernate, Kafka, Snowflake on Azure) | Previous portfolio | Absent from the résumé. "80% less manual handling", "~40% faster", "~25% lower latency" have no source. | **Needs Evode approval** |
| **NASA / SETI Institute involvement** — CAMS spectrograph pipeline, ~95% processing-time reduction, 1,200+ issues resolved annually, 27 faculty and 500+ students supported | Previous portfolio | Directly conflicts with the résumé, which describes the same Mendocino College period as front-desk and IT support with no research component. Affiliation claims of this kind must not be published unverified. | **Needs source** |
| **Hanga Pitch Fest 2024 — $15k winner (FunHealth, Kigali)** | Previous portfolio, Awards section | No source. A monetary award is a high-scrutiny claim. | **Needs source** |
| **FunHealth outcomes / health-knowledge improvement metrics** | Previous portfolio | No source, no repository found. | **Needs source** |
| **NVIDIA Summer Bridge Program, 2024** | Previous portfolio | No certificate or confirmation found. | **Needs source** |
| **2× National Bank of Rwanda Schools Quiz Challenge winner, 2020 & 2021** | Previous portfolio | No source. | **Needs source** |
| **ColorStack member · NSBE member** | Previous portfolio | Plausible and low-risk, but unconfirmed. | **Needs Evode approval** |
| **CodePath Technical Interview Prep (Intermediate), 2025** | Previous portfolio | A CodePath resume-template file exists locally; no completion certificate found. | **Needs source** |
| **iAccelerator award** | Named in the project brief | No evidence found in any repository, résumé, or the previous portfolio. | **Needs source** |
| **"3 Internships" stat** | Previous portfolio About section | Depends entirely on the three entries above. | **Needs Evode approval** |
| **CodeQuest Jr., Multi-Agent Cybersecurity Platform** | Named in the project brief for the archive | No matching repository found under the GitHub account. | **Needs source** |
| Mendocino College enrolment / credential | Implied by ASMC and SSCCC roles | Dates and credential unknown, so no education entry was created. | **Needs Evode approval** |

**To publish any of these:** add the entry to `experience`, `leadership`, or
`recognition` in `content/`, remove it from `pendingVerification`, and update
its row here to `Verified` with the source.

---

## 4. Project claims — ACT / Actober

| Claim | Source | Status |
| --- | --- | --- |
| Loop runs end to end against the deployed backend at `act-api-evode.fly.dev` | `act/README.md`; endpoint returned HTTP 200 on 2026-08-06 | Verified |
| 444 tests across 47 test modules | Counted in `act-api/tests` | Verified |
| 26 Alembic migrations | Counted in `act-api/alembic/versions` | Verified |
| Postgres durable job queue — SKIP LOCKED, heartbeat reclaim, backoff, in-process, no Redis | `act/CLAUDE.md`, `act-api/app/services/job_queue.py` | Verified |
| Per-object account scoping; cross-tenant IDs 404 across the API | `act-api/app/services/scoping.py`, `tests/test_account_scoping.py` | Verified |
| Supabase invite-only auth, server-side JWKS ES256/RS256 + legacy HS256 verification | `act-api/app/services/supabase_auth.py` | Verified |
| Encrypted session persistence, key in OS keychain; login overlay preserves in-progress capture | `act` mobile `secureSessionStorage.ts`, auth gate model | Verified |
| Knowledge surface refuses live-diagnosis queries | `act/CLAUDE.md` guidance boundary; `/library/ask` behaviour | Verified |
| **Zero real field capture; 22 recordings were app tests; 5 cards were AI-fabricated and deleted; corpus reset to zero** | `act-api/evals/exp1_evidence_value/FINDINGS.md` (2026-07-31 audit) | Verified — and published deliberately |
| No paying customers, no signed pilot, no measured callback effect | Same audit | Verified |
| Backend repository link | `act-api` is **private**; only the public `act` repository is linked | Verified |
| Mobile and admin screenshots | Not captured | **Needs Evode** — see §7 |

---

## 5. Project claims — SecondLine, DrCrop, FocusGate

### SecondLine

| Claim | Source | Status |
| --- | --- | --- |
| Pass rate 88% → 94%; unsafe actions 1 → 0 | `SecondLine/README.md` §3, local harness results table | Verified |
| 16 scenarios, 6 grading dimensions | `eval/scenarios.py` (16 entries), `eval/harness.py` `DIMENSIONS` | Verified |
| 11 typed tools with a shared `dispatch()` | `server/agent.py` | Verified |
| Allergen guard enforced at the tool layer; blocked the lily order and was proved gone on re-run | `README.md`, `server/agent_policy.json` | Verified |
| First automated-test run scored 0%; cause was the missing Daily transport; agent went silent → conversational | `README.md` §3 | Verified |
| Built at the YC Voice Agents Hackathon on the Pipecat Field & Flower starter | `README.md` §4, LICENSE (BSD-2-Clause portions) | Verified |
| Starter-vs-built table | `README.md` §4, reproduced faithfully | Verified |
| Demo dialogue quoted in the case study | `DEMO_SCRIPT.md` — labelled on the page as the scripted demo, **not** a captured transcript | Verified |
| Project site link | https://evode-manirahari.github.io/SecondLine/ returned HTTP 200 on 2026-08-06 | Verified |
| **Solo or team build?** | The README uses "we"; the demo script closes in the first person singular. The case study describes what was built without claiming exclusivity. | **Needs Evode approval** — if teammates were involved, add credits to the `Team` row in `content/case-studies.ts` |
| Live phone number (+1 888 778 8643) | In the repository, but a Twilio trial number | **Deliberately not published** — a dead number is worse than no number. Publish only if confirmed live. |
| Market statistics (62% of calls missed, 85% never call back) | Quoted in the repo README without a primary citation | **Not published as numbers** — the case study states the effect qualitatively |

### DrCrop

| Claim | Source | Status |
| --- | --- | --- |
| Six-stage pipeline: intake → ExG → row-aware mask → zoning → export → verify | `DrCrop/README.md`, `src/droneToSpray/` | Verified |
| PNG encoder, PDF builder, KML and GeoJSON writers hand-rolled on Node `zlib`; zero new npm dependencies | `README.md`, `CLAUDE.md`, `src/droneToSpray/*.js` | Verified |
| Eight test suites | Counted in `DrCrop/test` | Verified |
| Verification endpoint diffs two flights for acres spared | `POST /api/drone/verify` | Verified |
| Live demo link | https://drcrop-demo.fly.dev/demo returned HTTP 200 on 2026-08-06 | Verified |
| **Synthetic orthomosaics only; no real flight; no grower has used it** | `CLAUDE.md` ("Synthetic-only today") | Verified — published as a limit |
| Pilot programme, free audits, PCA partnership, pricing | On the DrCrop site and in `docs/ops-prereqs.md`; the funnel is gated on a signed PCA partner and Part 107 | **Not published** — the case study mentions the licensing prerequisites without claiming a pilot exists. Confirm status before adding. |
| Dollar-savings figures produced by the zoning stage | Arithmetic on synthetic inputs | **Not published as results** — described as such in "What remains unproven" |

### FocusGate

| Claim | Source | Status |
| --- | --- | --- |
| Server-side relay; triage on content, not sender | `FocusGate/README.md` | Verified |
| Fail-open on every error, timeout, and ambiguous verdict | `README.md` flow diagram, `src/triage.ts` | Verified |
| Deterministic keyword floor ahead of the model | `README.md` ("contains 'urgent'" branch, no AI) | Verified |
| Block state machine, hold, once-per-sender auto-reply, end-of-block digest | `README.md`, `src/routes/blocks.ts`, `src/store.ts` | Verified |
| Twilio webhook signature verification in production | `README.md` security notes, `src/twilio.ts` | Verified |
| Unit tests for triage and the block state machine (Vitest) | `test/triage.test.ts`, `package.json` | Verified |
| **Concierge test never run; no student has used it** | `README.md` ("run this before scaling anything") | Verified — published as a limit |
| "Working students described the pain unprompted" | `README.md` | **Needs Evode approval** — informal user research, no written notes located |

---

## 6. Archive entries

All seven are repositories authored by Evode. Forks were checked via the GitHub
API and excluded (`OpenShell`, `humane-tech-framework`,
`Ycombinator-Cactus-Deepmind`, `NeMo-Agent-Toolkit`, `gstack`, `gbrain`,
`openclaw` are forks and do **not** appear).

| Entry | Source | Status |
| --- | --- | --- |
| FieldCard | `fieldcard` repo + README | Verified |
| eyebrain | `eyebrain` repo README (Conversational AI Hackathon @ YC) | Verified |
| Agentbase | `Agentbase` repo README | Verified |
| glowing-robot | `glowing-robot` repo README | Verified |
| ruhagoAI | `RuhagoAI` repo README | Verified |
| Tracer | `authentisity/tracer` repo README; described as a team build | Verified — confirm the org repository will stay public |
| FixGuide AI | `fixguide-ai` repo; hackathon context from project notes | **Needs Evode approval** — repo has no README; the description comes from session notes rather than the repository |

---

## 7. Missing assets — visible placeholders on the site

These render as labelled "pending" blocks rather than being faked. Each one is
a real gap a visitor can see.

| Asset | Path | What to do |
| --- | --- | --- |
| **Résumé PDF** | `public/Evode-Manirahari-Resume.pdf` | A placeholder PDF is in place so no link 404s. Replace it with the real engineering résumé, keep the filename, then set `resumeStatus = "available"` in `content/profile.ts` to remove the "pending" notices. **The résumés found locally are targeted at event-programming and IT-support roles — an engineering résumé should be written before this ships.** |
| Hero portrait | `public/images/profile/evode-manirahari.jpg` | Documentary-style photograph, 4:5. Set `available: true` in `content/media.ts`. |
| About portrait | `public/images/profile/evode-manirahari-about.jpg` | Second photograph, 3:2. Same flag. |
| ACT product screenshots | `public/images/projects/` | The ACT case study currently lists the five screens as text. Screenshots would strengthen it. |
| Canonical site URL | `siteUrl` in `content/profile.ts` | Set to `https://evodemanirahari.com` (apex canonical, www redirects to it). If the served domain ever changes, change it here — it drives canonicals, the sitemap, robots, and Open Graph. |

---

## 8. Claims deliberately *not* made

Worth recording, because their absence is a decision:

- No work authorization, visa, or relocation claim.
- No customers, users, revenue, adoption, or traction claim for any project.
- No "3 internships" or aggregate stat that depends on unverified entries.
- No third-party market statistics presented as fact without a citation.
- No live phone number that might be disconnected.
- No skill ratings, percentages, or proficiency bars.
- No claim that any project is a company.
