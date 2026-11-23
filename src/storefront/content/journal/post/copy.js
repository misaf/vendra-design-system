// Bilingual post copy. Edit here, then run npm run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
import {vfJournalImage} from '../../journal-images.js';
import {vfRouteUrl} from '../../../shell/routing.js';
import {vfArticleData} from '../../../shell/structured-data.js';

export function vfPostHead(post, L, cover = post && vfJournalImage(post.image)) {
  return post
    ? {
        image: cover && {src: cover.src, alt: post[L][0], width: cover.width, height: cover.height},
        description: post[L][1],
        type: 'article',
        structuredData: [
          vfArticleData({
            headline: post[L][0],
            description: post[L][1],
            image: cover?.src,
            published: post.publishedAt,
            url: vfRouteUrl({lang: L, view: 'post', post: post.id}),
            lang: L
          })
        ]
      }
    : null;
}

export function vfCopy(S) {
  const result = {
    en: {
      back: 'Journal',
      shopIt: 'Shop all flowers',
      copy: 'Copy link',
      copied: 'Link copied',
      copyFailed: 'Couldn’t copy link',
      moreA: 'More from',
      moreB: 'the journal.'
    },
    fa: {
      back: 'دفترچه',
      shopIt: 'خرید همه گل‌ها',
      copy: 'کپی پیوند',
      copied: 'پیوند کپی شد',
      copyFailed: 'پیوند کپی نشد',
      moreA: 'بیشتر از',
      moreB: 'دفترچه.'
    }
  }[S.lang];
  return {
    ...result,
    migration: {
      en: {
        missing: 'This story has moved',
        back: 'Back to the journal',
        loading: 'Loading story'
      },
      fa: {
        missing: 'این مطلب جابه‌جا شده است',
        back: 'بازگشت به دفترچه',
        loading: 'در حال بارگذاری مطلب'
      }
    }[S.lang]
  };
}
