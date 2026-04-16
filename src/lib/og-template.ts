import { readFile } from "node:fs/promises";
import { join } from "node:path";

interface OgInput {
  title: string;
  excerpt: string;
  date: string;
  category: "blog" | "mumbling";
}

function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

function buildTree(post: OgInput) {
  const titleSize = post.title.length > 55 ? 48 : 64;
  const excerpt = truncate(post.excerpt, 130);

  const eyebrow =
    post.category === "mumbling"
      ? {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "52px",
            },
            children: [
              {
                type: "span",
                props: {
                  style: {
                    color: "#c69752",
                    fontSize: 20,
                    fontWeight: 500,
                    letterSpacing: "0.4px",
                    textTransform: "uppercase",
                  },
                  children: "mumblings",
                },
              },
              {
                type: "span",
                props: {
                  style: {
                    color: "#fc531d",
                    fontSize: 24,
                    fontWeight: 500,
                    letterSpacing: "-0.3px",
                  },
                  children: "matty.dev",
                },
              },
            ],
          },
        }
      : {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "52px",
            },
            children: {
              type: "span",
              props: {
                style: {
                  color: "#fc531d",
                  fontSize: 24,
                  fontWeight: 500,
                  letterSpacing: "-0.3px",
                },
                children: "matty.dev",
              },
            },
          },
        };

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        backgroundColor: "#1a1a1a",
        padding: "64px 80px",
        fontFamily: "Inter, sans-serif",
      },
      children: [
        eyebrow,
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              width: "56px",
              height: "4px",
              backgroundColor: "#fc531d",
              marginBottom: "32px",
              flexShrink: 0,
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              color: "#ffc88a",
              fontSize: titleSize,
              fontWeight: 500,
              lineHeight: 1.15,
              marginBottom: "28px",
              flexGrow: 1,
              alignItems: "flex-start",
            },
            children: post.title,
          },
        },
        excerpt
          ? {
              type: "div",
              props: {
                style: {
                  display: "flex",
                  color: "#c69752",
                  fontSize: 26,
                  lineHeight: 1.5,
                  marginBottom: "48px",
                  flexShrink: 0,
                },
                children: excerpt,
              },
            }
          : null,
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexShrink: 0,
            },
            children: [
              {
                type: "span",
                props: {
                  style: { color: "#666666", fontSize: 20 },
                  children: post.date,
                },
              },
              {
                type: "span",
                props: {
                  style: { color: "#fc531d", fontSize: 20, fontWeight: 500 },
                  children: "@mattbidewell",
                },
              },
            ],
          },
        },
      ].filter(Boolean),
    },
  };
}

let cachedFont: Buffer | null = null;
async function loadFont(): Promise<Buffer> {
  if (cachedFont) return cachedFont;
  const fontPath = join(process.cwd(), "src", "assets", "fonts", "Inter-Medium.woff");
  cachedFont = await readFile(fontPath);
  return cachedFont;
}

export async function renderOgPng(post: OgInput): Promise<Uint8Array> {
  const [{ default: satori }, { Resvg }] = await Promise.all([
    import("satori"),
    import("@resvg/resvg-js"),
  ]);

  const tree = buildTree(post);
  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: await loadFont(),
        weight: 500,
        style: "normal",
      },
    ],
  });

  return new Resvg(svg).render().asPng();
}
