import {
  Container,
  Section,
  SectionMarker,
  StatusTag,
} from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { archive } from "@/content/projects";
import { links } from "@/content/profile";

/**
 * Editorial index rather than a card grid — these are smaller builds and the
 * layout should say so.
 */
export function ProjectIndex() {
  return (
    <Section id="archive" aria-labelledby="archive-heading" className="border-t border-line">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionMarker index="06" label="Archive" />
            <h2 id="archive-heading" className="t-section mt-6">
              Also built
            </h2>
          </div>
          <p className="t-body-large measure text-muted lg:col-span-6 lg:col-start-7 lg:self-end">
            Hackathon builds, experiments, and research spikes. Listed with the
            stage they actually reached — most of these are not products.
          </p>
        </div>

        <ul className="mt-[clamp(3rem,5vw,5rem)] border-t border-line">
          {archive.map((entry, index) => (
            <Reveal key={entry.name} as="li" delay={index * 40}>
              <div className="grid gap-3 border-b border-line-soft py-6 lg:grid-cols-12 lg:items-baseline lg:gap-8">
                <div className="flex items-baseline gap-4 lg:col-span-3">
                  <span className="t-meta text-muted">{entry.year}</span>
                  <h3 className="t-body-large">
                    {entry.repositoryUrl ? (
                      <a
                        href={entry.repositoryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline"
                      >
                        {entry.name}
                      </a>
                    ) : (
                      entry.name
                    )}
                  </h3>
                </div>

                <p className="t-body text-muted lg:col-span-5">{entry.thesis}</p>

                <p className="t-meta text-muted lg:col-span-2">{entry.area}</p>

                <div className="lg:col-span-2 lg:justify-self-end">
                  <StatusTag status={entry.status} />
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        <p className="t-body mt-8 text-muted">
          More on{" "}
          <a
            href={links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
          >
            GitHub
          </a>
          .
        </p>
      </Container>
    </Section>
  );
}
