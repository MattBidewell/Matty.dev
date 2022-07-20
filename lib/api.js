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

  items.date = data.date ? data.date.toISOString().split("T")[0] : 0;
  items.status = data.status ? data.status : "draft";

  fields.forEach((field) => {
    if (field === "status" || field === "date") {
      return;
    }
    if (field === 'slug') {
      items[field] = rawSlug;
      return;
    }
    if (field === 'content') {
      items[field] = content;
      return;
    }
    if (field === "linkSlug") {
      items[field] = `/posts/${rawSlug}`
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
      return;
    }
  });

  return items
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
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
    .sort((post1, post2) => post1.date > post2.date ? -1 : 1);
  return posts;
}