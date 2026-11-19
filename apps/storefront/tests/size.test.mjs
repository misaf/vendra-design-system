// Keep component sources within their bundle budgets, including the cost of importing one export.
// React, React Aria and @internationalized/date are shared with the rest of the storefront.
import assert from 'node:assert/strict';
import path from 'node:path';
import zlib from 'node:zlib';
import {rolldown} from 'rolldown';
import {loadDesignSystem} from './load-design-system.mjs';

const PEERS = [
  /^react($|\/)/,
  /^react-dom($|\/)/,
  'react-aria-components',
  /^@internationalized\//
];
// Budgets in gzipped bytes. Raise one only on purpose, saying why in the commit.
const BUDGET = {
  // The full component and helper set. 40 KB since ErrorSummary, PromoCodeField, ErrorBoundary and OfflineNotice
  // (37.2 KB then); each component's own wording (messages.js) had just taken ~2.4 KB off every
  // export with built-in words.
  // 41 KB since commerce's opening-hours rules (openingStatus, hoursSummary, hoursExceptions; 39.9 KB
  // before).
  // 42 KB since analytics reports amounts in an ISO currency (inCurrency, reportCurrency; 41.2 KB).
  // 43 KB since PromoCodeField's collapsible "Have a promo code?" disclosure (42.2 KB).
  // Attribute forwarding across the component library adds prop routing to the 43.2 KB bundle.
  everything: 43.5 * 1024,
  // Any one export. Components that draw an Icon carry the icon set (ICON_SVGS, ~6 KB).
  oneExport: 15 * 1024,
  // Exports with no icon and no React Aria-heavy helpers: only themselves.
  small: 1024
};
const SMALL = ['Badge', 'Card', 'Chip', 'Skeleton', 'Switch', 'VendraProvider', 'MenuList'];

const dir = path.resolve(import.meta.dirname, '../design-system');
const entry = path.resolve(import.meta.dirname, 'fixtures/design-system.js');
const gzipped = async source => {
  const input = '\0design-system-budget';
  const bundle = await rolldown({
    input,
    plugins: [
      {
        name: 'design-system-budget',
        resolveId(id) {
          if (id === input) return id;
        },
        load(id) {
          if (id === input) return source;
        }
      }
    ],
    external: PEERS,
    logLevel: 'silent',
    // Measure retained component code. Next.js route budgets are checked in Playwright.
    treeshake: {moduleSideEffects: false}
  });
  let output;
  try {
    ({output} = await bundle.generate({format: 'es', minify: true}));
  } finally {
    await bundle.close();
  }
  const chunks = output.filter(file => file.type === 'chunk');
  // Keep shared dependencies outside the component size measurement.
  for (const id of chunks.flatMap(chunk => chunk.moduleIds))
    assert.ok(
      id === input ||
        id === entry ||
        id === path.resolve(dir, '../shell/ds.js') ||
        id.startsWith(dir + path.sep),
      id + ' got bundled'
    );
  return {
    bytes: zlib.gzipSync(chunks.map(chunk => chunk.code).join('')).length,
    modules: chunks.flatMap(chunk => chunk.moduleIds).filter(id => id !== input)
  };
};

const ds = await loadDesignSystem();
const exports = Object.keys(ds); // Include lowercase helper namespaces too.
const sizes = {};
for (const name of exports)
  sizes[name] = (
    await gzipped(`import {${name}} from ${JSON.stringify(entry)};\nexport default ${name};\n`)
  ).bytes;
const everything = (await gzipped(`export * from ${JSON.stringify(entry)};\n`)).bytes;
const unused = await gzipped(`import ${JSON.stringify(entry)}; export const sentinel = 1;`);
assert.deepEqual(unused.modules, [], 'unused import retains component modules');
const kb = bytes => (bytes / 1024).toFixed(1) + ' KB';
const table = Object.entries(sizes)
  .sort((a, b) => b[1] - a[1])
  .map(([name, bytes]) => '  ' + name.padEnd(18) + kb(bytes).padStart(9))
  .join('\n');
try {
  assert.ok(everything <= BUDGET.everything, 'everything: ' + kb(everything));
  for (const [name, bytes] of Object.entries(sizes))
    assert.ok(bytes <= BUDGET.oneExport, name + ': ' + kb(bytes));
  for (const name of SMALL)
    assert.ok(sizes[name] <= BUDGET.small, name + ' should bundle alone: ' + kb(sizes[name]));
} catch (error) {
  console.error('Gzipped size per export (budget ' + kb(BUDGET.oneExport) + '):\n' + table);
  throw error;
}
console.log(
  'Passed: the design system is ' +
    kb(everything) +
    ' gzipped (budget ' +
    kb(BUDGET.everything) +
    '); the largest export is ' +
    Object.entries(sizes)
      .sort((a, b) => b[1] - a[1])[0]
      .join(' at ')
      .replace(/\d+$/, n => kb(+n)) +
    ', across ' +
    exports.length +
    ' source exports; small components bundle alone and unused imports drop out.'
);
