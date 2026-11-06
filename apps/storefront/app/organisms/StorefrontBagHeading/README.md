# StorefrontBagHeading

Composes controlled bag/delivery h1 headings from explicit showBag/showDelivery flags and bagTitle/bagAccent/deliveryTitle/deliveryAccent copy. Preserves each heading’s whitespace, accent classes and independent branch visibility without adding a DOM wrapper or inferring the active step.

View retains the hasItems guard and maps step visibility and localized copy. Bag logic retains step/URL state, persistence, delivery validation and totals; shared logic retains locale and heading focus. StorefrontBagLayout retains slot placement and content visibility. This organism owns no state, business rules, persistence or browser effects.

Verify populated bag/delivery and empty transitions, one active heading, bilingual copy and accent markup, step navigation and heading focus, back/reload, removal/Undo recovery, tablet rotation, containment, accessibility and screenshots against the previous version.
