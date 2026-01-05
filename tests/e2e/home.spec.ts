import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page loads successfully", async ({ page }) => {
    // Verify the page returns a successful response
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("page title contains Matty.dev", async ({ page }) => {
    await expect(page).toHaveTitle(/Matty\.dev/);
  });

  test("navigation links are present", async ({ page }) => {
    const nav = page.locator("nav");

    // Verify all navigation links exist
    await expect(nav.getByRole("link", { name: "home" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "about" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "blog" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "bookshelf" })).toBeVisible();
  });

  test("navigation links have correct hrefs", async ({ page }) => {
    const nav = page.locator("nav");

    await expect(nav.getByRole("link", { name: "home" })).toHaveAttribute("href", "/");
    await expect(nav.getByRole("link", { name: "about" })).toHaveAttribute("href", "/about");
    await expect(nav.getByRole("link", { name: "blog" })).toHaveAttribute("href", "/blog");
    await expect(nav.getByRole("link", { name: "bookshelf" })).toHaveAttribute("href", "/bookshelf");
  });

  test("avatar image is visible and loads correctly", async ({ page }) => {
    // Find the avatar image (use first() since there are 2 avatar images on page)
    const avatarImage = page.locator('img[src*="avatar"]').first();

    // Verify image is visible
    await expect(avatarImage).toBeVisible();

    // Verify image has loaded (naturalWidth > 0 means loaded)
    const isLoaded = await avatarImage.evaluate((img: HTMLImageElement) => {
      return img.complete && img.naturalWidth > 0;
    });
    expect(isLoaded).toBe(true);
  });

  test("blog posts section is displayed", async ({ page }) => {
    // Verify blog posts heading exists
    const blogHeading = page.getByRole("heading", { name: /blog posts/i });
    await expect(blogHeading).toBeVisible();
  });

  test("at least one blog post link is shown on home page", async ({ page }) => {
    // Find blog post links in the table
    const blogLinks = page.locator("table a");

    // Should have at least one post
    const count = await blogLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
