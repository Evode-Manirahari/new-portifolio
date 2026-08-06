import { ArrowLink, Container, Section, SectionMarker } from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { aboutPreview } from "@/content/profile";

export function AboutPreview() {
  return (
    <Section aria-labelledby="about-preview-heading" className="border-t border-line">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <SectionMarker index="07" label="About" />
            <h2 id="about-preview-heading" className="sr-only">
              About Evode Manirahari
            </h2>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            {aboutPreview.map((paragraph, index) => (
              <Reveal key={index} delay={index * 70}>
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
            <div className="mt-8">
              <ArrowLink href="/about">Read the full about page</ArrowLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
