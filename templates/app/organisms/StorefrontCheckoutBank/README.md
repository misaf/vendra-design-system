# StorefrontCheckoutBank

Composes noninteractive checkout progress and PaymentStatus from explicit progress, payment and action descriptors. Preserves fragment order with no added DOM wrapper, current index/formatters, status/amount/order/redirect/support props, retry/other/check-again callbacks and headingLevel 1. The layout retains the bank wrapper; retry-review/storage notices remain outside it.

View/logic retain bank visibility, status interpretation, recovery records, redirect data, retry eligibility, method switching, verification, completion and persistence. PaymentStatus retains its existing redirect form/timer, status heading focus, localized copy, support link and result tracking. No page model, state/effects, browser APIs or payment rules belong here.

Verify bilingual redirect/verification and failed/cancelled/pending results, retries, other-method draft continuity, missing-record safety, check-again behavior, support href, notices, heading focus, touch/tablet rotation, keyboard activation, overflow and accessibility. Compare bank progress and status elements with the unchanged baseline.
