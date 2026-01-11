import ProjectLinks from "../components/home/projectLinks/ProjectLinks";
import { getPosts } from "../../lib/api";
import { Post } from "../../types/post";

export default async function Projects() {
  const projects = getData();
  return (
    <div className="container">
      <ProjectLinks projects={projects} hasLimit={false} />
    </div>
  );
}

function getData(): Post[] {
  const projects = getPosts(
    ["title", "slug", "excerpt", "linkSlug", "alt", "tech_stack", "github_url", "demo_url", "featured"],
    undefined,
    "project"
  );
  return projects;
}
