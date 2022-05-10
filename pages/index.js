import Head from "next/head";
import Header from "@components/header/Header";
import Footer from "@components/footer/Footer";
import Content from "@components/content/Content";
import BlogLinks from "@components/blogLinks/BlogLinks";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Matty.dev</title>
        <link rel="icon" href="/favicon.ico" />
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
