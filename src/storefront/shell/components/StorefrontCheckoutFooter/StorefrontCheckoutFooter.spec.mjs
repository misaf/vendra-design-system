import {test, expect} from '@playwright/test';
import {openStorefrontComponent, scanAxe} from '../../../../../e2e/component-test.mjs';

for (const lang of ['en', 'fa']) {
  test(`enclosed footer exposes policy, contact, trust and consent controls (${lang})`, async ({
    page
  }) => {
    await page.setViewportSize({width: 320, height: 720});
    await openStorefrontComponent(page, 'StorefrontCheckoutFooter', lang);
    const fa = lang === 'fa';
    const footer = page.getByRole('contentinfo');
    await expect(footer.getByRole('link', {name: fa ? 'حریم خصوصی' : 'Privacy'})).toHaveAttribute(
      'href',
      '#privacy'
    );
    await expect(footer.getByRole('link', {name: fa ? 'تماس' : 'Contact'})).toHaveAttribute(
      'href',
      '#contact'
    );
    await expect(footer.locator('a[href="https://enamad.ir/"]')).toHaveAttribute(
      'referrerpolicy',
      'origin'
    );
    await footer
      .getByRole('button', {name: fa ? 'تنظیمات کوکی' : 'Cookie settings'})
      .press('Enter');
    await expect(page.getByRole('status')).toHaveText(fa ? 'تنظیمات باز است' : 'Settings opened');
    expect(await scanAxe(page)).toEqual([]);
  });
}
