# StorefrontTrackLookup

Composes the tracking lookup form from explicit heading, failure, order-number, phone, submit and browse descriptors. Preserves the form/classes/onSubmit/noValidate, h1/accent/intro, warning/focus target, field IDs and native props, primary large block submit with leading package-search icon and ghost shop link. Adds no wrapper.

View retains lookup visibility and localized mapping. Tracking/shared logic retains drafts, validation/focus, order-number/phone normalization, number-and-mobile matching, failure state and navigation to the matched order. Package fields/actions retain semantics and activation; shared shell/router retains navigation. No state, effects, browser APIs or lookup rules belong here.

Verify bilingual empty/invalid/mismatched/successful lookup, field and warning focus, error/failure clearing, normalized number/mobile variants, native form submission, track-another reset and browse navigation. Compare markup, touch/rotation, keyboard use, desktop/TV, containment and accessibility against the previous version.
