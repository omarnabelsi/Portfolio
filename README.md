# Omar Nabelsi — Portfolio

Personal portfolio of **Omar Nabelsi**, full-stack software engineer.
Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP and Lenis.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

Copy `.env.example` to `.env.local` and fill in what you need. Every variable is optional.

## Creative direction — "Editorial Engineering"

Warm paper, ink-black type and one vermilion signal colour. Kigo Studio was the benchmark for ambition: one strong material idea, oversized type and a signature mark. Nothing was copied.

- **Type:** Archivo (variable width and weight) for display, Instrument Serif italic for the emphasised phrase, JetBrains Mono for technical labels.
- **Signature:** عمر written in Ruqaa calligraphy. It's revealed right to left, the direction Arabic is written. An "ON" monogram is used at small sizes.
- **Hero centrepiece:** live topographic contour lines (marching squares over simplex noise) that bend around the cursor.
- **Case studies:** each has its own palette. ATIZAN Ledger is midnight green with gold; ALFA is graphite with violet and cyan.

## Structure

```
src/
  app/                  routes, metadata, sitemap, robots, OG image, /api/contact
  content/              all copy and data (site, projects, expertise, principles)
  components/
    layout/             header, footer, intro loader, smooth scroll, cursor
    home/               homepage sections
    case/               shared case-study building blocks
    visuals/            animated diagrams and mockups (ContourField, LedgerFlow, AgentPipeline…)
    ui/                 Reveal, CharRise, ArrowLink, Seal
  lib/                  motion helpers, noise, in-view hooks
scripts/process-portrait.mjs   one-off portrait grading (crop, background blur, mono grade)
```

Content lives in `src/content/*`. Editing copy should not require touching components.

## Motion and performance

- The entrance choreography (letter rise, seal reveal, fades) is CSS-only, so above-the-fold content never waits on JavaScript.
- GSAP ScrollTrigger handles the scroll-linked effects. Text-splitting is set up lazily, only as a section approaches the viewport.
- The contour field runs at about 30fps. It pauses off-screen and in background tabs, and drops to a static frame on devices where a frame costs more than 12ms.
- `prefers-reduced-motion` disables smooth scrolling, the cursor follower, parallax and all entrance animation. Touch devices use native scrolling.

## Contact form

`POST /api/contact` validates input, rate-limits by IP, includes a honeypot field and sends through the Resend HTTP API. If the keys aren't set, it returns 503 and the form shows an honest message with a link to GitHub. It never shows a fake success.

The rate limiter keeps its counts in memory, which is fine for a single instance. Use a shared store such as Upstash Redis if you deploy to many serverless instances.

## Content honesty

- The ATIZAN Ledger and ALFA interfaces on this site are original illustrations with sample values, and they are labelled that way on the page.
- Status sections separate what is built and tested from what isn't verified yet.
- ATIZAN Ledger is an internal Radikal project. No private code, data, APIs or infrastructure details are published.
