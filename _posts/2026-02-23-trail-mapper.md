---
title: "Trail Mapper"
status: live
excerpt: "Using AI to implement a missing feature from the popular activity tracking app Strava"
category: project
github_url: https://github.com/MattBidewell/trail-mapper
demo_url: https://trailmapper.dev/
tech_stack:
  - Typescript
  - Clouflare Pages
featured: true
date: 2026-02-23
---

## About

I've been doing this fun little self-inflicted challenge of running the tube lines. Breaking it down into manageable 15-21km chunks.

The problem is that Strava, the popular activity tracking app, doesnt have a feature that lets you see subset of multiple runs on the same map. They DO have a feature to see _all_ your runs on the same map, but that doesn't work for this use case. I want to see just the runs that cover a specific tube line, not all my runs.

So whilst running from Morden to Battersea, the final chunk of the Northern line (for my challenge), I brainstormed ways to achieve this.

On the tube home, I bounced the ideas off of Opus 4.5 and came up with a plan to build a tool that would allow users to upload their GPX files (GPX being a common format for GPS data), select the runs they want to see, and then generate a map that shows just those runs.

## How it Works

Its pretty straight forward and is all client side javascript. The user uploads their GPX files, the app parses them and them applies the routing ontop of open api maps to generate the map.

Hosting is static on Cloudflare Pages, which is free and easy to set up. The app itself is built with Typescript and uses the Leaflet library for map rendering.
