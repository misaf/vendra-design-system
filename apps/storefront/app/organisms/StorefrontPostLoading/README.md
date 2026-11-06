# StorefrontPostLoading

Composes the post loading title, card Skeleton and localized status paragraph from explicit title/message props. Preserves the h1, decorative skeleton, role=status and sibling structure without adding a wrapper.

View retains visibility and localized title/message mapping. Post logic retains article selection, loading/missing state, content mapping and navigation. Skeleton retains its reduced-motion presentation; StorefrontPostLayout retains feedback placement and article visibility, and shared logic retains locale, SEO and focus. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual loading title/status, hidden skeleton semantics, loading/missing coexistence, normal-route recovery, touch/keyboard navigation, responsive containment, reduced motion, accessibility and screenshots against the previous version.
