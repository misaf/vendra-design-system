// Persian and Arabic digits → Latin.
export const latin = value =>
  String(value ?? '')
    .replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, digit => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)));

export const phone = value => latin(value || '').replace(/[\s()-]/g, '');
// An Iranian mobile number in its one stored form, 09xxxxxxxxx, however it was typed: 0912…, 912…,
// +98 912…, 98912… or 0098 912…, with Persian or Arabic digits, spaces, dashes, dots or brackets.
// '' when it isn't a mobile number (letters or other characters never pass).
export const mobile = value => {
  const text = latin(value || '').trim();
  if (!text || /[^\d\s+().-]/.test(text)) return '';
  let digits = text.replace(/\D/g, '');
  if (digits.startsWith('0098')) digits = digits.slice(4);
  else if (digits.startsWith('98') && digits.length === 12) digits = digits.slice(2);
  if (/^9\d{9}$/.test(digits)) digits = '0' + digits;
  return /^09\d{9}$/.test(digits) ? digits : '';
};

export const isMobile = value => mobile(value) !== '';
