// How a page renders: its logic object (state, lifecycle and renderVals) lives in a small React host,
// and the page's View renders the vals. State updates apply to the logic at once, as page code
// expects, and the host re-renders.
import React from 'react';

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
export const VFPage = window.vfPageClass(DCLogic);

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
      return (
        <div className="sc-host" data-sc-name={name}>
          <View v={v} />
        </div>
      );
    }
  }
  Page.displayName = name;
  return Page;
}

// An interpolated value: text in a span, elements as they are, nothing for null or booleans.
export function interp(value) {
  if (React.isValidElement(value) || Array.isArray(value)) return <>{value}</>;
  if (value === undefined || value === null || typeof value === 'boolean') return null;
  return <span className="sc-interp">{String(value)}</span>;
}

export const list = value => (Array.isArray(value) ? value : []);

export function cssToObj(css) {
  if (!css || typeof css !== 'string') return css;
  const style = {};
  for (const declaration of css.split(';')) {
    const i = declaration.indexOf(':');
    if (i < 0) continue;
    const property = declaration.slice(0, i).trim();
    style[
      property.startsWith('--')
        ? property
        : property.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    ] = declaration.slice(i + 1).trim();
  }
  return style;
}
