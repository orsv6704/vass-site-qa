const { spawnSync } = require('child_process');

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

  return 'erbjudanden';
}

const feature = getFeatureArg();

function runStep(command, commandArgs) {
  console.log('');
  console.log(`> ${command} ${commandArgs.join(' ')}`);

  const result = spawnSync(command, commandArgs, {
    stdio: 'inherit',
    shell: true
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

console.log(`Running full agent pipeline for feature: ${feature}`);

runStep('npm', ['run', 'fetch:page', '--', '--feature', feature]);
runStep('npm', ['run', 'run:agent:openai', '--', '--feature', feature]);
runStep('npm', ['run', 'apply:agent', '--', '--feature', feature]);
runStep('npm', ['run', 'generate:tests', '--', '--feature', feature]);
runStep('npx', ['playwright', 'test', `tests/generated.${feature}.spec.ts`]);
runStep('npm', ['run', 'summary:tests', '--', '--feature', feature]);

console.log('');
console.log(`Pipeline completed for feature: ${feature}`);