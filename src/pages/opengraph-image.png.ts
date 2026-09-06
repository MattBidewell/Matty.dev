import type { APIRoute } from "astro";
import { renderOgPng } from "../lib/og-template";

export const prerender = true;

export const GET: APIRoute = async () => {
  const png = await renderOgPng({
    title: "Notes on building software.",
    excerpt: "A personal publication by Matt Bidewell",
    date: "",
    category: "website",
  });

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
