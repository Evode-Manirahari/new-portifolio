import Link from "next/link";
import { Container } from "@/components/primitives";
import { links, profile } from "@/content/profile";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const columns = [
    {
      title: "Elsewhere",
      items: [
        { label: "GitHub", href: links.github, external: true },
        { label: "LinkedIn", href: links.linkedin, external: true },
        { label: "Résumé", href: links.resume, external: true },
      ],
    },
    {
      title: "This site",
      items: [
        { label: "Selected work", href: "/#work", external: false },
        { label: "About", href: "/about", external: false },
        { label: "Contact", href: `mailto:${links.email}`, external: true },
      ],
    },
  ];

  return (
    <footer className="inverse border-t border-line">
      <Container className="py-[clamp(3rem,6vw,6rem)]">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="t-serif text-[clamp(1.8rem,3.4vw,2.9rem)]">{profile.name}</p>
            <p className="t-meta mt-4 text-muted">{profile.location}</p>
            <p className="t-body mt-6 max-w-sm text-muted">{profile.role}</p>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="t-meta text-muted">{column.title}</p>
              <ul className="mt-5 flex flex-col gap-1">
                {column.items.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        {...(item.href.startsWith("mailto:")
                          ? {}
                          : { target: "_blank", rel: "noopener noreferrer" })}
                        className="t-body inline-flex min-h-11 items-center link-underline"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="t-body inline-flex min-h-11 items-center link-underline"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-meta text-muted">© {year} Evode Manirahari</p>
          <p className="t-meta text-muted">
            Built with Next.js ·{" "}
            <a
              href={links.portfolioRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              Source
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
