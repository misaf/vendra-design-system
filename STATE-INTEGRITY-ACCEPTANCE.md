# State and integrity acceptance subset — stage 240

Reviewed 2026-11-04 against stage-239 `3cfac8a7ee350ff87cf4ab5f77b409ff5021863d`.
This maps an explicit frontend acceptance subset to actual assertions and fresh verification.
It is not complete storefront, backend, payment-provider or concurrency acceptance. No runtime,
test or baseline change is made in this audit. State names and pass totals alone are not proof.

## Required subset and evidence classes

**B** = selected browser assertions executed by this stage; **U** = assertions exercised by fresh
root unit tests; **S** = inspected existing browser/source coverage, not selected for a fresh browser
run here; **G** = a required gap/residual. Browser outcomes are reported separately below.
Unit tests use the repository's hook/VM stand-ins, not real concurrent browser execution.

| ID / invariant | Actual evidence / owner | Status and practical limit |
| --- | --- | --- |
| I01 — Stock limits hold across product and bag edits. | `stock limits hold in the product and bag` in [ui-flow-integrity](templates/_e2e/ui-flow-integrity.spec.mjs); [storefront unit](templates/_tests/storefront.test.cjs) checks repeated adds, variants sharing stock and overstocked repeat orders. | B + U. The browser adds the capped product and manually enters quantity 3, requiring stored quantity 2. Server inventory reservation/oversell prevention is G. |
| I02 — Changed delivery choices need review. | `changed delivery windows need explicit confirmation` in ui-flow-integrity; unit stock/date/retry checks. | B + U. Requires warning focus, retains old date until confirmation, then advances to a valid date. Mixed-bag dates and unpinned-address cases exist separately (S); not all zones/calendar combinations are freshly run. |
| I03 — Promo validation, amounts and continuity are consistent. | `a promo code discounts the bag and carries to checkout` and `removing the code restores the total` in [features](templates/_e2e/features.spec.mjs); [features unit](templates/_tests/features.test.cjs) covers digit/space normalization, unknown/minimum cases and calculations. | B + U. Apply/carry is EN; removal checks code absence/focus in FA, each at both widths. The removal case has no numeric before/after total assertion. This is not a full bilingual cross-product or server promo/total-authority check. |
| I04 — A pending checkout cannot be submitted twice within one app instance. | [site logic](templates/storefront-site/logic.js) `beginCheckout`, [checkout logic](templates/storefront-checkout/logic.js) busy/send path; storefront unit remounts checkout while pending, calls place again and requires one API invocation. | U + source. Browser late-response test requires one call but does not itself double-submit. A dedicated repeated-submit/remount UI case remains G. Cross-tab/server idempotency is not implied. |
| I05 — Late checkout completion preserves newer customer intent. | `late checkout responses keep newer bag changes` in [customer-state-integrity](templates/_e2e/customer-state-integrity.spec.mjs); matching storefront unit assertions. | B + U. Held API promise, newer bag quantity retained, recorded order keeps original quantity, pending clears and notice links to order. Unit also protects newer delivery/payment draft. Mock completion is not a server order transaction. |
| I06 — Changed receipt amounts require explicit confirmation. | `changed receipt totals require confirmation` in customer-state-integrity; matching storefront unit section. | U + S. Browser case checks warning focus, retained receipt fields, order still null, then explicit acknowledgement. Not freshly selected in this stage. |
| I07 — Online payment cannot leave without durable recovery details. | `online payment waits for a durable recovery record` in [integrity-recovery-followups](templates/_e2e/integrity-recovery-followups.spec.mjs); storefront unit checks zero submission/blocked retry on storage failure. | B + U. Storage failure is injected, order remains null; restoring storage allows demo completion and reload. Browser case uses local demo bank; it is not evidence of a real bank or filesystem durability. |
| I08 — Refused payment recovers through a reviewed retry. | `a payment the bank refuses keeps the bag and can be paid again` in features; `expired payment retries return to delivery review` in integrity-recovery-followups. | B + U. First case actually asserts failed-return heading/focus, help text and a successful paid return; its title alone does not prove bag retention. The expiry case requires null order, focused review warning and delivery re-review. No real provider request is sent. |
| I09 — Completion/recovery does not duplicate local order history. | Storefront unit repeats `store.complete(first)` and requires unchanged history length; [migration unit](templates/_tests/migration.test.cjs) exercises payment returns. Features paid/reload and unknown-return warning cases exist (S). | U + S. Local history deduplication and a warning are not end-to-end exactly-once checkout guarantees. Required server replay/transaction tests remain G. |
| I10 — Failed profile/address persistence retains inputs for retry. | `failed profile and address saves retain entries for retry` in customer-state-integrity. | B + U. Injected account-key Storage error, visible alert, retained input, successful retry and dialog closure. Actual remote API failure/conflict handling remains G. |
| I11 — Profile edits preserve unrelated newer account fields. | `profile edits preserve newer wallet and account data` in integrity-recovery-followups; [account-data](templates/_shared/account-data.js) `vfAccountUpdate` reads latest persisted record before changing/saving. | B + U. The test writes newer wallet/email values in the same page before save. It does not run two simultaneous tabs or verify interleaved read-modify-write safety. True cross-tab concurrency is G. |
| I12 — Customer switches isolate private state. | `guest continuation and customer switches isolate private data` in integrity-recovery-followups; site storage listener/syncCustomer. | B + U. Same-page guest continuation, sign-out, customer B reload, then customer A history restoration. Real storage events from another tab and a pending response crossing an identity change remain G. This is not server authentication/authorization evidence. |
| I13 — Late saved-list hydration preserves later actions. | `initial saved-list loading keeps newer customer actions` in customer-state-integrity; site saved-edit merge and corresponding unit assertions. | B + U. Controlled promise merges initial saved IDs with a newer save. All add/remove orderings and customer changes during hydration are not proved by this one case. |
| I14 — Offline status and recovery are usable. | `the site says when the connection drops and when it is back` in features; [offline helper](templates/_shared/offline.js). | B, FA at both widths. It checks band text after context offline/online changes and axe. Offline checkout/save failure, retained writes, retry and reconnect deduplication are G; this is not an offline queue test. |
| I15 — TV input can change a bag and escape map focus. | `the arrow keys reach add to bag` and `a remote places the delivery pin and leaves the map` in [tv spec](templates/_e2e/tv.spec.mjs). | B, EN/FA on the dedicated 1920×1080 TV project. Arrow/Enter adds exactly one badge count; map arrows change coordinates and Escape returns focus. No physical remote or complete TV payment/stock/promo matrix is proved. |
| I16 — State fixtures must demonstrate the state they name. | [states spec](templates/_e2e/states.spec.mjs) sets up states then runs axe; see confirmed F01 below. | G: at least the named payment-failure fixture exercises a different route. An axe pass cannot stand in for the missing state assertion. |

