import type { Metadata } from "next";
import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import "@/styles/globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { links, profile, siteUrl } from "@/content/profile";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const description =
  "Portfolio of Evode Manirahari, a product-minded software and AI engineer building full-stack systems across applied AI, backend infrastructure, voice, mobile, and human-centered software.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Evode Manirahari — Software & AI Engineer",
    template: "%s · Evode Manirahari",
  },
  description,
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "website",
    siteName: "Evode Manirahari",
    title: "Evode Manirahari — Software & AI Engineer",
    description,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evode Manirahari — Software & AI Engineer",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: siteUrl,
  jobTitle: profile.role,
  email: `mailto:${links.email}`,
  description: profile.supporting,
  address: {
    "@type": "PostalPlace",
    name: profile.location,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Sonoma State University",
  },
  sameAs: [links.github, links.linkedin],
  knowsAbout: [
    "Software engineering",
    "Full-stack development",
    "Backend systems",
    "Applied AI",
    "TypeScript",
    "React",
    "Next.js",
    "Python",
    "FastAPI",
    "React Native",
    "PostgreSQL",
    "AI evaluation",
    "Voice systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${instrumentSerif.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-foreground focus:text-background focus:px-4 focus:py-3 focus:t-meta"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="page-in">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // Static, build-time constant — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
