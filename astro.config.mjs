import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import remarkRewriteImages from "./src/lib/remark-rewrite-images.ts";

import cloudflare from "@astrojs/cloudflare";

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
    processor: unified({
      remarkPlugins: [remarkRewriteImages],
    }),
  },

  vite: {
    ssr: {
      external: ["@resvg/resvg-js"],
      noExternal: ["satori"],
    },
  },

  adapter: cloudflare({
    prerenderEnvironment: "node",
  }),
});
