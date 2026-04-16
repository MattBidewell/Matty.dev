import { visit } from "unist-util-visit";
import type { Root } from "mdast";

export default function remarkRewriteImages() {
  return (tree: Root) => {
    visit(tree, "image", (node) => {
      if (typeof node.url !== "string") return;
      const cleaned = node.url.replace(/^\/?(\.\.\/)+/, "/");
      if (cleaned.startsWith("/assets/")) {
        node.url = cleaned;
      } else if (node.url.startsWith("../") || node.url.startsWith("/../")) {
        node.url = node.url.replace(/^\/?(\.\.\/)+/, "/");
      }
    });
  };
}
