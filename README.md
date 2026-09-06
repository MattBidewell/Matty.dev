# Matty.dev

Source code for [matty.dev](https://matty.dev) — a personal website and blog, built with [Astro](https://astro.build) and deployed on Cloudflare Pages.

## Getting started

```bash
npm install
npm run dev
```

## Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Build for production |
| `npm test` | Run Chromium interaction, responsive layout, and accessibility checks |
| `npx tsc --noEmit` | Check TypeScript |

Install the test browser once with `npx playwright install chromium`. The test
runner starts a local Astro server automatically. Run builds and tests separately
so they do not compete over Astro's generated files.

## Design direction

matty.dev is a personal publication by a practicing engineer, not a resume-first
portfolio. The homepage keeps a short introduction followed by notebook entries
and projects; the bookshelf and resume support that story.

- Self-hosted Newsreader for editorial headlines and reading; iA Writer Mono for navigation, dates, and small labels.
- Content links inherit the reading typography; no decorative arrows are appended to links.
- Eucalyptus green and pale green for the identity, with muted sage-tinted off-white reading surfaces and charcoal dark mode.
- Constructed pixel shapes with occasional dithering, sharp edges, and no terminal-themed decoration.
- A compact masthead; the homepage and long-form content share a centered 720px reading column.
- The theme follows the system until a reader chooses light or dark. That choice survives navigation and reloads; navigation and reading also work without JavaScript.

Palette and typography tokens live in `src/styles/globals.css`. The header's ASCII
mark lives in `src/components/shared/AsciiMark.astro`: a static character-built M
that briefly assembles on hover or keyboard focus, with no animation for reduced
motion. The compact pixel variant remains in `public/mark.svg` and the generated
sharing images in `src/lib/og-template.ts`. A standalone video/brand kit is
deliberately deferred until the website direction has been reviewed visually.

The homepage notebook combines the five latest live blog posts and Mumblings
in date order, followed by the three latest live projects. There are no featured
panels or promotional banners on the homepage.
Existing post URLs, publication filtering, RSS, and Markdown content are retained.
