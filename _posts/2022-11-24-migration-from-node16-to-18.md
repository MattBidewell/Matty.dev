---
title: Migration from Node16 to Node18 DNS issue
date: 2022-11-24
status: live
excerpt: After migrating a webserver running NodeJS from 16 to 18. Heres a nice little DNS issue I came across.
alt: A green robot pointing to some gibberish.
---

Node 18 has gone to LTS, and with that, a load of new features arrived. A native fetch, a native test runner and much more. Without little haste, I prepared a PR to update the smallest web server we're running in Digital Identity as a means of testing and making sure there are no breaking changes.

🏕🔦 **_queue campfire horror story sound_** 🏕🔦

But there was...

Updating to Node 18 meant you get all the love and features from Node 17. Obviously.
And Node 17 contained a minor change that stumped me at first. But first, the symptom.

## Symptom

As part of our testing strategy, we run browser tests in our CI pipeline. As part of these tests, we don't want to talk to the REAL API. So we mock it, using [wiremock](https://wiremock.org/). Wiremock runs the server and listens to incoming connects and returns a payload based on the endpoint and headers provided. Useful for when you don't want to spin an entire API.

To make everything in the CI work effortlessly, we use a little NodeJS library called [wait-on](https://www.npmjs.com/package/wait-on) to hold execution until both server and clients are ready and then execute browser tests.

The problem appeared when in the CI, the browser tests just hung. But why? Nothing changed, apart from the NodeJS version.

All servers have been configured to run on `localhost:{port}`. Straight forward. But, this was also the "problem".

## Problem

Localhost is another way of saying `127.0.0.1` in IPv4 world, however, it's also a way of saying `[::1]` in IPv6 world.

After a little digging, I realised that all the servers (except Wiremock) were starting on `[::1]:{port}`. Which isn't unusual. But this was exactly the problem. The `wait-on` command was looking only for `IPv6` addresses and `wiremock` was starting IPv4.

After a little digging I found this [change log in a Node 17 release](https://github.com/nodejs/node/pull/39987). "reorder the result so that IPv4 addresses
come before IPv6 addresses)". So, in a Node 17 release, they changed the order in which DNS results are returned internally. The language will now default to IPv6 before IPv4. Quick note, it is possible to set the order now in the `node:dns` module.

## Solution

The solution in my case was to force the `wait-on` command to look directly at `IPv4`, however, that's not the nicest solution. Ideally, I would expect NodeJS to implement [Happy Eyeballs](https://en.wikipedia.org/wiki/Happy_Eyeballs) which should all calls to `localhost:{port}` to hit both IPv4 and IPv6.
