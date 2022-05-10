import Head from "next/head";
import Header from "@components/Header/Header";
import Footer from "@components/footer/Footer";
import Content from "@components/content/Content";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Matty.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main class="content">
        <p className="description">
          <Header />
        </p>
        <Content></Content>
      </main>

      <Footer />
    </div>
  );
}
