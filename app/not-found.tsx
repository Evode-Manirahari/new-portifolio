import type { Metadata } from "next";
import { ActionLink, Container, Section } from "@/components/primitives";
import { featuredProjects } from "@/content/projects";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page does not exist.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section className="pt-[clamp(3rem,7vw,7rem)]">
      <Container>
        <p className="t-meta text-accent-ink">Error 404</p>

        <h1 className="t-display mt-6 text-[clamp(4rem,20vw,13rem)]">404</h1>

        <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="t-serif text-[clamp(1.7rem,3.6vw,3rem)]">
              This page does not exist.
            </p>
            <p className="t-body-large measure mt-6 text-muted">
              The link may be out of date, or the address may have a typo in it.
              Everything on this site is reachable from the homepage.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <ActionLink href="/" variant="primary">
                Back to the homepage
              </ActionLink>
              <ActionLink href="/about">About</ActionLink>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <p className="t-meta text-muted">Case studies</p>
            <ul className="mt-4 border-t border-line">
              {featuredProjects.map((project) => (
                <li key={project.slug} className="border-b border-line-soft">
                  <Link
                    href={`/work/${project.slug}`}
                    className="flex min-h-14 items-center justify-between gap-4 py-3"
                  >
                    <span className="t-body-large link-underline">{project.name}</span>
                    <span aria-hidden="true" className="t-meta text-muted">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
