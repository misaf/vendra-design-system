const {RAMPS, CHOICES, ORDER, FONT_RANGES} = require('./definition.cjs');

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
// can check a spec without running this file. Published as the storefront theme generator.schema.json.
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

module.exports = {validate, schema};
