import Image from "next/image";
import type { MediaSlot } from "@/content/media";
import { Reveal } from "@/components/motion/reveal";

/**
 * Renders an image when the file exists, and an explicit labelled placeholder
 * when it does not. The placeholder is deliberately visible: an unfilled slot
 * should read as unfinished, not as a design choice.
 */
export function MediaFrame({
  slot,
  priority = false,
  sizes = "(min-width: 1024px) 34vw, 100vw",
  className = "",
  caption,
}: {
  slot: MediaSlot;
  priority?: boolean;
  sizes?: string;
  className?: string;
  caption?: string;
}) {
  return (
    <figure className={className}>
      <Reveal variant="clip">
        <div
          className="relative w-full overflow-hidden bg-surface"
          style={{ aspectRatio: slot.ratio }}
        >
          {slot.available ? (
            <Image
              src={slot.src}
              alt={slot.alt}
              fill
              priority={priority}
              sizes={sizes}
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col justify-between border border-line p-5">
              <span className="t-meta text-accent-ink">Image pending</span>
              <span className="t-body max-w-[34ch] text-muted">{slot.note}</span>
              <span className="t-meta break-all text-muted">{slot.src}</span>
            </div>
          )}
        </div>
      </Reveal>
      {caption && (
        <figcaption className="t-meta mt-3 text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}
