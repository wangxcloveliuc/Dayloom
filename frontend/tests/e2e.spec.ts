import { test, expect } from '@playwright/test';

test('homepage has title and nav', async ({ page }) => {
  await page.goto('http://localhost:3001');
  await expect(page.locator('nav')).toBeVisible();
  await expect(page).toHaveTitle(/Create Next App/i);
});
