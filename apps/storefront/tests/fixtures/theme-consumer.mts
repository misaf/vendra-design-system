import {RAMPS, shade, VENDRA, type ShadeStep, type ThemeRamp} from '@vendra/design-system/theme';

const step: ShadeStep = {lightness: 0.8, shift: 0, chroma: 0.5, maxChroma: 0.02};
const ramp: ThemeRamp = RAMPS.accent;
export const color: string = shade(VENDRA.colours.accent, step);
export const token: `--${string}` = ramp.base;
export const generated: string = shade('#C8405F', ramp.steps['--peony-600']);
export const unchanged: string = shade('#C8405F', {});

// @ts-expect-error Shade controls must be numeric.
shade('#C8405F', {shift: 'lighter'});
// @ts-expect-error Unknown controls are not silently accepted.
shade('#C8405F', {opacity: 0.5});
// @ts-expect-error There are four brand ramps; no invented ramp.
RAMPS.other;
// @ts-expect-error A ramp's base names a CSS custom property.
const invalid: ThemeRamp = {base: 'accent', steps: {}};
void invalid;
