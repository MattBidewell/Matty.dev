import styles from "./BlogLinks.module.css";
import * as posts from "../../posts.json";

export default function BlogLinks() {
  return (
    <>
      <section className={styles.bloglinks_content}>
        <h2 className={styles.title}>Blog posts</h2>
        { createPosts() }
      </section>
    </>
  );
}

function createPosts() {
  return Array.from(posts).map((post) => {
    return (
      <div key={post.link}>
        <a href={post.link}>
          <h3>{post.title}</h3>
          <p>{post.snippet}</p>
        </a>
      </div>
    )
  });
}