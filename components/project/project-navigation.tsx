import Link from "next/link";
import { Container } from "@/components/primitives";
import { getProjectNeighbours } from "@/content/projects";

export function ProjectNavigation({ slug }: { slug: string }) {
  const { previous, next } = getProjectNeighbours(slug);
  if (!previous || !next) return null;

  return (
    <nav aria-label="More case studies" className="inverse border-t border-line">
      <Container className="py-[clamp(2.5rem,5vw,5rem)]">
        <div className="grid gap-px bg-[color:var(--line)] sm:grid-cols-2">
          <Link
            href={`/work/${previous.slug}`}
            className="group bg-[color:var(--background)] p-6 transition-colors duration-300 hover:bg-[color:var(--surface)] sm:p-8"
          >
            <p className="t-meta text-muted">← Previous</p>
            <p className="t-project mt-4 text-[clamp(1.6rem,3vw,2.6rem)]">
              {previous.name}
            </p>
            <p className="t-body mt-3 text-muted">{previous.headline}</p>
          </Link>

          <Link
            href={`/work/${next.slug}`}
            className="group bg-[color:var(--background)] p-6 text-right transition-colors duration-300 hover:bg-[color:var(--surface)] sm:p-8"
          >
            <p className="t-meta text-muted">Next →</p>
            <p className="t-project mt-4 text-[clamp(1.6rem,3vw,2.6rem)]">
              {next.name}
            </p>
            <p className="t-body mt-3 text-muted">{next.headline}</p>
          </Link>
        </div>
      </Container>
    </nav>
  );
}
