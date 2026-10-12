import {Component} from './logic.js';
import {View} from './View.jsx';
import {definePage} from '../app/runtime.jsx';

// Props a standalone preview starts with.
export const defaults = {lang: 'en', tenant: 'default', mobile: false, status: 'onTheWay'};

export default definePage('StorefrontTrack', Component, View);
