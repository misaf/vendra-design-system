// Every design-system component must be used by at least one storefront template (or, for
// building blocks such as Field, by another component), so the templates stay a complete
// reference for the system.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const storefrontComponents = path.join(root, 'design-system/components');
const packageComponents = path.resolve(root, '../../packages/ui/components');
const sourcesIn = folder =>
  fs
    .readdirSync(folder, {recursive: true})
    .filter(file => file.endsWith('.jsx') && !file.endsWith('.fixture.jsx'))
    .map(file => path.join(folder, file));
const sources = [storefrontComponents, packageComponents].flatMap(sourcesIn);
const components = sources.map(file => path.basename(file, '.jsx'));
assert.equal(components.length, new Set(components).size, 'duplicate component implementation');
const used = new Set();
const buildingBlocks = new Set();
for (const file of sources) {
  const code = fs.readFileSync(file, 'utf8');
  for (const match of code.matchAll(/from '(?:\.\.?\/)+(?:[A-Za-z]+\/)*([A-Za-z]+)\.jsx'/g))
    buildingBlocks.add(match[1]);
  for (const match of code.matchAll(/from '@vendra\/ui\/([A-Z][A-Za-z]+)'/g))
    buildingBlocks.add(match[1]);
}
for (const folder of ['shell', 'shared', 'features']) {
  for (const name of fs
    .readdirSync(path.join(root, folder), {recursive: true})
    .filter(name => name.endsWith('.jsx'))) {
    const code = fs.readFileSync(path.join(root, folder, name), 'utf8');
    for (const match of code.matchAll(/<DS\.([A-Za-z]+)/g)) used.add(match[1]);
    // App organisms consume named exports through the same source facade as Shell.
    for (const match of code.matchAll(/import\s*\{([^}]+)\}\s*from ['"](?:\.\.?\/)+ds\.js['"]/g)) {
      for (const imported of match[1].split(',')) {
        const [name, localName = name] = imported.trim().split(/\s+as\s+/);
        if (new RegExp('<' + localName + '\\b').test(code)) used.add(name);
      }
    }
    for (const match of code.matchAll(
      /from '(?:\.\.\/)+design-system\/components\/(?:[A-Za-z]+\/)+([A-Za-z]+)\.jsx'/g
    )) {
      if (new RegExp('<' + match[1] + '\\b').test(code)) used.add(match[1]);
    }
  }
}
assert.ok(components.length > 40, 'found the component sources');
assert.deepEqual(
  components.filter(name => !used.has(name) && !buildingBlocks.has(name)).sort(),
  [],
  'components no storefront template uses'
);
// The storefront e2e suite owns the fixture and spec for each control, including package controls.
const fixtureBases = new Map(
  fs
    .readdirSync(storefrontComponents, {recursive: true})
    .filter(file => file.endsWith('.fixture.jsx'))
    .map(file => [
      path.basename(file, '.fixture.jsx'),
      path.join(storefrontComponents, file.slice(0, -'.fixture.jsx'.length))
    ])
);
const folders = sources
  .filter(file => path.basename(file, '.jsx') === path.basename(path.dirname(file)))
  .map(file => path.basename(file, '.jsx'));
const untested = folders.filter(name => {
  const base = fixtureBases.get(name);
  if (!base || !fs.existsSync(base + '.spec.mjs')) return true;
  return !fs.readFileSync(base + '.spec.mjs', 'utf8').includes("'" + name + "'");
});
assert.deepEqual(untested, [], 'component folders without a spec that opens their fixture');
console.log(
  'Passed: all ' +
    components.length +
    ' design-system components are used by a storefront template or another component, and all ' +
    folders.length +
    ' component folders have their own spec.'
);
