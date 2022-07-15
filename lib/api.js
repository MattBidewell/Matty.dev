import matter from "gray-matter";
import fs from "fs";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {

  const rawSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${rawSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = rawSlug;
      return;
    }
    if (field === 'content') {
      items[field] = content;
      return;
    }
    if (field === "date") {
      items[field] = data.date.toISOString().split("T")[0];
      return;
    }
    if (field === "linkSlug") {
      items[field] = `/posts/${rawSlug}`
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
      return;
    }
  })

  return items
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => post1.date > post2.date ? -1 : 1);
  return posts;
}