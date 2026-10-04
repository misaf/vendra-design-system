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
  'https://example.test/design/templates/_runtime/tailwind.css',
  'https://example.test/design/templates/_runtime/custom.css'
]);
assert.equal(elements.filter(e => e.tag === 'script').length, 1);
assert.equal(elements.find(e => e.tag === 'script').src, 'https://example.test/design/_ds_bundle.js');
for (const folder of fs.readdirSync(root).filter(name => name.startsWith('storefront-'))) {
  const files = fs.readdirSync(path.join(root, folder));
  for (const name of ['support.js', 'ds-base.js', 'tailwind.css', 'custom.css']) assert.ok(!files.includes(name), folder + ' duplicates ' + name);
  if (folder !== 'storefront-site') {
    assert.ok(files.includes('copy.js'), folder + ' must own its copy source');
    assert.ok(files.includes('styles.css'), folder + ' must own its custom CSS source');
  }
  const html = fs.readFileSync(path.join(root, folder, files.find(name => name.endsWith('.dc.html'))), 'utf8');
  assert.ok(files.includes('logic.js'), folder + ' must own its behavior source');
  assert.ok(html.includes('// Source: templates/' + folder + '/logic.js'), folder + ' must generate its adjacent logic source');
  if (folder !== 'storefront-site') assert.ok(html.includes('// Source: templates/' + folder + '/copy.js'), folder + ' must generate its adjacent copy source');
  assert.ok(!/\bstyle(?:-hover)?=|<style[\s>]/.test(html.split('<x-dc>')[1].split('</x-dc>')[0]), folder + ' must keep custom styles in CSS classes');
  assert.ok(html.includes('src="../_runtime/support.js"'), folder + ' must use the shared runtime');
  assert.ok(html.includes('src="../_runtime/ds-base.js"'), folder + ' must use the shared loader');
}
console.log('Passed shared asset references, relocated-root URLs and repeated-loader deduplication.');

const tailwind = fs.readFileSync(path.join(root, '_runtime/tailwind.css'), 'utf8');
assert.ok(!tailwind.includes('.vf-'), 'Custom selectors must stay out of the Tailwind output');
const custom = fs.readFileSync(path.join(root, '_runtime/custom.css'), 'utf8');
assert.ok(tailwind.includes('.tw\\:hover\\:bg-sunken'), 'Tailwind must compile the migrated hover state');
assert.ok(custom.includes('.vf-product-add .ag-btn'), 'Component internals remain explicit custom exceptions');
assert.ok(!/@(?:apply|theme|source|import)\b/.test(custom));
