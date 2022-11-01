import { Post } from "../../../../types/post";
import Link from "next/link";
import Image from "next/image"
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
          {hasLimit && <Link href="/blog">More...</Link>}
        </section>
      </section>
    </>
  );
}

function createPosts(arrayOfPosts: Post[]) {
  return Array.from(arrayOfPosts).map((post) => {
    return (
      <div className={styles["post-container"]} key={post.slug}>
        <div className={styles["post-thumbnail"]}>
          <picture>
            <Image src={`/assets/images/${post.image}`} alt={post.alt} fill  placeholder="blur" blurDataURL={`/assets/images/${post.image}`}/>
          </picture>
        </div>
        <div className={styles["post-container-content"]}>
          <h3 className="post-link-title">{post.title}</h3>
          <p className="date">{post.date}</p>
          <p>{post.excerpt}</p>
          <Link href={post.linkSlug}>Read more...</Link>
        </div>
      </div>
    );
  });
}
