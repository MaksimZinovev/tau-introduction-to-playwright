import { type Locator, type Page, expect } from '@playwright/test';

type  Key = 'ArrowDown' | 'ArrowUp' | 'Enter';

export class LocatorsPage {
    readonly page: Page;
    readonly filteringLocatorsTitle: Locator;
    readonly headings: Locator;

    constructor(page: Page) {
        this.page = page;
        this.filteringLocatorsTitle = page.getByRole('heading', { name: 'Filtering LocatorsDirect link to Filtering Locators' });
        this.headings = page.getByRole('heading');
    }
   

    async assertPageUrl(pageUrl: RegExp) {
        await expect(this.page).toHaveURL(pageUrl);
    }
    async assertHeadingVisible(heading: string) {
        await expect(this.headings.getByText(heading)).toBeVisible();
    }
}

export default LocatorsPage;