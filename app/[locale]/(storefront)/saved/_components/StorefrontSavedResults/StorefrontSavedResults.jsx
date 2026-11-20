import React from 'react';
import {Button} from '../../../../../../ui/components/Button/Button.jsx';
import {ProductCard} from '../../../../../../ui/components/ProductCard/ProductCard.jsx';

// action: {kind: 'add', label, ariaLabel, onAdd} | {kind: 'size', label, ariaLabel, href}
// | {kind: 'unavailable', label}; without one the card shows no bag action.
function SavedBagAction({action}) {
  if (!action) return null;
  if (action.kind === 'size')
    return (
      <Button
        variant="secondary"
        size="md"
        block={true}
        href={action.href}
        aria-label={action.ariaLabel}
        className="vf-saved-bag-action"
      >
        <>{action.label}</>
      </Button>
    );
  if (action.kind === 'add')
    return (
      <Button
        variant="secondary"
        size="md"
        block={true}
        iconStart="shopping-bag"
        onClick={action.onAdd}
        aria-label={action.ariaLabel}
        className="vf-saved-bag-action"
      >
        <>{action.label}</>
      </Button>
    );
  return (
    <Button
      variant="secondary"
      size="md"
      block={true}
      disabled={true}
      className="vf-saved-bag-action"
    >
      <>{action.label}</>
    </Button>
  );
}

export function StorefrontSavedResults({products, labels}) {
  return (
    <>
      {products.map((p, $index) => (
        <div key={$index} className="vf-saved-card">
          <ProductCard
            images={p?.images}
            name={p?.name}
            subtitle={p?.sub}
            price={p?.price}
            stock={p?.stock}
            badge={p?.badge}
            badgeTone="accent"
            frame="soft"
            placeholder={labels.photo}
            favLabel={labels.unsave}
            favorite={true}
            onFavorite={p?.remove}
            href={p?.href}
          />
          <SavedBagAction action={p?.action} />
        </div>
      ))}
    </>
  );
}
