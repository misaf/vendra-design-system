// Shared URLs must resolve from the loader, regardless of the page depth.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const elements = [];
const document = {
  currentScript: {src: 'https://example.test/design/templates/_runtime/ds-base.js'},
  createElement: tag => ({tag, setAttribute(name) { this[name] = true; }}),
  head: {appendChild: element => elements.push(element)},
  querySelectorAll: () => elements.filter(element => element.tag === 'link'),
  querySelector: () => elements.find(element => element['data-vf-bundle'])
};
const context = vm.createContext({window: {}, document, URL, console});
const loader = fs.readFileSync(path.join(root, '_runtime/ds-base.js'), 'utf8');
vm.runInContext(loader, context);
vm.runInContext(loader, context);
assert.equal(context.window.VF_ASSET_BASE, 'https://example.test/design/');
assert.deepEqual(elements.filter(e => e.tag === 'link').map(e => e.href), [
  'https://example.test/design/styles.css',
  'https://example.test/design/templates/_runtime/tailwind.css'
]);
assert.equal(elements.filter(e => e.tag === 'script').length, 1);
assert.equal(elements.find(e => e.tag === 'script').src, 'https://example.test/design/_ds_bundle.js');
for (const folder of fs.readdirSync(root).filter(name => name.startsWith('storefront-'))) {
  const files = fs.readdirSync(path.join(root, folder));
  for (const name of ['support.js', 'ds-base.js', 'tailwind.css']) assert.ok(!files.includes(name), folder + ' duplicates ' + name);
  const html = fs.readFileSync(path.join(root, folder, files.find(name => name.endsWith('.dc.html'))), 'utf8');
  assert.ok(html.includes('src="../_runtime/support.js"'), folder + ' must use the shared runtime');
  assert.ok(html.includes('src="../_runtime/ds-base.js"'), folder + ' must use the shared loader');
}
console.log('Passed shared asset references, relocated-root URLs and repeated-loader deduplication.');
