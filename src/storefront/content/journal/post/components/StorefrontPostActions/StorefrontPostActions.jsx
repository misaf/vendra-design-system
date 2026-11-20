import React from 'react';
import {Button} from '../../../../../../design-system/components/Button/Button.jsx';

export function StorefrontPostActions({copyLabel, onCopy, shopLabel, shopHref}) {
  return (
    <>
      <Button variant="secondary" size="sm" iconStart="link" onClick={onCopy}>
        <>{copyLabel}</>
      </Button>
      <Button variant="primary" size="sm" iconEnd="arrow-right" href={shopHref}>
        <>{shopLabel}</>
      </Button>
    </>
  );
}
