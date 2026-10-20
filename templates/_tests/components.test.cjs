// Every design-system component must be used by at least one storefront template (or, for
// building blocks such as Field, by another component), so the templates stay a complete
// reference for the system.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const components = [];
const walk = dir =>
  fs.readdirSync(dir, {withFileTypes: true}).forEach(entry => {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.jsx') && !entry.name.endsWith('.fixture.jsx'))
      components.push(entry.name.slice(0, -4));
  });
walk(path.join(root, '..', 'components'));
const used = new Set();
const buildingBlocks = new Set();
const sources = fs
  .readdirSync(path.join(root, '..', 'components'), {recursive: true})
  .filter(name => name.endsWith('.jsx') && !name.endsWith('.fixture.jsx'));
for (const file of sources) {
  const code = fs.readFileSync(path.join(root, '..', 'components', file), 'utf8');
  for (const match of code.matchAll(/from '(?:\.\.?\/)+(?:[A-Za-z]+\/)*([A-Za-z]+)\.jsx'/g))
    buildingBlocks.add(match[1]);
}
for (const folder of fs
  .readdirSync(root)
  .filter(name => name.startsWith('storefront-') || name === 'app' || name === '_shared')) {
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
      /from '\.\.\/\.\.\/components\/(?:[A-Za-z]+\/)+([A-Za-z]+)\.jsx'/g
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
// Every component folder carries its own browser test: <Name>.spec.mjs opening <Name>.fixture.jsx
// (run by the e2e suite's components project).
const folders = sources
  .filter(file => path.basename(file, '.jsx') === path.basename(path.dirname(file)))
  .map(file => path.dirname(file));
const untested = folders.filter(folder => {
  const name = path.basename(folder);
  const base = path.join(root, '..', 'components', folder, name);
  if (!fs.existsSync(base + '.spec.mjs') || !fs.existsSync(base + '.fixture.jsx')) return true;
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
