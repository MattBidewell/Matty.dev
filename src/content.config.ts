import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/posts",
    generateId: ({ entry }) => entry.replace(/\.md$/, ""),
  }),
  schema: z.object({
    title: z.string(),
    status: z.enum(["live", "draft"]).default("draft"),
    excerpt: z.string().optional(),
    category: z.enum(["blog", "mumbling", "project"]).optional(),
    date: z.date(),
    alt: z.string().nullable().optional(),
    github_url: z.string().url().nullable().optional(),
    demo_url: z.string().url().nullable().optional(),
    tech_stack: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
  }),
});

export const collections = { posts };
