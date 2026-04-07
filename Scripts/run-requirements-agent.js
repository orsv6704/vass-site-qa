const fs = require('fs');
const path = require('path');

// INPUT
const featureName = 'Erbjudanden';
const url = 'https://www.vasscompany.se/erbjudanden/';

// FILE PATHS
const promptFile = path.join(__dirname, '..', 'docs', 'agent', 'last-run-prompt.txt');
const outputFile = path.join(__dirname, '..', 'docs', 'agent', 'last-agent-output.txt');

// PROMPT TEMPLATE
const prompt = `Feature name: ${featureName}
Source URL: ${url}

Please generate updated markdown and JSON for this feature.
Include assertion_hints for every requirement where possible.
Keep the scope:
- desktop only
- Swedish only
- smoke level
- offer categories as separate requirements
- contact and newsletter as presence checks only
`;

// Ensure target folder exists
fs.mkdirSync(path.dirname(promptFile), { recursive: true });

// SAVE PROMPT
fs.writeFileSync(promptFile, prompt, 'utf8');

console.log('=== Requirements Agent Prompt ===');
console.log(prompt);
console.log('Paste the AI response into:');
console.log(outputFile);