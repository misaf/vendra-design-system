Round icon-only button for header actions, favourites, close. Pass `href` to render a link.
```jsx
<IconButton icon="shopping-bag" label="Bag" count={2} />
<IconButton icon="heart" label="Save" variant="solid" active />
<IconButton icon="message-circle" label="WhatsApp" variant="outline" href="https://wa.me/989129333034" target="_blank" />
<IconButton icon="phone" label="Call" variant="outline" href="tel:+989129333034" />
```
On inverse (moss) surfaces add `className="ag-iconbtn--inverse"`.

## Usage
**Use when:** Compact actions where the icon is universal: favourite, close, edit, delete, bag. Always pass `label`.

**Don’t use when:** Don’t use when the meaning isn’t obvious from the icon — use Button with a label.
