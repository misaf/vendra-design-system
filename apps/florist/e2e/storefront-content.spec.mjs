import {test, expect} from '@playwright/test';
import {openSite, openFooterGroup, scanAxe} from './helpers.mjs';

test('home occasions scroll as a carousel', async ({page}, info) => {
  await openSite(page, 'home', 'en');
  const row = page.getByRole('region', {name: /^Occasions/});
  await expect(row.locator('.ag-cat')).not.toHaveCount(0);
  if (info.project.name === 'desktop') {
    await expect(
      page.getByRole('button', {name: 'More occasions', includeHidden: true})
    ).toBeHidden();
  }
  expect(await scanAxe(page)).toEqual([]);
});

test('the footer opens each policy and the policy page switches between them', async ({page}) => {
  await openSite(page, 'home', 'fa');
  const help = await openFooterGroup(page, 'راهنما');
  for (const name of [
    'ارسال و تحویل',
    'بازگشت و بازپرداخت',
    'حریم خصوصی',
    'شرایط استفاده',
    'دسترس‌پذیری'
  ])
    await expect(help.getByRole('link', {name})).toBeVisible();
  await help.getByRole('link', {name: 'شرایط استفاده'}).click();
  await expect(page).toHaveURL(/\/policy\/terms\//);
  await expect(page.getByRole('heading', {level: 1})).toHaveText('شرایط استفاده');
  const switcher = page.getByRole('navigation', {name: 'قوانین'});
  await expect(switcher.getByRole('link', {name: 'شرایط استفاده'})).toHaveAttribute(
    'aria-current',
    'page'
  );
  expect(await scanAxe(page)).toEqual([]);
  await switcher.getByRole('link', {name: 'بازگشت و بازپرداخت'}).click();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('بازگشت و بازپرداخت');
  await expect(page.locator('main')).toContainText('۲۴ ساعت');
});

test('the accessibility statement says what we aim for and how to reach us', async ({page}) => {
  await openSite(page, 'policy', 'en', {id: 'accessibility'});
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Accessibility');
  const main = page.getByRole('main');
  await expect(main).toContainText('WCAG) 2.2 at level AA');
  await expect(main.getByRole('heading', {name: 'Known limits'})).toBeVisible();
  await expect(main).toContainText('+98 912 933 3034');
  expect(await scanAxe(page)).toEqual([]);
});

test('policies quote the live delivery rules', async ({page}) => {
  await openSite(page, 'policy', 'en', {id: 'shipping'});
  await expect(page.locator('main li')).toContainText([
    'Karaj central: 80,000 Toman, same day when you order by 18:00'
  ]);
  await expect(page.locator('main')).toContainText('on orders over 5,000,000 Toman');
});

test('an unknown policy is not found', async ({page}) => {
  await openSite(page, 'policy', 'en', {id: 'nope'});
  await expect(page.getByRole('heading', {level: 1})).toHaveText(/^This page has\s*wilted\.$/);
  const help = await openFooterGroup(page, 'Help');
  await expect(help.getByRole('link', {name: 'Terms of use', exact: true})).toBeVisible();
});

test('sign-in links to the terms and privacy policy', async ({page}) => {
  await openSite(page, 'signin', 'en');
  // A plain link to another view switches it in place, without reloading the site.
  await page.evaluate(() => (window.__vfSameDocument = true));
  await page.getByRole('main').getByRole('link', {name: 'privacy policy'}).click();
  await expect(page.getByRole('heading', {level: 1})).toHaveText('Privacy');
  expect(await page.evaluate(() => window.__vfSameDocument)).toBe(true);
});

test('the home page shows the categories, ready-made designs, weddings and the latest posts', async ({
  page
}) => {
  await openSite(page, 'home', 'en');
  // The categories, the ready-made designs, occasions, new designs, weddings, the journal and the
  // newsletter
  // (the announcement carries the delivery line).
  const order = await page
    .locator('main > section')
    .evaluateAll(sections => sections.map(section => section.className.match(/vf-home-[a-z]+/)[0]));
  expect(order).toEqual([
    'vf-home-top',
    'vf-home-featured',
    'vf-home-categories',
    'vf-home-arrivals',
    'vf-home-weddings',
    'vf-home-journal',
    'vf-home-newsletter'
  ]);
  const featured = page.locator('.vf-home-featured');
  await expect(featured.getByRole('heading', {name: 'Ready to send.'})).toBeVisible();
  await expect(featured.getByText('Ready', {exact: true})).toHaveCount(4);
  await expect(featured.locator('.ag-product')).toHaveCount(4);
  await expect(featured.locator('.ag-product').first()).toContainText('VF-4CJ6ZB');
  const journal = page.locator('.vf-home-journal');
  await expect(journal.getByRole('heading', {level: 3})).toHaveText([
    'What’s in season this autumn',
    'A morning at the Vendra workbench',
    'Flowers aren’t only for special days'
  ]);
  // Every category, in the store's order, as a row of circles; each opens its shop filter.
  const categories = page.getByRole('region', {name: /^Categories/});
  await expect(categories.getByRole('link')).toHaveCount(12);
  await expect(categories.getByRole('link').first()).toHaveAccessibleName('Bouquets');
  await expect(categories.getByRole('link', {name: 'Plants'})).toHaveAttribute(
    'href',
    /\/shop\/plants\//
  );
  await expect(
    page.locator('.vf-home-weddings').getByRole('link', {name: 'Plan your wedding flowers'})
  ).toHaveAttribute('href', /\/weddings\//);
  expect(await scanAxe(page)).toEqual([]);
  await journal.getByRole('link', {name: /A morning at the Vendra workbench/}).click();
  await expect(page).toHaveURL(/\/journal\/morning-at-the-studio\//);
});

test('the home page newsletter checks the address and confirms the sign-up', async ({page}) => {
  await openSite(page, 'home', 'en');
  const form = page.getByRole('region', {name: 'Letters from the studio'});
  await form.getByRole('button', {name: 'Subscribe'}).click();
  const email = page.locator('#vf-news-email');
  await expect(email).toBeFocused();
  await expect(email).toHaveAttribute('aria-invalid', 'true');
  expect(await scanAxe(page)).toEqual([]);
  await email.fill('rose@example.com');
  await email.press('Enter');
  // The address is wrapped in bidi isolates so it reads correctly inside Persian text.
  const done = page.locator('#vf-news-done');
  await expect(done).toHaveText(/rose@example\.com\u2069? was not subscribed/);
  await expect(done).toBeFocused();
  await page.reload();
  await expect(done).toBeVisible();
  await expect(page.locator('#vf-news-email')).toHaveCount(0);
});

for (const lang of ['en', 'fa']) {
  test(`newsletter pending announcements remain named after completion (${lang})`, async ({
    page
  }) => {
    await page.addInitScript(() => {
      let runtime;
      const submission = (window.__newsletterSubmission = {calls: 0});
      Object.defineProperty(window, '__vfRuntime', {
        configurable: true,
        get: () => runtime,
        set: value => {
          runtime = value;
          const api = value.api;
          api.newsletter = () => {
            submission.calls++;
            return new Promise((resolve, reject) => {
              submission.resolve = resolve;
              submission.reject = reject;
            });
          };
        }
      });
    });
    await openSite(page, 'home', lang);
    const section = page.locator('.vf-home-newsletter');
    const email = section.locator('#vf-news-email');
    const submitName = lang === 'en' ? 'Subscribe' : 'عضویت';
    const submit = section.getByRole('button', {name: submitName, exact: true});
    // Button announces its pending state with its own status text, not React Aria's announcer.
    const pending = submit.locator('[role="status"]');
    const pendingText = lang === 'en' ? 'Subscribing…' : 'در حال عضویت…';
    const announcements = page.locator('[data-live-announcer] [role="img"]');
    await email.fill('rose@example.com');
    await submit.click();
    await expect(pending).toHaveText(pendingText);
    await email.press('Enter');
    expect(await page.evaluate(() => window.__newsletterSubmission.calls)).toBe(1);
    await page.evaluate(() =>
      window.__newsletterSubmission.reject(new Error('Controlled failure'))
    );
    await expect(email).toBeFocused();
    await expect(email).toHaveValue('rose@example.com');
    await expect(email).toHaveAttribute('aria-invalid', 'true');
    await submit.click();
    expect(await page.evaluate(() => window.__newsletterSubmission.calls)).toBe(2);
    await expect(pending).toHaveText(pendingText);
    await page.evaluate(() => window.__newsletterSubmission.resolve());
    await expect(section.locator('#vf-news-done')).toBeFocused();
    await expect(submit).toHaveCount(0);
    // Any live announcement still retained after the button unmounts must keep its name.
    for (const announcement of await announcements.all()) {
      await expect(announcement).toHaveAccessibleName(submitName);
    }
    expect(await scanAxe(page)).toEqual([]);
    await page.reload();
    await expect(section.locator('#vf-news-done')).toContainText('rose@example.com');
    await expect(email).toHaveCount(0);
  });
}

test('the newsletter fills in a signed-in customer’s email', async ({page}) => {
  await page.addInitScript(() => {
    localStorage.setItem('vf-account-phone', '09125649438');
    localStorage.setItem(
      'vf-account:09125649438',
      JSON.stringify({
        profile: {name: 'Shirin', email: 'shirin@example.com', locale: 'en', sms: true},
        addresses: [],
        reminders: []
      })
    );
  });
  await openSite(page, 'home', 'fa');
  await expect(page.locator('#vf-news-email')).toHaveValue('shirin@example.com');
  await expect(page.getByRole('heading', {name: 'نامه‌های استودیو'})).toBeVisible();
});

test('the footer lists shop and studio links, social links, contact details and the credit', async ({
  page
}) => {
  await openSite(page, 'home', 'en');
  const footer = page.getByRole('contentinfo');
  await openFooterGroup(page, 'Shop');
  await footer.getByRole('navigation', {name: 'Shop'}).getByRole('link', {name: 'Orchids'}).click();
  await expect(page).toHaveURL(/\/shop\/orchids\//);
  await openFooterGroup(page, 'The studio');
  await expect(
    footer.getByRole('navigation', {name: 'The studio'}).getByRole('link', {name: 'Journal'})
  ).toBeVisible();
  const social = footer.getByRole('list', {name: 'Follow and message us'});
  await expect(social.getByRole('link')).toHaveCount(3);
  await expect(social.getByRole('link', {name: /^Instagram/})).toHaveAttribute('target', '_blank');
  const directions = footer.getByRole('list', {name: 'Get directions'});
  await expect(directions.getByRole('link')).toHaveText(['Google Maps', 'Neshan', 'Balad']);
  await expect(directions.getByRole('link', {name: 'Google Maps'})).toHaveAttribute(
    'href',
    /destination=35\.8352,50\.975/
  );
  await expect(footer).toContainText(
    '© ' + new Date().getFullYear() + ' Vendra Florist. All rights reserved.'
  );
  await expect(footer.getByRole('link', {name: 'Misaf', exact: true})).toHaveAttribute(
    'href',
    'https://github.com/misaf'
  );
  // The issuers check the referring site, so the seals keep it.
  for (const name of ['eNamad trust seal', 'Samandehi registration']) {
    const seal = footer.getByRole('link', {name});
    await expect(seal).toHaveAttribute('referrerpolicy', 'origin');
    await expect(seal).toHaveAttribute('rel', 'noopener');
  }
  // Check the page's stretched product-card hit targets with its content on screen, rather than
  // clipped under the sticky header after navigating through the footer. Footer controls also
  // have their own keyboard, touch and axe coverage in footer.spec.mjs.
  await page.evaluate(() => window.scrollTo(0, 0));
  expect(await scanAxe(page)).toEqual([]);
});

test('the Persian footer dates the copyright in the Persian calendar', async ({page}) => {
  await openSite(page, 'home', 'fa');
  const year = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {year: 'numeric'}).format(new Date());
  await expect(page.getByRole('contentinfo')).toContainText(
    '© ' + year + ' گل‌فروشی وندرا. همه حقوق محفوظ است.'
  );
  expect(await scanAxe(page)).toEqual([]);
});

test('the journal splits its stories across pages, keeping the page in the URL', async ({page}) => {
  await openSite(page, 'journal', 'en');
  const stories = page.locator('main .ag-blog');
  const pages = page.getByRole('navigation', {name: 'Pages'});
  await expect(stories).toHaveCount(4);
  await expect(pages.getByRole('link', {name: 'Page 1'})).toHaveAttribute('aria-current', 'page');
  await expect(pages.getByRole('link', {name: 'Previous page'})).toHaveAttribute(
    'aria-disabled',
    'true'
  );
  await pages.getByRole('link', {name: 'Page 2'}).click();
  await expect(page).toHaveURL(/\/journal\/\?.*page=2/);
  await expect(stories).toHaveCount(3);
  await expect(pages.getByRole('link', {name: 'Page 2'})).toHaveAttribute('aria-current', 'page');
  await page.reload();
  await expect(stories).toHaveCount(3);
  // A search starts again from the first page.
  await page.getByRole('searchbox', {name: 'Search stories'}).fill('a');
  await expect(page).not.toHaveURL(/page=/);
  // Persian pages count in Persian digits.
  await openSite(page, 'journal', 'fa');
  await expect(
    page.getByRole('navigation', {name: 'صفحه‌ها'}).getByRole('link', {name: 'صفحهٔ ۲'})
  ).toHaveText('۲');
});
