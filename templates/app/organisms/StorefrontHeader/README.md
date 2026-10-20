# StorefrontHeader

Storefront-specific header organism composed from package atoms and molecules. It renders the
desktop and compact layouts together; existing CSS breakpoints select the visible layout.

Shell supplies brand content, navigation entries, tool links, bag labels/counts, optional language
data and callbacks. It decides feature visibility and owns routing, language state, the menu drawer
and shared layout effects. StorefrontHeader has no store access or persistence.

Keep this composition under `templates/app/organisms/`, alongside the storefront shell. The
published `components/` package remains independent of storefront copy and `vf-*` presentation.
Tailwind scans nested app JSX so extracted markup retains its utilities.
