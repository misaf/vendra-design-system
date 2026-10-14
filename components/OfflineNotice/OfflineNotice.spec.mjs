import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent, scanAxe} from '../../templates/_e2e/component-test.mjs';

for (const [lang, offline, online] of [
  ['en', 'You’re offline.', 'You’re back online.'],
  ['fa', 'اتصال اینترنت شما قطع است.', 'دوباره آنلاین هستید.']
])
  test(`says when the connection drops and when it is back (${lang})`, async ({page, context}) => {
    await openComponent(page, 'OfflineNotice', lang);
    const band = page.getByRole('status');
    // Online: in the page, empty and flat, so a later change is announced.
    await expect(band).toHaveText('');
    expect((await band.boundingBox()).height).toBe(0);
    await context.setOffline(true);
    await expect(band).toContainText(offline);
    await context.setOffline(false);
    await expect(band).toHaveText(online);
    await expect(band).toHaveText('');
  });

test('passes axe in English and Persian, offline too', async ({page, context}) => {
  await expectAccessible(page, 'OfflineNotice');
  for (const lang of ['en', 'fa']) {
    await openComponent(page, 'OfflineNotice', lang);
    await context.setOffline(true);
    await expect(page.getByRole('status')).not.toHaveText('');
    expect(await scanAxe(page), lang).toEqual([]);
    await context.setOffline(false);
  }
});
