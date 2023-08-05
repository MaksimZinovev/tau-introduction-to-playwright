import { test, expect,  type Page } from "@playwright/test";
import { HomePage } from "../pages/home-page";


/* 
test 1:
1. open playwright site 
2. Press Cmd + K 
3. Verify heading search dialog opens
*/

const URL = "https://playwright.dev/";
let homePage: HomePage;
test.beforeAll(async () => {
  console.log("Starting testing");
});

test.beforeEach(async ({ page }, testInfo ) => {
  await page.goto(URL);
  homePage = new HomePage(page);
  console.log(`Test info: ${testInfo.title}`); 
  console.log(`Test info root dir: ${testInfo.config.rootDir}`); 
});

test.afterAll(async () => {
    console.log("Finished testing"); 
});

test("search modal opens via Cmd+K ", async () => {
  // Act
  await homePage.keyboardPress('Control+k');
  await homePage.waitForInputField();

  // Assert
  await homePage.assertDocSearchListVisible();
});
test("recent search is displayed", async ({ page }) => {
 // Act
 await homePage.keyboardPress('Control+k');
 await homePage.waitForInputField();
 await homePage.typeSearchQuery('locator');
 await homePage.waitForSearchDocsList();
 await homePage.searchListPress('Enter');
 await homePage.waitForURL('**/locators');
 await homePage.waitForPageLoad();
//  await homePage.clickSearch();
await homePage.keyboardPress('Control+k');
 // Test is flaky.Click works, but search dialog sometimes closes and test fails on line 52
 await homePage.waitForSearchDocsList();

 // Assert
 await homePage.assertDocSearchItemVisible();
 await homePage.assertDocSearchItemText('Locators');
}); 

