import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getPostBySlug, getPosts } from "../../../lib/api";

export const runtime = "nodejs";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = getPosts(["slug"]);
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function OGImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug, ["title", "excerpt", "date", "slug"]);

  const fontData = await readFile(
    join(process.cwd(), "assets/fonts/Inter-Medium.woff")
  );

  const title = post.title ?? "";
  const excerpt = post.excerpt
    ? post.excerpt.length > 130
      ? post.excerpt.slice(0, 130) + "..."
      : post.excerpt
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "1200px",
          height: "630px",
          backgroundColor: "#1a1a1a",
          padding: "64px 80px",
          fontFamily: "Inter, sans-serif",
          boxSizing: "border-box",
        }}
      >
        {/* Site brand — top right */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "52px",
          }}
        >
          <span
            style={{
              color: "#fc531d",
              fontSize: "24px",
              fontWeight: 500,
              letterSpacing: "-0.3px",
            }}
          >
            matty.dev
          </span>
        </div>

        {/* Orange accent bar */}
        <div
          style={{
            display: "flex",
            width: "56px",
            height: "4px",
            backgroundColor: "#fc531d",
            marginBottom: "32px",
            flexShrink: 0,
          }}
        />

        {/* Post title */}
        <div
          style={{
            display: "flex",
            color: "#ffc88a",
            fontSize: title.length > 55 ? "48px" : "64px",
            fontWeight: 500,
            lineHeight: 1.15,
            marginBottom: "28px",
            flexGrow: 1,
            alignItems: "flex-start",
          }}
        >
          {title}
        </div>

        {/* Excerpt */}
        {excerpt && (
          <div
            style={{
              display: "flex",
              color: "#c69752",
              fontSize: "26px",
              lineHeight: 1.5,
              marginBottom: "48px",
              flexShrink: 0,
            }}
          >
            {excerpt}
          </div>
        )}

        {/* Bottom row: date + author */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "#666666", fontSize: "20px" }}>
            {post.date}
          </span>
          <span
            style={{ color: "#fc531d", fontSize: "20px", fontWeight: 500 }}
          >
            @mattbidewell
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
