import { getCollection, type CollectionEntry } from "astro:content";

export type Category = "blog" | "mumbling" | "project";

export type PostEntry = CollectionEntry<"posts">;

function inferCategory(id: string): Category {
  return id.includes("mumblings") ? "mumbling" : "blog";
}

export function rawSlug(entry: PostEntry): string {
  return entry.id.replace(/\.md$/, "");
}

export function categoryOf(entry: PostEntry): Category {
  return entry.data.category ?? inferCategory(entry.id);
}

export function linkSlugFor(entry: PostEntry): string {
  const cat = categoryOf(entry);
  const slug = rawSlug(entry);
  const prefix =
    cat === "project" ? "/projects" : cat === "mumbling" ? "/mumblings" : "/blog";
  return `${prefix}/${slug}`;
}

export async function getLivePosts(category?: Category): Promise<PostEntry[]> {
  const all = await getCollection("posts");
  const now = Date.now();
  return all
    .filter((entry) => {
      if (entry.data.status !== "live") return false;
      if (entry.data.date.getTime() >= now) return false;
      if (category && categoryOf(entry) !== category) return false;
      return true;
    })
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

export const categoryLabels: Record<Category, string> = {
  blog: "Writing",
  mumbling: "Mumblings",
  project: "Projects",
};

export const categoryHrefs: Record<Category, string> = {
  blog: "/blog",
  mumbling: "/mumblings",
  project: "/projects",
};

export interface ReadingStats {
  date: Date;
  words: number;
  minutes: number;
}

export function readingStats(entry: PostEntry): ReadingStats {
  const words = entry.body.match(/\S+/g)?.length ?? 0;
  return { date: entry.data.date, words, minutes: Math.max(1, Math.round(words / 220)) };
}
