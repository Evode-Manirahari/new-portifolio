import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLink,
  Container,
  Section,
  StatusTag,
} from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { BlockRenderer } from "@/components/project/blocks";
import { ProjectNavigation } from "@/components/project/project-navigation";
import { featuredProjects, getProject } from "@/content/projects";
import { getCaseStudy } from "@/content/case-studies";
import { profile, siteUrl } from "@/content/profile";

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const description = `${project.headline} ${project.summary}`;

  return {
    title: `${project.name} — case study`,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} · ${project.headline}`,
      description,
      url: `/work/${project.slug}`,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const study = getCaseStudy(slug);

  if (!project || !study) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: project.headline,
    description: project.summary,
    url: `${siteUrl}/work/${project.slug}`,
    dateCreated: project.year,
    creator: { "@type": "Person", name: profile.name, url: siteUrl },
    keywords: project.technologies.join(", "),
    about: project.categories.join(", "),
    ...(project.repositoryUrl ? { codeRepository: project.repositoryUrl } : {}),
  };

  return (
    <>
      {/* Hero */}
      <Section className="pt-[clamp(2rem,4vw,4rem)] pb-0">
        <Container>
          <p className="t-meta flex flex-wrap items-center gap-2 text-muted">
            <Link
              href="/#work"
              className="inline-flex min-h-11 items-center link-underline"
            >
              Selected work
            </Link>
            <span aria-hidden="true">/</span>
            <span>{project.name}</span>
          </p>

          <h1 className="t-hero mt-8 max-w-[14ch]">{project.name}</h1>

          <p className="t-serif mt-6 max-w-[22ch] text-[clamp(1.7rem,3.6vw,3.2rem)]">
            {project.headline}
          </p>

          <div className="mt-[clamp(2.5rem,4vw,4rem)] grid gap-[clamp(2rem,3.5vw,3.5rem)] lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="t-body-large">{study.thesis}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
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
            </div>

            <dl className="lg:col-span-5 lg:col-start-8">
              <div className="flex items-baseline justify-between gap-4 border-t border-line py-3">
                <dt className="t-meta text-muted">Stage</dt>
                <dd>
                  <StatusTag status={project.status} />
                </dd>
              </div>
              {study.meta.map((row) => (
                <div
                  key={row.label}
                  className="flex items-baseline justify-between gap-4 border-t border-line-soft py-3"
                >
                  <dt className="t-meta text-muted">{row.label}</dt>
                  <dd className="t-body max-w-[60%] text-right">{row.value}</dd>
                </div>
              ))}
              <div className="border-t border-line-soft py-3">
                <dt className="t-meta text-muted">Where it stands</dt>
                <dd className="t-body mt-2">{project.statusNote}</dd>
              </div>
            </dl>
          </div>
        </Container>
      </Section>

      {/* Intro */}
      <Section className="pb-0 pt-[clamp(2.5rem,5vw,5rem)]">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8 lg:col-start-5">
              {study.intro.map((paragraph, index) => (
                <p
                  key={index}
                  className={
                    index === 0
                      ? "t-body-large"
                      : "t-body-large mt-6 text-muted"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Body */}
      <Container>
        {study.blocks.map((block, index) => (
          <BlockRenderer key={index} block={block} />
        ))}
      </Container>

      {/* Contribution — the section recruiters read */}
      <Section aria-labelledby="contribution-heading" className="inverse border-t border-line">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="t-meta text-accent-ink">Evode&rsquo;s contribution</p>
              <h2 id="contribution-heading" className="t-project mt-6 max-w-[12ch]">
                What I built
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <p className="t-body-large">{study.contribution.lead}</p>
              <ul className="mt-8 border-t border-line">
                {study.contribution.items.map((item, index) => (
                  <Reveal key={item} as="li" delay={index * 40}>
                    <div className="grid gap-2 border-b border-line-soft py-5 sm:grid-cols-[auto_1fr] sm:gap-6">
                      <span className="t-meta text-muted sm:pt-1.5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="t-body">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* What remains unproven */}
      <Section aria-labelledby="unproven-heading" className="border-t border-line">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="t-meta text-muted">Honest limits</p>
              <h2 id="unproven-heading" className="t-project mt-6 max-w-[12ch]">
                What remains unproven
              </h2>
            </div>

            <ul className="lg:col-span-7 lg:col-start-6">
              {study.unproven.map((item) => (
                <li
                  key={item}
                  className="t-body-large border-b border-line-soft py-6 first:border-t first:border-line"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Lessons */}
      <Section aria-labelledby="lessons-heading" className="border-t border-line">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="t-meta text-muted">Lessons</p>
              <h2 id="lessons-heading" className="t-project mt-6 max-w-[12ch]">
                What I took from it
              </h2>
            </div>

            <div className="grid gap-px bg-[color:var(--line)] lg:col-span-7 lg:col-start-6">
              {study.lessons.map((lesson, index) => (
                <Reveal key={lesson.title} delay={index * 50} className="bg-background py-6">
                  <h3 className="t-body-large">{lesson.title}</h3>
                  <p className="t-body mt-3 text-muted">{lesson.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Stack and links */}
      <Section aria-labelledby="stack-heading" className="border-t border-line">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="t-meta text-muted">Reference</p>
              <h2 id="stack-heading" className="t-project mt-6">
                Stack
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <li
                    key={technology}
                    className="t-meta border border-line px-3 py-2 text-muted"
                  >
                    {technology}
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-t border-line pt-6">
                <p className="t-meta text-muted">Responsibilities</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {project.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="t-body flex gap-3 text-muted before:mt-[0.65em] before:h-px before:w-3 before:shrink-0 before:bg-line"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2">
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
                <ArrowLink href="/#contact">Get in touch</ArrowLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <ProjectNavigation slug={project.slug} />

      <script
        type="application/ld+json"
        // Static, build-time constant assembled from typed content.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
