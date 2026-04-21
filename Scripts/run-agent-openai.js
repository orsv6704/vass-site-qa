const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

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
// ✅ Feature config
//
const featureConfig = {
  erbjudanden: {
    featureName: 'Erbjudanden',
    url: 'https://www.vasscompany.se/erbjudanden/'
  },
  kontakt: {
    featureName: 'Kontakt',
    url: 'https://www.vasscompany.se/kontakt/'
  }
};

const selected = featureConfig[feature];

if (!selected) {
  throw new Error(`Unknown feature: ${feature}`);
}

const featureName = selected.featureName;
const url = selected.url;

//
// ✅ Files
//
const pageContentFile = path.join(
  __dirname,
  '..',
  'docs',
  'agent',
  `page-content.${feature}.txt`
);

const outputFile = path.join(
  __dirname,
  '..',
  'docs',
  'agent',
  `last-agent-output.${feature}.txt`
);

const promptFile = path.join(
  __dirname,
  '..',
  'docs',
  'agent',
  `last-run-prompt.${feature}.txt`
);

//
// ✅ Read page content
//
const pageContent = fs.existsSync(pageContentFile)
  ? fs.readFileSync(pageContentFile, 'utf8')
  : '';

//
// ✅ OpenAI client
//
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

//
// ✅ Prompt
//