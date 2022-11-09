// components
import PostBody from "../../components/blog/body/PostBody";
import PostFooter from "../../components/blog/footer/PostFooter";

import renderer from "./remarkable";

import styles from "./Post.module.css";

import { getPostBySlug, getPosts } from "../../../lib/api";

function getPost(slug: string) {
  const post = getPostBySlug(slug, ["title", "date", "slug", "content", "alt"]);
  const content = renderer.render(post.content || "p");
  return { ...post, content };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  return (
    <div className="container">
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.date}>{post.date}</p>
      <PostBody content={post.content} />
      <PostFooter />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getPosts(["slug"]);
  const mappedPosts = posts.map((post) => {
    return {
      slug: post.slug,
    };
  });
  return mappedPosts;
}
