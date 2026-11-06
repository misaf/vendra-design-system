// Keep the established locale separators in article metadata and related-story cards.
import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

const articles = [
  {
    id: 'morning-at-the-studio',
    en: '4 min read · 24 Sep 2026',
    fa: '4 دقیقه مطالعه، ۲ مهر ۱۴۰۵',
    relatedEn: ['Seasonal · 5 min read', 'Occasions · 3 min read', 'Flower care · 4 min read'],
    relatedFa: ['فصلی، ۵ دقیقه مطالعه', 'مناسبت‌ها، 3 دقیقه مطالعه', 'نگهداری، 4 دقیقه مطالعه']
  },
  {
    id: 'autumn',
    en: '5 min read · 28 Sep 2026',
    fa: '۵ دقیقه مطالعه، ۶ مهر ۱۴۰۵',
    relatedEn: ['Studio life · 4 min read', 'Occasions · 3 min read', 'Flower care · 4 min read'],
    relatedFa: ['پشت صحنه، 4 دقیقه مطالعه', 'مناسبت‌ها، 3 دقیقه مطالعه', 'نگهداری، 4 دقیقه مطالعه']
  }
];

for (const lang of ['en', 'fa']) {
  for (const article of articles) {
    test(`localized post metadata: ${article.id} (${lang})`, async ({page}) => {
      await openSite(page, 'post', lang, {post: article.id});
      await expect(page.locator('.vf-post-eyebrow')).toHaveText(article[lang]);
      await expect(page.locator('.vf-post-related .ag-blog__meta')).toHaveText(
        lang === 'fa' ? article.relatedFa : article.relatedEn
      );
    });
  }
}

// A retired article's address opens the post that replaced it and writes that address back (#197).
for (const [old, next, title] of [
  ['care', 'bouquet-last-longer', 'Five small habits that make a bouquet last a week'],
  ['bridal', 'bridal-bouquet-guide', 'Choosing a bridal bouquet that feels like you'],
  ['orchids', 'orchid-care', 'Orchid care: water less than you think']
])
  test(`retired post ${old} opens ${next}`, async ({page}) => {
    await openSite(page, 'post', 'en', {post: old});
    await expect(page).toHaveURL(new RegExp(`/journal/${next}/`));
    await expect(page.getByRole('heading', {level: 1})).toHaveText(title);
    await expect(page.getByText('By October the growers')).toHaveCount(0);
  });
