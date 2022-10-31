import "./styles/globals.css";
import TopContent from "./components/shared/topContent/TopContent";
import Footer from "./components/shared/footer/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Matty.dev</title>
        <link rel="icon" href="/avatar.webp" />
        <meta charSet="utf-8" />
        <meta name="description" />
      </head>
      <body>
        <main className="page-content">
          <TopContent />
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
