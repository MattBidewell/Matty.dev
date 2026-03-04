import { Post } from "../../../../types/post";
import Link from "next/link";
import styles from "./BlogLinks.module.css";

export default function BlogLinks({
  posts,
  hasLimit,
  title = "Blog posts",
  moreLinkLabel = "More posts...",
  moreLinkHref = "/blog",
  sectionId,
}: {
  posts: Post[];
  hasLimit: Boolean;
  title?: string;
  moreLinkLabel?: string;
  moreLinkHref?: string;
  sectionId?: string;
}) {
  return (
    <>
      <section className="content">
        <section className={styles.bloglinks_content}>
          <h2 id={sectionId} className={styles.title}>{title}</h2>
          <table className={styles["table-content"]}>
            <tbody>
              {createPosts(posts)}
            </tbody>
          </table>
          {hasLimit && (
            <p className={styles["more-link"]}>
              <Link href={moreLinkHref}>{moreLinkLabel}</Link>
            </p>
          )}
        </section>
      </section>
    </>
  );
}

function createPosts(arrayOfPosts: Post[]) {
  return Array.from(arrayOfPosts).map((post) => {
    return (
      <tr key={post.linkSlug}>
        <td className={styles["date-cell"]}>
          <p>{post.date}</p>
        </td>
        <td>
          <p>
            <Link href={post.linkSlug}>{post.title}</Link>
          </p>
        </td>
      </tr>
    );
  });
}
