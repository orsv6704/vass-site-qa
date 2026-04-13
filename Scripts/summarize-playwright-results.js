const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'test-results', 'results.json');
const outputPath = path.join(__dirname, '..', 'test-results', 'summary.txt');

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

  const lines = [];
  lines.push('Playwright Test Summary');
  lines.push('======================');
  lines.push(`Total: ${total}`);
  lines.push(`Passed: ${passed}`);
  lines.push(`Failed: ${failed}`);
  lines.push(`Skipped: ${skipped}`);
  lines.push(`Flaky: ${flaky}`);
  lines.push(`Unknown: ${unknown}`);
  lines.push('');

  if (failedTests.length > 0) {
    lines.push('Failed tests:');
    for (const test of failedTests) {
      lines.push(`- ${test.title}`);
    }
  } else {
    lines.push('No failed tests.');
  }

  fs.writeFileSync(outputPath, lines.join('\n') + '\n', 'utf8');
  console.log(`Summary written to: ${outputPath}`);
  console.log(lines.join('\n'));
}

main();