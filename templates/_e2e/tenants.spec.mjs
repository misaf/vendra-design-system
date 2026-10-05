import {test, expect} from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import {ROOT, TENANTS, contrast, expectNoViteError} from './helpers.mjs';

// The seven Theme builder checks (guidelines/theme-builder.html), run against
// each shipped tenant file rather than the builder's generated ramps, so a
// hand-tuned token that drifts below the minimum is caught. The focus ring
// uses the real --focus-ring-on-inverse token.
const CHECKS = [
  ['White on accent button', '--text-on-accent', '--accent', 4.5],
  ['Accent text on page', '--text-accent', '--surface-page', 4.5],
  ['Muted text on muted surface', '--text-muted', '--surface-muted', 4.5],
  ['Body text on page', '--text-body', '--surface-page', 4.5],
  ['Footer text on inverse', '--text-on-inverse', '--surface-inverse', 4.5],
  ['Input edge on page', '--border-input', '--surface-page', 3],
  ['Focus ring on inverse', '--focus-ring-on-inverse', '--surface-inverse', 3]
];

test.beforeEach(({}, info) => test.skip(info.project.name !== 'desktop', 'token checks do not depend on the viewport'));

// Resolves each token to an rgb() colour inside a [data-tenant] wrapper.
function resolve(page, tenant, names) {
  return page.evaluate(([tenant, names]) => {
    const wrap = document.createElement('div');
    if (tenant) wrap.setAttribute('data-tenant', tenant);
    document.body.append(wrap);
    const out = {};
    for (const name of names) {
      const probe = document.createElement('span');
      probe.style.color = `var(${name}, transparent)`;
      wrap.append(probe);
      out[name] = getComputedStyle(probe).color;
    }
    wrap.remove();
    return out;
  }, [tenant, names]);
}

for (const tenant of [null, ...TENANTS]) {
  test(`theme builder checks pass (${tenant || 'default'} tenant)`, async ({page}) => {
    await page.goto('/templates/_e2e/fixtures/tokens.html');
    await expectNoViteError(page);
    const names = [...new Set(CHECKS.flatMap(([, fg, bg]) => [fg, bg]))];
    const c = await resolve(page, tenant, names);
    for (const name of names) expect(c[name], `${name} resolves to an opaque colour`).toMatch(/^rgb\(/);
    const results = CHECKS.map(([label, fg, bg, min]) => {
      const ratio = contrast(c[fg], c[bg]);
      return {label, ratio: +ratio.toFixed(2), pass: ratio >= min};
    });
    expect(results.filter(r => !r.pass), JSON.stringify(results)).toEqual([]);
  });
}

test('every tenant is imported by styles.css', () => {
  const styles = fs.readFileSync(path.join(ROOT, 'styles.css'), 'utf8');
  for (const tenant of TENANTS) expect(styles).toContain(`@import url('tokens/tenants/${tenant}.css');`);
});

// The builder's own presets must start a new tenant from a passing theme.
for (const preset of ['Vendra', 'Clay']) {
  test(`theme builder: ${preset} preset passes all seven checks`, async ({page}) => {
    await page.goto('/guidelines/theme-builder.html');
    await expectNoViteError(page);
    await page.getByRole('button', {name: preset, exact: true}).click();
    const verdicts = page.locator('.tb-ch span:nth-child(3n)');
    await expect(verdicts).toHaveCount(7);
    await expect(verdicts).toHaveText(Array(7).fill('Pass'));
    await expect(page.locator('.tb-inv')).toHaveText('All contrast checks pass.');
  });
}
