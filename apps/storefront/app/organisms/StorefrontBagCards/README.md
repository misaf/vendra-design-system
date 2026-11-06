# StorefrontBagCards

Composes the cards section/title/hint, controlled card-addition Undo notice and per-line message/add controls from explicit labels, notice descriptor and normalized line records. Preserves section/heading IDs, classes/order, textarea IDs/labels/hints/errors, required/maxLength/rows props, add IDs/accessible names, button styles and independent hasCard/noCard flags.

View retains eligibility/visibility and normalized mapping. Bag/shared logic retains card configuration, pricing, add/Undo merging, message values/validation/persistence and focus restoration. No page model, state/effects, browser APIs or commerce rules belong here.

Verify bilingual configured messages, add-card focus/pricing, required message/error focus, message edits, Undo without reverting another line, persisted values, touch/tablet rotation, TV keyboard activation, overflow and accessibility. Compare card-message regions with the unchanged baseline.
