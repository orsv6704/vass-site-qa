const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'test-results', 'results.json');

const raw = fs.readFileSync(inputPath, 'utf8');
const data = JSON.parse(raw);

function findFirstTest(node) {
  if (!node || typeof node !== 'object') return null;

  if (Array.isArray(node.specs)) {
    for (const spec of node.specs) {
      if (Array.isArray(spec.tests) && spec.tests.length > 0) {
        return spec.tests[0];
      }
    }
  }

  for (const value of Object.values(node)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        const found = findFirstTest(item);
        if (found) return found;
      }
    } else if (value && typeof value === 'object') {
      const found = findFirstTest(value);
      if (found) return found;
    }
  }

  return null;
}

const firstTest = findFirstTest(data);
console.log(JSON.stringify(firstTest, null, 2));