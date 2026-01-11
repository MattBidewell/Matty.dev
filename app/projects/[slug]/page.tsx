import { Remarkable } from "remarkable";

// components
import PostBody from "../../components/blog/body/PostBody";
import PostFooter from "../../components/blog/footer/PostFooter";

import styles from "./Project.module.css";
import hljs from "highlight.js";
import "highlight.js/styles/tokyo-night-dark.css";

import { getPostBySlug, getPosts } from "../../../lib/api";

// remarkable and highlight js setup
const r = new Remarkable({
  highlight: function (str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err: unknown) {
        if (err instanceof Error)
          console.log("error rendering code block" + err.message);
      }
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}
    return "t"; // use external default escaping
  },
});

function getProject(slug: string) {
  const project = getPostBySlug(slug, [
    "title",
    "date",
    "slug",
    "content",
    "alt",
    "tech_stack",
    "github_url",
    "demo_url",
  ]);
  const content = r.render(project.content || "p");
  return { ...project, content };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  return (
    <div className="container">
      <h1 className={styles.title}>{project.title}</h1>
      <p className={styles.date}>{project.date}</p>

      {/* Project metadata */}
      <div className={styles.meta}>
        {project.tech_stack && project.tech_stack.length > 0 && (
          <div className={styles.techStack}>
            {project.tech_stack.map((tech) => (
              <span key={tech} className={styles.techTag}>
                {tech}
              </span>
            ))}
          </div>
        )}
        <div className={styles.links}>
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              GitHub
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>

      <PostBody content={project.content} />
      <PostFooter />
    </div>
  );
}

export async function generateStaticParams() {
  const projects = getPosts(["slug"], undefined, "project");
  const mappedProjects = projects.map((project) => {
    return {
      slug: project.slug,
    };
  });
  return mappedProjects;
}
