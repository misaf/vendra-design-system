// Fills placeholders in text from the API: {fee:<zone>}, {cutoff:<zone>} and {freeDeliveryFrom}.
// `values` gives each one's text: {fee(zoneId), cutoff(zoneId), freeDeliveryFrom()}.
export const fillText = (text, values) =>
  String(text || '')
    .replace(/\{fee:([\w-]+)\}/g, (_, id) => values.fee(id))
    .replace(/\{cutoff:([\w-]+)\}/g, (_, id) => values.cutoff(id))
    .replace(/\{freeDeliveryFrom\}/g, () => values.freeDeliveryFrom());
