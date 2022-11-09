---
title: "mermaid test"
date: 2022-11-09
status: live
excerpt: A short tale of how using a tool incorrectly can lead you on a path of mistakes in your devops
alt:
---

## Background

I've been using the Sam CLI for the past 10 months. It's great at deploying multiple resources onto AWS and managing local deployments for cloud-based architecture.

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```