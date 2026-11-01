# StorefrontWeddingsLayout

Weddings Atomic Design template with React-node slots for heading, hero media, services, story, inquiry introduction, inquiry and feedback. It owns the main focus target, hero/services/story sections and responsive inquiry section, including its `inquiry` anchor. API feedback remains after the inquiry section.

StorefrontWeddingsHeading composes the heading and hero actions from explicit copy/action descriptors. StorefrontWeddingsHeroMedia composes the localized hero arch placeholder. StorefrontWeddingsServices composes ordered service cards from explicit records. StorefrontWeddingsStory composes gallery and process content from explicit props. The View retains localized mapping, WhatsApp availability, list normalization, inquiry fields and conditional form/success states, validation summary and API feedback. Weddings logic retains field state, date constraints, validation, submission payload, busy/error state, draft retention and focus. This layout owns no data, callbacks, persistence or browser effects.

Preserve classes, the inquiry anchor and focus targets. Verify hero-anchor navigation, required-field/summary focus, date/select controls, demo success/edit draft retention, stubbed request failure/retry, responsive fields, hydration and English/Persian accessibility.
