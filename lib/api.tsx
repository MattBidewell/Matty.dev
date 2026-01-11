import matter from "gray-matter";
import fs from "fs";
import { join } from "path";
import { Post, PostCategory } from "../types/post";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs(limit: number | undefined) {
  const files = fs.readdirSync(postsDirectory);
  if (limit) {
    // only take X number from the end. (most recent)
    return files.slice(files.length - limit);
  }
  return files;
}

export function getPostBySlug(slug: string, fields: string[] = []): Post {
  const rawSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${rawSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content }: { data: any; content: string } =
    matter(fileContents);

  // Default category to "blog" for backwards compatibility
  const category: PostCategory = data.category || "blog";

  const items: Post = {
    date: "1970-01-01",
    excerpt: "",
    content: "",
    linkSlug: "",
    alt: "",
    category,
  };

  if (data.date) {
    items.date = data.date.toISOString().split("T")[0];
  }

  items.status = data.status ? data.status : "draft";
  items.image = `${rawSlug}/thumbnail.webp`;

  // Handle project-specific fields
  if (data.github_url) items.github_url = data.github_url;
  if (data.demo_url) items.demo_url = data.demo_url;
  if (data.tech_stack) items.tech_stack = data.tech_stack;
  if (typeof data.featured !== "undefined") items.featured = data.featured;

  fields.forEach((field: string) => {
    if (field === "status" || field === "date" || field === "category") {
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
      const prefix = category === "project" ? "/projects" : "/blog";
      items.linkSlug = `${prefix}/${rawSlug}`;
      return;
    }
    if (typeof data[field] !== "undefined") {
      const ObjKey = field as keyof Post;
      // Skip fields already handled
      if (ObjKey === "github_url" || ObjKey === "demo_url" || ObjKey === "tech_stack" || ObjKey === "featured") {
        return;
      }
      (items as any)[ObjKey] = data[field];
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
