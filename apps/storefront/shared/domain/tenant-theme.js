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
    // Each web font is followed by its metric-matched local fallback (tokens/fonts.css).
    serif:
      "'Instrument Serif','Instrument Serif Fallback','Vazirmatn','Vazirmatn Fallback','Vazirmatn Fallback Naskh','Vazirmatn Fallback Sans','Vazirmatn Fallback Free',Georgia,'Times New Roman',serif",
    sans: "'Jost','Jost Fallback','Vazirmatn','Vazirmatn Fallback','Vazirmatn Fallback Naskh','Vazirmatn Fallback Sans','Vazirmatn Fallback Free','Segoe UI',Tahoma,system-ui,sans-serif",
    vazir:
      "'Vazirmatn','Vazirmatn Fallback','Vazirmatn Fallback Naskh','Vazirmatn Fallback Sans','Vazirmatn Fallback Free','Segoe UI',Tahoma,system-ui,sans-serif"
  };
  const CHOICES = {
    headings: Object.keys(FONTS),
    case: ['none', 'uppercase'],
    accentWord: ['italic', 'upright'],
    controls: ['pill', 'square'],
    frame: ['arch', 'soft', 'square']
  };

  // --- A tenant's own brand font (spec.font) ---
  // Self-hosted WOFF2 files, one per script, placed ahead of the character.headings preset, which
  // stays as the fallback stack for whichever script the brand files leave out and while they load.
  // unicode-range keeps each file to its script, so a page downloads only what its language uses.
  const FONT_RANGES = {
    latin:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD, U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
    arabic:
      'U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC'
  };
  // The script whose file a page in each language preloads.
  const FONT_SCRIPT = {en: 'latin', fa: 'arabic'};
  // Built-in family names (and their metric fallbacks) stay the package's own: a tenant font
  // with one of these names would replace the shared @font-face for every page that loads it.
  const caseless = text =>
    text.replace(/[a-z]/gi, letter => '[' + letter.toUpperCase() + letter.toLowerCase() + ']');
  const FONT_FAMILY =
    '^(?!(?:' +
    ['Instrument Serif', 'Jost', 'Vazirmatn'].map(caseless).join('|') +
    ')(?: ' +
    caseless('Fallback') +
    '.*)?$)[A-Za-z][A-Za-z0-9 -]{0,62}[A-Za-z0-9]$';
  // Paths under assets/, relative to the deployment root like brand assets; no '..' segments.
  const FONT_FILE = '^assets/(?:[\\w-][\\w.-]*/)*[\\w-][\\w.-]*\\.woff2$';
  // One weight (400) or a variable font's range (300 700), in hundreds.
  const FONT_WEIGHT = '^[1-9]00(?: [1-9]00)?$';
  const FONT_KEYS = ['family', 'licence', 'files', 'weight', 'body'];
  // Where the generated CSS finds the deployment root: the build writes
  // packages/design-system/tokens/tenants/<slug>.css, four folders below it.
  const ASSET_BASE = /^(?:(?:https:\/\/[\w.-]+(?::\d+)?)?\/(?:[\w.~-]+\/)*|(?:\.\.\/)*)$/;
  const assetBase = base => {
    if (typeof base !== 'string' || !ASSET_BASE.test(base))
      throw new Error(
        "assetBase must be '', '../' steps, '/' or an https:// origin, ending in '/': " +
          JSON.stringify(base)
      );
    return base;
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
    const isObject = value => !!value && typeof value === 'object' && !Array.isArray(value);
    if (!isObject(spec)) fail('spec must be an object');
    if (spec.description !== undefined && typeof spec.description !== 'string')
      fail('description must be a string');
    if (spec.overrides !== undefined && !isObject(spec.overrides))
      fail('overrides must be an object');
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
    if (spec.font !== undefined) {
      const font = spec.font;
      if (!isObject(font)) fail('font must be an object');
      for (const key of Object.keys(font))
        if (!FONT_KEYS.includes(key)) fail('font.' + key + ' is not a font field');
      if (typeof font.family !== 'string' || !new RegExp(FONT_FAMILY).test(font.family))
        fail(
          'font.family must be 2-64 letters, digits, spaces or hyphens, and not a built-in font name'
        );
      if (typeof font.licence !== 'string' || !/\S/.test(font.licence))
        fail('font.licence must say under which licence the files are served');
      if (!isObject(font.files) || !Object.keys(font.files).length)
        fail('font.files must give a WOFF2 file for latin, arabic or both');
      for (const [script, file] of Object.entries(font.files)) {
        if (!(script in FONT_RANGES)) fail('font.files may only have latin and arabic');
        if (typeof file !== 'string' || !new RegExp(FONT_FILE).test(file))
          fail('font.files.' + script + ' must be a .woff2 path under assets/');
      }
      if (
        font.weight !== undefined &&
        (typeof font.weight !== 'string' || !new RegExp(FONT_WEIGHT).test(font.weight))
      )
        fail("font.weight must be one weight ('400') or a variable range ('300 700')");
      if (font.body !== undefined && typeof font.body !== 'boolean')
        fail('font.body must be true or false');
    }
    return spec;
  }

  // The same rules as validate() as a JSON Schema (draft 2020-12), so a backend or an admin form
  // can check a spec without running this file. Published as @vendra/design-system/theme.schema.json.
  // Other top-level keys (such as brand) are allowed, as validate() allows them.
  function schema() {
    const hex = {type: 'string', pattern: '^#[0-9A-Fa-f]{6}$'};
    return {
      $schema: 'https://json-schema.org/draft/2020-12/schema',
      title: 'Vendra tenant theme spec',
      type: 'object',
      required: ['colours', 'character'],
      properties: {
        description: {type: 'string'},
        colours: {
          type: 'object',
          required: Object.keys(RAMPS),
          properties: Object.fromEntries(Object.keys(RAMPS).map(key => [key, hex]))
        },
        character: {
          type: 'object',
          required: Object.keys(CHOICES),
          properties: Object.fromEntries(
            Object.entries(CHOICES).map(([key, options]) => [key, {enum: options.slice()}])
          )
        },
        overrides: {
          type: 'object',
          propertyNames: {enum: ORDER.slice()},
          additionalProperties: hex
        },
        font: {
          type: 'object',
          required: ['family', 'licence', 'files'],
          propertyNames: {enum: FONT_KEYS.slice()},
          properties: {
            family: {type: 'string', pattern: FONT_FAMILY},
            licence: {type: 'string', pattern: '\\S'},
            files: {
              type: 'object',
              minProperties: 1,
              propertyNames: {enum: Object.keys(FONT_RANGES)},
              additionalProperties: {type: 'string', pattern: FONT_FILE}
            },
            weight: {type: 'string', pattern: FONT_WEIGHT},
            body: {type: 'boolean'}
          }
        }
      }
    };
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
  // (keys match VF_EMAIL in apps/storefront/communications/email-templates.js).
  const EMAIL_FONTS = {
    sans: "'Jost','Helvetica Neue',Helvetica,Arial,sans-serif",
    vazir: "Vazirmatn,Tahoma,'Segoe UI',Arial,sans-serif"
  };
  // --- Design tokens (W3C DTCG JSON) for other platforms ---
  // A custom-property map ({'--peony-500': '#C8405F', '--success': 'var(--leaf-700)', ...}) as
  // design tokens that tools such as Style Dictionary turn into Swift, Kotlin, Android XML or CSS.
  // The path comes from the name: '--peony-500' is peony.500 and a bare '--white' is
  // white.default (so '--success' and '--success-soft' can sit side by side); var(--x) becomes the
  // alias {x...}. $type comes from the value: color, dimension, duration, cubicBezier, fontFamily,
  // fontWeight, number or shadow; other values (text-transform, font-style...) have none.
  const tokenPath = name => {
    const bare = name.replace(/^--/, '');
    const dash = bare.indexOf('-');
    return dash < 0 ? [bare, 'default'] : [bare.slice(0, dash), bare.slice(dash + 1)];
  };
  const tokenAlias = name => '{' + tokenPath(name).join('.') + '}';
  const LENGTH = /^-?(\d*\.)?\d+(px|rem|em)$/;
  const splitTop = value => {
    const parts = [];
    let depth = 0,
      start = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] === '(') depth++;
      else if (value[i] === ')') depth--;
      else if (value[i] === ',' && depth === 0) {
        parts.push(value.slice(start, i).trim());
        start = i + 1;
      }
    }
    return parts.concat(value.slice(start).trim());
  };
  const length = value => (value === '0' ? '0px' : value);
  function shadowToken(value) {
    const layers = splitTop(value).map(layer => {
      const color = (layer.match(/rgba?\([^)]*\)|#[0-9a-f]{3,8}/i) || [''])[0];
      const sizes = layer.replace(color, '').replace('inset', '').trim().split(/\s+/).map(length);
      const [offsetX, offsetY, blur = '0px', spread = '0px'] = sizes;
      return {
        color,
        offsetX,
        offsetY,
        blur,
        spread,
        ...(/\binset\b/.test(layer) ? {inset: true} : {})
      };
    });
    return layers.length === 1 ? layers[0] : layers;
  }
  function tokenType(name, value) {
    if (/^#[0-9a-f]{3,8}$/i.test(value) || /^rgba?\(/.test(value)) return 'color';
    if (/^--shadow-/.test(name)) return 'shadow';
    if (/^cubic-bezier\(/.test(value)) return 'cubicBezier';
    if (/^\d+(\.\d+)?m?s$/.test(value)) return 'duration';
    if (/^--weight-|^--accent-font-weight$/.test(name)) return 'fontWeight';
    if (/^--font-/.test(name)) return 'fontFamily';
    if (LENGTH.test(value) || (value === '0' && /^--(space|radius|border)-/.test(name)))
      return 'dimension';
    if (/^-?(\d*\.)?\d+$/.test(value)) return 'number';
    return null;
  }
  function designTokens(vars) {
    const out = {};
    const typeOf = (name, seen = []) => {
      const value = String(vars[name] == null ? '' : vars[name]).trim();
      const ref = value.match(/^var\((--[\w-]+)\)$/);
      if (ref)
        return seen.includes(ref[1]) || !(ref[1] in vars) ? null : typeOf(ref[1], [...seen, name]);
      return tokenType(name, value);
    };
    for (const [name, raw] of Object.entries(vars)) {
      const value = String(raw).trim();
      const ref = value.match(/^var\((--[\w-]+)\)$/);
      const type = typeOf(name);
      let tokenValue;
      if (ref) tokenValue = tokenAlias(ref[1]);
      else if (type === 'shadow') tokenValue = shadowToken(value);
      else if (type === 'cubicBezier') tokenValue = value.slice(13, -1).split(',').map(Number);
      else if (type === 'fontWeight' || type === 'number') tokenValue = Number(value);
      else if (type === 'dimension') tokenValue = length(value);
      else if (type === 'fontFamily') {
        const families = splitTop(value).map(family => family.replace(/^['"]|['"]$/g, ''));
        tokenValue = families.length === 1 ? families[0] : families;
      } else tokenValue = value.replace(/var\((--[\w-]+)\)/g, (match, inner) => tokenAlias(inner));
      const [group, key] = tokenPath(name);
      (out[group] = out[group] || {})[key] = type
        ? {$type: type, $value: tokenValue}
        : {$value: tokenValue};
    }
    return out;
  }

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

  function css(slug, spec, {assetBase: base = '../../../../'} = {}) {
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
      '.json by npm --prefix apps/storefront run build. Edit the JSON, not this file.\n   ' +
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

  // For apps that keep tenant themes in their database and render the CSS per request:
  // refuses unsafe slugs, invalid specs and failing contrast, and drops the free-text
  // description so stored data can never close the <style> element it is written into.
  const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  function tenantCss(slug, spec, {allowFailing = false, assetBase: base = '/'} = {}) {
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
    return css(
      slug,
      {
        colours: spec.colours,
        character: spec.character,
        overrides: spec.overrides,
        font: spec.font
      },
      {assetBase: base}
    );
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
    schema,
    tokens,
    checks,
    css,
    tenantCss,
    fontFaces,
    fontPreloads,
    email,
    designTokens
  };
});
