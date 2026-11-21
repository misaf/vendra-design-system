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

module.exports = {designTokens};
