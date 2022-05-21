import Head from "next/head";
import Header from "@components/Header/Header";
import Footer from "@components/footer/Footer";
import Content from "@components/content/Content";
import BlogLinks from "@components/blogLinks/BlogLinks";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Matty.dev</title>
        <link rel="icon" href="/avatar.png" />

        <meta charset="utf-8"/>

      </Head>
      <main className="content">
        <p className="description">
          <Header />
        </p>
        <Content></Content>
        <BlogLinks></BlogLinks>
      </main>

      <Footer />
    </div>
  );
}
