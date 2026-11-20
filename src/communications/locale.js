// Use the customer account language, the checkout guest language, or Persian.
const ok = l => l === 'en' || l === 'fa';
export const localeFor = (customer, order) =>
  ok(customer && customer.preferredLocale)
    ? customer.preferredLocale
    : ok(order && order.preferredLocale)
      ? order.preferredLocale
      : 'fa';
