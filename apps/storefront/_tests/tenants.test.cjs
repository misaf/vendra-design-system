// Run with: node apps/storefront/_tests/tenants.test.cjs
// The tenant theme generator: shade accuracy, validation and the generated files.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const theme = require('../_shared/domain/tenant-theme.js');
const {tenantSpecs, tenantOutputs} = require('../_build/tenants.cjs');
const root = path.resolve(__dirname, '../../..');

// OKLab distance; 0.02 is about the smallest difference people notice.
function distance(a, b) {
  const lab = hex => {
    const [L, C, H] = theme.oklch(hex);
    return [L, C * Math.cos((H * Math.PI) / 180), C * Math.sin((H * Math.PI) / 180)];
  };
  const x = lab(a),
    y = lab(b);
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
}

// 1. The Vendra spec reproduces the hand-tuned default palette in tokens/colors.css.
const colors = fs.readFileSync(path.join(root, 'tokens/colors.css'), 'utf8');
const vendra = theme.tokens(theme.VENDRA).ramps;
for (const name of Object.keys(vendra).filter(n => !n.startsWith('--stem-'))) {
  const declared = colors.match(new RegExp(name + ':(#[0-9A-F]{6})', 'i'))[1];
  assert.ok(
    distance(vendra[name], declared) < 0.02,
    `${name}: generated ${vendra[name]} is ${distance(vendra[name], declared).toFixed(3)} from ${declared}`
  );
}

// 2. Generation is deterministic, keeps the base colours and applies overrides.
const clay = JSON.parse(fs.readFileSync(path.join(root, 'tokens/tenants/clay.json'), 'utf8'));
assert.equal(theme.css('clay', clay), theme.css('clay', clay));
const ramps = theme.tokens(clay).ramps;
assert.equal(ramps['--peony-500'], clay.colours.accent);
assert.equal(ramps['--petal-200'], clay.colours.neutral);
assert.equal(ramps['--ink-900'], clay.colours.ink);
assert.equal(ramps['--stem-900'], clay.colours.footer);
assert.equal(
  theme.tokens({...clay, overrides: {'--border-input': '#847E70'}}).ramps['--border-input'],
  '#847E70'
);

// 3. Shades keep the base colour's hue and much of its saturation. Mixing with
// white or black (the old builder) left Clay's petal-50 at 18% of the sand's
// saturation and turned ink-300 grey.
for (const [name, base] of [
  ['--petal-50', '--petal-200'],
  ['--ink-300', '--ink-900'],
  ['--stem-700', '--stem-900']
]) {
  const [, c, h] = theme.oklch(ramps[name]),
    [, baseC, baseH] = theme.oklch(ramps[base]);
  assert.ok(Math.abs(h - baseH) < 6, `${name} keeps the hue of ${base}`);
  assert.ok(c >= Math.min(baseC * 0.4, 0.02), `${name} keeps at least 40% of ${base}'s saturation`);
}

// 4. Validation rejects typos and unknown choices.
const broken = (patch, pattern) =>
  assert.throws(() => theme.validate({...clay, ...patch}, 'test'), pattern);
broken({colours: {...clay.colours, accent: 'A9532E'}}, /colours\.accent/);
broken({character: {...clay.character, controls: 'round'}}, /character\.controls/);
broken({overrides: {'--surface-page': '#FFFFFF'}}, /only set generated shades/);
broken({overrides: {'--ink-500': 'grey'}}, /overrides\.--ink-500/);

// 5. Every tenant passes the seven checks, and its CSS and the runtime list are current.
for (const [slug, spec] of Object.entries(tenantSpecs())) {
  assert.deepEqual(
    theme.checks(spec).filter(c => !c.pass),
    [],
    slug + ' passes all seven checks'
  );
}
for (const [file, content] of tenantOutputs()) {
  assert.equal(
    fs.readFileSync(file, 'utf8'),
    content,
    path.relative(root, file) + ' is current (run the build)'
  );
}

// 6. Emails carry each tenant's palette, generated from the same spec.
const vm = require('node:vm');
const context = {window: {}};
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, '../communications/email-templates.js'), 'utf8'),
  context
);
const emailThemes = context.window.VF_EMAIL.themes;
for (const [slug, spec] of Object.entries(tenantSpecs())) {
  assert.deepEqual(
    {...emailThemes[slug]},
    theme.email(spec),
    slug + ' email palette matches its spec'
  );
}
const {disp, ...shape} = theme.email(theme.VENDRA);
for (const key of ['btnRadius', 'btnCase', 'btnTrack', 'cardRadius', 'dispCase'])
  assert.equal(emailThemes.default[key], shape[key], 'default email ' + key);
