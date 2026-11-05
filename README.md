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

## Media hosting

Public media lives in the **matty-dev-media** R2 Standard bucket, served directly
from **https://media.matty.dev** through its connected R2 custom domain. No
Worker binding, proxy, or public `r2.dev` URL is needed. Native images and video
playback do not need a CORS policy.

- `books/<filename>.webp`: bookshelf covers; filenames are in `src/data/books.ts`.
- `projects/screenforge/demo-v1.mp4`: optimised, silent ScreenForge demo.
- `projects/screenforge/demo-v1.jpg`: demo poster image.

Authenticate with `npx wrangler login`, then upload:

```bash
# Upload a directory of bookshelf WebP covers (skips other files).
npm run media:upload -- --books /path/to/book-covers

# Upload a new cover before referencing it in books.ts.
npm run media:upload -- ./cover.webp books/cover.webp

# Video and poster files stay outside Git.
npm run media:upload -- /path/to/demo-v2.mp4 projects/screenforge/demo-v2.mp4
npm run media:upload -- /path/to/demo-v2.jpg projects/screenforge/demo-v2.jpg
```

The upload script sets MIME types and a one-day public cache lifetime. Use new
filenames when replacing media so updates are visible immediately. The initial
`demo-v1` files use a one-year immutable cache lifetime.

Prepare a browser-compatible demo and poster with FFmpeg:

```bash
ffmpeg -i input.mp4 -map 0:v:0 -vf 'fps=30,scale=1920:-2' \
  -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p \
  -movflags +faststart -an demo-v2.mp4
ffmpeg -ss 6 -i input.mp4 -frames:v 1 -vf 'scale=1280:-2' \
  -q:v 2 -update 1 demo-v2.jpg
```

The ScreenForge demo uses native controls, inline mobile playback, and
`preload="none"`: the poster loads first, and the video is requested on play.
It has no audio; the figure caption describes the workflow.

Book covers and demo files live outside Git. Upload media explicitly before
publishing content; it is not part of the site build, and a public clone needs
no upload credentials to run the site. Credentials come from your local Wrangler
login, never from committed files. Using an existing object key replaces it.

To add a book, prepare its WebP cover outside the repository, upload it to
`books/<filename>.webp`, then add the entry to `src/data/books.ts` with
`image: "<filename>.webp"`. Preview `/bookshelf` before committing the entry.
The old local covers directory is ignored to prevent accidental reintroduction.

`scripts/convert-book-covers.sh` preserves the existing batch conversion helper.
Run it with Bash from the external directory containing your JPG/JPEG covers;
it requires `cwebp` and deletes each original only after a successful conversion.
