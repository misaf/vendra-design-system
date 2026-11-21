// @ts-check

/** @param {unknown} value @returns {value is Record<string, unknown>} */
function isSelectionMetadata(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/** @param {unknown} metadata */
export function decodeLineConfiguration(metadata) {
  const {token, size, addons, cardMessage} = isSelectionMetadata(metadata) ? metadata : {};
  return {
    productCode: typeof token === 'string' && token ? token : null,
    size: typeof size === 'string' && size ? size : null,
    selectedAddOns:
      typeof addons === 'string'
        ? addons
            .split(',')
            .map(code => code.trim())
            .filter(Boolean)
        : [],
    cardMessage: typeof cardMessage === 'string' ? cardMessage : null
  };
}
