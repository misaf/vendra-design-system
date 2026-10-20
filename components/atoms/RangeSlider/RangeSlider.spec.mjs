import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

for (const lang of ['en', 'fa'])
  test(`thumbs move by step, stay a step apart and read formatValue (${lang})`, async ({page}) => {
    await openComponent(page, 'RangeSlider', lang);
    const low = page.getByRole('slider', {name: 'Min price'});
    const result = page.locator('output[data-test=range]');
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
