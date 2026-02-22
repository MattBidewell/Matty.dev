import "./styles/globals.css";
import TopContent from "./components/shared/topContent/TopContent";
import Footer from "./components/shared/footer/Footer";
import type { Metadata } from "next";

const desc =
  "A software engineer that is passionate about open source software and software engineering, with 7+ years of experience in creating well-crafted SaaS solutions in the cloud...";

export const metadata: Metadata = {
  metadataBase: new URL("https://matty.dev"),
  title: "Matty.dev",
  applicationName: "Matty.dev",
  icons: {
    icon: "/avatar.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-icon.png",
  },
  description: desc,
  referrer: "strict-origin-when-cross-origin",
  keywords: ["Matthew Bidewell", "Matt Bidewell", "software Engineer"],
  authors: [{ name: "Matthew Bidewell" }],
  creator: "Matthew Bidewell",
  publisher: "Matthew Bidewell",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  twitter: {
    card: "summary",
    title: "Matty.dev",
    description: desc,
    siteId: "@mattbidewell",
    creator: "@mattbidewell",
    creatorId: "mattbidewell"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
