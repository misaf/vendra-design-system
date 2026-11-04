# Search keyboard contract evidence — stage 231

Reviewed 2026-11-04 against stage-230 `655e9632429633c4a3034b1cdf5d589e9941222e`.
This scopes the stage-176 forced-focus/Enter observation and verifies the supported keyboard path.

## Contract and original observation

[SearchField](components/molecules/SearchField/SearchField.jsx) delegates value, submit, clear and
focus behavior to React Aria. Its existing [README](components/molecules/SearchField/README.md)
already specifies that the clear button is outside Tab order and keyboard users clear with Escape.
Enter in the input calls `onSubmit(value)` when supplied; it does not mean clear.

The locally installed React Aria Components **1.22.1** delegates to React Aria **3.53.1**. Inspection
of its `dist/private/searchfield/useSearchField.mjs` shows the clear-button context setting
`excludeFromTabOrder: true`, `preventFocusOnPress: true`, and `onPressStart` focusing the input.
The clear action is in `onPress`, while the input's Escape shortcut clears nonempty state and calls
`onClear`. `dist/private/interactions/usePress.mjs` completes a keyboard press only when keyup is
within the original pressed target. These are installed dependency implementation details, not new
package APIs or code copied into this repository.

A scratch observer reproduces the historical sequence without changing component options:

1. Explicitly focus the `tabindex=-1` clear button with value `peony`.
2. Enter keydown targets the button.
3. React Aria's press-start handler moves focus to the input.
4. Enter keyup targets the input; the button press does not complete. Value stays `peony` and the
   input is focused.

The observed sequence and inspected handlers account for the historical symptom. Forced focus is
outside the documented sequential-keyboard path; that observation does not establish that users
cannot clear with the keyboard. No override, extra Tab stop or library patch is needed for the
contract tested here. The historical stage-176 record remains intact and is scoped by this follow-up.
This does not establish how every browser or assistive technology activates the off-Tab button.

## Permanent checks

The [fixture](components/molecules/SearchField/SearchField.fixture.jsx) now records submit/clear
counts and whether the input is focused during `onClear`; these are fixture outputs only.
Two new English/Persian [component cases](components/molecules/SearchField/SearchField.spec.mjs)
start with actual Tab navigation, without programmatically focusing the input or clear button:

- Tab reaches the search input; the next Tab skips the clear button and reaches the next input.
  Shift+Tab returns to the search input.
- Enter submits `peony` once, preserving the query and leaving the clear count at zero.
- Escape clears, retains input focus, hides clear, and calls `onClear` once. Escape on the already
  empty input does not call it again.
- Typing `rose` and clicking clear empties it, retains input focus and increments the clear count
  once without submitting. Input focus is already present when `onClear` runs.

The README's old statement that `onClear` happens **before focus returns** was inaccurate for pointer
activation: React Aria restores focus at press start. It now describes that order and notes that
React's value update may commit after the callback. No runtime component code changes.

[search-keyboard.spec.mjs](templates/_e2e/search-keyboard.spec.mjs) adds eight English/Persian ×
journal/search × mobile/desktop cases. Both projects use real keyboard input in Chromium; the
390px mobile project has **no touch emulation**. They use the route's own initial input focus (search) or sequential Tab navigation (journal),
filter to one result, verify Enter retains the current route/query/results, Tab past
clear and Shift+Tab back, then Escape to empty state with input focus. They also recover from a
zero-result query via Escape. Journal restores seven stories; search removes the nonempty `q`
parameter. These are keyboard/controlled-state checks, not pointer or physical-phone evidence.
Persian text uses Playwright's text-entry support, not a real OS keyboard layout or IME test.

## Validation and limits

Final development execution passes **13 cases**: the eight route cases and all five SearchField
component cases, including the existing English/Persian axe scan. Production execution passes the
**eight route cases**; component fixtures are dev-only. Both use one worker and no retries. Full
`npm test`, `npm run check` and the production build pass. There are no runtime/style/generated-file,
dependency, baseline or visual-policy changes.

```sh
E2E_WORKERS=1 npm --prefix templates run test:e2e -- SearchField.spec.mjs search-keyboard.spec.mjs --project=components --project=mobile --project=desktop --retries=0 --output=/tmp/vendra-stage231-final-dev-results --reporter=list
E2E_WORKERS=1 npm --prefix templates run test:e2e:build -- search-keyboard.spec.mjs --project=mobile --project=desktop --retries=0 --output=/tmp/vendra-stage231-production-results --reporter=list
```

The exploratory route test used a product-card selector for search rows; correcting it to the
actual `.vf-search-result` caller fixed the test locator. A prematurely overlapping rerun was stopped
before its development server owner finished; it is excluded from final evidence. The first scratch
probe encountered an absent development server, then succeeded against the runner-owned server.
These are verification setup issues, not app keyboard failures. Final runners own and tear down
their previews; no pre-existing development server was running at the start of these tests.

Discovery is **1,771 invocations in 124 files**: mobile/desktop 695 each, phone/tablet 51 each,
TV 23, components 256. The new route file adds four registrations per default project, and the
existing component file adds two. Earlier route/map/capture suites were not rerun. Local diagnostic
files use `/tmp/vendra-stage231-*`; those temporary paths are not durable CI artifacts.

The supported Tab/Enter/Escape and pointer-clear callback contract is verified in these sampled
Chromium paths. Soft keyboards, IME/composition, Safari/Firefox, screen-reader virtual activation,
all consumers, disabled/read-only combinations, every nested overlay and full visual/device
acceptance remain separate. No real order or external messaging action is triggered.

Next: investigate the older route loading/focus timeout observations with explicit lifecycle
diagnostics. The broader gates remain in [ACCEPTANCE-COVERAGE.md](ACCEPTANCE-COVERAGE.md).
