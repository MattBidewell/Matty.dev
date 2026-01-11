import BlogLinks from "./components/home/blogLinks/BlogLinks";
import ProjectLinks from "./components/home/projectLinks/ProjectLinks";
import { getPosts } from "../lib/api";
import Content from "./components/home/content/Content";
import { Post } from "../types/post";

export default function Home() {
  const { posts, projects } = getData();
  return (
    <>
      <Content />
      <ProjectLinks projects={projects} hasLimit={true} />
      <BlogLinks posts={posts} hasLimit={true} />
    </>
  );
}

function getData(): { posts: Post[]; projects: Post[] } {
  const posts = getPosts(
    ["title", "slug", "excerpt", "linkSlug", "alt"],
    10,
    "blog"
  );
  const projects = getPosts(
    ["title", "slug", "excerpt", "linkSlug", "alt", "tech_stack", "github_url", "demo_url", "featured"],
    undefined,
    "project"
  ).filter((p) => p.featured); // Only show featured projects on homepage
  return { posts, projects };
}
