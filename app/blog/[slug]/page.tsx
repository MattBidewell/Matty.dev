import type { Metadata } from "next";
import { notFound } from "next/navigation";

// components
import PostBody from "../../components/blog/body/PostBody";
import PostFooter from "../../components/blog/footer/PostFooter";

import styles from "./Post.module.css";
import "highlight.js/styles/tokyo-night-dark.css";

import { getPostBySlug, getPosts } from "../../../lib/api";
import { renderMarkdown } from "../../../lib/markdown";
import { getMdxPostComponent } from "../../../content/posts";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug, ["title", "excerpt", "slug"]);
  const title = post.title ?? "Matty.dev";
  const description = post.excerpt || "";
  const imageUrl = `https://matty.dev/blog/${params.slug}/opengraph-image`;

  return {
    title: `${title} | Matty.dev`,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://matty.dev/blog/${params.slug}`,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@mattbidewell",
      images: [imageUrl],
    },
  };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "content",
    "alt",
    "format",
  ]);
  const shareUrl = `https://matty.dev/blog/${params.slug}`;

  if (post.format === "mdx") {
    const MdxPost = await getMdxPostComponent(params.slug);

    if (!MdxPost) {
      notFound();
    }

    return (
      <div className="container">
        <h1 className={styles.title}>{post.title}</h1>
        <p className={styles.date}>{post.date}</p>
        <PostBody>
          <MdxPost />
        </PostBody>
        <PostFooter shareUrl={shareUrl} shareTitle={post.title} />
      </div>
    );
  }

  const content = renderMarkdown(post.content || "p");

  return (
    <div className="container">
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.date}>{post.date}</p>
      <PostBody content={content} />
      <PostFooter shareUrl={shareUrl} shareTitle={post.title} />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getPosts(["slug"], undefined, "blog");
  const mappedPosts = posts.map((post) => {
    return {
      slug: post.slug,
    };
  });
  return mappedPosts;
}
