# StorefrontFaqLayout

FAQ Atomic Design template with React-node slots for heading, questions and contact. It owns the main focus target, page header, responsive information columns, question-list wrapper and contact aside.

StorefrontFaqHeading composes the eyebrow, accented title and introduction from explicit props. StorefrontFaqQuestions composes labelled category sections and Accordions from explicit groups. The View retains localized copy mapping, list normalization, help card, contact/WhatsApp links and sample-content note. FAQ logic retains category/answer mapping and delivery-rule interpolation; shared page logic retains navigation, locale, SEO and focus. The layout owns no state, effects, data or callbacks.

Preserve classes, section labels, heading levels and focus targets. Verify initial and changed accordion expansion, keyboard controls, contact navigation, English/Persian accessibility, printing and responsive rendering.
