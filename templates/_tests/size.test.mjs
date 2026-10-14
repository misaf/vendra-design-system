// What dist/ adds to an app's bundle: each export imported on its own, and everything, bundled
// through the package entry the way an app's bundler sees it (React, React Aria and
// @internationalized/date are the app's own peers, so they stay out), minified and gzipped.
// Importing one small component must not pull in the rest: that is what keeps the package's
// "sideEffects" and its module layout honest.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import zlib from 'node:zlib';
import {rolldown} from 'rolldown';

const repo = path.resolve(import.meta.dirname, '../..');
const PEERS = [
  /^react($|\/)/,
  /^react-dom($|\/)/,
  'react-aria-components',
  /^@internationalized\//
];
// Budgets in gzipped bytes. Raise one only on purpose, saying why in the commit.
const BUDGET = {
  // The whole package. 40 KB since ErrorSummary, PromoCodeField, ErrorBoundary and OfflineNotice
  // (37.2 KB then); each component's own wording (messages.js) had just taken ~2.4 KB off every
  // export with built-in words.
  everything: 40 * 1024,
  // Any one export. Components that draw an Icon carry the icon set (ICON_SVGS, ~6 KB).
  oneExport: 15 * 1024,
  // Exports with no icon and no React Aria-heavy helpers: only themselves.
  small: 1024
};
const SMALL = ['Badge', 'Card', 'Chip', 'Skeleton', 'Switch', 'VendraProvider', 'MenuList'];

const ds = await import(path.join(repo, 'dist/index.js'));
const exports = Object.keys(ds).filter(name => /^[A-Z]/.test(name));
const dir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-size-')));
const gzipped = async source => {
  const input = path.join(dir, 'app.js');
  fs.writeFileSync(input, source);
  const bundle = await rolldown({
    input,
    external: PEERS,
    resolve: {alias: {'@vendra/design-system': path.join(repo, 'dist/index.js')}},
    logLevel: 'silent'
  });
  const {output} = await bundle.generate({format: 'es', minify: true});
  await bundle.close();
  const chunks = output.filter(file => file.type === 'chunk');
  // Only the package's own files go in; anything else must be a peer the app provides.
  for (const id of chunks.flatMap(chunk => chunk.moduleIds))
    assert.ok(
      id === input || id.startsWith(path.join(repo, 'dist') + path.sep),
      id + ' got bundled'
    );
  return zlib.gzipSync(chunks.map(chunk => chunk.code).join('')).length;
};

try {
  const sizes = {};
  for (const name of exports)
    sizes[name] = await gzipped(
      `import {${name}} from '@vendra/design-system';\nexport default ${name};\n`
    );
  const everything = await gzipped(`export * from '@vendra/design-system';\n`);
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
    'Passed: the package is ' +
      kb(everything) +
      ' gzipped (budget ' +
      kb(BUDGET.everything) +
      '); the largest export is ' +
      Object.entries(sizes)
        .sort((a, b) => b[1] - a[1])[0]
        .join(' at ')
        .replace(/\d+$/, n => kb(+n)) +
      ', and small components bundle alone.'
  );
} finally {
  fs.rmSync(dir, {recursive: true, force: true});
}
