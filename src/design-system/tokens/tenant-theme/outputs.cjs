const {channels, contrast, shade} = require('./colours.cjs');
const {RAMPS, ORDER, FONTS, FONT_RANGES, FONT_SCRIPT} = require('./definition.cjs');

const rgbParts = hex => channels(hex).join(',');

// Every custom property for a spec, in three groups that mirror the CSS file.
function tokens(spec) {
  const c = spec.colours,
    ch = spec.character,
    shades = {};
  for (const [key, ramp] of Object.entries(RAMPS)) {
    shades[ramp.base] = c[key].toUpperCase();
    for (const [name, step] of Object.entries(ramp.steps)) shades[name] = shade(c[key], step);
  }
  Object.assign(shades, spec.overrides || {});
  const ramps = Object.fromEntries(ORDER.map(name => [name, shades[name].toUpperCase()]));
  const ink = rgbParts(ramps['--ink-900']);
  // Aliases are re-declared because custom properties resolve where they are declared.
  const semantic = {
    '--success': 'var(--leaf-700)',
    '--success-soft': 'var(--leaf-100)',
    '--warning': 'var(--pollen-600)',
    '--warning-soft': 'var(--pollen-100)',
    '--info': 'var(--lilac-500)',
    '--info-soft': 'var(--lilac-100)',
    '--surface-page': 'var(--petal-50)',
    '--surface-card': 'var(--white)',
    '--surface-sunken': 'var(--petal-100)',
    '--surface-muted': 'var(--petal-200)',
    '--surface-inverse': 'var(--stem-900)',
    '--surface-overlay': 'rgba(' + ink + ',.42)',
    '--text-body': 'var(--ink-900)',
    '--text-secondary': 'var(--ink-700)',
    '--text-muted': 'var(--ink-500)',
    '--text-subtle': 'var(--ink-300)',
    '--text-on-accent': 'var(--white)',
    '--text-on-soft': 'var(--peony-700)',
    '--text-on-inverse': 'var(--petal-50)',
    '--text-accent': 'var(--peony-600)',
    '--accent': 'var(--peony-500)',
    '--accent-hover': 'var(--peony-600)',
    '--accent-press': 'var(--peony-700)',
    '--accent-soft': 'var(--peony-100)',
    '--accent-soft-hover': 'var(--peony-200)',
    '--border-subtle': 'var(--petal-200)',
    '--border-default': 'var(--petal-300)',
    '--border-strong': 'var(--ink-700)',
    '--surface-hover': 'var(--petal-200)',
    '--surface-disabled': 'var(--petal-100)',
    '--surface-strong': 'var(--ink-900)',
    '--text-on-strong': 'var(--petal-50)',
    '--border-input-strong': 'var(--ink-500)',
    '--focus-ring-soft': 'var(--lilac-100)',
    '--text-info': 'var(--lilac-700)',
    '--control-on': 'var(--leaf-500)',
    '--success-on-inverse': 'var(--leaf-300)',
    '--warning-on-inverse': 'var(--pollen-400)',
    '--info-on-inverse': 'var(--lilac-300)',
    '--focus-ring': 'var(--lilac-500)',
    '--focus-ring-on-inverse': 'var(--lilac-300)',
    '--surface-header': 'rgba(' + rgbParts(ramps['--petal-50']) + ',.88)',
    '--text-inverse-muted': 'var(--ink-300)',
    '--border-inverse': 'var(--stem-700)',
    '--shadow-sm': '0 1px 2px rgba(' + ink + ',.06)',
    '--shadow-md': '0 8px 20px -8px rgba(' + ink + ',.18)',
    '--shadow-lg': '0 24px 48px -16px rgba(' + ink + ',.28)'
  };
  const square = ch.controls === 'square',
    upright = ch.accentWord === 'upright';
  const own = spec.font ? "'" + spec.font.family + "'," : '';
  const character = {
    '--font-display': own + FONTS[ch.headings],
    ...(spec.font && spec.font.body ? {'--font-body': own + FONTS.sans} : {}),
    '--tracking-display':
      ch.case === 'uppercase' ? '.02em' : ch.headings === 'serif' ? '-.015em' : '-.01em',
    '--display-case': ch.case,
    '--accent-font-style': upright ? 'normal' : 'italic',
    '--accent-font-weight': upright ? '500' : '400',
    '--radius-control': square ? 'var(--radius-xs)' : 'var(--radius-pill)',
    '--button-case': square ? 'uppercase' : 'none',
    '--tracking-button': square ? '.12em' : '.02em',
    ...(square ? {'--radius-sm': '2px', '--radius-md': '2px', '--radius-lg': '4px'} : {}),
    '--radius-arch':
      ch.frame === 'arch'
        ? '160px 160px var(--radius-md) var(--radius-md)'
        : ch.frame === 'soft'
          ? '24px 24px var(--radius-md) var(--radius-md)'
          : 'var(--radius-xs)'
  };
  return {ramps, semantic, character, all: {...ramps, ...semantic, ...character}};
}

