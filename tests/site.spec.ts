import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("content links use reading typography without decorative arrows", async ({ page }) => {
  await page.goto("/");
  const paragraph = page.getByText("I'm Matt. I build software and write about what I learn along the way. Sometimes technical. Sometimes just life.", { exact: true });
  const typography = await paragraph.evaluate(element => ({
    family: getComputedStyle(element).fontFamily,
    size: getComputedStyle(element).fontSize,
  }));
  for (const name of ["A little more about me", "All writing", "All Mumblings", "All projects"]) {
    const link = page.getByRole("link", { name, exact: true });
    await expect(link).toHaveCSS("font-family", typography.family);
    await expect(link).toHaveCSS("font-size", typography.size);
  }
  for (const route of ["/about", "/projects/2026-02-23-trail-mapper", "/blog/2026-02-21-one-typo-away-from-being-owned", "/bookshelf"]) {
    await page.goto(route);
    const links = await page.locator("main a").evaluateAll(elements => elements.map(element => ({
      family: getComputedStyle(element).fontFamily,
      decoration: getComputedStyle(element, "::after").content,
    })));
    expect(links.every(link => link.family === typography.family)).toBe(true);
    expect(links.every(link => !/[←→↗↘↙↖]/.test(link.decoration))).toBe(true);
  }
});

test("ASCII logo animates once on interaction and respects reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const brand = page.getByRole("link", { name: "matty.dev", exact: true });
  const mark = brand.locator("[data-ascii-mark]");
  const rows = mark.locator("span");
  await expect(mark).toHaveAttribute("aria-hidden", "true");
  await expect(rows).toHaveCount(7);
  await expect(rows.first()).toHaveCSS("animation-name", "none");
  await brand.hover();
  await expect(rows.first()).not.toHaveCSS("animation-name", "none");
  await expect(rows.first()).toHaveCSS("animation-iteration-count", "1");
  await expect.poll(() => mark.evaluate(element => element.getAnimations({ subtree: true }).filter(animation => animation.playState === "running").length)).toBe(0);
  await page.mouse.move(0, 0);
  await page.keyboard.press("Tab");
  await brand.focus();
  await expect(rows.first()).not.toHaveCSS("animation-name", "none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(rows.first()).toHaveCSS("animation-name", "none");
  await brand.hover();
  await expect(rows.first()).toHaveCSS("animation-name", "none");
});

test("footer keeps a horizontal list of links without arrows or a signoff", async ({ page }) => {
  await page.goto("/");
  const footer = page.getByRole("contentinfo");
  await expect(footer.getByRole("listitem")).toHaveText(["RSS", "GitHub", "X", "LinkedIn", "Resume"]);
  await expect(footer).not.toContainText("Always a work in progress");
  const arrows = await footer.locator('a[target="_blank"]').evaluateAll(links =>
    links.map(link => getComputedStyle(link, "::after").content),
  );
  expect(arrows.every(content => content === "none")).toBe(true);
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const positions = await footer.getByRole("link").evaluateAll(links => links.map(link => link.getBoundingClientRect().top));
    expect(new Set(positions).size).toBe(1);
  }
});

test("home introduces the publication and surfaces real writing", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "matty.dev", exact: true }),
  ).toBeVisible();
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.locator("main h1")).toHaveText("Matt Bidewell");
  await expect(page.locator("main ul p")).toHaveCount(0);
  const note = page.getByRole("region", { name: "Notes from the notebook" }).getByRole("listitem").first();
  const dateBox = await note.locator("time").boundingBox();
  const titleBox = await note.getByRole("heading").boundingBox();
  expect(dateBox).not.toBeNull();
  expect(titleBox).not.toBeNull();
  expect(dateBox!.x + dateBox!.width).toBeLessThan(titleBox!.x);
  await expect(page.locator("#intro-title + p")).toHaveText(/Software, systems &\s*the bits in between\./);
  await expect(
    page.getByRole("heading", { name: "One Typo Away From Being Owned" }),
  ).toBeVisible();
  await expect(page.locator("main h2")).toHaveText([
    "Notes from the notebook",
    "Things I've been building",
  ]);
  await expect(page.getByRole("link", { name: "Mumblings №11", exact: true })).toBeVisible();
  await expect(page.getByText("Selected reading", { exact: true })).toHaveCount(0);
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

test("home uses the same reading column as the supporting pages", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/about");
  const about = await page.locator(".route-content").boundingBox();
  await page.goto("/");
  const home = await page.locator(".route-content").boundingBox();
  expect(home?.width).toBe(about?.width);
  expect(home?.x).toBe(about?.x);
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
    nav.getByRole("link", { name: "Writing", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await menu.click();
  await nav.getByRole("link", { name: "Mumblings", exact: true }).click();
  await expect(page).toHaveURL(/\/mumblings/);
  await expect(nav).toBeHidden();
  await menu.click();
  await expect(
    nav.getByRole("link", { name: "Mumblings", exact: true }),
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
    .getByRole("link", { name: "Writing" })
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
    .getByRole("link", { name: "Writing" })
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
