import theme = require('@vendra/design-system/theme');

const step: theme.ShadeStep = {shift: -0.1, chroma: 0, maxChroma: 0};
const ramp: theme.ThemeRamp = theme.RAMPS.footer;
export const color: string = theme.shade(theme.VENDRA.colours.footer, step);
export const token: `--${string}` = ramp.base;
export const generated: string = theme.shade('#283A2D', ramp.steps['--stem-500']);

// @ts-expect-error Absolute lightness must be numeric.
theme.shade('#283A2D', {lightness: 'dark'});
// @ts-expect-error A base color is required.
theme.shade(42, {});
// @ts-expect-error Step entries must use CSS custom-property names.
const invalid: theme.ThemeRamp = {base: '--stem-900', steps: {other: {shift: 0}}};
void invalid;
