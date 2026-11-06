// Exercise the public CLI against Playwright discovery, without starting servers or browsers.
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const runner = fileURLToPath(new URL('../e2e/run.mjs', import.meta.url));
const check = (args, suites, target = '', success = true) => {
  const result = spawnSync(process.execPath, [runner, ...args, '--list', '--reporter=list'], {
    encoding: 'utf8',
    env: {...process.env, E2E_TARGET: target},
    timeout: 60000
  });
  assert.ifError(result.error);
  const output = result.stdout + result.stderr;
  assert.equal(result.status === 0, success, output);
  for (const suite of ['build', 'dev'])
    assert.equal(output.includes(`> test:e2e:${suite}\n`), suites.includes(suite), output);
  return output;
};

let output = check(['--project=components'], ['dev']);
assert.match(output, /\[components\]/);
assert.doesNotMatch(output, /\[(?:mobile|desktop|tv|tablet|touch-phone)\]/);

output = check(['--project', 'tv', 'tablet', 'touch-phone'], ['build']);
for (const project of ['tv', 'tablet', 'touch-phone']) assert.ok(output.includes(`[${project}]`));

output = check(['--project=components', '--project', 'tv'], ['build', 'dev']);
assert.match(output, /\[components\]/);
assert.match(output, /\[tv\]/);
assert.doesNotMatch(output, /\[(?:mobile|desktop|tablet|touch-phone)\]/);

output = check(['--project=*top', '--project=COMP*'], ['build', 'dev']);
assert.match(output, /\[desktop\]/);
assert.match(output, /\[components\]/);
assert.doesNotMatch(output, /\[(?:mobile|tv|tablet|touch-phone)\]/);

output = check(['--project=components', '--project=typo'], [], '', false);
assert.match(output, /typo.*not found/);
check(['--project=no-match*'], [], '', false);
check(['--project'], [], '', false);
check(['--project=components'], ['dev'], 'dev');
check(['--project=tv'], [], 'dev', false);
check([], ['build', 'dev']);

console.log(
  'Passed: combined browser CLI project routing, wildcards, target selection and errors.'
);
