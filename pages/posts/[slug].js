import { useRouter } from "next/router"
import { Remarkable } from "remarkable";
import Head from "next/head";

// components
import HeadBlock from "@components/shared/meta/Head";
import Footer from "@components/shared/footer/Footer";
import TopContent from "@components/shared/topContent/TopContent";
import PostBody from "@components/blog/body/PostBody";
import PostFooter from "@components/blog/footer/PostFooter";

import styles from "./Post.module.css";
import hljs from "highlight.js";
import "highlight.js/styles/nord.css";
import { getPostBySlug, getPosts } from "../../lib/api";

// remarkable and highlight js setup
const r = new Remarkable({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {}
      console.log("error rendering code block" + err.message);
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ""; // use external default escaping
  },
});

export default function Post({ post }) {
  const router = useRouter();

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <div className="container">
      <HeadBlock />
      <main className="page-content">
        <TopContent />
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.date}>{post.date}</p>
        <PostBody content={post.content} />
        <PostFooter />
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
  ])
  const content = r.render(post.content || "")

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export function getStaticPaths() {
  const posts = getPosts(["slug"]);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}