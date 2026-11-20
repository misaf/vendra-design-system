// Only field violations are suitable for inline display. Other response details can be internal.
export function vfApiFields(body) {
  const entries = Array.isArray(body?.violations) ? body.violations : [];
  return Object.fromEntries(
    entries
      .filter(
        item =>
          typeof item?.propertyPath === 'string' &&
          item.propertyPath.trim() &&
          typeof item.message === 'string' &&
          item.message.trim()
      )
      .map(({propertyPath, message}) => [propertyPath.trim(), message.trim()])
  );
}

const INQUIRY_FIELDS = {name: 'name', phone: 'phone', email: 'email', message: 'msg'};

export function vfInquiryFailure(error, lang) {
  const copy = {
    en: {
      offline: 'You’re offline. Reconnect and try sending again.',
      network: 'The connection was lost. Check your connection and try sending again.',
      timeout: 'The studio took too long to respond. Try sending again.',
      validation: 'Review your message and details, then try sending again.',
      conflict: 'Your message may still be processing. Wait a moment before trying again.',
      server: 'The studio’s service is temporarily unavailable. Try sending again later.'
    },
    fa: {
      offline: 'آفلاین هستید. پس از اتصال دوباره پیام را بفرستید.',
      network: 'ارتباط قطع شد. اتصال را بررسی کنید و دوباره پیام را بفرستید.',
      timeout: 'پاسخ استودیو طول کشید. دوباره پیام را بفرستید.',
      validation: 'پیام و اطلاعات خود را بررسی کنید و دوباره بفرستید.',
      conflict: 'ممکن است پیام هنوز در حال پردازش باشد. کمی صبر کنید و دوباره تلاش کنید.',
      server: 'سرویس استودیو موقتاً در دسترس نیست. بعداً دوباره پیام را بفرستید.'
    }
  }[lang];
  const fields = {};
  let unmapped = false;
  for (const [path, message] of Object.entries(error?.fields || {})) {
    if (Object.hasOwn(INQUIRY_FIELDS, path)) fields[INQUIRY_FIELDS[path]] = message;
    else unmapped = true;
  }
  const apiError =
    unmapped || !Object.keys(fields).length
      ? Object.hasOwn(copy, error?.kind)
        ? copy[error.kind]
        : copy.server
      : '';
  return {fields, apiError};
}
