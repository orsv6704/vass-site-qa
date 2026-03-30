import { test, expect } from '@playwright/test';

test('Erbjudanden navigation works (R1-R3)', async ({ page }) => {
  // R1: Open homepage
  await page.goto('https://www.vasscompany.se/');

  // Accept cookies if needed (optional safeguard)
  const acceptButton = page.getByRole('button', { name: /accept/i });
  if (await acceptButton.isVisible().catch(() => false)) {
    await acceptButton.click();
  }

  // R1: Verify "Erbjudanden" is visible
  const erbjudandenLink = page.getByRole('link', { name: 'Erbjudanden', exact: true });
  await expect(erbjudandenLink).toBeVisible();

  // R2: Click it
  await erbjudandenLink.click();

  // R3: Verify URL changed
  await expect(page).not.toHaveURL('https://www.vasscompany.se/');

  // R3: Verify content exists (loose check for now)
  await expect(page.locator('body')).toContainText(/Erbjudanden/i);
});