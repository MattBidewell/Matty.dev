import { test, expect } from "@playwright/test";

test.describe("Blog Page", () => {
  test("blog page loads successfully", async ({ page }) => {
    const response = await page.goto("/blog");
    expect(response?.status()).toBe(200);
  });

  test("blog page has heading", async ({ page }) => {
    await page.goto("/blog");

    const heading = page.getByRole("heading", { name: /blog posts/i });
    await expect(heading).toBeVisible();
  });

  test("blog page displays at least one post", async ({ page }) => {
    await page.goto("/blog");

    // Find blog post links in the table
    const blogLinks = page.locator("table a");

    // Should have at least one post
    const count = await blogLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe("Blog Post Page", () => {
  test("can navigate to first blog post from blog list", async ({ page }) => {
    await page.goto("/blog");

    // Get the first blog post link
    const firstPostLink = page.locator("table a").first();

    // Store the post title for later verification
    const postTitle = await firstPostLink.textContent();

    // Click on the first post
    await firstPostLink.click();

    // Verify we navigated to a blog post page
    await expect(page).toHaveURL(/\/blog\/.+/);

    // Verify the post title is displayed (use the post-specific title, not the site header)
    if (postTitle) {
      const postHeading = page.locator("h1").filter({ hasText: postTitle });
      await expect(postHeading).toBeVisible();
    }
  });

  test("blog post page has content", async ({ page }) => {
    await page.goto("/blog");

    // Navigate to first post
    const firstPostLink = page.locator("table a").first();
    await firstPostLink.click();

    // Verify page has a title (h1)
    const title = page.getByRole("heading", { level: 1 });
    await expect(title).toBeVisible();

    // Verify there is content in the post body
    // The post body contains the rendered markdown content
    const content = page.locator(".content");
    await expect(content).toBeVisible();

    // Content should have some text
    const textContent = await content.textContent();
    expect(textContent?.length).toBeGreaterThan(0);
  });

  test("blog post has date displayed", async ({ page }) => {
    await page.goto("/blog");

    // Navigate to first post
    await page.locator("table a").first().click();

    // Wait for navigation to complete
    await expect(page).toHaveURL(/\/blog\/.+/);

    // Verify date is displayed (format: YYYY-MM-DD) - use first match in the post area
    const dateElement = page.locator("p").filter({ hasText: /^\d{4}-\d{2}-\d{2}$/ }).first();
    await expect(dateElement).toBeVisible();
  });

  test("blog post footer is visible", async ({ page }) => {
    await page.goto("/blog");

    // Navigate to first post
    await page.locator("table a").first().click();

    // Verify footer section exists (contains "Back to blog" or similar navigation)
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});
