// Run with: node apps/storefront/tests/tenants.test.cjs
// The tenant theme generator: shade accuracy, validation and the generated files.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const theme = require('../shared/domain/tenant-theme.js');
const {tenantSpecs, tenantOutputs} = require('../../../tools/tenants.cjs');
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
const colors = fs.readFileSync(path.join(root, 'packages/design-system/tokens/colors.css'), 'utf8');
const vendra = theme.tokens(theme.VENDRA).ramps;
for (const name of Object.keys(vendra).filter(n => !n.startsWith('--stem-'))) {
  const declared = colors.match(new RegExp(name + ':(#[0-9A-F]{6})', 'i'))[1];
  assert.ok(
    distance(vendra[name], declared) < 0.02,
    `${name}: generated ${vendra[name]} is ${distance(vendra[name], declared).toFixed(3)} from ${declared}`
  );
}

// 2. Generation is deterministic, keeps the base colours and applies overrides.
const clay = JSON.parse(
  fs.readFileSync(path.join(root, 'packages/design-system/tokens/tenants/clay.json'), 'utf8')
);
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

// 4b. The published JSON Schema accepts and rejects exactly what validate() does. A small
// evaluator covers the keywords the schema uses; any other keyword fails the test.
const schema = theme.schema();
const KEYWORDS = new Set([
  '$schema',
  'title',
  'type',
  'required',
  'properties',
  'pattern',
  'enum',
  'propertyNames',
  'additionalProperties',
  'minProperties'
]);
function conforms(rules, value) {
  for (const key of Object.keys(rules)) assert.ok(KEYWORDS.has(key), 'schema keyword ' + key);
  const isObject = !!value && typeof value === 'object' && !Array.isArray(value);
  if (rules.type === 'object' && !isObject) return false;
  if (rules.type === 'string' && typeof value !== 'string') return false;
  if (rules.type === 'boolean' && typeof value !== 'boolean') return false;
  if (rules.enum && !rules.enum.includes(value)) return false;
  if (rules.pattern && !new RegExp(rules.pattern).test(value)) return false;
  if (!isObject) return true;
  if ((rules.required || []).some(key => !(key in value))) return false;
  if (rules.minProperties && Object.keys(value).length < rules.minProperties) return false;
  return Object.entries(value).every(([key, item]) => {
    if (rules.propertyNames && !conforms(rules.propertyNames, key)) return false;
    if (rules.properties && key in rules.properties) return conforms(rules.properties[key], item);
    return rules.additionalProperties ? conforms(rules.additionalProperties, item) : true;
  });
}
const accepts = spec => {
  try {
    theme.validate(spec);
    return true;
  } catch {
    return false;
  }
};
assert.deepEqual(
  JSON.parse(
    fs.readFileSync(path.join(root, 'packages/design-system/dist/theme.schema.json'), 'utf8')
  ),
  schema,
  'dist/theme.schema.json is current (run the build)'
);
assert.deepEqual(
  schema.properties.character.properties,
  Object.fromEntries(Object.entries(theme.CHOICES).map(([key, options]) => [key, {enum: options}])),
  'character enums come from CHOICES'
);
const {colours, character} = clay;
const font = {
  family: 'Yekan Bakh',
  licence: 'Commercial web licence for the tenant domain',
  files: {
    latin: 'assets/tenants/clay/fonts/yekan-latin.woff2',
    arabic: 'assets/tenants/clay/fonts/yekan-arabic.woff2'
  },
  weight: '300 700',
  body: true
};
const specs = {
  'brand font': {...clay, font},
  'brand font, Persian only': {
    ...clay,
    font: {family: 'Dana', licence: 'OFL', files: {arabic: 'assets/dana.woff2'}}
  },
  'brand font without licence': {...clay, font: {...font, licence: undefined}},
  'brand font with blank licence': {...clay, font: {...font, licence: ' '}},
  'brand font without files': {...clay, font: {...font, files: {}}},
  'brand font with unknown script': {...clay, font: {...font, files: {cyrillic: 'assets/a.woff2'}}},
  'brand font as TTF': {...clay, font: {...font, files: {latin: 'assets/a.ttf'}}},
  'brand font outside assets': {...clay, font: {...font, files: {latin: 'assets/../a.woff2'}}},
  'brand font from a URL': {
    ...clay,
    font: {...font, files: {latin: 'https://cdn.example/a.woff2'}}
  },
  'brand font named Jost': {...clay, font: {...font, family: 'jost'}},
  'brand font named like a fallback': {
    ...clay,
    font: {...font, family: 'Vazirmatn Fallback Naskh'}
  },
  'brand font with quotes': {...clay, font: {...font, family: "Dana';}x{"}},
  'brand font with odd weight': {...clay, font: {...font, weight: '350'}},
  'brand font with numeric weight': {...clay, font: {...font, weight: 400}},
  'brand font with string body': {...clay, font: {...font, body: 'yes'}},
  'brand font with unknown field': {...clay, font: {...font, display: 'block'}},
  'brand font list': {...clay, font: [font]},
  vendra: theme.VENDRA,
  ...tenantSpecs(),
  'bad hex': {...clay, colours: {...colours, accent: 'A9532E'}},
  'short hex': {...clay, colours: {...colours, ink: '#123'}},
  'missing colour': {
    ...clay,
    colours: {accent: colours.accent, neutral: colours.neutral, ink: colours.ink}
  },
  'missing colours': {character},
  'unknown choice': {...clay, character: {...character, controls: 'round'}},
  'missing choice': {...clay, character: {...character, frame: undefined}},
  'override of a semantic token': {...clay, overrides: {'--surface-page': '#FFFFFF'}},
  'override that is not hex': {...clay, overrides: {'--ink-500': 'grey'}},
  'overrides list': {...clay, overrides: ['#FFFFFF']},
  'null overrides': {...clay, overrides: null},
  'numeric description': {...clay, description: 4},
  'valid override': {...clay, overrides: {'--peony-600': '#a0304b'}},
  'extra keys': {...clay, brand: {}, notes: 'kept'},
  'array spec': [clay],
  'null spec': null
};
for (const [name, spec] of Object.entries(specs)) {
  // JSON drops undefined members, as a backend would receive the spec.
  const received = JSON.parse(JSON.stringify(spec));
  assert.equal(conforms(schema, received), accepts(received), name + ': schema matches validate()');
}
for (const name of [
  'vendra',
  ...Object.keys(tenantSpecs()),
  'valid override',
  'extra keys',
  'brand font',
  'brand font, Persian only'
])
  assert.ok(accepts(JSON.parse(JSON.stringify(specs[name]))), name + ' is valid');

