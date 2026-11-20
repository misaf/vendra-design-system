// Every design-system component must be used by at least one storefront template (or, for
// building blocks such as Field, by another component), so the templates stay a complete
// reference for the system.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const packageComponents = path.resolve(root, 'ui/components');
const sourcesIn = folder =>
  fs
    .readdirSync(folder, {recursive: true})
    .filter(file => file.endsWith('.jsx') && !file.endsWith('.fixture.jsx'))
    .map(file => path.join(folder, file));
const sources = sourcesIn(packageComponents);
const components = sources.map(file => path.basename(file, '.jsx'));
assert.equal(components.length, new Set(components).size, 'duplicate component implementation');
const used = new Set();
for (const file of [...sources, ...['components/storefront', 'shared', 'app'].flatMap(sourcesIn)]) {
  const code = fs.readFileSync(file, 'utf8');
  for (const match of code.matchAll(/from ['"][^'"]+\/([A-Za-z][A-Za-z0-9]*)\.jsx['"]/g))
    used.add(match[1]);
}
assert.ok(components.length > 40, 'found the component sources');
assert.deepEqual(
  components.filter(name => !used.has(name)).sort(),
  [],
  'components no storefront template uses'
);
// ChoiceTile is exercised in its required ChoiceGroup context.
const fixtureName = {ChoiceTile: 'ChoiceGroup'};
for (const name of components) {
  const folder = path.join(packageComponents, name);
  assert.ok(fs.existsSync(path.join(folder, name + '.jsx')), name + ' needs its own folder');
  const fixture = fixtureName[name] || name;
  const base = path.join(packageComponents, fixture, fixture);
  assert.ok(fs.existsSync(base + '.fixture.jsx'), name + ' needs a fixture');
  assert.ok(
    fs.readFileSync(base + '.spec.mjs', 'utf8').includes("'" + fixture + "'"),
    name + ' needs a spec that opens its fixture'
  );
}
console.log(
  `Passed: all ${components.length} reusable components have their own folder, a caller and browser coverage.`
);
