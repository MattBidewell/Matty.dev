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
        <meta name="description" content="The personal site for Matt Bidewell, a software engineer in London,UK" />
        <meta property="og:description" content="The personal site for Matt Bidewell, a software engineer in London,UK"/>
        <meta name="twitter:creator" content="@mattbidewell" />
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
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
