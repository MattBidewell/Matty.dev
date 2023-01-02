---
title: How this site was built
date: 2023-01-02
status: live
excerpt: A run down on how this site is built as of 2023.
alt: A cartoon image of a fish with glasses in a fish bowl.
---

Here's a short run down of this site. To note, the code is all open and can be [found on my github](https://github.com/MattBidewell/Matty.dev) and this is a writeup as of the start of 2023.

## Hosting and Language

[https://matty.dev](https://matty.dev) has been through a few iterations, previously it was hosted on Github actions, as of 2022, it is now hosted on [Netlify](https://www.netlify.com/). For those who don't know, Netlify is amazing, I would 100% recommend using Netlify to host, it's easy to use and just works.

Everything uses Typescript and is typed.

## Framework and Dependancies

In the interest of making the content accessible as possible, all pages are built at build time to keep response times as low as possible. To make this happen, I use the [NextJS (13)](https://nextjs.org/blog/next-13) framework. I've found NextJS 13 to be great to use and have used NextJS 13 since the beta with no issues.

## Blog posts

All posts are found in the `_posts` directory and are written in Markdown. At the top of all the Markdown files is a special block known as YAML front Matter, this contains all the meta data on the blog post.

At build time the `lib/api.tsx` file is executed as the pages are built which then uses [gray-matter](https://www.npmjs.com/package/gray-matter) to parse the YAML Front Matter from the file.

For the rendering of each post I use a library called [Remarkable](https://github.com/jonschlinkert/remarkable). It takes Markdown and renders HTML from it.

To get code blocks like this:

```Javascript
const myVar = "Hello world!";
console.log(myVar);
```

I use [Highlight.JS](https://www.npmjs.com/package/highlight.js) plugin for Remarkable.

## General notes

So that I can time posts to release on a specific day, I also rebuild my site automatically once a week. To do this I use a Netlify scheduled function and to ping my sites Netlify build url which will kick off a fresh build at 8am. You can find this code in the `netlify/functions/scheduled-deploy.ts`
