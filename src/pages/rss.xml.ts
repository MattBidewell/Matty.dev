import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getLivePosts, linkSlugFor } from "../lib/posts";

export async function GET(context: APIContext) {
  const all = [
    ...(await getLivePosts("blog")),
    ...(await getLivePosts("mumbling")),
    ...(await getLivePosts("project")),
  ].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "The homepage of Matt Bidewell - Matty.dev",
    description:
      "Recent content on the homepage of Matt Bidewell - Matty.dev",
    site: context.site ?? "https://matty.dev",
    customData: "<language>en-uk</language>",
    items: all.map((post) => ({
      title: post.data.title,
      link: `https://matty.dev${linkSlugFor(post)}`,
      description: post.data.excerpt ?? "",
      pubDate: post.data.date,
    })),
  });
}
