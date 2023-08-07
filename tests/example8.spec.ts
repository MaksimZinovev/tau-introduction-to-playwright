import { test, expect, type Page } from "@playwright/test";
import { HomePage } from "../pages/home-page";

/* 
test 1:
1. open playwright site homepage
2.Verify the page has not changed visually
*/

const URL = "https://playwright.dev/";
let homePage: HomePage;
test.beforeAll(async () => {
  console.log("Starting testing");
});

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(URL);
  homePage = new HomePage(page);
});

test.afterAll(async () => {
  console.log("Finished testing");
});

test("playwright homepage visual test", async () => {
  // Assert
  const starsLocator = homePage.page.getByLabel('stargazers on GitHub') 
  // Compare the full page screenshot with the baseline. Mask the stars number on the screenshot.
  await expect(homePage.page).toHaveScreenshot({ fullPage: true, mask: [starsLocator] });
});