const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'docs', 'agent', 'last-agent-output.txt');
const mdPath = path.join(__dirname, '..', 'docs', 'requirements', 'erbjudanden.md');
const jsonPath = path.join(__dirname, '..', 'docs', 'requirements', 'erbjudanden.json');

if (!fs.existsSync(inputPath)) {
  throw new Error(`Input file not found: ${inputPath}`);
}

const raw = fs.readFileSync(inputPath, 'utf8');

console.log('--- Debug: first 200 chars of input ---');
console.log(raw.slice(0, 200));
console.log('--- End debug ---');

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
  fs.writeFileSync(mdPath, mdBlock + '\n', 'utf8');
  console.log('Updated markdown file');
} else {
  console.log('No markdown block found');
}

const jsonBlock = extractBlock(raw, 'json');
if (jsonBlock) {
  fs.writeFileSync(jsonPath, jsonBlock + '\n', 'utf8');
  console.log('Updated JSON file');
} else {
  console.log('No JSON block found');
}