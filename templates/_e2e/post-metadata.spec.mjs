// Keep the established locale separators in article metadata and related-story cards.
import {test, expect} from '@playwright/test';
import {openSite} from './helpers.mjs';

const articles = [
  {
    id: 'morning-at-the-studio',
    en: '4 min read · 24 Sep 2026',
    fa: '4 دقیقه مطالعه، ۲ مهر ۱۴۰۵',
    relatedEn: ['Seasonal · 5 min read', 'Flower care · 3 min read', 'Weddings · 6 min read'],
    relatedFa: ['فصلی، ۵ دقیقه مطالعه', 'نگهداری، ۳ دقیقه مطالعه', 'عروسی، ۶ دقیقه مطالعه']
  },
  {
    id: 'autumn',
    en: '5 min read · 28 Sep 2026',
    fa: '۵ دقیقه مطالعه، ۶ مهر ۱۴۰۵',
    relatedEn: ['Flower care · 3 min read', 'Weddings · 6 min read', 'Flower care · 4 min read'],
    relatedFa: ['نگهداری، ۳ دقیقه مطالعه', 'عروسی، ۶ دقیقه مطالعه', 'نگهداری، ۴ دقیقه مطالعه']
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
