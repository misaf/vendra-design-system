import React from 'react';
import * as DS from '../../ds.js';

export function StorefrontShopHeading({eyebrow, title, accent}) {
  return <DS.SectionHeader level="h1" eyebrow={eyebrow} title={title} accent={accent} />;
}
