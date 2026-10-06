// Bilingual signin copy. Edit here, then run npm --prefix templates run build.
// Formatting helpers keep delivery fees and tenant-specific store details current.
function vfCopy(S) {
  return {
    en: {
      inA: 'Sign',
      inB: 'in.',
      inP: 'Enter your mobile number. We’ll text you a five-digit code — no password needed.',
      phone: 'Mobile number',
      phoneErr: 'Enter a valid mobile number.',
      send: 'Send code',
      terms: {before: 'By continuing you agree to our ', terms: 'terms of use', and: ' and ', privacy: 'privacy policy', after: '.'},
      codeA: 'Check your',
      codeB: 'messages.',
      code: 'Five-digit code',
      codeHint: 'Any five digits work in this demo.',
      codeErr: 'Enter all five digits.',
      verify: 'Sign in',
      change: 'Change number',
      resendIn: 'You can ask for a new code in {time}.',
      resend: 'Send a new code',
      resent: 'We sent a new code. It replaces the last one.',
      backToCheckout: 'Back to checkout',
      okA: 'Welcome back,',
      okB: 'Shirin.',
      okP: 'Your orders, addresses and reminders are waiting.',
      toAccount: 'Go to my account',
      codeMessage: phone => 'We sent a code to \u2066' + phone + '\u2069.'
    },
    fa: {
      inA: 'ورود',
      inB: 'به حساب.',
      inP: 'شماره موبایل خود را وارد کنید. یک کد پنج‌رقمی برایتان پیامک می‌کنیم — رمز لازم نیست.',
      phone: 'شماره موبایل',
      phoneErr: 'شماره موبایل معتبر وارد کنید.',
      send: 'ارسال کد',
      terms: {before: 'با ادامه، ', terms: 'شرایط استفاده', and: ' و ', privacy: 'حریم خصوصی', after: ' را می‌پذیرید.'},
      codeA: 'پیامک‌ها را',
      codeB: 'ببینید.',
      code: 'کد پنج‌رقمی',
      codeHint: 'در این نمونه هر پنج رقمی پذیرفته می‌شود.',
      codeErr: 'هر پنج رقم را وارد کنید.',
      verify: 'ورود',
      change: 'تغییر شماره',
      resendIn: 'تا {time} دیگر می‌توانید کد تازه بخواهید.',
      resend: 'ارسال کد تازه',
      resent: 'کد تازه فرستادیم؛ کد قبلی دیگر کار نمی‌کند.',
      backToCheckout: 'بازگشت به ادامه خرید',
      okA: 'خوش برگشتید،',
      okB: 'شیرین.',
      okP: 'سفارش‌ها، آدرس‌ها و یادآورهای شما آماده‌اند.',
      toAccount: 'رفتن به حساب',
      codeMessage: phone => 'کد را به \u2066' + phone + '\u2069 فرستادیم.'
    }
  }[S.lang];
}
