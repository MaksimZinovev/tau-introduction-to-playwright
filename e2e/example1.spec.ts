import { test, expect } from "@playwright/test";

const BASE_URL = "https://playwright.dev/";
const FOOTER_ITEMS_TEXT = [
  "Getting started",
  "API reference",
  "Stack Overflow",
  "Discord",
  "Twitter",
  "GitHub",
  "YouTube",
  "Blog",
];
const FOOTER_ITEMS = [
  { name: "Getting started", url: "https://playwright.dev/docs/intro" },
  {
    name: "API reference",
    url: "https://playwright.dev/docs/api/class-playwright",
  },
  {
    name: "Discord",
    url: "https://discord.com/servers/playwright-807756831384403968",
  },
  { name: "Stack Overflow", url: "https://stackoverflow.com/questions/tagged/playwright" },
  { name: "Twitter", url: "https://twitter.com/i/flow/login?redirect_after_login=%2Fplaywrightweb" },
  // { name: "GitHub", url: "https://github.com/microsoft/playwright" },
];

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test("footer has 8 links", async ({ page }) => {
  const footerLinks = page.locator("footer").getByRole("listitem");

  // Expect 8 links in footer.
  await expect(footerLinks).toHaveCount(8);
  await expect(footerLinks).toHaveText(FOOTER_ITEMS_TEXT);
});


const externalLinks = FOOTER_ITEMS.filter(item =>
  !item.url.includes("playwright.dev")
);
const internalLinks = FOOTER_ITEMS.filter(
  item => item.url.includes("playwright.dev")
);

for (const item of internalLinks) {
  test(`footer internal links ${item.name} link redirect`, async ({ page }) => {
    await page.getByRole("link", { name: item.name }).click();
    await expect(page).toHaveURL(item.url);
  });
}
for (const item of externalLinks) {
  test(`footer external links ${item.name} link redirect`, async ({ page }) => {
    const newTabPromise = page.waitForEvent("popup");
    await page.locator("footer").getByRole("link", { name: item.name }).click()
    const page1 = await newTabPromise;
    await expect(page1).toHaveURL(item.url);
  });
}

// test('each footer link opens', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects the URL to contain intro.
//   await expect(page).toHaveURL(/.*intro/);
// });
