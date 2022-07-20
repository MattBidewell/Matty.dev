import Footer from "@components/shared/footer/Footer";
import TopContent from "@components/shared/topContent/TopContent";
import Content from "@components/about/content/Content";
import HeadBlock from "@components/shared/meta/Head";

export default function About() {
  return (
    <div className="container">
      <HeadBlock/>
      <main className="page-content">
        <TopContent />
        <Content />
      </main>

      <Footer />
    </div>
  );
}