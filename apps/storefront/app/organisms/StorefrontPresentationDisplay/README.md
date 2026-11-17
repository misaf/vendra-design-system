# StorefrontPresentationDisplay

Storefront organism for the quiet product display. Receives controlled mode/direction, visible and preloaded products, caption/price visibility, localized labels and image/navigation/tools callbacks explicitly from the View.

Owns display markup, paired/empty/photo-fallback composition, captions, preload pictures, seller controls, image-decode reporting, pointer tracking and the existing four-second control-reveal timer with cleanup. Presentation View/logic retain collection selection, product identity, slide scheduling, failure interpretation/retry, persistence, device state and seller panel state. The organism never imports page logic and makes no business-state or playback scheduling decisions.

Preserve classes, image keys/sizes, landmarks, focus targets, gesture thresholds, RTL direction, quiet keyboard behavior, hidden navigation and timer cleanup. Verify single/paired/portrait rendering, captions/price overrides, empty/fallback states, preloading and failure callbacks, native touch/pointer navigation, TV keys/tools, timed reveal and bilingual accessibility.

The colocated fixture/spec covers supplied single/paired photos, captions/price visibility, fallback/empty states, preload replacement, decode completion/rejection and image errors, tablet pointer direction/threshold/cancellation, isolated navigation/tools callbacks, TV keyboard behavior, reveal expiry/reset and timer cleanup on unmount. Meaningful states pass bilingual axe and compact containment checks. Synthetic pointer events isolate gesture decisions; native touch behavior, photo selection, failure recovery and slideshow scheduling remain page integration responsibilities.
