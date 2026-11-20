// A bag line from an API OrderLine. Its metadata carries `token`, `size`, comma-separated `addons`
// and `cardMessage`, matched against `sizes` and `addons` ({id, …}); `describe(product, size, addons,
// lang)` writes the line's detail text.
export const lineFromApi = (line, {products, sizes, addons, placeholder, describe}) => {
  const product = products.find(item => item.apiId === line.sellableId);
  const meta = line.metadata || {};
  const token = meta.token || (product ? product.id : line.name);
  const size = meta.size || null;
  const chosen = (meta.addons || '').split(',').filter(Boolean);
  const sizeChoice = sizes.find(item => item.id === size) || null;
  const addonChoices = addons.filter(item => chosen.includes(item.id));
  const productId = product ? product.id : token;
  return {
    id: productId + (size ? '-' + size : '') + (chosen.length ? '-' + chosen.join('+') : ''),
    productId,
    token,
    size,
    addons: chosen,
    unit: line.unitAmount,
    qty: line.quantity,
    image: product ? product.image : {src: placeholder},
    ...(meta.cardMessage ? {card: meta.cardMessage} : {}),
    en: [token, product ? describe(product, sizeChoice, addonChoices, 'en') : ''],
    fa: [token, product ? describe(product, sizeChoice, addonChoices, 'fa') : '']
  };
};
