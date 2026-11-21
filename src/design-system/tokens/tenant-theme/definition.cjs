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

module.exports = {RAMPS, ORDER, FONTS, CHOICES, FONT_RANGES, FONT_SCRIPT, VENDRA};
