# Contributing

How to change the Vendra design system. The rules behind these steps are in [CLAUDE.md](CLAUDE.md); the storefront and its tests in [templates/README.md](templates/README.md); voice, accessibility and the release checklist in [guidelines/brand-guide.md](guidelines/brand-guide.md).

## Set up

```sh
npm ci                                   # one install at the root (templates/ is a workspace)
npm run dev                              # the storefront and the guideline cards at http://127.0.0.1:5173/
```

Node 20.19+ or 22.12+, and Google Chrome for the browser tests (CI uses Playwright's Linux image instead).

## Every change

1. Edit the sources: `components/`, `tokens/`, `templates/`, `guidelines/`. Never edit `dist/`, `templates/_runtime/` or a tenant's generated `.css`: the build writes them.
2. `npm --prefix templates run format`, then `npm run build`.
3. `npm run check`: generated files match their sources, Prettier, and the CSS lint (colours only from tokens, start/end instead of left/right).
4. `npm test`: types, storefront logic, copy parity, the package's server render, its size budget and the API contract.
5. After a change to a component, its CSS, tokens or `styles.css`: `npm run test:e2e`. Every guideline card and storefront page is screenshot-compared and checked with axe, and every component's own spec runs. When a screenshot differs, open its `-actual.png` and accept it (`npm --prefix templates run test:e2e:update`) only if the change is the one you meant. The Linux baselines are refreshed by the **Update screenshots** workflow (or the same command inside Playwright's Docker image).
6. Commit to `master` with `dist/` included.

## A new component

```sh
npm run new:component -- Name               # component, types, CSS, README, fixture and spec
npm run new:component -- Name --wording     # plus its English and Persian wording (messages.js)
npm run new:component -- Name --no-css      # when it only reuses other components' classes
```

The `--` matters: without it npm keeps the flags for itself. The generator adds the folder, imports its CSS in `components/index.css`, exports it to the storefront (`templates/app/ds.js`) and, with `--wording`, adds its type to `ComponentMessages`. Then:

- **Fill in the TODOs.** Build on React Aria Components for anything interactive, on `Field` for form controls, and on the existing components (Alert, Button, Price…) before writing new markup. Class names are `ag-…` with `cx()`; tenant data (copy, prices, contact) comes in as props.
- **Wording.** A component's own words (accessible names, small labels) go in its `messages.js` in English and Persian, read with `useMessages('Name', messages, props, locale)`; never an English default prop. Components that can sit on a page with both languages use `usePageLocale()`.
- **Server rendering.** Touch `window` and `document` only in effects and event handlers.
- **Test it** in `<Name>.spec.mjs`: role and name, keyboard, wording in both languages, the main props, and `expectAccessible` (axe in English and Persian). `<output>` elements count as `role=status`, so use a `<span data-test>` to show what a callback reported.
- **Use it.** `npm test` fails until a storefront page (or another component) uses it, and it belongs on a guideline card in `guidelines/components/`.
- **Size.** `npm test` measures it gzipped (`templates/_tests/size.test.mjs`). Raise a budget only on purpose, saying why in the code and the commit.

## Breaking changes

There is no deprecation path: rename or remove a prop, and update every use in the same commit. Tenant apps upgrade to the new version. Say what broke in the commit message.

## Data and the API

The storefront's data has the shape of the Vendra API (`uploads/openapi-*.json`). Don't invent fields: something the API doesn't have yet goes on the list in `templates/API.md`. No Google products.

## Tenants

A new or changed theme in `tokens/tenants/*.json` must pass the seven Theme builder checks and the Colors → Contrast card; see [guidelines/tenant-onboarding.md](guidelines/tenant-onboarding.md).
