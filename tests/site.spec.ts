import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("content links use reading typography without decorative arrows", async ({
  page,
}) => {
  await page.goto("/");
  const paragraph = page.getByText(
    "Software engineer, product builder, and writer.",
    { exact: true },
  );
  const typography = await paragraph.evaluate((element) => ({
    family: getComputedStyle(element).fontFamily,
    size: getComputedStyle(element).fontSize,
  }));
  for (const name of [
    "More projects",
    "More posts",
    "Résumé",
  ]) {
    const link = page.getByRole("link", { name, exact: true });
    await expect(link).toHaveCSS("font-family", typography.family);
  }
  for (const route of [
    "/about",
    "/projects/2026-02-23-trail-mapper",
    "/blog/2026-02-21-one-typo-away-from-being-owned",
    "/bookshelf",
  ]) {
    await page.goto(route);
    const links = await page.locator("main a").evaluateAll((elements) =>
      elements.map((element) => ({
        family: getComputedStyle(element).fontFamily,
        decoration: getComputedStyle(element, "::after").content,
      })),
    );
    expect(links.every((link) => link.family === typography.family)).toBe(true);
    expect(links.every((link) => !/[←→↗↘↙↖]/.test(link.decoration))).toBe(true);
  }
});

test("wordmark and navigation use the bundled Inter typeface", async ({
  page,
}) => {
  await page.goto("/");
  const brand = page.getByRole("link", { name: "matty.dev", exact: true });
  const dot = brand.locator("span span");
  await expect(brand).toHaveText("matty.dev");
  await expect(brand).toHaveAttribute("href", "/");
  await expect(brand.locator("[data-ascii-mark]")).toHaveCount(0);
  await expect(dot).toBeVisible();
  const wordmarkFont = await brand.evaluate(
    (element) => getComputedStyle(element).fontFamily,
  );
  const navigationFont = await page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name: "Posts" })
    .evaluate((element) => getComputedStyle(element).fontFamily);
  const navigationLinks = await page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link")
    .allTextContents()
    .then((labels) => labels.map((label) => label.trim()));
  expect(wordmarkFont).toContain("Inter Variable");
  expect(navigationFont).toContain("Inter Variable");
  expect(navigationLinks).toEqual([
    "Posts",
    "Projects",
    "Bookshelf",
    "About",
  ]);
  const interLoaded = await page.evaluate(async () => {
    await document.fonts.ready;
    return document.fonts.check('500 16px "Inter Variable"');
  });
  expect(interLoaded).toBe(true);
  expect(await dot.evaluate((element) => getComputedStyle(element).color)).not.toBe(
    await brand.evaluate((element) => getComputedStyle(element).color),
  );
});

test("footer keeps a horizontal list of links without arrows or a signoff", async ({
  page,
}) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("listitem")).toHaveText([
    "RSS",
    "GitHub",
    "X",
    "LinkedIn",
  ]);
  await expect(footer).not.toContainText("Always a work in progress");
  const arrows = await footer
    .locator('a[target="_blank"]')
    .evaluateAll((links) =>
      links.map((link) => getComputedStyle(link, "::after").content),
    );
  expect(arrows.every((content) => content === "none")).toBe(true);
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const positions = await footer
      .getByRole("link")
      .evaluateAll((links) =>
        links.map((link) => link.getBoundingClientRect().top),
      );
    expect(new Set(positions).size).toBe(1);
  }
});

test("home lists recent projects, posts, Mumblings, and the resume", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "matty.dev", exact: true }),
  ).toBeVisible();
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator("main h1")).toHaveText("Matt Bidewell");
  const projects = page.getByRole("region", { name: "Projects" });
  const posts = page.getByRole("region", { name: "Posts" });
  const mumblings = page.getByRole("region", { name: "Mumblings" });
  await expect(projects.getByRole("listitem")).toHaveCount(3);
  await expect(posts.getByRole("listitem")).toHaveCount(3);
  await expect(mumblings.getByRole("listitem")).toHaveCount(3);
  await expect(projects.getByRole("link", { name: "Trail Mapper" })).toBeVisible();
  await expect(posts.getByRole("link", { name: "One Typo Away From Being Owned" })).toBeVisible();
  await expect(mumblings.getByRole("link", { name: "Mumblings №11" })).toBeVisible();
  await expect(page.getByRole("link", { name: "More projects" })).toHaveAttribute("href", "/projects");
  await expect(page.getByRole("link", { name: "More posts" })).toHaveAttribute("href", "/blog");
  await expect(page.getByRole("link", { name: "More mumblings" })).toHaveAttribute("href", "/mumblings");
  await expect(page.getByRole("link", { name: "Résumé" })).toHaveAttribute("href", "/assets/resume/Matt-Bidewell-Resume.pdf");

  for (const [section, label] of [
    [projects, "More projects"],
    [posts, "More posts"],
    [mumblings, "More mumblings"],
  ] as const) {
    const lastEntry = await section.getByRole("listitem").last().boundingBox();
    const more = await page.getByRole("link", { name: label }).boundingBox();
    expect(lastEntry).not.toBeNull();
    expect(more).not.toBeNull();
    expect(more!.y).toBeGreaterThan(lastEntry!.y + lastEntry!.height - 1);
  }
  await page
    .getByRole("link", { name: "One Typo Away From Being Owned", exact: true })
    .click();
  await expect(page).toHaveURL(
    /\/blog\/2026-02-21-one-typo-away-from-being-owned/,
  );
  await expect(page.locator("main h1")).toHaveText(
    "One Typo Away From Being Owned",
  );
});

