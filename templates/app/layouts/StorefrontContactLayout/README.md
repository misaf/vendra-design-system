# StorefrontContactLayout

Contact Atomic Design template with heading, details, form and feedback React-node slots. It owns the main focus target, header, responsive columns and detail/form wrappers. API feedback remains after the columns.

The View retains studio-detail descriptor/availability mapping, form-control visibility/descriptor mapping, completion visibility/descriptor mapping and API-feedback visibility/message mapping. Contact logic retains signed-in prefill, reply-channel validation, map fallback, submission, busy/error state and focus. This layout owns no data, callbacks, persistence or browser effects.

Preserve wrapper classes and focus targets. Verify guest/customer prefill, reply-channel and message validation, summary links, success/edit draft retention, failed-request recovery, map fallback/directions, responsive fields, hydration and English/Persian accessibility.

StorefrontContactHeading composes the eyebrow, accented h1 and introduction from explicit props without a wrapper. View retains localized mapping; this layout retains the header wrapper and placement.

StorefrontContactDetails composes rows, contact actions, protected map and directions from explicit descriptors. View maps availability/callbacks; contact/shared logic retain studio values and map loading/fallback. This layout retains details placement and responsive columns.

StorefrontContactFormControls composes the validation summary, controlled fields and send button. View retains visibility/descriptor mapping and heading; contact/shared logic retain validation, submission, busy/errors, drafts and focus. This layout retains form placement.

StorefrontContactCompletion composes the named success region, alert and return-to-form action from explicit props. View retains visibility/demo-live copy mapping; contact/shared logic retain outcomes, drafts and focus. This layout retains form-column placement.

StorefrontContactFeedback composes the API-error danger Alert from an explicit message. View retains visibility/message mapping; contact/shared logic retain localized errors, drafts and clearing on edit/retry. This layout retains feedback placement after the columns.
