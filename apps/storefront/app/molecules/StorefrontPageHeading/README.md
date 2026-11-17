# StorefrontPageHeading

Storefront molecule for the shared page heading pattern: optional eyebrow, heading (`level`, default `h1`) with an optional accented `em`, optional intro paragraph and optional `meta` line. It replaces the per-page Account, Bag, Checkout, Contact, FAQ, Policy, Sign-in and Tracking headings and is used inside StorefrontWeddingsHeading.

Props are explicit text/nodes: `eyebrow`, `title`, `accent`, `intro`, `meta` (for example the policy's "updated" label with its `<time>`), `level` and `variant`. `variant="page"` (default) limits the intro to the reading measure; `variant="info"` lets the intro span the information-page column (FAQ, contact, policy). Classes are shared: `vf-page-eyebrow`, `vf-page-accent`, `vf-page-intro` and `vf-page-meta`. Omitted parts render nothing.

Views keep visibility, copy mapping and any wrapper (`vf-checkout-heading`, the account/track layout header). Logic keeps localization, formatting and focus. No state, effects or browser APIs belong here.

Verify heading levels and landmarks are unchanged, bilingual accent spacing, intro width per variant, policy meta/`<time>`, and screenshots against the previous baselines.