test("Posts archive includes both posts and Mumblings in date order", async ({
  page,
}) => {
  await page.goto("/blog");
  await expect(page.locator("main h1")).toHaveText("Posts");
  const entries = page.locator("main").getByRole("list").first();
  await expect(
    entries.getByRole("link", { name: "Mumblings №11", exact: true }),
  ).toBeVisible();
  await expect(
    entries.getByRole("link", {
      name: "One Typo Away From Being Owned",
      exact: true,
    }),
  ).toBeVisible();
  await expect(entries.getByRole("listitem").first()).toContainText(
    "Mumblings №11",
  );
});

test("header, page content, and footer share a consistent width", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/about");
  const main = await page.locator("main.page-content").boundingBox();
  const header = await page.locator(".site-shell > header").boundingBox();
  const footer = await page.locator(".site-shell > footer").boundingBox();
  const content = await page.locator(".route-content").boundingBox();
  expect(header?.width).toBe(main?.width);
  expect(footer?.width).toBe(main?.width);
  expect(content?.width).toBe(main?.width);

  for (const route of ["/blog", "/projects", "/mumblings", "/bookshelf"]) {
    await page.goto(route);
    const routeContent = await page.locator(".route-content").boundingBox();
    expect(routeContent?.width, route).toBe(main?.width);
  }

  await page.goto("/");
  const home = await page.locator("[data-home-content]").boundingBox();
  expect(home?.width).toBe(main?.width);
});

test("theme follows the system and an explicit choice survives navigation and reload", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/about/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});

test("mobile navigation is hidden when closed, supports Escape, and works after navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation menu" });
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav).toBeHidden();
  await menu.click();
  await expect(nav).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(menu).toBeFocused();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(
    nav.getByRole("link", { name: "Posts", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await menu.click();
  await nav.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects/);
  await expect(nav).toBeHidden();
  await menu.click();
  await expect(
    nav.getByRole("link", { name: "Projects", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(accessibility.violations).toEqual([]);
});

test("system theme updates remain usable when storage is unavailable", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
    Storage.prototype.setItem = () => {
      throw new DOMException("Storage blocked", "SecurityError");
    };
  });
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name: "Posts" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("mobile reading and navigation work without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 375, height: 812 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/");
  await expect(
    page.getByRole("button", { name: /navigation menu/ }),
  ).toBeHidden();
  await page
    .getByRole("navigation", { name: "Main" })
    .getByRole("link", { name: "Posts" })
    .click();
  await expect(page).toHaveURL(/\/blog/);
  await expect(page.locator("main h1")).toBeVisible();
  await context.close();
});

test("site and article sharing images are valid PNG responses", async ({
  request,
}) => {
  for (const route of [
    "/opengraph-image.png",
    "/blog/2026-02-21-one-typo-away-from-being-owned/opengraph-image.png",
    "/mumblings/2026-03-05-mumblings-11/opengraph-image.png",
  ]) {
    const response = await request.get(route);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("image/png");
    const png = await response.body();
    expect(png.subarray(0, 8)).toEqual(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    );
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([1200, 630]);
  }
});

for (const theme of ["light", "dark"] as const) {
  test(`${theme} pages are accessible and fit mobile and desktop widths`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    for (const width of [320, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of [
        "/",
        "/blog",
        "/mumblings",
        "/projects",
        "/about",
        "/bookshelf",
        "/blog/2026-02-21-one-typo-away-from-being-owned",
        "/mumblings/2026-03-05-mumblings-11",
        "/projects/2026-02-23-trail-mapper",
      ]) {
        await page.goto(route);
        await expect(page.locator("main h1")).toHaveCount(1);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${route} at ${width}px`,
        ).toBe(true);
        if (width === 320 && route === "/") {
          await page.screenshot({
            path: `test-results/home-mobile-${theme}.png`,
            fullPage: true,
            style: "astro-dev-toolbar { display: none; }",
          });
        }
      }
    }
    for (const route of [
      "/bookshelf",
      "/blog/2026-02-21-one-typo-away-from-being-owned",
      "/mumblings/2026-03-05-mumblings-11",
      "/",
    ]) {
      await page.goto(route);
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(accessibility.violations, route).toEqual([]);
      if (route.startsWith("/blog/")) {
        await page.screenshot({
          path: `test-results/article-${theme}.png`,
          style: "astro-dev-toolbar { display: none; }",
        });
      }
    }
    expect(errors).toEqual([]);
    await page.screenshot({
      path: `test-results/home-${theme}.png`,
      fullPage: true,
      style: "astro-dev-toolbar { display: none; }",
    });
  });
}
