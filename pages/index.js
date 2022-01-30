import Head from "next/head";
import Header from "@components/header/Header";
import Welcome from "@components/welcome/Welcome";
import Footer from "@components/footer/Footer";
import Content from "@components/content/Content";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Matty.dev</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="<Matty.dev/>" />
        <p className="description">
          <Welcome />
        </p>
        <Content></Content>
      </main>

      <Footer />
    </div>
  );
}
