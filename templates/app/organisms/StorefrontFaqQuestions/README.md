# StorefrontFaqQuestions

Composes FAQ category sections, labelled h2 headings and Accordions from explicit groups records (id, title, items and open). Preserves order, keyed fragments, stable heading IDs, aria-labelledby, headingLevel=3, default expansion and section classes without adding a wrapper.

View retains list normalization. FAQ logic retains category/answer mapping and delivery-rule interpolation; shared page logic retains navigation, locale, SEO and focus. Accordion owns disclosure state and keyboard interaction. StorefrontFaqLayout retains the question-list wrapper and responsive column placement. This organism owns no state, calculations, persistence or browser effects.

Verify English/Persian category and question order/copy, section labels and heading levels, default delivery expansion, independent groups and single expansion within each group, panel names, keyboard/touch controls, contact navigation, containment, accessibility and screenshots against the previous version.
