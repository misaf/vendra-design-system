// Bilingual server-error copy. Edit here, then run npm --prefix templates run build.
export function vfCopy(S) {
  return {
    en: {
      code: '500',
      hA: 'Something went wrong',
      hB: 'on our side.',
      hP: 'This page didn’t open, and it’s nothing you did. Try again in a minute, or call us: we’ll take your order by phone.',
      retry: 'Try again',
      home: 'Back home',
      call: 'Call {phone}'
    },
    fa: {
      code: '۵۰۰',
      hA: 'مشکلی پیش آمد',
      hB: 'از سمت ما.',
      hP: 'این صفحه باز نشد و تقصیر شما نیست. یک دقیقه دیگر دوباره امتحان کنید یا با ما تماس بگیرید تا سفارشتان را تلفنی ثبت کنیم.',
      retry: 'تلاش دوباره',
      home: 'صفحه اصلی',
      call: 'تماس با {phone}'
    }
  }[S.lang];
}
