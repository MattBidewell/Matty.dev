import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import remarkRewriteImages from "./src/lib/remark-rewrite-images.ts";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://matty.dev",
  output: "static",
  trailingSlash: "ignore",
  integrations: [sitemap(), mdx()],

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

  adapter: cloudflare()
});