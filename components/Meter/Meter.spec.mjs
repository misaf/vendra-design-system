import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('a named meter with its value, range and readable value', async ({page}) => {
  await openComponent(page, 'Meter');
  const meter = page.getByRole('meter', {name: 'Free delivery'});
  await expect(meter).toHaveAttribute('aria-valuenow', '3800000');
  await expect(meter).toHaveAttribute('aria-valuemin', '0');
  await expect(meter).toHaveAttribute('aria-valuemax', '5000000');
  await expect(meter).toHaveAttribute('aria-valuetext', '3.8M of 5M');
});

for (const [lang, percent] of [
  ['en', '75%'],
  ['fa', '۷۵٪']
])
  test(`without valueLabel it reads a percentage in the page language (${lang})`, async ({
    page
  }) => {
    await openComponent(page, 'Meter', lang);
    await expect(page.getByRole('meter', {name: 'Profile'})).toHaveAttribute(
      'aria-valuetext',
      percent
    );
  });

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Meter');
});
