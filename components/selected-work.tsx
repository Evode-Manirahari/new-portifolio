import { Container, Section, SectionMarker } from "@/components/primitives";
import { ProjectFeature } from "@/components/project-feature";
import { featuredProjects } from "@/content/projects";

export function SelectedWork() {
  return (
    <Section id="work" aria-labelledby="work-heading" className="border-t border-line">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionMarker index="02" label="Selected work" />
            <h2 id="work-heading" className="t-section mt-6">
              Four systems
            </h2>
          </div>
          <p className="t-body-large measure text-muted lg:col-span-6 lg:col-start-7 lg:self-end">
            Each one started from a specific problem someone actually has. For
            each I have written what I built, what it proves, and what it does
            not.
          </p>
        </div>

        <div className="mt-[clamp(3rem,6vw,6rem)]">
          {featuredProjects.map((project, index) => (
            <ProjectFeature key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
