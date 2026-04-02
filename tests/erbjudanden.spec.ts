import { test, expect } from '@playwright/test';

test.describe('Erbjudanden requirements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.vasscompany.se/erbjudanden/');

    // Optional cookie handling
    const cookieButton = page.getByRole('button', { name: /accept|acceptera|godkänn/i });
    if (await cookieButton.isVisible().catch(() => false)) {
      await cookieButton.click();
    }

    await page.waitForLoadState('domcontentloaded');
  });

  test('R1: Erbjudanden page identity is visible', async ({ page }) => {
    await expect(page).toHaveURL(/erbjudanden/i);
    await expect(page.locator('body')).toContainText(/Våra erbjudanden/i);
  });

  test('R2: Primary contact CTA is visible', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/Jag vill bli kontaktad/i);
  });

  test('R3: Offer category Customer Experience is visible', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/Customer Experience/i);
  });

  test('R4: Offer category Data & Analytics is visible', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/Data\s*&\s*Analytics/i);
  });

  test('R5: Offer category ERP & Affärssystem is visible', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/ERP\s*&\s*Affärssystem/i);
  });

  test('R6: Offer category Business Transformation is visible', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/Business Transformation/i);
  });

  test('R7: Offer category Kvalitetssäkring is visible', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/Kvalitetssäkring/i);
  });

  test('R8: Offer category UX & Design is visible', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/UX\s*&\s*Design/i);
  });

  test('R9: Offer category Utveckling is visible', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/Utveckling/i);
  });

  test('R10: Offer category Webb & E-handel is visible', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/Webb\s*&\s*E-handel/i);
  });

  test('R11: Offer category AI is visible', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/\bAI\b/i);
  });

  test('R12: Contact area is visible', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/Förnamn|Efternamn|E-post|Telefon/i);
  });

  test('R13: Newsletter area is visible', async ({ page }) => {
    await expect(page.locator('body')).toContainText(/Prenumerera|E-postadress|nyhetsbrev/i);
  });
});