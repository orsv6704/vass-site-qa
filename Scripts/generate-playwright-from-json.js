const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'docs', 'requirements', 'erbjudanden.json');
const outputPath = path.join(__dirname, '..', 'tests', 'generated.erbjudanden.spec.ts');

function escapeForSingleQuote(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function regexFromText(text) {
  const escaped = String(text)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/\s*&\s*/g, '\\s*&\\s*')
    .replace(/\s+/g, '\\s*');
  return `/${escaped}/i`;
}

function buildAssertions(req, sourceUrl) {
  const title = (req.title || '').toLowerCase();
  const requirement = (req.requirement || '').toLowerCase();
  const observable = (req.observable_outcome || '').toLowerCase();
  const allText = `${title} ${requirement} ${observable}`;

  const lines = [`  await page.goto('${escapeForSingleQuote(sourceUrl)}');`];

  if (allText.includes('url') || allText.includes('/erbjudanden/')) {
    lines.push(`  await expect(page).toHaveURL(/erbjudanden/i);`);
  }

  if (
    allText.includes('identity') ||
    allText.includes('våra erbjudanden') ||
    title.includes('page identity')
  ) {
    lines.push(`  await expect(page.locator('body')).toContainText(/Våra erbjudanden/i);`);
  }

  if (allText.includes('cta') || allText.includes('kontaktad')) {
    lines.push(`  await expect(page.locator('body')).toContainText(/Jag vill bli kontaktad/i);`);
  }

  if (
    title.includes('contact area') ||
    allText.includes('contact section') ||
    allText.includes('form fields')
  ) {
    lines.push(`  await expect(page.locator('body')).toContainText(/Förnamn|Efternamn|E-post|Telefon/i);`);
  }

  if (
    title.includes('newsletter') ||
    allText.includes('newsletter') ||
    allText.includes('signup')
  ) {
    lines.push(`  await expect(page.locator('body')).toContainText(/Prenumerera|E-postadress|nyhetsbrev/i);`);
  }

  const categoryMap = [
    { key: 'customer experience', text: 'Customer Experience' },
    { key: 'data & analytics', text: 'Data & Analytics' },
    { key: 'erp & affärssystem', text: 'ERP & Affärssystem' },
    { key: 'business transformation', text: 'Business Transformation' },
    { key: 'kvalitetssäkring', text: 'Kvalitetssäkring' },
    { key: 'ux & design', text: 'UX & Design' },
    { key: 'utveckling', text: 'Utveckling' },
    { key: 'webb & e-handel', text: 'Webb & E-handel' },
    { key: ' ai ', text: 'AI', exactWord: true }
  ];

  for (const category of categoryMap) {
    if (allText.includes(category.key.trim())) {
      if (category.exactWord) {
        lines.push(`  await expect(page.locator('body')).toContainText(/\\bAI\\b/i);`);
      } else {
        lines.push(`  await expect(page.locator('body')).toContainText(${regexFromText(category.text)});`);
      }
      break;
    }
  }

  if (lines.length === 1) {
    lines.push(`  await expect(page).toHaveURL(/erbjudanden/i);`);
  }

  return lines.join('\n');
}

function buildCommentBlock(req) {
  const comments = [];
  comments.push(`  // Requirement: ${escapeForSingleQuote(req.requirement || '')}`);

  if (req.observable_outcome) {
    comments.push(`  // Observable outcome: ${escapeForSingleQuote(req.observable_outcome)}`);
  }

  if (req.acceptance_criteria && req.acceptance_criteria.length) {
    comments.push(`  // Acceptance criteria:`);
    for (const ac of req.acceptance_criteria) {
      comments.push(`  // - ${escapeForSingleQuote(ac)}`);
    }
  }

  if (req.candidate_test_cases && req.candidate_test_cases.length) {
    comments.push(`  // Candidate test cases:`);
    for (const tc of req.candidate_test_cases) {
      comments.push(`  // - ${escapeForSingleQuote(tc)}`);
    }
  }

  return comments.join('\n');
}

function buildTestBlock(req, sourceUrl) {
  const testName = `${req.id}: ${req.title}`;
  const comments = buildCommentBlock(req);
  const assertions = buildAssertions(req, sourceUrl);

  return `
test('${escapeForSingleQuote(testName)}', async ({ page }) => {
${comments}
${assertions}
});
`.trim();
}

function main() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  const raw = fs.readFileSync(inputPath, 'utf8');
  const data = JSON.parse(raw);

  const requirements = data.requirements || [];
  const sourceUrl = data.source_url || 'https://www.vasscompany.se/erbjudanden/';

  const header = `import { test, expect } from '@playwright/test';

test.describe('${escapeForSingleQuote(data.feature_name || 'Generated requirements tests')}', () => {
`;

  const body = requirements.map(req => buildTestBlock(req, sourceUrl)).join('\n\n');

  const footer = `
});
`;

  const output = `${header}${body}${footer}`;

  fs.writeFileSync(outputPath, output, 'utf8');
  console.log(`Generated smarter Playwright tests: ${outputPath}`);
  console.log(`Requirements processed: ${requirements.length}`);
}

main();