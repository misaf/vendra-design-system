# StorefrontPresentationLayout

Presentation Atomic Design template with React-node slots for hidden heading, toolbar content, catalog, display, overlays and feedback. It owns the main focus target, density attribute, hidden heading, sticky toolbar and catalog wrappers. Density and catalog visibility are externally controlled.

The View retains the bare Shell, density provider, offline preparation effect, Label helper, remaining dialogs and toast region. Toolbar, catalog, viewer, send/share and quiet-display composition are delegated to storefront organisms through these slots. Presentation logic retains search, collections, display/playback, device state, seller workflows, stock, persistence and callbacks. The layout owns no data, state, effects or callbacks and does not choose display mode or overlay state.

Preserve classes, wrapper order, hidden catalog behavior, density and focus targets. Verify catalog/search, quiet display, paired/portrait layouts, seller tools/settings, viewer and order dialogs, bilingual accessibility and responsive/touch behavior. This layout owns only the outer wrappers; inner composition belongs to the View or its storefront organisms.
