import { Container, Section, SectionMarker } from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { capabilities } from "@/content/capabilities";

export function Capabilities() {
  return (
    <Section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="inverse border-t border-line"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionMarker index="03" label="Capabilities" />
            <h2 id="capabilities-heading" className="t-section mt-6">
              What I work with
            </h2>
          </div>
          <p className="t-body-large measure text-muted lg:col-span-6 lg:col-start-7 lg:self-end">
            Everything listed here is used in a project on this site. Nothing is
            rated, and nothing is here for search engines.
          </p>
        </div>

        <div className="mt-[clamp(3rem,5vw,5rem)] grid gap-px bg-[color:var(--line)] lg:grid-cols-5">
          {capabilities.map((group, index) => (
            <Reveal
              key={group.title}
              delay={index * 60}
              className="bg-[color:var(--background)] p-6"
            >
              <h3 className="t-body font-medium">{group.title}</h3>
              <p className="t-meta mt-2 text-muted">{group.evidence}</p>
              <ul className="mt-6 flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={item} className="text-[0.95rem] leading-snug text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
