# BrandLogo

Colocated fixtures/specs check supplied props and state changes, keyboard behavior, compact containment and English/Persian axe. Fixtures use local assets and hash navigation; page reload, shell asset mapping and external phone handling remain integration responsibilities.

Internal storefront brand artwork shared by the header and footer. Takes an optional image
(`src`, intrinsic `width` and `height`) and a localized `name` for its alt text and text fallback.
The shell resolves asset URLs; the component has no store configuration dependency.
An absent or failed image renders the name. Logo dimensions are bounded by the shell's brand tokens.
