import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {routeFolders} from './page-script.mjs';
import storefrontComponentsWithoutSpecs from './storefront-components-without-specs.json' with {type: 'json'};

const repo = path.resolve(import.meta.dirname, '..');

// Preserve browser fixture coverage as route components move next to their routes.
const uiRoots = [
  ...Object.values(routeFolders).map(folder => path.join(repo, folder, 'components')),
  path.join(repo, 'components/storefront')
];
const grandfathered = new Set(storefrontComponentsWithoutSpecs);
for (const folder of uiRoots) {
  if (!fs.existsSync(folder)) continue;
  for (const name of fs.readdirSync(folder)) {
    const base = path.join(folder, name, name);
    const spec = fs.existsSync(base + '.spec.mjs');
    const fixture = fs.existsSync(base + '.fixture.jsx');
    assert.equal(spec, fixture, name + ': a spec needs its fixture and vice versa');
    if (spec) assert.ok(!grandfathered.has(name), name + ' has a spec now');
    else if (grandfathered.has(name))
      assert.ok(grandfathered.delete(name), name + ' needs a browser fixture and spec');
  }
}
assert.deepEqual(
  [...grandfathered],
  [],
  'storefront-components-without-specs.json lists missing components'
);

// Run the scaffolder in a disposable checkout.
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-components-'));
try {
  for (const file of [
    '.prettierrc.json',
    'tools/new-component.mjs',
    'tools/paths.mjs',
    'src/design-system/index.js',
    'src/design-system/components/index.css',
    'src/design-system/components/Button/Button.jsx',
    'src/design-system/utils/messages.d.ts'
  ]) {
    const target = path.join(temporary, file);
    fs.mkdirSync(path.dirname(target), {recursive: true});
    fs.copyFileSync(path.join(repo, file), target);
  }
  fs.symlinkSync(path.join(repo, 'node_modules'), path.join(temporary, 'node_modules'), 'dir');
  const generate = (...args) =>
    spawnSync(process.execPath, [path.join(temporary, 'tools/new-component.mjs'), ...args], {
      encoding: 'utf8'
    });
  assert.notEqual(generate().status, 0, 'a component name is required');
  assert.notEqual(generate('Sample', '--level', 'atoms').status, 0, 'obsolete flags are rejected');
  const result = generate('Sample', '--wording');
  assert.equal(result.status, 0, result.stderr);
  const base = path.join(temporary, 'src/design-system/components/Sample/Sample');
  for (const suffix of ['.jsx', '.d.ts', '.css', '.spec.mjs', '.fixture.jsx'])
    assert.ok(fs.existsSync(base + suffix), `Sample${suffix} generated`);
  const read = file => fs.readFileSync(path.join(temporary, file), 'utf8');
  assert.ok(fs.existsSync(path.join(path.dirname(base), 'README.md')));
  assert.match(fs.readFileSync(base + '.jsx', 'utf8'), /from '..\/..\/utils\/messages\.js'/);
  assert.ok(
    fs.readFileSync(base + '.spec.mjs', 'utf8').includes("from '../../../e2e/component-test.mjs'")
  );
  assert.ok(read('src/design-system/index.js').includes('./components/Sample/Sample.jsx'));
  assert.ok(read('src/design-system/components/index.css').includes('Sample/Sample.css'));
  assert.ok(read('src/design-system/utils/messages.d.ts').includes('Sample: {label: string}'));
  assert.notEqual(generate('Sample').status, 0, 'duplicate scaffold is rejected');
  assert.notEqual(generate('Button').status, 0, 'existing components are protected');
  const noCss = generate('Unstyled', '--no-css');
  assert.equal(noCss.status, 0, noCss.stderr);
  assert.ok(
    !fs.existsSync(path.join(temporary, 'src/design-system/components/Unstyled/Unstyled.css'))
  );
  assert.ok(!read('src/design-system/components/index.css').includes('Unstyled'));
} finally {
  fs.rmSync(temporary, {recursive: true, force: true});
}
console.log('Passed: component scaffolding and storefront fixture coverage.');
