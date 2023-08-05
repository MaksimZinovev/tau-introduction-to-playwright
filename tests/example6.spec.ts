test("recent search is displayed", async ({ page }) => {
  // Act
  await homePage.keyboardPress('Control+k');
  await homePage.waitForInputField();
  await homePage.typeSearchQuery('locator');
  await homePage.waitForSearchDocsList();
  await homePage.searchListPress('Enter');
  await homePage.waitForURL('**/locators');
  await homePage.waitForPageLoad();
  await homePage.keyboardPress('Control+k');
  await homePage.waitForInputField();
  await homePage.waitForSearchDocsList();
  await homePage.clickSearch();
  await homePage.waitForInputField();

  // Assert
  await homePage.assertDocSearchItemVisible();
  await homePage.assertDocSearchItemText('Locators');
});
