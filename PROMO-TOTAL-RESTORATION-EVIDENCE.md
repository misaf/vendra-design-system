# Numeric promo-removal total restoration — stage 243

Reviewed 2026-11-04 against stage-242 `e2d988e22af0876fa122f118bd33b4aad3119e42`.
The [state audit](STATE-INTEGRITY-ACCEPTANCE.md) found that the removal case checked code absence
and focus, but never the total. This stage adds the missing amount assertions to that existing
flow and exercises it in English as well as Persian. The current application passes without a
runtime change.

## Asserted visible amounts

[features.spec.mjs](templates/_e2e/features.spec.mjs) scopes the check to the one strong total row
in the bag's OrderSummary. Independent expected sample amounts are written directly in the test;
it does not call the production formatter or pricing function to manufacture its expected result.

| Phase | Toman amount | English display | Persian display |
| --- | ---: | --- | --- |
| Before code | 8,450,000 | `8,450,000 Toman` | `۸٬۴۵۰٬۰۰۰ تومان` |
| WELCOME10 applied | 7,605,000 | `7,605,000 Toman` | `۷٬۶۰۵٬۰۰۰ تومان` |
| Code removed | 8,450,000 | `8,450,000 Toman` | `۸٬۴۵۰٬۰۰۰ تومان` |

The assertions require the discounted amount first, so an unchanged total cannot falsely satisfy
restoration. Exact visible text also checks digits, grouping and currency, rather than matching an
unrelated price elsewhere in the summary. These are the unquoted bag's **total before delivery**;
they are not a destination fee or backend quote assertion.

Keep code normalization coverage (`welcome 10` in EN and `WELCOME۱۰` in FA), applied code visibility,
removal and returned input focus. A small JSON attachment holds the asserted original/discounted
texts and actual restored text. One old FA registration becomes two language-specific registrations;
the rest of the feature suite is unchanged. No new test file, app behavior or screenshot baseline.

## Verification

| Target | Passed | Failed / skipped / retries | Duration |
| --- | ---: | --- | ---: |
| Darwin dev | 6 | 0 / 0 / 0 | 46.3 s |
| Darwin production | 6 | 0 / 0 / 0 | 53.8 s |
| Linux dev | 6 | 0 / 0 / 0 | 39.1 s |
| Linux production | 6 | 0 / 0 / 0 | 17.2 s |

**24 final cases pass**, including 16 bilingual removal executions with matching restored amounts.
All 16 restoration attachments agree with the original displayed total after an asserted discount.

Each target runs six cases: bilingual removal at non-touch 390×844 mobile / 1280×900 desktop (four),
plus the existing EN unknown-code/ROSES15 amount-and-checkout-continuity case at both widths (two).
This is not the full promo/quantity/delivery/wallet/currency cross-product. All final runs use one
worker, zero skips/retries and snapshot updates disabled. Production targets build fresh previews.

```sh
E2E_WORKERS=1 npm --prefix templates run test:e2e -- features.spec.mjs --project=mobile --project=desktop --grep 'promo code discounts|removing the code restores' --retries=0 --update-snapshots=none
# Repeat with test:e2e:build for production.
node templates/_tests/features.test.cjs
```

Darwin uses installed Chrome. Linux uses the cached AMD64 Playwright 1.64.1 Noble image, fresh npm ci
from the lockfile, a native task volume and source archive with the tested spec override. No Darwin
dependencies are reused inside Linux.

The focused feature unit file, root `npm run check`, fresh production app builds, local document
links, diff and tested-input checks pass. All 258 PNGs match the prior-head archive. Fresh inventory
is 1,800 dev / 125 files and 1,401 production / 51 files: two default-project registrations added,
no new file. The task Linux volume is removed and VM restored to stopped/3814 MiB.

No full root unit, full feature/state, full-page visual, hydration, dedicated touch/TV, physical/AT
or backend suite is claimed. The focused feature unit file covers client normalization, unknown/
minimum promo rules and amount calculations, among its existing feature assertions. The browser
checks verify rendered sample Toman totals, not authoritative server discounts or other currencies.
Existing source-map warnings are not addressed; broad PR CI reports its own outcome.

Next: repeated UI checkout submission/remount while a response is pending, with request counts and
current-state preservation. Offline-write/reconnect, same-account storage races and actual backend
transactions remain separate gates. [ACCEPTANCE-COVERAGE.md](ACCEPTANCE-COVERAGE.md) retains those
limits and the physical/AT/visual requirements.

Local `/tmp/vendra-stage243*` artifacts contain final JSON/log/results and restoration attachments,
focused unit/check/discovery output, tested archive and Linux install/runner/cleanup evidence.
These temporary files are not durable CI links. The permanent test is the reproducible check.
