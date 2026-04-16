---
title: Cognitive and Cyclical Complexity
date: 2024-10-05
status: live
excerpt: Lessons learned from complexity legacy codebase
alt: A hacker workeing on a VR headset, oil painting style.
---

# Combating Complexity within Software Engineering teams

I’ve had some time to reflect on the past two years of projects in my current role. Inheriting a large and **complex** codebase and then being given the space and time to rewrite and simplify it made me think deeply about the complexities surrounding the legacy code. I considered why it was written the way it was, what thought processes were involved in designing and producing the features, and how it was maintained.

Most of us have experienced something similar, and we have many solutions for this. We write RFCs (Request For Comments) for massive changes and ADRs (Architectural Decision Records) to justify architectural choices. These are high-level ways we collectively work together to simplify solutions. However, sometimes individual engineers add complexity at the code level.

This is probably not going to be a shock to you, but software engineers have an ego problem. We love to create complex solutions to problems. It makes us feel validated and vindicated. It's a plague within our industry, one that ruins the survivability and extendability of the products we create.

The problem is bigger than just our egos, though. Long-standing team members generate a perfect storm for creating unnecessary complexity. We get into an environment that's comfortable and one where we’re knowledgeable about the problem space we own. As a result, unneeded complexity rises in the code we write. Why don’t we see it? We do, but we allow it because we own it.

But then you leave, your colleagues leave, and a new team arrives. They need to decode what and why you did what you did, and you’ve left behind the ADRs and the RFCs. You’ve got comments in the code; that’s enough, right? No. What about the code itself? How complex did you leave that?

Introducing [Cyclomatic Complexity](https://en.wikipedia.org/wiki/Cyclomatic_complexity). Thomas J. McCabe, Sr. in 1976 devised a metric to measure complexity and invented Cyclomatic Complexity, quantifying a program’s complexity by counting the possible paths the code can take. A function that has more paths is considered more complex.

```jsx
function fakeComplexCode(x) {
    if (true) {
        return x; // 1st path
    } else if (false) {
        return x + 1; // 2nd path
    } else {
        return 4; // 3rd path
    }
}
```

**“So we just count the paths as we review? Surely not”**

No, there are static analysis tools that can calculate the complexity. ESLint, for example, has a [complexity rule](https://eslint.org/docs/latest/rules/complexity) in its toolbox.

Apply the following rule setup in ESLint on the previous function, and we end up with a complexity rating of 3, which will result in an ESLint error in our code. We can catch this in our IDE, explicitly in our CI/CD pipeline, and then you’re either justifying why you disabled it in your code review or proactively seeking ways to make your code simpler.

```json
{
   "complexity": ["error", { "max": 2 }]
}
```

SonarSource then concluded that Cyclomatic Complexity could be improved. They created Cognitive Complexity, extending Thomas J. McCabe, Sr.'s initial idea, stating that:

> “…[Cyclomatic Complexity] is not a satisfactory measure of understandability. This is because methods with equal Cyclomatic Complexity do not necessarily present equal difficulty to the maintainer, leading to a sense that the measurement ‘cries wolf’ by over-valuing some structures while under-valuing others.

**Source:** [SonarSource whitepaper on cognitive complexity](https://www.sonarsource.com/resources/cognitive-complexity/)

Instead, this new algorithm takes a different approach, declaring that the cognitive load for things like switch implementations is a fixed rate of 1 instead of each individual case being +1.

Nested code also gains a +1 for each level of nesting.

```jsx
function scary(arr) {
    if (condition1) {                    // +1 = total 1
        for (const a of arr) {           // +2 (+1 for nesting) = total 3
            while (something) {           // +3 (+2 for nesting twice) = total 6
                // ...
            }
        }
    }
} // complexity 6
```

Does ESLint come with this as a rule? No, it doesn't, but SonarSource has published their own [ESLint plugin](https://github.com/SonarSource/eslint-plugin-sonarjs), which includes these rules.

You can also find linters for the following languages:

**Note:** I can only vouch for the SonarSource and GoCognit implementations.

- **GoLang** - [gocognit](https://github.com/uudashr/gocognit)
- **Java** - [cognitive-complexity-calculator](https://github.com/BruhZul/cognitive-complexity-calculator)
- **Python** - [flake8-cognitive-complexity](https://pypi.org/project/flake8-cognitive-complexity/)

In conclusion, make a conscious effort to reduce the cognitive load for future engineers. Do it today in your codebase so decision-making tomorrow can be easier. Also, remember that nesting code can make your code complex very quickly, so try to avoid it!
