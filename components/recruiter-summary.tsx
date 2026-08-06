import {
  Container,
  ResumeNotice,
  Section,
  SectionMarker,
} from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { links, recruiterSummary } from "@/content/profile";

/**
 * The twenty-second read. Role, strengths, location, education, and job
 * interest, in one scan, immediately below the hero.
 */
export function RecruiterSummary() {
  return (
    <Section aria-labelledby="summary-heading" className="border-t border-line">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionMarker index="01" label="At a glance" />
            <h2 id="summary-heading" className="t-project mt-6 max-w-[12ch]">
              The short version
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <dl className="divide-y divide-[color:var(--line-soft)] border-y border-line">
              {/* The Reveal renders the group wrapper itself — a <dl> may only
                  contain <dt>/<dd> or a single <div> wrapping them. */}
              {recruiterSummary.map((row, index) => (
                <Reveal
                  key={row.label}
                  delay={index * 45}
                  className="grid gap-1 py-5 sm:grid-cols-[minmax(6rem,9rem)_1fr] sm:gap-8"
                >
                  <dt className="t-meta pt-1 text-muted">{row.label}</dt>
                  <dd className="t-body-large">{row.value}</dd>
                </Reveal>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <a
                href={links.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-link t-meta inline-flex min-h-11 items-center"
              >
                <span className="link-underline">Read the full résumé</span>
                <span className="arrow ml-2 inline-block" aria-hidden="true">
                  ↗
                </span>
              </a>
              <ResumeNotice />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
