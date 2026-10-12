// What the guideline cards read as globals: React, ReactDOM.createRoot and window.VendraDesignSystem
// (every component, the icon set and the format / dates / commerce helpers, also as AG_*). Each
// card's .card.jsx imports this first; Vite compiles the JSX.
import React from 'react';
import * as ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client';
import * as components from '../templates/app/ds.js';
import {ICON_SVGS} from '../components/Icon/icon-svgs.js';
import {dates} from '../components/utils/dates.js';
import {format} from '../components/utils/format.js';
import {commerce} from '../components/utils/commerce.js';

window.React = React;
window.ReactDOM = {...ReactDOM, createRoot};
window.VendraDesignSystem = {...components, ICON_SVGS, dates, format, commerce, __errors: []};
window.AG_DATES = dates;
window.AG_FORMAT = format;
window.AG_COMMERCE = commerce;
