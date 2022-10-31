import { Post } from "../../../../types/post";
import styles from "./BlogLinks.module.css";

export default function BlogLinks({
  posts,
  hasLimit,
}: {
  posts: Post[];
  hasLimit: Boolean;
}) {
  return (
    <>
      <section className="content">
        <section className={styles.bloglinks_content}>
          <h2 className={styles.title}>Blog posts</h2>
          {createPosts(posts)}
          {hasLimit && <a href="/blog">More...</a>}
        </section>
      </section>
    </>
  );
}

function createPosts(arrayOfPosts: Post[]) {
  return Array.from(arrayOfPosts).map((post) => {
    return (
      <div className={styles["post-container"]} key={post.slug}>
        <picture className={styles["post-thumbnail"]}>
          <img src={`./assets/images/${post.image}`} alt={post.alt} />
        </picture>
        <div className={styles["post-container-content"]}>
          <h3 className="post-link-title">{post.title}</h3>
          <p className="date">{post.date}</p>
          <p>{post.excerpt}</p>
          <a href={post.linkSlug}>Read more...</a>
        </div>
      </div>
    );
  });
}
