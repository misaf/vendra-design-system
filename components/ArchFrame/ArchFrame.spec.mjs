import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('an image with its alt, or a placeholder named by alt', async ({page}) => {
  await openComponent(page, 'ArchFrame');
  await expect(page.getByRole('img', {name: 'Lavender Whisper'})).toHaveAttribute(
    'loading',
    'lazy'
  );
  await expect(page.getByRole('img', {name: 'Bouquet photo'})).toHaveText('photo');
});

test('the ratio sets the shape; a circle is always square', async ({page}) => {
  await openComponent(page, 'ArchFrame');
  const photo = await page.locator('.photo').boundingBox();
  expect(Math.round((photo.width / photo.height) * 100)).toBe(80);
  const circle = await page.locator('.circle').boundingBox();
  expect(Math.round(circle.width)).toBe(Math.round(circle.height));
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'ArchFrame');
});
