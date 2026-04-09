import "./styles/globals.css";
import TopContent from "./components/shared/topContent/TopContent";
import Footer from "./components/shared/footer/Footer";
import type { Metadata, Viewport } from "next";
import { ViewTransitions } from "next-view-transitions";
import { Inter, Newsreader } from "next/font/google";

const desc =
  "A software engineer that is passionate about open source software and software engineering, with 7+ years of experience in creating well-crafted SaaS solutions in the cloud...";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  adjustFontFallback: false,
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

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

export const viewport: Viewport = {
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var theme=localStorage.getItem('theme-preference');if(theme==='light'||theme==='dark'){document.documentElement.dataset.theme=theme;}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ViewTransitions>
          <div className="site-shell">
            <main className="page-content">
              <TopContent />
              <div className="route-content">{children}</div>
            </main>
            <Footer />
          </div>
        </ViewTransitions>
      </body>
    </html>
  );
}
