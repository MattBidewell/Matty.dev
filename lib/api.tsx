import matter from "gray-matter";
import fs from "fs";
import { join } from "path";
import { Post } from "../types/post";

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

  const items: Post = {
    date: "1970-01-01",
    excerpt: "e",
    content: "c",
  };

  if (data.date) {
    items.date = data.date.toISOString().split("T")[0];
  }

  items.status = data.status ? data.status : "draft";
  items.image = `${rawSlug}/thumbnail.webp`;

  fields.forEach((field: string) => {
    if (field === "status" || field === "date") {
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
      items.linkSlug = `/blog/${rawSlug}`;
    }
    if (typeof data[field] !== "undefined") {
      const ObjKey = field as keyof typeof items;
      items[ObjKey] = data[field];
      return;
    }
  });

  return items;
}

export function getPosts(fields: string[] = [], limit?: number): Post[] {
  const slugs = getPostSlugs(limit);

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
        return postDate < date;
      } catch (err) {
        console.log(err);
        return false;
      }
    })
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
