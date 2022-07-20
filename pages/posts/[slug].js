import { useRouter } from "next/router"

import Head from "next/head";
import Footer from "@components/shared/footer/Footer";
import TopContent from "@components/shared/topContent/TopContent";
import { getPostBySlug, getAllPosts } from "../../lib/api"
import { Remarkable } from "remarkable";
import PostBody from "../../components/blog/post-body";

import styles from './Post.module.css'

// import Container from "../../components/container"
// import Header from "../../components/header"
// import PostHeader from "../../components/post-header"
// import Layout from "../../components/layout"
// import PostTitle from "../../components/post-title"

import hljs from 'highlight.js';
import 'highlight.js/styles/nord.css';

const r = new Remarkable({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) { }
      console.log("error rendering code block" + err.message)
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ''; // use external default escaping
  }
});

export default function Post({ post }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <div className="container">
      <Head>
        <title>Matty.dev | {post.title}</title>
        <link rel="icon" href="/avatar.png" />
        <meta charSet="utf-8"/>
      </Head>
      <main className="page-content">
        <TopContent />
        <h1 className={styles.title}>
          {post.title}
        </h1>
        <p className={styles.date}>{post.date}</p>
        <PostBody content={post.content} />
      </main>
      <Footer />
    </div>
  )
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
  const posts = getAllPosts(["slug"]);
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