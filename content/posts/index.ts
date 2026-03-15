import React from "react";
import { MdxPostMeta } from "../../types/post";
import { consistentHashingMeta } from "./consistent-hashing/meta";

type MdxPostModule = {
  default: React.ComponentType<any>;
};

type MdxPostDefinition = {
  meta: MdxPostMeta;
  load: () => Promise<MdxPostModule>;
};

const mdxPosts: Record<string, MdxPostDefinition> = {
  "consistent-hashing": {
    meta: consistentHashingMeta,
    load: () => import("./consistent-hashing/index.mdx"),
  },
};

export function getMdxPostMeta(slug: string) {
  return mdxPosts[slug]?.meta ?? null;
}

export function getMdxPostSlugs() {
  return Object.keys(mdxPosts);
}

export async function getMdxPostComponent(slug: string) {
  const loadPost = mdxPosts[slug]?.load;

  if (!loadPost) {
    return null;
  }

  const postModule = await loadPost();
  return postModule.default;
}
