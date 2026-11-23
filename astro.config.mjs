import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import remarkRewriteImages from "./src/lib/remark-rewrite-images.ts";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://matty.dev",
  output: "static",
  session: false,
  trailingSlash: "ignore",
  compressHTML: true,
  integrations: [sitemap(), mdx()],

  markdown: {
    processor: unified({ remarkPlugins: [remarkRewriteImages] }),
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "css-variables",
      wrap: false,
    },
  },

  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    ssr: {
      external: ["@resvg/resvg-js"],
      noExternal: ["satori"],
    },
  },

  adapter: cloudflare({
    imageService: "compile",
    prerenderEnvironment: "node",
  })
});
