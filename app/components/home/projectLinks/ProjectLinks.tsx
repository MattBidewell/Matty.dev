import { Post } from "../../../../types/post";
import Link from "next/link";
import styles from "./ProjectLinks.module.css";

export default function ProjectLinks({
  projects,
  hasLimit,
}: {
  projects: Post[];
  hasLimit: Boolean;
}) {
  return (
    <>
      <section className="content">
        <section className={styles.projectlinks_content}>
          <h2 className={styles.title}>Projects</h2>
          <table className={styles["table-content"]}>
            <tbody>
              {createProjects(projects)}
            </tbody>
          </table>
          {hasLimit && (
            <p className={styles["more-link"]}>
              <Link href="/projects">More projects...</Link>
            </p>
          )}
        </section>
      </section>
    </>
  );
}

function createProjects(arrayOfProjects: Post[]) {
  return Array.from(arrayOfProjects).map((project) => {
    return (
      <tr key={project.linkSlug}>
        <td className={styles["date-cell"]}>
          <p>{project.date}</p>
        </td>
        <td>
          <p>
            <Link href={project.linkSlug}>{project.title}</Link>
          </p>
        </td>
      </tr>
    );
  });
}
