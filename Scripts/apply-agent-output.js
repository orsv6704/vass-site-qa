const fs = require('fs');
const path = require('path');

const featureArgIndex = process.argv.indexOf('--feature');
const cliFeature = featureArgIndex !== -1 ? process.argv[featureArgIndex + 1] : null;
const feature = cliFeature || process.env.npm_config_feature || 'erbjudanden';

const inputPath = path.join(__dirname, '..', 'docs', 'agent', `last-agent-output.${feature}.txt`);
const mdPath = path.join(__dirname, '..', 'docs', 'requirements', `${feature}.md`);
const jsonPath = path.join(__dirname, '..', 'docs', 'requirements', `${feature}.json`);

if (!fs.existsSync(inputPath)) {
  throw new Error(`Input file not found: ${inputPath}`);
}

const raw = fs.readFileSync(inputPath, 'utf8');

console.log(`Applying agent output for feature: ${feature}`);
console.log(`Input file: ${inputPath}`);

function extractBlock(text, lang) {
  const startTag = '```' + lang;
  const start = text.indexOf(startTag);
  if (start === -1) return null;

  const contentStart = text.indexOf('\n', start);
  if (contentStart === -1) return null;

  const end = text.indexOf('```', contentStart + 1);
  if (end === -1) return null;

  return text.slice(contentStart + 1, end).trim();
}

const mdBlock = extractBlock(raw, 'md');
if (mdBlock) {
  fs.mkdirSync(path.dirname(mdPath), { recursive: true });
  fs.writeFileSync(mdPath, mdBlock + '\n', 'utf8');
  console.log(`Updated markdown file: ${mdPath}`);
} else {
  console.log('No markdown block found');
}

const jsonBlock = extractBlock(raw, 'json');
if (jsonBlock) {
  fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
  fs.writeFileSync(jsonPath, jsonBlock + '\n', 'utf8');
  console.log(`Updated JSON file: ${jsonPath}`);
} else {
  console.log('No JSON block found');
}