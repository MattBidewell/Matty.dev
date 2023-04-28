---
title: RFCs and the importance of building a greater technical understanding
date: 2023-04-29
status: live
excerpt: RFCs are a great way to build a greater technical understanding of a system. Let's explore why and provide some examples.
alt: A stern looking own dressed like a liberian, holding some books.
---

I first came across [RFCs (Request for Comments)](https://en.wikipedia.org/wiki/Request_for_Comments) when in university, specifically in my Networking lectures (shout out to Networking Bob @ [Hertfordshire University](https://www.herts.ac.uk/)) where we evaluated the [RFC 791](https://tools.ietf.org/html/rfc791) which is the IPv4 specification. It was a great way to understand the history of the internet and how it came to be. It was also a great way to understand the technical details of how the Internet works.

At first, they seemed like a bit of a chore, but as I've grown as an engineer I've come to appreciate them more and more. They are a great way to build a greater technical understanding of a system. Let's explore why and provide some examples, but first, what is an RFC?

## What is an RFC?

An RFC (Request for Comments) is a document that describes a technical specification. It's a way for engineers to collaborate and discuss technical specifications. It's a way to build a greater technical understanding of a system.

Initially, I thought RFCs are used by only the elite engineers, the top 1% or the top 1%, those who created the very bare metal infrastructure we take for granted. It wasn't until my role at [GDS](https://www.gov.uk/government/organisations/government-digital-service) that I was introduced to RFCs again but on a much smaller scale. This time, however, they were conceptually restricted to the engineering team and what we were building, rather than the entire internet. They were a great way for me to build a greater technical understanding of a system as a new engineer in the team.

Inside the RFC you will usually find the following sections or at least a variation of them:

- **Author** - The author(s).
- **Background** - A brief description of the problem and why it needs to be solved.
- **Propsals** - A description of the proposed solution(s).
- **Implementation** - A description of how the solution will be implemented.
- **Security considerations** - A description of the security considerations involved with the solution.

## Why would you use an RFC?

TLDR;

- They provide a way to build a greater technical understanding of a system.
- They provide a timeline on the overall state of a system.
- They're a method of collecting feedback on a proposed solution.
- They're great for onboarding new engineers/teams.
- Most importantly they're self documenting!

Time and time again I join an engineering team or chat with engineers who all have a problem with the same thing. They don't fully understand the system they're working on. Hours are then spent trawling the code, watching pre-recorded out-of-date meetings. This is a huge waste of time and effort. It's also a huge waste of money. RFCs are a great way to solve this problem.

RFCs are effectively a self-documenting way to clearly describe the process, events and decisions that resulted in the system to date.

They're great for gaining a historical understanding of a system.

By keeping a uniform structure, they end up reading like a story. For example, We have X problem and we need to solve it. We have Y solution and we need to implement it. We have Z risks and we need to mitigate them.

From an engineering perspective, it's also a great way to collect feedback on a proposed solution. The concept of them is to get feedback **before** implementation.

From a managerial perspective, you want new engineers to be onboarded quickly. RFCs are a powerful way to do this. They allow newer engineers to get into the mindset needed to understand the system, the problem and the currently used solutions. This will help **empower** them to be able to make decisions and contribute to the system.

## When to use an RFC

However, not everything needs to be an RFC. For example, you're not going to write an RFC for a small bug fix. You're not going to write an RFC for a small feature. Instead, you'll write for a large feature or a large change to the system.

It's generally encouraged to write an RFC for any major change such as, but not limited to:

- Addition of any major new feature of the subsystem
- Changes that impact existing systems used by other teams

[When to write an RFC - LeadDev](https://leaddev.com/technical-decision-making/thorough-team-guide-rfcs)

### Basic template

Usually, you'll follow a basic template when writing an RFC. Here's an example:

```markdown
# Title of RFC

| Status        | (Proposed / Accepted / Implemented / Obsolete)       |
:-------------- |:---------------------------------------------------- |
| **RFC #**     | [NNN]
| **Author(s)** | My Name (me@example.org), AN Other (you@example.org) |
| **Updated**   | YYYY-MM-DD                                           |
| **Obsoletes** | TF-RFC it replaces, else remove this header          |

## Objective

What are we doing and why? What problem will this solve? What are the goals and
non-goals? This is your executive summary; keep it short, and elaborate below.

## Background

Why this is a valuable problem to solve? What background information is needed
to show how this design addresses the problem?

Which users are affected by the problem? Why is it a problem? What data supports
this? What related work exists?

## Proposals

This is the meat of the document, where you explain your proposal. If you have multiple alternatives, be sure to use sub-sections for better separation of the idea, and list the pros/cons of each approach. If there are alternatives that you have eliminated, you should also list those here, and explain why you believe your chosen approach is superior.

### Implementation

Write in a high-level view of the implementation. Enough that a reader or engineer can implement it. Pseudo-code and system diagrams are fine.

### Security considerations

Write up the security considerations involved with the implementation. What could be exploited? What could be abused? What could be leaked?
```