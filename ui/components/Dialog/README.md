# Dialog

Modal on a blurred warm overlay; use for quick-view, delivery details, confirmations.

```jsx
<Dialog
  open={open}
  onClose={close}
  title="Delivery details"
  footer={<Button onClick={close}>Save</Button>}
>
  …
</Dialog>
```

Built in: role=dialog, aria-modal, aria-labelledby → title, focus moves in (`initialFocus` selector), Tab trapped, Esc closes, focus returns to the opener, body scroll locked (not for `inline`).

**Drawer:** `placement="start"` turns it into a full-height sheet from the start edge (left in EN, right in FA), used for the storefront mobile menu.

```jsx
<Dialog
  placement="start"
  open={open}
  onClose={close}
  title="Vendra Florist"
  closeLabel="Close menu"
>
  <MenuList label="Main">
    <NavLink variant="menu" href="/shop">
      Shop
    </NavLink>
  </MenuList>
</Dialog>
```

## Usage

**Use when:** Short confirmations and focused edits (delete reminder, edit address).

**Don’t use when:** Don’t use for long forms, pages or information that can sit inline.
