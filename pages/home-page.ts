import { type Locator, type Page, expect } from '@playwright/test';

type  Key = 'ArrowDown' | 'ArrowUp' | 'Enter' | 'Control+k';

export class HomePage {
    readonly page: Page;
    readonly getStartedButton: Locator;
    readonly pageTitle: RegExp;
    readonly searchField: Locator;
    readonly searchInputField: Locator;
    readonly searchDocsList: Locator;
    readonly docsSearchItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getStartedButton = page.getByRole('link', { name: 'Get started' });
        this.pageTitle = /Playwright/;
        this.searchField = page.getByLabel('Search');
        this.searchInputField = page.getByPlaceholder('Search docs');
        this.searchDocsList = page.getByRole('link', { name: 'Locators', exact: true });
        this.docsSearchItem = page.locator('[id*= docsearch-item]')
    }

    async clickGetStarted() {
        await this.getStartedButton.click();
    }

    async clickSearch() {
        await this.searchField.click();
    }
  async typeSearchQuery(query) {
        await this.searchInputField.fill(query);
    }

  async waitForSearchDocsList() {
        await this.searchDocsList.waitFor();
    }
  async waitForInputField() {
        await this.searchInputField.waitFor();
    }

  async searchListPress(key: Key) {
        await this.searchInputField.press(key);
    }

  async keyboardPress(key: Key) {
        await this.page.keyboard.press(key);
    }

    async assertPageTitle() {
        await expect(this.page).toHaveTitle(this.pageTitle);
    }


    async assertPageUrl(pageUrl: RegExp) {
        await expect(this.page).toHaveURL(pageUrl);
    }  
    
    async assertDocSearchListVisible() {
        await expect(this.searchInputField).toBeVisible();
    } 

    async assertDocSearchItemVisible() {
        await expect(this.docsSearchItem).toBeVisible();
    }
    async assertDocSearchItemText(text) {
        await expect(this.docsSearchItem).toHaveText(text);
    }
    async waitForPageLoad() {
        await this.page.waitForLoadState();
    }
    async waitForURL(url) {
        await this.page.waitForURL(url);
    }
}

export default HomePage;