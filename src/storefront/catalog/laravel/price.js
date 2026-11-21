// @ts-check

/** @param {unknown} price @returns {import('../product.js').CatalogPrice | null} */
export function currentProductPrice(price) {
  if (!price || typeof price !== 'object' || !('amount' in price) || !('currency' in price))
    return null;
  const {amount, currency} = price;
  if (
    typeof amount !== 'number' ||
    !Number.isFinite(amount) ||
    amount < 0 ||
    typeof currency !== 'string' ||
    !/^[A-Z]{3}$/.test(currency)
  )
    return null;
  return {amount, currency};
}

/** @param {unknown} value */
export function productPriceReferenceId(value) {
  const match = typeof value === 'string' && value.match(/\/api\/catalog\/product-prices\/(\d+)$/);
  if (!match) return null;
  const id = Number(match[1]);
  return Number.isSafeInteger(id) && id > 0 ? id : null;
}
