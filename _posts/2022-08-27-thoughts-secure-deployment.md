---
title: Thoughts on secure deploying code
date: 2022-08-27
status: live
excerpt: A collection of my thoughts on how to securely deploy applications in the cloud.
alt: A rusty blue pipe with a grey end
---

The deployment of code is increasingly becoming a target to threat actors as it is one of the most sensitive parts of the journey to production.

The following post is a collection of thoughts on how to securely build and deploy into your cloud environment. All examples will be AWS specific, however, they can probably be reproduced in any major cloud provider.

You should be using a pipeline you trust and a process that is locked down as much as possible. Let’s take a look at what that could look like in AWS.

In this example, we're making use of code signing. Code Signing is a digital signature added to the code so then each deployment can confirm that there have been zero code changes between the build and deployment to production.

The code providers pipeline, such as GitHub actions/bitbucket pipelines, should be the source of truth for all code. The code signing should happen at the earliest stage, which is here. This limits the number of parties involved, ultimately limiting the number of attack vectors before the code has been signed.

In the same action, you should run your standard unit tests, browser tests etc. Anything that can run pre-deploy. Then sign the code.

The next idea is that you want your cloud provider to handle everything else, maximising the use of the cloud provider's identity access management (IAM) service by tightly locking down access to everything.

The CI action should then upload the artifact (the code) into a securely locked down bucket (S3 for AWS or Cloud Storage for GCP).

![visualisation of a GitHub deployment process](../../assets/images/2022-08-27-thoughts-secure-deployment/github-action.png)

What do I mean by securely locked down? Ideally, you would have only two identities that have access.

- One identity that can push into the bucket
- One identity that can pull from the bucket.

The identity that can pull from the s3 bucket should pull get the artifact and then use the cloud provider's code deploy service to handle the actual deployment. At this stage, you could also schedule some post-merge tests.

Finally, the artifact should be promoted to the next environment's bucket which will then trigger the next environment round of deployments. (for example production). Here you might have a slight variation of steps.

![visualisation of the entire journey from GitHub to develop aws](../../assets/images/2022-08-27-thoughts-secure-deployment/github-aws-dev.png)

The step to promote the artifact to the production environment could be a manual step for additional security. If so, the step should be in the non-prod environment because you don't want developers to have to log in to production to deploy code.

![visualisation of the entire journey from GitHub to production aws](../../assets/images/2022-08-27-thoughts-secure-deployment/github-aws-dev-aws-prod.png)

The important thing is that each step that involves creating, modifying, and deploying code should be as locked down as much as possible. This may mean creating many IAM profiles that do a single job. If a threat actor ever gained access to the system, you could severally limit the ability to traverse across your environments by managing code signing and being diligent with your IAM roles.