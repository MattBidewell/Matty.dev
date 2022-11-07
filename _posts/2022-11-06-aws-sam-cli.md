---
title: "Short: Using AWS Sam incorrectly."
date: 2022-11-06
status: live
excerpt: A short tale of how using a tool incorrectly can lead you on a path of mistakes in your devops
alt:
---

## Background

I've been using the Sam CLI for the past 10 months. It's great at deploying multiple resources onto AWS and managing local deployments for cloud-based architecture.

I specifically use it in monorepos where the source code for multiple Lambda functions exists. These Lambdas are written in different languages. Initially, one monorepo started with Java and over time, Lambda functions written in Typescript were added.

## The problem

We would use the following commands to deploy to AWS:
```Shell
sam build -t infrastructure/lambda/template.yaml
sam deploy -t infrastructure/lambda/template.yaml
```

As our `template.yaml` file was stored in the appropriately named `infrastructure` directory we would need to use the `-t` flag to specify the template to build and deploy.

> _The template.yaml file is the file that contains the Infrastructure as Code (IaC) that is created during deployment. In AWS Sam world, this is Cloudformation._

The template file looked something akin to this

```yaml
Globals:
  Function:
    Architectures:
      - arm64

  JavaFunction:
    Runtime: java11
    Type: AWS::Serverless::Function
    Properties:
      CodeUri: ../../lambdas/JavaFunction
      Handler: build/handler.JavaHandler::handleRequest

  TypescriptFunction:
    Runtime: nodejs16.x
    Type: AWS::Serverless::Function
    Properties:
      Handler: app.lambdaHandler
      CodeUri: ../../lambdas/TypescriptFunction
    Metadata: # Manage esbuild properties
      BuildMethod: esbuild
      BuildProperties:
        Minify: true
        Target: "es2020"
        EntryPoints:
        - src/app.ts
```

When we added the initial Typescript lambda to the project, we found that deploying a simple `Hello World` application to Lambda would result in the non-compiled code being deployed. Strange, this made no sense as AWS Sam is supposed to build and deploy the compiled code. Was it ESBuild? Sam CLI? Cloudformation?

I was able to reproduce it in a new repo and on other stacks, the result was always the same. It would deploy raw Typescript but also the compiled Java.

## The solution

The problem was the `-t` flag in the deploy command. When `sam build ...` runs, it creates a directory called `.aws-sam` which then holds all the compiled code. Whats important is that `sam build` also creates a new `template.yaml` file in that directory with updated codeUri paths.

```
├── .aws-sam/ <This is created by AWS Sam>
│     ├─ template.yaml <created by AWS Sam CLI>
      └─<Compiled lambda code>
├── ...
├── infrastructure/
│   ├── lambda/
│         └── template.yaml
├── src/
│    └── <function>
│          ├── <function code>
```

Theres a note added the AWS Sam documentation under the `-t` flag that states.


>**-t,--template-file**
>The path and file name where your AWS SAM template is located.
> Note: If you specify this option, then AWS SAM deploys only the template and the local resources that it points to.

The key line to note is it deploys the local resources that it points to. In our use case, it was deploying the directories that we were working in. The Java code was in a build directory in the source folders, so we never saw an issue. (unless you tried to deploy without building your code manually 🚩😬 which should have been a massive hint)

By omitting the `-t` from our deploy step, AWS Sam will now correctly build from the directory IT has built the files in, default `.aws-sam/`.

## Lessons Learned?

RTFM. Situations like this are a clear indicator of why we should spend more time reading the documentation and not always diving straight in.
It's also good to remember to make sure you're using the tool correctly.