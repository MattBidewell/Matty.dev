---
title: "ScreenForge"
status: live
excerpt: "An experiment that turns a website screenshot into a generated, shareable single-page site"
category: project
date: 2026-10-29
tech_stack:
  - TypeScript
  - Cloudflare Workers
  - Cloudflare Workers AI
  - Cloudflare R2
  - Cloudflare KV
  - Cloudflare Dynamic Workers
---

## About

ScreenForge is an exploratory application that turns an uploaded website screenshot into a generated, shareable single-page website. I built it as an experiment in taking a visual reference through AI generation and all the way to an isolated, published page.

## Demo

<figure>
  <video controls playsinline preload="none" width="1920" height="1362" poster="https://media.matty.dev/projects/screenforge/demo-v1.jpg" aria-label="ScreenForge demo" aria-describedby="screenforge-demo-caption">
    <source src="https://media.matty.dev/projects/screenforge/demo-v1.mp4" type="video/mp4" />
    <a href="https://media.matty.dev/projects/screenforge/demo-v1.mp4">Watch the ScreenForge demo</a>.
  </video>
  <figcaption id="screenforge-demo-caption">A 37-second, silent walkthrough of ScreenForge: upload a screenshot, generate a website, and open the published result.</figcaption>
</figure>

## How It Works

Upload a screenshot and ScreenForge sends it to Cloudflare Workers AI, which returns a structured result containing HTML, CSS, and JavaScript. The app validates that result, assembles it into a page, and stores the generated snapshot in Cloudflare R2. Upload and job details, along with the published site index, are tracked in Cloudflare KV.

When the page is ready, ScreenForge publishes it to an isolated Cloudflare Dynamic Worker and gives it a shareable URL. Requests to that URL load the saved page into its worker. Outbound networking is disabled for the published worker.

### System Diagram

<figure>
  <picture>
    <source media="(max-width: 600px)" srcset="/assets/images/2026-10-29-screenforge/system-diagram-mobile.svg" />
    <img src="/assets/images/2026-10-29-screenforge/system-diagram.svg" alt="System diagram showing ScreenForge's screenshot upload, AI generation, R2 and KV storage, isolated publishing, and share URL request flow" />
  </picture>
  <figcaption>Cloudflare product icons adapted from the <a href="https://github.com/cloudflare/cloudflare-docs/tree/production/src/icons">Cloudflare docs icon set</a> (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>); the Cloudflare mark is from <a href="https://developers.cloudflare.com/logo.svg">Cloudflare’s logo</a>.</figcaption>
</figure>

It’s an experiment in connecting screenshot-based generation to a complete publishing flow. The generated page is an AI-generated interpretation of the screenshot, so the results can vary.
