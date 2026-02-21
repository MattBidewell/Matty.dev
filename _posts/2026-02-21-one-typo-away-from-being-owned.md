---
title: "One Typo Away From Being Owned"
status: live
excerpt: "I made a typo and it could have destroyed my machine"
date: 2026-02-21
---

## I Made A Typo And It Could Have Destroyed My Machine

I recently made a typo. A small one, a simple one. `npx wranger deploy`.
It looked innocent enough and thankfully this time round, it was innocent. But... What _could_ have happened?

```console
$ npx wranger deploy
npm error code E404
npm error 404 Not Found - GET https://registry.npmjs.org/wranger
```
A 404. Nothing happened. But that's only because nobody had claimed the name yet.

`npx` downloads and executes packages on demand. If a malicious actor had registered `wranger` before I made that typo, there would be no 404. No error. Just silent execution of someone  else's code on my machine. One character. That's the distance between deploying my app and handing over my environment.

This isn't hypothetical. The day before I wrote this, it was already happening in the wild.

## The Hypothetical Just Became Real

February 20th 2026 a [report of a new worm on npm](https://socket.dev/blog/sandworm-mode-npm-worm-ai-toolchain-poisoning) was released by the folks over at Socket. The worm Typosquats repos, one example is
```
malicious: suport-color
real:      support-color
```
The worm itself, I won't go into too much detail, but a key issue is that it creates a dedicated MCP server which then masquerades as a legitimate agentic skill. For example

```
~/
├── .dev-utils/                          # Hidden dir (randomised name from word pools)
│   └── server.js                        # Malicious MCP server
│                                        # Registers: index_project, lint_check, scan_dependencies
│
├── .claude/
│   └── settings.json                    # ← mcpServers entry injected
```

`./lint_check` Seems innocent, right? When the agent reads the tool, it will silently read for secrets on the machine like SSH keys or any secret tokens for exfiltration.

The prompt injection explicitly tells the model not to mention it to the user, cheeky.

Typosquatting used to mean "someone steals your env vars". But in 2026, the reality is a single typo can trigger a self propagating worm that steals crypto wallets, compromises your CI pipeline, poisons your AI tools and publishes infected versions of your own packages.

The attack surface itself has expanded from "your machine" to "your entire developer identity".

## This is Not New But Slopsquatting Is

This is not a new issue and it isn't a result of increased AI usage. Back in 2017 malicious actors published a package named [crossenv](https://security.snyk.io/vuln/npm:crossenv:20170802) which mimicked the popular `cross-env` package. It wrapped the real functionality but silently exfiltrated environment variables to an attacker-controlled server on install.

But there is a new dimension: **slopsquatting**. LLMs hallucinate package names, they confidently recommend packages that don't exist. A malicious actor can monitor these hallucinated names, register them, and wait. The package your AI assistant just told you to install now exists, and it contains someone else's code.

As you can see, this problem isn't new but it is evolving.

## Proposals

### 1. Mandatory namespaces for all new packages

I believe all packages within npm _must_ be published under a scope. A namespace. `@owner/package-name`. This isn't a new feature, but I think we need to make it mandatory to reduce the number of avenues for typosquat attacks.

```console
npx @cloudflare/wrangler ..

NOT

npx wranger
```

Tis adds a meaningful layer of friction as now attackers need to register a convincing scope **and** a convincing package name.

All existing packages would be grandfathered, left alone, fully backwards compatible but with a notice to the owner to migrate to the namespace. npm should include tooling to automate this from both the package author's and installer's perspective.

### 2. Levenshtein distance and homoglyph detection

New package registrations should be blocked if they fall within a Levenshtein distance of 2 from an existing package, or distance 3 for packages above a download threshold. This catches the most common typos, transpositions, dropped characters and doubled letters, without creating false positives for short package names where distance 3 could block half the name.

But edit distance alone isn't enough. Homoglyph detection is also needed. The character sequence `rn` looks extremely like `m` at a glance, keyboard-adjacent substitutions (`wrangler` - `wranglwr`) and hyphen/underscore swaps are all scenarios that Levenshtein distance would miss.

A combination of both would cover the realistic attack surface.

### 3. Verified publishers

How do I, as a consumer, know that a package owner is legitimate?

It's about time npm brings in verification for package publishers. Verified via domain ownership, GitHub org linkage, or identity verification. This gives installers a trust signal at a glance and reduces the chances of downloading an unverified tool.

We can go one step further and allow consumers to only install direct dependencies from verified publishers using a flag like `--verified-only`. It doesn't stop a complete supply chain attack, but it does limit the chances of a malicious package being installed when it's that close to what I actually want.

## The Ecosystem Deserves Better

With the rise of AI-assisted programming, we need to trust our tools more than ever. That trust comes with a requirement that tool providers get better too. Small changes like mandatory namespaces, edit distance protection and verified publishers would meaningfully shrink the attack surface that attackers are actively exploiting today.
