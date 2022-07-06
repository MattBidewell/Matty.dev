import Head from "next/head";
import TopContent from "@components/shared/topContent/TopContent";
import Footer from "@components/shared/footer/Footer";
import Content from "@components/home/content/Content";
import BlogLinks from "@components/home/blogLinks/BlogLinks";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Matty.dev</title>
        <link rel="icon" href="/avatar.png" />
        <meta charset="utf-8"/>
      </Head>
      <main className="page-content">
        <TopContent />
        <Content/>
        <BlogLinks/>
      </main>

      <Footer />
    </div>
  );
}
