// Hydrates the server HTML the spec passes in and reports what React complained about: recoverable
// errors (content that had to be re-rendered on the client) and console errors (mismatched
// attributes, which React 18 only logs).
import React from 'react';
import {hydrateRoot} from 'react-dom/client';
import * as ds from '../../../dist/index.js';
import {componentSamples} from './component-samples.js';

const problems = [];
const consoleError = console.error;
console.error = (...args) => {
  problems.push(args.map(String).join(' '));
  consoleError(...args);
};
window.hydrateSamples = (html, lang) =>
  new Promise(resolve => {
    const root = document.getElementById('root');
    root.innerHTML = html;
    hydrateRoot(root, componentSamples(ds, React, lang), {
      onRecoverableError: error => problems.push('recoverable: ' + String(error))
    });
    // Effects and the re-render after usePageLocale reads the page's lang.
    setTimeout(() => resolve(problems.slice()), 500);
  });
window.hydrationReady = true;
