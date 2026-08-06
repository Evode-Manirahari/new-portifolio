import Link from "next/link";
import { ArrowLink, StatusTag } from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { diagrams, projectSignature } from "@/components/diagrams";
import type { Project } from "@/content/projects";

export function ProjectFeature({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const flagship = index === 0;
  const reversed = !flagship && index % 2 === 0;
  const Signature = diagrams[projectSignature[project.slug]];

  return (
    <article
      className="border-t border-line py-[clamp(3rem,6vw,6rem)]"
      aria-labelledby={`project-${project.slug}`}
    >
      <Reveal>
        <header className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="t-meta flex flex-wrap items-center gap-x-4 gap-y-2 text-muted">
              <span className="text-accent-ink">{String(index + 1).padStart(2, "0")}</span>
              {flagship && <span className="text-accent-ink">Flagship</span>}
              <span>{project.categories.join(" · ")}</span>
            </p>

            <h3 id={`project-${project.slug}`} className="t-project mt-5">
              <Link href={`/work/${project.slug}`} className="link-underline">
                {project.name}
              </Link>
            </h3>

            <p className="t-serif mt-5 max-w-[20ch] text-[clamp(1.7rem,3.4vw,3rem)]">
              {project.headline}
            </p>
          </div>

          <div className="flex flex-wrap items-start gap-3 lg:col-span-3 lg:col-start-10 lg:justify-end">
            <StatusTag status={project.status} />
            <span className="t-meta inline-flex items-center border border-line px-2.5 py-1 text-muted">
              {project.year}
            </span>
          </div>
        </header>
      </Reveal>

      <div
        className={`mt-[clamp(2rem,4vw,3.5rem)] grid gap-[clamp(2rem,3.5vw,3.5rem)] lg:grid-cols-12 ${
          flagship ? "" : "lg:items-start"
        }`}
      >
        <Reveal
          className={
            flagship
              ? "lg:col-span-5"
              : reversed
                ? "lg:col-span-5 lg:col-start-8 lg:row-start-1"
                : "lg:col-span-5"
          }
        >
          <p className="t-body-large">{project.problem}</p>

          <div className="mt-8 border-t border-line pt-6">
            <p className="t-meta text-muted">Key contribution</p>
            <p className="t-body mt-3">{project.contribution}</p>
          </div>

          <div className="mt-6 border-t border-line-soft pt-6">
            <p className="t-meta text-muted">Proof point</p>
            <p className="t-body mt-3">{project.proofPoints[0]}</p>
          </div>

          <dl className="mt-6 border-t border-line-soft pt-6">
            <div className="grid gap-1 sm:grid-cols-[minmax(6rem,8rem)_1fr] sm:gap-6">
              <dt className="t-meta pt-1 text-muted">Role</dt>
              <dd className="t-body">{project.role}</dd>
            </div>
            <div className="mt-4 grid gap-1 sm:grid-cols-[minmax(6rem,8rem)_1fr] sm:gap-6">
              <dt className="t-meta pt-1 text-muted">Stack</dt>
              <dd className="t-body">{project.technologies.slice(0, 8).join(", ")}</dd>
            </div>
            <div className="mt-4 grid gap-1 sm:grid-cols-[minmax(6rem,8rem)_1fr] sm:gap-6">
              <dt className="t-meta pt-1 text-muted">Stage</dt>
              <dd className="t-body">{project.statusNote}</dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
            <ArrowLink href={`/work/${project.slug}`}>Read the case study</ArrowLink>
            {project.repositoryUrl && (
              <ArrowLink href={project.repositoryUrl} external>
                Repository
              </ArrowLink>
            )}
            {project.liveUrl && (
              <ArrowLink href={project.liveUrl} external>
                {project.liveLabel ?? "Live"}
              </ArrowLink>
            )}
          </div>
        </Reveal>

        <Reveal
          delay={80}
          className={
            flagship
              ? "lg:col-span-6 lg:col-start-7"
              : reversed
                ? "lg:col-span-6 lg:row-start-1"
                : "lg:col-span-6 lg:col-start-7"
          }
        >
          <Signature />
        </Reveal>
      </div>
    </article>
  );
}
