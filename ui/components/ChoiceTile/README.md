# ChoiceTile

Selectable tile for delivery slots and zones. Selected = ink fill. Always inside ChoiceGroup (radiogroup + arrow keys), which holds the value.

```jsx
<ChoiceGroup label="Delivery time" columns={2} value={slot} onChange={setSlot}>
  {slots.map(s => (
    <ChoiceTile key={s.id} value={s.id} label={s.label} description={s.fee} />
  ))}
</ChoiceGroup>
```

Screen readers name the tile by `label` alone and read `description` after it, so a full slot is announced as "08:00–12:00, Closed" without the reason becoming its name.

## Usage

**Use when:** Single tile inside ChoiceGroup. `disabled` for slots that are full, with the reason in `description`.

**Don’t use when:** Don’t use on its own as a button.

The [ChoiceGroup browser spec](../ChoiceGroup/ChoiceGroup.spec.mjs) exercises both components together.
