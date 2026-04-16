---
title: Hidden Sam CLI features
date: 2023-01-26
status: live
excerpt: Uncovering some undocumented features of the AWS Sam CLI - warning these might be subject to change.
alt: A beaver wearing a hardhat with an orange flag
---

> ⚠️ Everything in this post is subject to change. I'm also not employed by AWS and don't work on the Sam CLI source code.

Recently I've been in a position of using the AWS Sam CLI a lot. As a result of digging around the source code and the Lambda builder, I've found some undocumented features. By the phrase undocumented, I mean it doesn't appear [on the documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-build-typescript.html) as of 2023/01/26.

A short bit of context, I'm currently working on NodeJS functions written in Typescript deployed on AWS Lambda using the AWS Sam CLI which features the bundler [esbuild](https://esbuild.github.io/).

## Feature 1: Format

If you want to use something like [Top level await](https://v8.dev/features/top-level-await) in Lambda you'll need to output your code in the [esModule (esm)](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) format. You might want to use this to utilise the init stage of the Lambda function to execute a task.

[According to AWS,](https://aws.amazon.com/blogs/compute/using-node-js-es-modules-and-top-level-await-in-aws-lambda/) top-level await is available for NodeJS Lambdas as of 2022. However, if you use [Typescript, esbuild and Sam CLI, as suggested by AWS](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-build-typescript.html) and the default target field of `es2020`, you will come across issues in the build stage. The error will be something like

```text
Top-level await is not available in the configured target environment
```

To get around these build issues you can set your target to be `Node18`. This is documented.

You can also set a new property - `Format: esm`. This will ensure the output of esbuild is in the esm format as needed top-level await as there is no current support for CommonJS.

Solution? After digging through the source code on GitHub I found that you can set the `format` output for esbuild. Here's an example CloudFormation template for a Lambda function: [full example here](https://github.com/MattBidewell/sam-cli-esbuild-top-level-await/blob/main/template.yaml)

```yaml
myFunction:
  Type: AWS::Serverless::Function
  Properties:
    Handler: handler.lambdaHandler
    CodeUri: ./
    Runtime: nodejs18.x
    FunctionName: "MyTestFunction"
  Metadata: # Manage esbuild properties
    BuildMethod: esbuild
    BuildProperties:
      Target: "node18"
      Format: esm # Undocumented
      EntryPoints:
        - src/handler.ts
```

## Feature 2: OutExtension

Setting the format type for esbuild to use is only 50% of the problem. The code compiles now. Deploy it and you may see it still doesn't work. The error might look something like this:

` await is only valid in async functions and the top level bodies of modules`

But the code compiled and we've explicitly set the output to be a module. Javascript is ... funny. The problem here is that the run time hasn't been told it's using esmodules and it will usually find this information out one of two ways.
  - Does the `package.json` have a `type: module` JSON property?
  - Is the file extension a `.mjs` type?

We could change the `package.json` but alas, doesn't fix our issue. This is because the Sam CLI omits the `package.json` from the deployment. You don't need it to run a Lambda. This is where you can add an `OutExtension` property to your CloudFormation template.
Take the example before and add the `OutExtension` property.

```yaml
Resources:
  myFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: handler.lambdaHandler
      CodeUri: ./
      Runtime: nodejs18.x
      FunctionName: "MyTestFunction"
    Metadata: # Manage esbuild properties
      BuildMethod: esbuild
      BuildProperties:
        Target: "node18"
        Format: esm # Undocumented
        OutExtension: # Undocumented
          - .js=.mjs
        Sourcemap: true
        EntryPoints:
          - src/handler.ts
```

Esbuild will now output the `.mjs` files instead of `js`.

## Feature 3: npm ci

`npm ci` is a way to do a [clean install of your dependencies](https://docs.npmjs.com/cli/v9/commands/npm-ci).
To get this to run you need to add the following to your `BuildProperties` like the following

```yaml
BuildProperties:
  Target: "node18"
  Format: esm # Undocumented
  UseNpmCi: true # Undocumented
  OutExtension: # Undocumented
    - .js=.mjs
  Sourcemap: true
  EntryPoints:
    - src/handler.ts
```