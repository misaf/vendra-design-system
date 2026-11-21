// Shared entry point for the Node build, storefront and browser Theme builder.
const {RAMPS, FONTS, CHOICES, VENDRA} = require('./tenant-theme/definition.cjs');
const {oklch, fromOklch, contrast, shade} = require('./tenant-theme/colours.cjs');
const {validate, schema} = require('./tenant-theme/validation.cjs');
const {tokens, checks, css, fontFaces, fontPreloads, email} = require('./tenant-theme/outputs.cjs');
const {designTokens} = require('./tenant-theme/design-tokens.cjs');

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

module.exports = {
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
