import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Stack Overflow' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('heading', { name: 'Questions tagged [playwright]' }).click();
});