## Confirmed coverage defect F01: payment-failure fixture

`states.spec.mjs` registers `checkout payment failed` by calling
`openSite(page, 'checkout', lang, {demo:'error'})`. The sample bag lacks required delivery data.
The site's checkout guard routes it to `view=bag&step=delivery`. The state loop only waits for quiet
and runs axe; it does not require a failed-payment heading, status or retry control.

A separate read-only dev probe uses that exact setup, a fresh context for each EN/FA × 390/1280
case, and the same quiet/axe helpers. **All four show delivery details and zero axe violations.**
Observed route is `bag`, step `delivery`, URL has no payment return, and headings are
`Delivery details.` / `جزئیات ارسال.`. Thus this is a confirmed test-coverage defect, not a claim
that the product's actual refused-payment flow is broken. The valid refused/expired retry scenarios
selected above remain separate evidence. This probe shares the task-owned dev preview while the
selected tests run; it is not an isolated timing experiment or production reproduction.

Next stage: give this fixture valid payment-failure setup and require its intended state before
axe. Check nearby guarded checkout fixtures for the same problem. Reuse existing payment helpers/
flows where practical; do not duplicate the existing retry assertions or refresh visual baselines.

A second assertion limit is visible in the promo-removal test: despite its title, it checks that
the code disappears and focus returns, not a numeric restored total. The apply/carry browser case
and unit formula tests provide separate amount evidence. Add an explicit UI amount comparison when
closing the promo-removal acceptance row; do not infer it from the case name.

## Source boundaries behind the residuals

- `beginCheckout` is state on one mounted site. Its pending/remount tests cannot establish a lock
  between browser tabs or server requests. The checkout adapter posts a Checkout-shaped request;
  neither this audit nor its tests inspect backend idempotency or inventory/payment transactions.
- `vfAccountUpdate` is a read/change/write of localStorage. Reading the latest value protects
  unrelated preceding changes in one event sequence. It does not itself provide a transaction
  across independently executing contexts. This is a code-proven limitation; no lost-update race
  is reproduced here and none is reported as a confirmed user-facing defect.
- The site's storage listener reacts to customer identity changes. Existing newPage/newContext
  usage in features/devices covers counter handoff/device navigation, not a competing profile/
  wallet write scenario. More than one page in a suite is not sufficient concurrency evidence.
- [API.md](templates/API.md) already documents cart writes, checkout-result and unsupported field
  gaps (B1–B4), including client promo/size/address data. [delivery.js](templates/_shared/delivery.js)
  wraps `commerce.checkoutRequest`; `cartToken` defaults empty. These are repository contract notes,
  not a refreshed audit of a deployed backend. Mocked/demo browser passes do not establish server
  behavior or real payment success.

## Fresh focused verification

| Target / selection | Passed | Failed / skipped / retries | Duration |
| --- | ---: | --- | ---: |
| Darwin dev | 44 | 0 / 0 / 0 | 329.0 s |
| Darwin dev-tv | 4 | 0 / 0 / 0 | 28.6 s |
| Darwin production | 44 | 0 / 0 / 0 | 221.2 s |
| Darwin production-tv | 4 | 0 / 0 / 0 | 23.5 s |