assert.equal(emailThemes.default.disp, disp);

console.log('Passed: tenant theme generator and email palettes');

// Tenant branding fails the build for broken references or unusable image geometry.
const {validateBrand, brandOutputs} = require('../_build/brand.cjs');
assert.throws(
  () => validateBrand({logo: {src: 'assets/no-logo.svg', width: 10, height: 10}}),
  /missing or invalid/
);
assert.throws(() => validateBrand({logo: {...clay.brand.logo, width: 0}}), /positive width/);
assert.throws(() => validateBrand({logoMark: {...clay.brand.logoMark, height: 20}}), /square/);
assert.throws(() => validateBrand({icons: {favicon: clay.brand.icons.favicon}}), /invalid asset/);
assert.throws(
  () => validateBrand({ogImage: {en: '../outside.png', fa: '../outside.png'}}),
  /invalid asset/
);
for (const [file, source] of brandOutputs(tenantSpecs())) {
  const manifest = JSON.parse(source);
  const fa = file.endsWith('manifest-fa.webmanifest');
  assert.equal(manifest.lang, fa ? 'fa' : 'en');
  assert.equal(manifest.dir, fa ? 'rtl' : 'ltr');
  assert.equal(manifest.icons.length, 3);
  const base = new URL('https://example.com/shop/' + path.relative(root, file));
  for (const icon of manifest.icons) {
    const url = new URL(icon.src, base);
    assert.ok(url.pathname.startsWith('/shop/assets/'));
    assert.ok(fs.existsSync(path.join(root, url.pathname.slice('/shop/'.length))));
  }
  assert.ok(new URL(manifest.start_url, base).pathname.startsWith('/shop/apps/storefront/app/'));
  if (file.includes('/clay/')) assert.match(manifest.start_url, /tenant=clay/);
}

// Deployment overrides stay scoped to their tenant, and a live head update replaces old assets.
const links = new Map();
const brandContext = {
  VF_TENANT_BRANDS: {clay: clay.brand, fern: {}},
  VF_STORE: {
    tenant: 'clay',
    brandAssets: {
      ogImage: {en: 'assets/social/og-default-en.png', fa: 'assets/social/og-default-fa.png'}
    }
  },
  // environment.js: the deployment's asset base.
  vfAssetBase: () => 'https://example.com/store/',
  URL,
  document: {
    head: {
      querySelector: selector => links.get(selector),
      append: link => links.set(`link[rel="${link.rel}"]`, link)
    },
    createElement: () => ({
      setAttribute(key, value) {
        this[key] = value;
      }
    })
  }
};
vm.createContext(brandContext);
vm.runInContext(
  fs
    .readFileSync(path.join(root, 'apps/storefront/_shared/domain/brand.js'), 'utf8')
    .replace(/^import .*;\n/gm, '')
    .replace(/^export /gm, ''),
  brandContext
);
assert.equal(
  vm.runInContext("vfBrand('clay').ogImage.en", brandContext),
  'assets/social/og-default-en.png'
);
assert.equal(vm.runInContext("vfBrand('fern').ogImage", brandContext), undefined);
vm.runInContext("vfBrandHead('clay', 'en')", brandContext);
assert.equal(
  links.get('link[rel="icon"]').href,
  'https://example.com/store/assets/tenants/clay/favicon-32.png'
);
vm.runInContext("vfBrandHead('fern', 'fa')", brandContext);
assert.equal(links.size, 3);
assert.equal(
  links.get('link[rel="icon"]').href,
  'https://example.com/store/assets/icons/favicon-32.png'
);
assert.equal(
  links.get('link[rel="manifest"]').href,
  'https://example.com/store/assets/tenants/fern/manifest-fa.webmanifest'
);

// Prerendered builds use origin-relative bases at the root and under a deployment prefix.
for (const base of ['/', '/store/']) {
  brandContext.vfAssetBase = () => base;
  vm.runInContext("vfBrandHead('clay', 'en')", brandContext);
  assert.equal(links.get('link[rel="icon"]').href, base + 'assets/tenants/clay/favicon-32.png');
}
