import Footer from "@components/shared/footer/Footer";
import TopContent from "@components/shared/topContent/TopContent";
import HeadBlock from "@components/shared/meta/Head";
import BlogLinks from "@components/home/blogLinks/BlogLinks";
import { getPosts } from "../lib/api";


export default function Blog({ posts }) {
  return (
    <div className="container">
      <HeadBlock/>
      <main className="page-content">
        <TopContent />
        <BlogLinks posts={posts}/>
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
    "linkSlug"
  ])
  return {
    props: { posts },
  }
}