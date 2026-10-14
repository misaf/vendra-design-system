// Two rules for every stylesheet in components/ and the storefront (npm run lint:css, part of
// check): colours come from tokens, so a tenant theme and forced-colours mode reach every part; and
// sides are logical (start/end, not left/right), so the Persian pages mirror without overrides.
// Colours are written only in tokens/ (and the generated tenant themes).
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
    'declaration-property-value-disallowed-list': [
      {'/^(float|clear|text-align|caption-side)$/': ['left', 'right']},
      {message: 'Use start or end (inline-start/inline-end for float and clear)'}
    ]
  }
};
