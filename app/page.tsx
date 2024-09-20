import BlogLinks from "./components/home/blogLinks/BlogLinks";
import { getPosts } from "../lib/api";
import Content from "./components/home/content/Content";
import { Post } from "../types/post";

export default function Home() {
  const posts = getData();
  return (
    <>
      <Content />
      <BlogLinks posts={posts} hasLimit={true} />
    </>
  );
}

function getData(): Post[] {
  const posts = getPosts(["title", "slug", "excerpt", "linkSlug", "alt"], 10);
  return posts;
}
