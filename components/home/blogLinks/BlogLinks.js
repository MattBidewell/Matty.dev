import styles from "./BlogLinks.module.css";
import { getAllPosts } from "../../../lib/api";


export default function BlogLinks({ posts }) {
  return (
    <>
      <section className="content">
        <section className={styles.bloglinks_content}>
          <h2 className={styles.title}>Blog posts</h2>
          { createPosts(posts) }
        </section>
      </section>
    </>
  );
}

function createPosts(arrayOfPosts) {
  return Array.from(arrayOfPosts).map((post) => {
    return (
      <div key={post.slug}>
        <a href={post.linkSlug}>
          <h3 className="post-link-title">{post.title}</h3>
          <p className="date">{post.date}</p>
          <p>{post.excerpt}</p>
        </a>
      </div>
    )
  });
}
