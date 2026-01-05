# AGENTS.md - Matty.dev

This document provides guidance for AI coding agents working in this repository.

## Project Overview

This is a personal website/blog built with **Next.js 14** (App Router) using TypeScript.
Deployed on Netlify. The site includes a blog, bookshelf, and about pages.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: CSS Modules + global CSS
- **Markdown**: gray-matter for frontmatter, Remarkable for rendering
- **Syntax Highlighting**: highlight.js (tokyo-night-dark theme)
- **Deployment**: Netlify

## Project Structure

```
app/                    # Next.js App Router pages and components
  components/           # React components organized by feature
    shared/             # Shared components (nav, footer, topContent)
    home/               # Home page components
    blog/               # Blog-specific components
    book/               # Bookshelf components
  blog/                 # Blog pages (dynamic [slug] route)
  bookshelf/            # Bookshelf page
  about/                # About page
  rss/                  # RSS feed route
  styles/               # Global CSS
lib/                    # Utility functions (api.tsx for blog posts)
types/                  # TypeScript type definitions
_posts/                 # Markdown blog posts
public/                 # Static assets
```

## Build/Lint/Test Commands

```bash
# Development
npm run dev             # Start dev server with timestamp

# Build
npm run build           # Production build
npm run deploy          # Stamp + build for deployment
npm run compile         # TypeScript compilation check (tsc)

# Linting
npm run lint            # Run ESLint (next lint)

# Testing (Playwright E2E)
npm test                              # Run all tests
npm test -- tests/e2e/home.spec.ts    # Run single test file
npm test -- -g "page title"           # Run tests matching pattern
npm run test:headed                   # Run with visible browser
npm run test:ui                       # Interactive UI mode

# Other
npm run stamp           # Generate build timestamp
npm run export          # Export static site (legacy)
```

### Testing

E2E tests use **Playwright** with Chromium. Tests are in `tests/e2e/`.

- `home.spec.ts` - Home page tests (title, navigation, avatar image)
- `blog.spec.ts` - Blog list and individual post tests

The test runner automatically starts the dev server before running tests.

**TODO:** Add GitHub Action for CI (currently local only).

## Code Style Guidelines

### TypeScript

- **Strict mode enabled** - all code must pass strict TypeScript checks
- Use explicit types for function parameters and return values
- Define interfaces/types in `types/` directory for shared types
- Use `type` for object shapes (e.g., `type Post = {...}`)
- Use `interface` for component props or extensible types (e.g., `interface IBook`)
- Prefer `unknown` over `any` in catch blocks: `catch (err: unknown)`

### Imports

- Use relative paths for local imports: `import { Post } from "../types/post"`
- Use path alias for components: `@components/*` maps to `app/components/*`
- Group imports: React/Next.js first, then external libs, then local modules
- Import CSS modules directly: `import styles from "./Component.module.css"`

```typescript
// Correct import order
import { NextResponse } from "next/server";
import Link from "next/link";
import matter from "gray-matter";
import { Post } from "../types/post";
import styles from "./Component.module.css";
```

### React Components

- Use function declarations for components: `export default function Component()`
- Prefer named exports for non-page components when needed
- Use `export default` for page components and main component files
- Props should be typed inline or with interfaces:

```typescript
export default function BlogLinks({
  posts,
  hasLimit,
}: {
  posts: Post[];
  hasLimit: Boolean;
}) {
  // ...
}
```

### Naming Conventions

- **Files**: PascalCase for components (`BlogLinks.tsx`), camelCase for utilities (`api.tsx`)
- **CSS Modules**: `ComponentName.module.css`
- **Variables/Functions**: camelCase (`getPosts`, `rawSlug`)
- **Types/Interfaces**: PascalCase with `I` prefix for interfaces (`IBook`), plain PascalCase for types (`Post`)
- **Constants**: camelCase for module-level constants

### CSS Styling

- Use CSS Modules for component-specific styles
- Global styles in `app/styles/globals.css`
- Use CSS custom properties (variables) for theming: `var(--text-color)`
- Support light/dark themes via `data-theme` attribute
- Class names in CSS Modules use kebab-case: `.blog-links`, `.table-content`

### Error Handling

- Use try-catch blocks for file operations and external calls
- Log errors with context: `console.log("error rendering code block" + err.message)`
- Return safe fallbacks when appropriate
- Check `instanceof Error` before accessing error properties

```typescript
try {
  return hljs.highlight(lang, str).value;
} catch (err: unknown) {
  if (err instanceof Error)
    console.log("error rendering code block" + err.message);
}
```

### Next.js Patterns

- Use App Router conventions (`page.tsx`, `layout.tsx`, `route.ts`)
- Export `metadata` object for SEO in layout/page files
- Use `generateStaticParams` for dynamic routes
- Server components by default; add `"use client"` only when needed
- Use `next/link` for internal navigation
- Use `next/script` for client-side scripts with `strategy` prop

### Blog Posts

- Posts are Markdown files in `_posts/` directory
- Frontmatter fields: `title`, `date`, `excerpt`, `status`, `alt`
- Post status must be "live" to appear on site
- Images stored in `public/[slug]/thumbnail.webp`
- Date format in frontmatter: YAML date (parsed to ISO string)

### External Links

- Use `target="_blank"` with `rel="noopener noreferrer"` for external links
- Use `rel="me"` for identity verification links (Mastodon)

## ESLint Configuration

Extends `next/core-web-vitals` - follows Next.js recommended rules.

## Git Workflow

- Single `CODEOWNERS` file at root
- Dependabot configured for dependency updates
- Deploy via Netlify (automatic on push)

## Common Tasks

### Adding a Blog Post

1. Create `_posts/[slug].md` with frontmatter
2. Add thumbnail image to `public/[slug]/thumbnail.webp`
3. Set `status: live` and future/current date

### Adding a Book

1. Add entry to `app/bookshelf/books.ts`
2. Add book cover image to appropriate location
3. Follow `IBook` interface structure

### Creating a New Component

1. Create component file in appropriate `app/components/` subdirectory
2. Create matching CSS Module if needed
3. Use PascalCase naming
4. Export as default function
