import {
  Container,
  ResumeNotice,
  Section,
  SectionMarker,
} from "@/components/primitives";
import { Reveal } from "@/components/motion/reveal";
import { contact, links, profile } from "@/content/profile";

export function ContactSection() {
  const channels = [
    { label: "Email", value: links.email, href: `mailto:${links.email}` },
    { label: "LinkedIn", value: "in/evodemanirahari", href: links.linkedin },
    { label: "GitHub", value: "Evode-Manirahari", href: links.github },
    { label: "Résumé", value: "Evode-Manirahari-Resume.pdf", href: links.resume },
  ];

  return (
    <Section
      id="contact"
      aria-labelledby="contact-heading"
      className="inverse border-t border-line"
    >
      <Container>
        <div className="grid gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionMarker index="08" label="Contact" />
            <Reveal>
              <h2 id="contact-heading" className="t-section mt-6">
                {contact.heading}
              </h2>
            </Reveal>
            <Reveal delay={70}>
              <p className="t-body-large measure mt-8 text-muted">{contact.body}</p>
              <a
                href={`mailto:${links.email}`}
                className="t-serif mt-10 inline-block break-all text-[clamp(1.6rem,3.6vw,3.2rem)] link-underline"
              >
                {links.email}
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t border-line">
              {channels.map((channel) => (
                <div
                  key={channel.label}
                  className="flex items-baseline justify-between gap-4 border-b border-line-soft py-4"
                >
                  <dt className="t-meta text-muted">{channel.label}</dt>
                  <dd className="text-right">
                    <a
                      href={channel.href}
                      {...(channel.href.startsWith("mailto:")
                        ? {}
                        : { target: "_blank", rel: "noopener noreferrer" })}
                      className="t-body inline-flex min-h-11 items-center break-all link-underline"
                    >
                      {channel.value}
                    </a>
                  </dd>
                </div>
              ))}
              <div className="flex items-baseline justify-between gap-4 border-b border-line-soft py-4">
                <dt className="t-meta text-muted">Location</dt>
                <dd className="t-body text-right">{profile.location}</dd>
              </div>
            </dl>

            <p className="t-body mt-6 text-muted">{profile.availability}</p>
            <ResumeNotice className="mt-4" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
