import matter from "gray-matter";
import fs from "fs";
import { join } from "path";
import { Post, PostCategory, PostFormat } from "../types/post";
import { getMdxPostMeta, getMdxPostSlugs } from "../content/posts";

const legacyPostsDirectory = join(process.cwd(), "_posts");
const interactivePostsDirectory = join(process.cwd(), "content", "posts");

type ResolvedPostSource = {
  slug: string;
  fullPath: string;
  format: PostFormat;
};

function pathExists(path: string) {
  return fs.existsSync(path);
}

function stripPostExtension(slug: string) {
  return slug.replace(/\.(md|mdx)$/, "");
}

function normalizeDate(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().split("T")[0];
  }

  if (typeof value === "string" && value.length > 0) {
    const parsedDate = new Date(value);

    if (!Number.isNaN(parsedDate.getTime())) {
      return parsedDate.toISOString().split("T")[0];
    }

    return value;
  }

  return "1970-01-01";
}

function getLegacyPostSlugs() {
  if (!pathExists(legacyPostsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(legacyPostsDirectory)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map(stripPostExtension);
}

function getInteractivePostSlugs() {
  return getMdxPostSlugs().filter((slug) => {
    return pathExists(join(interactivePostsDirectory, slug, "index.mdx"));
  });
}

function resolvePostSourceBySlug(slug: string): ResolvedPostSource {
  const rawSlug = stripPostExtension(slug);
  const legacyMarkdownPath = join(legacyPostsDirectory, `${rawSlug}.md`);

  if (pathExists(legacyMarkdownPath)) {
    return {
      slug: rawSlug,
      fullPath: legacyMarkdownPath,
      format: "md",
    };
  }

  const legacyMdxPath = join(legacyPostsDirectory, `${rawSlug}.mdx`);

  if (pathExists(legacyMdxPath)) {
    return {
      slug: rawSlug,
      fullPath: legacyMdxPath,
      format: "mdx",
    };
  }

  const interactiveMdxPath = join(interactivePostsDirectory, rawSlug, "index.mdx");

  if (pathExists(interactiveMdxPath)) {
    return {
      slug: rawSlug,
      fullPath: interactiveMdxPath,
      format: "mdx",
    };
  }

  throw new Error(`Could not find a post for slug: ${rawSlug}`);
}

export function getPostSlugs(limit: number | undefined) {
  const slugs = Array.from(
    new Set([...getLegacyPostSlugs(), ...getInteractivePostSlugs()])
  );

  if (limit) {
    return slugs.slice(slugs.length - limit);
  }

  return slugs;
}

export function getPostBySlug(slug: string, fields: string[] = []): Post {
  const { slug: rawSlug, fullPath, format } = resolvePostSourceBySlug(slug);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content }: { data: any; content: string } =
    matter(fileContents);
  const mdxMeta = format === "mdx" ? getMdxPostMeta(rawSlug) : null;
  const metadata = mdxMeta ? { ...data, ...mdxMeta } : data;

  const inferredCategory: PostCategory = rawSlug.includes("mumblings")
    ? "mumbling"
    : "blog";
  // Default category to inferred value for backwards compatibility
  const category: PostCategory = metadata.category || inferredCategory;

  const items: Post = {
    date: "1970-01-01",
    excerpt: "",
    content: "",
    linkSlug: "",
    alt: "",
    format,
    sourcePath: fullPath,
    category,
  };

  if (metadata.date) {
    items.date = normalizeDate(metadata.date);
  }

  items.status = metadata.status ? metadata.status : "draft";
  items.image = metadata.image ? metadata.image : `${rawSlug}/thumbnail.webp`;

  // Handle project-specific fields
  if (metadata.github_url) items.github_url = metadata.github_url;
  if (metadata.demo_url) items.demo_url = metadata.demo_url;
  if (metadata.tech_stack) items.tech_stack = metadata.tech_stack;
  if (typeof metadata.featured !== "undefined") items.featured = metadata.featured;

  fields.forEach((field: string) => {
    if (
      field === "status" ||
      field === "date" ||
      field === "category" ||
      field === "format" ||
      field === "sourcePath"
    ) {
      return;
    }
    if (field === "slug") {
      items.slug = rawSlug;
      return;
    }
    if (field === "content") {
      items.content = content;
      return;
    }
    if (field === "linkSlug") {
      // Dynamic linkSlug based on category
      const prefix =
        category === "project"
          ? "/projects"
          : category === "mumbling"
            ? "/mumblings"
            : "/blog";
      items.linkSlug = `${prefix}/${rawSlug}`;
      return;
    }
    if (typeof metadata[field] !== "undefined") {
      const ObjKey = field as keyof Post;
      // Skip fields already handled
      if (ObjKey === "github_url" || ObjKey === "demo_url" || ObjKey === "tech_stack" || ObjKey === "featured") {
        return;
      }
      (items as any)[ObjKey] = metadata[field];
      return;
    }
  });

  return items;
}

export function getPosts(
  fields: string[] = [],
  limit?: number,
  category?: PostCategory
): Post[] {
  const slugs = getPostSlugs(undefined); // Get all slugs, apply limit after filtering

  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((post) => {
      try {
        if (post.status !== "live") {
          return false;
        }
        const date = new Date().getTime();
        const postDate = new Date(post.date).getTime();
        // if the postdate EPOC time is greater than the current date. Post date is in the future.
        if (postDate >= date) {
          return false;
        }
        // Filter by category if specified
        if (category && post.category !== category) {
          return false;
        }
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    })
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  // Apply limit after filtering and sorting
  if (limit) {
    return posts.slice(0, limit);
  }
  return posts;
}
