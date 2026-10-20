import {test, expect} from '@playwright/test';
import {expectAccessible, openComponent} from '../../../templates/_e2e/component-test.mjs';

for (const lang of ['en', 'fa'])
  test(`arrows page in reading direction and disable at the ends (${lang})`, async ({page}) => {
    await page.emulateMedia({reducedMotion: 'reduce'});
    await openComponent(page, 'Carousel', lang);
    const names = lang === 'fa' ? ['قبلی', 'بعدی'] : ['Previous', 'Next'];
    const previous = page.getByRole('button', {name: names[0], exact: true});
    const next = page.getByRole('button', {name: names[1], exact: true});
    const track = page.getByRole('region', {name: 'New arrivals'});
    await expect(previous).toBeDisabled();
    await expect(next).toBeEnabled();
    await next.click();
    await expect(previous).toBeEnabled();
    const moved = await track.evaluate(el => Math.abs(el.scrollLeft));
    expect(moved).toBeGreaterThan(100);
    // The arrows follow the scroll a beat behind, so page by the track's own position (the
    // component's rule: the end is within 1px of the far edge), waiting for each page to land.
    const position = () => track.evaluate(el => Math.abs(el.scrollLeft));
    const atEnd = () =>
      track.evaluate(el => Math.abs(el.scrollLeft) >= el.scrollWidth - el.clientWidth - 1);
    for (let i = 0; i < 6 && !(await atEnd()); i++) {
      const before = await position();
      await next.click();
      await expect.poll(position).toBeGreaterThan(before);
    }
    await expect(next).toBeDisabled();
    await previous.click();
    await expect(next).toBeEnabled();
  });

test('the track is a named, focusable region that scrolls with the keyboard', async ({page}) => {
  await openComponent(page, 'Carousel');
  const track = page.getByRole('region', {name: 'New arrivals'});
  await track.focus();
  await expect(track).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);
});

test('prints every item, without its arrows', async ({page}) => {
  await openComponent(page, 'Carousel');
  await page.emulateMedia({media: 'print'});
  await expect(page.getByRole('button', {name: 'Next'})).toBeHidden();
  const track = page.getByRole('region', {name: 'New arrivals'});
  expect(await track.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
  // Every item lies within the track's width (wrapped onto rows, not scrolled out of sight).
  const box = await track.boundingBox();
  for (const name of ['One', 'Six']) {
    const item = await track.getByText(name).boundingBox();
    expect(item.x).toBeGreaterThanOrEqual(box.x - 1);
    expect(item.x + item.width).toBeLessThanOrEqual(box.x + box.width + 1);
  }
});

test('passes axe in English and Persian', async ({page}) => {
  await expectAccessible(page, 'Carousel');
});
