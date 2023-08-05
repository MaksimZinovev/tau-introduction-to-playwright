import { test, expect, type Page } from "@playwright/test";
import { HomePage } from "../pages/home-page";
import { LocatorsPage } from "../pages/locators-page";

/* 
test 1:
1. open playwright site 
2. Click search
3. Enter "locator"
4. Select 1st suggestion
5. Open search result page
6. Verify heading
*/
const URL = "https://playwright.dev/";
const URL_LOCATORS = /.*locator/;
let homePage: HomePage;
let locatorsPage: LocatorsPage;

test.beforeAll(async () => {
  console.log("Starting testing");
});

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto(URL);
  homePage = new HomePage(page);
  console.log(`Test info: ${testInfo.title}`);
  console.log(`Test info root dir: ${testInfo.config.rootDir}`);
  //   testInfo.slow();
});

test.afterAll(async () => {
  console.log("Finished testing");
});

async function searchItemPress(page: Page) {
  await homePage.searchListPress("Enter");
  locatorsPage = new LocatorsPage(page);
}

test("search", async ({ page, browserName }) => {
  test.skip(browserName === "firefox", "Not running in Firefox");
  // Act
  await homePage.clickSearch();
  await homePage.typeSearchQuery("locator");
  await homePage.waitForSearchDocsList();
  await homePage.searchListPress("ArrowDown");
  await searchItemPress(page);

  // Assert
  await locatorsPage.assertPageUrl(URL_LOCATORS);
  await locatorsPage.assertHeadingVisible("Filtering Locators");
});
