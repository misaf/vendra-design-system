import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('decorative unless labelled; size and colour apply', async ({page}) => {
  await openComponent(page, 'Icon');
  await expect(page.locator('[data-test=decorative]')).toHaveAttribute('aria-hidden', 'true');
  const saved = page.getByRole('img', {name: 'Saved'});
  await expect(saved).toHaveCSS('width', '28px');
  await expect(saved).toHaveCSS('background-color', 'rgb(200, 64, 95)');
});

test('arrows mirror in right-to-left pages unless flipRtl is false', async ({page}) => {
  await openComponent(page, 'Icon', 'fa');
  await expect(page.locator('[data-test=arrow]')).not.toHaveCSS('transform', 'none');
  await expect(page.locator('[data-test=fixed]')).toHaveCSS('transform', 'none');
  await openComponent(page, 'Icon', 'en');
  await expect(page.locator('[data-test=arrow]')).toHaveCSS('transform', 'none');
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Icon');
});
