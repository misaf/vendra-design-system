# StorefrontHeader

Storefront-specific header organism composed from package atoms and molecules. It renders the
desktop and compact layouts together; existing CSS breakpoints select the visible layout.

Shell supplies brand content, navigation entries, tool links, bag labels/counts, optional language
data and callbacks. It decides feature visibility and owns routing, language state, menu state
and shared layout effects. StorefrontMenu renders the controlled menu drawer. StorefrontHeader has
no store access or persistence.

Keep this composition under `apps/florist/shell/organisms/`, alongside the storefront shell. The
published `components/` package remains independent of storefront copy and `vf-*` presentation.
Tailwind scans nested app JSX so extracted markup retains its utilities.

`StorefrontHeader.spec.mjs` covers English/Persian desktop, tablet and phone layouts; supplied navigation order/current state and destinations; localized bag count; language callbacks and controlled selection across layout changes; menu keyboard/pointer activation; optional language/empty navigation; supplied logo/mark selection; axe and viewport containment. Its fixture owns callback state without routing or persisting language changes.

Shell routing, language persistence, menu open state, resize dismissal and shared layout/focus effects remain integration responsibilities.
