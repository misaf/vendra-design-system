import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../templates/_e2e/component-test.mjs';

test('keeps the referrer the issuer checks, and names itself when the image fails', async ({
  page
}) => {
  await openComponent(page, 'TrustSeal');
  const enamad = page.getByRole('link', {name: 'eNamad trust seal'});
  await expect(enamad).toHaveAttribute('referrerpolicy', 'origin');
  await expect(enamad).toHaveAttribute('rel', 'noopener');
  await expect(enamad).toHaveAttribute('target', '_blank');
  // /missing-seal.png fails to load, so the name shows in its place.
  await expect(enamad).toHaveText('eNamad trust seal');
  await expect(enamad.locator('img')).toHaveCount(0);
  await expect(page.getByRole('link', {name: 'Samandehi registration'})).toHaveAttribute(
    'href',
    'https://samandehi.ir/'
  );
});

test('a loaded image keeps the referrer too and carries the name as its alt', async ({page}) => {
  await openComponent(page, 'TrustSeal');
  const image = page.getByRole('link', {name: 'Our eNamad seal'}).locator('img');
  await expect(image).toHaveAttribute('alt', 'Our eNamad seal');
  await expect(image).toHaveAttribute('referrerpolicy', 'origin');
});

test('names follow the page language', async ({page}) => {
  await openComponent(page, 'TrustSeal', 'fa');
  await expect(page.getByRole('link', {name: 'نشان ساماندهی'})).toBeVisible();
  await expect(page.getByRole('link', {name: 'نماد اعتماد الکترونیکی'})).toBeVisible();
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'TrustSeal');
});
