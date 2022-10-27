import styles from "./BlogLinks.module.css";


export default function BlogLinks({ posts, hasLimit }) {
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

function createPosts(arrayOfPosts) {
  return Array.from(arrayOfPosts).map((post) => {
    return (
      <div className={styles["post-container"]} key={post.slug}>
        <img className={styles["post-thumbnail"]} src={`./assets/images/${post.image}`} />
        <div className={styles["post-container-content"]}>
          <h3 className="post-link-title">{post.title}</h3>
          <p className="date">{post.date}</p>
          <p>{post.excerpt}</p>
          <a href={post.linkSlug}>Read more...</a>
        </div>
      </div>
    )
  });
}
