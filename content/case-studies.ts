/**
 * Long-form case-study content.
 *
 * Each case study composes a different sequence of block types, so the four
 * pages read differently rather than filling one template four times.
 * A section is only included when there is real material for it.
 */

export type DiagramId =
  | "act-loop"
  | "act-architecture"
  | "act-trust"
  | "secondline-callflow"
  | "secondline-tools"
  | "drcrop-pipeline"
  | "drcrop-zones"
  | "focusgate-routing"
  | "focusgate-decision";

export type Block =
  | { kind: "prose"; title: string; paragraphs: string[] }
  | { kind: "list"; title: string; lead?: string; items: string[] }
  | {
      kind: "numbered";
      title: string;
      lead?: string;
      items: { term: string; detail: string }[];
    }
  | { kind: "diagram"; id: DiagramId; title: string; caption: string }
  | {
      kind: "metrics";
      title: string;
      lead?: string;
      rows: { label: string; before: string; after: string }[];
      footnote?: string;
    }
  | { kind: "statement"; text: string; attribution?: string }
  | {
      kind: "dialogue";
      title: string;
      lead: string;
      turns: { speaker: string; line: string }[];
      footnote?: string;
    }
  | {
      kind: "screens";
      title: string;
      lead?: string;
      items: { label: string; note: string }[];
    }
  | {
      kind: "table";
      title: string;
      lead?: string;
      columns: [string, string];
      rows: [string, string][];
    };

export type CaseStudy = {
  slug: string;
  thesis: string;
  meta: { label: string; value: string }[];
  intro: string[];
  blocks: Block[];
  contribution: { lead: string; items: string[] };
  unproven: string[];
  lessons: { title: string; body: string }[];
};

