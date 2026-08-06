import type { Metadata } from "next";
import Link from "next/link";
import {
  ActionLink,
  Container,
  ResumeNotice,
  Section,
  SectionMarker,
} from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { MediaFrame } from "@/components/media-frame";
import { aboutPortrait } from "@/content/media";
import {
  aboutBio,
  currentGoals,
  engineeringInterests,
  links,
  productPhilosophy,
  profile,
} from "@/content/profile";
import { experience } from "@/content/experience";
import { education, recognition } from "@/content/education";
import { leadership } from "@/content/leadership";

export const metadata: Metadata = {
  title: "About",
  description:
    "Evode Manirahari — software engineer and product builder in the San Francisco Bay Area. Background, engineering interests, product philosophy, experience, education, and leadership.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Evode Manirahari",
    description:
      "Background, engineering interests, product philosophy, experience, education, and leadership.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Section className="pt-[clamp(2.5rem,5vw,5rem)] pb-0">
        <Container>
          <SectionMarker index="—" label="About" />
          <h1 className="t-hero mt-6 max-w-[16ch]">
            Software engineer and product builder.
          </h1>

          <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-[clamp(2.5rem,4vw,4rem)] lg:grid-cols-12">
            <div className="lg:col-span-6">
              {aboutBio.map((paragraph, index) => (
                <Reveal key={index} delay={index * 60}>
                  <p
                    className={
                      index === 0
                        ? "t-body-large measure"
                        : "t-body-large measure mt-6 text-muted"
                    }
                  >
                    {paragraph}
                  </p>
                </Reveal>
              ))}

              <div className="mt-10 flex flex-wrap gap-3">
                <ActionLink href={links.resume} variant="primary" external>
                  View résumé
                </ActionLink>
                <ActionLink href={`mailto:${links.email}`} external>
                  Contact me
                </ActionLink>
              </div>
              <ResumeNotice className="mt-4" />
            </div>

            <div className="lg:col-span-5 lg:col-start-8">
              <MediaFrame
                slot={aboutPortrait}
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
              <dl className="mt-6 border-t border-line">
                <div className="flex items-baseline justify-between gap-4 border-b border-line-soft py-3">
                  <dt className="t-meta text-muted">Based in</dt>
                  <dd className="t-meta text-right">{profile.location}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 border-b border-line-soft py-3">
                  <dt className="t-meta text-muted">Studying</dt>
                  <dd className="t-meta text-right">Computer Science, SSU</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="t-meta text-muted">Graduating</dt>
                  <dd className="t-meta text-right">May 2027</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* Engineering interests */}
      <Section aria-labelledby="interests-heading" className="mt-[clamp(3rem,6vw,6rem)] border-t border-line">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionMarker index="01" label="Engineering interests" />
              <h2 id="interests-heading" className="t-project mt-6 max-w-[14ch]">
                What I pay attention to
              </h2>
            </div>

            <div className="grid gap-px bg-[color:var(--line)] lg:col-span-7 lg:col-start-6">
              {engineeringInterests.map((item, index) => (
                <Reveal key={item.title} delay={index * 50} className="bg-background py-6">
                  <h3 className="t-body-large">{item.title}</h3>
                  <p className="t-body mt-3 text-muted">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Product philosophy */}
      <Section aria-labelledby="philosophy-heading" className="inverse border-t border-line">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionMarker index="02" label="Product philosophy" />
              <h2 id="philosophy-heading" className="t-project mt-6 max-w-[14ch]">
                How I decide what to build
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ol className="border-t border-line">
                {productPhilosophy.map((item, index) => (
                  <Reveal key={item.title} as="li" delay={index * 50}>
                    <div className="grid gap-3 border-b border-line-soft py-7 sm:grid-cols-[auto_1fr] sm:gap-8">
                      <span className="t-meta text-accent-ink">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="t-body-large">{item.title}</h3>
                        <p className="t-body mt-3 text-muted">{item.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* Experience */}
      <Section aria-labelledby="experience-heading" className="border-t border-line">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionMarker index="03" label="Experience" />
              <h2 id="experience-heading" className="t-project mt-6">
                Experience
              </h2>
            </div>

            <ul className="lg:col-span-7 lg:col-start-6">
              {experience.map((entry, index) => (
                <Reveal key={`${entry.organization}-${entry.role}`} as="li" delay={index * 40}>
                  <div className="border-t border-line py-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                      <h3 className="t-body-large">{entry.role}</h3>
                      <p className="t-meta text-muted">{entry.period}</p>
                    </div>
                    <p className="t-body mt-1 text-muted">
                      {entry.url ? (
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline"
                        >
                          {entry.organization}
                        </a>
                      ) : (
                        entry.organization
                      )}{" "}
                      · {entry.location}
                    </p>
                    <p className="t-body mt-4">{entry.summary}</p>
                    {entry.detail && (
                      <ul className="mt-4 flex flex-col gap-2">
                        {entry.detail.map((line) => (
                          <li
                            key={line}
                            className="t-body flex gap-3 text-muted before:mt-[0.65em] before:h-px before:w-3 before:shrink-0 before:bg-line"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Education, leadership, recognition */}
      <Section aria-labelledby="record-heading" className="border-t border-line">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionMarker index="04" label="Education & leadership" />
              <h2 id="record-heading" className="t-project mt-6">
                Record
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="border-t border-line py-7">
                <h3 className="t-meta text-muted">Education</h3>
                {education.map((entry) => (
                  <div key={entry.institution} className="mt-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <p className="t-body-large">{entry.credential}</p>
                      <p className="t-meta text-muted">{entry.period}</p>
                    </div>
                    <p className="t-body mt-1 text-muted">
                      {entry.institution} · {entry.location}
                    </p>
                    {entry.note && <p className="t-body mt-3">{entry.note}</p>}
                  </div>
                ))}
              </div>

              <div className="border-t border-line py-7">
                <h3 className="t-meta text-muted">Leadership</h3>
                <ul className="mt-5 flex flex-col gap-6">
                  {leadership.map((entry) => (
                    <li key={entry.role}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <p className="t-body-large">{entry.role}</p>
                        <p className="t-meta text-muted">{entry.period}</p>
                      </div>
                      <p className="t-body mt-1 text-muted">{entry.organization}</p>
                      <p className="t-body mt-3">{entry.summary}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-y border-line py-7">
                <h3 className="t-meta text-muted">Recognition</h3>
                <ul className="mt-5 flex flex-col gap-5">
                  {recognition.map((entry) => (
                    <li key={entry.title}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                        <p className="t-body-large">{entry.title}</p>
                        <p className="t-meta text-muted">{entry.period}</p>
                      </div>
                      <p className="t-body mt-1 text-muted">{entry.issuer}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Current goals */}
      <Section aria-labelledby="goals-heading" className="border-t border-line">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionMarker index="05" label="Current goals" />
              <h2 id="goals-heading" className="t-project mt-6">
                What I want next
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <ul className="border-t border-line">
                {currentGoals.map((goal, index) => (
                  <Reveal key={goal} as="li" delay={index * 50}>
                    <p className="t-body-large border-b border-line-soft py-6">{goal}</p>
                  </Reveal>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <ActionLink href={links.resume} variant="primary" external>
                  View résumé
                </ActionLink>
                <ActionLink href={links.linkedin} external>
                  LinkedIn
                </ActionLink>
                <ActionLink href={links.github} external>
                  GitHub
                </ActionLink>
              </div>
              <ResumeNotice className="mt-4" />

              <p className="t-body mt-10 text-muted">
                Or go back to the{" "}
                <Link href="/#work" className="link-underline">
                  selected work
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
