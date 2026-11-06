import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

for (const lang of ['en', 'fa']) {
  test(`Clay tenant branding (${lang})`, async ({page}, info) => {
    await openSite(page, 'home', lang, {tenant: 'clay'});
    const mobile = info.project.name === 'mobile';
    const header = page.locator(mobile ? '.vf-shell-mobile-brand' : '.vf-shell-desktop-brand');
    const logo = header.locator('img');
    await expect(logo).toHaveAttribute(
      'src',
      new RegExp(mobile ? '/clay/mark.svg$' : '/clay/logo.svg$')
    );
    await expect(logo).toHaveAttribute('alt', lang === 'fa' ? 'گل‌فروشی کلی' : 'Clay Florist');
    await expect.poll(() => logo.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
    expect(await logo.evaluate(el => el.getBoundingClientRect().height)).toBeLessThanOrEqual(36);
    const bounds = await logo.boundingBox();
    const container = await header.boundingBox();
    expect(bounds.width).toBeLessThanOrEqual(container.width);
    expect(bounds.height).toBeLessThanOrEqual(container.height);
    await info.attach(`brand-header-${lang}`, {
      body: await header.screenshot(),
      contentType: 'image/png'
    });
    const footer = page.locator('.vf-shell-footer-brand');
    await expect(footer.locator('img')).toHaveAttribute('src', /clay\/logo-on-dark.svg$/);
    await expect
      .poll(() => footer.locator('img').evaluate(el => el.complete && el.naturalWidth > 0))
      .toBe(true);
    await info.attach(`brand-footer-${lang}`, {
      body: await footer.screenshot(),
      contentType: 'image/png'
    });
    await expect(page.locator('link[rel=icon]')).toHaveAttribute('href', /clay\/favicon-32.png$/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      new RegExp(`/clay/og-${lang}.png$`)
    );
    const manifestUrl = new URL(
      await page.locator('link[rel=manifest]').getAttribute('href'),
      page.url()
    ).href;
    const manifest = await (await page.request.get(manifestUrl)).json();
    expect(manifest.lang).toBe(lang);
    for (const icon of manifest.icons)
      expect((await page.request.get(new URL(icon.src, manifestUrl).href)).ok()).toBe(true);
    // A new tenant clears every previous brand asset and restores text.
    await openSite(page, 'home', lang, {tenant: 'fern'});
    await expect(header.locator('img')).toHaveCount(0);
    await expect(header).toHaveText(lang === 'fa' ? 'گل‌فروشی وندرا' : 'Vendra Florist');
    await expect(page.locator('link[rel=icon]')).toHaveAttribute(
      'href',
      /assets\/icons\/favicon-32.png$/
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      new RegExp(`/social/og-default-${lang}.png$`)
    );
  });
}

test('failed tenant logo falls back to the localized store name', async ({page}, info) => {
  await page.route('**/assets/tenants/clay/*.svg', route => route.abort());
  await openSite(page, 'home', 'en', {tenant: 'clay'});
  const header = page.locator(
    info.project.name === 'mobile' ? '.vf-shell-mobile-brand' : '.vf-shell-desktop-brand'
  );
  await expect(header).toHaveText('Clay Florist');
  await expect(header.locator('img')).toHaveCount(0);
});
