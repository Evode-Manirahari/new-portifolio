import type { DiagramId } from "@/content/case-studies";
import { Connector, DiagramFrame, Flow, Lane, Legend, Node } from "./parts";

/* ------------------------------------------------------------------ ACT */

export function ActLoop() {
  const stages = [
    { title: "Capture", detail: "One button, gloves on, consent set" },
    { title: "Detect", detail: "Frames, transcript, ranked moments" },
    { title: "Ask", detail: "Expert answers after the job" },
    { title: "Structure", detail: "Card with cue, trap, safety, quiz" },
    { title: "Review", detail: "Lead tech approves or rejects" },
    { title: "Teach", detail: "Apprentice library, cited" },
    { title: "Measure", detail: "Callback and ramp signals" },
  ];
  const human = new Set(["Ask", "Review"]);

  return (
    <DiagramFrame label="The ACT loop, from capture to measurement">
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {stages.map((stage, index) => (
          <li key={stage.title} className="relative">
            <div
              className={`h-full border p-4 ${
                human.has(stage.title)
                  ? "border-accent"
                  : "border-line bg-background"
              }`}
            >
              <p className="t-meta text-muted">{String(index + 1).padStart(2, "0")}</p>
              <p className="t-body mt-2 font-medium">{stage.title}</p>
              <p className="mt-2 text-[0.82rem] leading-snug text-muted">
                {stage.detail}
              </p>
              {human.has(stage.title) && (
                <p className="t-meta mt-3 text-accent-ink">Human gate</p>
              )}
            </div>
          </li>
        ))}
        <li className="border border-dashed border-line p-4">
          <p className="t-meta text-muted">Loop</p>
          <p className="mt-2 text-[0.82rem] leading-snug text-muted">
            Measurement feeds the next capture: which jobs to record, which
            moments were worth keeping.
          </p>
        </li>
      </ol>
    </DiagramFrame>
  );
}

export function ActArchitecture() {
  return (
    <DiagramFrame label="ACT system architecture">
      <div className="grid gap-3 lg:grid-cols-3">
        <Lane title="Clients">
          <Node
            title="React Native · Expo"
            detail="Capture, debrief, review, learn, outcomes"
          />
          <Node title="Next.js admin" detail="Review queue and publish gate" />
        </Lane>

        <Lane title="API — FastAPI, Python" tone="accent">
          <Node title="Typed HTTP routes" detail="Jobs, recordings, moments, knowledge, library" />
          <Node
            title="Durable job queue"
            detail="Postgres SKIP LOCKED, heartbeat reclaim, backoff — worked in-process"
          />
          <Node title="Account scoping" detail="Enforced per object, not per query" />
        </Lane>

        <Lane title="Stores and services">
          <Node title="PostgreSQL" detail="Async SQLAlchemy, 26 migrations" />
          <Node title="Object storage" detail="Video and extracted frames" />
          <Node title="Speech-to-text" detail="Transcript segments at marks" />
          <Node title="Model" detail="Moment ranking and card compilation" />
        </Lane>
      </div>
      <p className="t-meta mt-5 border-t border-line-soft pt-4 text-muted">
        The client never reaches storage or the model directly. Everything
        crosses the API, which is where scoping and consent are enforced.
      </p>
    </DiagramFrame>
  );
}

