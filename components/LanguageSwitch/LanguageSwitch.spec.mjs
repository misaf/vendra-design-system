import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('one pressed toggle per language, each in its own language', async ({page}) => {
  await openComponent(page, 'LanguageSwitch');
  const group = page.getByRole('group', {name: 'Language'});
  const persian = group.getByRole('button', {name: 'فا'});
  await expect(group.getByRole('button', {name: 'EN'})).toHaveAttribute('aria-pressed', 'true');
  await expect(persian).toHaveAttribute('lang', 'fa');
  await persian.click();
  await expect(page.locator('output[data-test=language]')).toHaveText('fa');
  await expect(persian).toHaveAttribute('aria-pressed', 'true');
});

test('the group is named in the page language', async ({page}) => {
  await openComponent(page, 'LanguageSwitch', 'fa');
  await expect(page.getByRole('group', {name: 'زبان'})).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'LanguageSwitch');
});
