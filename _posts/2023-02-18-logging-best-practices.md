---
title: Best Logging practices
date: 2023-02-18
status: live
excerpt: A dive into some ideas around best practices for logging in your code. Why do you want logging? when you should and shouldnt.
alt: A selection of logs on the ground in a gree field.
---

Logging is powerful tool for troubleshooting and error monitoring. It provides a record of events that occur during an execution of a program. However, its only as helpful as the content and format itself. A log that displays useless information is a waste of computational power, storage and money.

In my opinion, logging should be classed as a first class citizen in a system. Because of this, you should treat logging as a formal process with best practices in place and a clear goal of what you want to achieve.

To start with, I'd recommend to NOT use the standard output libraries your language provides. They are usually missing features that logging libraries provide and should only be used when debugging locally.

Here are some examples of alternatives to the standard output of a language:

- Node.JS [winston](https://github.com/winstonjs/winston)
- Java [Log4J](https://logging.apache.org/log4j/2.x/)
- Go [Zap](https://pkg.go.dev/go.uber.org/zap)

## Best practices

### 1. Test your logs

I don't mean unit tests. What I mean is if you write logs then go into your service and take a look at the output. Anwser the following,  is it what you expected? Is anything missing? Are they understandable? Do you need more/less context?

Share it with a teammate and ask do they understand the output?

### 2. Do NOT log sensitive information!

Do NOT log sensitive information. API keys, passwords, credentials and more fall under this category. It's far to risky to log anything sensitive as it increases the chances of it leaking and becoming a security problem.

Example:

```js
❌
logger.error("Unable to log in", {request});

✅
logger.error("Unable to log in", {
  username: request.user,
  password: request.pass ? "[HIDDEN]" : null,
  // any additional context needed?
})
```

### 3. Be specific in your messages

Logging is only as beneficial as the message in the log, therefor, be specific.

```js
❌
logger.info("We're starting!")
...
logger.info("task complete!")

✅
logger.info("Starting task", {
  name: taskName,
  params: params,
  startTime: startTime
});

logger.info("task complete", {
  response: output.response,
  event: {
    action: taskName,
    duration: currentTime - startTime
  }
})
```

### 4. Dont log large messages!

Logging costs money. The logs are usually stored on a file and uploaded into storage where they can parsed. This costs. If your system responded to a million requests that could be millions and millions of potential log events to be stored. Make sure they're only logging relevant data.

### 5. Log all errors

Logs are a best friend to those debugging, so, as a programmer if you find yourself in a situation writing error handling, make sure you always log the error before throwing a different one for the user. For example:

```js
catch(err) {
  logger.error('An error occured', {error: err, args: args});
  throw new SystemError('Unable to process request');
}
```

If we don't log the original error then we could find ourselves with no context as too why we're throwing a `SystemError`.

### 6. Use the features of your logger

Most Loggers come with a really powerful feature. Log levels. These allow you to separate your logs by contextual environment. Prod like environments, only show Info and Error. Debug environments, show all. Also use the environment for what it means, don't use the Info level for errors!

### 7. Don't use `debug` level for system monitoring data

It sometimes catches people off guard, but you can't always guarantee the environment will be set up to print `debug` level logs. Therefor if you're logging a vital bit of data used for dashboards, you will want to use `info` or `error` levels that are guaranteed.

### 8. Make sure you keep trace Ids in the logs

This point is more for distributed systems, but if you're using trace Ids in your system. Log them! Figuring out journeys through a system without them is very hard!

### 9. Set a minimum standard for the project

Set a standard of minimum fields to log within your system. These should include logging latencies, request durations and trace ids. A standard like this will allow you to identify potential performance issues and be proactive rather than reactive in addressing them.