import type { APIRoute, GetStaticPaths } from "astro";
import { getLivePosts, rawSlug, formatDate } from "../../../lib/posts";
import { renderOgPng } from "../../../lib/og-template";

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await getLivePosts("project");
  return projects.map((project) => ({
    params: { slug: rawSlug(project) },
    props: { project },
  }));
};

export const GET: APIRoute = async ({ props }) => {
  const project = (props as { project: Awaited<ReturnType<typeof getLivePosts>>[number] }).project;
  const png = await renderOgPng({
    title: project.data.title,
    excerpt: project.data.excerpt ?? "",
    date: formatDate(project.data.date),
    category: "page",
    eyebrow: "project",
  });
  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
