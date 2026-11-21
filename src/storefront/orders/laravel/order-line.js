// @ts-check

import {decodeLineConfiguration} from '../../cart/laravel/selection-metadata.js';

/** @param {unknown} value @returns {value is Record<string, unknown>} */
function isOrderLineRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** @param {unknown} value @returns {value is number} */
function isLineInteger(value) {
  return typeof value === 'number' && Number.isSafeInteger(value);
}

/**
 * @param {unknown} value
 * @returns {import('../purchase.js').PurchasedOrderLine | null}
 */
export function decodePurchasedOrderLine(value) {
  if (!isOrderLineRecord(value)) return null;
  const {id, sellableType, sellableId, name, quantity, unitAmount, lineAmount, metadata} = value;
  if (
    !isLineInteger(id) ||
    typeof sellableType !== 'string' ||
    !isLineInteger(sellableId) ||
    typeof name !== 'string' ||
    !isLineInteger(quantity) ||
    !isLineInteger(unitAmount) ||
    !isLineInteger(lineAmount)
  )
    return null;
  return {
    id,
    sellableType,
    sellableId,
    name,
    quantity,
    unitAmount,
    lineAmount,
    ...decodeLineConfiguration(metadata)
  };
}
