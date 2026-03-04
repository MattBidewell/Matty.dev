import BlogLinks from "../components/home/blogLinks/BlogLinks";
import { getPosts } from "../../lib/api";
import { Post } from "../../types/post";

export default function MumblingsPage() {
  const mumblings = getData();

  return (
    <div className="container">
      <BlogLinks posts={mumblings} hasLimit={false} title="Mumblings" sectionId="mumblings" />
    </div>
  );
}

function getData(): Post[] {
  return getPosts(["title", "slug", "excerpt", "linkSlug", "alt"], undefined, "mumbling");
}
