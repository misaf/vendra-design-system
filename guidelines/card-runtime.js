// What the guideline cards read as globals: React, ReactDOM.createRoot and window.VendraDesignSystem
// (every component, the icon set and the format / dates / commerce helpers, also as AG_*). Each
// card's .card.jsx imports this first; Vite compiles the JSX.
// This is the one compatibility layer that sets window globals for the cards' classic scripts;
// tools/app-dependencies.cjs fails window.VF_* / window.AG_* / window.VendraDesignSystem elsewhere.
import React from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import * as components from '../apps/storefront/app/ds.js';
import {ICON_SVGS} from '../packages/design-system/components/atoms/Icon/icon-svgs.js';
import {dates} from '../packages/design-system/components/utils/dates.js';
import {format} from '../packages/design-system/components/utils/format.js';
import {commerce} from '../packages/design-system/components/utils/commerce.js';

window.React = React;
window.ReactDOM = {...ReactDOM, createRoot};
window.VendraDesignSystem = {...components, ICON_SVGS, dates, format, commerce, __errors: []};
window.AG_DATES = dates;
window.AG_FORMAT = format;
window.AG_COMMERCE = commerce;
