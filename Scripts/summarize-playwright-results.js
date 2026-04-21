const fs = require('fs');
const path = require('path');

//
// ✅ Robust feature parsing
//
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

//
// ✅ Paths
//
const inputPath = path.join(__dirname, '..', 'test-results', 'results.json');
const outputPath = path.join(__dirname, '..', 'test-results', `summary.${feature}.txt`);
const requirementsPath = path.join(__dirname, '..', 'docs', 'requirements', `${feature}.json`);

function collectTestsDeep(node, results = []) {
  if (!node || typeof node !== 'object') return results;

  if (Array.isArray(node.specs)) {
    for (const spec of node.specs) {
      if (Array.isArray(spec.tests)) {
        for (const test of spec.tests) {
          let finalStatus = 'unknown';

          if (Array.isArray(test.results) && test.results.length > 0) {
            const statuses = test.results.map(r => r.status).filter(Boolean);

            if (
              statuses.includes('failed') ||
              statuses.includes('timedOut') ||
              statuses.includes('interrupted')
            ) {
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

function extractRequirementId(title) {
  const text = String(title);

  // Supports:
  // R1: ...
  // kontakt-001: ...
  const match = text.match(/^(R\d+|[a-zåäö0-9_-]+-\d+)/i);
  return match ? match[1] : null;
}

function main() {
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Results file not found: ${inputPath}`);
  }

  if (!fs.existsSync(requirementsPath)) {
    throw new Error(`Requirements file not found: ${requirementsPath}`);
  }

  const raw = fs.readFileSync(inputPath, 'utf8');
  const data = JSON.parse(raw);

  const requirementsRaw = fs.readFileSync(requirementsPath, 'utf8');
  const requirementsData = JSON.parse(requirementsRaw);

  // Supports both:
  // { requirements: [...] }
  // [ ... ]
  const requirements = Array.isArray(requirementsData)
    ? requirementsData
    : (requirementsData.requirements || []);

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

  const coveredRequirementIds = testedRequirementIds.filter(id =>
    requirementIds.includes(id)
  );

  const uncoveredRequirementIds = requirementIds.filter(
    id => !coveredRequirementIds.includes(id)
  );

  const coveragePercent =
    requirementIds.length > 0
      ? Math.round((coveredRequirementIds.length / requirementIds.length) * 100)
      : 0;

  const requirementTitleMap = Object.fromEntries(
    requirements
      .filter(r => r.id && r.title)
      .map(r => [r.id, r.title])
  );

  const failedRequirements = [
    ...new Map(
      failedTests
        .map(t => {
          const id = extractRequirementId(t.title);
          return id
            ? [
                id,
                {
                  id,
                  title: requirementTitleMap[id] || t.title
                }
              ]
            : null;
        })
        .filter(Boolean)
    ).values()
  ];

  const lines = [];
  lines.push(`Playwright Test Summary (${feature})`);
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
  lines.push(`Covered requirements: ${coveredRequirementIds.length}`);
  lines.push(`Uncovered requirements: ${uncoveredRequirementIds.length}`);
  lines.push(`Coverage: ${coveragePercent}%`);
  lines.push('');

  if (uncoveredRequirementIds.length > 0) {
    lines.push('Uncovered requirements:');
    for (const id of uncoveredRequirementIds) {
      const title = requirementTitleMap[id] || 'Unknown requirement';
      lines.push(`- ${id}: ${title}`);
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

main();