// 4c. A brand font leads the heading (and optionally body) stack with the preset behind it, gets one
// swap @font-face per script, and preloads only the current language's file.
{
  const branded = {...clay, font};
  const character = theme.tokens(branded).character;
  assert.equal(character['--font-display'], "'Yekan Bakh'," + theme.FONTS.sans);
  assert.equal(character['--font-body'], "'Yekan Bakh'," + theme.FONTS.sans);
  assert.equal(
    theme.tokens({...clay, font: {...font, body: false}}).character['--font-body'],
    undefined
  );
  assert.equal(theme.email(branded).disp, theme.email(clay).disp, 'emails keep the preset');
  const generated = theme.css('clay', branded);
  const faces = generated.match(/@font-face\{[^}]*\}/g);
  assert.equal(faces.length, 2);
  for (const face of faces) {
    assert.match(face, /font-family:'Yekan Bakh';/);
    assert.match(face, /font-display:swap;/);
    assert.match(face, /font-weight:300 700;/);
  }
  assert.match(
    faces[0],
    /url\('\.\.\/\.\.\/\.\.\/\.\.\/assets\/tenants\/clay\/fonts\/yekan-latin\.woff2'\) format\('woff2'\);unicode-range:U\+0000-00FF/
  );
  assert.match(faces[1], /yekan-arabic\.woff2'\) format\('woff2'\);unicode-range:U\+0600-06FF/);
  assert.ok(generated.indexOf('@font-face') < generated.indexOf('[data-tenant="clay"]'));
  assert.equal(theme.css('clay', clay).includes('@font-face'), false, 'no font, no @font-face');
  assert.match(theme.fontFaces({...clay, font: {...font, weight: undefined}}), /font-weight:400;/);
  assert.deepEqual(theme.fontPreloads(branded, 'en'), [
    '/assets/tenants/clay/fonts/yekan-latin.woff2'
  ]);
  assert.deepEqual(theme.fontPreloads(branded, 'fa', '/shop/'), [
    '/shop/assets/tenants/clay/fonts/yekan-arabic.woff2'
  ]);
  assert.deepEqual(
    theme.fontPreloads({...clay, font: {...font, files: {arabic: font.files.arabic}}}, 'en'),
    []
  );
  assert.deepEqual(theme.fontPreloads(clay, 'fa'), []);
  // Stored themes: urls start at assetBase, which must be a plain path or https origin.
  assert.match(
    theme.tenantCss('clay', branded),
    /url\('\/assets\/tenants\/clay\/fonts\/yekan-latin\.woff2'\)/
  );
  assert.match(
    theme.tenantCss('clay', branded, {assetBase: 'https://cdn.example.com/clay/'}),
    /url\('https:\/\/cdn\.example\.com\/clay\/assets\/tenants\/clay\/fonts\/yekan-arabic\.woff2'\)/
  );
  for (const assetBase of ["/');}*{x", 'http://cdn.example.com/', 'cdn/', 'javascript:'])
    assert.throws(() => theme.tenantCss('clay', branded, {assetBase}), /assetBase/);
  assert.throws(
    () => theme.tenantCss('clay', {...clay, font: {...font, family: "a'b"}}),
    /font\.family/
  );

  // The build refuses missing files and files that are not WOFF2.
  const {validateFontFiles} = require('../../../tools/tenants.cjs');
  assert.throws(
    () =>
      validateFontFiles(
        {...font, files: {latin: 'assets/tenants/clay/fonts/none.woff2'}},
        'clay.font'
      ),
    /clay\.font\.files\.latin: no file/
  );
  const fontsFolder = fs.mkdtempSync(path.join(root, 'assets/.font-test-'));
  try {
    const relative = path.relative(root, fontsFolder);
    fs.writeFileSync(path.join(fontsFolder, 'real.woff2'), Buffer.from('wOF2\0\1\0\0'));
    fs.writeFileSync(path.join(fontsFolder, 'fake.woff2'), 'wOFFxxxx');
    validateFontFiles({...font, files: {latin: relative + '/real.woff2'}}, 'clay.font');
    assert.throws(
      () => validateFontFiles({...font, files: {arabic: relative + '/fake.woff2'}}, 'clay.font'),
      /is not a WOFF2 file/
    );
  } finally {
    fs.rmSync(fontsFolder, {recursive: true, force: true});
  }
}

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
const {validateBrand, brandOutputs} = require('../../../tools/brand.cjs');
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
assert.throws(
  () => validateBrand({icons: {...clay.brand.icons, favicon16: clay.brand.icons.favicon}}),
  /favicon16 must be a 16px/
);
assert.throws(() => validateBrand({icons: {...clay.brand.icons, tab: 'x'}}), /unknown field/);
assert.throws(
  () => validateBrand({shortName: {en: 'Clay Florist Studio', fa: 'کلی'}}),
  /shortName.en/
);
assert.doesNotThrow(() =>
  validateBrand({icons: {...clay.brand.icons, favicon16: 'assets/icons/favicon-16.png'}})
);
const manifests = brandOutputs(tenantSpecs());
for (const [file, source] of manifests) {
  const manifest = JSON.parse(source);
  const fa = file.endsWith('manifest-fa.webmanifest');
  assert.equal(manifest.lang, fa ? 'fa' : 'en');
  assert.equal(manifest.dir, fa ? 'rtl' : 'ltr');
  assert.equal(manifest.display, 'standalone');
  assert.ok(manifest.name && manifest.short_name, file + ' names');
  assert.match(manifest.theme_color, /^#[0-9A-F]{6}$/i, file + ' theme_color');
  assert.equal(manifest.background_color, manifest.theme_color, file + ' background_color');
  assert.equal(manifest.icons.length, 3);
  assert.ok(manifest.icons.some(icon => icon.purpose === 'maskable'));
  const base = new URL('https://example.com/shop/' + path.relative(root, file));
  for (const icon of manifest.icons) {
    const url = new URL(icon.src, base);
    assert.ok(url.pathname.startsWith('/shop/assets/'));
    assert.ok(fs.existsSync(path.join(root, url.pathname.slice('/shop/'.length))));
  }
  assert.ok(new URL(manifest.start_url, base).pathname.startsWith('/shop/apps/storefront/app/'));
  if (file.includes('/clay/')) {
    assert.match(manifest.start_url, /tenant=clay/);
    assert.equal(manifest.short_name, fa ? 'کلی' : 'Clay');
    // The tenant's own page colour, not Vendra's.
    assert.equal(manifest.theme_color, theme.email(clay).bg);
  }
}

// Deployment overrides stay scoped to their tenant, and a live head update replaces old assets.
const links = new Map();
const linkKey = link =>
  `link[rel="${link.rel}"]` + (link.rel === 'icon' ? `[sizes="${link.sizes}"]` : '');
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
      append: link => links.set(linkKey(link), link)
    },
    createElement: () => ({
      setAttribute(key, value) {
        this[key] = value;
      },
      remove() {
        links.delete(linkKey(this));
      }
    })
  }
};
vm.createContext(brandContext);
vm.runInContext(
  fs
    .readFileSync(path.join(root, 'apps/storefront/shared/domain/brand.js'), 'utf8')
    .replace(/^import .*;\n/gm, '')
    .replace(/^export /gm, ''),
  brandContext
);
const icon = size => links.get(`link[rel="icon"][sizes="${size}"]`);
assert.equal(
  vm.runInContext("vfBrand('clay').ogImage.en", brandContext),
  'assets/social/og-default-en.png'
);
assert.equal(vm.runInContext("vfBrand('fern').ogImage", brandContext), undefined);
vm.runInContext("vfBrandHead('fern', 'fa')", brandContext);
assert.equal(links.size, 4);
assert.equal(icon('16x16').href, 'https://example.com/store/assets/icons/favicon-16.png');
assert.equal(icon('32x32').href, 'https://example.com/store/assets/icons/favicon-32.png');
assert.equal(
  links.get('link[rel="manifest"]').href,
  'https://example.com/store/assets/tenants/fern/manifest-fa.webmanifest'
);
// Clay has its own icons and no 16 px one: the shared 16 px favicon goes, never shown for Clay.
vm.runInContext("vfBrandHead('clay', 'en')", brandContext);
assert.equal(links.size, 3);
assert.equal(icon('16x16'), undefined);
assert.equal(icon('32x32').href, 'https://example.com/store/assets/tenants/clay/favicon-32.png');
assert.equal(
  links.get('link[rel="apple-touch-icon"]').href,
  'https://example.com/store/assets/tenants/clay/apple-touch-icon.png'
);

