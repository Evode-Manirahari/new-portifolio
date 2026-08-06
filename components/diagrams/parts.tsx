import type { ReactNode } from "react";

/**
 * Diagram primitives.
 *
 * These are built from HTML and CSS rather than SVG so they reflow on narrow
 * screens, inherit the page's type and colour tokens, and stay readable to a
 * screen reader as ordinary text. Only the zone map uses real SVG, because it
 * is a drawing rather than a structure.
 */

export function DiagramFrame({
  children,
  label,
  className = "",
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={`border border-line bg-surface/50 p-[clamp(1rem,2.4vw,2.25rem)] ${className}`}
    >
      {children}
    </div>
  );
}

export function Node({
  title,
  detail,
  tone = "default",
  className = "",
}: {
  title: string;
  detail?: string;
  tone?: "default" | "accent" | "human" | "muted";
  className?: string;
}) {
  const tones = {
    default: "border-line bg-background",
    accent: "border-accent bg-background",
    human: "border-foreground bg-foreground text-background",
    muted: "border-line-soft bg-transparent",
  } as const;

  return (
    <div className={`border px-3 py-2.5 ${tones[tone]} ${className}`}>
      <p className="t-meta">{title}</p>
      {detail && (
        <p className="mt-1.5 text-[0.8rem] leading-snug opacity-70">{detail}</p>
      )}
    </div>
  );
}

/** Horizontal on wide screens, vertical when the row wraps. */
export function Connector({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 px-1 py-2 sm:py-0">
      <span aria-hidden="true" className="text-muted">
        →
      </span>
      {label && <span className="t-meta text-muted">{label}</span>}
    </div>
  );
}

export function Flow({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-stretch gap-1 sm:flex-row sm:items-center">
      {children}
    </div>
  );
}

export function Legend({
  items,
}: {
  items: { swatch: string; label: string }[];
}) {
  return (
    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-line-soft pt-4">
      {items.map((item) => (
        <li key={item.label} className="t-meta flex items-center gap-2 text-muted">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 border border-line"
            style={{ background: item.swatch }}
          />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function Lane({
  title,
  children,
  tone = "default",
}: {
  title: string;
  children: ReactNode;
  tone?: "default" | "accent";
}) {
  return (
    <div
      className={`border p-4 ${tone === "accent" ? "border-accent" : "border-line"}`}
    >
      <p className={`t-meta ${tone === "accent" ? "text-accent-ink" : "text-muted"}`}>
        {title}
      </p>
      <div className="mt-4 flex flex-col gap-2">{children}</div>
    </div>
  );
}
