// Tenant theme generator. Turns a tenant spec (tokens/tenants/<slug>.json) into
// the [data-tenant] CSS block. The build writes tokens/tenants/<slug>.css with it,
// and the Theme builder card (guidelines/theme-builder.html) previews with it, so
// both always agree. Works in Node (require) and the browser (window.VF_TENANT_THEME).
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.VF_TENANT_THEME = api;
})(typeof self !== 'undefined' ? self : this, function () {
  // --- OKLCH colour math (sRGB in and out, chroma reduced to stay in gamut) ---
  const toLinear = v => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const toGamma = v => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
  const channels = hex => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));

  function oklch(hex) {
    const [r, g, b] = channels(hex).map(v => toLinear(v / 255));
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
    const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    return [L, Math.hypot(A, B), ((Math.atan2(B, A) * 180) / Math.PI + 360) % 360];
  }

  function linearRgb([L, C, H]) {
    const a = C * Math.cos((H * Math.PI) / 180),
      b = C * Math.sin((H * Math.PI) / 180);
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    return [
      4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
    ];
  }

  const inGamut = c => linearRgb(c).every(v => v >= -1e-4 && v <= 1 + 1e-4);

  function fromOklch([L, C, H]) {
    L = Math.min(1, Math.max(0, L));
    if (!inGamut([L, C, H])) {
      let lo = 0,
        hi = C;
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        if (inGamut([L, mid, H])) lo = mid;
        else hi = mid;
      }
      C = lo;
    }
    return (
      '#' +
      linearRgb([L, C, H])
        .map(v =>
          Math.round(Math.min(1, Math.max(0, toGamma(v))) * 255)
            .toString(16)
            .padStart(2, '0')
        )
        .join('')
        .toUpperCase()
    );
  }

  function contrast(a, b) {
    const lum = hex =>
      channels(hex)
        .map(v => toLinear(v / 255))
        .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i], 0);
    const x = lum(a),
      y = lum(b);
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  }

  // --- Shades: one step per token, relative to the base colour in OKLCH ---
  // Fitted to the hand-tuned Vendra (tokens/colors.css) and Clay palettes: every
  // step lands within 0.02 OKLab of both, about the smallest visible difference.
  // `lightness` is an absolute OKLCH L; `shift` moves L; `chroma` scales C, and
  // `maxChroma` caps it so pale tints stay soft. Hue always follows the base.
  const RAMPS = {
    accent: {
      base: '--peony-500',
      steps: {
        '--peony-100': {lightness: 0.936, maxChroma: 0.025},
        '--peony-200': {lightness: 0.879, maxChroma: 0.047},
        '--peony-400': {shift: 0.085, chroma: 0.94},
        '--peony-600': {shift: -0.073, chroma: 0.895},
        '--peony-700': {shift: -0.164, chroma: 0.735}
      }
    },
    neutral: {
      base: '--petal-200',
      steps: {
        '--petal-50': {shift: 0.0635, chroma: 0.43},
        '--petal-100': {shift: 0.0375, chroma: 0.7},
        '--petal-300': {shift: -0.06, chroma: 1.33},
        '--petal-400': {shift: -0.151, chroma: 1.63}
      }
    },
    ink: {
      base: '--ink-900',
      steps: {
        '--ink-700': {shift: 0.114, chroma: 1.38},
        '--ink-500': {shift: 0.2475, chroma: 1.5},
        '--ink-300': {shift: 0.5085, chroma: 1.4},
        '--border-input': {shift: 0.372, chroma: 1.5}
      }
    },
    footer: {
      base: '--stem-900',
      steps: {
        '--stem-700': {shift: 0.094, chroma: 1.43},
        '--stem-500': {shift: 0.2025, chroma: 1.93}
      }
    }
  };
  const ORDER = [
    '--petal-50',
    '--petal-100',
    '--petal-200',
    '--petal-300',
    '--petal-400',
    '--peony-100',
    '--peony-200',
    '--peony-400',
    '--peony-500',
    '--peony-600',
    '--peony-700',
    '--stem-500',
    '--stem-700',
    '--stem-900',
    '--ink-300',
    '--ink-500',
    '--ink-700',
    '--ink-900',
    '--border-input'
  ];

  function shade(base, step) {
    const [L, C, H] = oklch(base);
    const lightness = step.lightness != null ? step.lightness : L + (step.shift || 0);
    const chroma = Math.min(
      C * (step.chroma != null ? step.chroma : 1),
      step.maxChroma != null ? step.maxChroma : Infinity
    );
    return fromOklch([lightness, chroma, H]);
  }

  // --- Character choices (the Theme builder's selects) ---
  const FONTS = {
    serif: "'Instrument Serif','Vazirmatn',Georgia,'Times New Roman',serif",
    sans: "'Jost','Vazirmatn','Segoe UI',Tahoma,system-ui,sans-serif",
    vazir: "'Vazirmatn','Segoe UI',Tahoma,system-ui,sans-serif"
  };
  const CHOICES = {
    headings: Object.keys(FONTS),
    case: ['none', 'uppercase'],
    accentWord: ['italic', 'upright'],
    controls: ['pill', 'square'],
    frame: ['arch', 'soft', 'square']
  };

  // The default theme as a spec: the Theme builder's starting point.
  const VENDRA = {
    colours: {accent: '#C8405F', neutral: '#ECE4E0', ink: '#17211C', footer: '#17211C'},
    character: {
      headings: 'serif',
      case: 'none',
      accentWord: 'italic',
      controls: 'pill',
      frame: 'arch'
    }
  };

  const isHex = v => typeof v === 'string' && /^#[0-9A-F]{6}$/i.test(v);

  // Throws on anything the build should refuse (typos, unknown options).
  function validate(spec, label = 'tenant') {
    const fail = message => {
      throw new Error(label + ': ' + message);
    };
    if (!spec || typeof spec !== 'object') fail('spec must be an object');
    for (const key of Object.keys(RAMPS))
      if (!isHex(spec.colours && spec.colours[key]))
        fail('colours.' + key + ' must be a #RRGGBB colour');
    for (const [key, options] of Object.entries(CHOICES)) {
      if (!options.includes(spec.character && spec.character[key]))
        fail('character.' + key + ' must be one of ' + options.join(', '));
    }
    for (const [name, value] of Object.entries(spec.overrides || {})) {
      if (!ORDER.includes(name))
        fail('overrides may only set generated shades (' + name + ' is not one)');
      if (!isHex(value)) fail('overrides.' + name + ' must be a #RRGGBB colour');
    }
    return spec;
  }

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
    const character = {
      '--font-display': FONTS[ch.headings],
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
  // (keys match VF_EMAIL in templates/communications/email-templates.js).
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

  function css(slug, spec) {
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
      '.json by npm --prefix templates run build. Edit the JSON, not this file.\n   ' +
      about +
      'Apply with data-tenant="' +
      slug +
      '" on <html> (or any wrapper). */\n' +
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

  // For apps that keep tenant themes in their database and render the CSS per request:
  // refuses unsafe slugs, invalid specs and failing contrast, and drops the free-text
  // description so stored data can never close the <style> element it is written into.
  const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  function tenantCss(slug, spec, {allowFailing = false} = {}) {
    if (typeof slug !== 'string' || !SLUG.test(slug))
      throw new Error(
        'Tenant slugs are lowercase letters, digits and hyphens: ' + JSON.stringify(slug)
      );
    validate(spec, 'tenant ' + slug);
    const failing = checks(spec).filter(check => !check.pass);
    if (failing.length && !allowFailing)
      throw new Error(
        'tenant ' +
          slug +
          ' fails contrast: ' +
          failing
            .map(c => c.label + ' ' + Number(c.ratio).toFixed(2) + ':1 (needs ' + c.min + ')')
            .join('; ')
      );
    return css(slug, {colours: spec.colours, character: spec.character, overrides: spec.overrides});
  }

  return {
    RAMPS,
    FONTS,
    CHOICES,
    VENDRA,
    oklch,
    fromOklch,
    contrast,
    shade,
    validate,
    tokens,
    checks,
    css,
    tenantCss,
    email
  };
});
