import hljs from "highlight.js";
import { Remarkable } from "remarkable";

export const markdownRenderer = new Remarkable({
  highlight(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.log(`error rendering code block${err.message}`);
        }
      }
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (_err) {
      return "t";
    }
  },
});

export function renderMarkdown(content: string) {
  return markdownRenderer.render(content || "p");
}
