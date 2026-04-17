interface Env {
  ASSETS: { fetch(req: Request): Promise<Response> };
}

function htmlToMarkdown(html: string): string {
  let md = html;

  // Remove <head>, scripts, styles
  md = md.replace(/<head[\s\S]*?<\/head>/gi, "");
  md = md.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  md = md.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");

  // Extract body content
  const bodyMatch = md.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  if (bodyMatch) md = bodyMatch[1];

  // Remove nav and footer
  md = md.replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi, "");
  md = md.replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, "");

  // Code blocks before inline code
  md = md.replace(
    /<pre\b[^>]*><code\b[^>]*class="[^"]*language-([^"\s]*)[^"]*"[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
    (_, lang, code) => `\n\`\`\`${lang.trim()}\n${code}\n\`\`\`\n\n`
  );
  md = md.replace(
    /<pre\b[^>]*><code\b[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
    (_, code) => `\n\`\`\`\n${code}\n\`\`\`\n\n`
  );

  // Headings
  md = md.replace(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n\n");
  md = md.replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n\n");
  md = md.replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n\n");
  md = md.replace(/<h4\b[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n\n");
  md = md.replace(/<h5\b[^>]*>([\s\S]*?)<\/h5>/gi, "\n##### $1\n\n");
  md = md.replace(/<h6\b[^>]*>([\s\S]*?)<\/h6>/gi, "\n###### $1\n\n");

  // Links and images
  md = md.replace(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)");
  md = md.replace(/<img\b[^>]*\bsrc="([^"]*)"[^>]*\balt="([^"]*)"[^>]*\/?>/gi, "![$2]($1)");
  md = md.replace(/<img\b[^>]*\balt="([^"]*)"[^>]*\bsrc="([^"]*)"[^>]*\/?>/gi, "![$1]($2)");

  // Inline formatting
  md = md.replace(/<strong\b[^>]*>([\s\S]*?)<\/strong>/gi, "**$1**");
  md = md.replace(/<b\b[^>]*>([\s\S]*?)<\/b>/gi, "**$1**");
  md = md.replace(/<em\b[^>]*>([\s\S]*?)<\/em>/gi, "_$1_");
  md = md.replace(/<i\b[^>]*>([\s\S]*?)<\/i>/gi, "_$1_");
  md = md.replace(/<code\b[^>]*>([\s\S]*?)<\/code>/gi, "`$1`");

  // Lists
  md = md.replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, "- $1\n");
  md = md.replace(/<\/(ul|ol)>/gi, "\n");

  // Paragraphs and breaks
  md = md.replace(/<p\b[^>]*>([\s\S]*?)<\/p>/gi, "$1\n\n");
  md = md.replace(/<br\s*\/?>/gi, "\n");

  // Blockquotes
  md = md.replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, content) =>
    content
      .trim()
      .split("\n")
      .map((l: string) => `> ${l.trim()}`)
      .join("\n") + "\n\n"
  );

  // Horizontal rules
  md = md.replace(/<hr\s*\/?>/gi, "\n---\n\n");

  // Strip remaining tags
  md = md.replace(/<[^>]+>/g, "");

  // Decode HTML entities
  md = md
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/");

  return md.replace(/\n{3,}/g, "\n\n").trim();
}

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function prefersMarkdown(acceptHeader: string): boolean {
  return acceptHeader
    .split(",")
    .map((t) => t.trim().split(";")[0].trim().toLowerCase())
    .includes("text/markdown");
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const accept = request.headers.get("Accept") ?? "";
    const assetResponse = await env.ASSETS.fetch(request);

    if (!prefersMarkdown(accept)) {
      return assetResponse;
    }

    const contentType = assetResponse.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html") || !assetResponse.ok) {
      return assetResponse;
    }

    const html = await assetResponse.text();
    const markdown = htmlToMarkdown(html);
    const tokens = estimateTokens(markdown);

    return new Response(markdown, {
      status: assetResponse.status,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "x-markdown-tokens": String(tokens),
      },
    });
  },
};
