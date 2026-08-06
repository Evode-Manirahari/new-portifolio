import { ActionLink, Container, ResumeNotice } from "@/components/primitives";
import { MediaFrame } from "@/components/media-frame";
import { links, profile } from "@/content/profile";
import { portrait } from "@/content/media";

export function Hero() {
  return (
    <section className="pt-[clamp(2.5rem,6vw,6rem)] pb-[clamp(3rem,6vw,6rem)]">
      <Container>
        <p className="t-meta text-muted line-mask">
          <span style={{ "--line-delay": "0ms" } as React.CSSProperties}>
            {profile.role}
          </span>
        </p>

        <h1 className="t-display mt-6 text-[clamp(2.6rem,10.4vw,9.5rem)]">
          <span className="line-mask">
            <span style={{ "--line-delay": "60ms" } as React.CSSProperties}>Evode</span>
          </span>
          <span className="line-mask">
            <span style={{ "--line-delay": "150ms" } as React.CSSProperties}>
              Manirahari
            </span>
          </span>
        </h1>

        <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-[clamp(2.5rem,4vw,4rem)] lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-6">
            <p className="t-serif text-[length:clamp(1.9rem,4.6vw,4.4rem)] line-mask">
              <span style={{ "--line-delay": "260ms" } as React.CSSProperties}>
                {profile.headline}
              </span>
            </p>

            <p className="t-body-large measure mt-8 text-muted">{profile.supporting}</p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ActionLink href="/#work" variant="primary">
                View selected work
              </ActionLink>
              <ActionLink href={links.resume} external>
                View résumé
              </ActionLink>
              <ActionLink href={`mailto:${links.email}`} external>
                Contact me
              </ActionLink>
            </div>

            <ResumeNotice className="mt-4" />

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="t-meta inline-flex min-h-11 items-center link-underline"
              >
                GitHub
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="t-meta inline-flex min-h-11 items-center link-underline"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <MediaFrame
              slot={portrait}
              priority
              sizes="(min-width: 1024px) 30vw, 100vw"
            />
            <dl className="mt-6 border-t border-line">
              <div className="flex items-baseline justify-between gap-4 border-b border-line-soft py-3">
                <dt className="t-meta text-muted">Based in</dt>
                <dd className="t-meta text-right">{profile.location}</dd>
              </div>
              <div className="py-3">
                <dt className="t-meta text-muted">Availability</dt>
                <dd className="t-body mt-2">{profile.availability}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
