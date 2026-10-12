import {Component} from './logic.js';
import {View} from './View.jsx';
import {definePage} from '../app/runtime.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false, doc: 'shipping'};

export default definePage('StorefrontPolicy', Component, View);
