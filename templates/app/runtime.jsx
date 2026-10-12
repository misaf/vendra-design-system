// How a page renders: its logic object (state, lifecycle and renderVals) lives in a small React host,
// and the page's View renders the vals (its props merged with renderVals()). State updates apply to the logic at once, as page code
// expects, and the host re-renders.
import React from 'react';
import {vfPageClass} from '../_shared/page-lifecycle.js';
// These set window.VF_API, VF_TRACK and VF_PAYMENT, which pages and the shell call.
import '../_shared/integrations/api.js';
import '../_shared/integrations/analytics.js';
import '../_shared/payments.js';

export class DCLogic {
  constructor(props) {
    this.props = props || {};
    this.state = {};
  }
  setState(update, done) {
    this.__host && this.__host.setLogicState(update, done);
  }
  forceUpdate() {
    this.__host && this.__host.forceUpdate();
  }
  componentDidMount() {}
  componentDidUpdate() {}
  componentWillUnmount() {}
  renderVals() {
    return {};
  }
}

// The storefront page base (responsive state, focus, analytics), from the shared logic.
export const VFPage = vfPageClass(DCLogic);

export function definePage(name, Logic, View) {
  class Page extends React.Component {
    constructor(props) {
      super(props);
      this.state = {version: 0};
      this.logic = new Logic(props);
      this.logic.__host = this;
    }
    setLogicState(update, done) {
      const patch = typeof update === 'function' ? update(this.logic.state) : update;
      this.logic.state = {...this.logic.state, ...patch};
      this.setState(state => ({version: state.version + 1}), done);
    }
    componentDidMount() {
      this.logic.componentDidMount();
    }
    componentDidUpdate(previousProps) {
      this.logic.props = this.props;
      this.logic.componentDidUpdate(previousProps);
    }
    componentWillUnmount() {
      this.logic.componentWillUnmount();
    }
    render() {
      this.logic.props = this.props;
      const v = {...this.props, ...(this.logic.renderVals() || {})};
      return <View v={v} />;
    }
  }
  Page.displayName = name;
  return Page;
}

export const list = value => (Array.isArray(value) ? value : []);
