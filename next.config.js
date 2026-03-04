/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
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

module.exports = nextConfig;
