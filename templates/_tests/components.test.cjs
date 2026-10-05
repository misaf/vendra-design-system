// Every design-system component must be used by at least one storefront template,
// so the templates stay a complete reference for the system.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const components = [];
const walk = dir => fs.readdirSync(dir, {withFileTypes: true}).forEach(entry => {
  const file = path.join(dir, entry.name);
  if (entry.isDirectory()) walk(file);
  else if (entry.name.endsWith('.jsx')) components.push(entry.name.slice(0, -4));
});
walk(path.join(root, '..', 'components'));
const used = new Set();
for (const folder of fs.readdirSync(root).filter(name => name.startsWith('storefront-'))) {
  for (const name of fs.readdirSync(path.join(root, folder)).filter(name => name.endsWith('.dc.html'))) {
    const html = fs.readFileSync(path.join(root, folder, name), 'utf8');
    for (const match of html.matchAll(/component-from-global-scope="VendraDesignSystem_[a-z0-9]+\.([A-Za-z]+)"/g)) used.add(match[1]);
  }
}
assert.ok(components.length > 40, 'found the component sources');
assert.deepEqual(components.filter(name => !used.has(name)).sort(), [], 'components no storefront template uses');
console.log('Passed: all ' + components.length + ' design-system components are used by a storefront template.');
