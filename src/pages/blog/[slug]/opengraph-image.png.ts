import type { APIRoute, GetStaticPaths } from "astro";
import { getLivePosts, rawSlug, formatDate } from "../../../lib/posts";
import { renderOgPng } from "../../../lib/og-template";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getLivePosts("blog");
  return posts.map((post) => ({
    params: { slug: rawSlug(post) },
    props: { post },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const post = (props as { post: Awaited<ReturnType<typeof getLivePosts>>[number] }).post;
  const png = await renderOgPng({
    title: post.data.title,
    excerpt: post.data.excerpt ?? "",
    date: formatDate(post.data.date),
    category: "blog",
  });
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
