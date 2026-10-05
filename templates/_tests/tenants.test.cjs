// Run with: node templates/_tests/tenants.test.cjs
// The tenant theme generator: shade accuracy, validation and the generated files.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const theme = require('../_shared/tenant-theme.js');
const {tenantSpecs, tenantOutputs} = require('../_build/tenants.cjs');
const root = path.resolve(__dirname, '../..');

// OKLab distance; 0.02 is about the smallest difference people notice.
function distance(a, b) {
  const lab = hex => { const [L, C, H] = theme.oklch(hex); return [L, C * Math.cos(H * Math.PI / 180), C * Math.sin(H * Math.PI / 180)]; };
  const x = lab(a), y = lab(b);
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
}

// 1. The Vendra spec reproduces the hand-tuned default palette in tokens/colors.css.
const colors = fs.readFileSync(path.join(root, 'tokens/colors.css'), 'utf8');
const vendra = theme.tokens(theme.VENDRA).ramps;
for (const name of Object.keys(vendra).filter(n => !n.startsWith('--stem-'))) {
  const declared = colors.match(new RegExp(name + ':(#[0-9A-F]{6})', 'i'))[1];
  assert.ok(distance(vendra[name], declared) < .02, `${name}: generated ${vendra[name]} is ${distance(vendra[name], declared).toFixed(3)} from ${declared}`);
}

// 2. Generation is deterministic, keeps the base colours and applies overrides.
const clay = JSON.parse(fs.readFileSync(path.join(root, 'tokens/tenants/clay.json'), 'utf8'));
assert.equal(theme.css('clay', clay), theme.css('clay', clay));
const ramps = theme.tokens(clay).ramps;
assert.equal(ramps['--peony-500'], clay.colours.accent);
assert.equal(ramps['--petal-200'], clay.colours.neutral);
assert.equal(ramps['--ink-900'], clay.colours.ink);
assert.equal(ramps['--stem-900'], clay.colours.footer);
assert.equal(theme.tokens({...clay, overrides: {'--border-input': '#847E70'}}).ramps['--border-input'], '#847E70');

// 3. Shades keep the base colour's hue and much of its saturation. Mixing with
// white or black (the old builder) left Clay's petal-50 at 18% of the sand's
// saturation and turned ink-300 grey.
for (const [name, base] of [['--petal-50', '--petal-200'], ['--ink-300', '--ink-900'], ['--stem-700', '--stem-900']]) {
  const [, c, h] = theme.oklch(ramps[name]), [, baseC, baseH] = theme.oklch(ramps[base]);
  assert.ok(Math.abs(h - baseH) < 6, `${name} keeps the hue of ${base}`);
  assert.ok(c >= Math.min(baseC * .4, .02), `${name} keeps at least 40% of ${base}'s saturation`);
}

// 4. Validation rejects typos and unknown choices.
const broken = (patch, pattern) => assert.throws(() => theme.validate({...clay, ...patch}, 'test'), pattern);
broken({colours: {...clay.colours, accent: 'A9532E'}}, /colours\.accent/);
broken({character: {...clay.character, controls: 'round'}}, /character\.controls/);
broken({overrides: {'--surface-page': '#FFFFFF'}}, /only set generated shades/);
broken({overrides: {'--ink-500': 'grey'}}, /overrides\.--ink-500/);

// 5. Every tenant passes the seven checks, and its CSS and the runtime list are current.
for (const [slug, spec] of Object.entries(tenantSpecs())) {
  assert.deepEqual(theme.checks(spec).filter(c => !c.pass), [], slug + ' passes all seven checks');
}
for (const [file, content] of tenantOutputs()) {
  assert.equal(fs.readFileSync(file, 'utf8'), content, path.relative(root, file) + ' is current (run the build)');
}

// 6. Emails carry each tenant's palette, generated from the same spec.
const vm = require('node:vm');
const context = {window: {}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../communications/email-templates.js'), 'utf8'), context);
const emailThemes = context.window.AG_EMAIL.themes;
for (const [slug, spec] of Object.entries(tenantSpecs())) {
  assert.deepEqual({...emailThemes[slug]}, theme.email(spec), slug + ' email palette matches its spec');
}
const {disp, ...shape} = theme.email(theme.VENDRA);
for (const key of ['btnRadius', 'btnCase', 'btnTrack', 'cardRadius', 'dispCase']) assert.equal(emailThemes.default[key], shape[key], 'default email ' + key);
assert.equal(emailThemes.default.disp, disp);

console.log('Passed: tenant theme generator and email palettes');
