const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

function getFeatureArg() {
  const featureFlagIndex = args.indexOf('--feature');
  if (featureFlagIndex !== -1 && args[featureFlagIndex + 1]) {
    return args[featureFlagIndex + 1];
  }

  const equalsArg = args.find(arg => arg.startsWith('--feature='));
  if (equalsArg) {
    return equalsArg.split('=')[1];
  }

  const positionalArg = args.find(arg => !arg.startsWith('--'));
  if (positionalArg) {
    return positionalArg;
  }

  if (process.env.npm_config_feature && process.env.npm_config_feature !== 'true') {
    return process.env.npm_config_feature;
  }

  return 'erbjudanden';
}

const feature = getFeatureArg();

const inputPath = path.join(__dirname, '..', 'docs', 'requirements', `${feature}.json`);
const outputPath = path.join(__dirname, '..', 'tests', `generated.${feature}.spec.ts`);

const featureUrlMap = {
  erbjudanden: 'https://www.vasscompany.se/erbjudanden/',
  kontakt: 'https://www.vasscompany.se/kontakt/'
};

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

function regexAlternationFromTexts(values) {
  const parts = values.map(value =>
    String(value)
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      .replace(/\s*&\s*/g, '\\s*&\\s*')
      .replace(/\s+/g, '\\s*')
  );

  return `/${parts.join('|')}/i`;
}

function buildAssertions(req, sourceUrl) {
  const lines = [`  await page.goto('${escapeForSingleQuote(sourceUrl)}');`];
  const hints = req.assertion_hints || [];

  for (const hint of hints) {
    if (hint.type === 'url_contains' && hint.value) {
      lines.push(
        `  await expect(page.url()).toContain('${escapeForSingleQuote(hint.value)}');`
      );
    }

    if (hint.type === 'text_visible' && hint.value) {
      lines.push(
        `  await expect(page.locator('body')).toContainText(${regexFromText(hint.value)});`
      );
    }

    if (hint.type === 'text_visible_any' && Array.isArray(hint.values) && hint.values.length > 0) {
      lines.push(
        `  await expect(page.locator('body')).toContainText(${regexAlternationFromTexts(hint.values)});`
      );
    }
  }

  if (lines.length === 1) {
    lines.push(`  // No assertion_hints found for this requirement`);
    lines.push(`  await expect(page.url()).toContain('${escapeForSingleQuote(sourceUrl)}');`);
  }

  return lines.join('\n');
}

function buildCommentBlock(req) {
  const comments = [];
  comments.push(`  // Requirement: ${escapeForSingleQuote(req.requirement || req.description || '')}`);

  if (req.observable_outcome) {
    comments.push(`  // Observable outcome: ${escapeForSingleQuote(req.observable_outcome)}`);
  }

  if (req.acceptance_criteria && req.acceptance_criteria.length) {
    comments.push(`  // Acceptance criteria:`);
    for (const ac of req.acceptance_criteria) {
      comments.push(`  // - ${escapeForSingleQuote(ac)}`);
    }
  }

  return comments.join('\n');
}

function buildTestBlock(req, sourceUrl) {
  const reqId = req.id || 'UNKNOWN';
  const testName = `${reqId}: ${req.title || 'Untitled requirement'}`;
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

  const requirements = Array.isArray(data) ? data : (data.requirements || []);

  const sourceUrl =
    (Array.isArray(data) ? '' : (data.source_url || data.url || '')) ||
    featureUrlMap[feature] ||
    '';

  if (!sourceUrl) {
    throw new Error(`No source_url found in: ${inputPath}`);
  }

  const featureName = Array.isArray(data)
    ? feature
    : (data.feature_name || feature);

  const header = `import { test, expect } from '@playwright/test';

test.describe('${escapeForSingleQuote(featureName)}', () => {
`;

  const body = requirements.map(req => buildTestBlock(req, sourceUrl)).join('\n\n');

  const footer = `
});
`;

  const output = `${header}${body}${footer}`;

  fs.writeFileSync(outputPath, output, 'utf8');

  console.log(`Generated Playwright tests: ${outputPath}`);
  console.log(`Requirements processed: ${requirements.length}`);
  console.log(`Feature: ${feature}`);
}

main();