export function ActTrust() {
  const boundaries = [
    {
      title: "At capture",
      rule: "Consent state is chosen before recording starts. A do-not-share setting blocks capture outright.",
    },
    {
      title: "At every read",
      rule: "Identifiers belonging to another account return 404 across the whole API. List routes cannot enumerate another tenant's IDs.",
    },
    {
      title: "Before publication",
      rule: "A lead technician approves, edits, or rejects. Compilation is automatic; publication never is.",
    },
    {
      title: "At the answer",
      rule: "Questions are answered only from published, approved cards with citations. Live-diagnosis requests are refused by design.",
    },
  ];

  return (
    <DiagramFrame label="ACT trust boundaries">
      <div className="grid gap-px bg-[color:var(--line)] sm:grid-cols-2">
        {boundaries.map((item) => (
          <div key={item.title} className="bg-background p-5">
            <p className="t-meta text-accent-ink">{item.title}</p>
            <p className="t-body mt-3 text-muted">{item.rule}</p>
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}

/* ----------------------------------------------------------- SecondLine */

export function SecondLineCallFlow() {
  return (
    <DiagramFrame label="SecondLine call flow">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr]">
        <Lane title="Inbound">
          <Node title="Phone call" detail="Forwarded missed call over telephony" />
          <Node title="Automated test call" detail="Real WebRTC session from the eval platform" />
        </Lane>

        <div className="hidden items-center justify-center lg:flex">
          <span aria-hidden="true" className="text-muted">
            →
          </span>
        </div>

        <Lane title="Agent pipeline" tone="accent">
          <Node title="Speech to text" detail="Streaming, with turn detection" />
          <Node title="Model" detail="Open-weight by default, provider-switchable" />
          <Node title="Typed tools" detail="Eleven tools, one shared dispatch" />
          <Node title="Text to speech" detail="Back out over the same transport" />
        </Lane>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        <Node title="Business state" detail="Customers, allergies, orders, transcripts" tone="muted" />
        <Node title="Owner task" detail="Structured task filed for every order" tone="muted" />
        <Node title="Eval harness" detail="Same dispatch layer as the live bot" tone="muted" />
      </div>

      <p className="t-meta mt-5 border-t border-line-soft pt-4 text-muted">
        Both inbound paths run the same code. A test call exercises production
        behaviour rather than a mock of it.
      </p>
    </DiagramFrame>
  );
}

export function SecondLineTools() {
  return (
    <DiagramFrame label="Where safety is enforced in SecondLine">
      <Flow>
        <Node
          title="Model intent"
          detail="“Add a lily bouquet to this order”"
          className="flex-1"
        />
        <Connector />
        <Node
          title="Tool layer validation"
          detail="Allergen guard, low-confidence escalation"
          tone="accent"
          className="flex-1"
        />
        <Connector />
        <Node title="Business state" detail="Written only if validation passes" className="flex-1" />
      </Flow>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="border border-accent p-4">
          <p className="t-meta text-accent-ink">Blocked</p>
          <p className="t-body mt-2 text-muted">
            Caller has a recorded lily allergy. The write is refused and safe
            alternatives are offered instead.
          </p>
        </div>
        <div className="border border-line p-4">
          <p className="t-meta text-muted">Why below the model</p>
          <p className="t-body mt-2 text-muted">
            The same rule in a prompt is a suggestion. In the tool layer it
            survives every future prompt change.
          </p>
        </div>
      </div>
    </DiagramFrame>
  );
}

/* --------------------------------------------------------------- DrCrop */

export function DrCropPipeline() {
  const stages = [
    { title: "Intake", detail: "RGB orthomosaic, field boundary, row geometry" },
    { title: "Vegetation index", detail: "Excess green per pixel, thresholded to a mask" },
    { title: "Row-aware mask", detail: "Canopy strips separated from inter-row strips" },
    { title: "Zoning", detail: "Spray, scout, or skip per cell, with acreage" },
    { title: "Export", detail: "PDF for the grower, KML and GeoJSON for the field" },
    { title: "Verify", detail: "Diff two flights: acres spared, zones improved" },
  ];

  return (
    <DiagramFrame label="DrCrop six-stage pipeline">
      <ol className="grid gap-px bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-3">
        {stages.map((stage, index) => (
          <li key={stage.title} className="bg-background p-5">
            <p className="t-meta text-accent-ink">
              Stage {String(index + 1).padStart(2, "0")}
            </p>
            <p className="t-body mt-2 font-medium">{stage.title}</p>
            <p className="mt-2 text-[0.82rem] leading-snug text-muted">
              {stage.detail}
            </p>
          </li>
        ))}
      </ol>
      <p className="t-meta mt-5 border-t border-line-soft pt-4 text-muted">
        Every stage is deterministic and independently testable. The model
        writes the briefing over a plan it did not choose.
      </p>
    </DiagramFrame>
  );
}

/**
 * Schematic vineyard block. This is an illustration of the zoning output
 * structure, not a rendering of real field data — the caption says so.
 */
export function DrCropZones() {
  const rows = 7;
  const cols = 12;
  // Fixed pattern so the drawing is deterministic and identical on server
  // and client. 0 = skip, 1 = scout, 2 = spray.
  const pattern = [
    [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 2, 2, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 2, 2, 1, 0, 0, 0, 1, 1, 0],
    [0, 0, 0, 1, 1, 0, 0, 0, 1, 2, 2, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 1, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const fills = ["var(--surface)", "#e8c66a", "var(--accent)"];
  const cell = 26;

  return (
    <DiagramFrame label="Vineyard block divided into spray, scout, and skip zones">
      <svg
        viewBox={`0 0 ${cols * cell} ${rows * cell}`}
        className="h-auto w-full"
        role="img"
        aria-labelledby="zones-title zones-desc"
      >
        <title id="zones-title">Management zone map</title>
        <desc id="zones-desc">
          A schematic vineyard block of twelve by seven cells. Most cells are
          skip zones. Two clusters are marked spray, each ringed by scout cells.
          Vine rows run vertically through the block.
        </desc>
        {pattern.map((row, y) =>
          row.map((value, x) => (
            <rect
              key={`${x}-${y}`}
              x={x * cell}
              y={y * cell}
              width={cell}
              height={cell}
              fill={fills[value]}
              stroke="var(--line)"
              strokeWidth="0.5"
            />
          )),
        )}
        {/* Vine rows — the geometry the mask uses to score between the vines. */}
        {Array.from({ length: cols }, (_, i) => (
          <line
            key={`row-${i}`}
            x1={i * cell + cell / 2}
            y1={0}
            x2={i * cell + cell / 2}
            y2={rows * cell}
            stroke="var(--foreground)"
            strokeWidth="0.6"
            strokeDasharray="2 4"
            opacity="0.35"
          />
        ))}
      </svg>
      <Legend
        items={[
          { swatch: "var(--accent)", label: "Spray" },
          { swatch: "#e8c66a", label: "Scout" },
          { swatch: "var(--surface)", label: "Skip" },
        ]}
      />
    </DiagramFrame>
  );
}

/* ------------------------------------------------------------ FocusGate */

export function FocusGateRouting() {
  return (
    <DiagramFrame label="FocusGate message routing">
      <Flow>
        <Node title="Manager texts" detail="To the relay number, not the student" className="flex-1" />
        <Connector />
        <Node title="Inbound webhook" detail="Signature verified in production" className="flex-1" />
        <Connector />
        <Node title="Study block active?" detail="Block state machine" tone="accent" className="flex-1" />
      </Flow>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="border border-line p-4">
          <p className="t-meta text-muted">No — outside a block</p>
          <p className="t-body mt-2 text-muted">
            Forward normally. Nothing is triaged, nothing is read.
          </p>
        </div>
        <div className="border border-accent p-4">
          <p className="t-meta text-accent-ink">Yes — inside a block</p>
          <p className="t-body mt-2 text-muted">
            Triage the content, then deliver, or hold and auto-reply once.
          </p>
        </div>
      </div>

      <p className="t-meta mt-5 border-t border-line-soft pt-4 text-muted">
        Triage lives on the server, so one code path covers both mobile
        platforms and no notification interception is required.
      </p>
    </DiagramFrame>
  );
}

export function FocusGateDecision() {
  const paths = [
    {
      condition: "Contains an explicit urgency keyword",
      outcome: "Deliver now",
      note: "Deterministic floor. Runs before the model, so it holds when inference does not.",
      deliver: true,
    },
    {
      condition: "Model judges it urgent",
      outcome: "Deliver now",
      note: "Content-level judgment — the thing the operating system cannot do.",
      deliver: true,
    },
    {
      condition: "Model judges it not urgent",
      outcome: "Hold + auto-reply once",
      note: "The sender learns the student is studying, so they do not escalate.",
      deliver: false,
    },
    {
      condition: "Error, timeout, or ambiguity",
      outcome: "Deliver now — fail open",
      note: "A false interrupt is annoying. A missed shift offer costs money and trust.",
      deliver: true,
    },
  ];

  return (
    <DiagramFrame label="FocusGate urgency decision paths">
      <ul className="grid gap-px bg-[color:var(--line)]">
        {paths.map((path) => (
          <li
            key={path.condition}
            className="grid gap-2 bg-background p-4 sm:grid-cols-[1.1fr_auto_1fr] sm:items-center sm:gap-5"
          >
            <p className="t-body">{path.condition}</p>
            <span aria-hidden="true" className="hidden text-muted sm:inline">
              →
            </span>
            <div>
              <p className={`t-meta ${path.deliver ? "text-accent-ink" : "text-muted"}`}>
                {path.outcome}
              </p>
              <p className="mt-1.5 text-[0.82rem] leading-snug text-muted">
                {path.note}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="t-meta mt-5 border-t border-line-soft pt-4 text-muted">
        Three of four paths deliver. That asymmetry is the specification, not a
        tuning accident.
      </p>
    </DiagramFrame>
  );
}

/* --------------------------------------------------------------- registry */

export const diagrams: Record<DiagramId, () => React.JSX.Element> = {
  "act-loop": ActLoop,
  "act-architecture": ActArchitecture,
  "act-trust": ActTrust,
  "secondline-callflow": SecondLineCallFlow,
  "secondline-tools": SecondLineTools,
  "drcrop-pipeline": DrCropPipeline,
  "drcrop-zones": DrCropZones,
  "focusgate-routing": FocusGateRouting,
  "focusgate-decision": FocusGateDecision,
};

/** Compact signature visual used on the homepage project previews. */
export const projectSignature: Record<string, DiagramId> = {
  actober: "act-loop",
  secondline: "secondline-tools",
  drcrop: "drcrop-zones",
  focusgate: "focusgate-decision",
};
