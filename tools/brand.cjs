const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');

// Only repository assets are accepted: all referenced files ship under the deployment's base URL.
function validateBrand(brand = {}, label = 'brand') {
  const fail = message => {
    throw new Error(label + ': ' + message);
  };
  const asset = src => {
    if (
      typeof src !== 'string' ||
      !/^assets\/[\w./-]+$/.test(src) ||
      src.split('/').includes('..') ||
      !fs.existsSync(path.join(root, src)) ||
      !fs.statSync(path.join(root, src)).isFile()
    )
      fail('missing or invalid asset: ' + src);
  };
  for (const key of Object.keys(brand))
    if (!['logo', 'logoMark', 'logoOnDark', 'icons', 'ogImage'].includes(key))
      fail('unknown field ' + key);
  for (const key of ['logo', 'logoMark', 'logoOnDark']) {
    const image = brand[key];
    if (!image) continue;
    asset(image.src);
    if (!(
      Number.isFinite(image.width) &&
      image.width > 0 &&
      Number.isFinite(image.height) &&
      image.height > 0
    ))
      fail(key + ' needs positive width and height');
    if (key === 'logoMark' && image.width !== image.height) fail('logoMark must be square');
    if (image.alt && (!image.alt.en || !image.alt.fa)) fail(key + '.alt needs en and fa');
  }
  if (brand.ogImage) for (const lang of ['en', 'fa']) asset(brand.ogImage[lang]);
  if (brand.icons) {
    const sizes = {favicon: 32, apple: 180, app192: 192, app512: 512, maskable: 512};
    for (const key of ['favicon', 'apple', 'app192', 'app512', 'maskable']) {
      asset(brand.icons[key]);
      const png = fs.readFileSync(path.join(root, brand.icons[key]));
      if (
        png.length < 24 ||
        png.subarray(0, 8).toString('hex') !== '89504e470d0a1a0a' ||
        png.readUInt32BE(16) !== sizes[key] ||
        png.readUInt32BE(20) !== sizes[key]
      )
        fail('icons.' + key + ' must be a ' + sizes[key] + 'px square PNG');
    }
  }
  return brand;
}
function brandOutputs(specs) {
  const output = new Map();
  for (const [slug, spec] of Object.entries({default: {}, ...specs})) {
    const brand = validateBrand(spec.brand, slug + '.brand');
    const icons = brand.icons || {
      favicon: 'assets/icons/favicon-32.png',
      apple: 'assets/icons/apple-touch-icon.png',
      app192: 'assets/icons/icon-192.png',
      app512: 'assets/icons/icon-512.png',
      maskable: 'assets/icons/icon-maskable-512.png'
    };
    for (const lang of ['en', 'fa']) {
      const manifest = {
        name:
          brand.logo?.alt?.[lang] ||
          spec.storeName?.[lang] ||
          (lang === 'fa' ? 'گل‌فروشی وندرا' : 'Vendra Florist'),
        lang,
        dir: lang === 'fa' ? 'rtl' : 'ltr',
        start_url: `../../../apps/storefront/app/?lang=${lang}${slug === 'default' ? '' : '&tenant=' + slug}`,
        scope: '../../../apps/storefront/app/',
        display: 'standalone',
        icons: [
          ['app192', '192x192'],
          ['app512', '512x512'],
          ['maskable', '512x512']
        ].map(([key, sizes]) => ({
          src: '../../../' + icons[key],
          sizes,
          type: 'image/png',
          purpose: key === 'maskable' ? 'maskable' : 'any'
        }))
      };
      output.set(
        path.join(root, `assets/tenants/${slug}/manifest-${lang}.webmanifest`),
        JSON.stringify(manifest, null, 2) + '\n'
      );
    }
  }
  return output;
}
module.exports = {validateBrand, brandOutputs};
