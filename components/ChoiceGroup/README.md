# ChoiceGroup

Grid wrapper for ChoiceTile on React Aria's RadioGroup: one Tab stop, arrow keys move and select, mirrored in RTL (it follows the page's `lang`). Each tile is a real radio input inside its label, so click the tile in tests, as people do. See ChoiceTile.

`legend="Delivery time"` renders `<fieldset><legend>` (legend labels the radiogroup). `hint` / `error` sit under the tiles and are linked to the radiogroup (`aria-describedby`, `aria-invalid`, `aria-errormessage`).

## Usage

**Use when:** One-of-few choices shown as tiles: delivery slot, size, card type.

**Don’t use when:** Don’t use for more than ~6 options (Select) or multiple selection (Checkbox / Chip).

# ChoiceTile

Selectable tile for delivery slots and zones. Selected = ink fill. Wrap in ChoiceGroup (radiogroup + arrow keys).

```jsx
<ChoiceGroup label="Delivery time" columns={2}>
  {slots.map(s => (
    <ChoiceTile
      key={s.id}
      label={s.label}
      description={s.fee}
      selected={slot === s.id}
      onSelect={() => setSlot(s.id)}
    />
  ))}
</ChoiceGroup>
```

Screen readers name the tile by `label` alone and read `description` after it, so a full slot is announced as "08:00–12:00, Closed" without the reason becoming its name.

## Usage

**Use when:** Single tile inside ChoiceGroup. `disabled` for slots that are full, with the reason in `description`.

**Don’t use when:** Don’t use on its own as a button.
