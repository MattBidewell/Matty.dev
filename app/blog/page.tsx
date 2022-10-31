import BlogLinks from "../components/home/blogLinks/BlogLinks";
import { getPosts } from "../../lib/api";
import { Post } from "../../types/post";

export default async function Blog() {
  const posts = getData();
  return (
    <div className="container">
      <BlogLinks posts={posts} hasLimit={false} />
    </div>
  );
}

function getData(): Post[] {
  const posts = getPosts(["title", "slug", "excerpt", "linkSlug", "alt"]);
  return posts;
}
