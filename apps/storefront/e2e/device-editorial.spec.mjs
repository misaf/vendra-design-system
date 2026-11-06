import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';
import {reachable, tap, shell, finish} from './device-helpers.mjs';

test.use({reducedMotion: 'reduce'});
test.beforeEach(async ({page}, info) => {
  test.skip(!['touch-phone', 'tablet'].includes(info.project.name), 'dedicated touch projects');
  await page.clock.install({time: new Date('2026-10-05T09:00:00+03:30')});
  expect(await page.evaluate(() => navigator.maxTouchPoints)).toBeGreaterThan(0);
});

for (const lang of ['en', 'fa']) {
  const fa = lang === 'fa';
  test(`touch journal pagination and empty filters recover (${lang})`, async ({page}, info) => {
    await openSite(page, 'journal', lang);
    const stories = page.locator('main .ag-blog');
    await expect(stories).toHaveCount(4);
    const pages = page.getByRole('navigation', {name: fa ? 'صفحه‌ها' : 'Pages', exact: true});
    const second = pages.getByRole('link', {name: fa ? 'صفحهٔ ۲' : 'Page 2', exact: true});
    await tap(second);
    await expect(page).toHaveURL(/page=2/);
    await expect(stories).toHaveCount(3);
    await expect(second).toHaveAttribute('aria-current', 'page');
    await page.reload();
    await expect(stories).toHaveCount(3);
    const search = page.getByRole('searchbox', {name: fa ? 'جست‌وجوی مطالب' : 'Search stories'});
    await tap(search);
    await expect(search).toBeFocused();
    await search.fill(fa ? 'پاییز' : 'autumn');
    await expect(page).not.toHaveURL(/page=/);
    await expect(stories).toHaveCount(1);
    await tap(page.locator('.ag-search__clear'));
    await expect(search).toHaveValue('');
    await expect(search).toBeFocused();
    await expect(stories).toHaveCount(4);
    const categories = page.getByRole('group', {name: fa ? 'دسته‌بندی مطالب' : 'Story categories'});
    const last = categories.getByRole('button').last();
    await tap(last);
    await expect(last).toHaveAttribute('aria-pressed', 'true');
    await expect(stories).toHaveCount(0);
    await tap(
      page.getByRole('button', {name: fa ? 'پاک کردن جست‌وجو' : 'Clear search', exact: true})
    );
    await expect(stories).toHaveCount(4);
    await expect(categories.getByRole('button').first()).toHaveAttribute('aria-pressed', 'true');
    await finish(page, lang, info, search);
  });

  test(`touch article returns to its journal (${lang})`, async ({page}, info) => {
    await openSite(page, 'journal', lang);
    const story = page.locator('.vf-journal-featured').getByRole('link');
    const title = await story.textContent();
    await tap(story);
    await expect(page.locator('main h1')).toHaveText(title);
    await expect(page.locator('main h1')).toBeFocused();
    await expect(page).toHaveURL(/\/journal\/[\w-]+\//);
    await page.reload();
    await expect(page.locator('main h1')).toHaveText(title);
    const back = page
      .getByRole('main')
      .getByRole('link', {name: fa ? 'دفترچه' : 'Journal', exact: true});
    await finish(page, lang, info, back);
    await tap(back);
    await expect(page).toHaveURL(/\/journal\//);
    await expect(page.locator('main .ag-blog')).toHaveCount(4);
    await expect(page.locator('main h1')).toBeFocused();
    await shell(page, lang);
  });

  test(`touch FAQ disclosures and contact handoff work (${lang})`, async ({page}, info) => {
    await openSite(page, 'faq', lang);
    const groups = page.locator('main .ag-acc');
    await expect(groups).toHaveCount(3);
    for (const group of await groups.all()) {
      const trigger = group.getByRole('button').first();
      if ((await trigger.getAttribute('aria-expanded')) === 'true') await tap(trigger);
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await tap(trigger);
      await expect(trigger).toHaveAttribute('aria-expanded', 'true');
      const panel = page.locator(`[id="${await trigger.getAttribute('aria-controls')}"]`);
      await expect(panel).toBeVisible();
      expect((await panel.textContent()).trim().length).toBeGreaterThan(0);
      await tap(trigger);
      await expect(trigger).toHaveAttribute('aria-expanded', 'false');
      await expect(panel).toBeHidden();
    }
    const contact = page
      .getByRole('main')
      .getByRole('link', {name: fa ? 'تماس با ما' : 'Contact us', exact: true});
    await finish(page, lang, info, contact);
    await tap(contact);
    await expect(page).toHaveURL(/\/contact\//);
    await expect(page.locator('main h1')).toBeFocused();
    await shell(page, lang);
    // The WhatsApp action is not activated.
  });

  test(`touch policy switching and contents links remain reachable (${lang})`, async ({
    page
  }, info) => {
    await openSite(page, 'policy', lang, {id: 'terms'});
    const policies = page.getByRole('navigation', {name: fa ? 'قوانین' : 'Policies', exact: true});
    const returns = policies.getByRole('link', {
      name: fa ? 'بازگشت و بازپرداخت' : 'Returns & refunds',
      exact: true
    });
    await tap(returns);
    await expect(page).toHaveURL(/\/policy\/returns\//);
    await expect(returns).toHaveAttribute('aria-current', 'page');
    await expect(page.locator('main h1')).toBeFocused();
    const contents = page.getByRole('navigation', {
      name: fa ? 'در این صفحه' : 'On this page',
      exact: true
    });
    await expect(contents).toHaveCSS(
      'position',
      info.project.name === 'touch-phone' ? 'static' : 'sticky'
    );
    const last = contents.getByRole('link').last();
    const hash = await last.getAttribute('href');
    const heading = page.locator(hash).getByRole('heading', {level: 2});
    await tap(last);
    await expect.poll(() => new URL(page.url()).hash).toBe(hash);
    await reachable(heading, {scroll: false});
    await page.reload();
    await expect(returns).toHaveAttribute('aria-current', 'page');
    expect(new URL(page.url()).hash).toBe(hash);
    await finish(page, lang, info, last);
  });
}
