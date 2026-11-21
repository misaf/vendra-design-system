// Display a purchased line in the storefront's receipt and tracking views.
export const purchasedLineView = (line, {products, sizes, addons, placeholder, describe}) => {
  const product =
    line.sellableType === 'product' ? products.find(item => item.apiId === line.sellableId) : null;
  const token = line.productCode || product?.id || '';
  const size = line.size;
  const chosen = line.selectedAddOns;
  const sizeChoice = sizes.find(item => item.id === size) || null;
  const addonChoices = addons.filter(item => chosen.includes(item.id));
  const productId = product ? product.id : token;
  return {
    id: productId
      ? productId + (size ? '-' + size : '') + (chosen.length ? '-' + chosen.join('+') : '')
      : 'order-line-' + line.id,
    productId,
    token,
    size,
    addons: chosen,
    acceptedName: line.name,
    acceptedAmount: line.lineAmount,
    unit: line.unitAmount,
    qty: line.quantity,
    image: product ? product.image : {src: placeholder},
    ...(line.cardMessage ? {card: line.cardMessage} : {}),
    en: [token, product ? describe(product, sizeChoice, addonChoices, 'en') : ''],
    fa: [token, product ? describe(product, sizeChoice, addonChoices, 'fa') : '']
  };
};

// Earlier receipts stored the displayed cart line. Render those records with their stored values.
export function orderLineDisplay(line, locale) {
  return {
    name: line.acceptedName ?? (line.token || line.productId || line.id),
    detail: line[locale][1],
    quantity: line.qty,
    amount: line.acceptedAmount ?? line.unit * line.qty
  };
}

export function snapshotDemoOrderLine(line) {
  return {
    ...line,
    addons: line.addons && [...line.addons],
    en: [...line.en],
    fa: [...line.fa],
    acceptedName: line.en[0],
    acceptedAmount: line.unit * line.qty
  };
}
