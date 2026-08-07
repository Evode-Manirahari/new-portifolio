# Evode Manirahari — portfolio

Personal portfolio and case-study archive. Next.js App Router, TypeScript in
strict mode, Tailwind CSS v4, deployed on Vercel.

> **Note on the repository name.** The repository is `new-portifolio`; the
> spelling is preserved because renaming it would break existing links. Every
> user-visible occurrence on the site reads "portfolio".

---

## Install

```bash
npm install
```

Node 20 or newer. No environment variables, no services, no database — the
site is entirely static content compiled at build time.

## Develop

```bash
npm run dev        # http://localhost:3000
npm run lint       # ESLint
npx tsc --noEmit   # type check
npm run build      # production build
npm start          # serve the production build
```

---

## How the site is put together

```text
app/
  layout.tsx            root layout, fonts, metadata, Person structured data
  page.tsx              homepage — composes the section components in order
  about/page.tsx        full background
  work/[slug]/page.tsx  the four case studies, statically generated
  not-found.tsx         404
  opengraph-image.tsx   share image, generated at build time
  icon.svg              favicon
  sitemap.ts robots.ts

components/
  site-header.tsx       nav + accessible mobile menu (the only stateful UI)
  hero.tsx  recruiter-summary.tsx  selected-work.tsx  project-feature.tsx
  capabilities.tsx  current-focus.tsx  experience-summary.tsx
  project-index.tsx  about-preview.tsx  contact-section.tsx  site-footer.tsx
  primitives.tsx        Container, Section, ActionLink, StatusTag, ResumeLink…
  media-frame.tsx       image slot, renders a labelled placeholder when empty
  diagrams/             every project diagram, built from HTML + CSS
  project/              case-study block renderer and prev/next navigation
  motion/reveal.tsx     the one client-side motion component

content/                ← all copy and data lives here
  profile.ts            identity, contact, recruiter summary, about copy
  projects.ts           Project type, the four featured projects, the archive
  case-studies.ts       long-form case-study content as typed blocks
  capabilities.ts  experience.ts  education.ts  leadership.ts  media.ts

styles/globals.css      design tokens, type scale, motion
public/                 résumé PDF and images
```

Everything is a Server Component except `components/site-header.tsx` (mobile
menu state) and `components/motion/reveal.tsx` (an IntersectionObserver). There
is no animation library and no runtime data fetching.

---

## Editing content

**All copy lives in `content/`. You should not need to open a component to
change what the site says.**

| To change | Edit |
| --- | --- |
| Name, role, headline, availability, email, links | `content/profile.ts` |
| The "at a glance" recruiter block | `recruiterSummary` in `content/profile.ts` |
| About-page bio, interests, philosophy, goals | `content/profile.ts` |
| Skill groups | `content/capabilities.ts` |
| Jobs and internships | `content/experience.ts` |
| Degree, graduation date, certifications | `content/education.ts` |
| Student-government and leadership roles | `content/leadership.ts` |
| The canonical site URL | `siteUrl` in `content/profile.ts` |

### Adding or editing a featured project

1. Add an entry to `projects` in `content/projects.ts`. The `Project` type will
   tell you what is required; `featured: true` puts it on the homepage.
2. Add a matching entry to `caseStudies` in `content/case-studies.ts`, using
   the same `slug`. Compose the page from `blocks` — `prose`, `list`,
   `numbered`, `diagram`, `metrics`, `statement`, `dialogue`, `screens`, and
   `table` are available, in any order.
3. If the case study needs a new diagram, add a component to
   `components/diagrams/index.tsx`, register it in the `diagrams` map, and add
   its id to `DiagramId` in `content/case-studies.ts`.
4. Add the slug to `projectSignature` so it gets a homepage visual.

The route, metadata, sitemap entry, structured data, and prev/next navigation
all follow automatically.

### Adding an archive row

Append to `archive` in `content/projects.ts`. Use an honest `status` — the
labels are `current-build`, `deployed-prototype`, `hackathon`, `experiment`,
`research`, and `archived`.

---

## Replacing images

Image slots are declared in `content/media.ts`. Until a file exists, the site
renders a visible labelled placeholder rather than a fake or a blank space.

1. Put the file in `public/images/profile/` or `public/images/projects/`.
2. Point `src` at it, write real `alt` text, and set `available: true`.

Decorative images should use `alt: ""`. Anything that carries meaning needs a
description of what it shows, not a caption.

