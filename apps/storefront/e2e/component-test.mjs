// For the component specs (components/<Name>/<Name>.spec.mjs): open a component's fixture in
// English or Persian, and the helpers several of them share.
import {expect} from '@playwright/test';

import {scanAxe} from './helpers.mjs';

export {contrast, backgroundBehind, scanAxe, stubMapTiles} from './helpers.mjs';

// Opens components/<name>/<name>.fixture.jsx on the host page, in `lang`, once it has rendered.
export async function openComponent(page, name, lang = 'en') {
  await page.goto(
    '/apps/storefront/e2e/fixtures/component.html?component=' + name + '&lang=' + lang
  );
  await expect(page.locator('#root > *').first()).toBeAttached();
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
}

// Opens app/<layer>/<name>/<name>.fixture.jsx (a storefront molecule, organism or layout) on the
// storefront host page, which loads the storefront's styles, in `lang`, once it has rendered.
export async function openStorefrontComponent(page, name, lang = 'en') {
  await page.goto(
    '/apps/storefront/e2e/fixtures/storefront-component.html?component=' + name + '&lang=' + lang
  );
  await expect(page.locator('#root > *').first()).toBeAttached();
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
}

// React Aria counts hover as pointer input once the mouse has moved on the page, as it always has
// for a person; Playwright's hover jumps straight onto the trigger.
export async function hover(page, locator) {
  await page.mouse.move(1, 1);
  await locator.hover();
}

// No WCAG 2.2 A/AA violations on the component's fixture, in English and in Persian.
export async function expectAccessible(page, name) {
  for (const lang of ['en', 'fa']) {
    await openComponent(page, name, lang);
    expect(await scanAxe(page), lang).toEqual([]);
  }
}

// The same check for a storefront fixture.
export async function expectStorefrontAccessible(page, name) {
  for (const lang of ['en', 'fa']) {
    await openStorefrontComponent(page, name, lang);
    expect(await scanAxe(page), lang).toEqual([]);
  }
}
