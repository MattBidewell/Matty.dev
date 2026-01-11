export type PostCategory = "blog" | "project";

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
  // Category field - defaults to "blog" for backwards compatibility
  category: PostCategory;
  // Project-specific fields (optional)
  github_url?: string;
  demo_url?: string;
  tech_stack?: string[];
  featured?: boolean;
};
