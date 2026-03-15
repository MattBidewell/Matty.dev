const createMDX = require("@next/mdx");
const rehypeHighlight = require("rehype-highlight").default;
const remarkFrontmatter = require("remark-frontmatter").default;
const remarkGfm = require("remark-gfm").default;

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter],
    rehypePlugins: [rehypeHighlight],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      {
        source: "/blog/:slug(mumblings-.*)",
        destination: "/mumblings/:slug",
        permanent: true,
      },
    ];
  },
};

module.exports = withMDX(nextConfig);
