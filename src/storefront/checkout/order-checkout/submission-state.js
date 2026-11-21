const DELIVERY_FIELDS = new Map([
  ['recipientName', 'name'],
  ['recipientPhone', 'phone'],
  ['addressId', 'address'],
  ['latitude', 'location'],
  ['longitude', 'location'],
  ['deliveryDate', 'date'],
  ['deliverySlotId', 'slot']
]);

function checkoutValidation(fields) {
  const recovery = {delivery: {}, bag: '', payment: ''};
  for (const [path, message] of Object.entries(fields || {})) {
    if (DELIVERY_FIELDS.has(path)) recovery.delivery[DELIVERY_FIELDS.get(path)] = message;
    if (/^(?:cartToken$|(?:cart\.)?(?:lines|items)(?:$|[.\[]))/.test(path))
      recovery.bag ||= message;
    if (path === 'paymentReference') recovery.payment = message;
  }
  return recovery;
}

export function checkoutSubmissionFailure(error, attempt, previousAttempt) {
  const kind = error?.kind || 'http';
  const recovery = checkoutValidation(error?.fields);
  const uncertain =
    ['timeout', 'network', 'conflict', 'server', 'invalid-response'].includes(kind) ||
    (previousAttempt && kind === 'offline');
  return {
    failed: true,
    apiFailure: {kind, recovery},
    unconfirmedAttempt: uncertain ? attempt : null
  };
}

export function dismissCheckoutFailure({apiFailure}) {
  // The warning can be dismissed while the original attempt still awaits an answer.
  return {failed: false, apiFailure: apiFailure?.recovery.payment ? apiFailure : null};
}
