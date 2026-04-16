import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import remarkRewriteImages from "./src/lib/remark-rewrite-images.ts";

export default defineConfig({
  site: "https://matty.dev",
  output: "static",
  trailingSlash: "ignore",
  integrations: [sitemap()],
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "css-variables",
      wrap: false,
    },
    remarkPlugins: [remarkRewriteImages],
  },
  vite: {
    ssr: {
      external: ["@resvg/resvg-js"],
      noExternal: ["satori"],
    },
  },
});
