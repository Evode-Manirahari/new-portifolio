import { Reveal } from "@/components/motion/reveal";
import { diagrams } from "@/components/diagrams";
import type { Block } from "@/content/case-studies";

/** Two-column section shell: label on the left, content on the right. */
function SectionShell({
  title,
  children,
  wide = false,
}: {
  title?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <section className="border-t border-line py-[clamp(2.5rem,4.5vw,4.5rem)]">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        {title && (
          <h2 className="t-meta text-muted lg:col-span-3">{title}</h2>
        )}
        <div
          className={
            wide
              ? title
                ? "lg:col-span-9"
                : "lg:col-span-12"
              : title
                ? "lg:col-span-8 lg:col-start-5"
                : "lg:col-span-8 lg:col-start-5"
          }
        >
          {children}
        </div>
      </div>
    </section>
  );
}

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case "prose":
      return (
        <SectionShell title={block.title}>
          <Reveal>
            {block.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={index === 0 ? "t-body-large" : "t-body-large mt-6 text-muted"}
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </SectionShell>
      );

    case "list":
      return (
        <SectionShell title={block.title}>
          <Reveal>
            {block.lead && <p className="t-body-large">{block.lead}</p>}
            <ul className={block.lead ? "mt-6" : ""}>
              {block.items.map((item) => (
                <li
                  key={item}
                  className="t-body border-b border-line-soft py-4 first:border-t"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </SectionShell>
      );

    case "numbered":
      return (
        <SectionShell title={block.title}>
          <Reveal>
            {block.lead && <p className="t-body-large">{block.lead}</p>}
            <dl className={block.lead ? "mt-6" : ""}>
              {block.items.map((item, index) => (
                <div
                  key={item.term}
                  className="grid gap-2 border-b border-line-soft py-5 first:border-t sm:grid-cols-[auto_1fr] sm:gap-6"
                >
                  <dt className="t-meta text-accent-ink sm:pt-1.5">
                    {String(index + 1).padStart(2, "0")}
                  </dt>
                  <dd>
                    <p className="t-body-large">{item.term}</p>
                    <p className="t-body mt-2 text-muted">{item.detail}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </SectionShell>
      );

    case "diagram": {
      const Diagram = diagrams[block.id];
      return (
        <SectionShell title={block.title} wide>
          <Reveal>
            <Diagram />
            <p className="t-body mt-4 max-w-[62ch] text-muted">{block.caption}</p>
          </Reveal>
        </SectionShell>
      );
    }

    case "metrics":
      return (
        <SectionShell title={block.title} wide>
          <Reveal>
            {block.lead && <p className="t-body-large">{block.lead}</p>}
            <dl className={`grid gap-px bg-[color:var(--line)] sm:grid-cols-2 ${block.lead ? "mt-6" : ""}`}>
              {block.rows.map((row) => (
                <div key={row.label} className="bg-background p-6">
                  <dt className="t-meta text-muted">{row.label}</dt>
                  <dd className="mt-4 flex items-baseline gap-4">
                    <span className="t-project text-[clamp(2rem,4vw,3.4rem)] text-muted line-through decoration-1">
                      {row.before}
                    </span>
                    <span aria-hidden="true" className="t-meta text-muted">
                      →
                    </span>
                    <span className="t-project text-[clamp(2rem,4vw,3.4rem)] text-accent-ink">
                      {row.after}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
            {block.footnote && (
              <p className="t-body mt-6 max-w-[62ch] text-muted">{block.footnote}</p>
            )}
          </Reveal>
        </SectionShell>
      );

    case "statement":
      return (
        <section className="border-t border-line py-[clamp(3rem,6vw,6rem)]">
          <Reveal>
            <blockquote className="t-serif max-w-[24ch] text-[clamp(1.8rem,4.2vw,3.6rem)]">
              {block.text}
            </blockquote>
            {block.attribution && (
              <p className="t-meta mt-6 text-muted">{block.attribution}</p>
            )}
          </Reveal>
        </section>
      );

    case "dialogue":
      return (
        <SectionShell title={block.title}>
          <Reveal>
            <p className="t-body-large">{block.lead}</p>
            <dl className="mt-8 border-t border-line">
              {block.turns.map((turn, index) => (
                <div key={index} className="grid gap-1 border-b border-line-soft py-5 sm:grid-cols-[6rem_1fr] sm:gap-6">
                  <dt className="t-meta pt-1.5 text-muted">{turn.speaker}</dt>
                  <dd className="t-body-large">{turn.line}</dd>
                </div>
              ))}
            </dl>
            {block.footnote && (
              <p className="t-body mt-6 text-muted">{block.footnote}</p>
            )}
          </Reveal>
        </SectionShell>
      );

    case "screens":
      return (
        <SectionShell title={block.title} wide>
          <Reveal>
            {block.lead && <p className="t-body-large max-w-[62ch]">{block.lead}</p>}
            <ul className={`grid gap-px bg-[color:var(--line)] sm:grid-cols-2 lg:grid-cols-3 ${block.lead ? "mt-8" : ""}`}>
              {block.items.map((item) => (
                <li key={item.label} className="bg-background p-5">
                  <p className="t-meta text-accent-ink">{item.label}</p>
                  <p className="t-body mt-3 text-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </SectionShell>
      );

    case "table":
      return (
        <SectionShell title={block.title} wide>
          <Reveal>
            {block.lead && <p className="t-body-large max-w-[62ch]">{block.lead}</p>}
            <div className={`overflow-x-auto ${block.lead ? "mt-8" : ""}`}>
              <table className="w-full min-w-[36rem] border-collapse text-left">
                <thead>
                  <tr>
                    {block.columns.map((column, index) => (
                      <th
                        key={column}
                        scope="col"
                        className={`t-meta border-b border-line pb-3 align-bottom ${
                          index === 1 ? "text-accent-ink" : "text-muted"
                        }`}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, index) => (
                    <tr key={index}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`t-body border-b border-line-soft py-4 pr-6 align-top last:pr-0 ${
                            cellIndex === 0 ? "text-muted" : ""
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </SectionShell>
      );
  }
}
