const fs = require('fs');
const path = require('path');
const https = require('https');

//
// ✅ Robust feature parsing (NEW)
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
    url: 'https://www.vasscompany.se/erbjudanden/'
  },
  kontakt: {
    url: 'https://www.vasscompany.se/kontakt/'
  }
};

const selected = featureConfig[feature];

if (!selected) {
  throw new Error(`Unknown feature: ${feature}`);
}

const url = selected.url;

//
// ✅ Output file
//
const outputPath = path.join(
  __dirname,
  '..',
  'docs',
  'agent',
  `page-content.${feature}.txt`
);

//
// ✅ Simple HTML → text extractor
//
function extractText(html) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

//
// ✅ Fetch page
//
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let data = '';

        res.on('data', chunk => {
          data += chunk;
        });

        res.on('end', () => resolve(data));
      })
      .on('error', reject);
  });
}

//
// ✅ Main
//
async function main() {
  console.log(`Feature: ${feature}`);
  console.log(`Fetching: ${url}`);

  const html = await fetchPage(url);
  const text = extractText(html);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, text, 'utf8');

  console.log(`Page content saved to:`);
  console.log(outputPath);
}

main().catch(err => {
  console.error('fetch-page-text failed:');
  console.error(err);
  process.exit(1);
});