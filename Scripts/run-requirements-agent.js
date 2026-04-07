const fs = require('fs');
const path = require('path');

// INPUT
const featureName = "Erbjudanden";
const url = "https://www.vasscompany.se/erbjudanden/";

// OUTPUT FILES
const mdPath = path.join(__dirname, '..', 'docs', 'requirements', 'erbjudanden.md');
const jsonPath = path.join(__dirname, '..', 'docs', 'requirements', 'erbjudanden.json');

// PROMPT TEMPLATE
const prompt = `
Feature name: ${featureName}
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

// Save prompt so you can reuse it
const promptFile = path.join(__dirname, '..', 'docs', 'agent', 'last-run-prompt.txt');
fs.writeFileSync(promptFile, prompt, 'utf8');

console.log("=== Requirements Agent Prompt ===");
console.log(prompt);
console.log("\nCopy this into ChatGPT and paste the result into:");
console.log(mdPath);
console.log(jsonPath);