## Replacing the résumé

1. Save the PDF as `public/Evode-Manirahari-Resume.pdf` — **keep the filename**,
   it is linked from the nav, hero, about page, contact section, and footer.
2. Set `resumeStatus = "available"` in `content/profile.ts`.

That removes the "résumé pending" notices site-wide. The link opens in a new
tab and carries no cache-busting query string.

---

## Content integrity

`CONTENT_REVIEW.md` records every claim on this site, its source, and its
verification status — including the claims that were **held back** because no
source could be found. Read it before adding anything.

Three rules the site is built on:

1. **Nothing is published without a source.** Résumé, repository, verifiable
   document, or Evode's direct confirmation.
2. **Status labels are honest.** A hackathon build says hackathon. A prototype
   says prototype. No project implies customers, revenue, or adoption.
3. **Starter templates are disclosed.** Where a project began from one, the
   case study states plainly what already existed and what was added.

Unverified experience entries sit in `pendingVerification` in
`content/experience.ts`, which no component imports. Moving one into
`experience` publishes it — do that only once its row in `CONTENT_REVIEW.md`
says `Verified`.

---

## Accessibility and performance

Verified with an automated sweep across 320, 375, 430, 768, 1024, 1440, and
1920 px on every route:

- No horizontal overflow at any width.
- One `<h1>` per page, no skipped heading levels, `header`/`main`/`footer`
  landmarks, labelled `nav` elements, and a skip link.
- Keyboard-accessible mobile menu: `aria-expanded`, `aria-controls`, focus
  moves into the panel on open, Escape closes and restores focus.
- Every image has an `alt` attribute; diagrams are grouped and labelled.
- Status is never carried by colour alone — the label text is always present.
- All motion is disabled under `prefers-reduced-motion`, including smooth
  scrolling; revealed content is present in the server-rendered HTML.

If you add a component, re-run the sweep before shipping.

---

## Deploying

The site is static and has no runtime configuration.

1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Framework preset: Next.js. Build `npm run build`, output `.next`. No
   environment variables.
3. After the first deploy, set `siteUrl` in `content/profile.ts` to the final
   URL and redeploy — it drives canonical URLs, Open Graph, the sitemap, and
   robots.txt.

Any static host that supports Next.js works; Vercel needs no configuration.

### If the deploy fails with `npm error Invalid Version:`

npm 11.3.0 writes two malformed entries into `package-lock.json` for sharp's
musl platform binaries — `@img/sharp-libvips-linuxmusl-x64`, recorded as
`{"optional": true}` with no version, resolved URL, or integrity hash. Local
installs tolerate it; the version of npm on the build machine does not, and
fails with an empty version string.

They come back every time the lockfile is regenerated on that npm version.
After running `npm install`, check with:

```bash
node -e "const l=require('./package-lock.json');const b=Object.entries(l.packages).filter(([k,v])=>k&&!v.version).map(([k])=>k);console.log(b.length?b:'lockfile clean')"
```

If anything is listed, delete those keys from `packages` in
`package-lock.json` and run `npm ci` to confirm it still installs. The entries
carry no installable information, so removing them changes nothing about what
gets installed.

---

## GitHub profile recommendations

Documentation only — this repository does not modify any other repository.
Suggested, in priority order:

1. **Pin six repositories:** `act`, `SecondLine`, `DrCrop`, `FocusGate`,
   `fieldcard`, and this one. Those are the repositories the portfolio sends
   people to.
2. **Add a description to every pinned repository.** `DrCrop`, `FocusGate`,
   and `act-api` currently have none. One sentence that says what it does and
   what stage it is at.
3. **Add topics** so the repositories are discoverable: `typescript`,
   `python`, `fastapi`, `react-native`, `nextjs`, `voice-ai`, `evaluation`,
   `geospatial`.
4. **Put the status in the README's first paragraph.** "Hackathon build",
   "deployed prototype", "in active development" — the same honesty the
   portfolio uses. `SecondLine` and `act` already do this well.
5. **Add a screenshot or a short demo clip** to each flagship README. `eyebrain`
   and `SecondLine` link demo videos; the others do not.
6. **Reduce noise.** Several repositories are forks or empty starters and dilute
   the profile. Archive or unpin them rather than deleting, so nothing linked
   from elsewhere breaks.
7. **Keep `act-api` private if it should be** — the portfolio deliberately links
   only the public `act` repository.
