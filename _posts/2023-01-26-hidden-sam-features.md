---
title: Hidden Sam CLI features
date: 2023-01-26
status: live
excerpt: Uncovering some undocumented features of the AWS Sam CLI - warning these might be subject to change.
alt:
---

Recently at work (GDS) I've been using the AWS Sam CLI in anger and as a result I've covered some undocumented features that I've ended up using. When I say undocumented, I mean it doesn't appear [on this page of documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-build-typescript.html) as off now, 2023-01-26.

So, the project is made up of NodeJS functions written in Typescript. We want to use all the latest features that AWS Sam provide such as esbuild bundling. Perfect. But we quickly came across...'limitations'.

Limitation one. Try get Top level await to work. I dare you.

Firstly, why do you want Top Level await in Lambda? If you didn't know already. Let's quickly refresh on the life of a Lambda function.

IMAGE OF LIFE OF LAMBDA FUNCTION

In the init stage of the Lambda life, the code that is not initated in the `handler` function of the Lambda will run. For example, consider the following:

```Javascript
const wows = ["much wow", "woah", "dude"];
for(const wow of wows) {
  console.log(wow);
}

export function handler() {
  ...
  // my awesome handler logic
  ...
}
```

When a Lambda function is in the init stage of its life (first invocation) the code outside that handler will run. After that the event that invoked the Lambda function will then trigger the execution of the `handler` function.

After your function finishes with that invocation, it will be able to accept another event. Eventually the function will be removed and a new one will appear.

If in your system you require the Lambda to fetch some dynamic configuration, perhaps stored in a datastore, then it will be in your interest to make that call in the `init` stage so its cached for any future calls. [You can read more on AWS here](https://aws.amazon.com/blogs/compute/using-node-js-es-modules-and-top-level-await-in-aws-lambda/)

So, top level await is avaliable in AWS Lambda but if you try and use Typescript, esbuild AND AWS Sam CLI, you will come across some problems.

First problem: esBuild throws an error something like this - `Top-level 'await' expressions are only allowed when...`. I don't have the original with me. I thought because esbuild is...modern and Typescript is modern and my node version is... modern, this should be fine? But no. esbuild will automatically target Common Javascript. Which is not combatible with top level async await. Argh!

Solution? After digging through the source code on github to see if I can use any old esbuild setting in the SAM cli BuildProperties. I found an option for adding a `format` option.

For example, in your cloudformation template - [full example here](https://github.com/MattBidewell/sam-cli-esbuild-top-level-await/blob/main/template.yaml)
```yaml
Metadata: # Manage esbuild properties
   BuildMethod: esbuild
   BuildProperties:
      Target: "node18"
      Format: esm
      Sourcemap: true
      EntryPoints:
        - src/handler.ts
```

You can specify the bunder to output esm javascript. Great!

esbuild is now happy. But now the Lambda run time isnt. You'll get the error INSERT LAMBDA ERROR
This error is telling us we can use modules outside of either a package.json with `type:module` added to the project (which won't be compiled and deployed with AWS Sam CLI) or the file type of the Javascript should be `.mjs` to signify the runtime that it's esm moduled Javascript! arghhh x2. So how do you correct this?!

Again, another new undocumented feature:

in that same BuildProperties we can add another esbuild option!
```yaml
Metadata: # Manage esbuild properties
  BuildMethod: esbuild
  BuildProperties:
    Target: "node18"
    Format: esm
    OutExtension:
      - .js=.mjs
    Sourcemap: true
    EntryPoints:
      - src/handler.ts
```