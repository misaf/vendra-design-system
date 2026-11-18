import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa'])
  test(`thumbs move by step, stay a step apart and read formatValue (${lang})`, async ({page}) => {
    await openComponent(page, 'RangeSlider', lang);
    const low = page.getByRole('slider', {name: 'Min price'});
    const result = page.locator('[data-test=range]');
    await expect(low).toHaveAttribute('aria-valuetext', '20 Toman');
    await low.focus();
    await page.keyboard.press(lang === 'fa' ? 'ArrowLeft' : 'ArrowRight');
    await expect(result).toHaveText('30-80');
    await expect(low).toHaveAttribute('aria-valuetext', '30 Toman');
    await page.keyboard.press('End');
    await expect(result).toHaveText('70-80');
  });

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'RangeSlider');
});

for (const lang of ['en', 'fa'])
  test(
    'external labels name range and single thumbs without descendant text (' + lang + ')',
    async ({page}) => {
      await openComponent(page, 'RangeSlider', lang);
      const low = page.getByRole('slider', {name: 'Low Delivery price', exact: true});
      const high = page.getByRole('slider', {name: 'High Delivery price', exact: true});
      await expect(low).toHaveAttribute('aria-valuetext', '20');
      await expect(high).toHaveAttribute('aria-valuetext', '80');
      await expect(page.getByRole('slider', {name: 'Quantity', exact: true})).toHaveAttribute(
        'aria-valuetext',
        '3'
      );
      await page.getByRole('checkbox', {name: 'Rename external label'}).check();
      await expect(page.getByRole('slider', {name: 'Low Updated price', exact: true})).toHaveCount(
        1
      );
      await expect(page.getByRole('slider', {name: 'High Updated price', exact: true})).toHaveCount(
        1
      );
    }
  );
