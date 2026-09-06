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
    post.title.length > 95 ? 52 : post.title.length > 55 ? 64 : 76;
  const category = {
    blog: "Blog",
    mumbling: "Mumblings",
    website: "Software engineering",
  }[post.category];

  return {
    type: "div",
    props: {
      style: {
        display: "flex",
        width: "1200px",
        height: "630px",
        backgroundColor: "#e1e5dc",
        color: "#252126",
        fontFamily: "Newsreader",
        fontWeight: 400,
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flexDirection: "column",
              width: "780px",
              height: "100%",
              padding: "52px 64px",
              flexShrink: 0,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    color: "#36705d",
                    fontSize: 40,
                    letterSpacing: "-1.5px",
                    flexShrink: 0,
                  },
                  children: "matty.dev",
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
                    padding: "28px 0",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          fontFamily: "iA Writer Mono",
                          fontSize: 16,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: "#36705d",
                          marginBottom: "24px",
                          flexShrink: 0,
                        },
                        children: category,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          fontSize: titleSize,
                          lineHeight: 1.04,
                          letterSpacing: "-1.5px",
                          lineClamp: 4,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        },
                        children: post.title,
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "iA Writer Mono",
                    fontSize: 16,
                    lineHeight: 1.5,
                    borderTop: "1px solid #252126",
                    paddingTop: "20px",
                    flexShrink: 0,
                  },
                  children:
                    post.category === "website" ? post.excerpt : post.date,
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
              width: "420px",
              height: "100%",
              backgroundColor: "#d5e7dc",
              borderBottom: "16px solid #36705d",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
            },
            children: {
              type: "svg",
              props: {
                width: 352,
                height: 224,
                viewBox: "0 0 11 7",
                children: {
                  type: "path",
                  props: {
                    fill: "#36705d",
                    d: "M0 7V1H2V0H4V1H5V2H6V1H7V0H9V1H11V7H8V3H7V4H6V7H4V4H3V3H2V7Z",
                  },
                },
              },
            },
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
        "node_modules/@fontsource/newsreader/files/newsreader-latin-400-normal.woff",
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

  const [newsreader, mono] = await loadFonts();
  const tree = buildTree(post);
  const svg = await satori(tree as never, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Newsreader",
        data: newsreader,
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
