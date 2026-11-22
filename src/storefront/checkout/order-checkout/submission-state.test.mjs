import assert from 'node:assert/strict';
import {test} from 'node:test';
import {checkoutSubmissionFailure, dismissCheckoutFailure} from './submission-state.js';

test('an uncertain result preserves the exact submitted attempt after dismissing the notice', () => {
  const attempt = Object.freeze({request: Object.freeze({cartToken: 'sample'})});
  for (const kind of ['timeout', 'network', 'conflict', 'server', 'invalid-response']) {
    const failure = checkoutSubmissionFailure({kind}, attempt);
    assert.equal(failure.unconfirmedAttempt, attempt);
    assert.equal(failure.apiFailure.kind, kind);
    assert.deepEqual(
      {...failure, ...dismissCheckoutFailure(failure)},
      {
        failed: false,
        apiFailure: null,
        unconfirmedAttempt: attempt
      }
    );
  }
});

test('offline preserves a previously uncertain attempt and leaves a first attempt editable', () => {
  const attempt = {request: {cartToken: 'sample'}};
  assert.equal(checkoutSubmissionFailure({kind: 'offline'}, attempt).unconfirmedAttempt, null);
  assert.equal(
    checkoutSubmissionFailure({kind: 'offline'}, attempt, attempt).unconfirmedAttempt,
    attempt
  );
});

test('validation routes corrections to delivery, bag, and payment without locking the attempt', () => {
  const failure = checkoutSubmissionFailure(
    {
      kind: 'validation',
      fields: {
        deliverySlotId: 'Choose an available slot',
        'cart.lines[0]': 'Review this item',
        paymentReference: 'Check your reference'
      }
    },
    {request: {cartToken: 'sample'}}
  );
  assert.deepEqual(failure, {
    failed: true,
    apiFailure: {
      kind: 'validation',
      recovery: {
        delivery: {slot: 'Choose an available slot'},
        bag: 'Review this item',
        payment: 'Check your reference'
      }
    },
    unconfirmedAttempt: null
  });
  assert.deepEqual(dismissCheckoutFailure(failure), {
    failed: false,
    apiFailure: failure.apiFailure
  });
});