// Prerendered builds use origin-relative bases at the root and under a deployment prefix.
for (const base of ['/', '/store/']) {
  brandContext.vfAssetBase = () => base;
  vm.runInContext("vfBrandHead('clay', 'en')", brandContext);
  assert.equal(icon('32x32').href, base + 'assets/tenants/clay/favicon-32.png');
  assert.match(
    vm.runInContext("vfBrandHtml('fern', 'en')", brandContext),
    new RegExp(
      `<link rel="icon" sizes="16x16" type="image/png" href="${base}assets/icons/favicon-16.png">`
    )
  );
}

// Every shared icon and social image is used: by the default tenant's head links, its manifests or
// the default preview image (page-lifecycle.js).
brandContext.vfAssetBase = () => '';
const used = new Set();
for (const lang of ['en', 'fa']) {
  for (const link of vm.runInContext(`vfBrandLinks('fern', '${lang}')`, brandContext))
    used.add(link.href);
  const manifest = JSON.parse(
    manifests.get(path.join(root, `assets/tenants/default/manifest-${lang}.webmanifest`))
  );
  for (const {src} of manifest.icons)
    used.add(path.posix.normalize('assets/tenants/default/' + src));
}
const lifecycle = fs.readFileSync(
  path.join(root, 'apps/storefront/shared/services/page-lifecycle.js'),
  'utf8'
);
assert.match(lifecycle, /`assets\/social\/og-default-\$\{lang\}\.png`/);
for (const lang of ['en', 'fa']) used.add(`assets/social/og-default-${lang}.png`);
for (const folder of ['assets/icons', 'assets/social'])
  for (const name of fs.readdirSync(path.join(root, folder)))
    assert.ok(
      used.has(folder + '/' + name),
      folder + '/' + name + ' is not used by the storefront'
    );

console.log('Passed: tenant branding, icons and manifests');
