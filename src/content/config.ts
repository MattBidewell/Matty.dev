import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
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
