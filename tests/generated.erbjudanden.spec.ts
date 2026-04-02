import { test, expect } from '@playwright/test';

test.describe('Erbjudanden', () => {
test('R1: Erbjudanden page identity is visible', async ({ page }) => {
  // Requirement: A desktop user shall be able to open the Erbjudanden page and confirm that the correct destination has loaded.
  // Observable outcome: The URL contains \'/erbjudanden/\' and the heading \'Våra erbjudanden\' is visible.
  // Acceptance criteria:
  // - Given the user opens the Erbjudanden page on desktop, when the page finishes loading, then the URL contains \'/erbjudanden/\'
  // - Given the page has loaded, then the visible heading \'Våra erbjudanden\' is present
  // Candidate test cases:
  // - Verify the URL contains \'/erbjudanden/\'
  // - Verify the heading \'Våra erbjudanden\' is visible
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page).toHaveURL(/erbjudanden/i);
  await expect(page.locator('body')).toContainText(/Våra erbjudanden/i);
  await expect(page.locator('body')).toContainText(/\bAI\b/i);
});

test('R2: Primary contact CTA is visible', async ({ page }) => {
  // Requirement: A desktop user shall be able to see the primary contact call to action on the Erbjudanden page.
  // Observable outcome: The CTA \'Jag vill bli kontaktad\' is visible.
  // Acceptance criteria:
  // - Given the Erbjudanden page has loaded, then the CTA \'Jag vill bli kontaktad\' is visible
  // Candidate test cases:
  // - Verify \'Jag vill bli kontaktad\' is visible
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Jag vill bli kontaktad/i);
});

test('R3: Offer category Customer Experience is visible', async ({ page }) => {
  // Requirement: A desktop user shall be able to see the Customer Experience offer category on the Erbjudanden page.
  // Observable outcome: The text \'Customer Experience\' is visible.
  // Acceptance criteria:
  // - Given the Erbjudanden page has loaded, then \'Customer Experience\' is visible
  // Candidate test cases:
  // - Verify \'Customer Experience\' is visible
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Customer\s*Experience/i);
});

test('R4: Offer category Data & Analytics is visible', async ({ page }) => {
  // Requirement: A desktop user shall be able to see the Data & Analytics offer category on the Erbjudanden page.
  // Observable outcome: The text \'Data & Analytics\' is visible.
  // Acceptance criteria:
  // - Given the Erbjudanden page has loaded, then \'Data & Analytics\' is visible
  // Candidate test cases:
  // - Verify \'Data & Analytics\' is visible
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Data\s*&\s*Analytics/i);
});

test('R5: Offer category ERP & Affärssystem is visible', async ({ page }) => {
  // Requirement: A desktop user shall be able to see the ERP & Affärssystem offer category on the Erbjudanden page.
  // Observable outcome: The text \'ERP & Affärssystem\' is visible.
  // Acceptance criteria:
  // - Given the Erbjudanden page has loaded, then \'ERP & Affärssystem\' is visible
  // Candidate test cases:
  // - Verify \'ERP & Affärssystem\' is visible
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/ERP\s*&\s*Affärssystem/i);
});

test('R6: Offer category Business Transformation is visible', async ({ page }) => {
  // Requirement: A desktop user shall be able to see the Business Transformation offer category on the Erbjudanden page.
  // Observable outcome: The text \'Business Transformation\' is visible.
  // Acceptance criteria:
  // - Given the Erbjudanden page has loaded, then \'Business Transformation\' is visible
  // Candidate test cases:
  // - Verify \'Business Transformation\' is visible
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Business\s*Transformation/i);
});

test('R7: Offer category Kvalitetssäkring is visible', async ({ page }) => {
  // Requirement: A desktop user shall be able to see the Kvalitetssäkring offer category on the Erbjudanden page.
  // Observable outcome: The text \'Kvalitetssäkring\' is visible.
  // Acceptance criteria:
  // - Given the Erbjudanden page has loaded, then \'Kvalitetssäkring\' is visible
  // Candidate test cases:
  // - Verify \'Kvalitetssäkring\' is visible
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Kvalitetssäkring/i);
});

test('R8: Offer category UX & Design is visible', async ({ page }) => {
  // Requirement: A desktop user shall be able to see the UX & Design offer category on the Erbjudanden page.
  // Observable outcome: The text \'UX & Design\' is visible.
  // Acceptance criteria:
  // - Given the Erbjudanden page has loaded, then \'UX & Design\' is visible
  // Candidate test cases:
  // - Verify \'UX & Design\' is visible
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/UX\s*&\s*Design/i);
});

test('R9: Offer category Utveckling is visible', async ({ page }) => {
  // Requirement: A desktop user shall be able to see the Utveckling offer category on the Erbjudanden page.
  // Observable outcome: The text \'Utveckling\' is visible.
  // Acceptance criteria:
  // - Given the Erbjudanden page has loaded, then \'Utveckling\' is visible
  // Candidate test cases:
  // - Verify \'Utveckling\' is visible
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Utveckling/i);
});

test('R10: Offer category Webb & E-handel is visible', async ({ page }) => {
  // Requirement: A desktop user shall be able to see the Webb & E-handel offer category on the Erbjudanden page.
  // Observable outcome: The text \'Webb & E-handel\' is visible.
  // Acceptance criteria:
  // - Given the Erbjudanden page has loaded, then \'Webb & E-handel\' is visible
  // Candidate test cases:
  // - Verify \'Webb & E-handel\' is visible
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Webb\s*&\s*E-handel/i);
});

test('R11: Offer category AI is visible', async ({ page }) => {
  // Requirement: A desktop user shall be able to see the AI offer category on the Erbjudanden page.
  // Observable outcome: The text \'AI\' is visible.
  // Acceptance criteria:
  // - Given the Erbjudanden page has loaded, then \'AI\' is visible
  // Candidate test cases:
  // - Verify \'AI\' is visible
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/\bAI\b/i);
});

test('R12: Contact area is visible', async ({ page }) => {
  // Requirement: A desktop user shall be able to see a contact area on the Erbjudanden page.
  // Observable outcome: A contact section and visible form fields are present.
  // Acceptance criteria:
  // - Given the Erbjudanden page has loaded, then a contact section is visible
  // - Given the contact section is visible, then visible form fields are present
  // Candidate test cases:
  // - Verify the contact area is visible
  // - Verify at least one visible form field is present
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Förnamn|Efternamn|E-post|Telefon/i);
});

test('R13: Newsletter area is visible', async ({ page }) => {
  // Requirement: A desktop user shall be able to see the newsletter signup area on the Erbjudanden page.
  // Observable outcome: The newsletter section and an email input or signup control are visible.
  // Acceptance criteria:
  // - Given the Erbjudanden page has loaded, then the newsletter section is visible
  // - Given the newsletter section is visible, then an email input or signup control is visible
  // Candidate test cases:
  // - Verify the newsletter area is visible
  // - Verify an email input or signup button is visible
  await page.goto('https://www.vasscompany.se/erbjudanden/');
  await expect(page.locator('body')).toContainText(/Prenumerera|E-postadress|nyhetsbrev/i);
  await expect(page.locator('body')).toContainText(/\bAI\b/i);
});
});
