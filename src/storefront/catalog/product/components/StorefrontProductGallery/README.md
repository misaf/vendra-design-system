# StorefrontProductGallery

The product view passes localized images and labels and keys the gallery by product code. The gallery
remembers the visible slide and opens the fullscreen viewer at that photo. The viewer keeps its own
position, so browsing fullscreen leaves the inline gallery on the photo the shopper selected. A
different product resets both positions and closes the viewer.

The design-system Gallery and Lightbox handle scrolling, keyboard and pointer navigation, the dialog,
and focus restoration. The colocated browser tests cover selected-photo entry and reopening, RTL
navigation and boundaries, closing and focus restoration, product changes, responsive images, and
bilingual accessibility.
