// Each storefront page folder owns its sources and shares the runtime.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
for (const folder of fs.readdirSync(root).filter(name => name.startsWith('storefront-'))) {
  const files = fs.readdirSync(path.join(root, folder));
  for (const name of ['tailwind.css', 'custom.css'])
    assert.ok(!files.includes(name), folder + ' duplicates ' + name);
  if (folder !== 'storefront-site') {
    assert.ok(files.includes('copy.js'), folder + ' must own its copy source');
    assert.ok(files.includes('styles.css'), folder + ' must own its custom CSS source');
  }
  assert.ok(files.includes('logic.js'), folder + ' must own its behavior source');
  for (const name of ['Page.jsx', 'View.jsx'])
    assert.ok(files.includes(name), folder + ' must have its ' + name);
  const view = fs.readFileSync(path.join(root, folder, 'View.jsx'), 'utf8');
  assert.ok(!/\bstyle=\{/.test(view), folder + ' must keep custom styles in CSS classes');
}
console.log('Passed page folders: sources, views and no duplicated runtime CSS.');

const tailwind = fs.readFileSync(path.join(root, '_runtime/tailwind.css'), 'utf8');
assert.ok(!tailwind.includes('.vf-'), 'Custom selectors must stay out of the Tailwind output');
const custom = fs.readFileSync(path.join(root, '_runtime/custom.css'), 'utf8');
assert.ok(
  tailwind.includes('.tw\\:hover\\:bg-sunken'),
  'Tailwind must compile the migrated hover state'
);
assert.ok(
  custom.includes('.vf-product-add .ag-btn'),
  'Component internals remain explicit custom exceptions'
);
assert.ok(!/@(?:apply|theme|source|import)\b/.test(custom));
