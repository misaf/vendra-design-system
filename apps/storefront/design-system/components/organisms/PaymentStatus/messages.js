// PaymentStatus's built-in wording (accessible names and small labels), read with useMessages.
export const messages = {
  en: {
    bank: 'the bank',
    redirecting: {
      title: 'Taking you to the bank',
      body: 'Pay on {gateway}’s page and you’ll come back here. Keep this tab open.'
    },
    verifying: {
      title: 'Checking your payment',
      body: 'We’re confirming your payment with the bank. This takes a few seconds: don’t refresh or pay again.'
    },
    paid: {
      title: 'Payment received',
      body: 'The bank has confirmed your payment.'
    },
    cancelled: {
      title: 'Payment cancelled',
      body: 'You cancelled at the bank, so nothing was taken. Your bag is still here.'
    },
    failed: {
      title: 'The payment didn’t go through',
      body: 'The bank didn’t take the payment. If money left your account, the bank returns it within 72 hours.'
    },
    pending: {
      title: 'Your payment isn’t confirmed yet',
      body: 'The bank hasn’t confirmed it yet. Please don’t pay again: if money left your account, we confirm your order or the bank returns it within 72 hours.'
    },
    goToBank: 'Go to the bank’s page',
    retry: 'Pay again',
    otherMethod: 'Choose another method',
    checkAgain: 'Check again',
    support: 'Call us',
    amount: 'Amount',
    order: 'Order',
    reference: 'Bank reference'
  },
  fa: {
    bank: 'بانک',
    redirecting: {
      title: 'در حال انتقال به درگاه بانک',
      body: 'پرداخت را در صفحه {gateway} انجام دهید تا به همین‌جا برگردید. این صفحه را نبندید.'
    },
    verifying: {
      title: 'در حال بررسی پرداخت',
      body: 'در حال تأیید پرداخت با بانک هستیم. چند لحظه صبر کنید؛ صفحه را تازه نکنید و دوباره پرداخت نکنید.'
    },
    paid: {
      title: 'پرداخت انجام شد',
      body: 'بانک پرداخت شما را تأیید کرد.'
    },
    cancelled: {
      title: 'پرداخت لغو شد',
      body: 'پرداخت را در درگاه لغو کردید و مبلغی کسر نشد. سبد خرید شما سر جایش است.'
    },
    failed: {
      title: 'پرداخت انجام نشد',
      body: 'بانک پرداخت را نپذیرفت. اگر مبلغی از حساب شما کسر شده، حداکثر تا ۷۲ ساعت به حسابتان برمی‌گردد.'
    },
    pending: {
      title: 'پرداخت شما هنوز تأیید نشده',
      body: 'بانک هنوز پرداخت را تأیید نکرده است. لطفاً دوباره پرداخت نکنید: اگر مبلغی کسر شده، یا سفارش شما تأیید می‌شود یا بانک حداکثر تا ۷۲ ساعت آن را برمی‌گرداند.'
    },
    goToBank: 'رفتن به درگاه بانک',
    retry: 'پرداخت دوباره',
    otherMethod: 'انتخاب روش دیگر',
    checkAgain: 'بررسی دوباره',
    support: 'تماس با ما',
    amount: 'مبلغ',
    order: 'سفارش',
    reference: 'کد پیگیری بانک'
  }
};
