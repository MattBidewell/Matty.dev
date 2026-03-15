export type PostCategory = "blog" | "project" | "mumbling";
export type PostFormat = "md" | "mdx";

export type MdxPostMeta = {
  title: string;
  excerpt: string;
  date: string;
  alt: string;
  status: string;
  category: PostCategory;
  image?: string;
  github_url?: string;
  demo_url?: string;
  tech_stack?: string[];
  featured?: boolean;
};

export type Post = {
  excerpt: string;
  title?: string;
  slug?: string;
  linkSlug: string;
  content: string;
  alt: string;
  image?: string;
  status?: string;
  date: string;
  format?: PostFormat;
  sourcePath?: string;
  // Category field - defaults to "blog" for backwards compatibility
  category: PostCategory;
  // Project-specific fields (optional)
  github_url?: string;
  demo_url?: string;
  tech_stack?: string[];
  featured?: boolean;
};
