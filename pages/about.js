import Head from "next/head";
import Footer from "@components/shared/footer/Footer";
import MainContent from "@components/main/Main";
import Content from "@components/about/content/Content";

export default function About() {
  return (
    <div className="container">
      <Head>
        <title>Matty.dev</title>
        <link rel="icon" href="/avatar.png" />

        <meta charset="utf-8"/>

      </Head>
      <main className="content">
        <MainContent />
        <Content />
      </main>

      <Footer />
    </div>
  );
}