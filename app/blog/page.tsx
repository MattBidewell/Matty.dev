import BlogLinks from "../components/home/blogLinks/BlogLinks";
import { getPosts } from "../../lib/api";
import { Post } from "../../types/post";

export default async function Blog() {
  const { posts, mumblings } = getData();

  return (
    <div className="container">
      <BlogLinks posts={posts} hasLimit={false} title="Blog posts" sectionId="posts" />
      <BlogLinks posts={mumblings} hasLimit={false} title="Mumblings" sectionId="mumblings" />
    </div>
  );
}

function getData(): { posts: Post[]; mumblings: Post[] } {
  const fields = ["title", "slug", "excerpt", "linkSlug", "alt"];
  const posts = getPosts(fields, undefined, "blog");
  const mumblings = getPosts(fields, undefined, "mumbling");
  return { posts, mumblings };
}
