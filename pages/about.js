import Head from "next/head";
import Footer from "@components/shared/footer/Footer";
import TopContent from "@components/shared/topContent/TopContent";
import Content from "@components/about/content/Content";

export default function About() {
  return (
    <div className="container">
      <Head>
        <title>Matty.dev</title>
        <link rel="icon" href="/avatar.png" />
        <meta charSet="utf-8"/>
      </Head>
      <main className="page-content">
        <TopContent />
        <Content />
      </main>

      <Footer />
    </div>
  );
}