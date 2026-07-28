import type { APIRoute, GetStaticPaths } from "astro";
import { renderOgPng } from "../../lib/og-template";

interface PageOg {
  slug: string;
  title: string;
  description: string;
  eyebrow?: string;
}

const pages: PageOg[] = [
  {
    slug: "home",
    title: "Matty.dev",
    description:
      "Notes, projects, and mumblings from Matt Bidewell — a software engineer building on the web.",
  },
  {
    slug: "about",
    title: "About",
    description:
      "Matt Bidewell — Senior Software Engineer at Contentful, shipping reliable systems and writing in the open.",
    eyebrow: "about",
  },
  {
    slug: "blog",
    title: "Blog",
    description: "Long-form posts on software engineering, systems, and the cloud.",
    eyebrow: "posts",
  },
  {
    slug: "mumblings",
    title: "Mumblings",
    description:
      "Shorter, monthly-ish notes on what I've been building, reading, and thinking about.",
    eyebrow: "mumblings",
  },
  {
    slug: "projects",
    title: "Projects",
    description:
      "Selected side projects and things I've shipped — open source, experiments, and product work.",
    eyebrow: "projects",
  },
  {
    slug: "bookshelf",
    title: "Bookshelf",
    description:
      "A running log of the books that stuck with me — engineering, systems, sci-fi, fantasy, and the odd rabbit hole.",
    eyebrow: "bookshelf",
  },
];

export const getStaticPaths: GetStaticPaths = () =>
  pages.map((page) => ({
    params: { page: page.slug },
    props: { page },
  }));

export const GET: APIRoute = async ({ props }) => {
  const page = (props as { page: PageOg }).page;
  const png = await renderOgPng({
    title: page.title,
    excerpt: page.description,
    category: "page",
    eyebrow: page.eyebrow,
  });
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
