"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { links } from "@/content/profile";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Escape closes and returns focus to the toggle; focus moves into the panel
  // when it opens so keyboard users are not left behind the menu.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/92 backdrop-blur-[6px]">
      <div className="mx-auto flex w-full max-w-[104rem] items-center justify-between gap-4 px-[var(--gutter)] py-3.5">
        <Link
          href="/"
          className="t-meta inline-flex min-h-11 items-center link-underline"
          aria-label="Evode Manirahari — home"
        >
          Evode Manirahari
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="t-meta inline-flex min-h-11 items-center link-underline"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="t-meta inline-flex min-h-11 items-center border border-line px-4 transition-colors duration-300 hover:border-foreground"
          >
            Résumé
          </a>
        </nav>

        <div className="flex items-center gap-4 md:hidden">
          {/* Kept in the bar, not only in the menu — a recruiter should never
              have to open a menu to find the résumé. */}
          <a
            href={links.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="t-meta inline-flex min-h-11 items-center link-underline"
          >
            Résumé
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="t-meta -mr-1 inline-flex min-h-11 min-w-11 items-center justify-end gap-2"
          >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true" className="inline-flex flex-col gap-[3px]">
              <span className="block h-px w-4 bg-foreground" />
              <span className="block h-px w-4 bg-foreground" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="border-t border-line bg-background md:hidden"
        >
          <nav aria-label="Primary mobile" className="flex flex-col px-[var(--gutter)] pb-6 pt-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="t-hero border-b border-line-soft py-4 !text-[1.9rem]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={links.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="t-hero border-b border-line-soft py-4 !text-[1.9rem]"
            >
              Résumé
            </a>
            <div className="flex gap-6 pt-6">
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
          </nav>
        </div>
      )}
    </header>
  );
}
