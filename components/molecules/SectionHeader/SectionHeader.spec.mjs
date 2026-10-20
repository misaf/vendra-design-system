import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

test('a real heading at its level, with the accent in it', async ({page}) => {
  await openComponent(page, 'SectionHeader');
  await expect(page.getByRole('heading', {level: 1})).toHaveText('New arrivals');
  await expect(page.getByRole('heading', {level: 2})).toHaveText('Occasions');
  await expect(page.getByRole('link', {name: 'See all'})).toBeVisible();
});

test('arrows call back and disable at the ends', async ({page}) => {
  await openComponent(page, 'SectionHeader');
  const previous = page.getByRole('button', {name: 'Previous'});
  const next = page.getByRole('button', {name: 'Next'});
  await expect(previous).toBeDisabled();
  await next.click();
  await next.click();
  await expect(page.locator('output[data-test=index]')).toHaveText('2');
  await expect(next).toBeDisabled();
  await expect(previous).toBeEnabled();
});

test('arrow names follow the page language', async ({page}) => {
  await openComponent(page, 'SectionHeader', 'fa');
  await expect(page.getByRole('button', {name: 'بعدی'})).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'SectionHeader');
});
