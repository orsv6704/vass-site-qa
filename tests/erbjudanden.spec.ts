import { test, expect } from '@playwright/test';

test('R1: Erbjudanden is visible in navigation', async ({ page }) => {
  await page.goto('https://www.vasscompany.se/');

  const link = page.getByRole('link', { name: 'Erbjudanden', exact: true });
  await expect(link).toBeVisible();
});

test('R2: User can open Erbjudanden from navigation', async ({ page }) => {
  await page.goto('https://www.vasscompany.se/');

  const link = page.getByRole('link', { name: 'Erbjudanden', exact: true });
  await link.click();

  await expect(page).toHaveURL(/erbjudanden/i);
});

test('R3: Destination is confirmed by URL and content', async ({ page }) => {
  await page.goto('https://www.vasscompany.se/erbjudanden/');

  await expect(page).toHaveURL(/erbjudanden/i);
  await expect(page.locator('body')).toContainText(/erbjudanden|våra erbjudanden/i);
});