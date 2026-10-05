// Run with: node templates/_tests/bundle.test.cjs
// The stale-bundle check runs on a temporary fixture repo, never on the real bundle.
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {staleBundleSources} = require('../_build/bundle.cjs');
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'vendra-bundle-'));
const write = (file, text) => { fs.mkdirSync(path.dirname(path.join(temp, file)), {recursive: true}); fs.writeFileSync(path.join(temp, file), text); };
const sum = text => crypto.createHash('sha256').update(text).digest('hex').slice(0, 12);
const bundle = hashes => write('_ds_bundle.js', '/* @ds-bundle: ' + JSON.stringify({format: 4, sourceHashes: hashes}) + ' */\n(() => {})();\n');
try {
  write('components/core/Button.jsx', 'export const Button = 1;');
  write('components/utils/format.js', 'export const f = 1;');
  write('components/core/core.card.html', '<p>cards are not compiled</p>');
  bundle({'components/core/Button.jsx': sum('export const Button = 1;'), 'components/utils/format.js': sum('export const f = 1;')});
  assert.deepEqual(staleBundleSources(temp), [], 'matching hashes are current');

  write('components/core/Button.jsx', 'export const Button = 2;');
  write('components/forms/Slider.jsx', 'export const Slider = 1;');
  fs.rmSync(path.join(temp, 'components/utils/format.js'));
  assert.deepEqual(staleBundleSources(temp), ['components/core/Button.jsx', 'components/forms/Slider.jsx', 'components/utils/format.js'], 'edited, new and removed sources are stale');

  write('_ds_bundle.js', '(() => {})();\n');
  assert.equal(staleBundleSources(temp).length, 1, 'a bundle without a header is stale');
  console.log('Passed stale-bundle detection for edited, added and removed component sources.');
} finally {
  fs.rmSync(temp, {recursive: true, force: true});
}