**96 selected browser cases pass**. One worker, zero retries/skips, snapshot updates explicitly
disabled. The four F01 probe observations are separate diagnostics, not included in these 96.
Root unit tests and check pass; production targets build fresh application previews. The result
establishes only the selected assertions, not every invariant's unresolved boundary above.

The default subset selects nine bilingual families (36 cases) and four features families (8 cases)
per target. Nine: stock limits; changed delivery windows; late checkout response; initial saved-list
hydration; failed profile/address saves; newer wallet/account preservation; durable online recovery;
customer switches; expired retries. Four features: promo apply/carry (EN), promo removal (FA), refused
payment/retry (EN), and connection band (FA), each on mobile and desktop. The TV selection is the two
bilingual directional-input families above (4 cases per target). No test is added or modified.

```sh
# Scope is stored as exact title families, not the whole features suite:
E2E_WORKERS=1 npm --prefix templates run test:e2e -- ui-flow-integrity.spec.mjs customer-state-integrity.spec.mjs integrity-recovery-followups.spec.mjs features.spec.mjs --project=mobile --project=desktop --grep 'stock limits hold|changed delivery windows|late checkout responses|initial saved-list loading|failed profile and address|profile edits preserve|online payment waits for a durable|guest continuation and customer switches|expired payment retries|a promo code discounts|removing the code restores|a payment the bank refuses|site says when the connection' --retries=0 --update-snapshots=none
E2E_WORKERS=1 npm --prefix templates run test:e2e -- tv.spec.mjs --project=tv --grep 'arrow keys reach add to bag|remote places the delivery pin' --retries=0 --update-snapshots=none
# Repeat both selections with test:e2e:build for production.
```

## Remaining acceptance sequence

1. Repair F01's state setup and assertions, then verify failed/retry states without broad policy changes.
2. Add a real shared-origin two-tab customer switch/pending-response scenario. Keep source-proven
   storage atomicity limits distinct from observed failures; design any needed synchronization only
   after a controlled reproduction and an explicit ownership decision.
3. Exercise repeated UI checkout submissions/remount and offline mutation/reconnect recovery against
   controlled adapters, including payload/call counts. Keep backend exactly-once/reservation/payment
   tests in their actual service environment.
4. Retain article/payment visual variants, physical phone/tablet/TV and AT requirements separately.
   Current default screenshots and TV keyboard emulation do not close these gates.

Root `npm test` and `npm run check` pass. All 258 snapshot PNGs match HEAD; local document links and
diff checks pass. Fresh inventory remains 1,790 dev / 125 files and 1,391 production / 51 files.
Only documentation changes, with no new test registrations. Parent PR #95 unit/React 19 jobs are green;
its broad browser/production jobs were still running when inspected. New PR CI has its own outcome.

No Linux sweep, full state/axe suite, baseline comparison, hydration or dedicated touch
suite is claimed here. Some selected cases include axe and diagnostic screenshots, but neither is
a full visual comparison. External chat links are inspected by existing tests rather than sent;
checkout/payment activity uses local demos or controlled in-page/API stubs, not a real transaction.
No complete migration acceptance follows from this subset.

Local logs/JSON/results, exact selection script, unit/check logs and the four-case F01 probe are
retained under `/tmp/vendra-stage240*`. Temporary local artifacts are not remote CI links. The
checklist, assertions and explicit gaps above are the durable review artifact.

## Stage 241 F01 correction

[Payment state evidence](PAYMENT-STATE-FIXTURE-EVIDENCE.md) replaces the incorrect direct-checkout
setup with valid delivery and an observed local failed-bank return. Positive failure/focus/retry
assertions and strengthened adjacent payment-state checks run before axe. The stage240 findings
above remain historical evidence; F01 is now corrected for that fixture. Other rows' cross-tab,
idempotency, offline-write and numeric promo-removal limitations remain separate.

## Stage 242 cross-tab ownership coverage

[Two-tab evidence](CROSS-TAB-RESPONSE-EVIDENCE.md) adds native storage-event identity changes while
a real adapter POST is held. Successful/failed responses preserve B's edits and history; successful
local orders remain with A and survive A's return/reload. This fills the specific I12 pending
checkout/identity scenario. I11 same-account read-modify-write concurrency and other rows' real
backend, offline-write, duplicate UI and numeric promo-removal limits remain open.

## Stage 243 numeric promo-removal coverage

[Promo restoration evidence](PROMO-TOTAL-RESTORATION-EVIDENCE.md) extends the prior FA removal case
to both languages and asserts original, discounted and restored localized Toman amounts in the
actual total row. The missing numeric UI assertion described in I03 is now covered for this sample
bag/percentage and default widths. Other promo combinations, backend authority and other rows'
submission/offline/concurrency limits remain separate.
