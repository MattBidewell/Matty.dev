import Head from "next/head";
import TopContent from "@components/shared/topContent/TopContent";
import Footer from "@components/shared/footer/Footer";
import BlogLinks from "@components/home/blogLinks/BlogLinks";
import { getAllPosts } from "../lib/api";

export default function Home({ posts }) {
  return (
    <div className="container">
      <Head>
        <title>Matty.dev</title>
        <link rel="icon" href="/avatar.png" />
        <meta charSet="utf-8"/>
      </Head>
      <main className="page-content">
        <TopContent />
        <BlogLinks posts={posts}/>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "excerpt",
    "linkSlug"
  ])

  return {
    props: { posts },
  }
}
