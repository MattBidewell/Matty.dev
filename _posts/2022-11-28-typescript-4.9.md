---
title: Typescript 4.9 - the latest features.
date: 2022-11-28
status: live
excerpt: Typescripts latest update is here. Heres a run down of the latest features.
alt: A photo of the number 4.9 on a blue background painted to a skyscraper in New York
---

Javascript can suck, but Typescript makes life better. I love Typescript. And Typescript 4.9 is here. With it comes new features which will make your code easier to understand whilst being typesafe.

## Satisfies

The new Satisfies operator is used to solve the issue when we have an expression that matches one type but could also match another type. An example might be when we have an object of the same data but represented in different ways.

```Typescript
type RGB = [number, number, number];

const palette: Record<"red"|"blue"|"green", string | RGB> = {
	red: [255,0,0],
	green: "#00ff00",
	blue: [0,0,255]
}

palette.green.toUpperCase(); // error! 😱
```

The code is fine, however, the problem is the Type annotation of the colours Record. It will throw an error when we try to use `colours.green.toUpperCase()` as if it is a string. We can see it's a string, our compiler can't.

We could delete the type completely... But this will create an environment that will allow type errors in our code.

Alternatively, we could add conditional statements to get around it. But this is bloat, it's messy.

```typescript
type RGB = [number, number, number];

const palette: Record<"red"|"blue"|"green", string | RGB> = {
	red: [255,0,0],
	green: "#00ff00",
	blue: [0,0,255]
}

if (typeof palette.green === "string") {
		palette.green.toUpperCase(); // 🤮
}
```

Instead, we can use the satisfies operator to make sure types are inferred correctly based on the values they are.

```typescript
type RGB = [number, number, number];

const palette = {
  red: [255,0,0],
  green: "#00ff00",
  blue: [0,0,255]
} satisfies Record<"red"|"blue"|"green", string | RGB>

palette.green.toUpperCase(); // 😁
```

It's a win in situations where data incoming can be of multiple types such as if you're building a framework or handling an API call and want to infer the types in the response.

Note:
>Record is a special type in Typescript, it implements the following signature `Record<keys, Type>`. It means an Object of these possible keys and these possible types. Useful for when the Keys of an object could mean more than one Type. Crazy, I know.*

[The satisfies operator](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9-rc/#the-satisfies-operator)

### Unlisted property narrowing - In

The new `in` operator is used when you're not certain of the type of variable a function is using. For example:

```typescript
interface Context {
	packageJSON: unknown;
}

function tryGetPackageName(context: Context) {
	const packageJSON = context.packageJSON;
	if (packageJSON && typeof packageJSON === "object") {
		return pacakgeJSON.name; // error Name doesn't exist on unknown
	}

	return undefined;
}
```

To fix this, we can use the `in` operator to build the type out and add type safety. This is useful when you're trying to build a type out of a unknown input.

```typescript
interface Context {
	packageJSON: unknown;
}

function tryGetPackageName(context: Context) {
	const packageJSON = context.packageJSON;
	if (packageJSON && typeof packageJSON === "object") {
		if("name" in packageJSON && typeof packageJSON.name === "string") {
				return pacakgeJSON.name;
		}
	}

	return undefined;
}
```

[In-narrowing](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9-rc/#in-narrowing)

## ECMAScript auto-accessors

The new `accessor` keyword can be used in classes to automatically generate getters and setters. The property created will be private so it's not user-reachable.

```typescript
class Person {
	accessor name: string;

	constructor(name: string) {
		this.name = name;
	}
}
```

[Support for auto-accessor fields from Stage 3 Decorators proposal](https://github.com/microsoft/TypeScript/pull/49705)


## File watching events (speed improvements)

Typescripts internals now use File System events to watch files. Meaning that applications using Typescript for code editing should have a noticeable speed improvement. Previously Typescript used polling to watch individual files, meaning it would check periodically for updates, a potentially expensive task if there are a large number of files.

Instead of polling, Typescript will now use the file system events to listen for updates in specific files and only get notified when they actually change. This should help on much larger projects held in Monorepos.

[File-Watching Now uses File System Events](https://devblogs.microsoft.com/typescript/announcing-typescript-4-9-rc/#file-watching-now-uses-file-system-events)