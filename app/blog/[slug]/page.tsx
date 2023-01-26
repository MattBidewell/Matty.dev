import { Remarkable } from "remarkable";

// components
import PostBody from "../../components/blog/body/PostBody";
import PostFooter from "../../components/blog/footer/PostFooter";

import styles from "./Post.module.css";
import hljs from "highlight.js";
// import "highlight.js/styles/monokai.css";
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

function getPost(slug: string) {
  const post = getPostBySlug(slug, ["title", "date", "slug", "content", "alt"]);
  const content = r.render(post.content || "p");
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
