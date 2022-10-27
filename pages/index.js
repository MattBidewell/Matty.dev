import Head from "next/head";
import TopContent from "@components/shared/topContent/TopContent";
import Footer from "@components/shared/footer/Footer";
import BlogLinks from "@components/home/blogLinks/BlogLinks";
import { getPosts } from "../lib/api";
import HeadBlock from "@components/shared/meta/Head";
import Content from "@components/home/content/Content";

export default function Home({ posts }) {
  return (
    <div className="container">
      <HeadBlock />
      <main className="page-content">
        <TopContent />
        <Content />
        <BlogLinks posts={posts} hasLimit={true} />
      </main>
      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const posts = getPosts([
    "title",
    "slug",
    "excerpt",
    "linkSlug",
    "alt"
  ], 5)
  return {
    props: { posts },
  }
}