// The seven Theme builder checks; tenant-onboarding.md requires all to pass.
const RING_ON_INVERSE = '#A99BDD'; // --lilac-300 = --focus-ring-on-inverse
function checks(spec) {
  const r = tokens(spec).ramps;
  return [
    ['White on accent button', contrast('#FFFFFF', r['--peony-500']), 4.5],
    ['Accent text on page', contrast(r['--peony-600'], r['--petal-50']), 4.5],
    ['Muted text on muted surface', contrast(r['--ink-500'], r['--petal-200']), 4.5],
    ['Body text on page', contrast(r['--ink-900'], r['--petal-50']), 4.5],
    ['Footer text on inverse', contrast(r['--petal-50'], r['--stem-900']), 4.5],
    ['Input edge on page', contrast(r['--border-input'], r['--petal-50']), 3],
    ['Focus ring on inverse', contrast(RING_ON_INVERSE, r['--stem-900']), 3]
  ].map(([label, ratio, min]) => ({label, ratio, min, pass: ratio >= min}));
}

// Email clients need hex colours and web-safe fallbacks, so emails get a flat palette
// (keys match VF_EMAIL in src/communications/templates/email/email-templates.js).
const EMAIL_FONTS = {
  sans: "'Jost','Helvetica Neue',Helvetica,Arial,sans-serif",
  vazir: "Vazirmatn,Tahoma,'Segoe UI',Arial,sans-serif"
};

function email(spec) {
  const r = tokens(spec).ramps,
    ch = spec.character,
    square = ch.controls === 'square';
  return {
    bg: r['--petal-50'],
    card: '#FFFFFF',
    ink: r['--ink-900'],
    ink2: r['--ink-700'],
    muted: r['--ink-500'],
    line: r['--petal-200'],
    sunk: r['--petal-100'],
    gold: r['--peony-500'],
    goldInk: '#FFFFFF',
    accent: r['--peony-600'],
    btnRadius: square ? '2px' : '999px',
    btnCase: square ? 'uppercase' : 'none',
    btnTrack: square ? '.12em' : '.02em',
    cardRadius: square ? '4px' : '20px',
    disp: ch.headings === 'serif' ? null : EMAIL_FONTS[ch.headings],
    dispCase: ch.case
  };
}

// Where the generated CSS finds the deployment root: the build writes
// apps/storefront/design-system/tokens/tenants/<slug>.css, four folders below it.
const ASSET_BASE = /^(?:(?:https:\/\/[\w.-]+(?::\d+)?)?\/(?:[\w.~-]+\/)*|(?:\.\.\/)*)$/;
const assetBase = base => {
  if (typeof base !== 'string' || !ASSET_BASE.test(base))
    throw new Error(
      "assetBase must be '', '../' steps, '/' or an https:// origin, ending in '/': " +
        JSON.stringify(base)
    );
  return base;
};

// The brand font's @font-face rules; each url is assetBase + the file's path.
function fontFaces(spec, base = '/') {
  const font = spec.font;
  if (!font) return '';
  base = assetBase(base);
  return Object.entries(font.files)
    .map(
      ([script, file]) =>
        "@font-face{font-family:'" +
        font.family +
        "';font-style:normal;font-weight:" +
        (font.weight || '400') +
        ";font-display:swap;src:url('" +
        base +
        file +
        "') format('woff2');unicode-range:" +
        FONT_RANGES[script] +
        ';}\n'
    )
    .join('');
}

// The brand-font file a page in `lang` should preload, as [url] or [] (no font, or none for
// that language's script). The other script's file loads only if the page uses it.
function fontPreloads(spec, lang, base = '/') {
  const file = spec.font && spec.font.files[FONT_SCRIPT[lang]];
  return file ? [assetBase(base) + file] : [];
}

function css(slug, spec, {assetBase: base = '../../../'} = {}) {
  const t = tokens(spec);
  // Claude Design reads @kind to classify tokens that are not colours, sizes or fonts.
  const kind = {
    '--tracking-display': 'other',
    '--display-case': 'other',
    '--accent-font-style': 'other',
    '--button-case': 'other',
    '--tracking-button': 'other'
  };
  const line = group =>
    Object.entries(group)
      .map(([k, v]) => k + ':' + v + ';' + (kind[k] ? '/* @kind ' + kind[k] + ' */' : ''))
      .join('');
  const about = spec.description ? spec.description.replace(/\*\//g, '*\\/') + '\n   ' : '';
  return (
    '/* GENERATED from tokens/tenants/' +
    slug +
    '.json by npm run generate. Edit the JSON, not this file.\n   ' +
    about +
    'Apply with data-tenant="' +
    slug +
    '" on <html> (or any wrapper). */\n' +
    fontFaces(spec, base) +
    '[data-tenant="' +
    slug +
    '"]{\n' +
    line(t.ramps) +
    '\n' +
    line(t.semantic) +
    '\n' +
    line(t.character) +
    '\n}\n'
  );
}

module.exports = {tokens, checks, email, fontFaces, fontPreloads, css};
