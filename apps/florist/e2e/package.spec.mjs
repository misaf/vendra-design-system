import {test, expect} from '@playwright/test';
import {hover, openComponent} from './component-test.mjs';

// What holds for the whole package rather than one component (each component's own behaviour is in
// components/<Name>/<Name>.spec.mjs). These borrow a component's fixture to have something on screen.

test.describe('Reduced motion', () => {
  const tipDuration = async page => {
    await hover(page, page.getByRole('button', {name: 'Save'}));
    return page.getByRole('tooltip').evaluate(el => getComputedStyle(el).transitionDuration);
  };

  test('motion tokens keep their durations by default', async ({page}) => {
    await openComponent(page, 'Tooltip');
    await expect.poll(() => tipDuration(page)).toBe('0.14s, 0.14s');
  });

  test('every token-based transition becomes instant', async ({page}) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await openComponent(page, 'Tooltip');
    await expect.poll(() => tipDuration(page)).toBe('1e-05s, 1e-05s');
    const slow = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--dur-slow').trim()
    );
    expect(slow).toBe('.01ms');
  });
});

test.describe('Cascade layers', () => {
  test("an app's own CSS overrides a component class without specificity tricks", async ({
    page
  }) => {
    await openComponent(page, 'Dialog');
    const button = page.getByRole('button', {name: 'Delivery details'});
    // Hovered, the package styles it with .ag-btn--secondary:hover:not(:disabled, [data-pending]),
    // three times the specificity of the app's single unlayered class below, which still wins.
    await hover(page, button);
    const hovered = await button.evaluate(el => getComputedStyle(el).backgroundColor);
    expect(hovered).not.toBe('rgba(0, 0, 0, 0)');
    await page.addStyleTag({content: '.app-brand-button { background-color: rgb(1, 2, 3); }'});
    await button.evaluate(el => el.classList.add('app-brand-button'));
    await expect(button).toHaveCSS('background-color', 'rgb(1, 2, 3)');
  });
});
