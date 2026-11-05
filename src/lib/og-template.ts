import { readFile } from "node:fs/promises";
import { join } from "node:path";

interface OgInput {
  title: string;
  excerpt: string;
  date: string;
  category: "blog" | "mumbling" | "website";
}

function buildTree(post: OgInput) {
  const titleSize =
    post.title.length > 95 ? 56 : post.title.length > 55 ? 68 : 80;
  const category = {
    blog: "Blog",
    mumbling: "Mumblings",
    website: "",
  }[post.category];

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        flexDirection: "column",
        width: "1200px",
        height: "630px",
        padding: "56px 64px",
        backgroundColor: "#f7f5ef",
        color: "#20231f",
        fontFamily: "Inter",
        fontWeight: 400,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    fontSize: 32,
                    letterSpacing: "-1px",
                  },
                  children: [
                    "matty",
                    {
                      type: "span",
                      props: {
                        style: { color: "#a63e27" },
                        children: ".",
                      },
                    },
                    "dev",
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "iA Writer Mono",
                    fontSize: 18,
                    color: "#a63e27",
                  },
                  children: category,
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flexGrow: 1,
              minHeight: 0,
              padding: "32px 0",
            },
            children: {
              type: "div",
              props: {
                style: {
                  fontSize: titleSize,
                  lineHeight: 1.12,
                  letterSpacing: "-2px",
                  lineClamp: 4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                },
                children: post.title,
              },
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              fontFamily: "iA Writer Mono",
              fontSize: 18,
              lineHeight: 1.5,
              color: "#646b64",
              borderTop: "1px solid #d2d0c6",
              paddingTop: "24px",
              flexShrink: 0,
            },
            children: post.category === "website" ? post.excerpt : post.date,
          },
        },
      ],
    },
  };
}

let cachedFonts: Promise<Buffer[]> | undefined;
function loadFonts(): Promise<Buffer[]> {
  return (cachedFonts ??= Promise.all([
    readFile(
      join(
        process.cwd(),
        "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff",
      ),
    ),
    readFile(
      join(
        process.cwd(),
        "node_modules/@fontsource/ia-writer-mono/files/ia-writer-mono-latin-400-normal.woff",
      ),
    ),
  ]));
}

export async function renderOgPng(
  post: OgInput,
): Promise<Uint8Array<ArrayBuffer>> {
  const [{ default: satori }, { Resvg }] = await Promise.all([
    import("satori"),
    import("@resvg/resvg-js"),
  ]);

  const [inter, mono] = await loadFonts();
  const tree = buildTree(post);
  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Inter",
        data: inter,
        weight: 400,
        style: "normal",
      },
      {
        name: "iA Writer Mono",
        data: mono,
        weight: 400,
        style: "normal",
      },
    ],
  });

  return new Uint8Array(new Resvg(svg).render().asPng());
}
