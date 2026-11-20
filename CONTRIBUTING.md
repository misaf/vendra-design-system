# Contributing

How to change the Vendra design system. Find storefront source and tests in [docs/STOREFRONT.md](./docs/STOREFRONT.md); voice, accessibility and the release checklist in [src/design-system/gallery/brand-guide.md](src/design-system/gallery/brand-guide.md).

## Set up

```sh
npm ci                                   # install from the root lockfile
npm run dev                             # Next.js storefront at http://localhost:3000/
npm run dev:gallery                     # storefront and previews under /guidelines/
```

Use Node.js 22 (22.22.2 or later). Local browser tests use Google Chrome, and CI uses Playwright's Linux image.

## Every change

1. Edit the sources: `src/design-system/components/`, `src/design-system/tokens/`, `src/app/`, `src/design-system/gallery/`. Never edit `src/design-system/tokens/design/`, `.generated/` or a tenant's generated `.css`: the build writes them.
2. `npm run format`, then `npm run generate`.
3. Run `npm run check` to verify generated files, formatting, ESLint for `src/app/` and CSS lint (colours only from tokens, start/end instead of left/right).
4. `npm test`: types, storefront logic, copy parity, the package's server render, its size budget and the API contract.
5. After a change to a component, its CSS, tokens or `src/design-system/storefront.css`: `npm run test:e2e`. Storefront tests run against a fresh production build, then source fixtures and component tests run on the development server. Every guideline card and storefront page is screenshot-compared and checked with axe, and every component's own spec runs. When a screenshot differs, open its `-actual.png` and accept it (`npm run test:e2e:update`) only if the change is the one you meant. The Linux baselines are refreshed by the **Update screenshots** workflow (or the same command inside Playwright's Docker image).
6. Include updated generated tokens and tenant styles in the pull request.

Run one unit suite from the repository root with `node --test tests/api-contract.test.mjs`. Add `--watch` before the file path to rerun it while you edit.

## Demo deployment

The **CI** workflow publishes the GitHub Pages demo after a push to `master` only when
the unit tests, browser tests, and production tools/build/performance budgets all
succeed. Failed, cancelled, or skipped checks prevent deployment. Pull requests do not deploy.

Changes confined to `.github/` skip the browser tests on push, so they also skip deployment.
To deploy those changes or manually redeploy, open **Actions → CI → Run workflow**, select
`master`, and run it. This runs every check before building and deploying the same commit.
Manual CI runs on other branches do not deploy. Pages deployments run one at a time.

## A new component

Put reusable UI in `src/design-system/components/<Name>/`, UI shared by storefront routes in `src/storefront/shell/components/`, and feature-owned UI in the capability’s `components/` directory. See [Vendra UI ownership](docs/UI.md).

```sh
npm run new:component -- Name           # component, types, CSS, README, fixture and spec
npm run new:component -- Name --wording # plus English and Persian wording
npm run new:component -- Name --no-css  # when it reuses existing component classes
```

The `--` matters: without it npm keeps the flags for itself. The generator adds the folder, imports its CSS in `src/design-system/components/index.css`, adds it to the gallery inventory (`src/design-system/index.js`) and, with `--wording`, adds its type to `ComponentMessages`. Then:

- **Fill in the TODOs.** Build on React Aria Components for anything interactive, on `Field` for form controls, and on the existing components (Alert, Button, Price…) before writing new markup. Class names are `ag-…` with `cx()`; tenant data (copy, prices, contact) comes in as props.
- **Wording.** A component's own words (accessible names, small labels) go in its `messages.js` in English and Persian, read with `useMessages('Name', messages, props, locale)`; never an English default prop. Components that can sit on a page with both languages use `usePageLocale()`.
- **Server rendering.** Touch `window` and `document` only in effects and event handlers.
- **Test it** in `<Name>.spec.mjs`: role and name, keyboard, wording in both languages, the main props, and `expectAccessible` (axe in English and Persian). `<output>` elements count as `role=status`, so use a `<span data-test>` to show what a callback reported.
- **Use it.** `npm test` fails until a storefront page (or another component) uses it, and it belongs on a guideline card in `src/design-system/gallery/components/`.
- **Size.** `npm test` measures it gzipped (`tests/size.test.mjs`). Raise a budget only on purpose, saying why in the code and the commit.

## Breaking changes

There is no deprecation path: rename or remove a prop, and update every use in the same commit. Tenant apps upgrade to the new version. Say what broke in the commit message.

## Data and the API

The storefront's data has the shape of the Vendra API (`tests/fixtures/vendra-openapi.json`). Don't invent fields: something the API doesn't have yet goes on the list in `docs/API.md`. No Google products.

## Tenants

A new or changed theme in `src/design-system/tokens/tenants/*.json` must pass the seven Theme builder checks and the Colors → Contrast card; see [src/design-system/gallery/tenant-onboarding.md](src/design-system/gallery/tenant-onboarding.md).
