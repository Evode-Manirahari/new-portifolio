"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** "rise" fades and lifts; "clip" wipes the block open from the top. */
  variant?: "rise" | "clip";
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Scroll-triggered reveal built on IntersectionObserver and CSS transitions —
 * no animation library, and no re-render when an element becomes visible: the
 * observer flips a data attribute on the node directly.
 *
 * The hidden state is scoped to `@media (scripting: enabled)` in globals.css,
 * so if JavaScript never runs the content is simply visible. It is also
 * neutralised under prefers-reduced-motion.
 */
export function Reveal({
  children,
  variant = "rise",
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => {
      node.dataset.visible = "true";
    };

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    // `data-visible` is deliberately not declared here — the effect owns it,
    // and its absence is the hidden state in CSS.
    <Tag
      ref={ref}
      data-motion={variant}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
