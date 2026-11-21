// @ts-check

/**
 * @param {import('./selection.js').CartSelection} selection
 * @param {import('../catalog/product.js').CatalogProduct | null} product
 * @returns {import('./selection.js').CartReviewLine}
 */
export function reviewCartSelection(selection, product) {
  const offer =
    product && selection.sellableType === 'product' && product.id === selection.sellableId
      ? {name: product.name, price: product.price, inStock: product.inStock}
      : null;
  return {selection, offer};
}