export const caseStudies: CaseStudy[] = [
  /* ------------------------------------------------------------------ ACT */
  {
    slug: "actober",
    thesis:
      "Capture a senior technician's reasoning from a real job, turn it into one reviewed lesson, and measure whether it changed anything.",
    meta: [
      { label: "Role", value: "Solo engineer and product owner" },
      { label: "Status", value: "In active development" },
      { label: "Timeline", value: "2026 — present" },
      { label: "Team", value: "Solo build" },
      { label: "Surfaces", value: "iOS/Android client · web admin · HTTP API" },
    ],
    intro: [
      "Most of the workforce does not sit at a desk, and almost none of what those people know is written down. In HVAC the cost of that shows up in numbers a service manager already tracks: callbacks, first-time-fix rate, and how long a new hire takes to become billable.",
      "ACT starts from a narrower version of the problem. A company's best technician is retiring in a year. The shortcuts they use on that company's own install base — the accounts they have serviced for a decade, the failure modes they recognise by sound — are not in any training catalogue and never will be. ACT captures those from real jobs, compiles them into reviewed lessons, and tracks whether they move callbacks and ramp.",
    ],
    blocks: [
      {
        kind: "diagram",
        id: "act-loop",
        title: "The loop",
        caption:
          "Seven stages. Two of them are human gates — the expert answers, and a lead technician approves — and the system cannot skip either.",
      },
      {
        kind: "prose",
        title: "The problem",
        paragraphs: [
          "Senior technicians are rarely willing to write documentation after a full day of calls, and the thing worth documenting is usually invisible to them — it is the part they stopped noticing they knew. Ask them to write it down and you get a procedure. Ask them the right question, ten minutes after the job, about a specific moment you can point at, and you get the reasoning.",
          "So the hard problem is not summarisation. It is knowing which twenty seconds of a two-hour recording carried judgment, and asking about that specific moment while it is still fresh.",
        ],
      },
      {
        kind: "numbered",
        title: "Users",
        lead: "Four roles, three of them with completely different tolerance for friction.",
        items: [
          {
            term: "Senior technician",
            detail:
              "Captures the job and answers debrief questions. Will abandon anything that costs more than a few seconds mid-job or more than a couple of minutes after.",
          },
          {
            term: "Lead technician",
            detail:
              "Reviews and approves. Their signature is what makes a lesson trustworthy inside the company.",
          },
          {
            term: "Apprentice",
            detail:
              "Learns from approved cards. Needs company-specific judgment, not textbook theory.",
          },
          {
            term: "Operator",
            detail:
              "Buys it. Cares about callbacks, first-time-fix, and time to billable.",
          },
        ],
      },
      {
        kind: "list",
        title: "Constraints",
        lead: "These shaped nearly every technical decision in the product.",
        items: [
          "Gloves and one hand. Capture is a single large button, and marking a moment is one tap with no dialog.",
          "Bad connectivity. Uploads retry and resume; recording never blocks on the network.",
          "Not surveillance. Consent state is selected before recording, and a do-not-share setting blocks capture entirely.",
          "Customer footage. Redaction and purge paths are product requirements, not a compliance afterthought.",
          "No live diagnosis. The system answers only from published, approved cards and refuses live-diagnosis-shaped questions by design.",
        ],
      },
      {
        kind: "numbered",
        title: "Product decisions",
        items: [
          {
            term: "Ask after the job, not during it",
            detail:
              "An interruption mid-diagnosis is both dangerous and useless — the technician is concentrating. The debrief happens afterwards, anchored to a timestamp the technician themselves marked.",
          },
          {
            term: "Nothing publishes itself",
            detail:
              "Automation runs between approval gates, never around them. Compilation is automatic; publication is not.",
          },
          {
            term: "Footage is the proof",
            detail:
              "Every card stays grounded in the clip it came from, so a disagreement can be settled by watching rather than arguing.",
          },
          {
            term: "Keep the moments that carry judgment",
            detail:
              "Not everything is worth storing. The targets are sensory cues, counterfactuals, thresholds, safety boundaries, and verification steps — the things a novice would not know to notice.",
          },
        ],
      },
      {
        kind: "diagram",
        id: "act-architecture",
        title: "Architecture",
        caption:
          "The mobile client never talks to storage or the model directly. Processing is a durable queue in Postgres — no Redis, no separate worker fleet to operate.",
      },
      {
        kind: "screens",
        title: "Interface surfaces",
        lead: "Five screens carry the product. Screenshots to be added — see CONTENT_REVIEW.md.",
        items: [
          {
            label: "Capture",
            note: "Record, select consent state, drop moment marks one-handed, queue uploads with retry and resume.",
          },
          {
            label: "Debrief",
            note: "Pending questions with a waiting badge; the expert answers by voice or text and can correct the transcript inline.",
          },
          {
            label: "Review",
            note: "Lead technician approves, edits, or rejects each proposed moment before anything compiles.",
          },
          {
            label: "Learn",
            note: "Apprentice library of published cards with quiz events and an honest empty state.",
          },
          {
            label: "Outcomes",
            note: "First-time-fix, callback, and time-to-diagnosis capture, logged against the real job.",
          },
        ],
      },
      {
        kind: "diagram",
        id: "act-trust",
        title: "Trust boundaries",
        caption:
          "Three enforcement points sit below the product surface: consent at capture, account scoping at every read, and a human approval gate before publication.",
      },
      {
        kind: "prose",
        title: "Trust and safety",
        paragraphs: [
          "Per-account scoping is enforced per object, not per list query. A recording, moment, job, question, answer, or card identifier belonging to another account returns 404 across the entire API, and list routes cannot enumerate another tenant's identifiers. Tests assert this rather than assuming it.",
          "Authentication is invite-only Supabase with server-side token verification — JWKS with ES256 and RS256, plus legacy HS256 — and the backend maps the token's email onto its own user row rather than trusting any client-supplied actor identifier. Sessions persist encrypted, with the key in the OS keychain, and a session lost mid-recording overlays the login screen on top of the still-mounted capture stack so an in-progress capture is never destroyed.",
          "The knowledge surface refuses live diagnosis. Answers come only from published, approved cards, with citations back to the footage.",
        ],
      },
      {
        kind: "prose",
        title: "Testing and evaluation",
        paragraphs: [
          "The backend carries 444 tests across 47 modules, covering the capture pipeline, the job queue under concurrency, account scoping, consent, redaction, grounding, card provenance, and evidence eligibility. Schema changes go through 26 Alembic migrations.",
          "Evaluation is separate from testing and matters more. The first experiment asked whether the captured corpus carried any evidentiary value at all — and the answer was no. That result is below.",
        ],
      },
      {
        kind: "prose",
        title: "Results",
        paragraphs: [
          "The full loop runs end to end against the deployed backend: record on a phone, mark a moment, upload with retry, extract frames and transcript, propose moments, generate debrief questions, answer by voice, compile a card, approve it in the admin, read it in the apprentice library, and log the job outcome.",
          "That is a working system. It is not evidence that the system works — those are different claims, and the section below is the one I would want a hiring manager to read.",
        ],
      },
    ],
    contribution: {
      lead: "Solo build across four surfaces. Concretely:",
      items: [
        "Designed the capture workflow and implemented the React Native recording experience — consent gating, one-tap moment marking sized for gloves, and upload queueing with retry and resume.",
        "Built typed API clients for the mobile app and wired token attachment across every call, including the audio-answer upload, while deliberately leaving the presigned object-storage PUT headerless.",
        "Designed the backend data model — jobs, recordings, marks, moments, frames, transcript segments, elicitation questions, expert answers, knowledge objects, training events, and job outcomes.",
        "Implemented the FastAPI service and its Postgres-backed durable job queue using SKIP LOCKED with heartbeat reclaim and backoff, worked in-process rather than adding Redis and a worker fleet.",
        "Connected the media pipeline: object storage for video and frames, speech-to-text transcription, frame extraction around marks, and model-ranked moment detection.",
        "Implemented per-object account scoping across the whole API and the invite-only authentication path, including server-side token verification and encrypted session persistence.",
        "Built the Next.js admin: review queue, debrief answers, inline transcript correction, in-browser voice recorder, and the publish gate.",
        "Deployed the backend, then ran the audit that invalidated my own numbers.",
      ],
    },
    unproven: [
      "No real field capture. A July 2026 audit of the production corpus found that the 22 recordings were app tests rather than field jobs — 11 failed at upload, 3 failed processing, and most of the rest had no usable speech. Total usable footage was about five minutes.",
      "The five published lesson cards were fabricated by the compile pipeline from a bare mark timestamp with no transcript and no genuine expert answer. They were permanently deleted; the production corpus is now zero. This was the exact failure mode the product exists to prevent, and finding it in my own system is the reason I no longer trust a dashboard I have not audited.",
      "No paying customers, no signed pilot, and no measured effect on callbacks or ramp. Every outcome claim in the product is currently a hypothesis with instrumentation attached.",
    ],
    lessons: [
      {
        title: "A dashboard will happily count your own testing",
        body: "The usage numbers were real numbers. They were also entirely me. Instrumentation without a definition of what counts as a genuine episode measures activity, not value.",
      },
      {
        title: "A compile step that cannot fail will invent",
        body: "Given a timestamp and nothing else, the pipeline produced plausible HVAC guidance. The fix is not a better prompt — it is an eligibility gate that refuses to compile when the evidence is not there.",
      },
      {
        title: "Durable queues in Postgres are usually enough",
        body: "SKIP LOCKED with heartbeat reclaim and backoff handled everything a one-person product needed, and removed an entire piece of infrastructure from the operational surface.",
      },
    ],
  },

  /* ----------------------------------------------------------- SecondLine */
  {
    slug: "secondline",
    thesis:
      "Answer the calls a small business misses, and make every call an input to the next version of the agent.",
    meta: [
      { label: "Event", value: "YC Voice Agents Hackathon" },
      { label: "Status", value: "Hackathon build, deployed" },
      { label: "Timeline", value: "One day, May 2026" },
      { label: "Partners", value: "Pipecat · Cekura · NVIDIA · AWS · Twilio" },
      { label: "Surfaces", value: "Phone line · WebRTC · owner dashboard" },
    ],
    intro: [
      "A small business that misses a call usually loses the customer outright. Most callers do not leave a voicemail and do not try again — they call the next shop on the list. For a florist or a clinic, the phone is a large share of revenue, and the missed-call problem is a revenue problem wearing a support-tooling costume.",
      "SecondLine is the number a business forwards its missed calls to. It answers over a real phone line, recognises returning callers, takes the order through typed tools, and files a structured task for the owner. The part I cared about is the last one: it tests itself, scores the failures, and rewrites its own policy.",
    ],
    blocks: [
      {
        kind: "diagram",
        id: "secondline-callflow",
        title: "Call flow",
        caption:
          "A real call and an automated test call take the same path through the agent. The evaluation harness and the live bot share one dispatch layer, so a test exercises production code.",
      },
      {
        kind: "prose",
        title: "The core decision: typed tools, not a trusted model",
        paragraphs: [
          "The model never holds business state. Customers, allergies, past orders, inventory, and owner tasks live in a backend module behind eleven typed tools and a single dispatch function. If the model wants to know what someone ordered last time, it calls a tool; it cannot recall, approximate, or invent it.",
          "That one decision is what made the safety guarantees possible. Rules like the allergen guard live at the tool layer, below the model, so they hold regardless of what the model was persuaded to say.",
        ],
      },
      {
        kind: "diagram",
        id: "secondline-tools",
        title: "Where safety is enforced",
        caption:
          "Validation sits between the model's intent and the business state. A blocked call returns a refusal and safe alternatives rather than failing silently.",
      },
      {
        kind: "dialogue",
        title: "The scenario that mattered",
        lead: "From the demo script — a returning caller, recognised by caller ID, with an allergy already on file.",
        turns: [
          {
            speaker: "Caller",
            line: "Hi — same as last time, but no lilies, my mom's allergic.",
          },
          {
            speaker: "Agent",
            line: "Welcome back! I've got your usual — a dozen red roses, and I'll keep it lily-free for your mom. Want that for pickup?",
          },
          { speaker: "Caller", line: "Perfect, pickup at five." },
        ],
        footnote:
          "This is the scripted demo scenario, not a captured production transcript. The same scenario runs in the evaluation harness as the allergy trap.",
      },
      {
        kind: "prose",
        title: "The self-improvement loop",
        paragraphs: [
          "Sixteen scenarios — new orders, repeat callers, the allergy trap, refunds, escalation, manager requests — run against a simulated caller. Each call is graded on six dimensions: task completion, correct tool use, memory accuracy, escalation behaviour, hallucination, and latency.",
          "Failures are not just reported. The improvement engine classifies each one into a validation rule, an escalation rule, a prompt patch, or a memory update, writes it into the agent's policy file, and re-runs the suite to prove the change landed.",
        ],
      },
      {
        kind: "metrics",
        title: "Before and after",
        lead: "Local evaluation harness, sixteen scenarios, open-weight model under test.",
        rows: [
          { label: "Pass rate", before: "88%", after: "94%" },
          { label: "Unsafe actions", before: "1", after: "0" },
        ],
        footnote:
          "The unsafe action was the agent about to add a lily bouquet for a caller with a recorded lily allergy. The loop wrote a validation rule that blocks it at the tool layer and proved it gone on re-run.",
      },
      {
        kind: "statement",
        text: "The first automated voice-testing run scored zero percent. Every transcript said the same thing: the main agent did not speak.",
      },
      {
        kind: "prose",
        title: "The production bug that only automated calls could find",
        paragraphs: [
          "That zero was not a scoring artefact. The deployed bot handled the Twilio websocket transport and local WebRTC, but not the Daily transport the hosting platform uses for WebRTC sessions — so on those sessions it silently constructed no pipeline at all and sat there. Local tests could not see it, because locally the transport was different.",
          "Adding the missing transport case and redeploying took the agent from silent to fully conversational, verified by the same automated calls that caught it. Find, fix, re-run, on the real deployment.",
        ],
      },
      {
        kind: "table",
        title: "Starter template versus what was built",
        lead: "The project began from the Pipecat Field & Flower starter. The split is worth stating plainly.",
        columns: ["Already existed", "Built during the hackathon"],
        rows: [
          [
            "Pipeline skeleton, speech-to-text and text-to-speech wiring, Twilio serializer",
            "Business brain with persistent caller-ID memory: customers, allergies, past orders, transcripts, owner tasks",
          ],
          [
            "Local WebRTC and Twilio transports",
            "Daily transport support — the fix the automated testing surfaced",
          ],
          [
            "Hosted model and speech endpoints",
            "Eleven typed tools and a shared dispatch used by both the live bot and the harness",
          ],
          [
            "Evaluation platform and its API",
            "Sixteen-scenario harness, six-dimension grader, and the failure-to-fix improvement engine",
          ],
          [
            "—",
            "Allergen safety guard at the tool layer, owner dashboard, provider switching, deployment, and project site",
          ],
        ],
      },
    ],
    contribution: {
      lead: "Built during a single-day hackathon on top of a starter pipeline. Concretely:",
      items: [
        "Built the business backend and the eleven typed tools, with one shared dispatch function used by both the live bot and the evaluation harness so tests exercise production code paths.",
        "Implemented the allergen safety guard at the tool layer, below the model, along with safe-alternative suggestions when an order is blocked.",
        "Wrote the sixteen-scenario evaluation harness with a simulated caller and a six-dimension grader.",
        "Wrote the improvement engine that classifies each failure into one of four fix types, patches the agent policy file, and re-runs to prove the change.",
        "Integrated the automated voice-testing platform through its REST API — agent creation, scenario generation, live WebRTC test calls, and result retrieval.",
        "Diagnosed and fixed the production transport bug that made the deployed agent silent on hosted WebRTC sessions.",
        "Built the owner dashboard — task queue, transcripts, and the before-and-after pass rate — and deployed the agent behind a real phone number.",
      ],
    },
    unproven: [
      "No business has used it. This was a one-day hackathon build, and the evaluation results come from a simulated caller, not from real customers on a real line.",
      "The pass-rate improvement is measured on the local harness against sixteen scenarios I designed. It is a real before-and-after on a fixed suite, not a claim about general voice-agent quality.",
      "Owner SMS was built and wired but ran on a trial phone number that cannot send messages, so notifications surfaced as dashboard tasks rather than texts.",
    ],
    lessons: [
      {
        title: "Automated calls against the real deployment find what local tests cannot",
        body: "The silent-agent bug existed only under a transport that local development never used. No amount of unit testing would have surfaced it; one automated voice call did, immediately.",
      },
      {
        title: "Put the guarantee below the model",
        body: "An allergen rule in a prompt is a suggestion. The same rule in the tool layer is a guarantee, and it survives every future prompt change.",
      },
      {
        title: "A score of zero is information",
        body: "The instinct is to assume the harness is broken. Reading the transcripts instead turned a scoring failure into a production fix within the hour.",
      },
    ],
  },

  /* --------------------------------------------------------------- DrCrop */
  {
    slug: "drcrop",
    thesis:
      "Convert one drone flight into a decision a grower can act on, and then verify with a second flight whether the decision was right.",
    meta: [
      { label: "Role", value: "Solo engineer" },
      { label: "Status", value: "Deployed prototype, synthetic data" },
      { label: "Timeline", value: "2026" },
      { label: "Domain", value: "Northern California vineyards" },
      { label: "Surfaces", value: "HTTP API · web demo console · file exports" },
    ],
    intro: [
      "Vineyards spray whole blocks because they cannot see which rows need it. Drone imagery of the block already exists and is cheap to collect; what does not exist is the layer that turns that imagery into a decision an applicator can follow and a grower can check afterwards.",
      "DrCrop is that layer. One flight produces a map of where to spray, where to scout, and where to skip — with acreage attached — plus the export formats the people downstream actually use, and a verification pass that diffs a later flight against the first.",
    ],
    blocks: [
      {
        kind: "diagram",
        id: "drcrop-pipeline",
        title: "Six stages, one flight",
        caption:
          "Every stage is deterministic and independently testable. The model sits outside this path, writing the grower-facing briefing over a plan it did not choose.",
      },
      {
        kind: "prose",
        title: "The stage that makes it trustworthy",
        paragraphs: [
          "The vegetation index itself is straightforward — excess green, computed per pixel and thresholded into a green mask. Anyone can produce that. The problem is that in a vineyard, green is mostly vines, and vines are supposed to be there.",
          "So the pipeline classifies row geometry first and separates under-vine canopy strips from inter-row strips, scoring weed pressure between the vines rather than under the canopy. Without that step a skip zone is just a place where the canopy happened to be dense, and no grower should act on it.",
        ],
      },
      {
        kind: "diagram",
        id: "drcrop-zones",
        title: "Management zones",
        caption:
          "Each cell buckets into spray, scout, or skip with acreage and estimated material saved. Schematic — the live pipeline renders these over the actual orthomosaic.",
      },
      {
        kind: "numbered",
        title: "Exports, because the decision leaves the software",
        lead: "Three different people need the same answer in three different formats.",
        items: [
          {
            term: "PDF",
            detail:
              "For the grower — the overlay map and a per-zone summary in one page they can read without an account.",
          },
          {
            term: "KML",
            detail:
              "For the drone pilot and the applicator, so the zones open in the mapping tools they already fly with.",
          },
          {
            term: "GeoJSON",
            detail:
              "For the licensed advisor's own systems, as a plain feature collection with no vendor lock.",
          },
        ],
      },
      {
        kind: "prose",
        title: "Implementation notes",
        paragraphs: [
          "The raster and export work is written from scratch on Node's built-in compression: a pure-JavaScript PNG encoder for the orthomosaic and overlay, a hand-rolled PDF builder, and KML and GeoJSON writers. The drone module added zero npm dependencies.",
          "That was a deliberate constraint rather than a stunt. Geospatial toolchains are heavy, platform-specific, and slow to install, and the whole pipeline needed to run on a small deployed instance and stay reproducible. The stages are separated so each one — index, mask, zoning, overlay, encoder, exporters, verification diff — is independently testable, and eight test suites cover them along with the risk engine and adapters.",
        ],
      },
      {
        kind: "prose",
        title: "Closing the loop",
        paragraphs: [
          "The verification endpoint takes two flight identifiers and diffs them, reporting acres spared and zones that improved. This is the part that separates a decision-support product from a map: a map tells you what the field looked like, and a diff tells you whether the recommendation was any good.",
          "The briefing layer sits on top, writing a plain-language explanation grounded in the deterministic plan and linked history — with a local fallback when no model key is present, so the pipeline never depends on an external service to produce its output.",
        ],
      },
    ],
    contribution: {
      lead: "Solo build. Concretely:",
      items: [
        "Built the six-stage pipeline: orthomosaic intake, excess-green vegetation index, row-aware masking, management zoning with acreage and cost estimates, export, and before/after verification.",
        "Implemented the row-aware mask that separates canopy strips from inter-row strips — the step that makes a skip recommendation defensible.",
        "Wrote a pure-JavaScript PNG encoder, a PDF builder, and KML and GeoJSON writers on Node's zlib, keeping the module dependency-free.",
        "Built the synthetic orthomosaic generator with a ground-truth grid so the pipeline could be validated end to end before any real flight existed.",
        "Implemented the verification diff that compares two flights and reports acres spared and zones improved.",
        "Built the HTTP API, the demo console, the grower-facing site, and a validated lead-capture endpoint with redacted logging and fire-and-forget notification that cannot fail the request.",
      ],
    },
    unproven: [
      "No real drone flight has been processed. Every result comes from a deterministic synthetic vineyard orthomosaic with a known ground-truth grid, which validates pipeline shape and nothing about real-world accuracy.",
      "No grower has used it and no acreage has been sprayed or skipped on its recommendation. The savings figures the zoning stage produces are arithmetic on synthetic inputs.",
      "Operating this for real requires things software cannot supply: a licensed advisor signing every prescription, drone certification, and insurance. Those are prerequisites, not details.",
    ],
    lessons: [
      {
        title: "Build the synthetic case first",
        body: "A deterministic synthetic orthomosaic with a known answer meant the pipeline could be validated, tested, and demonstrated without waiting on weather, hardware, or a grower's permission.",
      },
      {
        title: "Domain structure beats model capacity",
        body: "The accuracy that matters here came from encoding row geometry, not from a bigger model. Knowing that vines are supposed to be green is the entire insight.",
      },
      {
        title: "Ship the format people already use",
        body: "A prescription nobody can open is not a prescription. The export writers were as important as the analysis.",
      },
    ],
  },

  /* ------------------------------------------------------------ FocusGate */
  {
    slug: "focusgate",
    thesis:
      "Do Not Disturb decides on sender. The decision that actually matters is on content — so move it to a server and let it fail toward delivery.",
    meta: [
      { label: "Role", value: "Solo engineer" },
      { label: "Status", value: "v1 relay backend, unvalidated" },
      { label: "Timeline", value: "2026" },
      { label: "Surfaces", value: "Inbound webhook · operator dashboard" },
    ],
    intro: [
      "A working student sits down to study. Their manager might text about a shift that pays their rent, or might text nothing important for three hours. Focus mode blocks the app, so both are silenced; turning it off means checking the phone every ten minutes. Neither option is acceptable, so they pick the worse one and stay distracted.",
      "The operating system already does app blocking well and for free. What it cannot do is read the message. FocusGate owns exactly that gap and nothing else.",
    ],
    blocks: [
      {
        kind: "diagram",
        id: "focusgate-routing",
        title: "Message routing",
        caption:
          "Work messages flow through a number the relay controls. Triage happens server-side, which is why the same backend works on both mobile platforms with no notification interception.",
      },
      {
        kind: "prose",
        title: "Why a relay and not an app",
        paragraphs: [
          "The obvious build is a native app that intercepts notifications and decides which to show. On iOS that is not permitted, and on Android it is fragile. More importantly, it duplicates something the platform already does better.",
          "Routing the messages through a number the system controls moves the decision to a server, where it is one code path for every platform, inspectable by an operator, and testable without a device. The trade is that the student has to tell their manager to use a different number — which is precisely the assumption that has not been validated yet.",
        ],
      },
      {
        kind: "diagram",
        id: "focusgate-decision",
        title: "The urgency decision",
        caption:
          "Four paths, three of which deliver. The deterministic keyword floor runs ahead of the model, so the most urgent cases never depend on inference being available.",
      },
      {
        kind: "statement",
        text: "Every uncertain path biases toward delivery. A false interrupt is mildly annoying; a missed shift offer costs money and trust, and trust is the whole product.",
      },
      {
        kind: "prose",
        title: "Fail open, deliberately",
        paragraphs: [
          "The system fails open on every error, timeout, and ambiguous verdict. That is an unusual default for a filter — most filters fail closed and drop the uncertain case — and it comes directly from the asymmetry in the cost of the two mistakes.",
          "It also sets the product's ceiling honestly. FocusGate can only be as valuable as it is trusted, and trust is destroyed by exactly one missed urgent message. Optimising the model for precision at the expense of that would be optimising the wrong thing.",
        ],
      },
      {
        kind: "numbered",
        title: "What the backend does",
        items: [
          {
            term: "Block state machine",
            detail:
              "Study blocks start and stop from an operator dashboard. Outside a block nothing is triaged at all — messages forward normally.",
          },
          {
            term: "Hold and auto-reply",
            detail:
              "A held message auto-replies once per sender, so the manager knows the student is not ignoring them and does not escalate.",
          },
          {
            term: "End-of-block digest",
            detail:
              "Everything held is delivered as a single summary when the block ends.",
          },
          {
            term: "Webhook verification",
            detail:
              "Inbound webhook signatures are verified in production against the public base URL, so the relay cannot be driven by forged requests.",
          },
        ],
      },
      {
        kind: "prose",
        title: "The test that has not been run",
        paragraphs: [
          "The pain is real — working students described it unprompted. What is unproven is whether they will route their texts through a different number and then trust the result enough to stop checking their phone.",
          "That is a concierge test with one real student and their real manager, not a codebase. It is written up in the repository as the next step, and until it runs, everything here is a well-argued hypothesis with a working implementation attached.",
        ],
      },
    ],
    contribution: {
      lead: "Solo build. The most valuable decision was about scope rather than code:",
      items: [
        "Made the call to relay rather than block — identifying that the operating system already owns app blocking and that content-level judgment was the only unclaimed gap.",
        "Designed and implemented the triage path: a deterministic keyword floor ahead of the model, a model verdict for the ambiguous middle, and fail-open behaviour on every error and timeout.",
        "Built the block state machine, held-message queue, once-per-sender auto-reply, and end-of-block digest.",
        "Implemented the inbound webhook handler with production signature verification against the configured public base URL.",
        "Built the operator dashboard for starting and stopping blocks and inspecting what the triage decided and why.",
        "Wrote unit tests for triage and the block state machine, and scoped the repository explicitly for a concierge validation test rather than for scale.",
      ],
    },
    unproven: [
      "The concierge test has not been run. No student has routed real messages through it during a real study block.",
      "Triage quality has not been measured against real messages — only against unit tests I wrote from my own assumptions about what urgent looks like.",
      "The adoption assumption is the weakest link and I know it: asking someone to tell their manager to use a different number is a real cost, and it may be the thing that kills the product rather than any classification error.",
    ],
    lessons: [
      {
        title: "Name the constraint before choosing the architecture",
        body: "Once trust was identified as the binding constraint rather than accuracy, fail-open stopped being a compromise and became the specification.",
      },
      {
        title: "Do not rebuild what the platform gives you",
        body: "The temptation was to build a full focus app. Everything except content judgment already existed and worked better than a rewrite would have.",
      },
      {
        title: "Scope the repository to the next question",
        body: "The backend is deliberately small because the next thing to learn is behavioural, not technical. Building for scale first would have been building for a question nobody had answered.",
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
