import { NextResponse } from "next/server";
import { getPosts } from "../../lib/api";
import * as xml2js from "xml2js";

export async function GET(_: Request) {
  const data = getPosts(["title", "excerpt", "linkSlug", "alt"]);
  const rssDataJSON = {
    rss: {
      $: {
        version: "2.0",
        "xmlns:atom": "http://www.w3.org/2005/Atom"
      },
      channel: {
        title: "The homepage of Matt Bidewell - Matty.dev",
        link: "https://matty.dev",
        description: "Recent content on the homepage of Matt Bidewell - Matty.dev",
        language: "en-uk",
        lastBuildDate: new Date().toUTCString(),
        "atom:link": {
          $: {
            href: "https://www.matty.dev/rss",
            rel: "self",
            type: "application/rss+xml"
          }
        },
        item: data.map((post) => ({
          title: post.title,
          link: `https://matty.dev${post.linkSlug}`,
          description: post.excerpt || "",
          pubDate: new Date(post.date).toUTCString(),
          guid: `https://matty.dev${post.linkSlug}`,
        })),
      }
    }
  }
  const builder: any = new xml2js.Builder();

  const xml: string = builder.buildObject(rssDataJSON);
  const res = new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml"
    }
  });
  return res
}
