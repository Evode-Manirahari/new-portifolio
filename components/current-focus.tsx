import { ArrowLink, Container, Section, SectionMarker } from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { currentFocus } from "@/content/profile";

export function CurrentFocus() {
  return (
    <Section aria-labelledby="focus-heading" className="border-t border-line">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionMarker index="04" label="Current focus" />
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            <Reveal>
              <h2
                id="focus-heading"
                className="t-serif text-[clamp(1.9rem,4vw,3.6rem)]"
              >
                {currentFocus.statement}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="t-body-large measure mt-8 text-muted">
                {currentFocus.body}
              </p>
              <div className="mt-8">
                <ArrowLink href={`/work/${currentFocus.projectSlug}`}>
                  See how ACT works
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
