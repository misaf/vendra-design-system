# StorefrontPostActions

Composes the article copy button and shop link from explicit copyLabel/onCopy/shopLabel/shopHref props. Preserves the secondary/primary variants, small sizes, link/arrow icons and sibling structure without adding a wrapper.

View retains localized label/link/callback mapping. Post logic retains clipboard behavior, copied state, reset timing and unmount cleanup; shared routing retains shop navigation, locale and focus. StorefrontPostLayout retains action placement, flex wrapping, spacing and border. This organism owns no state, calculations, persistence or browser effects.

Verify bilingual labels and link semantics, copy callback/current URL, copied/reset feedback, touch and keyboard activation, localized shop navigation, history/reload, classic/block availability, loading/missing absence, tablet rotation, responsive containment, accessibility and screenshots against the previous version.
