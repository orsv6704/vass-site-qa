const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'test-results', 'results.json');
const outputPath = path.join(__dirname, '..', 'test-results', 'summary.txt');
const requirementsPath = path.join(__dirname, '..', 'docs', 'requirements', 'erbjudanden.json');

function collectTestsDeep(node, results = []) {
  if (!node || typeof node !== 'object') return results;

  if (Array.isArray(node.specs)) {
    for (const spec of node.specs) {
      if (Array.isArray(spec.tests)) {
        for (const test of spec.tests) {
          // Prefer nested result status if available
          let finalStatus = 'unknown';

          if (Array.isArray(test.results) && test.results.length > 0) {
            const statuses = test.results.map(r => r.status).filter(Boolean);

            if (statuses.includes('failed')) {
              finalStatus = 'failed';
            } else if (statuses.includes('timedOut')) {
              finalStatus = 'failed';
            } else if (statuses.includes('interrupted')) {
              finalStatus = 'failed';
            } else if (statuses.includes('passed')) {
              finalStatus = 'passed';
            } else if (statuses.includes('skipped')) {
              finalStatus = 'skipped';
            }
          } else if (test.status === 'expected') {
            finalStatus = 'passed';
          } else if (test.status === 'unexpected') {
            finalStatus = 'failed';
          } else if (test.status === 'skipped') {
            finalStatus = 'skipped';
          } else if (test.status === 'flaky') {
            finalStatus = 'flaky';
          }

          results.push({
            title: test.title || spec.title || 'Untitled test',
            status: finalStatus
          });
        }
      }
    }
  }

  for (const value of Object.values(node)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        collectTestsDeep(item, results);
      }
    } else if (value && typeof value === 'object') {
      collectTestsDeep(value, results);
    }
  }

  return results;
}

function main() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Results file not found: ${inputPath}`);
  }

  const raw = fs.readFileSync(inputPath, 'utf8');
  const data = JSON.parse(raw);
if (!fs.existsSync(requirementsPath)) {
  throw new Error(`Requirements file not found: ${requirementsPath}`);
}

const requirementsRaw = fs.readFileSync(requirementsPath, 'utf8');
const requirementsData = JSON.parse(requirementsRaw);
const requirements = requirementsData.requirements || [];

  const tests = collectTestsDeep(data);

  const total = tests.length;
  const passed = tests.filter(t => t.status === 'passed').length;
  const failed = tests.filter(t => t.status === 'failed').length;
  const skipped = tests.filter(t => t.status === 'skipped').length;
  const flaky = tests.filter(t => t.status === 'flaky').length;
  const unknown = tests.filter(
    t => !['passed', 'failed', 'skipped', 'flaky'].includes(t.status)
  ).length;

  const failedTests = tests.filter(t => t.status === 'failed');

const requirementIds = requirements.map(r => r.id).filter(Boolean);

const testedRequirementIds = [
  ...new Set(
    tests
      .map(t => extractRequirementId(t.title))
      .filter(Boolean)
  )
];

const uncoveredRequirementIds = requirementIds.filter(
  id => !testedRequirementIds.includes(id)
);

const coveragePercent =
  requirementIds.length > 0
    ? Math.round((testedRequirementIds.length / requirementIds.length) * 100)
    : 0;

// Extract requirement IDs like R1, R2, etc.
function extractRequirementId(title) {
  const match = title.match(/^(R\d+)/i);
  return match ? match[1].toUpperCase() : null;
}

const failedRequirements = failedTests.map(t => ({
  id: extractRequirementId(t.title),
  title: t.title
})).filter(r => r.id);

  const lines = [];
lines.push('Playwright Test Summary');
lines.push('======================');
lines.push(`Total tests: ${total}`);
lines.push(`Passed: ${passed}`);
lines.push(`Failed: ${failed}`);
lines.push(`Skipped: ${skipped}`);
lines.push(`Flaky: ${flaky}`);
lines.push(`Unknown: ${unknown}`);
lines.push('');

lines.push('Requirement coverage');
lines.push('====================');
lines.push(`Total requirements: ${requirementIds.length}`);
lines.push(`Covered requirements: ${testedRequirementIds.length}`);
lines.push(`Uncovered requirements: ${uncoveredRequirementIds.length}`);
lines.push(`Coverage: ${coveragePercent}%`);
lines.push('');

if (uncoveredRequirementIds.length > 0) {
  lines.push('Uncovered requirements:');
  for (const id of uncoveredRequirementIds) {
    lines.push(`- ${id}`);
  }
  lines.push('');
}

  if (failedRequirements.length > 0) {
  lines.push('Failed requirements:');

  for (const req of failedRequirements) {
    lines.push(`- ${req.id}: ${req.title}`);
  }
} else {
  lines.push('No failed requirements.');
}

  fs.writeFileSync(outputPath, lines.join('\n') + '\n', 'utf8');
  console.log(`Summary written to: ${outputPath}`);
  console.log(lines.join('\n'));
}

function extractRequirementId(title) {
  const match = String(title).match(/^(R\d+)/i);
  return match ? match[1].toUpperCase() : null;
}

main();