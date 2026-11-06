// Two rules for every stylesheet in components/ and the storefront (npm run lint:css, part of
// check): colours come from tokens, so a tenant theme and forced-colours mode reach every part; and
// sides are logical (start/end, not left/right), so the Persian pages mirror without overrides.
// Colours are written only in tokens/ (and the generated tenant themes). Media queries take only
// the breakpoints in tokens/spacing.css (--breakpoint-md/lg/xl), in range syntax; anything finer
// is a container query (components lay out by the space they get, not by the viewport).
const PHYSICAL = [
  'left',
  'right',
  '/^(margin|padding|border|scroll-margin|scroll-padding)-(left|right)/',
  '/^border-(top|bottom)-(left|right)-radius$/'
];

export default {
  rules: {
    'color-no-hex': [true, {message: 'Use a colour token (var(--…)), not a hex colour'}],
    'color-named': ['never', {message: 'Use a colour token (var(--…)), not a named colour'}],
    'function-disallowed-list': [
      ['rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklab', 'oklch'],
      {message: 'Use a colour token (var(--…)); mix shades with color-mix() on tokens'}
    ],
    'property-disallowed-list': [
      PHYSICAL,
      {message: 'Use the logical property (inset-inline-start, margin-inline-end, …)'}
    ],
    'media-feature-range-notation': [
      'context',
      {message: 'Write the width in range syntax: (width < 768px), (width >= 1024px)'}
    ],
    'media-feature-name-value-allowed-list': [
      {width: ['768px', '1024px', '1440px']},
      {
        message:
          'Breakpoints are 768px, 1024px and 1440px (tokens/spacing.css); for another width use a container query'
      }
    ],
    'declaration-property-value-disallowed-list': [
      {'/^(float|clear|text-align|caption-side)$/': ['left', 'right']},
      {message: 'Use start or end (inline-start/inline-end for float and clear)'}
    ]
  }
};
