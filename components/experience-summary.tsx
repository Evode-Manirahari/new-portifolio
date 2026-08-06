import { ArrowLink, Container, Section, SectionMarker } from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { homepageExperience } from "@/content/experience";
import { education } from "@/content/education";

export function ExperienceSummary() {
  return (
    <Section aria-labelledby="background-heading" className="border-t border-line">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionMarker index="05" label="Background" />
            <h2 id="background-heading" className="t-section mt-6">
              Experience
            </h2>
          </div>
          <p className="t-body-large measure text-muted lg:col-span-6 lg:col-start-7 lg:self-end">
            The entries that matter for engineering roles. Full history,
            leadership, and recognition are on the about page.
          </p>
        </div>

        <ul className="mt-[clamp(3rem,5vw,5rem)] border-t border-line">
          {homepageExperience.map((entry, index) => (
            <Reveal key={entry.organization} as="li" delay={index * 50}>
              <div className="grid gap-3 border-b border-line-soft py-7 lg:grid-cols-12 lg:gap-8">
                <p className="t-meta text-muted lg:col-span-2">{entry.period}</p>

                <div className="lg:col-span-5">
                  <h3 className="t-body-large">{entry.role}</h3>
                  <p className="t-body mt-1 text-muted">
                    {entry.organization} · {entry.location}
                  </p>
                </div>

                <p className="t-body text-muted lg:col-span-5">{entry.summary}</p>
              </div>
            </Reveal>
          ))}

          {education.map((entry) => (
            <Reveal key={entry.institution} as="li">
              <div className="grid gap-3 border-b border-line-soft py-7 lg:grid-cols-12 lg:gap-8">
                <p className="t-meta text-muted lg:col-span-2">{entry.period}</p>
                <div className="lg:col-span-5">
                  <h3 className="t-body-large">{entry.credential}</h3>
                  <p className="t-body mt-1 text-muted">
                    {entry.institution} · {entry.location}
                  </p>
                </div>
                <p className="t-body text-muted lg:col-span-5">
                  Graduating May 2027.
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-8">
          <ArrowLink href="/about">Full background and leadership</ArrowLink>
        </div>
      </Container>
    </Section>
  );
}
