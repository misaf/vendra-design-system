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

function shade(base, step) {
  const [L, C, H] = oklch(base);
  const lightness = step.lightness != null ? step.lightness : L + (step.shift || 0);
  const chroma = Math.min(
    C * (step.chroma != null ? step.chroma : 1),
    step.maxChroma != null ? step.maxChroma : Infinity
  );
  return fromOklch([lightness, chroma, H]);
}

module.exports = {channels, oklch, fromOklch, contrast, shade};
