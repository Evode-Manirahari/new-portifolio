import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { links, resumeStatus } from "@/content/profile";
import { statusLabel, type ProjectStatus } from "@/content/projects";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[104rem] px-[var(--gutter)] ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  ...rest
}: ComponentProps<"section">) {
  return (
    <section
      className={`py-[clamp(4rem,8vw,8.5rem)] ${className}`}
      {...rest}
    >
      {children}
    </section>
  );
}

/** Small uppercase index + label. The site's recurring section marker. */
export function SectionMarker({
  index,
  label,
  className = "",
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={`t-meta text-muted flex items-baseline gap-3 ${className}`}>
      <span className="text-accent-ink">{index}</span>
      <span aria-hidden="true" className="h-px w-8 bg-line translate-y-[-0.2em]" />
      <span>{label}</span>
    </p>
  );
}

export function ArrowLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <span className="arrow ml-2 inline-block" aria-hidden="true">
        ↗
      </span>
    </>
  );

  const classes = `arrow-link inline-flex items-baseline t-meta min-h-11 items-center ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

/** Primary and secondary calls to action. Both clear 44px. */
export function ActionLink({
  href,
  children,
  variant = "secondary",
  external = false,
  download = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  download?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center min-h-12 px-6 t-meta transition-colors duration-300 border";
  const styles =
    variant === "primary"
      ? "bg-foreground text-background border-foreground hover:bg-accent hover:border-accent"
      : "border-line text-foreground hover:border-foreground";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...(download ? { download: "" } : {})}
        className={`${base} ${styles}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

/**
 * The résumé link, used in the nav, hero, about page, and footer.
 * Opens in a new tab, with a descriptive filename and no cache-busting query.
 */
export function ResumeLink({
  variant = "secondary",
  label = "Résumé",
}: {
  variant?: "primary" | "secondary";
  label?: string;
}) {
  return (
    <ActionLink href={links.resume} variant={variant} external>
      {label}
    </ActionLink>
  );
}

/** Shown wherever the résumé is offered while the real PDF is still missing. */
export function ResumeNotice({ className = "" }: { className?: string }) {
  if (resumeStatus === "available") return null;
  return (
    <p className={`t-meta text-accent-ink ${className}`}>
      Résumé PDF pending — placeholder file in place
    </p>
  );
}

const statusStyles: Record<ProjectStatus, string> = {
  "current-build": "text-accent-ink border-accent",
  "deployed-prototype": "text-foreground border-line",
  hackathon: "text-foreground border-line",
  experiment: "text-muted border-line",
  research: "text-muted border-line",
  archived: "text-muted border-line",
};

/**
 * Status is carried by the word itself, never by colour alone —
 * the label text is always present.
 */
export function StatusTag({
  status,
  className = "",
}: {
  status: ProjectStatus;
  className?: string;
}) {
  return (
    <span
      className={`t-meta inline-flex items-center border px-2.5 py-1 ${statusStyles[status]} ${className}`}
    >
      {statusLabel[status]}
    </span>
  );
}

/** A labelled row used across the recruiter summary and project metadata. */
export function MetaRow({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-1 py-4 sm:grid-cols-[minmax(7rem,10rem)_1fr] sm:gap-6 ${className}`}>
      <dt className="t-meta text-muted pt-1">{label}</dt>
      <dd className="t-body">{children}</dd>
    </div>
  );
}
